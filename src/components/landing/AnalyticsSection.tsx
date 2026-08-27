import React from 'react';
import { motion } from 'framer-motion';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { TrendingUp, Sparkles, AlertTriangle, ArrowUpRight, ArrowDownRight, Layers } from 'lucide-react';

const chartData = [
  { day: 'Day 1', spend: 350, budget: 350 },
  { day: 'Day 5', spend: 1100, budget: 1750 },
  { day: 'Day 10', spend: 2850, budget: 3500 },
  { day: 'Day 15', spend: 4600, budget: 5250 },
  { day: 'Day 20', spend: 6450, budget: 7000 },
  { day: 'Day 25', spend: 7600, budget: 8750 },
  { day: 'Day 27', spend: 8230, budget: 9450 },
  { day: 'Day 30 (Est)', spend: 9150, budget: 10000 },
];

const categoryBars = [
  { name: 'Food & Mess', percent: 32, amount: '₹2,630', color: 'from-purple-500 to-indigo-500' },
  { name: 'Education & Tech', percent: 21, amount: '₹1,728', color: 'from-cyan-500 to-blue-500' },
  { name: 'Transport & Metro', percent: 15, amount: '₹1,234', color: 'from-emerald-500 to-teal-500' },
  { name: 'Shopping & Setup', percent: 12, amount: '₹987', color: 'from-amber-500 to-yellow-500' },
  { name: 'Entertainment & OTT', percent: 10, amount: '₹823', color: 'from-rose-500 to-pink-500' },
  { name: 'Other Dues', percent: 10, amount: '₹828', color: 'from-slate-500 to-slate-400' }
];

export const AnalyticsSection: React.FC = () => {
  return (
    <section id="analytics" className="relative py-24 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-[0.25em] text-purple-400 font-mono mb-2"
          >
            DEEP ANALYTICS
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-5xl font-black text-white tracking-tight"
          >
            Know where your money goes.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-base sm:text-lg text-slate-400"
          >
            Progressively animated charts and AI categorization to spotlight spending trends before they turn into deficits.
          </motion.p>
        </div>

        {/* Analytics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Chart: Spending Overview */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 rounded-3xl p-6 sm:p-8 bg-[#0B0F19]/90 backdrop-blur-2xl border border-purple-500/20 shadow-2xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-white">Cumulative Spending Trajectory</h3>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">Real-time spend vs ₹10,000 monthly ceiling</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 text-[11px] text-purple-400 font-mono">
                    <span className="w-2 h-2 rounded-full bg-purple-500" /> Actual Spend
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-slate-500 font-mono">
                    <span className="w-2 h-2 rounded-full bg-slate-600" /> Ideal Pace
                  </span>
                </div>
              </div>

              {/* Line/Area Chart */}
              <div className="h-64 sm:h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="spendGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.0} />
                      </linearGradient>
                      <linearGradient id="budgetGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#06B6D4" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <XAxis 
                      dataKey="day" 
                      stroke="#475569" 
                      fontSize={11} 
                      tickLine={false} 
                      axisLine={{ stroke: '#1E293B' }}
                    />
                    <YAxis 
                      stroke="#475569" 
                      fontSize={11} 
                      tickLine={false} 
                      axisLine={{ stroke: '#1E293B' }}
                      tickFormatter={(val) => `₹${val}`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#0B0F19',
                        borderColor: '#8B5CF6',
                        borderRadius: '12px',
                        fontSize: '12px',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
                      }}
                      formatter={(val: any) => [`₹${val}`, 'Amount']}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="spend" 
                      stroke="#8B5CF6" 
                      strokeWidth={3} 
                      fillOpacity={1} 
                      fill="url(#spendGradient)" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="budget" 
                      stroke="#06B6D4" 
                      strokeWidth={1.5} 
                      strokeDasharray="4 4"
                      fillOpacity={1} 
                      fill="url(#budgetGradient)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Monthly Comparison Card */}
            <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-slate-800">
              <div className="p-3.5 rounded-2xl bg-[#121826]/70 border border-slate-800">
                <span className="text-[11px] text-slate-400 font-mono uppercase">This Month</span>
                <div className="text-xl font-black text-white font-mono mt-1">₹8,230</div>
                <div className="text-[11px] text-rose-400 mt-1 flex items-center gap-1 font-semibold">
                  <ArrowUpRight className="w-3 h-3" /> +10.4% vs July
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#121826]/70 border border-slate-800">
                <span className="text-[11px] text-slate-400 font-mono uppercase">Last Month</span>
                <div className="text-xl font-black text-slate-300 font-mono mt-1">₹7,450</div>
                <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1 font-semibold">
                  <span>Saved ₹550 cushion</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Category Distribution & AI Insight */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 flex flex-col justify-between gap-6"
          >
            {/* Category Bars Card */}
            <div className="rounded-3xl p-6 sm:p-8 bg-[#0B0F19]/90 backdrop-blur-2xl border border-purple-500/20 shadow-2xl flex-1">
              <h3 className="text-lg font-bold text-white mb-1">Category Distribution</h3>
              <p className="text-xs text-slate-400 font-mono mb-6">Percentage breakdown of August spend</p>

              <div className="space-y-4">
                {categoryBars.map((cat, idx) => (
                  <div key={cat.name} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-200">{cat.name}</span>
                      <div className="flex items-center gap-2 font-mono">
                        <span className="text-slate-400">{cat.amount}</span>
                        <span className="font-bold text-white bg-slate-800 px-1.5 py-0.5 rounded text-[11px]">
                          {cat.percent}%
                        </span>
                      </div>
                    </div>
                    {/* Animated Progress Bar */}
                    <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${cat.percent}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: idx * 0.1 }}
                        className={`h-full rounded-full bg-gradient-to-r ${cat.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Smart Insight Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="rounded-3xl p-5 bg-gradient-to-r from-purple-950/60 to-indigo-950/50 backdrop-blur-xl border border-purple-500/30 flex items-start gap-4 shadow-lg shadow-purple-950/40"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center flex-shrink-0 text-purple-300">
                <Sparkles className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <span className="text-[10px] font-bold tracking-widest uppercase text-purple-300 font-mono">
                  SMART FINANCIAL INSIGHT
                </span>
                <p className="text-sm font-semibold text-white mt-1 leading-snug">
                  Your food spending increased by 18% this month due to late-night campus deliveries.
                </p>
                <p className="text-xs text-purple-300/80 mt-1">
                  Tip: Shifting 2 orders to the hostel mess saves ~₹480/week.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
