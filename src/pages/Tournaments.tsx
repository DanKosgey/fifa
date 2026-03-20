import React from 'react';
import { Link } from 'react-router-dom'; // ✅ AGENT: Added missing Link import
import { Trophy, Calendar, MapPin, Users, ChevronRight, Globe, TrendingUp, Award, ExternalLink, Star, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';

const Tournaments = () => {
  const tournaments = [
    {
      id: 1,
      name: "FIFA World Cup 2026",
      host: "USA, Canada & Mexico",
      dates: "Jun 11 - Jul 19, 2026",
      teams: 48,
      status: "Upcoming",
      image: "https://www.gettickets365.com/assets/img/banners/fwc2026.png",
      description: "The biggest World Cup ever, featuring 48 nations across 16 host cities in North America.",
      featured: true
    },
    {
      id: 2,
      name: "Copa América 2024",
      host: "USA",
      dates: "Jun 20 - Jul 14, 2024",
      teams: 16,
      status: "Completed",
      image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=1200",
      description: "A historic edition of the oldest continental tournament, held across the United States.",
      featured: false
    },
    {
      id: 3,
      name: "UEFA Euro 2024",
      host: "Germany",
      dates: "Jun 14 - Jul 14, 2024",
      teams: 24,
      status: "Completed",
      image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=1200",
      description: "The European championship returned to Germany for a month of top-tier football.",
      featured: false
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-900 selection:bg-emerald-500/30">
      <Helmet>
        <title>Tournaments | FIFA World Cup 2026™ Stadiums & Cities</title>
        <meta name="description" content="Explore every FIFA World Cup 2026™ tournament, host city, and stadium. Plan your journey across Canada, Mexico, and the USA." />
      </Helmet>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@500;700&display=swap');
        .font-mono-data { font-family: 'JetBrains Mono', monospace; }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
        .animate-pulse-slow { animation: pulse-slow 8s infinite ease-in-out; }
      `}</style>

      {/* Background Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full animate-pulse-slow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full animate-pulse-slow" style={{ animationDelay: '-4s' }} />
      </div>

      {/* ── HERO SECTION ────────────────────────────────────── */}
      <section className="relative pt-32 pb-24 px-4 md:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-slate-50/40 backdrop-blur-[2px] z-0" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-3 glass-card px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] border-white/60 mb-10 shadow-2xl"
          >
            <Trophy className="w-4 h-4 text-emerald-500" />
            <span className="text-slate-900/80">Global Tournament Hub</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-9xl font-black uppercase tracking-tighter mb-8 leading-[0.85] text-slate-900"
          >
            The <span className="shining-text text-emerald-400">World's</span><br />
            <span className="text-blue-500">Stage</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-900 max-w-2xl font-black mb-16 leading-relaxed uppercase tracking-widest drop-shadow-sm"
          >
            The pinnacle of international football. Explore the world's most prestigious tournaments, from the historic FIFA World Cup™ to elite continental showdowns.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-6"
          >
            <div className="glass-card border border-slate-900/10 p-8 rounded-[2rem] min-w-[240px] shadow-2xl">
              <div className="text-[10px] font-black text-slate-900/20 uppercase tracking-[0.3em] mb-3">Total Teams</div>
              <div className="text-5xl font-black font-mono-data text-slate-900">48</div>
            </div>
            <div className="glass-card border border-slate-900/10 p-8 rounded-[2rem] min-w-[240px] shadow-2xl">
              <div className="text-[10px] font-black text-slate-900/20 uppercase tracking-[0.3em] mb-3">Host Cities</div>
              <div className="text-5xl font-black font-mono-data text-slate-900">16</div>
            </div>
            <div className="glass-card border border-slate-900/10 p-8 rounded-[2rem] min-w-[240px] shadow-2xl">
              <div className="text-[10px] font-black text-slate-900/20 uppercase tracking-[0.3em] mb-3">Match Days</div>
              <div className="text-5xl font-black font-mono-data text-slate-900">39</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── TOURNAMENT LIST ─────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-24 relative z-10">
        <div className="space-y-32">
          {tournaments.map((tournament, index) => (
            <motion.div 
              key={tournament.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 items-center group`}
            >
              {/* Image Side */}
              <div className="w-full lg:w-1/2 relative">
                <div className="absolute -inset-6 bg-emerald-500/10 rounded-[3.5rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative aspect-video rounded-[3rem] overflow-hidden shadow-2xl border border-slate-900/10 glass-card">
                  <img 
                    src={tournament.image} 
                    alt={tournament.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-50/90 via-transparent to-transparent" />
                  <div className="absolute bottom-10 left-10">
                    <div className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border backdrop-blur-xl ${
                      tournament.status === 'Upcoming' 
                      ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400' 
                      : 'bg-slate-900/10 border-slate-900/20 text-slate-900/60'
                    }`}>
                      {tournament.status}
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Side */}
              <div className="w-full lg:w-1/2 space-y-10">
                <div>
                  <h2 className="text-5xl md:text-7xl font-black text-slate-900 uppercase tracking-tighter mb-6 leading-[0.85] group-hover:shining-text transition-colors duration-300">
                    {tournament.name}
                  </h2>
                  <p className="text-lg text-slate-800 font-bold uppercase tracking-wide leading-relaxed">
                    {tournament.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div className="flex items-center space-x-5">
                    <div className="w-12 h-12 bg-slate-900/5 rounded-2xl flex items-center justify-center border border-slate-900/10">
                      <MapPin className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div>
                      <div className="text-[10px] font-black text-slate-900/20 uppercase tracking-[0.2em] mb-1">Host</div>
                      <div className="text-sm font-black text-slate-900 uppercase tracking-tight">{tournament.host}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-5">
                    <div className="w-12 h-12 bg-slate-900/5 rounded-2xl flex items-center justify-center border border-slate-900/10">
                      <Calendar className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <div className="text-[10px] font-black text-slate-900/20 uppercase tracking-[0.2em] mb-1">Dates</div>
                      <div className="text-sm font-black text-slate-900 uppercase tracking-tight">{tournament.dates}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-5">
                    <div className="w-12 h-12 bg-slate-900/5 rounded-2xl flex items-center justify-center border border-slate-900/10">
                      <Users className="w-5 h-5 text-amber-500" />
                    </div>
                    <div>
                      <div className="text-[10px] font-black text-slate-900/20 uppercase tracking-[0.2em] mb-1">Teams</div>
                      <div className="text-sm font-black text-slate-900 uppercase tracking-tight">{tournament.teams} Nations</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-5">
                    <div className="w-12 h-12 bg-slate-900/5 rounded-2xl flex items-center justify-center border border-slate-900/10">
                      <Star className="w-5 h-5 text-rose-500" />
                    </div>
                    <div>
                      <div className="text-[10px] font-black text-slate-900/20 uppercase tracking-[0.2em] mb-1">Tier</div>
                      <div className="text-sm font-black text-slate-900 uppercase tracking-tight">Level 1 Elite</div>
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  {/* ✅ AGENT: Wrapped tournament details button in Link to restore navigation functionality */}
                  <Link to="/match-centre" className="inline-block">
                    <button className="shining-button bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-[0.3em] px-12 py-5 rounded-2xl transition-all shadow-2xl shadow-emerald-900/20 text-[10px] flex items-center space-x-5 group/btn">
                      <span>View Tournament Details</span>
                      <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── STATS SECTION ───────────────────────────────────── */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-emerald-500/5 backdrop-blur-3xl z-0" />
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 uppercase tracking-tighter mb-8 leading-none">The 2026 <span className="text-emerald-500">Legacy</span></h2>
            <p className="text-slate-800 font-bold uppercase tracking-[0.2em] text-sm max-w-2xl mx-auto leading-relaxed">A tournament of unprecedented scale. The FIFA World Cup 2026™ is set to redefine global sports, breaking every record in attendance, viewership, and economic impact.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
            <div className="text-center space-y-6">
              <div className="text-6xl font-black text-slate-900 font-mono-data tracking-tighter">5.5B+</div>
              <div className="text-[10px] font-black text-slate-900/20 uppercase tracking-[0.3em]">Expected Viewers</div>
            </div>
            <div className="text-center space-y-6">
              <div className="text-6xl font-black text-emerald-500 font-mono-data tracking-tighter">104</div>
              <div className="text-[10px] font-black text-slate-900/20 uppercase tracking-[0.3em]">Total Matches</div>
            </div>
            <div className="text-center space-y-6">
              <div className="text-6xl font-black text-slate-900 font-mono-data tracking-tighter">16</div>
              <div className="text-[10px] font-black text-slate-900/20 uppercase tracking-[0.3em]">Host Cities</div>
            </div>
            <div className="text-center space-y-6">
              <div className="text-6xl font-black text-blue-500 font-mono-data tracking-tighter">$14B+</div>
              <div className="text-[10px] font-black text-slate-900/20 uppercase tracking-[0.3em]">Economic Impact</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── INFO SECTION ────────────────────────────────────── */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-white/50 backdrop-blur-xl z-0" />
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="glass-card p-10 rounded-[2.5rem] border border-slate-900/10 space-y-8 group hover:border-emerald-500/30 transition-all duration-500">
              <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center border border-emerald-500/20 group-hover:scale-110 transition-transform duration-500">
                <ShieldCheck className="w-8 h-8 text-emerald-500" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-4">Official Partner</h3>
                <p className="text-slate-800 text-sm leading-relaxed font-bold uppercase tracking-wide">We work directly with tournament organizers to ensure official ticket distribution and verified 100% secure resale.</p>
              </div>
            </div>
            <div className="glass-card p-10 rounded-[2.5rem] border border-slate-900/10 space-y-8 group hover:border-blue-500/30 transition-all duration-500">
              <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center border border-blue-500/20 group-hover:scale-110 transition-transform duration-500">
                <TrendingUp className="w-8 h-8 text-blue-500" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-4">Market Analytics</h3>
                <p className="text-slate-900/30 text-sm leading-relaxed font-bold uppercase tracking-wide">Access historical pricing and attendance data to make informed decisions for your tournament experience.</p>
              </div>
            </div>
            <div className="glass-card p-10 rounded-[2.5rem] border border-slate-900/10 space-y-8 group hover:border-violet-500/30 transition-all duration-500">
              <div className="w-16 h-16 bg-violet-500/10 rounded-2xl flex items-center justify-center border border-violet-500/20 group-hover:scale-110 transition-transform duration-500">
                <Globe className="w-8 h-8 text-violet-500" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-4">Host City Guides</h3>
                <p className="text-slate-900/30 text-sm leading-relaxed font-bold uppercase tracking-wide">Comprehensive travel and stadium guides for every host city in upcoming major tournaments.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tournaments;
