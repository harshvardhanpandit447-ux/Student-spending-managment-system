import { supabase } from '../config/supabase.js';

// Helper to update budget spent in Supabase
const adjustBudgetSpent = async (userId, category, amountDelta) => {
  if (!category || !amountDelta) return;
  try {
    const { data: budget } = await supabase
      .from('budgets')
      .select('*')
      .eq('user_id', userId)
      .eq('category', category)
      .maybeSingle();

    if (budget) {
      const newSpent = Math.max(0, Number(budget.spent || 0) + Number(amountDelta));
      await supabase
        .from('budgets')
        .update({ spent: newSpent, updated_at: new Date() })
        .eq('id', budget.id);
    }
  } catch (err) {
    console.error('[adjustBudgetSpent Error]', err.message);
  }
};

const mapTx = (t) => ({
  id: t.id,
  _id: t.id,
  title: t.title,
  amount: Number(t.amount),
  type: t.type,
  category: t.category,
  paymentMethod: t.payment_method,
  date: typeof t.date === 'string' ? t.date.split('T')[0] : new Date(t.date).toISOString().split('T')[0],
  description: t.description || '',
  recipientOrSource: t.recipient_or_source || '',
  isRecurring: Boolean(t.is_recurring)
});

// @desc    Get all transactions for authenticated user from Supabase
// @route   GET /api/transactions
// @access  Private
export const getTransactions = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id;
    const { category, type, paymentMethod, search, limit = 100, page = 1 } = req.query;

    let query = supabase
      .from('transactions')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false })
      .order('created_at', { ascending: false });

    if (category && category !== 'all' && category !== 'All') {
      query = query.eq('category', category);
    }
    if (type && type !== 'all') {
      query = query.eq('type', type);
    }
    if (paymentMethod && paymentMethod !== 'all' && paymentMethod !== 'All') {
      query = query.eq('payment_method', paymentMethod);
    }
    if (search) {
      query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%,recipient_or_source.ilike.%${search}%`);
    }

    const from = (Number(page) - 1) * Number(limit);
    const to = from + Number(limit) - 1;
    query = query.range(from, to);

    const { data: transactions, error } = await query;

    if (error) {
      console.error('[getTransactions] Supabase query error:', error.message);
      return res.status(500).json({ success: false, message: error.message });
    }

    return res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions.map(mapTx)
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single transaction by ID
// @route   GET /api/transactions/:id
// @access  Private
export const getTransactionById = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id;
    const { data: transaction, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('id', req.params.id)
      .eq('user_id', userId)
      .maybeSingle();

    if (error || !transaction) {
      return res.status(404).json({ success: false, message: 'Transaction not found' });
    }

    return res.status(200).json({
      success: true,
      data: mapTx(transaction)
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new transaction in Supabase
// @route   POST /api/transactions
// @access  Private
export const createTransaction = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id;
    const { title, amount, type, category, paymentMethod, date, description, recipientOrSource, isRecurring } = req.body;

    if (!title || amount === undefined || !category) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title, amount, and category'
      });
    }

    const newTx = {
      user_id: userId,
      title,
      amount: Number(amount),
      type: type || 'expense',
      category: category || 'Food',
      payment_method: paymentMethod || 'UPI',
      date: date ? new Date(date).toISOString() : new Date().toISOString(),
      description: description || '',
      recipient_or_source: recipientOrSource || '',
      is_recurring: Boolean(isRecurring)
    };

    const { data: transaction, error } = await supabase
      .from('transactions')
      .insert(newTx)
      .select()
      .single();

    if (error || !transaction) {
      console.error('[createTransaction] Supabase insert error:', error?.message);
      return res.status(500).json({ success: false, message: error?.message || 'Failed to create transaction' });
    }

    if (transaction.type === 'expense') {
      await adjustBudgetSpent(userId, transaction.category, transaction.amount);
    }

    return res.status(201).json({
      success: true,
      message: 'Transaction created successfully',
      data: mapTx(transaction)
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update existing transaction in Supabase
// @route   PUT /api/transactions/:id
// @access  Private
export const updateTransaction = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id;
    const { title, amount, type, category, paymentMethod, date, description, recipientOrSource, isRecurring } = req.body;

    const { data: existing, error: findError } = await supabase
      .from('transactions')
      .select('*')
      .eq('id', req.params.id)
      .eq('user_id', userId)
      .maybeSingle();

    if (findError || !existing) {
      return res.status(404).json({ success: false, message: 'Transaction not found' });
    }

    const prevType = existing.type;
    const prevCategory = existing.category;
    const prevAmount = Number(existing.amount);

    const updates = { updated_at: new Date() };
    if (title !== undefined) updates.title = title;
    if (amount !== undefined) updates.amount = Number(amount);
    if (type !== undefined) updates.type = type;
    if (category !== undefined) updates.category = category;
    if (paymentMethod !== undefined) updates.payment_method = paymentMethod;
    if (date !== undefined) updates.date = new Date(date).toISOString();
    if (description !== undefined) updates.description = description;
    if (recipientOrSource !== undefined) updates.recipient_or_source = recipientOrSource;
    if (isRecurring !== undefined) updates.is_recurring = Boolean(isRecurring);

    const { data: updated, error: updateError } = await supabase
      .from('transactions')
      .update(updates)
      .eq('id', req.params.id)
      .eq('user_id', userId)
      .select()
      .single();

    if (updateError || !updated) {
      return res.status(500).json({ success: false, message: updateError?.message || 'Failed to update transaction' });
    }

    if (prevType === 'expense') await adjustBudgetSpent(userId, prevCategory, -prevAmount);
    if (updated.type === 'expense') await adjustBudgetSpent(userId, updated.category, Number(updated.amount));

    return res.status(200).json({
      success: true,
      message: 'Transaction updated successfully',
      data: mapTx(updated)
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete transaction from Supabase
// @route   DELETE /api/transactions/:id
// @access  Private
export const deleteTransaction = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id;

    const { data: existing, error: findError } = await supabase
      .from('transactions')
      .select('*')
      .eq('id', req.params.id)
      .eq('user_id', userId)
      .maybeSingle();

    if (findError || !existing) {
      return res.status(404).json({ success: false, message: 'Transaction not found' });
    }

    const { error: deleteError } = await supabase
      .from('transactions')
      .delete()
      .eq('id', req.params.id)
      .eq('user_id', userId);

    if (deleteError) {
      return res.status(500).json({ success: false, message: deleteError.message });
    }

    if (existing.type === 'expense') {
      await adjustBudgetSpent(userId, existing.category, -Number(existing.amount));
    }

    return res.status(200).json({
      success: true,
      message: 'Transaction removed successfully'
    });
  } catch (error) {
    next(error);
  }
};
