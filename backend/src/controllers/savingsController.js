import { supabase } from '../config/supabase.js';

const mapGoal = (g) => ({
  id: g.id,
  _id: g.id,
  title: g.name,
  name: g.name,
  targetAmount: Number(g.target_amount),
  currentAmount: Number(g.current_amount || 0),
  deadline: g.deadline || 'December 2026',
  category: g.category || 'Tech & Hardware',
  icon: g.icon || 'Laptop',
  color: g.color || '#8B5CF6',
  description: g.description || ''
});

// @desc    Get all savings goals for authenticated user from Supabase
// @route   GET /api/savings
// @access  Private
export const getSavingsGoals = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id;

    const { data: goals, error } = await supabase
      .from('savings_goals')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[getSavingsGoals] Supabase query error:', error.message);
      return res.status(500).json({ success: false, message: error.message });
    }

    return res.status(200).json({
      success: true,
      count: goals.length,
      data: goals.map(mapGoal)
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new savings goal in Supabase
// @route   POST /api/savings
// @access  Private
export const createSavingsGoal = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id;
    const { name, title, targetAmount, currentAmount, deadline, category, icon, color, description } = req.body;
    const goalTitle = name || title;

    if (!goalTitle || !targetAmount) {
      return res.status(400).json({
        success: false,
        message: 'Please provide goal title/name and target amount'
      });
    }

    const { data: goal, error } = await supabase
      .from('savings_goals')
      .insert({
        user_id: userId,
        name: goalTitle,
        target_amount: Number(targetAmount),
        current_amount: Number(currentAmount) || 0,
        deadline: deadline || 'December 2026',
        category: category || 'Tech & Hardware',
        icon: icon || 'Laptop',
        color: color || '#8B5CF6',
        description: description || ''
      })
      .select()
      .single();

    if (error || !goal) {
      console.error('[createSavingsGoal] Supabase insert error:', error?.message);
      return res.status(500).json({ success: false, message: error?.message || 'Failed to create savings goal' });
    }

    return res.status(201).json({
      success: true,
      message: 'Savings goal created successfully',
      data: mapGoal(goal)
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update savings goal or deposit funds in Supabase
// @route   PUT /api/savings/:id
// @access  Private
export const updateSavingsGoal = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id;
    const { name, title, targetAmount, currentAmount, depositAmount, deadline, category, icon, color, description } = req.body;

    const { data: existing, error: findError } = await supabase
      .from('savings_goals')
      .select('*')
      .eq('id', req.params.id)
      .eq('user_id', userId)
      .maybeSingle();

    if (findError || !existing) {
      return res.status(404).json({ success: false, message: 'Savings goal not found' });
    }

    const updates = { updated_at: new Date() };
    if (name !== undefined || title !== undefined) updates.name = name || title;
    if (targetAmount !== undefined) updates.target_amount = Number(targetAmount);
    if (deadline !== undefined) updates.deadline = deadline;
    if (category !== undefined) updates.category = category;
    if (icon !== undefined) updates.icon = icon;
    if (color !== undefined) updates.color = color;
    if (description !== undefined) updates.description = description;

    if (depositAmount !== undefined) {
      const target = Number(updates.target_amount || existing.target_amount);
      const current = Number(existing.current_amount || 0);
      updates.current_amount = Math.min(target, current + Number(depositAmount));
    } else if (currentAmount !== undefined) {
      updates.current_amount = Number(currentAmount);
    }

    const { data: updated, error: updateError } = await supabase
      .from('savings_goals')
      .update(updates)
      .eq('id', req.params.id)
      .eq('user_id', userId)
      .select()
      .single();

    if (updateError || !updated) {
      return res.status(500).json({ success: false, message: updateError?.message || 'Failed to update savings goal' });
    }

    return res.status(200).json({
      success: true,
      message: 'Savings goal updated successfully',
      data: mapGoal(updated)
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete savings goal from Supabase
// @route   DELETE /api/savings/:id
// @access  Private
export const deleteSavingsGoal = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id;

    const { error } = await supabase
      .from('savings_goals')
      .delete()
      .eq('id', req.params.id)
      .eq('user_id', userId);

    if (error) {
      return res.status(500).json({ success: false, message: error.message });
    }

    return res.status(200).json({ success: true, message: 'Savings goal removed successfully' });
  } catch (error) {
    next(error);
  }
};
