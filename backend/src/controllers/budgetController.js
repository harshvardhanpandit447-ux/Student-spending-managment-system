import { supabase } from '../config/supabase.js';

const mapBudget = (b) => ({
  id: b.id,
  _id: b.id,
  category: b.category,
  limit: Number(b.amount),
  spent: Number(b.spent || 0),
  period: b.period || 'monthly',
  warningThreshold: Number(b.warning_threshold || 0.8),
  color: b.color || '#8B5CF6'
});

// @desc    Get all budgets for authenticated user from Supabase
// @route   GET /api/budgets
// @access  Private
export const getBudgets = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id;

    const { data: budgets, error } = await supabase
      .from('budgets')
      .select('*')
      .eq('user_id', userId)
      .order('category', { ascending: true });

    if (error) {
      console.error('[getBudgets] Supabase query error:', error.message);
      return res.status(500).json({ success: false, message: error.message });
    }

    return res.status(200).json({
      success: true,
      count: budgets.length,
      data: budgets.map(mapBudget)
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new category budget in Supabase
// @route   POST /api/budgets
// @access  Private
export const createBudget = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id;
    const { category, amount, limit, period, warningThreshold, color } = req.body;
    const limitAmount = amount !== undefined ? amount : limit;

    if (!category || limitAmount === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Please provide category and budget limit amount'
      });
    }

    // Check if budget already exists for this category
    const { data: existing } = await supabase
      .from('budgets')
      .select('id')
      .eq('user_id', userId)
      .eq('category', category)
      .maybeSingle();

    if (existing) {
      return res.status(400).json({
        success: false,
        message: `A budget for category "${category}" already exists`
      });
    }

    const { data: budget, error } = await supabase
      .from('budgets')
      .insert({
        user_id: userId,
        category,
        amount: Number(limitAmount),
        spent: 0,
        period: period || 'monthly',
        warning_threshold: warningThreshold !== undefined ? Number(warningThreshold) : 0.8,
        color: color || '#8B5CF6'
      })
      .select()
      .single();

    if (error || !budget) {
      console.error('[createBudget] Supabase insert error:', error?.message);
      return res.status(500).json({ success: false, message: error?.message || 'Failed to create budget' });
    }

    return res.status(201).json({
      success: true,
      message: 'Budget created successfully',
      data: mapBudget(budget)
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update budget in Supabase
// @route   PUT /api/budgets/:id
// @access  Private
export const updateBudget = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id;
    const { amount, limit, spent, period, warningThreshold, color } = req.body;
    const limitAmount = amount !== undefined ? amount : limit;

    const updates = { updated_at: new Date() };
    if (limitAmount !== undefined) updates.amount = Number(limitAmount);
    if (spent !== undefined) updates.spent = Number(spent);
    if (period !== undefined) updates.period = period;
    if (warningThreshold !== undefined) updates.warning_threshold = Number(warningThreshold);
    if (color !== undefined) updates.color = color;

    const { data: updated, error } = await supabase
      .from('budgets')
      .update(updates)
      .eq('id', req.params.id)
      .eq('user_id', userId)
      .select()
      .single();

    if (error || !updated) {
      return res.status(500).json({ success: false, message: error?.message || 'Failed to update budget' });
    }

    return res.status(200).json({
      success: true,
      message: 'Budget updated successfully',
      data: mapBudget(updated)
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete budget from Supabase
// @route   DELETE /api/budgets/:id
// @access  Private
export const deleteBudget = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id;

    const { error } = await supabase
      .from('budgets')
      .delete()
      .eq('id', req.params.id)
      .eq('user_id', userId);

    if (error) {
      return res.status(500).json({ success: false, message: error.message });
    }

    return res.status(200).json({ success: true, message: 'Budget removed successfully' });
  } catch (error) {
    next(error);
  }
};
