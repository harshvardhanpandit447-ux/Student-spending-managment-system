import mongoose from 'mongoose';
import { Transaction } from '../models/Transaction.js';
import { Budget } from '../models/Budget.js';
import { SavingsGoal } from '../models/SavingsGoal.js';
import { User } from '../models/User.js';
import { memoryStore } from '../config/memoryStore.js';

// @desc    Get aggregated dashboard summary metrics
// @route   GET /api/dashboard
// @access  Private
export const getDashboardSummary = async (req, res, next) => {
  try {
    const userId = req.user._id;

    if (mongoose.connection.readyState === 1) {
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

      const [allTransactions, monthTransactions, budgets, savingsGoals, user] = await Promise.all([
        Transaction.find({ userId }),
        Transaction.find({ userId, date: { $gte: startOfMonth, $lte: endOfMonth } }),
        Budget.find({ userId }),
        SavingsGoal.find({ userId }),
        User.findById(userId)
      ]);

      const totalIncome = allTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);

      const totalExpenses = allTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

      const currentBalance = totalIncome - totalExpenses;

      const monthlyIncome = monthTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);

      const monthlyExpenses = monthTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

      const totalSavings = savingsGoals.reduce((sum, g) => sum + g.currentAmount, 0);

      const categoryMap = {};
      monthTransactions
        .filter(t => t.type === 'expense')
        .forEach(t => {
          categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
        });

      const categoryBreakdown = Object.entries(categoryMap).map(([category, amount]) => ({
        category,
        amount,
        percentage: monthlyExpenses > 0 ? Math.round((amount / monthlyExpenses) * 100) : 0
      })).sort((a, b) => b.amount - a.amount);

      const recentTransactions = await Transaction.find({ userId })
        .sort({ date: -1, createdAt: -1 })
        .limit(5);

      const monthlyBudgetLimit = user?.monthlyBudget || 10000;
      const remainingBudget = Math.max(0, monthlyBudgetLimit - monthlyExpenses);

      return res.status(200).json({
        success: true,
        data: {
          totalIncome,
          totalExpenses,
          currentBalance,
          monthlyIncome,
          monthlyExpenses,
          totalSavings,
          monthlyBudgetLimit,
          remainingBudget,
          categoryBreakdown,
          recentTransactions: recentTransactions.map(t => ({
            id: t._id.toString(),
            _id: t._id,
            title: t.title,
            amount: t.amount,
            type: t.type,
            category: t.category,
            paymentMethod: t.paymentMethod,
            date: t.date.toISOString().split('T')[0],
            description: t.description,
            recipientOrSource: t.recipientOrSource
          })),
          budgets: budgets.map(b => ({
            id: b._id.toString(),
            _id: b._id,
            category: b.category,
            limit: b.amount,
            spent: b.spent || 0,
            period: b.period,
            warningThreshold: b.warningThreshold,
            color: b.color
          })),
          savingsGoals: savingsGoals.map(g => ({
            id: g._id.toString(),
            _id: g._id,
            title: g.name,
            name: g.name,
            targetAmount: g.targetAmount,
            currentAmount: g.currentAmount,
            deadline: g.deadline,
            category: g.category,
            icon: g.icon,
            color: g.color
          }))
        }
      });
    } else {
      // Memory store aggregation
      const userTxs = memoryStore.transactions.filter(t => t.userId.toString() === userId.toString());
      const userBudgets = memoryStore.budgets.filter(b => b.userId.toString() === userId.toString());
      const userGoals = memoryStore.savingsGoals.filter(g => g.userId.toString() === userId.toString());
      const user = memoryStore.users.find(u => u._id.toString() === userId.toString());

      const totalIncome = userTxs
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);

      const totalExpenses = userTxs
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

      const currentBalance = totalIncome - totalExpenses;
      const totalSavings = userGoals.reduce((sum, g) => sum + g.currentAmount, 0);

      const categoryMap = {};
      userTxs
        .filter(t => t.type === 'expense')
        .forEach(t => {
          categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
        });

      const categoryBreakdown = Object.entries(categoryMap).map(([category, amount]) => ({
        category,
        amount,
        percentage: totalExpenses > 0 ? Math.round((amount / totalExpenses) * 100) : 0
      })).sort((a, b) => b.amount - a.amount);

      const recentTransactions = [...userTxs]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 5);

      const monthlyBudgetLimit = user?.monthlyBudget || 10000;
      const remainingBudget = Math.max(0, monthlyBudgetLimit - totalExpenses);

      return res.status(200).json({
        success: true,
        data: {
          totalIncome,
          totalExpenses,
          currentBalance,
          monthlyIncome: totalIncome,
          monthlyExpenses: totalExpenses,
          totalSavings,
          monthlyBudgetLimit,
          remainingBudget,
          categoryBreakdown,
          recentTransactions: recentTransactions.map(t => ({
            id: t._id.toString(),
            _id: t._id,
            title: t.title,
            amount: t.amount,
            type: t.type,
            category: t.category,
            paymentMethod: t.paymentMethod,
            date: typeof t.date === 'string' ? t.date : t.date.toISOString().split('T')[0],
            description: t.description || '',
            recipientOrSource: t.recipientOrSource || ''
          })),
          budgets: userBudgets.map(b => ({
            id: b._id.toString(),
            _id: b._id,
            category: b.category,
            limit: b.amount,
            spent: b.spent || 0,
            period: b.period,
            warningThreshold: b.warningThreshold,
            color: b.color
          })),
          savingsGoals: userGoals.map(g => ({
            id: g._id.toString(),
            _id: g._id,
            title: g.name,
            name: g.name,
            targetAmount: g.targetAmount,
            currentAmount: g.currentAmount,
            deadline: g.deadline,
            category: g.category,
            icon: g.icon,
            color: g.color
          }))
        }
      });
    }
  } catch (error) {
    next(error);
  }
};
