import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, ArrowDown, TrendingUp, AlertTriangle, Lightbulb, ShieldAlert } from 'lucide-react';

export const FinancialForecastSection: React.FC = () => {
  return (
    <section id="forecast" className="relative py-24 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-[0.25em] text-purple-400 font-mono mb-2"
          >
            PREDICTIVE MODEL
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-5xl font-black text-white tracking-tight"
          >
            See where your money is heading.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-base sm:text-lg text-slate-400"
          >
            FinFlow's AI forecast models your daily burn rate against time remaining in the month.
          </motion.p>
        </div>

        {/* Prediction Flow Visualizer */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-3xl p-8 sm:p-12 bg-gradient-to-b from-[#111628]/95 to-[#080C17]/95 backdrop-blur-2xl border border-purple-500/30 shadow-[0_25px_70px_rgba(0,0,0,0.7)]"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center relative">
            {/* Step 1: Current Spending */}
            <div className="p-6 rounded-2xl bg-[#121826]/80 border border-slate-800 text-center flex flex-col items-center">
              <span className="text-xs font-mono uppercase text-slate-400">Current Spending</span>
              <div className="text-3xl font-black text-white font-mono my-2">₹8,900</div>
              <span className="text-[11px] text-slate-500 font-mono">Day 25 of 30</span>
            </div>

            {/* Step 2: Predicted Spending */}
            <div className="p-6 rounded-2xl bg-purple-950/40 border border-purple-500/30 text-center flex flex-col items-center">
              <span className="text-xs font-mono uppercase text-purple-300">Predicted End-Month</span>
              <div className="text-3xl font-black text-purple-200 font-mono my-2">₹10,500</div>
              <span className="text-[11px] text-purple-400/80 font-mono font-semibold">+₹1,600 projected burn</span>
            </div>

            {/* Step 3: Monthly Budget */}
            <div className="p-6 rounded-2xl bg-[#121826]/80 border border-slate-800 text-center flex flex-col items-center">
              <span className="text-xs font-mono uppercase text-slate-400">Monthly Budget Cap</span>
              <div className="text-3xl font-black text-slate-300 font-mono my-2">₹10,000</div>
              <span className="text-[11px] text-slate-500 font-mono">Set threshold</span>
            </div>

            {/* Step 4: Outcome Warning */}
            <div className="p-6 rounded-2xl bg-rose-950/60 border border-rose-500/50 text-center flex flex-col items-center shadow-lg shadow-rose-950/50 animate-pulse">
              <div className="flex items-center gap-1.5 text-rose-300 text-xs font-bold uppercase font-mono">
                <AlertTriangle className="w-3.5 h-3.5" /> Deficit Alert
              </div>
              <div className="text-3xl font-black text-rose-400 font-mono my-2">₹500</div>
              <span className="text-xs font-bold uppercase tracking-wider text-rose-300 font-mono">
                OVER BUDGET
              </span>
            </div>
          </div>

          {/* AI Recommendation Banner */}
          <div className="mt-8 p-6 rounded-2xl bg-[#141C30]/90 border border-cyan-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center flex-shrink-0 text-cyan-300">
                <Lightbulb className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                  Smart AI Recommendation
                </h4>
                <p className="text-sm text-cyan-100/90 mt-1 font-medium">
                  Reduce your average daily spending from <strong className="text-cyan-300">₹320/day</strong> to <strong className="text-emerald-400">₹220/day</strong> for the next 5 days to stay strictly within your ₹10,000 monthly budget.
                </p>
              </div>
            </div>

            <button className="px-5 py-2.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500 text-cyan-200 hover:text-black font-semibold text-xs font-mono transition-all border border-cyan-500/40 whitespace-nowrap">
              Auto-Adjust Limit →
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
