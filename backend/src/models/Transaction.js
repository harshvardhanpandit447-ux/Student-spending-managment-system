import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    title: {
      type: String,
      required: [true, 'Please add a transaction title/description'],
      trim: true
    },
    amount: {
      type: Number,
      required: [true, 'Please add a valid amount'],
      min: [0, 'Amount must be positive']
    },
    type: {
      type: String,
      enum: ['income', 'expense', 'transfer'],
      required: true,
      default: 'expense'
    },
    category: {
      type: String,
      required: true,
      default: 'Food'
    },
    paymentMethod: {
      type: String,
      enum: ['UPI', 'Cash', 'Debit Card', 'Credit Card', 'Bank Transfer'],
      default: 'UPI'
    },
    date: {
      type: Date,
      default: Date.now,
      index: true
    },
    description: {
      type: String,
      trim: true
    },
    recipientOrSource: {
      type: String,
      trim: true
    },
    isRecurring: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

// Compound index for querying user's transactions by date
transactionSchema.index({ userId: 1, date: -1 });

export const Transaction = mongoose.model('Transaction', transactionSchema);
