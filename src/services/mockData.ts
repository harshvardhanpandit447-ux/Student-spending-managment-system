import { Transaction, Budget, SavingsGoal, NotificationItem, SplitExpense, FinancialHealthScore, UserProfile } from '../types';

export const initialUserProfile: UserProfile = {
  name: 'Aryan Sharma',
  email: 'aryan.sharma@iitd.ac.in',
  college: 'PVGCOET',
  year: '3rd Year (B.Tech)',
  monthlyBudget: 10000,
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
  currency: '₹'
};

export const initialTransactions: Transaction[] = [
  {
    id: 'tx-1',
    title: 'Hostel Canteen & Snacks',
    amount: 250,
    type: 'expense',
    category: 'Food',
    paymentMethod: 'UPI',
    date: '2026-08-27',
    description: 'Chai, samosa and evening snacks with study group',
    recipientOrSource: 'Gokul Canteen'
  },
  {
    id: 'tx-2',
    title: 'Metro Smart Card Recharge',
    amount: 500,
    type: 'expense',
    category: 'Transport',
    paymentMethod: 'UPI',
    date: '2026-08-26',
    description: 'Monthly metro pass top-up for Hauz Khas commute',
    recipientOrSource: 'DMRC QuickPay'
  },
  {
    id: 'tx-3',
    title: 'Freelance Web Design Gig',
    amount: 14500,
    type: 'income',
    category: 'Freelance',
    paymentMethod: 'Bank Transfer',
    date: '2026-08-25',
    description: 'Landing page design milestone for AI startup',
    recipientOrSource: 'DevMatrix Labs'
  },
  {
    id: 'tx-4',
    title: 'Fullstack Dev Course & AWS Lab',
    amount: 600,
    type: 'expense',
    category: 'Education',
    paymentMethod: 'Debit Card',
    date: '2026-08-24',
    description: 'Cloud computing lab credits & practice tests',
    recipientOrSource: 'Coursera & AWS Academy'
  },
  {
    id: 'tx-5',
    title: 'Movie Night & Popcorn (PVR)',
    amount: 450,
    type: 'expense',
    category: 'Entertainment',
    paymentMethod: 'UPI',
    date: '2026-08-23',
    description: 'Weekend sci-fi movie with batchmates',
    recipientOrSource: 'PVR Select CityWalk'
  },
  {
    id: 'tx-6',
    title: 'Coding Mechanical Keyboard (Sale)',
    amount: 1899,
    type: 'expense',
    category: 'Shopping',
    paymentMethod: 'Credit Card',
    date: '2026-08-22',
    description: 'Red switches keyboard for hostel desk setup',
    recipientOrSource: 'Amazon India'
  },
  {
    id: 'tx-7',
    title: 'Monthly Pocket Allowance',
    amount: 8000,
    type: 'income',
    category: 'Pocket Money',
    paymentMethod: 'Bank Transfer',
    date: '2026-08-01',
    description: 'Monthly living allowance from parents',
    recipientOrSource: 'Father (R.K. Sharma)'
  },
  {
    id: 'tx-8',
    title: 'Semester Textbooks & Xerox',
    amount: 650,
    type: 'expense',
    category: 'Education',
    paymentMethod: 'Cash',
    date: '2026-08-19',
    description: 'Algorithms & Database Systems reference notes',
    recipientOrSource: 'Campus Book Depot'
  },
  {
    id: 'tx-9',
    title: 'Spotify Student & GitHub Copilot',
    amount: 119,
    type: 'expense',
    category: 'Subscriptions',
    paymentMethod: 'UPI',
    date: '2026-08-15',
    description: 'Student discount plan monthly subscription',
    recipientOrSource: 'Spotify India',
    isRecurring: true
  },
  {
    id: 'tx-10',
    title: 'Dinner & Swiggy Late Night',
    amount: 720,
    type: 'expense',
    category: 'Food',
    paymentMethod: 'UPI',
    date: '2026-08-14',
    description: 'Butter chicken and naan during hackathon prep',
    recipientOrSource: 'Swiggy'
  },
  {
    id: 'tx-11',
    title: 'Mess Bill Adjustment',
    amount: 3200,
    type: 'expense',
    category: 'Hostel/Rent',
    paymentMethod: 'UPI',
    date: '2026-08-05',
    description: 'Hostel monthly mess dues payment',
    recipientOrSource: 'Nilgiri Hostel Office'
  }
];

