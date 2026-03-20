import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Award, Globe, Search } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { apiService, Team } from '../services/api';

const Rankings = () => {
  const [search, setSearch] = useState("");
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const data = await apiService.getTeams();
        setTeams(data);
      } catch (error) {
        console.error("Failed to fetch teams:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTeams();
  }, []);

  const filteredRankings = teams.filter(r => 
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-24 relative overflow-hidden">
      <Helmet>
        <title>World Rankings | Official FIFA/Coca-Cola Ranking</title>
        <meta name="description" content="Official FIFA/Coca-Cola World Rankings. Follow the progress of national teams as they battle for the top spot ahead of 2026." />
      </Helmet>
      
      {/* Hero */}
      <div className="bg-[#0A0B1A] text-white pt-24 pb-16 relative overflow-hidden z-10 w-full">
        <div className="absolute inset-0 bg-emerald-500/10 mix-blend-overlay"></div>
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-20">
          <div className="flex items-center space-x-3 mb-6">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500">Men's World Ranking</span>
            <div className="h-px w-12 bg-emerald-500/30" />
          </div>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 shining-text">
            FIFA World <br />Rankings
          </h1>
          <p className="text-slate-300 font-bold max-w-xl text-lg flex items-center gap-3 drop-shadow-sm leading-relaxed">
            <TrendingUp className="w-5 h-5 text-emerald-500" />
            The definitive guide to global excellence. Official FIFA/Coca-Cola World Rankings updated monthly.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-8 py-16 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <h3 className="text-2xl font-black uppercase tracking-tighter text-slate-900 flex items-center gap-3">
            <Globe className="w-6 h-6 text-slate-400" />
            Global Elite
          </h3>
          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="block w-full pl-10 pr-4 py-2 glass-card rounded-lg text-sm font-bold text-slate-900 placeholder-slate-900/40 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500/60 transition-all shadow-2xl border-white/60"
              placeholder="Find team..." 
            />
          </div>
        </div>

        <div className="glass-card border-white/60 overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="grid grid-cols-[48px_1fr_80px] sm:grid-cols-[60px_1fr_100px_80px] px-4 sm:px-8 py-4 sm:py-5 bg-white/60 backdrop-blur-md border-b border-white/60">
            {['Rank', 'Nation', 'Points'].map(h => (
              <div key={h} className={`text-[10px] font-black text-slate-800 uppercase tracking-[0.4em] ${h === 'Points' ? 'hidden sm:block' : ''}`}>{h}</div>
            ))}
            <div className="text-[10px] font-black text-slate-800 uppercase tracking-[0.4em] hidden sm:block">Trend</div>
          </div>
          
          {/* Rows */}
          <div className="divide-y divide-slate-100/80">
            {loading ? (
              <div className="p-24 text-center">
                <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin mx-auto mb-4" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Loading Rankings...</span>
              </div>
            ) : filteredRankings.length > 0 ? filteredRankings.map((r, i) => (
              <motion.div 
                key={r.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="grid grid-cols-[48px_1fr_80px] sm:grid-cols-[60px_1fr_100px_80px] px-4 sm:px-8 py-4 sm:py-6 items-center hover:bg-slate-50 transition-colors cursor-default"
              >
                <div className="flex items-center gap-2">
                  <div className="text-base sm:text-lg font-black text-slate-900 font-mono-data">{r.pos}</div>
                  {r.pos === 1 && <Award className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500" />}
                </div>
                <div className="flex items-center gap-2 sm:gap-4">
                  <span className="text-2xl sm:text-4xl drop-shadow-2xl">{r.flag}</span>
                  <span className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-[0.1em] sm:tracking-[0.2em]">{r.name}</span>
                </div>
                <div className="text-xs sm:text-sm font-black text-slate-900/80 font-mono-data hidden sm:block">{r.pts}</div>
                <div className="flex items-center gap-1.5 hidden sm:flex">
                  <div className={`flex items-center justify-center w-6 h-6 rounded-full ${r.change.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : r.change === '0' ? 'bg-slate-900/10 text-slate-400' : 'bg-red-50 text-red-600'}`}>
                    {r.change.startsWith('+') ? '▲' : r.change === '0' ? '—' : '▼'}
                  </div>
                  <span className={`text-[11px] font-black ${r.change.startsWith('+') ? 'text-emerald-600' : r.change === '0' ? 'text-slate-400' : 'text-red-600'} font-mono-data`}>
                    {r.change.replace(/[+-]/, '')}
                  </span>
                </div>
              </motion.div>
            )) : (
              <div className="p-12 text-center">
                <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">No teams found matching "{search}"</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rankings;
