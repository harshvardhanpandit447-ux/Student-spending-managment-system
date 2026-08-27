import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, IndianRupee, Tag, Calendar, CreditCard, Sparkles } from 'lucide-react';
import { TransactionCategory, PaymentMethod, TransactionType } from '../../types';
import { useApp } from '../../context/AppContext';

export const AddTransactionModal: React.FC = () => {
  const { isAddTxModalOpen, setIsAddTxModalOpen, addTransaction } = useApp();
  
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<TransactionType>('expense');
  const [category, setCategory] = useState<TransactionCategory>('Food');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('UPI');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isAddTxModalOpen) return null;

  const categories: TransactionCategory[] = [
    'Food',
    'Transport',
    'Hostel/Rent',
    'Education',
    'Shopping',
    'Entertainment',
    'Subscriptions',
    'Bills',
    'Travel',
    'Freelance',
    'Pocket Money',
    'Scholarship',
    'Other'
  ];

  const paymentMethods: PaymentMethod[] = [
    'UPI',
    'Cash',
    'Debit Card',
    'Credit Card',
    'Bank Transfer'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !amount) return;

    setIsSubmitting(true);
    await addTransaction({
      title,
      amount: parseFloat(amount),
      type,
      category,
      paymentMethod,
      date,
      description,
      recipientOrSource: 'Direct Payment'
    });
    setIsSubmitting(false);
    setIsAddTxModalOpen(false);

    // Reset form
    setTitle('');
    setAmount('');
    setDescription('');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsAddTxModalOpen(false)}
          className="fixed inset-0 bg-black/75 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg rounded-3xl p-6 sm:p-8 bg-[#0B0F19] border border-purple-500/30 shadow-[0_25px_70px_rgba(0,0,0,0.8)] z-10 overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-300">
                <Plus className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Log Transaction</h3>
                <p className="text-xs text-slate-400 font-mono">Real-time financial update</p>
              </div>
            </div>
            <button
              onClick={() => setIsAddTxModalOpen(false)}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Type selector: Expense / Income */}
            <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl bg-[#121826] border border-slate-800">
              <button
                type="button"
                onClick={() => setType('expense')}
                className={`py-2 rounded-xl text-xs font-bold transition-all ${
                  type === 'expense'
                    ? 'bg-rose-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Expense (-)
              </button>
              <button
                type="button"
                onClick={() => setType('income')}
                className={`py-2 rounded-xl text-xs font-bold transition-all ${
                  type === 'income'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Income (+)
              </button>
            </div>

            {/* Title & Amount */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                  Description / Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Swiggy, Metro, Mess dues"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#121826] border border-slate-800 text-sm text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                  Amount (₹ INR)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-purple-400 font-bold">₹</span>
                  <input
                    type="number"
                    required
                    min="1"
                    placeholder="250"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full pl-8 pr-3.5 py-2.5 rounded-xl bg-[#121826] border border-slate-800 text-sm text-white font-mono font-bold focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>
            </div>

            {/* Category & Payment Method */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as TransactionCategory)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#121826] border border-slate-800 text-sm text-white focus:outline-none focus:border-purple-500"
                >
                  {categories.map((c) => (
                    <option key={c} value={c} className="bg-[#0B0F19]">{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                  Payment Method
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#121826] border border-slate-800 text-sm text-white focus:outline-none focus:border-purple-500"
                >
                  {paymentMethods.map((m) => (
                    <option key={m} value={m} className="bg-[#0B0F19]">{m}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Date & Note */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                  Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#121826] border border-slate-800 text-sm text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                  Optional Note / Ref
                </label>
                <input
                  type="text"
                  placeholder="e.g. Split with Aman, UPI #8391"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#121826] border border-slate-800 text-sm text-white focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-4 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white font-bold text-sm shadow-lg shadow-purple-600/30 hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              {isSubmitting ? 'Saving...' : 'Confirm Transaction'}
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
