import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Search, Filter, ChevronDown, ChevronLeft, ChevronRight, Calendar, Activity, Globe, Clock, Info, Star, TrendingUp, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

const MatchCentre = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isLiveOnly, setIsLiveOnly] = useState(false);
  const [wsStatus, setWsStatus] = useState<'connecting' | 'connected' | 'disconnected'>('connecting');
  
  const [matches, setMatches] = useState([
    { id: 'm1', time: "19:00", t1: "Mexico", t2: "South Africa", s1: "0", s2: "0", status: "LIVE", competition: "FIFA World Cup 2026™", group: "Group A" },
    { id: 'm2', time: "15:00", t1: "USA", t2: "Paraguay", s1: "2", s2: "1", status: "FT", competition: "FIFA World Cup 2026™", group: "Group B" },
    { id: 'm3', time: "18:00", t1: "Canada", t2: "Norway", s1: "1", s2: "1", status: "75'", competition: "FIFA World Cup 2026™", group: "Group C" },
    { id: 'm4', time: "12:00", t1: "Brazil", t2: "Japan", s1: "3", s2: "0", status: "FT", competition: "FIFA World Cup 2026™", group: "Group D" },
    { id: 'm5', time: "15:00", t1: "France", t2: "Morocco", s1: "0", s2: "0", status: "15'", competition: "FIFA World Cup 2026™", group: "Group E" },
    { id: 'm6', time: "12:00", t1: "Argentina", t2: "South Korea", s1: "2", s2: "0", status: "FT", competition: "FIFA World Cup 2026™", group: "Group F" },
    { id: 'm7', time: "18:00", t1: "Spain", t2: "Australia", s1: "1", s2: "2", status: "60'", competition: "FIFA World Cup 2026™", group: "Group G" },
    { id: 'm8', time: "21:00", t1: "England", t2: "Egypt", s1: "0", s2: "0", status: "UPCOMING", competition: "FIFA World Cup 2026™", group: "Group H" },
    { id: 'm9', time: "14:00", t1: "Germany", t2: "Uruguay", s1: "1", s2: "0", status: "HT", competition: "FIFA World Cup 2026™", group: "Group I" },
    { id: 'm10', time: "17:00", t1: "Portugal", t2: "Nigeria", s1: "0", s2: "0", status: "UPCOMING", competition: "FIFA World Cup 2026™", group: "Group J" },
    { id: 'm11', time: "20:00", t1: "Netherlands", t2: "Chile", s1: "0", s2: "0", status: "UPCOMING", competition: "FIFA World Cup 2026™", group: "Group K" }
  ]);

  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}`;
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => setWsStatus('connected');
    ws.onclose = () => setWsStatus('disconnected');
    ws.onerror = () => setWsStatus('disconnected');

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'SCORE_UPDATE') {
          setMatches(prev => prev.map(m => 
            m.id === data.payload.matchId 
              ? { ...m, s1: data.payload.s1, s2: data.payload.s2, status: data.payload.status || 'LIVE' } 
              : m
          ));
        }
      } catch (e) {
        console.error("WebSocket error:", e);
      }
    };

    return () => {
      if (ws.readyState === WebSocket.OPEN) ws.close();
    };
  }, []);

  // Filter and Group Matches
  const filteredMatches = useMemo(() => {
    return matches.filter(m => {
      const matchesSearch = m.t1.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           m.t2.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           m.competition.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLive = !isLiveOnly || (m.status !== 'FT' && m.status !== 'UPCOMING');
      return matchesSearch && matchesLive;
    });
  }, [matches, searchQuery, isLiveOnly]);

  const groupedMatches = useMemo(() => {
    const groups: { [key: string]: typeof matches } = {};
    filteredMatches.forEach(m => {
      if (!groups[m.competition]) groups[m.competition] = [];
      groups[m.competition].push(m);
    });
    return groups;
  }, [filteredMatches]);

  const competitions = Object.keys(groupedMatches);

  return (
    <div className="w-full min-h-screen bg-slate-50 text-slate-900 relative overflow-hidden">
      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full animate-pulse-slow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      <style>{`
        .date-ribbon::-webkit-scrollbar { display: none; }
        .date-ribbon { -ms-overflow-style: none; scrollbar-width: none; }
        
        .match-row-grid {
          display: grid;
          grid-template-columns: 80px 1fr 120px 1fr 100px;
          align-items: center;
        }

        @media (max-width: 768px) {
          .match-row-grid {
            grid-template-columns: 60px 1fr 80px 1fr 60px;
          }
        }
      `}</style>

      {/* ── TOP NAVIGATION RAIL ──────────────────────────────── */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-slate-50/50 backdrop-blur-xl border-b border-slate-900/10 sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
              <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <Globe className="w-5 h-5 text-slate-900" />
              </div>
              <span className="font-black text-xl tracking-tighter uppercase shining-text">MatchHub</span>
            </div>
            
            <nav className="hidden md:flex space-x-6">
              <button className="text-[10px] font-black uppercase tracking-widest text-slate-900 border-b-2 border-emerald-500 h-16 px-1">Overview</button>
              <button className="text-[10px] font-black uppercase tracking-widest text-slate-900/40 hover:text-slate-900 transition-colors h-16 px-1">Standings</button>
              <button className="text-[10px] font-black uppercase tracking-widest text-slate-900/40 hover:text-slate-900 transition-colors h-16 px-1">Players</button>
              <button className="text-[10px] font-black uppercase tracking-widest text-slate-900/40 hover:text-slate-900 transition-colors h-16 px-1">News</button>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-slate-900/5 px-3 py-1.5 rounded-full border border-slate-900/10">
              <div className={`w-2 h-2 rounded-full ${wsStatus === 'connected' ? 'bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-slate-900/20'}`} />
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-900/60">
                {wsStatus === 'connected' ? 'Live Sync' : 'Reconnecting'}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── HERO HEADER ─────────────────────────────────────── */}
      <div className="relative pt-20 pb-12 px-4 md:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500">Official Dashboard</span>
                <div className="h-px w-12 bg-emerald-500/30" />
              </div>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-slate-900 uppercase leading-[0.85] mb-4">
                Match<br /><span className="shining-text">Centre</span>
              </h1>
              <p className="text-slate-500 font-medium max-w-md text-sm md:text-base">
                Experience every moment of the FIFA World Cup 2026™ with real-time data and elite analytics.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex bg-slate-900/5 p-1.5 rounded-2xl border border-slate-900/10 backdrop-blur-md"
            >
              <button className="px-8 py-3 rounded-xl bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest shadow-xl shadow-slate-900/10 transition-all">Men's Football</button>
              <button className="px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-900/40 hover:text-slate-900 transition-colors">Women's Football</button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── SEARCH & DATE RIBBON ────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 mb-12">
          {/* Search */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="relative group"
          >
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-900/20 group-focus-within:text-emerald-500 transition-colors" />
            </div>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-14 pr-6 py-5 border border-slate-900/5 rounded-2xl leading-5 bg-slate-900/5 text-slate-900 placeholder-slate-900/20 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500/40 sm:text-sm transition-all shadow-2xl backdrop-blur-xl" 
              placeholder="Search matches, teams, or competitions..." 
            />
          </motion.div>

          {/* Date Ribbon */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center bg-slate-900/5 border border-slate-900/5 rounded-2xl p-1.5 shadow-2xl backdrop-blur-xl"
          >
            <button className="p-4 hover:bg-slate-900/5 rounded-xl transition-colors"><ChevronLeft className="w-5 h-5 text-slate-900/20" /></button>
            <div className="flex space-x-2 overflow-x-auto date-ribbon px-2 max-w-[300px] md:max-w-md">
              {[
                { day: "MON", date: "16", active: false },
                { day: "TUE", date: "17", active: false },
                { day: "WED", date: "18", active: false },
                { day: "THU", date: "19", active: true },
                { day: "FRI", date: "20", active: false },
                { day: "SAT", date: "21", active: false },
                { day: "SUN", date: "22", active: false }
              ].map((d, i) => (
                <button 
                  key={i} 
                  className={`flex flex-col items-center justify-center min-w-[72px] py-3 rounded-xl transition-all ${d.active ? 'bg-emerald-500 text-white shadow-xl shadow-emerald-500/20 scale-105' : 'hover:bg-slate-900/5 text-slate-900/40'}`}
                >
                  <span className={`text-[9px] font-black uppercase tracking-widest mb-1 ${d.active ? 'text-slate-900/70' : 'text-slate-900/20'}`}>{d.day}</span>
                  <span className="text-base font-black">{d.date}</span>
                </button>
              ))}
            </div>
            <button className="p-4 hover:bg-slate-900/5 rounded-xl transition-colors"><ChevronRight className="w-5 h-5 text-slate-900/20" /></button>
          </motion.div>
        </div>

        {/* ── FILTERS BAR ────────────────────────────────────── */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap items-center justify-between gap-6 mb-12 pb-8 border-b border-slate-900/5"
        >
          <div className="flex items-center space-x-8">
            <button 
              onClick={() => setIsLiveOnly(!isLiveOnly)}
              className={`flex items-center space-x-4 px-6 py-3 rounded-full border transition-all ${isLiveOnly ? 'bg-red-500/10 border-red-500/40 text-red-500 shadow-xl shadow-red-500/10' : 'bg-slate-900/5 border-slate-900/5 text-slate-900/60 hover:border-slate-900/20'}`}
            >
              <div className={`w-2.5 h-2.5 rounded-full ${isLiveOnly ? 'bg-red-500 animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.6)]' : 'bg-slate-900/20'}`} />
              <span className="text-[10px] font-black uppercase tracking-widest">Live Only</span>
            </button>
            
            <div className="h-6 w-px bg-slate-900/10" />
            
            <div className="flex space-x-4">
              {['All', 'Finished', 'Scheduled'].map(f => (
                <button key={f} className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-slate-900/40 hover:text-slate-900 transition-colors relative group">
                  {f}
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-3 px-6 py-3 bg-slate-900/5 border border-slate-900/5 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-900/60 hover:bg-slate-900/10 transition-all shadow-2xl backdrop-blur-xl">
              <Filter className="w-4 h-4" />
              <span>Advanced Filters</span>
            </button>
          </div>
        </motion.div>

        {/* ── MATCH LISTINGS ─────────────────────────────────── */}
        <div className="space-y-16">
          <AnimatePresence mode="popLayout">
            {competitions.length > 0 ? competitions.map((comp, compIdx) => (
              <motion.div 
                key={comp}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 + (compIdx * 0.1) }}
                className="glass-card overflow-hidden group/card"
              >
                {/* Competition Header */}
                <div className="bg-slate-900/5 px-8 py-6 border-b border-slate-900/5 flex items-center justify-between group-hover/card:bg-slate-900/[0.07] transition-colors">
                  <div className="flex items-center space-x-6">
                    <div className="w-12 h-12 bg-slate-900/5 border border-slate-900/10 rounded-2xl flex items-center justify-center p-2 shadow-2xl group-hover/card:scale-110 transition-transform">
                      <img src="https://www.gettickets365.com/assets/img/banners/fwc2026.png" alt={comp} className="w-full h-full object-contain brightness-125" />
                    </div>
                    <div>
                      <h2 className="text-lg font-black uppercase tracking-widest text-slate-900 shining-text">{comp}</h2>
                      <div className="flex items-center space-x-3 mt-1">
                        <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Final Tournament</span>
                        <span className="text-slate-900/20 text-[9px]">•</span>
                        <span className="text-[9px] font-black text-slate-900/40 uppercase tracking-widest">North America</span>
                      </div>
                    </div>
                  </div>
                  <button className="p-3 hover:bg-slate-900/10 rounded-xl transition-colors">
                    <ChevronDown className="w-6 h-6 text-slate-900/20" />
                  </button>
                </div>
                
                {/* Matches Grid */}
                <div className="divide-y divide-white/5">
                  {groupedMatches[comp].map((match) => (
                    <motion.div 
                      key={match.id} 
                      layout
                      onClick={() => navigate(`/match/${match.id}`)} 
                      className="match-row-grid px-8 py-8 hover:bg-slate-900/[0.03] transition-all group cursor-pointer relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/[0.02] to-emerald-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none" />
                      
                      {/* Time / Status */}
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black text-slate-900/40 mb-2 font-mono-data tracking-widest">{match.time}</span>
                        <div className="flex items-center space-x-2">
                          {match.status === 'LIVE' || match.status.includes("'") || match.status === 'HT' ? (
                            <>
                              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.6)]" />
                              <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">{match.status}</span>
                            </>
                          ) : (
                            <span className="text-[10px] font-black text-slate-900/40 uppercase tracking-widest">{match.status}</span>
                          )}
                        </div>
                      </div>
                      
                      {/* Team 1 */}
                      <div className="flex items-center justify-end space-x-6">
                        <span className="text-base md:text-xl font-black text-slate-900 text-right truncate group-hover:shining-text transition-all tracking-tighter uppercase">{match.t1}</span>
                        <div className="w-10 h-10 bg-slate-900/5 rounded-2xl flex-shrink-0 overflow-hidden border border-slate-900/10 p-1 shadow-2xl group-hover:scale-110 transition-transform">
                          <img src={`https://picsum.photos/seed/${match.t1}/64/64`} alt={match.t1} className="w-full h-full object-cover rounded-xl opacity-90" referrerPolicy="no-referrer" />
                        </div>
                      </div>
                      
                      {/* Score */}
                      <div className="flex flex-col items-center justify-center px-6">
                        <div className="flex items-center space-x-4 bg-slate-900 text-white px-6 py-3 rounded-2xl shadow-2xl font-mono-data text-2xl font-black tracking-tighter group-hover:scale-105 transition-transform">
                          <span className={match.status === 'UPCOMING' ? 'text-white/20' : ''}>{match.s1}</span>
                          <span className="text-white/20 text-lg">-</span>
                          <span className={match.status === 'UPCOMING' ? 'text-white/20' : ''}>{match.s2}</span>
                        </div>
                      </div>
                      
                      {/* Team 2 */}
                      <div className="flex items-center justify-start space-x-6">
                        <div className="w-10 h-10 bg-slate-900/5 rounded-2xl flex-shrink-0 overflow-hidden border border-slate-900/10 p-1 shadow-2xl group-hover:scale-110 transition-transform">
                          <img src={`https://picsum.photos/seed/${match.t2}/64/64`} alt={match.t2} className="w-full h-full object-cover rounded-xl opacity-90" referrerPolicy="no-referrer" />
                        </div>
                        <span className="text-base md:text-xl font-black text-slate-900 text-left truncate group-hover:shining-text transition-all tracking-tighter uppercase">{match.t2}</span>
                      </div>
                      
                      {/* Actions / Group */}
                      <div className="flex flex-col items-end">
                        <span className="text-[9px] font-black text-slate-900/30 uppercase tracking-[0.2em] mb-2">{match.group}</span>
                        <div className="flex items-center space-x-3 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                          <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Match Details</span>
                          <ChevronRight className="w-4 h-4 text-emerald-500" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                {/* Competition Footer */}
                <div className="bg-slate-900/5 px-8 py-4 border-t border-slate-900/5 flex items-center justify-center">
                  <button className="text-[10px] font-black text-slate-900/30 uppercase tracking-[0.3em] hover:text-emerald-500 transition-colors flex items-center space-x-3">
                    <span>Full Tournament Schedule</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )) : (
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center justify-center py-32 glass-card relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-blue-500/5 pointer-events-none" />
                <div className="w-24 h-24 bg-slate-900/5 rounded-3xl flex items-center justify-center mb-8 border border-slate-900/10 shadow-2xl">
                  <Search className="w-12 h-12 text-slate-900/10" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-3">No matches found</h3>
                <p className="text-slate-500 text-sm max-w-xs text-center mb-10 font-medium">Try adjusting your filters or search query to find what you're looking for.</p>
                <button 
                  onClick={() => { setSearchQuery(''); setIsLiveOnly(false); }}
                  className="shining-button px-12 py-4 rounded-2xl"
                >
                  Reset Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── INFO SECTION ────────────────────────────────────── */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Clock, title: "Real-time Updates", desc: "Live scores and match events synced instantly via high-speed WebSocket.", color: "text-emerald-500" },
            { icon: Activity, title: "Match Analytics", desc: "Deep dive into team performance and elite player statistics.", color: "text-blue-500" },
            { icon: Info, title: "Tournament Info", desc: "Official schedules, venues, and host city information for 2026.", color: "text-violet-500" }
          ].map((item, i) => (
            <motion.div 
              key={i} 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-8 group hover:bg-slate-900/10 transition-all border-slate-900/5 hover:border-slate-900/20"
            >
              <div className="w-14 h-14 bg-slate-900/5 rounded-2xl flex items-center justify-center mb-6 border border-slate-900/10 group-hover:border-slate-900/20 transition-all shadow-2xl">
                <item.icon className={`w-7 h-7 ${item.color}`} />
              </div>
              <h4 className="text-base font-black uppercase tracking-widest text-slate-900 mb-3 group-hover:shining-text transition-all">{item.title}</h4>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Footer Spacer */}
      <div className="h-32" />
    </div>
  );
};

export default MatchCentre;
