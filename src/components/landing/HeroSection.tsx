import React from 'react';
import { ArrowRight, ChevronDown, Sparkles, TrendingUp, ShieldCheck, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  onGetStarted: () => void;
  onExploreFeatures: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onGetStarted, onExploreFeatures }) => {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center items-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background radial ambient lights */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-purple-600/15 via-indigo-600/10 to-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Top Tagline Pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/40 border border-purple-500/30 backdrop-blur-xl mb-6 shadow-lg shadow-purple-950/50"
        >
          <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
          <span className="text-xs font-bold tracking-[0.2em] text-purple-200 uppercase font-mono">
            TRACK • ANALYZE • GROW
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
        </motion.div>

        {/* Dominant Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-[1.05] uppercase font-sans max-w-4xl"
        >
          Take Control <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-200 to-cyan-400 drop-shadow-[0_0_35px_rgba(139,92,246,0.35)]">
            of Your Finances
          </span>
        </motion.h1>

        {/* Supporting Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed"
        >
          Manage expenses, budgets, savings and financial goals in one intelligent platform built for student life.
        </motion.p>

        {/* CTA Button Group */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <button
            onClick={onGetStarted}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white font-bold text-base shadow-[0_0_35px_rgba(139,92,246,0.45)] hover:shadow-[0_0_50px_rgba(6,182,212,0.6)] hover:scale-[1.03] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
          >
            <span>Get Started Free</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onExploreFeatures}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#0B0F19]/80 hover:bg-[#121826] border border-purple-500/25 text-slate-200 font-semibold text-base backdrop-blur-xl hover:border-purple-500/50 hover:text-white transition-all flex items-center justify-center gap-2"
          >
            <span>Explore Features</span>
            <ChevronDown className="w-4 h-4 text-purple-400" />
          </button>
        </motion.div>

        {/* Live Floating Feature Highlights */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-12 grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-2xl w-full"
        >
          <div className="px-3.5 py-2.5 rounded-xl bg-[#0B0F19]/60 border border-purple-500/20 backdrop-blur-md flex items-center gap-2.5 justify-center">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-medium text-slate-300">AI Spending Forecast</span>
          </div>
          <div className="px-3.5 py-2.5 rounded-xl bg-[#0B0F19]/60 border border-purple-500/20 backdrop-blur-md flex items-center gap-2.5 justify-center">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-medium text-slate-300">Instant UPI Tracking</span>
          </div>
          <div className="col-span-2 sm:col-span-1 px-3.5 py-2.5 rounded-xl bg-[#0B0F19]/60 border border-purple-500/20 backdrop-blur-md flex items-center gap-2.5 justify-center">
            <ShieldCheck className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-medium text-slate-300">100% Private & Secure</span>
          </div>
        </motion.div>
      </div>

      {/* Scroll Down Prompt Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400 text-xs font-mono uppercase tracking-widest cursor-pointer hover:text-purple-300 transition-colors"
        onClick={onExploreFeatures}
      >
        <span>Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-4 h-4 text-purple-400" />
        </motion.div>
      </motion.div>
    </section>
  );
};
