import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { 
  Bell, 
  CheckCheck, 
  AlertTriangle, 
  TrendingUp, 
  Sparkles, 
  Clock, 
  AlertCircle, 
  Layers, 
  Check 
} from 'lucide-react';
import { NotificationType } from '../../types';

export const NotificationsView: React.FC = () => {
  const { 
    notifications, 
    markNotificationAsRead, 
    markAllNotificationsAsRead 
  } = useApp();

  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const filterTabs = [
    { id: 'all', label: 'All Alerts' },
    { id: 'budget_alert', label: 'Budget Alerts' },
    { id: 'spending_alert', label: 'Spending Surges' },
    { id: 'savings_update', label: 'Savings Updates' },
    { id: 'payment_reminder', label: 'Payment Reminders' },
    { id: 'prediction', label: 'Predictions' },
  ];

  const filtered = notifications.filter(n => {
    if (selectedFilter === 'all') return true;
    return n.type === selectedFilter;
  });

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case 'budget_alert':
        return <AlertTriangle className="w-5 h-5 text-rose-400" />;
      case 'spending_alert':
        return <TrendingUp className="w-5 h-5 text-amber-400" />;
      case 'savings_update':
        return <Sparkles className="w-5 h-5 text-emerald-400" />;
      case 'payment_reminder':
        return <Clock className="w-5 h-5 text-cyan-400" />;
      case 'prediction':
        return <AlertCircle className="w-5 h-5 text-purple-400" />;
      default:
        return <Bell className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-8 p-4 sm:p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Smart Financial Notifications</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time automated alerts for budget spikes, subscription renewals, and goal checkpoints.
          </p>
        </div>

        <button
          onClick={() => markAllNotificationsAsRead()}
          className="px-3.5 py-2 rounded-xl bg-purple-600/20 hover:bg-purple-600 text-purple-300 hover:text-white border border-purple-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all"
        >
          <CheckCheck className="w-4 h-4" />
          <span>Mark All as Read</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 no-scrollbar">
        {filterTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedFilter(tab.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedFilter === tab.id
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : 'bg-[#121826]/70 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Notification List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="p-12 rounded-3xl bg-[#0B0F19]/90 border border-slate-800 text-center text-slate-500">
            No notifications in this category. You're all caught up!
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              className={`p-5 rounded-3xl backdrop-blur-xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                !item.isRead
                  ? 'bg-purple-950/25 border-purple-500/40 shadow-lg shadow-purple-950/20'
                  : 'bg-[#0B0F19]/90 border-slate-800/80 hover:border-purple-500/20'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-[#121826] border border-slate-800 flex items-center justify-center flex-shrink-0">
                  {getIcon(item.type)}
                </div>

                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm font-bold text-white">{item.title}</h3>
                    {!item.isRead && (
                      <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
                    )}
                    {item.tag && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        {item.tag}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    {item.message}
                  </p>
                </div>
              </div>

              <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800 flex-shrink-0">
                <span className="text-[11px] text-slate-500 font-mono">{item.timestamp}</span>
                {!item.isRead && (
                  <button
                    onClick={() => markNotificationAsRead(item.id)}
                    className="text-[11px] text-purple-400 hover:text-purple-300 font-semibold font-mono flex items-center gap-1"
                  >
                    <Check className="w-3 h-3" /> Mark read
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
