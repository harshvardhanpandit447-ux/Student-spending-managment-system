import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  LayoutDashboard, 
  ArrowLeftRight, 
  BarChart3, 
  Target, 
  PiggyBank, 
  Users, 
  Bell, 
  Sparkles, 
  PlusCircle, 
  ExternalLink 
} from 'lucide-react';

export const AppSidebar: React.FC = () => {
  const { appTab, setAppTab, unreadNotificationCount, setIsSplitModalOpen, setIsAddGoalModalOpen, setCurrentView } = useApp();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'transactions', label: 'Transactions', icon: ArrowLeftRight },
    { id: 'analytics', label: 'Analytics & Trends', icon: BarChart3 },
    { id: 'budgets', label: 'Category Budgets', icon: Target },
    { id: 'goals', label: 'Savings Goals', icon: PiggyBank },
    { id: 'splits', label: 'Split Expenses', icon: Users },
    { id: 'notifications', label: 'Smart Alerts', icon: Bell, badge: unreadNotificationCount },
  ];

  return (
    <aside className="w-64 bg-[#080C16]/90 border-r border-purple-500/15 flex flex-col justify-between p-4 flex-shrink-0 min-h-[calc(100vh-61px)]">
      <div className="space-y-6">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = appTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setAppTab(item.id as any)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-purple-600/20 text-purple-300 border border-purple-500/40 shadow-md shadow-purple-950/50'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-purple-400' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && item.badge > 0 ? (
                  <span className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-bold flex items-center justify-center font-mono">
                    {item.badge}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>

        {/* Quick Action Shortcuts */}
        <div className="pt-4 border-t border-slate-800/80 space-y-2">
          <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 px-3">
            Quick Actions
          </span>
          <button
            onClick={() => setIsSplitModalOpen(true)}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-300 bg-[#121826]/70 hover:bg-slate-800 border border-slate-800 hover:border-purple-500/30 transition-all text-left"
          >
            <Users className="w-3.5 h-3.5 text-cyan-400" />
            <span>Split Group Bill</span>
          </button>
          <button
            onClick={() => setIsAddGoalModalOpen(true)}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-300 bg-[#121826]/70 hover:bg-slate-800 border border-slate-800 hover:border-purple-500/30 transition-all text-left"
          >
            <PiggyBank className="w-3.5 h-3.5 text-purple-400" />
            <span>New Savings Goal</span>
          </button>
        </div>
      </div>

      {/* Switch to Landing preview badge */}
      <div className="p-3.5 rounded-2xl bg-gradient-to-br from-purple-950/30 to-indigo-950/20 border border-purple-500/20">
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="font-bold text-white flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" /> Landing Site
          </span>
          <button
            onClick={() => setCurrentView('landing')}
            className="text-[10px] text-purple-400 hover:underline flex items-center gap-0.5"
          >
            View <ExternalLink className="w-3 h-3" />
          </button>
        </div>
        <p className="text-[11px] text-slate-400 leading-tight">
          Explore all 16 interactive 3D landing sections.
        </p>
      </div>
    </aside>
  );
};
