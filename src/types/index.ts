export type TransactionType = 'expense' | 'income' | 'transfer';

export type PaymentMethod = 'UPI' | 'Cash' | 'Debit Card' | 'Credit Card' | 'Bank Transfer';

export type TransactionCategory = 
  | 'Food'
  | 'Transport'
  | 'Hostel/Rent'
  | 'Education'
  | 'Shopping'
  | 'Entertainment'
  | 'Health'
  | 'Bills'
  | 'Travel'
  | 'Subscriptions'
  | 'College Fees'
  | 'Freelance'
  | 'Pocket Money'
  | 'Scholarship'
  | 'Other';

export interface Transaction {
  id: string;
  title: string;
  amount: number; // in INR ₹
  type: TransactionType;
  category: TransactionCategory;
  paymentMethod: PaymentMethod;
  date: string; // ISO format or YYYY-MM-DD
  description?: string;
  recipientOrSource?: string;
  isRecurring?: boolean;
}

export interface Budget {
  id: string;
  category: TransactionCategory;
  spent: number;
  limit: number;
  period: 'monthly' | 'weekly';
  warningThreshold: number; // e.g. 0.8 for 80%
  color: string;
}

export interface SavingsGoal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  category: string;
  icon: string;
  color: string;
}

export type NotificationType = 
  | 'budget_alert' 
  | 'spending_alert' 
  | 'savings_update' 
  | 'payment_reminder' 
  | 'prediction' 
  | 'weekly_summary';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  timestamp: string;
  isRead: boolean;
  priority: 'high' | 'medium' | 'low';
  tag?: string;
}

export interface SplitParticipant {
  id: string;
  name: string;
  avatar?: string;
  amount: number;
  isPaid: boolean;
  upiId?: string;
}

export interface SplitExpense {
  id: string;
  title: string;
  totalAmount: number;
  date: string;
  paidBy: string;
  category: TransactionCategory;
  participants: SplitParticipant[];
  status: 'settled' | 'pending' | 'partially_settled';
}

export interface FinancialHealthScore {
  score: number; // 0 - 100
  rating: 'Excellent' | 'Good' | 'Fair' | 'Needs Attention';
  factors: {
    name: string;
    score: number;
    maxScore: number;
    status: 'optimal' | 'good' | 'warning' | 'alert';
    description: string;
  }[];
}

export interface UserProfile {
  name: string;
  email: string;
  college: string;
  year: string;
  monthlyBudget: number;
  avatar: string;
  currency: string;
}
