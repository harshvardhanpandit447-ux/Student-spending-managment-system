import React, { createContext, useContext, useState, useEffect } from 'react';
import type { 
  Transaction, 
  Budget, 
  SavingsGoal, 
  NotificationItem, 
  SplitExpense, 
  UserProfile 
} from '../types';
import { api } from '../services/api';
import confetti from 'canvas-confetti';

interface AppContextType {
  // Navigation & Auth
  currentView: 'landing' | 'login' | 'register' | 'app';
  setCurrentView: (view: 'landing' | 'login' | 'register' | 'app') => void;
  appTab: 'dashboard' | 'transactions' | 'analytics' | 'budgets' | 'goals' | 'splits' | 'notifications';
  setAppTab: (tab: 'dashboard' | 'transactions' | 'analytics' | 'budgets' | 'goals' | 'splits' | 'notifications') => void;
  isLoggedIn: boolean;
  user: UserProfile | null;
  login: (email?: string, password?: string) => Promise<boolean>;
  register: (formData: { name: string; email: string; password: string; college?: string; year?: string; monthlyBudget?: number }) => Promise<boolean>;
  logout: () => void;
  
  // Data State
  transactions: Transaction[];
  budgets: Budget[];
  goals: SavingsGoal[];
  notifications: NotificationItem[];
  splits: SplitExpense[];
  loading: boolean;
  unreadNotificationCount: number;

  // Actions
  addTransaction: (tx: Omit<Transaction, 'id'>) => Promise<void>;
  updateTransaction: (id: string, updates: Partial<Transaction>) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  updateBudget: (id: string, updates: Partial<Budget>) => Promise<void>;
  depositToGoal: (id: string, amount: number) => Promise<void>;
  addSavingsGoal: (goal: Omit<SavingsGoal, 'id'>) => Promise<void>;
  markNotificationAsRead: (id: string) => Promise<void>;
  markAllNotificationsAsRead: () => Promise<void>;
  addSplitExpense: (split: Omit<SplitExpense, 'id'>) => Promise<void>;
  toggleSplitPaid: (splitId: string, participantId: string) => Promise<void>;
  
  // Modals
  isAddTxModalOpen: boolean;
  setIsAddTxModalOpen: (open: boolean) => void;
  isAddGoalModalOpen: boolean;
  setIsAddGoalModalOpen: (open: boolean) => void;
  isSplitModalOpen: boolean;
  setIsSplitModalOpen: (open: boolean) => void;
  triggerConfetti: () => void;
  refreshData: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<'landing' | 'login' | 'register' | 'app'>('landing');
  const [appTab, setAppTab] = useState<'dashboard' | 'transactions' | 'analytics' | 'budgets' | 'goals' | 'splits' | 'notifications'>('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<UserProfile | null>(null);

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [goals, setGoals] = useState<SavingsGoal[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [splits, setSplits] = useState<SplitExpense[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Modals
  const [isAddTxModalOpen, setIsAddTxModalOpen] = useState(false);
  const [isAddGoalModalOpen, setIsAddGoalModalOpen] = useState(false);
  const [isSplitModalOpen, setIsSplitModalOpen] = useState(false);

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#8B5CF6', '#06B6D4', '#3B82F6', '#10B981', '#F43F5E']
    });
  };

  const loadAllData = async () => {
    setLoading(true);
    try {
      const token = api.getToken();
      if (!token) {
        setIsLoggedIn(false);
        setUser(null);
        setTransactions([]);
        setBudgets([]);
        setGoals([]);
        setNotifications([]);
        setSplits([]);
        setLoading(false);
        return;
      }

      const u = await api.getUserProfile();
      if (!u) {
        // Expired or invalid token
        api.clearAuth();
        setIsLoggedIn(false);
        setUser(null);
        setCurrentView('landing');
        setLoading(false);
        return;
      }

      setUser(u);
      setIsLoggedIn(true);

      const [txs, bgs, gls, notifs, splts] = await Promise.all([
        api.getTransactions(),
        api.getBudgets(),
        api.getSavingsGoals(),
        api.getNotifications(),
        api.getSplits()
      ]);
      setTransactions(txs || []);
      setBudgets(bgs || []);
      setGoals(gls || []);
      setNotifications(notifs || []);
      setSplits(splts || []);
    } catch (e) {
      console.error("Error loading FinFlow data:", e);
    } finally {
      setLoading(false);
    }
  };

  // Restore session on page load
  useEffect(() => {
    const token = api.getToken();
    if (token) {
      setIsLoggedIn(true);
      setCurrentView('app');
    }
    loadAllData();
  }, []);

