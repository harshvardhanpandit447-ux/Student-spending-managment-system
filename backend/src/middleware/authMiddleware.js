import jwt from 'jsonwebtoken';
import { supabase } from '../config/supabase.js';
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

      // Query Supabase users table
      const { data, error } = await supabase
        .from('users')
        .select('id, name, email, college, year, monthly_budget, avatar, currency')
        .eq('id', decoded.id)
        .maybeSingle();

      if (data && !error) {
        user = {
          _id: data.id,
          id: data.id,
          name: data.name,
          email: data.email,
          college: data.college,
          year: data.year,
          monthlyBudget: Number(data.monthly_budget) || 10000,
          avatar: data.avatar,
          currency: data.currency
        };
      } else {
        // Fallback to memory store if any
        const found = memoryStore.users.find(u => (u._id || u.id).toString() === decoded.id.toString());
        if (found) {
          user = { ...found, id: found._id || found.id };
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
