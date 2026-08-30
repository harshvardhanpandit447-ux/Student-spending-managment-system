import { supabase } from '../config/supabase.js';

// @desc    Get aggregated dashboard summary metrics from Supabase
// @route   GET /api/dashboard
// @access  Private
export const getDashboardSummary = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id;

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59).toISOString();

    const [
      { data: allTransactions = [] },
      { data: monthTransactions = [] },
      { data: budgets = [] },
      { data: savingsGoals = [] },
      { data: user }
    ] = await Promise.all([
      supabase.from('transactions').select('*').eq('user_id', userId).order('date', { ascending: false }),
      supabase.from('transactions').select('*').eq('user_id', userId).gte('date', startOfMonth).lte('date', endOfMonth),
      supabase.from('budgets').select('*').eq('user_id', userId).order('category', { ascending: true }),
      supabase.from('savings_goals').select('*').eq('user_id', userId).order('created_at', { ascending: false }),
      supabase.from('users').select('*').eq('id', userId).maybeSingle()
    ]);

    const safeAllTx = allTransactions || [];
    const safeMonthTx = monthTransactions || [];
    const safeBudgets = budgets || [];
    const safeGoals = savingsGoals || [];

    const totalIncome = safeAllTx
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + Number(t.amount || 0), 0);

    const totalExpenses = safeAllTx
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + Number(t.amount || 0), 0);

    const currentBalance = totalIncome - totalExpenses;

    const monthlyIncome = safeMonthTx
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + Number(t.amount || 0), 0);

    const monthlyExpenses = safeMonthTx
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + Number(t.amount || 0), 0);

    const totalSavings = safeGoals.reduce((sum, g) => sum + Number(g.current_amount || 0), 0);

    const categoryMap = {};
    safeMonthTx
      .filter(t => t.type === 'expense')
      .forEach(t => {
        categoryMap[t.category] = (categoryMap[t.category] || 0) + Number(t.amount || 0);
      });

    const categoryBreakdown = Object.entries(categoryMap).map(([category, amount]) => ({
      category,
      amount,
      percentage: monthlyExpenses > 0 ? Math.round((amount / monthlyExpenses) * 100) : 0
    })).sort((a, b) => b.amount - a.amount);

    const recentTransactions = safeAllTx.slice(0, 5);

    const monthlyBudgetLimit = Number(user?.monthly_budget || 10000);
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
          id: t.id,
          _id: t.id,
          title: t.title,
          amount: Number(t.amount),
          type: t.type,
          category: t.category,
          paymentMethod: t.payment_method,
          date: typeof t.date === 'string' ? t.date.split('T')[0] : new Date(t.date).toISOString().split('T')[0],
          description: t.description || '',
          recipientOrSource: t.recipient_or_source || ''
        })),
        budgets: safeBudgets.map(b => ({
          id: b.id,
          _id: b.id,
          category: b.category,
          limit: Number(b.amount),
          spent: Number(b.spent || 0),
          period: b.period,
          warningThreshold: Number(b.warning_threshold || 0.8),
          color: b.color || '#8B5CF6'
        })),
        savingsGoals: safeGoals.map(g => ({
          id: g.id,
          _id: g.id,
          title: g.name,
          name: g.name,
          targetAmount: Number(g.target_amount),
          currentAmount: Number(g.current_amount || 0),
          deadline: g.deadline,
          category: g.category,
          icon: g.icon,
          color: g.color || '#8B5CF6'
        }))
      }
    });
  } catch (error) {
    next(error);
  }
};
