import React from 'react';
import { useApp } from '../../context/AppContext';
import { Target, Plus, Laptop, Plane, BookOpen, ShieldCheck } from 'lucide-react';

export const SavingsGoalsView: React.FC = () => {
  const { goals, depositToGoal, setIsAddGoalModalOpen } = useApp();

  const iconMap: { [key: string]: any } = {
    Laptop: Laptop,
    Plane: Plane,
    BookOpen: BookOpen,
    ShieldCheck: ShieldCheck,
    Target: Target
  };

  return (
    <div className="space-y-8 p-4 sm:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Savings Goals</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Build discipline, track hardware targets, and celebrate milestones with visual rings.
          </p>
        </div>

        <button
          onClick={() => setIsAddGoalModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold shadow-md shadow-purple-600/30 flex items-center gap-1.5 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Savings Goal</span>
        </button>
      </div>

      {/* Goals Grid */}
      {goals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {goals.map((g) => {
            const Icon = iconMap[g.icon] || Target;
            const percent = g.targetAmount > 0 ? Math.min(100, Math.round((g.currentAmount / g.targetAmount) * 100)) : 0;
            const isCompleted = g.currentAmount >= g.targetAmount;

            return (
              <div
                key={g.id}
                className="p-6 sm:p-7 rounded-3xl bg-[#0B0F19]/90 backdrop-blur-xl border border-purple-500/20 hover:border-purple-500/40 transition-all shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-2xl bg-[#121826] border border-slate-800 flex items-center justify-center text-purple-400">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">{g.title}</h3>
                        <span className="text-xs text-slate-400 font-mono">
                          Target: {g.deadline} • {g.category}
                        </span>
                      </div>
                    </div>

                    <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-full ${
                      isCompleted
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-purple-950/60 text-purple-300 border border-purple-800/40'
                    }`}>
                      {percent}% Funded
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-white font-bold">₹{g.currentAmount.toLocaleString()} Saved</span>
                      <span className="text-slate-500">₹{g.targetAmount.toLocaleString()} Target</span>
                    </div>
                    <div className="h-3 w-full bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-purple-600 via-indigo-500 to-cyan-400 transition-all duration-500"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Quick Deposit Actions */}
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-mono">
                    {isCompleted ? 'Goal Fully Achieved! 🎉' : `₹${Math.max(0, g.targetAmount - g.currentAmount).toLocaleString()} to go`}
                  </span>

                  {!isCompleted && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => depositToGoal(g.id, 500)}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-purple-600 text-slate-200 hover:text-white text-xs font-mono font-medium transition-colors border border-slate-700 hover:border-purple-500 cursor-pointer"
                      >
                        +₹500
                      </button>
                      <button
                        onClick={() => depositToGoal(g.id, 2000)}
                        className="px-3 py-1.5 rounded-lg bg-purple-600/20 hover:bg-cyan-600 text-purple-300 hover:text-white text-xs font-mono font-medium transition-colors border border-purple-500/30 hover:border-cyan-500 cursor-pointer"
                      >
                        +₹2,000
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 px-4 rounded-3xl bg-[#0B0F19]/90 border border-dashed border-purple-500/25">
          <div className="w-14 h-14 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center mx-auto mb-4">
            <Target className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-white mb-1">No Savings Goals Yet</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto mb-6">
            Create milestones for laptops, study roadtrips, courses, or hostel cushion funds.
          </p>
          <button
            onClick={() => setIsAddGoalModalOpen(true)}
            className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all inline-flex items-center gap-2 cursor-pointer shadow-lg shadow-purple-600/30"
          >
            <Plus className="w-4 h-4" /> Create Your First Goal
          </button>
        </div>
      )}
    </div>
  );
};
