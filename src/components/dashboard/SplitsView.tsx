import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Users, Plus, QrCode, Smartphone, X } from 'lucide-react';

export const SplitsView: React.FC = () => {
  const { splits, toggleSplitPaid, setIsSplitModalOpen } = useApp();
  const [selectedUpiModal, setSelectedUpiModal] = useState<{ name: string; amount: number; upiId?: string } | null>(null);

  return (
    <div className="space-y-8 p-4 sm:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Expense Splitting & Peer Settlement</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Track group tabs with hostel roommates, canteen lunches, and travel without messy spreadsheets.
          </p>
        </div>

        <button
          onClick={() => setIsSplitModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold shadow-md shadow-purple-600/30 flex items-center gap-1.5 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Group Split</span>
        </button>
      </div>

      {/* Splits List */}
      {splits.length > 0 ? (
        <div className="space-y-6">
          {splits.map((split) => {
            const totalSettled = split.participants.filter(p => p.isPaid).reduce((s, p) => s + p.amount, 0);
            const percent = split.totalAmount > 0 ? Math.round((totalSettled / split.totalAmount) * 100) : 0;

            return (
              <div
                key={split.id}
                className="p-6 sm:p-7 rounded-3xl bg-[#0B0F19]/90 backdrop-blur-xl border border-purple-500/20 shadow-xl space-y-6"
              >
                {/* Split Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-2xl bg-purple-600/20 text-purple-300 flex items-center justify-center">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{split.title}</h3>
                      <p className="text-xs text-slate-400 font-mono">
                        Paid by {split.paidBy} • {split.date} • {split.participants.length} Friends
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className="text-xs text-slate-400 font-mono block">Total Expense</span>
                      <span className="text-xl font-black text-white font-mono">₹{split.totalAmount.toLocaleString()}</span>
                    </div>
                    <div className="text-right pl-4 border-l border-slate-800">
                      <span className="text-xs text-purple-300 font-mono block">Settlement</span>
                      <span className="text-sm font-bold text-emerald-400 font-mono">{percent}% Paid</span>
                    </div>
                  </div>
                </div>

                {/* Participants Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {split.participants.map((p) => (
                    <div
                      key={p.id}
                      className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                        p.isPaid
                          ? 'bg-[#121826]/70 border-emerald-500/30'
                          : 'bg-rose-950/20 border-rose-500/30 shadow-lg shadow-rose-950/20'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold ${
                            p.isPaid ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                          }`}>
                            {p.name.charAt(0)}
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-white">{p.name}</h4>
                            <span className="text-[10px] text-slate-500 font-mono">{p.upiId || 'No UPI'}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-800/60">
                        <span className="text-sm font-bold text-white font-mono">₹{p.amount}</span>

                        <div className="flex items-center gap-1.5">
                          {!p.isPaid && (
                            <button
                              onClick={() => setSelectedUpiModal({ name: p.name, amount: p.amount, upiId: p.upiId })}
                              className="p-1.5 rounded-lg bg-purple-600/20 text-purple-300 hover:bg-purple-600 hover:text-white transition-colors cursor-pointer"
                              title="Show UPI QR / Pay"
                            >
                              <QrCode className="w-3.5 h-3.5" />
                            </button>
                          )}
                          <button
                            onClick={() => toggleSplitPaid(split.id, p.id)}
                            className={`px-2 py-1 rounded-md text-[10px] font-bold font-mono transition-colors cursor-pointer ${
                              p.isPaid
                                ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/40'
                                : 'bg-rose-500/20 text-rose-400 hover:bg-rose-500/40'
                            }`}
                          >
                            {p.isPaid ? 'PAID' : 'MARK PAID'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 px-4 rounded-3xl bg-[#0B0F19]/90 border border-dashed border-purple-500/25">
          <div className="w-14 h-14 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center mx-auto mb-4">
            <Users className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-white mb-1">No Active Group Splits</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto mb-6">
            Split campus canteen bills, room Wi-Fi, projects, and weekend trips with your batchmates.
          </p>
          <button
            onClick={() => setIsSplitModalOpen(true)}
            className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all inline-flex items-center gap-2 cursor-pointer shadow-lg shadow-purple-600/30"
          >
            <Plus className="w-4 h-4" /> Create First Split Bill
          </button>
        </div>
      )}

      {/* UPI QR Payment Modal */}
      {selectedUpiModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-sm rounded-3xl p-6 bg-[#0B0F19] border border-purple-500/30 text-center space-y-4">
            <button
              onClick={() => setSelectedUpiModal(null)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-purple-600/20 text-purple-400 mx-auto flex items-center justify-center">
              <Smartphone className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-base font-bold text-white">UPI Settle: {selectedUpiModal.name}</h3>
              <p className="text-xs text-slate-400 font-mono">{selectedUpiModal.upiId || 'Direct UPI'}</p>
            </div>

            <div className="p-4 rounded-2xl bg-white w-48 h-48 mx-auto flex items-center justify-center shadow-inner">
              <div className="text-black text-center font-mono text-[10px] space-y-1">
                <QrCode className="w-28 h-28 text-black mx-auto" />
                <span>SCAN WITH ANY UPI APP</span>
              </div>
            </div>

            <div className="text-xl font-black text-white font-mono">
              ₹{selectedUpiModal.amount.toLocaleString()}
            </div>

            <button
              onClick={() => {
                alert('UPI payment simulated successfully!');
                setSelectedUpiModal(null);
              }}
              className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs font-mono cursor-pointer"
            >
              Confirm Settlement
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
