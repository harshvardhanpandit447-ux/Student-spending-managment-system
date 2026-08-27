import mongoose from 'mongoose';

const splitParticipantSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  isPaid: {
    type: Boolean,
    default: false
  },
  upiId: {
    type: String,
    trim: true
  }
});

const splitExpenseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    title: {
      type: String,
      required: [true, 'Please provide a split title/description'],
      trim: true
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0
    },
    date: {
      type: Date,
      default: Date.now
    },
    paidBy: {
      type: String,
      default: 'You'
    },
    category: {
      type: String,
      default: 'Food'
    },
    status: {
      type: String,
      enum: ['pending', 'partially_settled', 'settled'],
      default: 'pending'
    },
    participants: [splitParticipantSchema]
  },
  {
    timestamps: true
  }
);

splitExpenseSchema.index({ userId: 1, createdAt: -1 });

export const SplitExpense = mongoose.model('SplitExpense', splitExpenseSchema);