export const initialBudgets: Budget[] = [
  {
    id: 'b-1',
    category: 'Food',
    spent: 2300,
    limit: 2500,
    period: 'monthly',
    warningThreshold: 0.85,
    color: '#8B5CF6' // Electric Purple
  },
  {
    id: 'b-2',
    category: 'Entertainment',
    spent: 1050,
    limit: 1000,
    period: 'monthly',
    warningThreshold: 0.8,
    color: '#F43F5E' // Rose (exceeded)
  },
  {
    id: 'b-3',
    category: 'Transport',
    spent: 980,
    limit: 1500,
    period: 'monthly',
    warningThreshold: 0.8,
    color: '#06B6D4' // Cyan
  },
  {
    id: 'b-4',
    category: 'Shopping',
    spent: 1899,
    limit: 2500,
    period: 'monthly',
    warningThreshold: 0.8,
    color: '#3B82F6' // Blue
  },
  {
    id: 'b-5',
    category: 'Education',
    spent: 1250,
    limit: 2000,
    period: 'monthly',
    warningThreshold: 0.8,
    color: '#10B981' // Emerald
  }
];

export const initialSavingsGoals: SavingsGoal[] = [
  {
    id: 'g-1',
    title: 'M3 MacBook Air / Pro (New Laptop)',
    targetAmount: 70000,
    currentAmount: 43000,
    deadline: 'March 2027',
    category: 'Tech & Hardware',
    icon: 'Laptop',
    color: '#8B5CF6'
  },
  {
    id: 'g-2',
    title: 'Semester End Goa Roadtrip',
    targetAmount: 15000,
    currentAmount: 11200,
    deadline: 'December 2026',
    category: 'Travel & Fun',
    icon: 'Plane',
    color: '#06B6D4'
  },
  {
    id: 'g-3',
    title: 'Web3 & AI Advanced Bootcamp',
    targetAmount: 12000,
    currentAmount: 8500,
    deadline: 'November 2026',
    category: 'Career Growth',
    icon: 'BookOpen',
    color: '#3B82F6'
  },
  {
    id: 'g-4',
    title: 'Hostel Emergency Cushion',
    targetAmount: 10000,
    currentAmount: 6400,
    deadline: 'Ongoing',
    category: 'Safety Fund',
    icon: 'ShieldCheck',
    color: '#10B981'
  }
];

export const initialNotifications: NotificationItem[] = [
  {
    id: 'n-1',
    title: 'Budget Alert: Over limit on Entertainment',
    message: "You've spent ₹1,050 against your ₹1,000 monthly cap. Watch out for weekend plans!",
    type: 'budget_alert',
    timestamp: '10 mins ago',
    isRead: false,
    priority: 'high',
    tag: 'Entertainment'
  },
  {
    id: 'n-2',
    title: 'Spending Alert: Food expenses rising',
    message: "You've spent 28% more on food & Swiggy than this time last month (₹2,300 vs ₹1,800).",
    type: 'spending_alert',
    timestamp: '2 hours ago',
    isRead: false,
    priority: 'medium',
    tag: 'Food Spike'
  },
  {
    id: 'n-3',
    title: 'Savings Update: Goal milestone reached!',
    message: 'You have saved ₹2,300 extra this month. Your New Laptop goal is now 61% funded!',
    type: 'savings_update',
    timestamp: '1 day ago',
    isRead: false,
    priority: 'medium',
    tag: 'Milestone'
  },
  {
    id: 'n-4',
    title: 'Payment Reminder: Recurring Subscription',
    message: 'Your Spotify Student subscription (₹119) is scheduled for auto-debit tomorrow via UPI.',
    type: 'payment_reminder',
    timestamp: '1 day ago',
    isRead: true,
    priority: 'low',
    tag: 'UPI Autopay'
  },
  {
    id: 'n-5',
    title: 'AI Spending Prediction: Deficit Risk',
    message: 'At your current burn rate of ₹274/day, you will exceed your overall monthly budget by ₹500 before month-end.',
    type: 'prediction',
    timestamp: '2 days ago',
    isRead: true,
    priority: 'high',
    tag: 'AI Forecast'
  },
  {
    id: 'n-6',
    title: 'Weekly Summary Ready',
    message: 'Total spent this week: ₹3,120 across 8 transactions. Top category: Food (44%).',
    type: 'weekly_summary',
    timestamp: '3 days ago',
    isRead: true,
    priority: 'low',
    tag: 'Insights'
  }
];

