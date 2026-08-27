import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, ArrowRight, GraduationCap, BookOpen, Home, Utensils, Bus, Laptop, Gamepad2, Plane, Users } from 'lucide-react';

const studentCategories = [
  { icon: GraduationCap, title: 'College Fees', desc: 'Semester dues & exam fees schedules', tag: 'Academic', color: 'from-purple-600/30 to-indigo-600/10' },
  { icon: BookOpen, title: 'Books & Stationery', desc: 'Notes, Xerox, textbooks & binders', tag: 'Materials', color: 'from-blue-600/30 to-cyan-600/10' },
  { icon: Home, title: 'Hostel & Mess', desc: 'Room deposits, maintenance & mess dues', tag: 'Living', color: 'from-emerald-600/30 to-teal-600/10' },
  { icon: Utensils, title: 'Food & Canteen', desc: 'Chai breaks, midnight Maggi & Swiggy', tag: 'Daily Life', color: 'from-amber-600/30 to-yellow-600/10' },
  { icon: Bus, title: 'Transport & Metro', desc: 'Metro smart cards, auto rides & buses', tag: 'Commute', color: 'from-cyan-600/30 to-blue-600/10' },
  { icon: Laptop, title: 'Courses & Software', desc: 'Dev bootcamps, Copilot & cloud credits', tag: 'Skills', color: 'from-violet-600/30 to-purple-600/10' },
  { icon: Gamepad2, title: 'Entertainment', desc: 'Movies, gaming passes & college fests', tag: 'Leisure', color: 'from-rose-600/30 to-pink-600/10' },
  { icon: Plane, title: 'Travel & Trips', desc: 'Hometown train bookings & weekend treks', tag: 'Getaways', color: 'from-indigo-600/30 to-blue-600/10' },
  { icon: Users, title: 'Split Expenses', desc: 'Hostel Wi-Fi, birthday treats & room bills', tag: 'Social', color: 'from-teal-600/30 to-emerald-600/10' }
];

export const StudentLifeSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="student-life" className="relative py-24 px-4 sm:px-6 lg:px-8 z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-400 font-mono mb-2"
          >
            PURPOSE-BUILT
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-5xl font-black text-white tracking-tight"
          >
            Designed around real student life.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-base sm:text-lg text-slate-400"
          >
            Every category, metric, and workflow is tuned for campus realities — from mess bills to hackathons.
          </motion.p>
        </div>

        {/* Horizontal Scrollable Carousel Container */}
        <div className="relative">
          <div className="flex gap-5 overflow-x-auto pb-8 pt-2 px-2 no-scrollbar snap-x snap-mandatory">
            {studentCategories.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className="flex-shrink-0 w-72 snap-start rounded-3xl p-6 bg-[#0B0F19]/90 backdrop-blur-2xl border border-purple-500/20 hover:border-purple-500/50 shadow-xl transition-all flex flex-col justify-between group overflow-hidden relative"
                >
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${item.color} rounded-full blur-2xl opacity-40 group-hover:opacity-80 transition-opacity pointer-events-none`} />

                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-2xl bg-[#121826] border border-slate-800 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-mono uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                        {item.tag}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500 font-mono">
                    <span>Preset Tags & Rules</span>
                    <ArrowRight className="w-3.5 h-3.5 text-purple-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
