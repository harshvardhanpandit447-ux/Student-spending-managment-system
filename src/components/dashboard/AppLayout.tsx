import React from 'react';
import { useApp } from '../../context/AppContext';
import { AppHeader } from './AppHeader';
import { AppSidebar } from './AppSidebar';
import { DashboardView } from './DashboardView';
import { TransactionsView } from './TransactionsView';
import { AnalyticsView } from './AnalyticsView';
import { BudgetsView } from './BudgetsView';
import { SavingsGoalsView } from './SavingsGoalsView';
import { SplitsView } from './SplitsView';
import { NotificationsView } from './NotificationsView';
import { AddTransactionModal } from '../modals/AddTransactionModal';
import { AddGoalModal } from '../modals/AddGoalModal';
import { SplitBillModal } from '../modals/SplitBillModal';

export const AppLayout: React.FC = () => {
  const { appTab } = useApp();

  const renderTabContent = () => {
    switch (appTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'transactions':
        return <TransactionsView />;
      case 'analytics':
        return <AnalyticsView />;
      case 'budgets':
        return <BudgetsView />;
      case 'goals':
        return <SavingsGoalsView />;
      case 'splits':
        return <SplitsView />;
      case 'notifications':
        return <NotificationsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="relative min-h-screen bg-[#05070E] text-slate-100 flex flex-col">
      <AppHeader />
      
      <div className="flex-1 flex flex-col md:flex-row">
        <AppSidebar />
        <main className="flex-1 overflow-y-auto pb-16">
          {renderTabContent()}
        </main>
      </div>

      {/* Global Modals */}
      <AddTransactionModal />
      <AddGoalModal />
      <SplitBillModal />
    </div>
  );
};