export const initialSplits: SplitExpense[] = [
  {
    id: 'sp-1',
    title: 'Farewell Treat & Pizza Dinner',
    totalAmount: 1200,
    date: '2026-08-25',
    paidBy: 'Aryan (You)',
    category: 'Food',
    status: 'partially_settled',
    participants: [
      { id: 'p-1', name: 'Rahul Verma', amount: 300, isPaid: true, upiId: 'rahul.v@okhdfcbank' },
      { id: 'p-2', name: 'Aman Deep', amount: 300, isPaid: false, upiId: 'amandeep@paytm' },
      { id: 'p-3', name: 'Vivek Kumar', amount: 300, isPaid: true, upiId: 'vivek.k@oksbi' },
      { id: 'p-4', name: 'Aryan (You)', amount: 300, isPaid: true, upiId: 'aryan.s@okicici' }
    ]
  },
  {
    id: 'sp-2',
    title: 'Semester Project Server & Cloud GPU',
    totalAmount: 2400,
    date: '2026-08-20',
    paidBy: 'Aryan (You)',
    category: 'Education',
    status: 'settled',
    participants: [
      { id: 'p-5', name: 'Pooja Reddy', amount: 800, isPaid: true, upiId: 'pooja.r@oksbi' },
      { id: 'p-6', name: 'Rohan Joshi', amount: 800, isPaid: true, upiId: 'rohan.j@paytm' },
      { id: 'p-7', name: 'Aryan (You)', amount: 800, isPaid: true, upiId: 'aryan.s@okicici' }
    ]
  },
  {
    id: 'sp-3',
    title: 'Hostel Room Wi-Fi Router & Setup',
    totalAmount: 1800,
    date: '2026-08-10',
    paidBy: 'Aman Deep',
    category: 'Bills',
    status: 'settled',
    participants: [
      { id: 'p-8', name: 'Aman Deep', amount: 900, isPaid: true, upiId: 'amandeep@paytm' },
      { id: 'p-9', name: 'Aryan (You)', amount: 900, isPaid: true, upiId: 'aryan.s@okicici' }
    ]
  }
];

export const financialHealthData: FinancialHealthScore = {
  score: 78,
  rating: 'Good',
  factors: [
    {
      name: 'Savings Rate (24% of income saved)',
      score: 85,
      maxScore: 100,
      status: 'optimal',
      description: 'You save higher than the 15% student benchmark.'
    },
    {
      name: 'Budget Adherence (85% utilized)',
      score: 72,
      maxScore: 100,
      status: 'good',
      description: 'Controlled in 4/5 categories, but entertainment is over limit.'
    },
    {
      name: 'Spending Consistency',
      score: 80,
      maxScore: 100,
      status: 'good',
      description: 'Daily spending averages ₹274 with low volatility.'
    },
    {
      name: 'Essential vs Non-Essential Ratio',
      score: 75,
      maxScore: 100,
      status: 'good',
      description: '68% spent on essentials (Hostel, Books, Mess, Commute).'
    }
  ]
};

export const analyticsChartData = {
  monthlyComparison: {
    thisMonth: 8230,
    lastMonth: 7450,
    growthRate: 10.4,
    insight: 'Your food spending increased by 18% this month due to late-night hackathon orders.'
  },
  categoryDistribution: [
    { name: 'Food & Mess', percentage: 32, amount: 2630, color: '#8B5CF6' },
    { name: 'Education & Tech', percentage: 21, amount: 1720, color: '#06B6D4' },
    { name: 'Hostel & Utilities', percentage: 18, amount: 1480, color: '#3B82F6' },
    { name: 'Transport', percentage: 12, amount: 980, color: '#10B981' },
    { name: 'Entertainment', percentage: 10, amount: 820, color: '#F43F5E' },
    { name: 'Shopping & Misc', percentage: 7, amount: 600, color: '#F59E0B' }
  ],
  weeklyTrends: [
    { day: 'Mon', spend: 280, income: 0, budgetLine: 330 },
    { day: 'Tue', spend: 420, income: 0, budgetLine: 330 },
    { day: 'Wed', spend: 190, income: 0, budgetLine: 330 },
    { day: 'Thu', spend: 650, income: 0, budgetLine: 330 },
    { day: 'Fri', spend: 890, income: 14500, budgetLine: 330 },
    { day: 'Sat', spend: 720, income: 0, budgetLine: 330 },
    { day: 'Sun', spend: 310, income: 0, budgetLine: 330 }
  ],
  monthlyTrends: [
    { month: 'Apr', spend: 6900, income: 8000, savings: 1100 },
    { month: 'May', spend: 7300, income: 9500, savings: 2200 },
    { month: 'Jun', spend: 8100, income: 12000, savings: 3900 },
    { month: 'Jul', spend: 7450, income: 8000, savings: 550 },
    { month: 'Aug (Current)', spend: 8230, income: 22500, savings: 14270 }
  ]
};
