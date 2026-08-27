import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Target, PiggyBank, Calendar, IndianRupee, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AddGoalModal: React.FC = () => {
  const { isAddGoalModalOpen, setIsAddGoalModalOpen, addSavingsGoal } = useApp();

  const [title, setTitle] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [currentAmount, setCurrentAmount] = useState('0');
  const [deadline, setDeadline] = useState('March 2027');
  const [category, setCategory] = useState('Tech & Hardware');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isAddGoalModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !targetAmount) return;

    setIsSubmitting(true);
    await addSavingsGoal({
      title,
      targetAmount: parseFloat(targetAmount),
      currentAmount: parseFloat(currentAmount) || 0,
      deadline,
      category,
      icon: 'Target',
      color: '#8B5CF6'
    });
    setIsSubmitting(false);
    setIsAddGoalModalOpen(false);

    setTitle('');
    setTargetAmount('');
    setCurrentAmount('0');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsAddGoalModalOpen(false)}
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
                <Target className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Create Savings Goal</h3>
                <p className="text-xs text-slate-400 font-mono">Set milestones for big purchases</p>
              </div>
            </div>
            <button
              onClick={() => setIsAddGoalModalOpen(false)}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                Goal Title
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Goa Trip, New Phone, Course"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#121826] border border-slate-800 text-sm text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                  Target (₹)
                </label>
                <input
                  type="number"
                  required
                  min="100"
                  placeholder="25000"
                  value={targetAmount}
                  onChange={(e) => setTargetAmount(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#121826] border border-slate-800 text-sm text-white font-mono font-bold focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                  Initial Saved (₹)
                </label>
                <input
                  type="number"
                  placeholder="2000"
                  value={currentAmount}
                  onChange={(e) => setCurrentAmount(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#121826] border border-slate-800 text-sm text-white font-mono focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                Target Deadline
              </label>
              <input
                type="text"
                placeholder="e.g. December 2026 / Next Semester"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#121826] border border-slate-800 text-sm text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-4 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white font-bold text-sm shadow-lg shadow-purple-600/30 hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              {isSubmitting ? 'Creating Goal...' : 'Launch Savings Goal 🚀'}
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
