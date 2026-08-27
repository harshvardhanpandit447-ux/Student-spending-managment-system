import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Wallet, 
  ArrowDownRight, 
  ArrowUpRight, 
  PieChart, 
  Plus, 
  Sparkles, 
  ArrowRight,
  Laptop,
  CheckCircle2,
  Receipt,
  Target
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

export const DashboardView: React.FC = () => {
  const { 
    user, 
    transactions, 
    budgets, 
    goals, 
    setAppTab, 
    setIsAddTxModalOpen, 
    setIsAddGoalModalOpen,
    depositToGoal 
  } = useApp();

  const incomeTxs = transactions.filter(t => t.type === 'income');
  const expenseTxs = transactions.filter(t => t.type === 'expense');

  const totalIncome = incomeTxs.reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = expenseTxs.reduce((sum, t) => sum + t.amount, 0);
  const balance = totalIncome - totalExpense;
  const monthlyLimit = user?.monthlyBudget || 10000;
  const remainingBudget = Math.max(0, monthlyLimit - totalExpense);

  // Over budget check
  const overBudget = budgets.find(b => (b.spent || 0) > b.limit);

  // Generate dynamic chart data based on real user transactions
  const chartData = React.useMemo(() => {
    if (expenseTxs.length === 0) {
      return [
        { day: 'Week 1', spend: 0 },
        { day: 'Week 2', spend: 0 },
        { day: 'Week 3', spend: 0 },
        { day: 'Today', spend: 0 }
      ];
    }
    
    // Group transactions by date
    const dateMap: Record<string, number> = {};
    expenseTxs.forEach(t => {
      const d = t.date.substring(5); // MM-DD
      dateMap[d] = (dateMap[d] || 0) + t.amount;
    });

    const entries = Object.entries(dateMap).slice(-7);
    if (entries.length === 0) {
      return [{ day: 'Today', spend: totalExpense }];
    }
    return entries.map(([day, spend]) => ({ day, spend }));
  }, [expenseTxs, totalExpense]);

  return (
    <div className="space-y-8 p-4 sm:p-8 max-w-7xl mx-auto">
      {/* Top Greeting & Action Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Good Morning, {user?.name ? user.name.split(' ')[0] : 'Student'} 👋
            </h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 font-mono">
              PRO STUDENT
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {user?.college || 'FinFlow Student Platform'} • Real-time Financial Tracking
          </p>
        </div>

        <button
          onClick={() => setIsAddTxModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white text-xs font-bold shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50 flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Log Expense / Income</span>
        </button>
      </div>

      {/* 4 Primary Metric Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Balance */}
        <div className="p-6 rounded-3xl bg-[#0B0F19]/90 backdrop-blur-xl border border-purple-500/25 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-slate-400">Total Balance</span>
            <div className="w-8 h-8 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <div className="my-3">
            <div className="text-3xl font-black text-white font-mono flex items-baseline gap-0.5">
              <span className="text-xl text-purple-400 font-normal">₹</span>
              <span>{balance.toLocaleString()}</span>
            </div>
          </div>
          <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
            {transactions.length > 0 ? (
              <>
                <ArrowUpRight className="w-3 h-3" /> {incomeTxs.length} income • {expenseTxs.length} expense
              </>
            ) : (
              <span className="text-slate-500 font-mono">No transactions yet</span>
            )}
          </span>
        </div>

        {/* Card 2: Monthly Income */}
        <div className="p-6 rounded-3xl bg-[#0B0F19]/90 backdrop-blur-xl border border-emerald-500/20 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-slate-400">Total Income</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
          <div className="my-3">
            <div className="text-3xl font-black text-emerald-400 font-mono flex items-baseline gap-0.5">
              <span className="text-xl text-emerald-500 font-normal">₹</span>
              <span>{totalIncome.toLocaleString()}</span>
            </div>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">
            {incomeTxs.length} deposit{incomeTxs.length === 1 ? '' : 's'} recorded
          </span>
        </div>

        {/* Card 3: Monthly Expenses */}
        <div className="p-6 rounded-3xl bg-[#0B0F19]/90 backdrop-blur-xl border border-rose-500/20 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-slate-400">Total Spent</span>
            <div className="w-8 h-8 rounded-xl bg-rose-600/20 text-rose-400 flex items-center justify-center">
              <ArrowDownRight className="w-4 h-4" />
            </div>
          </div>
          <div className="my-3">
            <div className="text-3xl font-black text-rose-400 font-mono flex items-baseline gap-0.5">
              <span className="text-xl text-rose-500 font-normal">₹</span>
              <span>{totalExpense.toLocaleString()}</span>
            </div>
          </div>
          <span className="text-[11px] text-rose-400 font-semibold">
            {monthlyLimit > 0 ? Math.round((totalExpense / monthlyLimit) * 100) : 0}% of ₹{monthlyLimit.toLocaleString()} cap
          </span>
        </div>

        {/* Card 4: Remaining Budget */}
        <div className="p-6 rounded-3xl bg-[#0B0F19]/90 backdrop-blur-xl border border-cyan-500/20 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-slate-400">Remaining Budget</span>
            <div className="w-8 h-8 rounded-xl bg-cyan-600/20 text-cyan-400 flex items-center justify-center">
              <PieChart className="w-4 h-4" />
            </div>
          </div>
          <div className="my-3">
            <div className="text-3xl font-black text-cyan-400 font-mono flex items-baseline gap-0.5">
              <span className="text-xl text-cyan-500 font-normal">₹</span>
              <span>{remainingBudget.toLocaleString()}</span>
            </div>
          </div>
          <span className="text-[11px] text-cyan-300 font-mono">
            ₹{Math.round(remainingBudget / 30)}/day allowance
          </span>
        </div>
      </div>

      {/* Main Grid: Chart & AI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 cols: Spending Chart */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-[#0B0F19]/90 backdrop-blur-xl border border-purple-500/20 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">Monthly Spend Velocity</h3>
              <p className="text-xs text-slate-400 font-mono">Real expenditure timeline</p>
            </div>
            <button
              onClick={() => setAppTab('analytics')}
              className="text-xs text-purple-400 hover:underline flex items-center gap-1 font-semibold cursor-pointer"
            >
              Full Analytics <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="dashSpendGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#475569" fontSize={10} tickLine={false} />
                <YAxis stroke="#475569" fontSize={10} tickLine={false} tickFormatter={(v) => `₹${v}`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0B0F19', borderColor: '#8B5CF6', borderRadius: '10px' }}
                  formatter={(val: any) => [`₹${val}`, 'Spent']}
                />
                <Area type="monotone" dataKey="spend" stroke="#8B5CF6" strokeWidth={2.5} fill="url(#dashSpendGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right 5 cols: AI Alerts & Goals */}
        <div className="lg:col-span-5 space-y-4">
          {/* Smart AI Alert */}
          <div className="p-5 rounded-3xl bg-gradient-to-br from-purple-950/50 to-indigo-950/40 border border-purple-500/30 flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-wider uppercase text-purple-300 font-mono">
                FINANCIAL AI ADVISOR
              </span>
              {overBudget ? (
                <>
                  <p className="text-xs font-semibold text-rose-300 mt-0.5">
                    {overBudget.category} category is currently at {Math.round(((overBudget.spent || 0) / overBudget.limit) * 100)}% of limit.
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Consider adjusting your weekly plans to stay within your monthly budget cap.
                  </p>
                </>
              ) : (
                <>
                  <p className="text-xs font-semibold text-white mt-0.5">
                    {transactions.length > 0 ? 'Your financial discipline is looking healthy!' : 'Welcome to FinFlow! Start by logging your daily expenses.'}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    {transactions.length > 0 ? 'All budgets are within limits. Keep tracking to maintain your savings rate.' : 'Log transactions, create savings goals, and track budgets seamlessly.'}
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Quick Active Goal */}
          {goals.length > 0 ? (
            <div className="p-5 rounded-3xl bg-[#0B0F19]/90 border border-purple-500/20 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#121826] text-purple-400 flex items-center justify-center">
                    <Laptop className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{goals[0].title}</h4>
                    <span className="text-[10px] text-slate-500 font-mono">Deadline: {goals[0].deadline}</span>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-purple-300">
                  {goals[0].targetAmount > 0 ? Math.round((goals[0].currentAmount / goals[0].targetAmount) * 100) : 0}%
                </span>
              </div>

              <div className="h-2 bg-slate-900 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-600 to-cyan-500 rounded-full"
                  style={{ width: `${Math.min(100, (goals[0].currentAmount / (goals[0].targetAmount || 1)) * 100)}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <span className="font-mono text-slate-400">
                  ₹{goals[0].currentAmount.toLocaleString()} / ₹{goals[0].targetAmount.toLocaleString()}
                </span>
                <button
                  onClick={() => depositToGoal(goals[0].id, 500)}
                  className="px-2.5 py-1 rounded-lg bg-purple-600/20 hover:bg-purple-600 text-purple-300 hover:text-white font-mono text-[11px] transition-colors border border-purple-500/30 cursor-pointer"
                >
                  +₹500 Quick Save
                </button>
              </div>
            </div>
          ) : (
            <div className="p-5 rounded-3xl bg-[#0B0F19]/90 border border-purple-500/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                  <Target className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Set a Savings Goal</h4>
                  <p className="text-[11px] text-slate-400">Plan for laptops, trips, or courses</p>
                </div>
              </div>
              <button
                onClick={() => setIsAddGoalModalOpen(true)}
                className="px-3 py-1.5 rounded-xl bg-purple-600/20 hover:bg-purple-600 text-purple-300 hover:text-white text-xs font-bold transition-all border border-purple-500/30 cursor-pointer"
              >
                + Create
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Recent Transactions List */}
      <div className="p-6 rounded-3xl bg-[#0B0F19]/90 backdrop-blur-xl border border-purple-500/20 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white">Recent Transactions</h3>
            <p className="text-xs text-slate-400 font-mono">Latest campus expenditures and incoming funds</p>
          </div>
          {transactions.length > 0 && (
            <button
              onClick={() => setAppTab('transactions')}
              className="text-xs text-purple-400 hover:underline flex items-center gap-1 font-semibold cursor-pointer"
            >
              View All ({transactions.length}) <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {transactions.length > 0 ? (
          <div className="space-y-2.5">
            {transactions.slice(0, 5).map((tx) => (
              <div
                key={tx.id}
                className="p-3.5 rounded-2xl bg-[#121826]/60 hover:bg-[#121826] border border-slate-800/80 flex items-center justify-between gap-3 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold ${
                    tx.type === 'income' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-purple-500/20 text-purple-400'
                  }`}>
                    {tx.category.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{tx.title}</h4>
                    <span className="text-[10px] text-slate-400 font-mono">{tx.date} • {tx.paymentMethod}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className={`text-sm font-mono font-extrabold ${
                    tx.type === 'income' ? 'text-emerald-400' : 'text-rose-400'
                  }`}>
                    {tx.type === 'income' ? '+' : '-'}₹{tx.amount.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 px-4 rounded-2xl bg-[#121826]/30 border border-dashed border-slate-800">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center mx-auto mb-3">
              <Receipt className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-white mb-1">No transactions recorded yet</h4>
            <p className="text-xs text-slate-400 max-w-sm mx-auto mb-4">
              Your recent transactions will appear here once you log your first expense or allowance deposit.
            </p>
            <button
              onClick={() => setIsAddTxModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Log First Transaction
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
