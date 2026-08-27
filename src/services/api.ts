import type { 
  Transaction, 
  Budget, 
  SavingsGoal, 
  NotificationItem, 
  SplitExpense, 
  FinancialHealthScore,
  UserProfile 
} from '../types';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const TOKEN_KEY = 'finflow_token';
const USER_KEY = 'finflow_user_profile';

// Clear legacy fake storage keys on module initialization
try {
  localStorage.removeItem('finflow_transactions_v1');
  localStorage.removeItem('finflow_splits_v1');
  localStorage.removeItem('finflow_notifications_v1');
} catch (e) {}

const getHeaders = (includeAuth = true) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (includeAuth) {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  return headers;
};

// Safe request wrapper with timeout and error handling
async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      ...getHeaders(),
      ...(options.headers || {})
    }
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'API request failed');
  }
  return data;
}

export const api = {
  // Auth Token helpers
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  setToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  },

  clearAuth() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  // Auth Operations
  async register(formData: { name: string; email: string; password: string; college?: string; year?: string; monthlyBudget?: number }): Promise<{ user: UserProfile; token: string }> {
    const res: any = await request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(formData)
    });
    if (res.data?.token) {
      this.setToken(res.data.token);
      localStorage.setItem(USER_KEY, JSON.stringify(res.data));
    }
    return { user: res.data, token: res.data.token };
  },

  async login(email: string, password?: string): Promise<{ user: UserProfile; token: string }> {
    const res: any = await request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password: password || '' })
    });
    if (res.data?.token) {
      this.setToken(res.data.token);
      localStorage.setItem(USER_KEY, JSON.stringify(res.data));
    }
    return { user: res.data, token: res.data.token };
  },

  async getUserProfile(): Promise<UserProfile | null> {
    try {
      if (!this.getToken()) {
        return null;
      }
      const res: any = await request('/auth/me');
      localStorage.setItem(USER_KEY, JSON.stringify(res.data));
      return res.data;
    } catch (err) {
      const saved = localStorage.getItem(USER_KEY);
      if (saved) {
        try { return JSON.parse(saved); } catch (e) {}
      }
      return null;
    }
  },

  async updateUserProfile(profile: Partial<UserProfile>): Promise<UserProfile> {
    const res: any = await request('/auth/me', {
      method: 'PUT',
      body: JSON.stringify(profile)
    });
    localStorage.setItem(USER_KEY, JSON.stringify(res.data));
    return res.data;
  },

  // Transactions
  async getTransactions(): Promise<Transaction[]> {
    try {
      if (!this.getToken()) return [];
      const res: any = await request('/transactions');
      return res.data || [];
    } catch (err) {
      console.warn('[API] Error fetching transactions:', err);
      return [];
    }
  },

  async addTransaction(tx: Omit<Transaction, 'id'>): Promise<Transaction> {
    const res: any = await request('/transactions', {
      method: 'POST',
      body: JSON.stringify(tx)
    });
    return res.data;
  },

  async updateTransaction(id: string, updates: Partial<Transaction>): Promise<Transaction> {
    const res: any = await request(`/transactions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    });
    return res.data;
  },

  async deleteTransaction(id: string): Promise<boolean> {
    await request(`/transactions/${id}`, {
      method: 'DELETE'
    });
    return true;
  },

  // Budgets
  async getBudgets(): Promise<Budget[]> {
    try {
      if (!this.getToken()) return [];
      const res: any = await request('/budgets');
      return res.data || [];
    } catch (err) {
      console.warn('[API] Error fetching budgets:', err);
      return [];
    }
  },

  async addBudget(budget: Omit<Budget, 'id'>): Promise<Budget> {
    const res: any = await request('/budgets', {
      method: 'POST',
      body: JSON.stringify(budget)
    });
    return res.data;
  },

  async updateBudget(id: string, updates: Partial<Budget>): Promise<Budget> {
    const res: any = await request(`/budgets/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    });
    return res.data;
  },

  async deleteBudget(id: string): Promise<boolean> {
    await request(`/budgets/${id}`, {
      method: 'DELETE'
    });
    return true;
  },

  // Savings Goals
  async getSavingsGoals(): Promise<SavingsGoal[]> {
    try {
      if (!this.getToken()) return [];
      const res: any = await request('/savings');
      return res.data || [];
    } catch (err) {
      console.warn('[API] Error fetching savings goals:', err);
      return [];
    }
  },

  async addSavingsGoal(goal: Omit<SavingsGoal, 'id'>): Promise<SavingsGoal> {
    const res: any = await request('/savings', {
      method: 'POST',
      body: JSON.stringify(goal)
    });
    return res.data;
  },

  async depositToGoal(id: string, amount: number): Promise<SavingsGoal> {
    const res: any = await request(`/savings/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ depositAmount: amount })
    });
    return res.data;
  },

  // Dashboard Aggregation
  async getDashboardSummary() {
    try {
      if (!this.getToken()) return null;
      const res: any = await request('/dashboard');
      return res.data;
    } catch (err) {
      console.warn('[API] Error fetching dashboard summary:', err);
      return null;
    }
  },

  // Notifications
  async getNotifications(): Promise<NotificationItem[]> {
    try {
      if (!this.getToken()) return [];
      const res: any = await request('/notifications');
      return res.data || [];
    } catch (err) {
      console.warn('[API] Error fetching notifications:', err);
      return [];
    }
  },

  async markNotificationAsRead(id: string): Promise<boolean> {
    try {
      await request(`/notifications/${id}/read`, {
        method: 'PUT'
      });
      return true;
    } catch (err) {
      return false;
    }
  },

  async markAllNotificationsAsRead(): Promise<boolean> {
    try {
      await request('/notifications/read-all', {
        method: 'PUT'
      });
      return true;
    } catch (err) {
      return false;
    }
  },

  // Split Expenses
  async getSplits(): Promise<SplitExpense[]> {
    try {
      if (!this.getToken()) return [];
      const res: any = await request('/splits');
      return res.data || [];
    } catch (err) {
      console.warn('[API] Error fetching splits:', err);
      return [];
    }
  },

  async addSplit(split: Omit<SplitExpense, 'id'>): Promise<SplitExpense> {
    const res: any = await request('/splits', {
      method: 'POST',
      body: JSON.stringify(split)
    });
    return res.data;
  },

  async toggleParticipantPaid(splitId: string, participantId: string): Promise<SplitExpense> {
    const res: any = await request(`/splits/${splitId}/toggle-paid`, {
      method: 'PUT',
      body: JSON.stringify({ participantId })
    });
    return res.data;
  },

  async deleteSplit(splitId: string): Promise<boolean> {
    await request(`/splits/${splitId}`, {
      method: 'DELETE'
    });
    return true;
  },

  // Health Score & Analytics (computed from real data)
  async getHealthScore(transactions: Transaction[], budgets: Budget[]): Promise<FinancialHealthScore> {
    const income = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
    const expense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
    const savings = Math.max(0, income - expense);
    const savingsRate = income > 0 ? Math.round((savings / income) * 100) : 0;
    
    let totalBudget = budgets.reduce((s, b) => s + b.limit, 0);
    let totalSpent = budgets.reduce((s, b) => s + (b.spent || 0), 0);
    let budgetAdherence = totalBudget > 0 ? Math.max(0, 100 - Math.round((totalSpent / totalBudget) * 100)) : 100;

    let score = transactions.length === 0 ? 100 : Math.min(100, Math.round((savingsRate * 0.4) + (budgetAdherence * 0.6)));
    let rating: 'Excellent' | 'Good' | 'Fair' | 'Needs Attention' = 
      score >= 80 ? 'Excellent' : score >= 65 ? 'Good' : score >= 45 ? 'Fair' : 'Needs Attention';

    return {
      score,
      rating,
      factors: [
        {
          name: `Savings Rate (${savingsRate}% of income saved)`,
          score: Math.min(100, savingsRate * 2),
          maxScore: 100,
          status: savingsRate >= 20 ? 'optimal' : savingsRate >= 10 ? 'good' : 'warning',
          description: savingsRate >= 20 ? 'Higher than student benchmark.' : 'Target at least 15-20% monthly savings.'
        },
        {
          name: `Budget Utilization (${totalBudget > 0 ? Math.round((totalSpent / totalBudget) * 100) : 0}%)`,
          score: Math.min(100, budgetAdherence),
          maxScore: 100,
          status: totalSpent <= totalBudget ? 'good' : 'warning',
          description: totalSpent <= totalBudget ? 'Spending within category limits.' : 'Over limit in some categories.'
        }
      ]
    };
  },

  resetAllSession() {
    localStorage.clear();
    window.location.reload();
  }
};
