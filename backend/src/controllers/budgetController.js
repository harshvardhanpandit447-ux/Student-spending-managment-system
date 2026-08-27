import mongoose from 'mongoose';
import { Budget } from '../models/Budget.js';
import { memoryStore } from '../config/memoryStore.js';

// @desc    Get all budgets for authenticated user
// @route   GET /api/budgets
// @access  Private
export const getBudgets = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const budgets = await Budget.find({ userId: req.user._id }).sort({ category: 1 });
      return res.status(200).json({
        success: true,
        count: budgets.length,
        data: budgets.map(b => ({
          id: b._id.toString(),
          _id: b._id,
          category: b.category,
          limit: b.amount,
          spent: b.spent || 0,
          period: b.period,
          warningThreshold: b.warningThreshold,
          color: b.color || '#8B5CF6'
        }))
      });
    } else {
      const list = memoryStore.budgets.filter(b => b.userId.toString() === req.user._id.toString());
      return res.status(200).json({
        success: true,
        count: list.length,
        data: list.map(b => ({
          id: b._id.toString(),
          _id: b._id,
          category: b.category,
          limit: b.amount,
          spent: b.spent || 0,
          period: b.period,
          warningThreshold: b.warningThreshold,
          color: b.color || '#8B5CF6'
        }))
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Create new category budget
// @route   POST /api/budgets
// @access  Private
export const createBudget = async (req, res, next) => {
  try {
    const { category, amount, limit, period, warningThreshold, color } = req.body;
    const limitAmount = amount !== undefined ? amount : limit;

    if (!category || limitAmount === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Please provide category and budget limit amount'
      });
    }

    if (mongoose.connection.readyState === 1) {
      const existing = await Budget.findOne({ userId: req.user._id, category });
      if (existing) {
        return res.status(400).json({
          success: false,
          message: `A budget for category "${category}" already exists`
        });
      }

      const budget = await Budget.create({
        userId: req.user._id,
        category,
        amount: Number(limitAmount),
        spent: 0,
        period: period || 'monthly',
        warningThreshold: warningThreshold !== undefined ? Number(warningThreshold) : 0.8,
        color: color || '#8B5CF6'
      });

      return res.status(201).json({
        success: true,
        message: 'Budget created successfully',
        data: {
          id: budget._id.toString(),
          _id: budget._id,
          category: budget.category,
          limit: budget.amount,
          spent: budget.spent,
          period: budget.period,
          warningThreshold: budget.warningThreshold,
          color: budget.color
        }
      });
    } else {
      const existing = memoryStore.budgets.find(b => b.userId.toString() === req.user._id.toString() && b.category === category);
      if (existing) {
        return res.status(400).json({
          success: false,
          message: `A budget for category "${category}" already exists`
        });
      }

      const newBudget = {
        _id: `b-${Date.now()}`,
        userId: req.user._id,
        category,
        amount: Number(limitAmount),
        spent: 0,
        period: period || 'monthly',
        warningThreshold: warningThreshold !== undefined ? Number(warningThreshold) : 0.8,
        color: color || '#8B5CF6',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      memoryStore.budgets.push(newBudget);

      return res.status(201).json({
        success: true,
        message: 'Budget created successfully',
        data: {
          id: newBudget._id,
          _id: newBudget._id,
          category: newBudget.category,
          limit: newBudget.amount,
          spent: newBudget.spent,
          period: newBudget.period,
          warningThreshold: newBudget.warningThreshold,
          color: newBudget.color
        }
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Update budget
// @route   PUT /api/budgets/:id
// @access  Private
export const updateBudget = async (req, res, next) => {
  try {
    const { amount, limit, spent, period, warningThreshold, color } = req.body;
    const limitAmount = amount !== undefined ? amount : limit;

    if (mongoose.connection.readyState === 1) {
      const budget = await Budget.findById(req.params.id);
      if (!budget) return res.status(404).json({ success: false, message: 'Budget not found' });
      if (!budget.userId.equals(req.user._id)) return res.status(403).json({ success: false, message: 'Not authorized' });

      if (limitAmount !== undefined) budget.amount = Number(limitAmount);
      if (spent !== undefined) budget.spent = Number(spent);
      if (period !== undefined) budget.period = period;
      if (warningThreshold !== undefined) budget.warningThreshold = Number(warningThreshold);
      if (color !== undefined) budget.color = color;

      const updated = await budget.save();

      return res.status(200).json({
        success: true,
        message: 'Budget updated successfully',
        data: {
          id: updated._id.toString(),
          _id: updated._id,
          category: updated.category,
          limit: updated.amount,
          spent: updated.spent,
          period: updated.period,
          warningThreshold: updated.warningThreshold,
          color: updated.color
        }
      });
    } else {
      const b = memoryStore.budgets.find(item => item._id.toString() === req.params.id);
      if (!b) return res.status(404).json({ success: false, message: 'Budget not found' });
      if (b.userId.toString() !== req.user._id.toString()) return res.status(403).json({ success: false, message: 'Not authorized' });

      if (limitAmount !== undefined) b.amount = Number(limitAmount);
      if (spent !== undefined) b.spent = Number(spent);
      if (period !== undefined) b.period = period;
      if (warningThreshold !== undefined) b.warningThreshold = Number(warningThreshold);
      if (color !== undefined) b.color = color;

      return res.status(200).json({
        success: true,
        message: 'Budget updated successfully',
        data: {
          id: b._id,
          _id: b._id,
          category: b.category,
          limit: b.amount,
          spent: b.spent,
          period: b.period,
          warningThreshold: b.warningThreshold,
          color: b.color
        }
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Delete budget
// @route   DELETE /api/budgets/:id
// @access  Private
export const deleteBudget = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const budget = await Budget.findById(req.params.id);
      if (!budget) return res.status(404).json({ success: false, message: 'Budget not found' });
      if (!budget.userId.equals(req.user._id)) return res.status(403).json({ success: false, message: 'Not authorized' });

      await budget.deleteOne();
      return res.status(200).json({ success: true, message: 'Budget removed successfully' });
    } else {
      const idx = memoryStore.budgets.findIndex(b => b._id.toString() === req.params.id);
      if (idx === -1) return res.status(404).json({ success: false, message: 'Budget not found' });
      if (memoryStore.budgets[idx].userId.toString() !== req.user._id.toString()) return res.status(403).json({ success: false, message: 'Not authorized' });

      memoryStore.budgets.splice(idx, 1);
      return res.status(200).json({ success: true, message: 'Budget removed successfully' });
    }
  } catch (error) {
    next(error);
  }
};
