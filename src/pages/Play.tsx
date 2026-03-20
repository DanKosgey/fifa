import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Users, Dices, ChevronRight } from 'lucide-react';

// ✅ AGENT COMPLETED: Play Zone landing page for fantasy and bracket challenges
const Play = () => {
  const games = [
    { id: 'bracket', icon: Trophy, title: 'Bracket Challenge', desc: 'Predict the path to the final. Compete worldwide or with friends.', color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { id: 'fantasy', icon: Users, title: 'Fantasy Football', desc: 'Build your dream squad. Score points based on real match actions.', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { id: 'predictor', icon: Dices, title: 'Match Predictor', desc: 'Guess scores and outcomes daily to climb the global leaderboards.', color: 'text-blue-500', bg: 'bg-blue-500/10' }
  ];

  return (
    <div className="min-h-screen bg-[#0A0B1A] text-white pt-24 pb-24 relative overflow-hidden">
      {/* Dynamic Backgrounds */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-[20%] right-[10%] w-[40rem] h-[40rem] bg-emerald-500 blur-[150px] mix-blend-screen animate-pulse-slow" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50rem] h-[50rem] bg-blue-600 blur-[200px] mix-blend-screen" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 text-center pt-20">
        <div className="inline-block text-[10px] font-black uppercase tracking-[0.4em] text-emerald-400 mb-6 bg-emerald-500/10 px-4 py-2 rounded-lg border border-emerald-500/20">
          Official Games
        </div>
        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-8 shining-text leading-tight">
          The <br />Arena
        </h1>
        <p className="text-slate-200 font-bold max-w-2xl mx-auto text-lg md:text-xl mb-20 leading-relaxed drop-shadow-sm">
          The ultimate fan experience. Predict outcomes, build your dream squad, and compete globally for exclusive FIFA World Cup™ rewards.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {games.map((g, i) => (
            <motion.div 
              key={g.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -10 }}
              className="glass-card p-12 group cursor-pointer border-white/20 relative overflow-hidden transition-all duration-500 bg-white/5 active:scale-95 shadow-2xl"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-bl-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className={`w-16 h-16 ${g.bg} rounded-2xl flex items-center justify-center mb-8 border border-white/5 shadow-2xl group-hover:scale-110 transition-transform`}>
                <g.icon className={`w-8 h-8 ${g.color}`} />
              </div>
              
              <h3 className="text-2xl font-black uppercase tracking-tight mb-4 group-hover:text-emerald-400 transition-colors">{g.title}</h3>
              <p className="text-slate-200 font-bold leading-relaxed mb-10 text-sm drop-shadow-sm">
                {g.desc}
              </p>

              <button className="w-full bg-white/10 hover:bg-white/20 text-white font-black uppercase tracking-widest text-[10px] px-6 py-4 rounded-xl flex items-center justify-center gap-3 transition-colors border border-white/5 group-hover:border-white/20">
                <span>Play Now</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Global Leaderboards Tease */}
        <div className="mt-24 p-12 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-[3rem] border border-white/10 flex flex-col items-center justify-center text-center">
          <Trophy className="w-16 h-16 text-emerald-400 mb-6" />
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4">Global Glory</h2>
          <p className="text-slate-200 max-w-xl mx-auto mb-8 font-bold leading-relaxed drop-shadow-sm">Dominate the rankings. Win VIP hospitality packages, match tickets, and official merchandise by proving your football intelligence.</p>
          <button className="shining-button bg-emerald-500 text-white font-black uppercase tracking-[0.2em] px-10 py-5 rounded-2xl text-[10px] hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-500/20">
            Sign In to Join
          </button>
        </div>
      </div>
    </div>
  );
};

export default Play;
