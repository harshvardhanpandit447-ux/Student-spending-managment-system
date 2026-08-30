import { supabase } from '../config/supabase.js';

const mapNotif = (n) => ({
  id: n.id,
  _id: n.id,
  title: n.title,
  message: n.message,
  type: n.type,
  timestamp: n.timestamp || 'Just now',
  isRead: Boolean(n.is_read),
  priority: n.priority || 'medium',
  tag: n.tag || ''
});

// @desc    Get user notifications from Supabase
// @route   GET /api/notifications
// @access  Private
export const getNotifications = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id;

    const { data: notifs, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[getNotifications] Supabase query error:', error.message);
      return res.status(500).json({ success: false, message: error.message });
    }

    return res.status(200).json({
      success: true,
      count: notifs.length,
      data: notifs.map(mapNotif)
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Mark notification as read in Supabase
// @route   PUT /api/notifications/:id/read
// @access  Private
export const markAsRead = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id;

    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true, updated_at: new Date() })
      .eq('id', req.params.id)
      .eq('user_id', userId);

    if (error) {
      return res.status(500).json({ success: false, message: error.message });
    }

    return res.status(200).json({ success: true, message: 'Marked as read' });
  } catch (error) {
    next(error);
  }
};

// @desc    Mark all notifications as read in Supabase
// @route   PUT /api/notifications/read-all
// @access  Private
export const markAllAsRead = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id;

    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true, updated_at: new Date() })
      .eq('user_id', userId);

    if (error) {
      return res.status(500).json({ success: false, message: error.message });
    }

    return res.status(200).json({ success: true, message: 'All marked as read' });
  } catch (error) {
    next(error);
  }
};
