import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, CheckCircle2, Clock, Smartphone, QrCode, ArrowRight, Share2, Sparkles } from 'lucide-react';

export const ExpenseSplittingSection: React.FC = () => {
  const [participants, setParticipants] = useState([
    { id: '1', name: 'Rahul Verma', amount: 300, isPaid: true, upiId: 'rahul.v@okhdfc' },
    { id: '2', name: 'Aman Deep', amount: 300, isPaid: false, upiId: 'amandeep@paytm' },
    { id: '3', name: 'Vivek Kumar', amount: 300, isPaid: true, upiId: 'vivek.k@oksbi' },
    { id: '4', name: 'You (Aryan)', amount: 300, isPaid: true, upiId: 'aryan.s@okicici' }
  ]);

  const toggleStatus = (id: string) => {
    setParticipants(prev => prev.map(p => p.id === id ? { ...p, isPaid: !p.isPaid } : p));
  };

  const total = 1200;
  const collected = participants.filter(p => p.isPaid).reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-5xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-[0.25em] text-purple-400 font-mono mb-2"
          >
            PEER SETTLEMENT
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-5xl font-black text-white tracking-tight"
          >
            Zero awkward payment reminders.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-base sm:text-lg text-slate-400"
          >
            Split canteen bills, hostel Wi-Fi, and weekend outings in 2 taps with instant UPI link generation.
          </motion.p>
        </div>

        {/* Interactive Expense Split Demo Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-3xl p-8 bg-[#0B0F19]/90 backdrop-blur-2xl border border-purple-500/25 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-300">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Batch Dinner Treat</h3>
                <p className="text-xs text-slate-400 font-mono">Paid by Aryan (You) • 4 Friends</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <span className="text-xs text-slate-400 font-mono block">Total Bill</span>
                <span className="text-2xl font-black text-white font-mono">₹{total.toLocaleString()}</span>
              </div>
              <div className="text-right pl-4 border-l border-slate-800">
                <span className="text-xs text-purple-400 font-mono block">Your Share</span>
                <span className="text-2xl font-black text-purple-300 font-mono">₹300</span>
              </div>
            </div>
          </div>

          {/* Participants Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
            {participants.map((p) => (
              <div
                key={p.id}
                onClick={() => p.name !== 'You (Aryan)' && toggleStatus(p.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  p.isPaid
                    ? 'bg-[#121826]/70 border-emerald-500/30 hover:border-emerald-500/50'
                    : 'bg-rose-950/20 border-rose-500/40 hover:border-rose-500/60 shadow-lg shadow-rose-950/30'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${
                    p.isPaid ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                  }`}>
                    {p.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{p.name}</h4>
                    <span className="text-[11px] text-slate-400 font-mono">{p.upiId}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-sm font-bold text-white font-mono block">₹{p.amount}</span>
                  {p.isPaid ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 font-mono">
                      <CheckCircle2 className="w-3 h-3" /> SETTLED
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-400 font-mono animate-pulse">
                      <Clock className="w-3 h-3" /> PENDING
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions Footer */}
          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2 text-slate-400 font-mono">
              <span>Collection Progress:</span>
              <span className="font-bold text-white">₹{collected} / ₹{total}</span>
              <span className="text-purple-400">({Math.round((collected/total)*100)}%)</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => alert('UPI Payment Reminder Sent via WhatsApp/SMS!')}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-purple-600/20 hover:bg-purple-600 text-purple-300 hover:text-white border border-purple-500/40 font-semibold font-mono flex items-center justify-center gap-1.5 transition-all"
              >
                <Share2 className="w-3.5 h-3.5" />
                Send UPI Reminder
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
