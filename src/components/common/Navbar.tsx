import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, ArrowRight, Shield, Layers, BarChart2, Bell, Menu, X, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  onOpenLogin?: () => void;
  onOpenRegister?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenLogin, onOpenRegister }) => {
  const { currentView, setCurrentView, isLoggedIn, logout } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    if (currentView !== 'landing') {
      setCurrentView('landing');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#070A14]/80 backdrop-blur-xl border-b border-purple-500/20 py-3 shadow-2xl shadow-purple-950/20'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => {
            setCurrentView('landing');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-3 group text-left focus:outline-none"
        >
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-400 p-[1.5px] shadow-lg shadow-purple-500/25 group-hover:shadow-purple-500/40 transition-all">
            <div className="w-full h-full bg-[#070A14] rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-purple-400 group-hover:rotate-12 transition-transform duration-300" />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-extrabold tracking-tight text-white font-sans">
                Fin<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Flow</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                PRO
              </span>
            </div>
            <span className="text-[10px] text-slate-400 tracking-wider font-mono hidden sm:inline-block">
              TRACK • ANALYZE • GROW
            </span>
          </div>
        </button>

        {/* Center Navigation */}
        <nav className="hidden md:flex items-center gap-1 px-4 py-1.5 rounded-full bg-[#101626]/60 border border-purple-500/15 backdrop-blur-lg">
          <button
            onClick={() => scrollToSection('hero')}
            className="px-4 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-purple-500/15 rounded-full transition-all"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection('features')}
            className="px-4 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-purple-500/15 rounded-full transition-all"
          >
            Features
          </button>
          <button
            onClick={() => scrollToSection('analytics')}
            className="px-4 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-purple-500/15 rounded-full transition-all"
          >
            Analytics
          </button>
          <button
            onClick={() => scrollToSection('student-life')}
            className="px-4 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-purple-500/15 rounded-full transition-all"
          >
            Student Life
          </button>
          <button
            onClick={() => scrollToSection('security')}
            className="px-4 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-purple-500/15 rounded-full transition-all"
          >
            Security
          </button>
        </nav>

        {/* Right CTA */}
        <div className="hidden md:flex items-center gap-3">
          {isLoggedIn ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentView('app')}
                className="px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-xl shadow-lg shadow-purple-600/30 transition-all flex items-center gap-1.5"
              >
                Go to Dashboard
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={logout}
                className="px-3 py-2 text-xs font-medium text-slate-400 hover:text-rose-400 rounded-xl transition-all"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={() => {
                  if (onOpenLogin) onOpenLogin();
                  else setCurrentView('login');
                }}
                className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
              >
                Login
              </button>
              <button
                onClick={() => {
                  if (onOpenRegister) onOpenRegister();
                  else setCurrentView('register');
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 rounded-xl shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-1.5 group"
              >
                <span>Get Started</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Trigger */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-slate-900/80 border border-purple-500/20 text-slate-300 hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 px-4 pt-3 pb-6 bg-[#0B0F19]/95 backdrop-blur-2xl border-b border-purple-500/20 space-y-3">
          <button
            onClick={() => scrollToSection('hero')}
            className="block w-full text-left py-2 text-sm text-slate-300 hover:text-purple-400"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection('features')}
            className="block w-full text-left py-2 text-sm text-slate-300 hover:text-purple-400"
          >
            Features
          </button>
          <button
            onClick={() => scrollToSection('analytics')}
            className="block w-full text-left py-2 text-sm text-slate-300 hover:text-purple-400"
          >
            Analytics & Predictions
          </button>
          <button
            onClick={() => scrollToSection('student-life')}
            className="block w-full text-left py-2 text-sm text-slate-300 hover:text-purple-400"
          >
            Built for Students
          </button>
          <button
            onClick={() => scrollToSection('security')}
            className="block w-full text-left py-2 text-sm text-slate-300 hover:text-purple-400"
          >
            Security Architecture
          </button>

          <div className="pt-4 border-t border-slate-800 flex flex-col gap-2">
            {isLoggedIn ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setCurrentView('app');
                }}
                className="w-full py-2.5 text-center text-sm font-semibold text-white bg-purple-600 rounded-xl"
              >
                Go to Dashboard
              </button>
            ) : (
              <>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenLogin) onOpenLogin();
                    else setCurrentView('login');
                  }}
                  className="w-full py-2.5 text-center text-sm font-medium text-slate-300 bg-slate-900 border border-slate-800 rounded-xl"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenRegister) onOpenRegister();
                    else setCurrentView('register');
                  }}
                  className="w-full py-2.5 text-center text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-cyan-500 rounded-xl"
                >
                  Get Started Free
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
