import { supabase } from '../config/supabase.js';

const mapSplit = (s) => ({
  id: s.id,
  _id: s.id,
  title: s.title,
  totalAmount: Number(s.total_amount),
  date: typeof s.date === 'string' ? s.date.split('T')[0] : new Date(s.date).toISOString().split('T')[0],
  paidBy: s.paid_by,
  category: s.category,
  status: s.status,
  participants: s.participants || []
});

// @desc    Get all split expenses for authenticated user from Supabase
// @route   GET /api/splits
// @access  Private
export const getSplits = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id;

    const { data: splits, error } = await supabase
      .from('split_expenses')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[getSplits] Supabase query error:', error.message);
      return res.status(500).json({ success: false, message: error.message });
    }

    return res.status(200).json({
      success: true,
      count: splits.length,
      data: splits.map(mapSplit)
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new split expense in Supabase
// @route   POST /api/splits
// @access  Private
export const createSplit = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id;
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

    const { data: split, error } = await supabase
      .from('split_expenses')
      .insert({
        user_id: userId,
        title,
        total_amount: Number(totalAmount),
        category: category || 'Food',
        paid_by: paidBy || 'You',
        date: date ? new Date(date).toISOString() : new Date().toISOString(),
        status,
        participants
      })
      .select()
      .single();

    if (error || !split) {
      console.error('[createSplit] Supabase insert error:', error?.message);
      return res.status(500).json({ success: false, message: error?.message || 'Failed to create split expense' });
    }

    return res.status(201).json({
      success: true,
      message: 'Split expense created successfully',
      data: mapSplit(split)
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle participant paid status in Supabase
// @route   PUT /api/splits/:id/toggle-paid
// @access  Private
export const toggleParticipantPaid = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id;
    const { participantId } = req.body;

    if (!participantId) {
      return res.status(400).json({ success: false, message: 'Please provide participantId' });
    }

    const { data: split, error: findError } = await supabase
      .from('split_expenses')
      .select('*')
      .eq('id', req.params.id)
      .eq('user_id', userId)
      .maybeSingle();

    if (findError || !split) {
      return res.status(404).json({ success: false, message: 'Split not found' });
    }

    const updatedParticipants = (split.participants || []).map(p => {
      if (p.id === participantId) {
        return { ...p, isPaid: !p.isPaid };
      }
      return p;
    });

    const allPaid = updatedParticipants.every(p => p.isPaid);
    const somePaid = updatedParticipants.some(p => p.isPaid);
    const status = allPaid ? 'settled' : somePaid ? 'partially_settled' : 'pending';

    const { data: updated, error: updateError } = await supabase
      .from('split_expenses')
      .update({
        participants: updatedParticipants,
        status,
        updated_at: new Date()
      })
      .eq('id', req.params.id)
      .eq('user_id', userId)
      .select()
      .single();

    if (updateError || !updated) {
      return res.status(500).json({ success: false, message: updateError?.message || 'Failed to update participant status' });
    }

    return res.status(200).json({
      success: true,
      message: 'Participant status updated',
      data: mapSplit(updated)
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete split from Supabase
// @route   DELETE /api/splits/:id
// @access  Private
export const deleteSplit = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id;

    const { error } = await supabase
      .from('split_expenses')
      .delete()
      .eq('id', req.params.id)
      .eq('user_id', userId);

    if (error) {
      return res.status(500).json({ success: false, message: error.message });
    }

    return res.status(200).json({ success: true, message: 'Split bill removed successfully' });
  } catch (error) {
    next(error);
  }
};
