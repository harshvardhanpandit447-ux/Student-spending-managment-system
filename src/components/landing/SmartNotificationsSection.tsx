import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, TrendingUp, Sparkles, Clock, AlertTriangle, ArrowRight } from 'lucide-react';

const notificationCards = [
  {
    type: 'Budget Warning',
    title: 'Monthly Budget Projection Alert',
    message: 'Your monthly budget is expected to exceed by ₹500 at your current spending pace.',
    time: '2 hours ago',
    badge: 'HIGH RISK',
    badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
    icon: AlertTriangle,
    iconColor: 'text-rose-400',
    borderColor: 'border-rose-500/30'
  },
  {
    type: 'Spending Alert',
    title: 'Food & Mess Surge',
    message: "You've spent 28% more on food than last month (₹2,300 vs ₹1,800).",
    time: '5 hours ago',
    badge: 'ANOMALY',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    icon: TrendingUp,
    iconColor: 'text-amber-400',
    borderColor: 'border-amber-500/30'
  },
  {
    type: 'Savings Update',
    title: 'Milestone Progress',
    message: 'You have saved ₹2,300 this month. Great job! Laptop goal is at 61%.',
    time: '1 day ago',
    badge: 'ACHIEVEMENT',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    icon: Sparkles,
    iconColor: 'text-emerald-400',
    borderColor: 'border-emerald-500/30'
  },
  {
    type: 'Payment Reminder',
    title: 'Recurring Student Autopay',
    message: 'Your ₹119 recurring Spotify Student subscription is due tomorrow via UPI.',
    time: '1 day ago',
    badge: 'AUTOPAY',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    icon: Clock,
    iconColor: 'text-cyan-400',
    borderColor: 'border-cyan-500/30'
  },
  {
    type: 'Spending Prediction',
    title: 'AI Run-rate Warning',
    message: 'At your current burn rate, you may exceed your leisure budget by day 28.',
    time: '2 days ago',
    badge: 'AI FORECAST',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    icon: AlertCircle,
    iconColor: 'text-purple-400',
    borderColor: 'border-purple-500/30'
  }
];

export const SmartNotificationsSection: React.FC = () => {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-5xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-400 font-mono mb-2"
          >
            INTELLIGENT FEED
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-5xl font-black text-white tracking-tight"
          >
            Your money should talk to you.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-base sm:text-lg text-slate-400"
          >
            Contextual alerts and actionable advice delivered exactly when your attention is needed.
          </motion.p>
        </div>

        {/* Staggered Notifications Feed */}
        <div className="space-y-4">
          {notificationCards.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 25, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ x: 6, transition: { duration: 0.2 } }}
                className={`p-6 rounded-3xl bg-[#0B0F19]/90 backdrop-blur-2xl border ${item.borderColor} shadow-lg hover:shadow-2xl transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#121826] border border-slate-800 flex items-center justify-center flex-shrink-0">
                    <Icon className={`w-6 h-6 ${item.iconColor}`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="text-xs font-bold uppercase tracking-wider text-white">
                        {item.title}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${item.badgeColor} font-mono`}>
                        {item.badge}
                      </span>
                    </div>
                    <p className="text-sm text-slate-300 mt-1 leading-snug">
                      {item.message}
                    </p>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto text-xs text-slate-500 font-mono flex-shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800/60">
                  <span>{item.time}</span>
                  <span className="text-purple-400 font-medium hover:underline cursor-pointer sm:mt-1">
                    Take action →
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
