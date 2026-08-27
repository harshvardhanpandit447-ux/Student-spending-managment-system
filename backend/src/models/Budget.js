import mongoose from 'mongoose';

const budgetSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    category: {
      type: String,
      required: [true, 'Please specify a category for this budget'],
      trim: true
    },
    amount: {
      type: Number,
      required: [true, 'Please set a budget limit amount'],
      min: [0, 'Budget limit must be positive']
    },
    spent: {
      type: Number,
      default: 0
    },
    period: {
      type: String,
      enum: ['monthly', 'weekly', 'yearly'],
      default: 'monthly'
    },
    warningThreshold: {
      type: Number,
      default: 0.8, // 80% threshold
      min: 0,
      max: 1
    },
    color: {
      type: String,
      default: '#8B5CF6'
    },
    startDate: {
      type: Date,
      default: Date.now
    },
    endDate: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

budgetSchema.index({ userId: 1, category: 1 }, { unique: true });

export const Budget = mongoose.model('Budget', budgetSchema);
