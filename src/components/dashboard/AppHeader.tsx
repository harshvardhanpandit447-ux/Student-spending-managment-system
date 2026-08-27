import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, Bell, Plus, Search, LogOut, User, Check, Layers, ChevronDown } from 'lucide-react';

export const AppHeader: React.FC = () => {
  const { 
    user, 
    unreadNotificationCount, 
    setAppTab, 
    setIsAddTxModalOpen, 
    logout,
    setCurrentView 
  } = useApp();

  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#070A14]/85 backdrop-blur-xl border-b border-purple-500/15 px-4 sm:px-8 py-3.5 flex items-center justify-between">
      {/* Brand & Tab indicator */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setCurrentView('landing')}
          className="flex items-center gap-2 group focus:outline-none"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-cyan-400 p-[1px] shadow-md shadow-purple-500/25">
            <div className="w-full h-full bg-[#070A14] rounded-[11px] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-purple-400" />
            </div>
          </div>
          <span className="text-lg font-black text-white font-sans hidden sm:inline-block">
            Fin<span className="text-purple-400">Flow</span>
          </span>
        </button>

        <div className="h-4 w-px bg-slate-800 hidden sm:block" />

        <span className="text-xs font-mono font-medium text-slate-400 hidden md:inline-block">
          {user?.college ? `${user.college} / Student Portal` : 'PVGCOET / Student Portal'}
        </span>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Quick Log Transaction Button */}
        <button
          onClick={() => setIsAddTxModalOpen(true)}
          className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold shadow-md shadow-purple-600/30 flex items-center gap-1.5 transition-all active:scale-95"
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Add Transaction</span>
        </button>

        {/* Notifications Bell */}
        <button
          onClick={() => setAppTab('notifications')}
          className="relative p-2 rounded-xl bg-[#121826] border border-purple-500/20 text-slate-300 hover:text-white hover:border-purple-500/40 transition-colors"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4" />
          {unreadNotificationCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center font-mono">
              {unreadNotificationCount}
            </span>
          )}
        </button>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 p-1.5 rounded-xl bg-[#121826] border border-slate-800 hover:border-purple-500/40 transition-colors"
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-purple-600 to-cyan-400 p-[1px]">
              <img
                src={user?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80"}
                alt="Avatar"
                className="w-full h-full object-cover rounded-[7px]"
              />
            </div>
            <span className="text-xs font-semibold text-white hidden sm:inline-block">
              {user?.name.split(' ')[0]}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#0B0F19] border border-purple-500/30 p-2 shadow-2xl z-50 space-y-1">
              <div className="px-3 py-2 border-b border-slate-800">
                <p className="text-xs font-bold text-white">{user?.name}</p>
                <p className="text-[10px] text-slate-400 font-mono truncate">{user?.email}</p>
                <span className="text-[9px] font-mono text-purple-300 bg-purple-950/60 px-1.5 py-0.5 rounded border border-purple-800/40 inline-block mt-1">
                  {user?.college}
                </span>
              </div>

              <button
                onClick={() => {
                  setProfileOpen(false);
                  setCurrentView('landing');
                }}
                className="w-full text-left px-3 py-2 rounded-xl text-xs text-slate-300 hover:text-white hover:bg-slate-800 flex items-center gap-2"
              >
                <Layers className="w-3.5 h-3.5 text-purple-400" />
                Landing Page Preview
              </button>

              <button
                onClick={() => {
                  setProfileOpen(false);
                  logout();
                }}
                className="w-full text-left px-3 py-2 rounded-xl text-xs text-rose-400 hover:bg-rose-950/30 flex items-center gap-2"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
