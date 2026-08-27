import mongoose from 'mongoose';
import { Transaction } from '../models/Transaction.js';
import { Budget } from '../models/Budget.js';
import { memoryStore } from '../config/memoryStore.js';

// Helper to update budget spent
const adjustBudgetSpent = async (userId, category, amountDelta) => {
  if (!category || !amountDelta) return;
  try {
    if (mongoose.connection.readyState === 1) {
      const budget = await Budget.findOne({ userId, category });
      if (budget) {
        budget.spent = Math.max(0, (budget.spent || 0) + amountDelta);
        await budget.save();
      }
    } else {
      const b = memoryStore.budgets.find(b => b.userId.toString() === userId.toString() && b.category === category);
      if (b) {
        b.spent = Math.max(0, (b.spent || 0) + amountDelta);
      }
    }
  } catch (err) {
    console.error('[adjustBudgetSpent Error]', err.message);
  }
};

// @desc    Get all transactions for authenticated user
// @route   GET /api/transactions
// @access  Private
export const getTransactions = async (req, res, next) => {
  try {
    const { category, type, paymentMethod, search, limit = 100, page = 1 } = req.query;

    if (mongoose.connection.readyState === 1) {
      const query = { userId: req.user._id };

      if (category && category !== 'all' && category !== 'All') query.category = category;
      if (type && type !== 'all') query.type = type;
      if (paymentMethod && paymentMethod !== 'all' && paymentMethod !== 'All') query.paymentMethod = paymentMethod;

      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { recipientOrSource: { $regex: search, $options: 'i' } }
        ];
      }

      const transactions = await Transaction.find(query)
        .sort({ date: -1, createdAt: -1 })
        .skip((Number(page) - 1) * Number(limit))
        .limit(Number(limit));

      return res.status(200).json({
        success: true,
        count: transactions.length,
        data: transactions.map(t => ({
          id: t._id.toString(),
          _id: t._id,
          title: t.title,
          amount: t.amount,
          type: t.type,
          category: t.category,
          paymentMethod: t.paymentMethod,
          date: t.date.toISOString().split('T')[0],
          description: t.description || '',
          recipientOrSource: t.recipientOrSource || '',
          isRecurring: t.isRecurring
        }))
      });
    } else {
      // Memory store lookup
      let list = memoryStore.transactions.filter(t => t.userId.toString() === req.user._id.toString());

      if (category && category !== 'all' && category !== 'All') {
        list = list.filter(t => t.category === category);
      }
      if (type && type !== 'all') {
        list = list.filter(t => t.type === type);
      }
      if (paymentMethod && paymentMethod !== 'all' && paymentMethod !== 'All') {
        list = list.filter(t => t.paymentMethod === paymentMethod);
      }
      if (search) {
        const s = search.toLowerCase();
        list = list.filter(t => 
          (t.title && t.title.toLowerCase().includes(s)) ||
          (t.description && t.description.toLowerCase().includes(s)) ||
          (t.recipientOrSource && t.recipientOrSource.toLowerCase().includes(s))
        );
      }

      list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

      return res.status(200).json({
        success: true,
        count: list.length,
        data: list.map(t => ({
          id: t._id.toString(),
          _id: t._id,
          title: t.title,
          amount: t.amount,
          type: t.type,
          category: t.category,
          paymentMethod: t.paymentMethod,
          date: typeof t.date === 'string' ? t.date : t.date.toISOString().split('T')[0],
          description: t.description || '',
          recipientOrSource: t.recipientOrSource || '',
          isRecurring: t.isRecurring
        }))
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get single transaction by ID
// @route   GET /api/transactions/:id
// @access  Private
export const getTransactionById = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const transaction = await Transaction.findById(req.params.id);
      if (!transaction) return res.status(404).json({ success: false, message: 'Transaction not found' });
      if (!transaction.userId.equals(req.user._id)) return res.status(403).json({ success: false, message: 'Not authorized' });

      return res.status(200).json({
        success: true,
        data: {
          id: transaction._id.toString(),
          _id: transaction._id,
          title: transaction.title,
          amount: transaction.amount,
          type: transaction.type,
          category: transaction.category,
          paymentMethod: transaction.paymentMethod,
          date: transaction.date.toISOString().split('T')[0],
          description: transaction.description,
          recipientOrSource: transaction.recipientOrSource,
          isRecurring: transaction.isRecurring
        }
      });
    } else {
      const t = memoryStore.transactions.find(tx => tx._id.toString() === req.params.id);
      if (!t) return res.status(404).json({ success: false, message: 'Transaction not found' });
      if (t.userId.toString() !== req.user._id.toString()) return res.status(403).json({ success: false, message: 'Not authorized' });

      return res.status(200).json({
        success: true,
        data: {
          id: t._id.toString(),
          _id: t._id,
          title: t.title,
          amount: t.amount,
          type: t.type,
          category: t.category,
          paymentMethod: t.paymentMethod,
          date: typeof t.date === 'string' ? t.date : t.date.toISOString().split('T')[0],
          description: t.description || '',
          recipientOrSource: t.recipientOrSource || '',
          isRecurring: t.isRecurring
        }
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Create new transaction
// @route   POST /api/transactions
// @access  Private
export const createTransaction = async (req, res, next) => {
  try {
    const { title, amount, type, category, paymentMethod, date, description, recipientOrSource, isRecurring } = req.body;

    if (!title || amount === undefined || !category) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title, amount, and category'
      });
    }

    if (mongoose.connection.readyState === 1) {
      const transaction = await Transaction.create({
        userId: req.user._id,
        title,
        amount: Number(amount),
        type: type || 'expense',
        category: category || 'Food',
        paymentMethod: paymentMethod || 'UPI',
        date: date ? new Date(date) : new Date(),
        description: description || '',
        recipientOrSource: recipientOrSource || '',
        isRecurring: Boolean(isRecurring)
      });

      if (transaction.type === 'expense') {
        await adjustBudgetSpent(req.user._id, transaction.category, transaction.amount);
      }

      return res.status(201).json({
        success: true,
        message: 'Transaction created successfully',
        data: {
          id: transaction._id.toString(),
          _id: transaction._id,
          title: transaction.title,
          amount: transaction.amount,
          type: transaction.type,
          category: transaction.category,
          paymentMethod: transaction.paymentMethod,
          date: transaction.date.toISOString().split('T')[0],
          description: transaction.description,
          recipientOrSource: transaction.recipientOrSource,
          isRecurring: transaction.isRecurring
        }
      });
    } else {
      const newTx = {
        _id: `tx-${Date.now()}`,
        userId: req.user._id,
        title,
        amount: Number(amount),
        type: type || 'expense',
        category: category || 'Food',
        paymentMethod: paymentMethod || 'UPI',
        date: date ? new Date(date) : new Date(),
        description: description || '',
        recipientOrSource: recipientOrSource || '',
        isRecurring: Boolean(isRecurring),
        createdAt: new Date(),
        updatedAt: new Date()
      };

      memoryStore.transactions.unshift(newTx);

      if (newTx.type === 'expense') {
        await adjustBudgetSpent(req.user._id, newTx.category, newTx.amount);
      }

      return res.status(201).json({
        success: true,
        message: 'Transaction created successfully',
        data: {
          id: newTx._id.toString(),
          _id: newTx._id,
          title: newTx.title,
          amount: newTx.amount,
          type: newTx.type,
          category: newTx.category,
          paymentMethod: newTx.paymentMethod,
          date: newTx.date.toISOString().split('T')[0],
          description: newTx.description,
          recipientOrSource: newTx.recipientOrSource,
          isRecurring: newTx.isRecurring
        }
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Update existing transaction
// @route   PUT /api/transactions/:id
// @access  Private
export const updateTransaction = async (req, res, next) => {
  try {
    const { title, amount, type, category, paymentMethod, date, description, recipientOrSource, isRecurring } = req.body;

    if (mongoose.connection.readyState === 1) {
      let transaction = await Transaction.findById(req.params.id);
      if (!transaction) return res.status(404).json({ success: false, message: 'Transaction not found' });
      if (!transaction.userId.equals(req.user._id)) return res.status(403).json({ success: false, message: 'Not authorized' });

      const prevType = transaction.type;
      const prevCategory = transaction.category;
      const prevAmount = transaction.amount;

      if (title !== undefined) transaction.title = title;
      if (amount !== undefined) transaction.amount = Number(amount);
      if (type !== undefined) transaction.type = type;
      if (category !== undefined) transaction.category = category;
      if (paymentMethod !== undefined) transaction.paymentMethod = paymentMethod;
      if (date !== undefined) transaction.date = new Date(date);
      if (description !== undefined) transaction.description = description;
      if (recipientOrSource !== undefined) transaction.recipientOrSource = recipientOrSource;
      if (isRecurring !== undefined) transaction.isRecurring = Boolean(isRecurring);

      const updated = await transaction.save();

      if (prevType === 'expense') await adjustBudgetSpent(req.user._id, prevCategory, -prevAmount);
      if (updated.type === 'expense') await adjustBudgetSpent(req.user._id, updated.category, updated.amount);

      return res.status(200).json({
        success: true,
        message: 'Transaction updated successfully',
        data: {
          id: updated._id.toString(),
          _id: updated._id,
          title: updated.title,
          amount: updated.amount,
          type: updated.type,
          category: updated.category,
          paymentMethod: updated.paymentMethod,
          date: updated.date.toISOString().split('T')[0],
          description: updated.description,
          recipientOrSource: updated.recipientOrSource,
          isRecurring: updated.isRecurring
        }
      });
    } else {
      const idx = memoryStore.transactions.findIndex(t => t._id.toString() === req.params.id);
      if (idx === -1) return res.status(404).json({ success: false, message: 'Transaction not found' });
      if (memoryStore.transactions[idx].userId.toString() !== req.user._id.toString()) return res.status(403).json({ success: false, message: 'Not authorized' });

      const prev = memoryStore.transactions[idx];
      const prevType = prev.type;
      const prevCategory = prev.category;
      const prevAmount = prev.amount;

      if (title !== undefined) prev.title = title;
      if (amount !== undefined) prev.amount = Number(amount);
      if (type !== undefined) prev.type = type;
      if (category !== undefined) prev.category = category;
      if (paymentMethod !== undefined) prev.paymentMethod = paymentMethod;
      if (date !== undefined) prev.date = new Date(date);
      if (description !== undefined) prev.description = description;
      if (recipientOrSource !== undefined) prev.recipientOrSource = recipientOrSource;
      if (isRecurring !== undefined) prev.isRecurring = Boolean(isRecurring);

      if (prevType === 'expense') await adjustBudgetSpent(req.user._id, prevCategory, -prevAmount);
      if (prev.type === 'expense') await adjustBudgetSpent(req.user._id, prev.category, prev.amount);

      return res.status(200).json({
        success: true,
        message: 'Transaction updated successfully',
        data: {
          id: prev._id.toString(),
          _id: prev._id,
          title: prev.title,
          amount: prev.amount,
          type: prev.type,
          category: prev.category,
          paymentMethod: prev.paymentMethod,
          date: typeof prev.date === 'string' ? prev.date : prev.date.toISOString().split('T')[0],
          description: prev.description,
          recipientOrSource: prev.recipientOrSource,
          isRecurring: prev.isRecurring
        }
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Delete transaction
// @route   DELETE /api/transactions/:id
// @access  Private
export const deleteTransaction = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const transaction = await Transaction.findById(req.params.id);
      if (!transaction) return res.status(404).json({ success: false, message: 'Transaction not found' });
      if (!transaction.userId.equals(req.user._id)) return res.status(403).json({ success: false, message: 'Not authorized' });

      const prevType = transaction.type;
      const prevCategory = transaction.category;
      const prevAmount = transaction.amount;

      await transaction.deleteOne();

      if (prevType === 'expense') await adjustBudgetSpent(req.user._id, prevCategory, -prevAmount);

      return res.status(200).json({
        success: true,
        message: 'Transaction removed successfully'
      });
    } else {
      const idx = memoryStore.transactions.findIndex(t => t._id.toString() === req.params.id);
      if (idx === -1) return res.status(404).json({ success: false, message: 'Transaction not found' });
      if (memoryStore.transactions[idx].userId.toString() !== req.user._id.toString()) return res.status(403).json({ success: false, message: 'Not authorized' });

      const prev = memoryStore.transactions[idx];
      memoryStore.transactions.splice(idx, 1);

      if (prev.type === 'expense') await adjustBudgetSpent(req.user._id, prev.category, -prev.amount);

      return res.status(200).json({
        success: true,
        message: 'Transaction removed successfully'
      });
    }
  } catch (error) {
    next(error);
  }
};
