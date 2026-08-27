import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, ArrowDownLeft, ArrowUpRight, Smartphone, CreditCard, Banknote, Coffee, BookOpen, Bus, ShoppingBag, Film, Layers } from 'lucide-react';

const sampleTransactions = [
  { id: '1', title: 'Campus Canteen Lunch & Chai', amount: 250, category: 'Food', date: 'Today, 1:30 PM', method: 'UPI', desc: 'UPI Ref: 489210492', icon: Coffee, iconBg: 'bg-purple-500/20 text-purple-400' },
  { id: '2', title: 'Metro Smart Card Top-up', amount: 80, category: 'Transport', date: 'Today, 8:45 AM', method: 'UPI', desc: 'Hauz Khas Metro Station', icon: Bus, iconBg: 'bg-cyan-500/20 text-cyan-400' },
  { id: '3', title: 'Data Structures & Algo Reference Notes', amount: 600, category: 'Education', date: 'Yesterday', method: 'Debit Card', desc: 'Central Campus Book Store', icon: BookOpen, iconBg: 'bg-emerald-500/20 text-emerald-400' },
  { id: '4', title: 'PVR Movie Ticket (Interstellar Re-release)', amount: 300, category: 'Entertainment', date: '25 Aug 2026', method: 'UPI', desc: 'Student Discount Applied', icon: Film, iconBg: 'bg-rose-500/20 text-rose-400' },
  { id: '5', title: 'Ergonomic Desk Mat & Cable Hub', amount: 1200, category: 'Shopping', date: '23 Aug 2026', method: 'Credit Card', desc: 'Hostel Study Setup', icon: ShoppingBag, iconBg: 'bg-amber-500/20 text-amber-400' },
];

export const TransactionsPreviewSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedMethod, setSelectedMethod] = useState('All');

  const categories = ['All', 'Food', 'Transport', 'Education', 'Entertainment', 'Shopping'];
  const methods = ['All', 'UPI', 'Debit Card', 'Credit Card'];

  const filtered = sampleTransactions.filter(tx => {
    const matchesSearch = tx.title.toLowerCase().includes(searchTerm.toLowerCase()) || tx.desc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || tx.category === selectedCategory;
    const matchesMethod = selectedMethod === 'All' || tx.method === selectedMethod;
    return matchesSearch && matchesCategory && matchesMethod;
  });

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-400 font-mono mb-2"
          >
            TRANSACTION ENGINE
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-5xl font-black text-white tracking-tight"
          >
            Every transaction. Organized.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-base sm:text-lg text-slate-400"
          >
            Search, filter, and inspect metadata with millisecond-grade responsiveness.
          </motion.p>
        </div>

        {/* Interactive Transaction Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-3xl p-6 sm:p-8 bg-[#0B0F19]/90 backdrop-blur-2xl border border-purple-500/25 shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
        >
          {/* Controls Bar */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search transactions, ref numbers, tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#121826]/80 border border-purple-500/20 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                      : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Transaction Rows List */}
          <div className="space-y-3">
            {filtered.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-sm">
                No matching transactions found. Try adjusting your search query or filters.
              </div>
            ) : (
              filtered.map((tx, idx) => {
                const IconComponent = tx.icon;
                return (
                  <motion.div
                    key={tx.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className="p-4 rounded-2xl bg-[#121826]/50 hover:bg-[#141C2E] border border-slate-800/80 hover:border-purple-500/30 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 group"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className={`w-11 h-11 rounded-xl ${tx.iconBg} flex items-center justify-center group-hover:scale-105 transition-transform flex-shrink-0`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
                            {tx.title}
                          </h4>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700 font-mono">
                            {tx.category}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-2">
                          <span>{tx.date}</span>
                          <span>•</span>
                          <span className="font-mono text-[11px] text-slate-500">{tx.desc}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800/60">
                      <span className="text-[11px] font-mono font-medium px-2.5 py-1 rounded-md bg-purple-950/40 text-purple-300 border border-purple-800/30 flex items-center gap-1">
                        {tx.method === 'UPI' && <Smartphone className="w-3 h-3 text-cyan-400" />}
                        {tx.method.includes('Card') && <CreditCard className="w-3 h-3 text-purple-400" />}
                        {tx.method}
                      </span>
                      <div className="text-right">
                        <span className="text-base font-extrabold text-rose-400 font-mono flex items-center gap-0.5">
                          -₹{tx.amount.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span>Showing {filtered.length} simulated student records</span>
            <span className="font-mono text-purple-400 font-semibold">REST API & PostgreSQL Ready</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
