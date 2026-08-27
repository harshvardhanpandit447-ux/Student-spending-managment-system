import mongoose from 'mongoose';

const savingsGoalSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    name: {
      type: String,
      required: [true, 'Please provide a name for this savings goal'],
      trim: true
    },
    targetAmount: {
      type: Number,
      required: [true, 'Please provide a target amount'],
      min: [1, 'Target amount must be greater than 0']
    },
    currentAmount: {
      type: Number,
      default: 0,
      min: [0, 'Current amount cannot be negative']
    },
    deadline: {
      type: String,
      default: 'December 2026'
    },
    category: {
      type: String,
      default: 'Tech & Hardware'
    },
    icon: {
      type: String,
      default: 'Laptop'
    },
    color: {
      type: String,
      default: '#8B5CF6'
    },
    description: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

export const SavingsGoal = mongoose.model('SavingsGoal', savingsGoalSchema);
