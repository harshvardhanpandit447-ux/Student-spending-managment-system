import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, ShieldCheck } from 'lucide-react';

interface FinalCTASectionProps {
  onGetStarted: () => void;
}

export const FinalCTASection: React.FC<FinalCTASectionProps> = ({ onGetStarted }) => {
  return (
    <section className="relative py-32 px-4 sm:px-6 lg:px-8 z-10 overflow-hidden text-center">
      {/* Background glow burst */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-purple-600/20 via-indigo-600/15 to-cyan-500/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-mono tracking-widest uppercase mb-6 shadow-xl"
        >
          <Sparkles className="w-4 h-4 text-cyan-400" />
          START YOUR FINANCIAL JOURNEY
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-tight uppercase font-sans"
        >
          Your money. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-200 to-cyan-400">
            Your goals. Your future.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-6 text-base sm:text-xl text-slate-300 max-w-2xl"
        >
          Start managing your finances smarter with FinFlow. Zero setup fee, instant access with preloaded campus mock data.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
        >
          <button
            onClick={onGetStarted}
            className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white font-bold text-lg shadow-[0_0_40px_rgba(139,92,246,0.5)] hover:shadow-[0_0_60px_rgba(6,182,212,0.7)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2.5 group"
          >
            <span>Get Started Free</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-8 flex items-center gap-6 text-xs text-slate-500 font-mono"
        >
          <span className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-cyan-400" /> Instant Access
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-purple-400" /> No Credit Card Required
          </span>
        </motion.div>
      </div>
    </section>
  );
};
