import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { 
  Search, 
  Filter, 
  Plus, 
  Trash2, 
  Edit3, 
  ArrowDownLeft, 
  ArrowUpRight, 
  Download, 
  Smartphone, 
  CreditCard, 
  Banknote,
  SlidersHorizontal,
  Calendar,
  X,
  Check
} from 'lucide-react';
import { TransactionCategory, PaymentMethod, TransactionType } from '../../types';

export const TransactionsView: React.FC = () => {
  const { 
    transactions, 
    deleteTransaction, 
    updateTransaction,
    setIsAddTxModalOpen 
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedMethod, setSelectedMethod] = useState<string>('all');
  const [editingTxId, setEditingTxId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editAmount, setEditAmount] = useState('');

  const categories: TransactionCategory[] = [
    'Food',
    'Transport',
    'Hostel/Rent',
    'Education',
    'Shopping',
    'Entertainment',
    'Health',
    'Bills',
    'Travel',
    'Subscriptions',
    'College Fees',
    'Freelance',
    'Pocket Money',
    'Other'
  ];

  const paymentMethods: PaymentMethod[] = [
    'UPI',
    'Cash',
    'Debit Card',
    'Credit Card',
    'Bank Transfer'
  ];

  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch = tx.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (tx.description && tx.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          (tx.recipientOrSource && tx.recipientOrSource.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = selectedType === 'all' || tx.type === selectedType;
    const matchesCategory = selectedCategory === 'all' || tx.category === selectedCategory;
    const matchesMethod = selectedMethod === 'all' || tx.paymentMethod === selectedMethod;

    return matchesSearch && matchesType && matchesCategory && matchesMethod;
  });

  const totalFilteredExpense = filteredTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalFilteredIncome = filteredTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const handleStartEdit = (tx: any) => {
    setEditingTxId(tx.id);
    setEditTitle(tx.title);
    setEditAmount(tx.amount.toString());
  };

  const handleSaveEdit = async (id: string) => {
    if (!editTitle || !editAmount) return;
    await updateTransaction(id, {
      title: editTitle,
      amount: parseFloat(editAmount)
    });
    setEditingTxId(null);
  };

  const handleExportCSV = () => {
    const headers = 'ID,Title,Amount,Type,Category,PaymentMethod,Date,Description\n';
    const rows = filteredTransactions.map(t => 
      `"${t.id}","${t.title}",${t.amount},"${t.type}","${t.category}","${t.paymentMethod}","${t.date}","${t.description || ''}"`
    ).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `finflow_transactions_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6 p-4 sm:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Transactions Management</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Complete transaction ledger with category rules and instant UPI settlement tags.
          </p>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => setIsAddTxModalOpen(true)}
            className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold shadow-md shadow-purple-600/30 flex items-center justify-center gap-1.5 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Transaction</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar Card */}
      <div className="p-5 rounded-3xl bg-[#0B0F19]/90 backdrop-blur-xl border border-purple-500/20 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by title, description, canteen name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#121826]/80 border border-slate-800 text-sm text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          {/* Type Filter */}
          <div className="flex items-center gap-1 bg-[#121826] p-1 rounded-xl border border-slate-800">
            {['all', 'expense', 'income'].map((t) => (
              <button
                key={t}
                onClick={() => setSelectedType(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase font-mono transition-all ${
                  selectedType === t
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Categories & Payment Methods Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/80">
          <span className="text-xs font-mono text-slate-500">Category:</span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg bg-[#121826] border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-purple-500"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <span className="text-xs font-mono text-slate-500 ml-2">Payment:</span>
          <select
            value={selectedMethod}
            onChange={(e) => setSelectedMethod(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg bg-[#121826] border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-purple-500"
          >
            <option value="all">All Methods</option>
            {paymentMethods.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>

          {(selectedCategory !== 'all' || selectedMethod !== 'all' || selectedType !== 'all' || searchTerm) && (
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedMethod('all');
                setSelectedType('all');
                setSearchTerm('');
              }}
              className="text-xs text-rose-400 hover:underline font-mono ml-auto"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Summary Stat Pill Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-[#0B0F19]/80 border border-slate-800">
          <span className="text-[11px] font-mono text-slate-400 uppercase">Filtered Records</span>
          <div className="text-xl font-bold text-white font-mono mt-1">{filteredTransactions.length} Items</div>
        </div>
        <div className="p-4 rounded-2xl bg-[#0B0F19]/80 border border-slate-800">
          <span className="text-[11px] font-mono text-slate-400 uppercase">Total Expenses</span>
          <div className="text-xl font-bold text-rose-400 font-mono mt-1">₹{totalFilteredExpense.toLocaleString()}</div>
        </div>
        <div className="col-span-2 sm:col-span-1 p-4 rounded-2xl bg-[#0B0F19]/80 border border-slate-800">
          <span className="text-[11px] font-mono text-slate-400 uppercase">Total Inflow</span>
          <div className="text-xl font-bold text-emerald-400 font-mono mt-1">₹{totalFilteredIncome.toLocaleString()}</div>
        </div>
      </div>

      {/* Transactions Table / List */}
      <div className="rounded-3xl bg-[#0B0F19]/90 backdrop-blur-xl border border-purple-500/20 shadow-xl overflow-hidden">
        {filteredTransactions.length === 0 ? (
          <div className="p-12 text-center text-slate-500 space-y-2">
            <p className="text-sm">No transactions match your search or filter parameters.</p>
            <button
              onClick={() => setIsAddTxModalOpen(true)}
              className="text-xs text-purple-400 font-bold hover:underline"
            >
              + Add a new transaction
            </button>
          </div>
        ) : (
          <div className="divide-y divide-slate-800/80">
            {filteredTransactions.map((tx) => (
              <div
                key={tx.id}
                className="p-4 sm:p-5 hover:bg-[#121826]/70 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                {/* Left: Info */}
                <div className="flex items-start sm:items-center gap-3.5 flex-1">
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-sm flex-shrink-0 ${
                    tx.type === 'income'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                  }`}>
                    {tx.type === 'income' ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownLeft className="w-5 h-5" />}
                  </div>

                  <div className="flex-1">
                    {editingTxId === tx.id ? (
                      <div className="flex items-center gap-2 mb-1">
                        <input
                          type="text"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          className="px-2 py-1 bg-slate-900 border border-purple-500 rounded text-xs text-white"
                        />
                        <input
                          type="number"
                          value={editAmount}
                          onChange={(e) => setEditAmount(e.target.value)}
                          className="w-24 px-2 py-1 bg-slate-900 border border-purple-500 rounded text-xs text-white font-mono"
                        />
                        <button
                          onClick={() => handleSaveEdit(tx.id)}
                          className="p-1 bg-emerald-600 rounded text-white"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setEditingTxId(null)}
                          className="p-1 bg-slate-700 rounded text-white"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-sm font-bold text-white">{tx.title}</h4>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#121826] text-purple-300 border border-purple-500/30 font-mono">
                          {tx.category}
                        </span>
                        {tx.isRecurring && (
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-800/40">
                            AUTOPAY
                          </span>
                        )}
                      </div>
                    )}

                    <p className="text-xs text-slate-400 mt-1 flex items-center gap-2 flex-wrap">
                      <span>{tx.date}</span>
                      <span>•</span>
                      <span className="font-mono text-slate-500 flex items-center gap-1">
                        {tx.paymentMethod === 'UPI' && <Smartphone className="w-3 h-3 text-cyan-400" />}
                        {tx.paymentMethod.includes('Card') && <CreditCard className="w-3 h-3 text-purple-400" />}
                        {tx.paymentMethod}
                      </span>
                      {tx.recipientOrSource && (
                        <>
                          <span>•</span>
                          <span className="text-slate-400">{tx.recipientOrSource}</span>
                        </>
                      )}
                    </p>
                  </div>
                </div>

                {/* Right: Amount & Actions */}
                <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                  <div className="text-right">
                    <span className={`text-base font-extrabold font-mono ${
                      tx.type === 'income' ? 'text-emerald-400' : 'text-rose-400'
                    }`}>
                      {tx.type === 'income' ? '+' : '-'}₹{tx.amount.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleStartEdit(tx)}
                      className="p-2 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                      title="Edit transaction"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deleteTransaction(tx.id)}
                      className="p-2 rounded-lg bg-slate-900/80 hover:bg-rose-950/50 text-slate-400 hover:text-rose-400 transition-colors"
                      title="Delete transaction"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
