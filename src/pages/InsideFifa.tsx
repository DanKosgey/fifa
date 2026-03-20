import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Users, Target } from 'lucide-react';

// ✅ AGENT COMPLETED: Corporate Inside FIFA page addressing footer links
const InsideFifa = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-24 relative overflow-hidden">
      <div className="bg-[#0A0B1A] text-white pt-24 pb-20 relative overflow-hidden z-10 w-full text-center">
        <div className="max-w-4xl mx-auto px-4 md:px-8 relative z-20">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 mb-8 shadow-lg shadow-slate-900/5">
            <Globe className="w-8 h-8 text-blue-500" />
          </div>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 shining-text">
            Inside FIFA
          </h1>
          <p className="text-slate-300 font-bold text-lg mx-auto drop-shadow-sm">
            The global guardians of football. We are dedicated to pioneering the game's future and uniting the world through the power of sport.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <h2 className="text-4xl font-black uppercase tracking-tighter text-slate-900">Global Vision</h2>
            <p className="text-slate-700 leading-relaxed text-lg font-semibold">
              Making football truly global. We harness the unique power of the game to build a better future, fostering diversity, ensuring fair play, and investing in football development across all 211 Member Associations.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-6">
              <div className="p-6 glass-card rounded-2xl">
                <Users className="w-8 h-8 text-blue-500 mb-4" />
                <h4 className="font-black text-slate-900 uppercase tracking-tighter mb-2">Development</h4>
                <p className="text-[11px] font-black text-slate-800 uppercase tracking-widest leading-relaxed">FIFA Forward 3.0 Funding</p>
              </div>
              <div className="p-6 glass-card rounded-2xl">
                <Target className="w-8 h-8 text-emerald-500 mb-4" />
                <h4 className="font-black text-slate-900 uppercase tracking-tighter mb-2">Integrity</h4>
                <p className="text-[11px] font-black text-slate-800 uppercase tracking-widest leading-relaxed">Global Match Monitoring</p>
              </div>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="h-[500px] bg-slate-200 rounded-[3rem] overflow-hidden relative shadow-2xl"
          >
            <img src="https://picsum.photos/seed/fifahq/800/1000" className="w-full h-full object-cover opacity-90" alt="FIFA HQ" />
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent">
              <span className="text-white font-black uppercase tracking-widest text-sm">Home of FIFA</span>
              <p className="text-slate-300 text-xs mt-1">Zurich, Switzerland</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default InsideFifa;
