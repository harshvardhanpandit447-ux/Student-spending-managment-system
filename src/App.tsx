import React from 'react';
import { useApp, AppProvider } from './context/AppContext';
import { FinFlowCanvas } from './components/canvas/FinFlowCanvas';
import { LandingPage } from './components/landing/LandingPage';
import { LoginPage } from './components/auth/LoginPage';
import { RegisterPage } from './components/auth/RegisterPage';
import { AppLayout } from './components/dashboard/AppLayout';

const MainView: React.FC = () => {
  const { currentView, setCurrentView } = useApp();

  return (
    <div className="relative min-h-screen bg-[#05070E] text-slate-100 selection:bg-purple-500 selection:text-white">
      {/* Interactive 3D WebGL Financial Mesh & Particle Environment */}
      <FinFlowCanvas />

      {/* View Router */}
      <div className="relative z-10">
        {currentView === 'landing' && <LandingPage />}
        {currentView === 'login' && (
          <LoginPage
            onSwitchToRegister={() => setCurrentView('register')}
            onBackToLanding={() => setCurrentView('landing')}
          />
        )}
        {currentView === 'register' && (
          <RegisterPage
            onSwitchToLogin={() => setCurrentView('login')}
            onBackToLanding={() => setCurrentView('landing')}
          />
        )}
        {currentView === 'app' && <AppLayout />}
      </div>
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainView />
    </AppProvider>
  );
}

export default App;
