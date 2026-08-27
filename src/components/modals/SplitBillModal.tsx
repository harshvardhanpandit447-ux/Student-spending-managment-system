import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Users, Plus, Trash2, IndianRupee, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TransactionCategory } from '../../types';

export const SplitBillModal: React.FC = () => {
  const { isSplitModalOpen, setIsSplitModalOpen, addSplitExpense } = useApp();

  const [title, setTitle] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [category, setCategory] = useState<TransactionCategory>('Food');
  const [friendNames, setFriendNames] = useState<string>('Rahul, Aman, Vivek');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isSplitModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseFloat(totalAmount);
    if (!title || isNaN(amountNum)) return;

    const names = friendNames.split(',').map(s => s.trim()).filter(Boolean);
    const totalCount = names.length + 1; // + You
    const splitPerPerson = Math.round(amountNum / totalCount);

    const participants = [
      ...names.map((name, i) => ({
        id: `p-${Date.now()}-${i}`,
        name,
        amount: splitPerPerson,
        isPaid: false,
        upiId: `${name.toLowerCase().replace(/\s+/g, '')}@okaxis`
      })),
      {
        id: `p-you`,
        name: 'You (Aryan)',
        amount: splitPerPerson,
        isPaid: true,
        upiId: 'aryan.s@okicici'
      }
    ];

    setIsSubmitting(true);
    await addSplitExpense({
      title,
      totalAmount: amountNum,
      date: new Date().toISOString().split('T')[0],
      paidBy: 'Aryan (You)',
      category,
      participants,
      status: 'pending'
    });
    setIsSubmitting(false);
    setIsSplitModalOpen(false);

    setTitle('');
    setTotalAmount('');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsSplitModalOpen(false)}
          className="fixed inset-0 bg-black/75 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md rounded-3xl p-6 sm:p-8 bg-[#0B0F19] border border-purple-500/30 shadow-[0_25px_70px_rgba(0,0,0,0.8)] z-10"
        >
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-300">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Create Group Split</h3>
                <p className="text-xs text-slate-400 font-mono">Calculate and track peer shares</p>
              </div>
            </div>
            <button
              onClick={() => setIsSplitModalOpen(false)}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                Expense Description
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Swiggy treat, Hostel Wi-Fi, Cab"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#121826] border border-slate-800 text-sm text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                Total Bill Amount (₹)
              </label>
              <input
                type="number"
                required
                min="10"
                placeholder="1200"
                value={totalAmount}
                onChange={(e) => setTotalAmount(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#121826] border border-slate-800 text-sm text-white font-mono font-bold focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                Friends' Names (comma separated)
              </label>
              <input
                type="text"
                required
                placeholder="Rahul, Aman, Vivek, Pooja"
                value={friendNames}
                onChange={(e) => setFriendNames(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#121826] border border-slate-800 text-sm text-white focus:outline-none focus:border-purple-500"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Your share will automatically be calculated alongside your friends.
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-4 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white font-bold text-sm shadow-lg shadow-purple-600/30 hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              {isSubmitting ? 'Creating Split...' : 'Generate Split & UPI Reminders'}
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
