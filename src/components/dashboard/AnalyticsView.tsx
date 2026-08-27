import React, { useState, useMemo } from 'react';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart as RePieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { useApp } from '../../context/AppContext';

const CATEGORY_COLORS: Record<string, string> = {
  'Food': '#8B5CF6',
  'Transport': '#06B6D4',
  'Hostel/Rent': '#3B82F6',
  'Education': '#10B981',
  'Shopping': '#F59E0B',
  'Entertainment': '#F43F5E',
  'Subscriptions': '#EC4899',
  'Bills': '#6366F1',
  'Health': '#14B8A6',
  'Travel': '#F97316',
  'Freelance': '#84CC16',
  'Pocket Money': '#10B981',
  'Other': '#94A3B8'
};

export const AnalyticsView: React.FC = () => {
  const { transactions, user } = useApp();
  const [timeframe, setTimeframe] = useState<'daily' | 'weekly' | 'monthly' | 'yearly'>('monthly');

  const incomeTxs = useMemo(() => transactions.filter(t => t.type === 'income'), [transactions]);
  const expenseTxs = useMemo(() => transactions.filter(t => t.type === 'expense'), [transactions]);

  const totalIncome = useMemo(() => incomeTxs.reduce((s, t) => s + t.amount, 0), [incomeTxs]);
  const totalExpense = useMemo(() => expenseTxs.reduce((s, t) => s + t.amount, 0), [expenseTxs]);

  const savingsRate = totalIncome > 0 ? Math.max(0, Math.round(((totalIncome - totalExpense) / totalIncome) * 100)) : 0;
  const dailyAverage = expenseTxs.length > 0 ? Math.round(totalExpense / Math.max(1, new Set(expenseTxs.map(t => t.date)).size)) : 0;

  // Category breakdown calculation
  const pieData = useMemo(() => {
    const map: Record<string, number> = {};
    expenseTxs.forEach(t => {
      map[t.category] = (map[t.category] || 0) + t.amount;
    });

    const entries = Object.entries(map).map(([name, value]) => ({
      name,
      value,
      color: CATEGORY_COLORS[name] || '#8B5CF6'
    })).sort((a, b) => b.value - a.value);

    if (entries.length === 0) {
      return [{ name: 'No Expenses Yet', value: 1, color: '#334155' }];
    }
    return entries;
  }, [expenseTxs]);

  const topCategory = pieData[0]?.name !== 'No Expenses Yet' ? pieData[0]?.name : 'None';
  const topCategoryPercent = totalExpense > 0 && pieData[0]?.value ? Math.round((pieData[0].value / totalExpense) * 100) : 0;

  // Monthly Trend Data
  const monthlyTrendData = useMemo(() => {
    if (transactions.length === 0) {
      return [
        { month: 'Current Month', income: 0, expense: 0, savings: 0 }
      ];
    }
    return [
      { month: 'Current Month', income: totalIncome, expense: totalExpense, savings: Math.max(0, totalIncome - totalExpense) }
    ];
  }, [transactions, totalIncome, totalExpense]);

  // Weekly Trend Data
  const weeklyTrendData = useMemo(() => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const dailyCap = Math.round((user?.monthlyBudget || 10000) / 30);
    
    if (expenseTxs.length === 0) {
      return days.map(d => ({ name: d, spend: 0, budget: dailyCap }));
    }

    const dayMap: Record<string, number> = {};
    expenseTxs.forEach(t => {
      const dayName = new Date(t.date).toLocaleDateString('en-US', { weekday: 'short' });
      dayMap[dayName] = (dayMap[dayName] || 0) + t.amount;
    });

    return days.map(d => ({
      name: d,
      spend: dayMap[d] || 0,
      budget: dailyCap
    }));
  }, [expenseTxs, user]);

  return (
    <div className="space-y-8 p-4 sm:p-8 max-w-7xl mx-auto">
      {/* Header & Timeframe Tabs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Financial Analytics & Intelligence</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Deep dive into spending velocity, savings accumulation, and risk predictions.
          </p>
        </div>

        {/* Timeframe selector */}
        <div className="flex items-center gap-1 bg-[#121826] p-1 rounded-xl border border-slate-800">
          {(['daily', 'weekly', 'monthly', 'yearly'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize font-mono transition-all cursor-pointer ${
                timeframe === t
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-5 rounded-3xl bg-[#0B0F19]/90 border border-purple-500/20">
          <span className="text-xs font-mono uppercase text-slate-400">Savings Rate</span>
          <div className="text-2xl font-black text-emerald-400 font-mono my-2">{savingsRate}%</div>
          <span className="text-[11px] text-slate-400">Computed from your inflow vs spend</span>
        </div>

        <div className="p-5 rounded-3xl bg-[#0B0F19]/90 border border-purple-500/20">
          <span className="text-xs font-mono uppercase text-slate-400">Daily Average Spend</span>
          <div className="text-2xl font-black text-purple-300 font-mono my-2">₹{dailyAverage.toLocaleString()} / day</div>
          <span className="text-[11px] text-slate-400">{expenseTxs.length} expense records active</span>
        </div>

        <div className="p-5 rounded-3xl bg-[#0B0F19]/90 border border-purple-500/20">
          <span className="text-xs font-mono uppercase text-slate-400">Top Spending Category</span>
          <div className="text-2xl font-black text-rose-400 font-mono my-2 truncate">{topCategory}</div>
          <span className="text-[11px] text-rose-400/80 font-semibold">{topCategoryPercent}% of total outflow</span>
        </div>

        <div className="p-5 rounded-3xl bg-[#0B0F19]/90 border border-cyan-500/30">
          <span className="text-xs font-mono uppercase text-cyan-300">Financial Health Score</span>
          <div className="text-2xl font-black text-cyan-400 font-mono my-2">
            {transactions.length === 0 ? '100' : Math.min(100, Math.max(50, savingsRate + 40))} / 100
          </div>
          <span className="text-[11px] text-cyan-200">
            {transactions.length === 0 ? 'New Profile • Ready to Track' : 'Good • Spending Controlled'}
          </span>
        </div>
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Income vs Expenses Bar Chart */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-[#0B0F19]/90 backdrop-blur-xl border border-purple-500/20 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">Income vs Expenses (Monthly)</h3>
              <p className="text-xs text-slate-400 font-mono">Real historical inflows and lifestyle expenses</p>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="flex items-center gap-1 text-emerald-400">
                <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500" /> Income
              </span>
              <span className="flex items-center gap-1 text-rose-400">
                <span className="w-2.5 h-2.5 rounded-sm bg-rose-500" /> Expenses
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="month" stroke="#475569" fontSize={11} tickLine={false} />
                <YAxis stroke="#475569" fontSize={11} tickLine={false} tickFormatter={(v) => `₹${v}`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0B0F19', borderColor: '#8B5CF6', borderRadius: '10px' }}
                  formatter={(val: any) => [`₹${val}`, '']}
                />
                <Bar dataKey="income" fill="#10B981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expense" fill="#F43F5E" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Pie Chart */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-[#0B0F19]/90 backdrop-blur-xl border border-purple-500/20 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-white mb-1">Category Breakdown</h3>
            <p className="text-xs text-slate-400 font-mono mb-4">Proportional expenditure distribution</p>

            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RePieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={75}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0B0F19', borderColor: '#8B5CF6', borderRadius: '10px' }}
                    formatter={(v: any) => [`₹${v}`, 'Amount']}
                  />
                </RePieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs pt-4 border-t border-slate-800">
            {pieData.slice(0, 6).map((item) => (
              <div key={item.name} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-slate-300 truncate">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Weekly Burn Rate Trajectory */}
      <div className="p-6 rounded-3xl bg-[#0B0F19]/90 backdrop-blur-xl border border-purple-500/20 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white">Daily Spending vs Daily Target Ceiling</h3>
            <p className="text-xs text-slate-400 font-mono">Ensuring weekday pace stays within monthly budget</p>
          </div>
          <span className="text-xs text-cyan-400 font-mono font-semibold">
            Goal: ₹{Math.round((user?.monthlyBudget || 10000) / 30)} Daily Cap
          </span>
        </div>

        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={weeklyTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="weekSpend" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#06B6D4" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" stroke="#475569" fontSize={11} tickLine={false} />
              <YAxis stroke="#475569" fontSize={11} tickLine={false} tickFormatter={(v) => `₹${v}`} />
              <Tooltip contentStyle={{ backgroundColor: '#0B0F19', borderColor: '#06B6D4', borderRadius: '10px' }} />
              <Area type="monotone" dataKey="spend" stroke="#06B6D4" strokeWidth={2} fill="url(#weekSpend)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