  const login = async (email?: string, password?: string): Promise<boolean> => {
    try {
      const targetEmail = (email || 'aryan.sharma@iitd.ac.in').trim();
      const targetPassword = password || 'password123';
      const { user: loggedInUser } = await api.login(targetEmail, targetPassword);
      setUser(loggedInUser);
      setIsLoggedIn(true);
      setCurrentView('app');
      setAppTab('dashboard');
      await loadAllData();
      return true;
    } catch (err: any) {
      console.error('Login error:', err.message);
      throw err;
    }
  };

  const register = async (formData: { name: string; email: string; password: string; college?: string; year?: string; monthlyBudget?: number }): Promise<boolean> => {
    try {
      const { user: registeredUser } = await api.register({
        ...formData,
        email: formData.email.trim()
      });
      setUser(registeredUser);
      setIsLoggedIn(true);
      setCurrentView('app');
      setAppTab('dashboard');
      await loadAllData();
      return true;
    } catch (err: any) {
      console.error('Registration error:', err.message);
      throw err;
    }
  };

  const logout = () => {
    api.clearAuth();
    setIsLoggedIn(false);
    setUser(null);
    setTransactions([]);
    setBudgets([]);
    setGoals([]);
    setNotifications([]);
    setSplits([]);
    setCurrentView('landing');
  };

  const addTransaction = async (tx: Omit<Transaction, 'id'>) => {
    const newTx = await api.addTransaction(tx);
    setTransactions(prev => [newTx, ...prev]);

    // Refresh budgets to update spent
    const updatedBudgets = await api.getBudgets();
    setBudgets(updatedBudgets);

    if (newTx.amount >= 2000 && newTx.type === 'expense') {
      const notif: NotificationItem = {
        id: `n-${Date.now()}`,
        title: 'Large Expense Detected',
        message: `₹${newTx.amount.toLocaleString()} was logged under ${newTx.category}.`,
        type: 'spending_alert',
        timestamp: 'Just now',
        isRead: false,
        priority: 'high'
      };
      setNotifications(prev => [notif, ...prev]);
    }
  };

  const updateTransaction = async (id: string, updates: Partial<Transaction>) => {
    const updated = await api.updateTransaction(id, updates);
    setTransactions(prev => prev.map(t => t.id === id ? updated : t));
    const updatedBudgets = await api.getBudgets();
    setBudgets(updatedBudgets);
  };

  const deleteTransaction = async (id: string) => {
    await api.deleteTransaction(id);
    setTransactions(prev => prev.filter(t => t.id !== id));
    const updatedBudgets = await api.getBudgets();
    setBudgets(updatedBudgets);
  };

  const updateBudget = async (id: string, updates: Partial<Budget>) => {
    const updated = await api.updateBudget(id, updates);
    setBudgets(prev => prev.map(b => b.id === id ? updated : b));
  };

  const depositToGoal = async (id: string, amount: number) => {
    const updated = await api.depositToGoal(id, amount);
    setGoals(prev => prev.map(g => g.id === id ? updated : g));
    triggerConfetti();
  };

  const addSavingsGoal = async (goal: Omit<SavingsGoal, 'id'>) => {
    const created = await api.addSavingsGoal(goal);
    setGoals(prev => [...prev, created]);
    triggerConfetti();
  };

  const markNotificationAsRead = async (id: string) => {
    await api.markNotificationAsRead(id);
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const markAllNotificationsAsRead = async () => {
    await api.markAllNotificationsAsRead();
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const addSplitExpense = async (split: Omit<SplitExpense, 'id'>) => {
    const created = await api.addSplit(split);
    setSplits(prev => [created, ...prev]);
  };

  const toggleSplitPaid = async (splitId: string, participantId: string) => {
    const updated = await api.toggleParticipantPaid(splitId, participantId);
    setSplits(prev => prev.map(s => s.id === splitId ? updated : s));
  };

  const unreadNotificationCount = notifications.filter(n => !n.isRead).length;

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        appTab,
        setAppTab,
        isLoggedIn,
        user,
        login,
        register,
        logout,
        transactions,
        budgets,
        goals,
        notifications,
        splits,
        loading,
        unreadNotificationCount,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        updateBudget,
        depositToGoal,
        addSavingsGoal,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        addSplitExpense,
        toggleSplitPaid,
        isAddTxModalOpen,
        setIsAddTxModalOpen,
        isAddGoalModalOpen,
        setIsAddGoalModalOpen,
        isSplitModalOpen,
        setIsSplitModalOpen,
        triggerConfetti,
        refreshData: loadAllData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
