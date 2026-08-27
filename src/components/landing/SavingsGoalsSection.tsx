import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Laptop, Plane, BookOpen, ShieldCheck, Plus, Sparkles, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

interface GoalItem {
  id: string;
  title: string;
  target: number;
  current: number;
  deadline: string;
  category: string;
  icon: any;
  color: string;
  glowColor: string;
}

const initialGoals: GoalItem[] = [
  {
    id: '1',
    title: 'New M3 MacBook / Laptop',
    target: 70000,
    current: 43000,
    deadline: 'March 2027',
    category: 'Hardware & Tech',
    icon: Laptop,
    color: 'from-purple-600 to-indigo-600',
    glowColor: 'group-hover:border-purple-500/50'
  },
  {
    id: '2',
    title: 'Semester End Goa Trip',
    target: 15000,
    current: 11200,
    deadline: 'December 2026',
    category: 'Travel & Vacations',
    icon: Plane,
    color: 'from-cyan-500 to-blue-600',
    glowColor: 'group-hover:border-cyan-500/50'
  },
  {
    id: '3',
    title: 'Fullstack AI & Web3 Bootcamp',
    target: 12000,
    current: 8500,
    deadline: 'November 2026',
    category: 'Upskilling & Career',
    icon: BookOpen,
    color: 'from-emerald-500 to-teal-600',
    glowColor: 'group-hover:border-emerald-500/50'
  },
  {
    id: '4',
    title: 'Hostel Emergency Cushion',
    target: 10000,
    current: 6400,
    deadline: 'Ongoing',
    category: 'Safety Fund',
    icon: ShieldCheck,
    color: 'from-amber-500 to-orange-600',
    glowColor: 'group-hover:border-amber-500/50'
  }
];

export const SavingsGoalsSection: React.FC = () => {
  const [goals, setGoals] = useState<GoalItem[]>(initialGoals);

  const handleQuickAdd = (id: string, amount: number) => {
    setGoals(prev => prev.map(g => {
      if (g.id === id) {
        const updated = Math.min(g.target, g.current + amount);
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 }
        });
        return { ...g, current: updated };
      }
      return g;
    }));
  };

  return (
    <section id="goals" className="relative py-24 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-400 font-mono mb-2"
          >
            WEALTH ACCELERATION
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-5xl font-black text-white tracking-tight"
          >
            Turn goals into progress.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-base sm:text-lg text-slate-400"
          >
            Micro-save effortlessly from freelance gigs, allowances, and leftover monthly budgets.
          </motion.p>
        </div>

        {/* Goals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {goals.map((goal, idx) => {
            const Icon = goal.icon;
            const percent = Math.round((goal.current / goal.target) * 100);
            return (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
                className={`group relative rounded-3xl p-7 bg-[#0B0F19]/90 backdrop-blur-2xl border border-purple-500/20 ${goal.glowColor} transition-all duration-300 shadow-xl overflow-hidden`}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-[#121826] border border-slate-800 flex items-center justify-center text-purple-400 group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-purple-200 transition-colors">
                        {goal.title}
                      </h3>
                      <span className="text-[11px] text-slate-400 font-mono">
                        Target: {goal.deadline}
                      </span>
                    </div>
                  </div>

                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-purple-950/60 text-purple-300 border border-purple-800/40 font-mono">
                    {percent}% Done
                  </span>
                </div>

                {/* Progress Visual */}
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-white font-bold">₹{goal.current.toLocaleString()}</span>
                    <span className="text-slate-500">₹{goal.target.toLocaleString()}</span>
                  </div>
                  <div className="h-3 w-full bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${percent}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className={`h-full rounded-full bg-gradient-to-r ${goal.color}`}
                    />
                  </div>
                </div>

                {/* Bottom Quick Deposit Simulation */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
                  <span className="text-xs text-slate-400">Quick deposit simulation:</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleQuickAdd(goal.id, 500)}
                      className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-purple-600 text-slate-200 hover:text-white text-xs font-mono font-medium transition-colors border border-slate-700 hover:border-purple-500"
                    >
                      +₹500
                    </button>
                    <button
                      onClick={() => handleQuickAdd(goal.id, 1000)}
                      className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-cyan-600 text-slate-200 hover:text-white text-xs font-mono font-medium transition-colors border border-slate-700 hover:border-cyan-500"
                    >
                      +₹1,000
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
