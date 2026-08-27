// In-memory collections store for local execution
export const memoryStore = {
  users: [],
  transactions: [],
  budgets: [],
  savingsGoals: [],
  splits: [],
  notifications: [],
  
  // Clean initialization - no fake/demo seed data
  init() {
    this.users = [];
    this.transactions = [];
    this.budgets = [];
    this.savingsGoals = [];
    this.splits = [];
    this.notifications = [];
  },

  clearAll() {
    this.init();
  }
};

memoryStore.init();
