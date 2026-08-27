import mongoose from 'mongoose';
import { SplitExpense } from '../models/SplitExpense.js';
import { memoryStore } from '../config/memoryStore.js';

// @desc    Get all split expenses for authenticated user
// @route   GET /api/splits
// @access  Private
export const getSplits = async (req, res, next) => {
  try {
    const userId = req.user._id;

    if (mongoose.connection.readyState === 1) {
      const splits = await SplitExpense.find({ userId }).sort({ createdAt: -1 });
      return res.status(200).json({
        success: true,
        count: splits.length,
        data: splits.map(s => ({
          id: s._id.toString(),
          _id: s._id,
          title: s.title,
          totalAmount: s.totalAmount,
          date: s.date.toISOString().split('T')[0],
          paidBy: s.paidBy,
          category: s.category,
          status: s.status,
          participants: s.participants
        }))
      });
    } else {
      const list = (memoryStore.splits || []).filter(s => s.userId.toString() === userId.toString());
      list.sort((a, b) => new Date(b.createdAt || b.date).getTime() - new Date(a.createdAt || a.date).getTime());
      return res.status(200).json({
        success: true,
        count: list.length,
        data: list.map(s => ({
          id: s._id.toString(),
          _id: s._id,
          title: s.title,
          totalAmount: s.totalAmount,
          date: typeof s.date === 'string' ? s.date : s.date.toISOString().split('T')[0],
          paidBy: s.paidBy,
          category: s.category,
          status: s.status,
          participants: s.participants
        }))
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Create new split expense
// @route   POST /api/splits
// @access  Private
export const createSplit = async (req, res, next) => {
  try {
    const { title, totalAmount, category, participants, paidBy, date } = req.body;

    if (!title || !totalAmount || !participants || !participants.length) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title, total amount, and at least one participant'
      });
    }

    const allPaid = participants.every((p) => p.isPaid);
    const somePaid = participants.some((p) => p.isPaid);
    const status = allPaid ? 'settled' : somePaid ? 'partially_settled' : 'pending';

    if (mongoose.connection.readyState === 1) {
      const split = await SplitExpense.create({
        userId: req.user._id,
        title,
        totalAmount: Number(totalAmount),
        category: category || 'Food',
        paidBy: paidBy || 'You',
        date: date ? new Date(date) : new Date(),
        status,
        participants
      });

      return res.status(201).json({
        success: true,
        message: 'Split expense created successfully',
        data: {
          id: split._id.toString(),
          _id: split._id,
          title: split.title,
          totalAmount: split.totalAmount,
          date: split.date.toISOString().split('T')[0],
          paidBy: split.paidBy,
          category: split.category,
          status: split.status,
          participants: split.participants
        }
      });
    } else {
      const newSplit = {
        _id: `sp-${Date.now()}`,
        userId: req.user._id,
        title,
        totalAmount: Number(totalAmount),
        category: category || 'Food',
        paidBy: paidBy || 'You',
        date: date ? new Date(date) : new Date(),
        status,
        participants,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      if (!memoryStore.splits) memoryStore.splits = [];
      memoryStore.splits.unshift(newSplit);

      return res.status(201).json({
        success: true,
        message: 'Split expense created successfully',
        data: {
          id: newSplit._id,
          _id: newSplit._id,
          title: newSplit.title,
          totalAmount: newSplit.totalAmount,
          date: newSplit.date.toISOString().split('T')[0],
          paidBy: newSplit.paidBy,
          category: newSplit.category,
          status: newSplit.status,
          participants: newSplit.participants
        }
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle participant paid status
// @route   PUT /api/splits/:id/toggle-paid
// @access  Private
export const toggleParticipantPaid = async (req, res, next) => {
  try {
    const { participantId } = req.body;

    if (!participantId) {
      return res.status(400).json({ success: false, message: 'Please provide participantId' });
    }

    if (mongoose.connection.readyState === 1) {
      const split = await SplitExpense.findById(req.params.id);
      if (!split) return res.status(404).json({ success: false, message: 'Split not found' });
      if (!split.userId.equals(req.user._id)) return res.status(403).json({ success: false, message: 'Not authorized' });

      split.participants = split.participants.map(p => {
        if (p.id === participantId) {
          p.isPaid = !p.isPaid;
        }
        return p;
      });

      const allPaid = split.participants.every(p => p.isPaid);
      const somePaid = split.participants.some(p => p.isPaid);
      split.status = allPaid ? 'settled' : somePaid ? 'partially_settled' : 'pending';

      const updated = await split.save();

      return res.status(200).json({
        success: true,
        message: 'Participant status updated',
        data: {
          id: updated._id.toString(),
          _id: updated._id,
          title: updated.title,
          totalAmount: updated.totalAmount,
          date: updated.date.toISOString().split('T')[0],
          paidBy: updated.paidBy,
          category: updated.category,
          status: updated.status,
          participants: updated.participants
        }
      });
    } else {
      if (!memoryStore.splits) memoryStore.splits = [];
      const split = memoryStore.splits.find(s => s._id.toString() === req.params.id);
      if (!split) return res.status(404).json({ success: false, message: 'Split not found' });
      if (split.userId.toString() !== req.user._id.toString()) return res.status(403).json({ success: false, message: 'Not authorized' });

      split.participants = split.participants.map(p => {
        if (p.id === participantId) {
          p.isPaid = !p.isPaid;
        }
        return p;
      });

      const allPaid = split.participants.every(p => p.isPaid);
      const somePaid = split.participants.some(p => p.isPaid);
      split.status = allPaid ? 'settled' : somePaid ? 'partially_settled' : 'pending';

      return res.status(200).json({
        success: true,
        message: 'Participant status updated',
        data: {
          id: split._id.toString(),
          _id: split._id,
          title: split.title,
          totalAmount: split.totalAmount,
          date: typeof split.date === 'string' ? split.date : split.date.toISOString().split('T')[0],
          paidBy: split.paidBy,
          category: split.category,
          status: split.status,
          participants: split.participants
        }
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Delete split
// @route   DELETE /api/splits/:id
// @access  Private
export const deleteSplit = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const split = await SplitExpense.findById(req.params.id);
      if (!split) return res.status(404).json({ success: false, message: 'Split not found' });
      if (!split.userId.equals(req.user._id)) return res.status(403).json({ success: false, message: 'Not authorized' });

      await split.deleteOne();
      return res.status(200).json({ success: true, message: 'Split bill removed successfully' });
    } else {
      if (!memoryStore.splits) memoryStore.splits = [];
      const idx = memoryStore.splits.findIndex(s => s._id.toString() === req.params.id);
      if (idx === -1) return res.status(404).json({ success: false, message: 'Split not found' });
      if (memoryStore.splits[idx].userId.toString() !== req.user._id.toString()) return res.status(403).json({ success: false, message: 'Not authorized' });

      memoryStore.splits.splice(idx, 1);
      return res.status(200).json({ success: true, message: 'Split bill removed successfully' });
    }
  } catch (error) {
    next(error);
  }
};
