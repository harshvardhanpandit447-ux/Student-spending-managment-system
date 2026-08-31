import bcrypt from 'bcryptjs';
import { supabase } from '../config/supabase.js';
import { generateToken } from '../utils/generateToken.js';

// Auto-seed demo student account in Supabase if not existing
const seedDemoUser = async (demoEmail, demoPassword) => {
  try {
    const { data: existing } = await supabase
      .from('users')
      .select('*')
      .ilike('email', demoEmail)
      .maybeSingle();

    if (existing) {
      return existing;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(demoPassword, salt);

    const { data: user, error } = await supabase
      .from('users')
      .insert({
        name: 'Aryan Sharma',
        email: demoEmail.toLowerCase().trim(),
        password: hashedPassword,
        college: 'IIT Delhi',
        year: '3rd Year (B.Tech CSE)',
        monthly_budget: 15000,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
        currency: '₹'
      })
      .select()
      .single();

    if (user && !error) {
      try {
        // Seed starter budgets
        await supabase.from('budgets').insert([
          { user_id: user.id, category: 'Food & Dining', amount: 5000, spent: 1850, color: '#10B981' },
          { user_id: user.id, category: 'Transport', amount: 2000, spent: 650, color: '#3B82F6' },
          { user_id: user.id, category: 'Education & Books', amount: 3000, spent: 1200, color: '#8B5CF6' },
          { user_id: user.id, category: 'Entertainment', amount: 2000, spent: 900, color: '#F59E0B' }
        ]);

        // Seed starter transactions
        const now = new Date();
        await supabase.from('transactions').insert([
          { user_id: user.id, title: 'Campus Canteen Lunch', amount: 120, type: 'expense', category: 'Food & Dining', payment_method: 'UPI', date: now.toISOString() },
          { user_id: user.id, title: 'Metro Smart Card Recharge', amount: 500, type: 'expense', category: 'Transport', payment_method: 'UPI', date: new Date(now.getTime() - 86400000).toISOString() },
          { user_id: user.id, title: 'Freelance Web Design Stipend', amount: 8000, type: 'income', category: 'Freelance', payment_method: 'Bank Transfer', date: new Date(now.getTime() - 172800000).toISOString() },
          { user_id: user.id, title: 'Coding Reference Book', amount: 650, type: 'expense', category: 'Education & Books', payment_method: 'UPI', date: new Date(now.getTime() - 259200000).toISOString() }
        ]);

        // Seed starter savings goals
        await supabase.from('savings_goals').insert([
          { user_id: user.id, name: 'MacBook Pro M3 Fund', target_amount: 90000, current_amount: 35000, deadline: 'December 2026', category: 'Tech & Hardware', icon: 'Laptop', color: '#8B5CF6' },
          { user_id: user.id, name: 'Semester Break Trip', target_amount: 15000, current_amount: 8500, deadline: 'November 2026', category: 'Travel', icon: 'Plane', color: '#06B6D4' }
        ]);

        // Seed starter split bills
        await supabase.from('split_expenses').insert([
          {
            user_id: user.id,
            title: 'Weekend Pizza Party & Snacks',
            total_amount: 1200,
            category: 'Food & Dining',
            paid_by: 'You',
            status: 'partially_settled',
            participants: [
              { id: 'p1', name: 'Rohan (Hostel 204)', amount: 400, isPaid: true },
              { id: 'p2', name: 'Aarav (CS Batchmate)', amount: 400, isPaid: false },
              { id: 'p3', name: 'Tanmay', amount: 400, isPaid: true }
            ]
          }
        ]);
      } catch (seedErr) {
        console.warn('[SeedDemoUser] Sub-resource seeding warning:', seedErr.message);
      }
      return user;
    }

    return existing || null;
  } catch (err) {
    console.error('[SeedDemoUser] Error:', err.message);
    return null;
  }
};

// @desc    Register a new user in Supabase
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, college, year, monthlyBudget } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide full name, email, and password'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long'
      });
    }

    const cleanEmail = email.toLowerCase().trim();

    // Check if user already exists in Supabase (case-insensitive)
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .ilike('email', cleanEmail)
      .maybeSingle();

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email already exists. Please log in.'
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const budgetLimit = Number(monthlyBudget) || 10000;

    const { data: newUser, error: insertError } = await supabase
      .from('users')
      .insert({
        name: name.trim(),
        email: cleanEmail,
        password: hashedPassword,
        college: college ? college.trim() : 'Campus Student',
        year: year ? year.trim() : 'Student',
        monthly_budget: budgetLimit,
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

    // Seed default starter budgets for the new student account
    try {
      await supabase.from('budgets').insert([
        { user_id: newUser.id, category: 'Food & Dining', amount: Math.round(budgetLimit * 0.4), spent: 0, color: '#10B981' },
        { user_id: newUser.id, category: 'Transport', amount: Math.round(budgetLimit * 0.15), spent: 0, color: '#3B82F6' },
        { user_id: newUser.id, category: 'Education & Books', amount: Math.round(budgetLimit * 0.2), spent: 0, color: '#8B5CF6' },
        { user_id: newUser.id, category: 'Entertainment', amount: Math.round(budgetLimit * 0.15), spent: 0, color: '#F59E0B' }
      ]);
    } catch (e) {
      console.warn('[Register] Starter budget seed note:', e.message);
    }

    const token = generateToken(newUser.id);

    return res.status(201).json({
      success: true,
      message: 'Account created successfully',
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

    // Query with case-insensitivity using ilike
    let { data: user, error } = await supabase
      .from('users')
      .select('*')
      .ilike('email', cleanEmail)
      .maybeSingle();

    // Auto-seed demo account if requested and not yet existing
    if ((!user || error) && cleanEmail === 'aryan.sharma@iitd.ac.in') {
      user = await seedDemoUser(cleanEmail, 'password123');
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password. Please check your credentials.'
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password. Please check your credentials.'
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
    if (name !== undefined) updates.name = name.trim();
    if (college !== undefined) updates.college = college.trim();
    if (year !== undefined) updates.year = year.trim();
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
