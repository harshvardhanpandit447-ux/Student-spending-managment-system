import React from 'react';
import { motion } from 'framer-motion';
import { Target, AlertTriangle, CheckCircle2, SlidersHorizontal, Sparkles, TrendingDown } from 'lucide-react';

export const BudgetSection: React.FC = () => {
  return (
    <section id="budgets" className="relative py-24 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-[0.25em] text-rose-400 font-mono mb-2"
          >
            BUDGET CONTROL
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-5xl font-black text-white tracking-tight"
          >
            Know your limits before you cross them.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-base sm:text-lg text-slate-400"
          >
            Real-time category guardrails prevent end-of-month budget shocks.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Monthly Budget Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 rounded-3xl p-8 bg-[#0B0F19]/90 backdrop-blur-2xl border border-purple-500/25 shadow-2xl space-y-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono">
                  Primary Monthly Limit
                </span>
                <h3 className="text-2xl font-black text-white mt-1">Monthly Overall Budget</h3>
              </div>
              <div className="text-right">
                <span className="text-2xl sm:text-3xl font-black text-white font-mono">
                  ₹8,500 <span className="text-base text-slate-500 font-normal">/ ₹10,000</span>
                </span>
                <p className="text-xs text-rose-400 font-mono font-semibold">₹1,500 buffer remaining</p>
              </div>
            </div>

            {/* Main Progress Bar (0 -> 85%) */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400">Current utilization</span>
                <span className="text-purple-300 font-bold">85% Limit Reached</span>
              </div>
              <div className="h-4 w-full bg-slate-900 rounded-full overflow-hidden p-1 border border-slate-800">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '85%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                  className="h-full rounded-full bg-gradient-to-r from-purple-600 via-indigo-500 to-rose-500 shadow-lg shadow-purple-600/50"
                />
              </div>
            </div>

            {/* Warning Alert Banner */}
            <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/30 flex items-center gap-3.5">
              <AlertTriangle className="w-5 h-5 text-rose-400 flex-shrink-0 animate-bounce" />
              <div>
                <h4 className="text-xs font-bold text-rose-200 uppercase font-mono tracking-wider">
                  Critical Category Warning
                </h4>
                <p className="text-sm text-slate-300 mt-0.5">
                  You've spent <strong className="text-rose-400">₹1,050 / ₹1,000</strong> on Entertainment. Any additional outings will dip into your savings fund.
                </p>
              </div>
            </div>

            {/* Category Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-[#121826]/70 border border-slate-800 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-white">Food & Mess</span>
                  <span className="font-mono text-purple-300 font-bold">92%</span>
                </div>
                <div className="h-2 bg-slate-900 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '92%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9 }}
                    className="h-full bg-purple-500 rounded-full"
                  />
                </div>
                <p className="text-[11px] text-slate-400 font-mono">₹2,300 spent of ₹2,500 cap</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#121826]/70 border border-rose-500/30 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-rose-300">Entertainment</span>
                  <span className="font-mono text-rose-400 font-bold">105% (Exceeded)</span>
                </div>
                <div className="h-2 bg-slate-900 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9 }}
                    className="h-full bg-rose-500 rounded-full"
                  />
                </div>
                <p className="text-[11px] text-rose-400/80 font-mono">₹1,050 spent of ₹1,000 cap</p>
              </div>
            </div>
          </motion.div>

          {/* Right Highlights Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 space-y-4"
          >
            <div className="p-6 rounded-3xl bg-[#0B0F19]/80 border border-purple-500/15 backdrop-blur-xl">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-300 mb-3">
                <SlidersHorizontal className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">Dynamic Velocity Throttling</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                If you overspend in week 1, FinFlow recalculates daily allowable spending across remaining days so you never run dry.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#0B0F19]/80 border border-purple-500/15 backdrop-blur-xl">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-300 mb-3">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">Zero Rigid Spreadsheets</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Connect UPI logs automatically or input quick single-tap transactions right after ordering chai or mess meals.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
