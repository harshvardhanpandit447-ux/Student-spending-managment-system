import React from 'react';
import { Sparkles, Mail, ArrowUpRight, ShieldCheck, Heart } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const { setCurrentView, setAppTab } = useApp();

  const handleNav = (tab: 'dashboard' | 'transactions' | 'analytics' | 'budgets' | 'goals' | 'notifications') => {
    setAppTab(tab);
    setCurrentView('app');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#04060B] border-t border-purple-500/15 pt-16 pb-12 overflow-hidden z-10">
      {/* Background glow orb */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-purple-600/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Col 1: Brand */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-cyan-400 p-[1px] shadow-lg shadow-purple-500/20">
                <div className="w-full h-full bg-[#070A14] rounded-[11px] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-purple-400" />
                </div>
              </div>
              <div>
                <span className="text-2xl font-black tracking-tight text-white font-sans">
                  Fin<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Flow</span>
                </span>
                <p className="text-xs text-purple-300/80 font-mono">TRACK • ANALYZE • GROW</p>
              </div>
            </div>
            
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              The intelligent student finance management platform engineered for Indian campus life. Track expenses, analyze spending, forecast budgets, and grow savings.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-purple-500/50 hover:bg-purple-500/10 transition-all"
                aria-label="GitHub"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-purple-500/50 hover:bg-purple-500/10 transition-all"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a
                href="mailto:contact@finflow.app"
                className="w-9 h-9 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-purple-500/50 hover:bg-purple-500/10 transition-all"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Product */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider font-mono">Product</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button onClick={() => handleNav('dashboard')} className="hover:text-purple-400 transition-colors flex items-center gap-1">
                  Dashboard Preview
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('transactions')} className="hover:text-purple-400 transition-colors flex items-center gap-1">
                  Transactions Tracker
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('analytics')} className="hover:text-purple-400 transition-colors flex items-center gap-1">
                  Spending Analytics
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('budgets')} className="hover:text-purple-400 transition-colors flex items-center gap-1">
                  Category Budgets
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('goals')} className="hover:text-purple-400 transition-colors flex items-center gap-1">
                  Savings Goals
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('notifications')} className="hover:text-purple-400 transition-colors flex items-center gap-1">
                  Smart Notifications
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Student Tools */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider font-mono">Student Tools</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button onClick={() => { setCurrentView('app'); setAppTab('splits'); }} className="hover:text-purple-400 transition-colors">
                  Split Hostel Bills
                </button>
              </li>
              <li>
                <a href="#forecast" className="hover:text-purple-400 transition-colors">
                  Burn Rate AI Forecast
                </a>
              </li>
              <li>
                <a href="#student-life" className="hover:text-purple-400 transition-colors">
                  College Fee Planner
                </a>
              </li>
              <li>
                <a href="#health-score" className="hover:text-purple-400 transition-colors">
                  Financial Health Score (78/100)
                </a>
              </li>
              <li>
                <span className="inline-flex items-center gap-1 text-xs text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                  <ShieldCheck className="w-3 h-3" /> Encrypted Storage
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4: Resources & Trust */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider font-mono">Resources</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#how-it-works" className="hover:text-purple-400 transition-colors">How It Works</a></li>
              <li><a href="#security" className="hover:text-purple-400 transition-colors">Security Architecture</a></li>
              <li><a href="#security" className="hover:text-purple-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#security" className="hover:text-purple-400 transition-colors">Terms of Service</a></li>
              <li>
                <span className="text-xs text-slate-500 font-mono">API Ready: REST + PostgreSQL</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 FinFlow Inc. Built for smarter student finances.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>₹ INR Native Support</span>
            <span>•</span>
            <span>UPI Instant Integration Ready</span>
            <span>•</span>
            <span className="flex items-center gap-1 text-slate-400">
              Crafted for students <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
