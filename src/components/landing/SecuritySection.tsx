import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, Database, KeyRound, Server, EyeOff, CheckCircle } from 'lucide-react';

const securityFeatures = [
  {
    icon: Lock,
    title: 'Secure Authentication',
    desc: 'JWT session tokens with industry standard cryptographic hashing and multi-factor capabilities.'
  },
  {
    icon: EyeOff,
    title: 'Private Financial Data',
    desc: 'Zero ad tracking, zero selling of campus financial metrics. Your transaction logs remain strictly confidential.'
  },
  {
    icon: Server,
    title: 'Secure API Architecture',
    desc: 'Stateless REST endpoints engineered for strict schema validation and CSRF/XSS prevention.'
  },
  {
    icon: Database,
    title: 'Database-Backed Storage',
    desc: 'PostgreSQL-ready schema structure with ACID transaction compliance and encrypted backups.'
  },
  {
    icon: KeyRound,
    title: 'Session Management',
    desc: 'Granular device revocation, automated timeout protections, and biometric login hooks.'
  },
  {
    icon: ShieldCheck,
    title: 'Protected Accounts',
    desc: 'Role-based access boundaries with end-to-end data isolation per student account.'
  }
];

export const SecuritySection: React.FC = () => {
  return (
    <section id="security" className="relative py-24 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-400 font-mono mb-2"
          >
            TRUST & INFRASTRUCTURE
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-5xl font-black text-white tracking-tight"
          >
            Your financial data belongs to you.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-base sm:text-lg text-slate-400"
          >
            Engineered with bank-grade security paradigms without slowing down your day-to-day interactions.
          </motion.p>
        </div>

        {/* 6 Security Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {securityFeatures.map((sec, idx) => {
            const Icon = sec.icon;
            return (
              <motion.div
                key={sec.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="p-6 rounded-3xl bg-[#0B0F19]/80 backdrop-blur-xl border border-purple-500/15 hover:border-cyan-500/40 transition-all group"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#121826] border border-slate-800 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white mb-2 group-hover:text-cyan-200 transition-colors">
                  {sec.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {sec.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
