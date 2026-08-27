import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeftRight, 
  BarChart3, 
  Target, 
  PiggyBank, 
  BellRing, 
  BrainCircuit,
  Sparkles,
  ArrowRight
} from 'lucide-react';

const features = [
  {
    icon: ArrowLeftRight,
    title: 'Transactions Tracker',
    tag: 'INSTANT LOGGING',
    description: 'Track every expense and income instantly with UPI, Cash, and Card split support.',
    color: 'from-purple-500/20 to-indigo-500/10',
    borderColor: 'group-hover:border-purple-500/50',
    iconColor: 'text-purple-400',
    badgeColor: 'bg-purple-500/20 text-purple-300'
  },
  {
    icon: BarChart3,
    title: 'Visual Analytics',
    tag: 'SPENDING BREAKDOWN',
    description: 'Understand exactly where your money goes with interactive breakdowns and historical trends.',
    color: 'from-cyan-500/20 to-blue-500/10',
    borderColor: 'group-hover:border-cyan-500/50',
    iconColor: 'text-cyan-400',
    badgeColor: 'bg-cyan-500/20 text-cyan-300'
  },
  {
    icon: Target,
    title: 'Category Budgets',
    tag: 'LIMIT ENFORCEMENT',
    description: 'Set monthly limits for Food, Canteen, Entertainment, and Books with real-time alerts.',
    color: 'from-emerald-500/20 to-teal-500/10',
    borderColor: 'group-hover:border-emerald-500/50',
    iconColor: 'text-emerald-400',
    badgeColor: 'bg-emerald-500/20 text-emerald-300'
  },
  {
    icon: PiggyBank,
    title: 'Savings Goals',
    tag: 'MILESTONES',
    description: 'Save toward laptops, trips, courses and emergency cushions with visual milestone rings.',
    color: 'from-amber-500/20 to-yellow-500/10',
    borderColor: 'group-hover:border-amber-500/50',
    iconColor: 'text-amber-400',
    badgeColor: 'bg-amber-500/20 text-amber-300'
  },
  {
    icon: BellRing,
    title: 'Smart Notifications',
    tag: 'PROACTIVE ALERTS',
    description: 'Receive meaningful financial alerts when subscriptions renew or budgets run close.',
    color: 'from-rose-500/20 to-pink-500/10',
    borderColor: 'group-hover:border-rose-500/50',
    iconColor: 'text-rose-400',
    badgeColor: 'bg-rose-500/20 text-rose-300'
  },
  {
    icon: BrainCircuit,
    title: 'Smart AI Insights',
    tag: 'PREDICTIVE ENGINE',
    description: 'Understand spending anomalies and simulate your end-of-month financial trajectory.',
    color: 'from-violet-500/20 to-purple-500/10',
    borderColor: 'group-hover:border-violet-500/50',
    iconColor: 'text-violet-400',
    badgeColor: 'bg-violet-500/20 text-violet-300'
  }
];

export const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="relative py-24 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-mono tracking-widest uppercase mb-4"
          >
            <Sparkles className="w-3.5 h-3.5" />
            CORE CAPABILITIES
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-5xl font-black text-white tracking-tight"
          >
            Everything you need to manage your money.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-base sm:text-lg text-slate-400"
          >
            Engineered with the precision of a high-end fintech system, simplified for campus life.
          </motion.p>
        </div>

        {/* 6 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className={`group relative rounded-3xl p-8 bg-[#0B0F19]/80 backdrop-blur-xl border border-purple-500/15 ${feat.borderColor} transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl hover:shadow-2xl`}
              >
                {/* Glow accent */}
                <div className={`absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl ${feat.color} rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity`} />

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-[#121826] border border-slate-800 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                      <Icon className={`w-6 h-6 ${feat.iconColor}`} />
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${feat.badgeColor} font-mono`}>
                      {feat.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-200 transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center gap-2 text-xs font-semibold text-purple-400 group-hover:text-purple-300 transition-colors">
                  <span>Explore module</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
