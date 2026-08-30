import bcrypt from 'bcryptjs';
import { supabase } from '../config/supabase.js';
import { generateToken } from '../utils/generateToken.js';

// @desc    Register a new user in Supabase
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

    // Check if user already exists in Supabase
    const { data: existingUser, error: checkError } = await supabase
      .from('users')
      .select('id')
      .eq('email', cleanEmail)
      .maybeSingle();

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email already exists'
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const { data: newUser, error: insertError } = await supabase
      .from('users')
      .insert({
        name,
        email: cleanEmail,
        password: hashedPassword,
        college: college || 'Campus Student',
        year: year || 'Student',
        monthly_budget: Number(monthlyBudget) || 10000,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
        currency: '₹'
      })
      .select()
      .single();

    if (insertError || !newUser) {
      console.error('[Register] Supabase insert error:', insertError?.message);
      return res.status(500).json({
        success: false,
        message: insertError?.message || 'Failed to create user account'
      });
    }

    const token = generateToken(newUser.id);

    return res.status(201).json({
      success: true,
      message: 'Account created successfully in Supabase',
      data: {
        _id: newUser.id,
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        college: newUser.college,
        year: newUser.year,
        monthlyBudget: Number(newUser.monthly_budget),
        avatar: newUser.avatar,
        currency: newUser.currency,
        token
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Authenticate user & get token via Supabase
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

    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', cleanEmail)
      .maybeSingle();

    if (error || !user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    const token = generateToken(user.id);

    return res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      data: {
        _id: user.id,
        id: user.id,
        name: user.name,
        email: user.email,
        college: user.college,
        year: user.year,
        monthlyBudget: Number(user.monthly_budget),
        avatar: user.avatar,
        currency: user.currency,
        token
      }
    });
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
        _id: req.user._id || req.user.id,
        id: req.user._id || req.user.id,
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

// @desc    Update user profile in Supabase
// @route   PUT /api/auth/me
// @access  Private
export const updateUserProfile = async (req, res, next) => {
  try {
    const { name, college, year, monthlyBudget, avatar, currency } = req.body;
    const userId = req.user._id || req.user.id;

    const updates = { updated_at: new Date() };
    if (name !== undefined) updates.name = name;
    if (college !== undefined) updates.college = college;
    if (year !== undefined) updates.year = year;
    if (monthlyBudget !== undefined) updates.monthly_budget = Number(monthlyBudget);
    if (avatar !== undefined) updates.avatar = avatar;
    if (currency !== undefined) updates.currency = currency;

    const { data: updatedUser, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    if (error || !updatedUser) {
      return res.status(500).json({
        success: false,
        message: error?.message || 'Failed to update profile'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        _id: updatedUser.id,
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        college: updatedUser.college,
        year: updatedUser.year,
        monthlyBudget: Number(updatedUser.monthly_budget),
        avatar: updatedUser.avatar,
        currency: updatedUser.currency
      }
    });
  } catch (error) {
    next(error);
  }
};
