import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, ArrowUpRight, ArrowDownRight, PieChart, Sparkles, IndianRupee } from 'lucide-react';

export const OverviewPreviewSection: React.FC = () => {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-bold uppercase tracking-[0.25em] text-purple-400 font-mono mb-2"
          >
            LIVE FINANCIAL SNAPSHOT
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight"
          >
            Real-Time Clarity Over Every Rupee
          </motion.h2>
        </div>

        {/* 3 Large Glass Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Balance */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
            className="relative rounded-3xl p-7 bg-gradient-to-b from-[#141B2D]/85 to-[#0B0F19]/90 backdrop-blur-2xl border border-purple-500/25 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/15 rounded-full blur-2xl pointer-events-none group-hover:bg-purple-600/30 transition-all" />
            
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono">
                Total Balance
              </span>
              <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-300">
                <Wallet className="w-5 h-5" />
              </div>
            </div>

            <div className="text-4xl sm:text-5xl font-black text-white tracking-tight flex items-baseline gap-1 my-2">
              <span className="text-2xl text-purple-400 font-normal">₹</span>
              <span>12,540</span>
            </div>

            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-800/80 text-xs text-slate-400">
              <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold bg-emerald-950/40 px-2 py-0.5 rounded-md border border-emerald-800/30">
                <ArrowUpRight className="w-3.5 h-3.5" /> +14.2%
              </span>
              <span>vs last month savings</span>
            </div>
          </motion.div>

          {/* Card 2: Spent */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: 0.2 }}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
            className="relative rounded-3xl p-7 bg-gradient-to-b from-[#16172E]/85 to-[#0B0F19]/90 backdrop-blur-2xl border border-rose-500/25 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-600/15 rounded-full blur-2xl pointer-events-none group-hover:bg-rose-600/30 transition-all" />

            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono">
                Total Spent (Aug)
              </span>
              <div className="w-10 h-10 rounded-xl bg-rose-600/20 border border-rose-500/30 flex items-center justify-center text-rose-300">
                <ArrowDownRight className="w-5 h-5" />
              </div>
            </div>

            <div className="text-4xl sm:text-5xl font-black text-white tracking-tight flex items-baseline gap-1 my-2">
              <span className="text-2xl text-rose-400 font-normal">₹</span>
              <span>8,230</span>
            </div>

            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-800/80 text-xs text-slate-400">
              <span className="inline-flex items-center gap-1 text-rose-400 font-semibold bg-rose-950/40 px-2 py-0.5 rounded-md border border-rose-800/30">
                82.3% of limit
              </span>
              <span>Monthly budget: ₹10,000</span>
            </div>
          </motion.div>

          {/* Card 3: Remaining */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: 0.3 }}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
            className="relative rounded-3xl p-7 bg-gradient-to-b from-[#0F1E2E]/85 to-[#0B0F19]/90 backdrop-blur-2xl border border-cyan-500/25 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-600/15 rounded-full blur-2xl pointer-events-none group-hover:bg-cyan-600/30 transition-all" />

            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono">
                Remaining Safe to Spend
              </span>
              <div className="w-10 h-10 rounded-xl bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-300">
                <PieChart className="w-5 h-5" />
              </div>
            </div>

            <div className="text-4xl sm:text-5xl font-black text-white tracking-tight flex items-baseline gap-1 my-2">
              <span className="text-2xl text-cyan-400 font-normal">₹</span>
              <span>4,310</span>
            </div>

            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-800/80 text-xs text-slate-400">
              <span className="inline-flex items-center gap-1 text-cyan-400 font-semibold bg-cyan-950/40 px-2 py-0.5 rounded-md border border-cyan-800/30">
                ₹862/day
              </span>
              <span>5 days left in cycle</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
