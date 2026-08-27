import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { User } from '../models/User.js';
import { memoryStore } from '../config/memoryStore.js';

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(
        token, 
        process.env.JWT_SECRET || 'finflow_super_secure_jwt_secret_key_2026_student_platform'
      );

      let user = null;
      if (mongoose.connection.readyState === 1) {
        user = await User.findById(decoded.id).select('-password');
      } else {
        const found = memoryStore.users.find(u => u._id.toString() === decoded.id.toString());
        if (found) {
          user = { ...found };
          delete user.password;
        }
      }

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'User no longer exists or session expired'
        });
      }

      req.user = user;
      return next();
    } catch (error) {
      console.error('[AuthMiddleware] Token verification failed:', error.message);
      return res.status(401).json({
        success: false,
        message: 'Not authorized, invalid or expired token'
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, no bearer token provided'
    });
  }
};
