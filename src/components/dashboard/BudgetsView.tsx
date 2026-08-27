import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Target, AlertTriangle, CheckCircle2, Edit2, Plus } from 'lucide-react';
import { Budget } from '../../types';

export const BudgetsView: React.FC = () => {
  const { budgets, updateBudget, setIsAddTxModalOpen } = useApp();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newLimit, setNewLimit] = useState('');

  const handleStartEdit = (b: Budget) => {
    setEditingId(b.id);
    setNewLimit(b.limit.toString());
  };

  const handleSaveLimit = async (id: string) => {
    if (!newLimit) return;
    await updateBudget(id, { limit: parseFloat(newLimit) });
    setEditingId(null);
  };

  const totalSpent = budgets.reduce((sum, b) => sum + (b.spent || 0), 0);
  const totalLimit = budgets.reduce((sum, b) => sum + b.limit, 0);
  const overallPercent = totalLimit > 0 ? Math.round((totalSpent / totalLimit) * 100) : 0;

  return (
    <div className="space-y-8 p-4 sm:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Category Budgets</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Enforce spending limits per category to guarantee month-end financial peace.
          </p>
        </div>

        <div className="p-3 rounded-2xl bg-[#0B0F19] border border-purple-500/20 font-mono text-xs text-right">
          <span className="text-slate-400 block">Total Budget Allocation:</span>
          <span className="text-base font-black text-white">₹{totalSpent.toLocaleString()} / ₹{totalLimit.toLocaleString()}</span>
        </div>
      </div>

      {/* Overall Progress Gauge Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0B0F19]/90 backdrop-blur-xl border border-purple-500/25 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-mono uppercase text-purple-300">Overall Consumption</span>
            <h2 className="text-2xl font-black text-white mt-0.5">{overallPercent}% Budget Utilized</h2>
          </div>
          <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full border ${
            overallPercent > 90 ? 'bg-rose-500/20 text-rose-300 border-rose-500/30' : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
          }`}>
            {overallPercent > 90 ? 'DEFICIT RISK' : 'ON TRACK'}
          </span>
        </div>

        <div className="h-4 w-full bg-slate-900 rounded-full overflow-hidden p-1 border border-slate-800">
          <div
            className={`h-full rounded-full transition-all duration-700 ${
              overallPercent > 90 ? 'bg-gradient-to-r from-amber-500 to-rose-500' : 'bg-gradient-to-r from-purple-600 to-cyan-500'
            }`}
            style={{ width: `${Math.min(100, overallPercent)}%` }}
          />
        </div>

        <div className="flex justify-between text-xs text-slate-400 font-mono pt-1">
          <span>₹{totalSpent.toLocaleString()} Spent</span>
          <span>₹{Math.max(0, totalLimit - totalSpent).toLocaleString()} Remaining Buffer</span>
        </div>
      </div>

      {/* Category Budgets Grid */}
      {budgets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {budgets.map((b) => {
            const percent = b.limit > 0 ? Math.round(((b.spent || 0) / b.limit) * 100) : 0;
            const isOver = (b.spent || 0) > b.limit;
            const isWarning = !isOver && percent >= (b.warningThreshold || 0.8) * 100;

            return (
              <div
                key={b.id}
                className={`p-6 rounded-3xl bg-[#0B0F19]/90 backdrop-blur-xl border transition-all flex flex-col justify-between ${
                  isOver
                    ? 'border-rose-500/40 shadow-lg shadow-rose-950/30'
                    : isWarning
                    ? 'border-amber-500/40'
                    : 'border-purple-500/20 hover:border-purple-500/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-[#121826] border border-slate-800 flex items-center justify-center text-purple-400">
                        <Target className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white">{b.category}</h3>
                        <span className="text-[10px] text-slate-500 font-mono">Monthly Budget</span>
                      </div>
                    </div>

                    <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                      isOver ? 'bg-rose-500/20 text-rose-300' : isWarning ? 'bg-amber-500/20 text-amber-300' : 'bg-slate-800 text-slate-300'
                    }`}>
                      {percent}%
                    </span>
                  </div>

                  {/* Amounts & Edit */}
                  <div className="my-4 space-y-2">
                    <div className="flex justify-between items-baseline text-xs font-mono">
                      <span className="text-lg font-black text-white">₹{(b.spent || 0).toLocaleString()}</span>
                      {editingId === b.id ? (
                        <div className="flex items-center gap-1">
                          <input
                            type="number"
                            value={newLimit}
                            onChange={(e) => setNewLimit(e.target.value)}
                            className="w-20 px-2 py-1 bg-slate-900 border border-purple-500 rounded text-xs text-white"
                          />
                          <button
                            onClick={() => handleSaveLimit(b.id)}
                            className="px-2 py-1 bg-purple-600 rounded text-white text-xs cursor-pointer"
                          >
                            Save
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleStartEdit(b)}
                          className="text-slate-400 hover:text-white flex items-center gap-1 text-[11px] cursor-pointer"
                        >
                          Cap: ₹{b.limit.toLocaleString()} <Edit2 className="w-3 h-3 text-purple-400" />
                        </button>
                      )}
                    </div>

                    <div className="h-2.5 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isOver ? 'bg-rose-500' : isWarning ? 'bg-amber-500' : 'bg-purple-500'
                        }`}
                        style={{ width: `${Math.min(100, percent)}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Status Alert Footer */}
                <div className="pt-3 border-t border-slate-800/80">
                  {isOver ? (
                    <div className="flex items-center gap-1.5 text-xs text-rose-400 font-semibold font-mono">
                      <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>Over budget by ₹{((b.spent || 0) - b.limit).toLocaleString()}</span>
                    </div>
                  ) : isWarning ? (
                    <div className="flex items-center gap-1.5 text-xs text-amber-400 font-semibold font-mono">
                      <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>Nearing limit (80%+ reached)</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium font-mono">
                      <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>Safe: ₹{Math.max(0, b.limit - (b.spent || 0)).toLocaleString()} headroom</span>
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
          <h3 className="text-lg font-bold text-white mb-1">No Category Budgets Yet</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto mb-6">
            When you log expenses under categories like Food, Transport, or Education, your category spend will track against your budget caps.
          </p>
          <button
            onClick={() => setIsAddTxModalOpen(true)}
            className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all inline-flex items-center gap-2 cursor-pointer shadow-lg shadow-purple-600/30"
          >
            <Plus className="w-4 h-4" /> Log First Expense
          </button>
        </div>
      )}
    </div>
  );
};
