import mongoose from 'mongoose';
import { Notification } from '../models/Notification.js';
import { Budget } from '../models/Budget.js';
import { memoryStore } from '../config/memoryStore.js';

// @desc    Get user notifications (real user-specific notifications)
// @route   GET /api/notifications
// @access  Private
export const getNotifications = async (req, res, next) => {
  try {
    const userId = req.user._id;

    if (mongoose.connection.readyState === 1) {
      const notifs = await Notification.find({ userId }).sort({ createdAt: -1 });
      return res.status(200).json({
        success: true,
        count: notifs.length,
        data: notifs.map(n => ({
          id: n._id.toString(),
          _id: n._id,
          title: n.title,
          message: n.message,
          type: n.type,
          timestamp: n.timestamp,
          isRead: n.isRead,
          priority: n.priority,
          tag: n.tag
        }))
      });
    } else {
      if (!memoryStore.notifications) memoryStore.notifications = [];
      const list = memoryStore.notifications.filter(n => n.userId.toString() === userId.toString());
      return res.status(200).json({
        success: true,
        count: list.length,
        data: list.map(n => ({
          id: n._id.toString(),
          _id: n._id,
          title: n.title,
          message: n.message,
          type: n.type,
          timestamp: n.timestamp,
          isRead: n.isRead,
          priority: n.priority,
          tag: n.tag
        }))
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Mark notification as read
// @route   PUT /api/notifications/:id/read
// @access  Private
export const markAsRead = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const notif = await Notification.findById(req.params.id);
      if (!notif) return res.status(404).json({ success: false, message: 'Notification not found' });
      if (!notif.userId.equals(req.user._id)) return res.status(403).json({ success: false, message: 'Not authorized' });

      notif.isRead = true;
      await notif.save();

      return res.status(200).json({ success: true, message: 'Marked as read' });
    } else {
      if (!memoryStore.notifications) memoryStore.notifications = [];
      const notif = memoryStore.notifications.find(n => n._id.toString() === req.params.id);
      if (!notif) return res.status(404).json({ success: false, message: 'Notification not found' });
      if (notif.userId.toString() !== req.user._id.toString()) return res.status(403).json({ success: false, message: 'Not authorized' });

      notif.isRead = true;
      return res.status(200).json({ success: true, message: 'Marked as read' });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Mark all notifications as read
// @route   PUT /api/notifications/read-all
// @access  Private
export const markAllAsRead = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      await Notification.updateMany({ userId: req.user._id }, { isRead: true });
      return res.status(200).json({ success: true, message: 'All marked as read' });
    } else {
      if (!memoryStore.notifications) memoryStore.notifications = [];
      memoryStore.notifications.forEach(n => {
        if (n.userId.toString() === req.user._id.toString()) n.isRead = true;
      });
      return res.status(200).json({ success: true, message: 'All marked as read' });
    }
  } catch (error) {
    next(error);
  }
};
