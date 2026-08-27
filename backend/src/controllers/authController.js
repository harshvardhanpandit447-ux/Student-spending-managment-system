import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';
import { generateToken } from '../utils/generateToken.js';
import { memoryStore } from '../config/memoryStore.js';

// @desc    Register a new user (Zero fake seeds - completely clean account)
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, college, year, monthlyBudget } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and password'
      });
    }

    const cleanEmail = email.toLowerCase().trim();

    if (mongoose.connection.readyState === 1) {
      const userExists = await User.findOne({ email: cleanEmail });
      if (userExists) {
        return res.status(400).json({
          success: false,
          message: 'An account with this email already exists'
        });
      }

      const user = await User.create({
        name,
        email: cleanEmail,
        password,
        college: college || 'Campus Student',
        year: year || 'Student',
        monthlyBudget: Number(monthlyBudget) || 10000
      });

      const token = generateToken(user._id);

      return res.status(201).json({
        success: true,
        message: 'Account created successfully',
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          college: user.college,
          year: user.year,
          monthlyBudget: user.monthlyBudget,
          avatar: user.avatar,
          currency: user.currency,
          token
        }
      });
    } else {
      const userExists = memoryStore.users.find(u => u.email === cleanEmail);
      if (userExists) {
        return res.status(400).json({
          success: false,
          message: 'An account with this email already exists'
        });
      }

      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);
      const newUser = {
        _id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name,
        email: cleanEmail,
        password: hashedPassword,
        college: college || 'Campus Student',
        year: year || 'Student',
        monthlyBudget: Number(monthlyBudget) || 10000,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
        currency: '₹',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      memoryStore.users.push(newUser);
      const token = generateToken(newUser._id);

      return res.status(201).json({
        success: true,
        message: 'Account created successfully',
        data: {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          college: newUser.college,
          year: newUser.year,
          monthlyBudget: newUser.monthlyBudget,
          avatar: newUser.avatar,
          currency: newUser.currency,
          token
        }
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password'
      });
    }

    const cleanEmail = email.toLowerCase().trim();

    if (mongoose.connection.readyState === 1) {
      const user = await User.findOne({ email: cleanEmail }).select('+password');

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });
      }

      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });
      }

      const token = generateToken(user._id);

      return res.status(200).json({
        success: true,
        message: 'Logged in successfully',
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          college: user.college,
          year: user.year,
          monthlyBudget: user.monthlyBudget,
          avatar: user.avatar,
          currency: user.currency,
          token
        }
      });
    } else {
      const user = memoryStore.users.find(u => u.email === cleanEmail);

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });
      }

      const isMatch = bcrypt.compareSync(password, user.password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });
      }

      const token = generateToken(user._id);

      return res.status(200).json({
        success: true,
        message: 'Logged in successfully',
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          college: user.college,
          year: user.year,
          monthlyBudget: user.monthlyBudget,
          avatar: user.avatar,
          currency: user.currency,
          token
        }
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
export const getUserProfile = async (req, res, next) => {
  try {
    return res.status(200).json({
      success: true,
      data: {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        college: req.user.college,
        year: req.user.year,
        monthlyBudget: req.user.monthlyBudget,
        avatar: req.user.avatar,
        currency: req.user.currency
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/me
// @access  Private
export const updateUserProfile = async (req, res, next) => {
  try {
    const { name, college, year, monthlyBudget, avatar, currency } = req.body;

    if (mongoose.connection.readyState === 1) {
      const user = await User.findById(req.user._id);
      if (!user) return res.status(404).json({ success: false, message: 'User not found' });

      if (name) user.name = name;
      if (college) user.college = college;
      if (year) user.year = year;
      if (monthlyBudget !== undefined) user.monthlyBudget = Number(monthlyBudget);
      if (avatar) user.avatar = avatar;
      if (currency) user.currency = currency;

      const updatedUser = await user.save();

      return res.status(200).json({
        success: true,
        message: 'Profile updated successfully',
        data: {
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          college: updatedUser.college,
          year: updatedUser.year,
          monthlyBudget: updatedUser.monthlyBudget,
          avatar: updatedUser.avatar,
          currency: updatedUser.currency
        }
      });
    } else {
      const idx = memoryStore.users.findIndex(u => u._id.toString() === req.user._id.toString());
      if (idx !== -1) {
        if (name) memoryStore.users[idx].name = name;
        if (college) memoryStore.users[idx].college = college;
        if (year) memoryStore.users[idx].year = year;
        if (monthlyBudget !== undefined) memoryStore.users[idx].monthlyBudget = Number(monthlyBudget);
        if (avatar) memoryStore.users[idx].avatar = avatar;
        if (currency) memoryStore.users[idx].currency = currency;

        return res.status(200).json({
          success: true,
          message: 'Profile updated successfully',
          data: memoryStore.users[idx]
        });
      }
      return res.status(404).json({ success: false, message: 'User not found' });
    }
  } catch (error) {
    next(error);
  }
};
