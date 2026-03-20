import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Search, MapPin, Award } from 'lucide-react';
import { apiService, Team } from '../services/api';

const Teams = () => {
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

  const filteredTeams = teams.filter(t => 
    t.name.toLowerCase().includes(search.toLowerCase()) || 
    t.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-24 relative overflow-hidden">
      <div className="bg-[#0A0B1A] text-white pt-24 pb-20 relative overflow-hidden z-10 w-full">
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-20 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 mb-8 shadow-lg shadow-slate-900/5">
            <Award className="w-8 h-8 text-emerald-500" />
          </div>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 shining-text">
            Global <br/>Contenders
          </h1>
          <p className="text-slate-300 font-bold max-w-xl text-lg mx-auto leading-relaxed drop-shadow-sm">
            Explore the 48 nations arriving in North America to compete for football's ultimate prize.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-12 relative z-10">
        <div className="flex justify-end mb-12">
          <div className="relative w-full md:w-72">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="block w-full pl-11 pr-4 py-3 glass-card rounded-xl text-sm font-black text-slate-900 placeholder-slate-900/20 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500/60 transition-all shadow-2xl border-white/60 uppercase tracking-widest"
              placeholder="Search nations..." 
            />
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-6">
            <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Loading Contenders...</span>
          </div>
        ) : filteredTeams.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredTeams.map((team, i) => (
              <motion.div 
                key={team.code}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="glass-card p-5 sm:p-10 flex flex-col items-center justify-center text-center border-white/60 shadow-2xl group cursor-pointer active:scale-95"
              >
                <div className="text-5xl sm:text-7xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform drop-shadow-2xl">{team.flag}</div>
                <h3 className="text-lg sm:text-2xl font-black text-slate-900 uppercase tracking-tighter mb-1">{team.name}</h3>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-800 mb-4 sm:mb-6">{team.code}</span>
                
                <div className="w-full flex justify-between items-center pt-4 sm:pt-6 border-t border-slate-900/5">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-900/60">
                    <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-500 flex-shrink-0" />
                    <span className="truncate">{team.region}</span>
                  </div>
                  <div className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-900/80 glass-card px-2 sm:px-3 py-1 sm:py-1.5 border-white/40 flex-shrink-0 ml-1">
                    Pot {team.pot}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">No teams found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Teams;
