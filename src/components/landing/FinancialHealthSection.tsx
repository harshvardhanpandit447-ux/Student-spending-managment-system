import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, CheckCircle2, TrendingUp, AlertCircle, ArrowUpRight } from 'lucide-react';

export const FinancialHealthSection: React.FC = () => {
  const factors = [
    { label: 'Savings Rate', score: '85/100', desc: 'Saving 24% of monthly inflow vs 15% student benchmark.', status: 'Optimal', color: 'text-emerald-400', bar: 'w-[85%]', barColor: 'bg-emerald-500' },
    { label: 'Budget Management', score: '72/100', desc: '4/5 categories strictly adhering to limits.', status: 'Good', color: 'text-cyan-400', bar: 'w-[72%]', barColor: 'bg-cyan-500' },
    { label: 'Spending Consistency', score: '80/100', desc: 'Daily burn rate fluctuates less than 12%.', status: 'Optimal', color: 'text-purple-400', bar: 'w-[80%]', barColor: 'bg-purple-500' },
    { label: 'Essential vs Non-Essential', score: '75/100', desc: '68% of expenditures allocated to primary necessities.', status: 'Good', color: 'text-indigo-400', bar: 'w-[75%]', barColor: 'bg-indigo-500' }
  ];

  return (
    <section id="health-score" className="relative py-24 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-400 font-mono mb-2"
          >
            CREDIT & HEALTH
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-5xl font-black text-white tracking-tight"
          >
            Understand your financial health.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-base sm:text-lg text-slate-400"
          >
            A single multi-variable score that turns complex spending habits into clear financial fitness.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Futuristic Circular Score Gauge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 rounded-3xl p-8 bg-[#0B0F19]/90 backdrop-blur-2xl border border-purple-500/25 shadow-2xl flex flex-col items-center justify-center text-center relative overflow-hidden"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative w-52 h-52 flex items-center justify-center mb-6">
              {/* SVG Circular Progress */}
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  className="text-slate-800"
                  strokeWidth="8"
                  stroke="currentColor"
                  fill="transparent"
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="42"
                  stroke="url(#scoreGradient)"
                  strokeWidth="8"
                  strokeDasharray="264"
                  initial={{ strokeDashoffset: 264 }}
                  whileInView={{ strokeDashoffset: 264 - (264 * 0.78) }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                  strokeLinecap="round"
                  fill="transparent"
                />
                <defs>
                  <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8B5CF6" />
                    <stop offset="50%" stopColor="#06B6D4" />
                    <stop offset="100%" stopColor="#10B981" />
                  </linearGradient>
                </defs>
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-black text-white font-mono tracking-tight">78</span>
                <span className="text-xs font-bold text-slate-400 font-mono">OUT OF 100</span>
                <span className="mt-1 text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  GOOD
                </span>
              </div>
            </div>

            <h3 className="text-lg font-bold text-white mb-1">FinFlow Health Rating</h3>
            <p className="text-xs text-slate-400 max-w-xs">
              Top 18% of engineering students with consistent savings habits.
            </p>
          </motion.div>

          {/* Right: Contributing Factors List */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 space-y-4"
          >
            {factors.map((f, idx) => (
              <div
                key={f.label}
                className="p-5 rounded-2xl bg-[#0B0F19]/80 border border-purple-500/15 backdrop-blur-xl hover:border-purple-500/40 transition-all space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">{f.label}</span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {f.status}
                    </span>
                  </div>
                  <span className={`text-sm font-mono font-bold ${f.color}`}>{f.score}</span>
                </div>

                <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${f.barColor} ${f.bar}`} />
                </div>

                <p className="text-xs text-slate-400">{f.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
