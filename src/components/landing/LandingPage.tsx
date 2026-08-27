import React from 'react';
import { Navbar } from '../common/Navbar';
import { Footer } from '../common/Footer';
import { HeroSection } from './HeroSection';
import { OverviewPreviewSection } from './OverviewPreviewSection';
import { FeaturesSection } from './FeaturesSection';
import { TransactionsPreviewSection } from './TransactionsPreviewSection';
import { AnalyticsSection } from './AnalyticsSection';
import { BudgetSection } from './BudgetSection';
import { SavingsGoalsSection } from './SavingsGoalsSection';
import { SmartNotificationsSection } from './SmartNotificationsSection';
import { FinancialForecastSection } from './FinancialForecastSection';
import { StudentLifeSection } from './StudentLifeSection';
import { ExpenseSplittingSection } from './ExpenseSplittingSection';
import { FinancialHealthSection } from './FinancialHealthSection';
import { SecuritySection } from './SecuritySection';
import { FinalCTASection } from './FinalCTASection';
import { useApp } from '../../context/AppContext';

export const LandingPage: React.FC = () => {
  const { setCurrentView } = useApp();

  const handleGetStarted = () => {
    setCurrentView('register');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExploreFeatures = () => {
    const el = document.getElementById('features');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenLogin = () => {
    setCurrentView('login');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenRegister = () => {
    setCurrentView('register');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen text-slate-100 flex flex-col">
      {/* SECTION 1: HEADER */}
      <Navbar onOpenLogin={handleOpenLogin} onOpenRegister={handleOpenRegister} />

      <main className="flex-grow">
        {/* SECTION 2: HERO */}
        <HeroSection
          onGetStarted={handleGetStarted}
          onExploreFeatures={handleExploreFeatures}
        />

        {/* SECTION 3: FINANCIAL OVERVIEW PREVIEW */}
        <OverviewPreviewSection />

        {/* SECTION 4: FEATURES */}
        <FeaturesSection />

        {/* SECTION 5: TRANSACTIONS PREVIEW */}
        <TransactionsPreviewSection />

        {/* SECTION 6: ANALYTICS */}
        <AnalyticsSection />

        {/* SECTION 7: BUDGET */}
        <BudgetSection />

        {/* SECTION 8: SAVINGS GOALS */}
        <SavingsGoalsSection />

        {/* SECTION 9: SMART NOTIFICATIONS */}
        <SmartNotificationsSection />

        {/* SECTION 10: SMART FINANCIAL FORECAST */}
        <FinancialForecastSection />

        {/* SECTION 11: BUILT FOR STUDENT LIFE */}
        <StudentLifeSection />

        {/* SECTION 12: EXPENSE SPLITTING */}
        <ExpenseSplittingSection />

        {/* SECTION 13: FINANCIAL HEALTH */}
        <FinancialHealthSection />

        {/* SECTION 14: SECURITY */}
        <SecuritySection />

        {/* SECTION 15: FINAL CTA */}
        <FinalCTASection onGetStarted={handleGetStarted} />
      </main>

      {/* SECTION 16: FOOTER */}
      <Footer />
    </div>
  );
};
