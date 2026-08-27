import mongoose from 'mongoose';
import { SavingsGoal } from '../models/SavingsGoal.js';
import { memoryStore } from '../config/memoryStore.js';

// @desc    Get all savings goals for authenticated user
// @route   GET /api/savings
// @access  Private
export const getSavingsGoals = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const goals = await SavingsGoal.find({ userId: req.user._id }).sort({ createdAt: -1 });
      return res.status(200).json({
        success: true,
        count: goals.length,
        data: goals.map(g => ({
          id: g._id.toString(),
          _id: g._id,
          title: g.name,
          name: g.name,
          targetAmount: g.targetAmount,
          currentAmount: g.currentAmount,
          deadline: g.deadline,
          category: g.category,
          icon: g.icon,
          color: g.color,
          description: g.description
        }))
      });
    } else {
      const list = memoryStore.savingsGoals.filter(g => g.userId.toString() === req.user._id.toString());
      return res.status(200).json({
        success: true,
        count: list.length,
        data: list.map(g => ({
          id: g._id.toString(),
          _id: g._id,
          title: g.name,
          name: g.name,
          targetAmount: g.targetAmount,
          currentAmount: g.currentAmount,
          deadline: g.deadline,
          category: g.category,
          icon: g.icon,
          color: g.color,
          description: g.description
        }))
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Create new savings goal
// @route   POST /api/savings
// @access  Private
export const createSavingsGoal = async (req, res, next) => {
  try {
    const { name, title, targetAmount, currentAmount, deadline, category, icon, color, description } = req.body;
    const goalTitle = name || title;

    if (!goalTitle || !targetAmount) {
      return res.status(400).json({
        success: false,
        message: 'Please provide goal title/name and target amount'
      });
    }

    if (mongoose.connection.readyState === 1) {
      const goal = await SavingsGoal.create({
        userId: req.user._id,
        name: goalTitle,
        targetAmount: Number(targetAmount),
        currentAmount: Number(currentAmount) || 0,
        deadline: deadline || 'December 2026',
        category: category || 'Tech & Hardware',
        icon: icon || 'Laptop',
        color: color || '#8B5CF6',
        description: description || ''
      });

      return res.status(201).json({
        success: true,
        message: 'Savings goal created successfully',
        data: {
          id: goal._id.toString(),
          _id: goal._id,
          title: goal.name,
          name: goal.name,
          targetAmount: goal.targetAmount,
          currentAmount: goal.currentAmount,
          deadline: goal.deadline,
          category: goal.category,
          icon: goal.icon,
          color: goal.color,
          description: goal.description
        }
      });
    } else {
      const newGoal = {
        _id: `g-${Date.now()}`,
        userId: req.user._id,
        name: goalTitle,
        targetAmount: Number(targetAmount),
        currentAmount: Number(currentAmount) || 0,
        deadline: deadline || 'December 2026',
        category: category || 'Tech & Hardware',
        icon: icon || 'Laptop',
        color: color || '#8B5CF6',
        description: description || '',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      memoryStore.savingsGoals.unshift(newGoal);

      return res.status(201).json({
        success: true,
        message: 'Savings goal created successfully',
        data: {
          id: newGoal._id,
          _id: newGoal._id,
          title: newGoal.name,
          name: newGoal.name,
          targetAmount: newGoal.targetAmount,
          currentAmount: newGoal.currentAmount,
          deadline: newGoal.deadline,
          category: newGoal.category,
          icon: newGoal.icon,
          color: newGoal.color,
          description: newGoal.description
        }
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Update savings goal or deposit funds
// @route   PUT /api/savings/:id
// @access  Private
export const updateSavingsGoal = async (req, res, next) => {
  try {
    const { name, title, targetAmount, currentAmount, depositAmount, deadline, category, icon, color, description } = req.body;

    if (mongoose.connection.readyState === 1) {
      const goal = await SavingsGoal.findById(req.params.id);
      if (!goal) return res.status(404).json({ success: false, message: 'Savings goal not found' });
      if (!goal.userId.equals(req.user._id)) return res.status(403).json({ success: false, message: 'Not authorized' });

      if (name !== undefined || title !== undefined) goal.name = name || title;
      if (targetAmount !== undefined) goal.targetAmount = Number(targetAmount);
      if (deadline !== undefined) goal.deadline = deadline;
      if (category !== undefined) goal.category = category;
      if (icon !== undefined) goal.icon = icon;
      if (color !== undefined) goal.color = color;
      if (description !== undefined) goal.description = description;

      if (depositAmount !== undefined) {
        goal.currentAmount = Math.min(goal.targetAmount, goal.currentAmount + Number(depositAmount));
      } else if (currentAmount !== undefined) {
        goal.currentAmount = Number(currentAmount);
      }

      const updated = await goal.save();

      return res.status(200).json({
        success: true,
        message: 'Savings goal updated successfully',
        data: {
          id: updated._id.toString(),
          _id: updated._id,
          title: updated.name,
          name: updated.name,
          targetAmount: updated.targetAmount,
          currentAmount: updated.currentAmount,
          deadline: updated.deadline,
          category: updated.category,
          icon: updated.icon,
          color: updated.color,
          description: updated.description
        }
      });
    } else {
      const g = memoryStore.savingsGoals.find(item => item._id.toString() === req.params.id);
      if (!g) return res.status(404).json({ success: false, message: 'Savings goal not found' });
      if (g.userId.toString() !== req.user._id.toString()) return res.status(403).json({ success: false, message: 'Not authorized' });

      if (name !== undefined || title !== undefined) g.name = name || title;
      if (targetAmount !== undefined) g.targetAmount = Number(targetAmount);
      if (deadline !== undefined) g.deadline = deadline;
      if (category !== undefined) g.category = category;
      if (icon !== undefined) g.icon = icon;
      if (color !== undefined) g.color = color;
      if (description !== undefined) g.description = description;

      if (depositAmount !== undefined) {
        g.currentAmount = Math.min(g.targetAmount, g.currentAmount + Number(depositAmount));
      } else if (currentAmount !== undefined) {
        g.currentAmount = Number(currentAmount);
      }

      return res.status(200).json({
        success: true,
        message: 'Savings goal updated successfully',
        data: {
          id: g._id,
          _id: g._id,
          title: g.name,
          name: g.name,
          targetAmount: g.targetAmount,
          currentAmount: g.currentAmount,
          deadline: g.deadline,
          category: g.category,
          icon: g.icon,
          color: g.color,
          description: g.description
        }
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Delete savings goal
// @route   DELETE /api/savings/:id
// @access  Private
export const deleteSavingsGoal = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const goal = await SavingsGoal.findById(req.params.id);
      if (!goal) return res.status(404).json({ success: false, message: 'Savings goal not found' });
      if (!goal.userId.equals(req.user._id)) return res.status(403).json({ success: false, message: 'Not authorized' });

      await goal.deleteOne();
      return res.status(200).json({ success: true, message: 'Savings goal removed successfully' });
    } else {
      const idx = memoryStore.savingsGoals.findIndex(g => g._id.toString() === req.params.id);
      if (idx === -1) return res.status(404).json({ success: false, message: 'Savings goal not found' });
      if (memoryStore.savingsGoals[idx].userId.toString() !== req.user._id.toString()) return res.status(403).json({ success: false, message: 'Not authorized' });

      memoryStore.savingsGoals.splice(idx, 1);
      return res.status(200).json({ success: true, message: 'Savings goal removed successfully' });
    }
  } catch (error) {
    next(error);
  }
};
