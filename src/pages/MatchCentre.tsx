import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Search, Filter, ChevronDown, ChevronLeft, ChevronRight, Calendar, Activity, Globe, Clock, Info, Star, TrendingUp, ShieldCheck } from 'lucide-react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { apiService, Match } from '../services/api';

const MatchCentre = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const subLinks = [
    { name: 'Overview', path: '/match-centre' },
    { name: 'Standings', path: '/rankings' },
    { name: 'Players', path: '/teams' },
    { name: 'News', path: '/news' },
  ];
  const [searchQuery, setSearchQuery] = useState('');
  const [isLiveOnly, setIsLiveOnly] = useState(false);
  const [wsStatus, setWsStatus] = useState<'connecting' | 'connected' | 'disconnected'>('connecting');
  const [gender, setGender] = useState<'mens' | 'womens'>('mens');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [expandedComps, setExpandedComps] = useState<string[]>(['FIFA World Cup 2026™']);
  
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const data = await apiService.getMatches();
        setMatches(data);
      } catch (error) {
        console.error("Failed to fetch matches:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMatches();
  }, []);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Syncing Match Data...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-slate-50 text-slate-900 relative overflow-hidden">
      <Helmet>
        <title>Match Centre | FIFA World Cup 2026™ Real-Time Updates</title>
        <meta name="description" content="Get live scores, real-time match stats, and official line-ups for the FIFA World Cup 2026™. Follow every goal with our integrated WebSocket sync." />
      </Helmet>
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
        className="bg-white/70 backdrop-blur-2xl border-b border-white/60 sticky top-0 z-50 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-4 min-w-0 flex-1">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-900/40 flex-shrink-0 hidden sm:block">Match Centre</span>
            
            <nav className="flex space-x-4 sm:space-x-6 overflow-x-auto hide-scrollbar">
              {subLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link 
                    key={link.name}
                    to={link.path} 
                    className={`text-[10px] flex-shrink-0 flex items-center font-black uppercase tracking-widest transition-colors h-16 px-1 relative ${
                      isActive ? 'text-slate-900' : 'text-slate-800 hover:text-slate-900'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.div 
                        layoutId="match-centre-underline"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 glass-card px-3 py-1.5 border-white/40">
              <div className={`w-2.5 h-2.5 rounded-full ${wsStatus === 'connected' ? 'bg-emerald-500 animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.6)]' : 'bg-slate-900/20'}`} />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">
                {wsStatus === 'connected' ? 'LIVE DATA SYNC' : 'CONNECTION LOST'}
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
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500">Tournament Intelligence</span>
                <div className="h-px w-12 bg-emerald-500/30" />
              </div>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-slate-900 uppercase leading-[0.85] mb-6">
                Official<br /><span className="shining-text">Match Centre</span>
              </h1>
              <p className="text-slate-800 font-bold max-w-lg text-sm md:text-lg leading-relaxed drop-shadow-sm">
                The definitive tournament nerve centre. Experience the FIFA World Cup 2026™ with elite-tier match data, real-time analytics, and comprehensive global coverage.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex glass-card p-1.5 border-white/60"
            >
              <button 
                onClick={() => setGender('mens')}
                className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${gender === 'mens' ? 'bg-slate-900 text-white shadow-xl shadow-slate-900/10' : 'text-slate-900/40 hover:text-slate-900'}`}
              >
                Men's Football
              </button>
              <button 
                onClick={() => setGender('womens')}
                className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${gender === 'womens' ? 'bg-slate-900 text-white shadow-xl shadow-slate-900/10' : 'text-slate-900/40 hover:text-slate-900'}`}
              >
                Women's Football
              </button>
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
              className="block w-full pl-14 pr-6 py-5 border border-white/60 rounded-2xl leading-5 glass-card text-slate-900 placeholder-slate-900/40 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500/60 sm:text-sm transition-all shadow-2xl backdrop-blur-2xl" 
              placeholder="Search matches, teams, or competitions..." 
            />
          </motion.div>

          {/* Date Ribbon */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center glass-card p-1.5 border-white/60 shadow-2xl"
          >
            <button className="p-4 hover:bg-slate-900/5 rounded-xl transition-colors"><ChevronLeft className="w-5 h-5 text-slate-900/40" /></button>
            <div className="flex items-center space-x-2 overflow-x-auto date-ribbon px-2 max-w-[300px] md:max-w-md relative z-10">
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
                  className={`flex flex-col items-center justify-center min-w-[72px] py-3 rounded-xl transition-all ${d.active ? 'bg-emerald-500 text-white shadow-xl shadow-emerald-500/20 scale-105' : 'hover:bg-slate-900/5 text-slate-700'}`}
                >
                  <span className={`text-[9px] font-black uppercase tracking-widest mb-1 ${d.active ? 'text-slate-900/70' : 'text-slate-900/40'}`}>{d.day}</span>
                  <span className="text-base font-black">{d.date}</span>
                </button>
              ))}
            </div>
            <button className="p-4 hover:bg-slate-900/5 rounded-xl transition-colors"><ChevronRight className="w-5 h-5 text-slate-900/40" /></button>
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
                <button key={f} className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-slate-800 hover:text-slate-900 transition-colors relative group">
                  {f}
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              className={`flex items-center space-x-3 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-2xl backdrop-blur-xl ${isFiltersOpen ? 'bg-slate-900 text-white' : 'bg-slate-900/5 border border-slate-900/5 text-slate-900/60 hover:bg-slate-900/10'}`}
            >
              <Filter className="w-4 h-4" />
              <span>Advanced Filters</span>
            </button>
          </div>
        </motion.div>

        {/* ── ADVANCED FILTERS PANEL ─────────────────────────── */}
        <AnimatePresence>
          {isFiltersOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-12"
            >
              <div className="glass-card p-8 rounded-[2rem] border border-slate-900/10 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-800 mb-3">Host City</label>
                  <select className="w-full bg-slate-900/5 border border-slate-900/10 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 focus:outline-none appearance-none cursor-pointer hover:bg-slate-900/10 transition-colors">
                    <option value="">All Cities</option>
                    <option value="ny">New York/New Jersey</option>
                    <option value="la">Los Angeles</option>
                    <option value="mex">Mexico City</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-800 mb-3">Group Designation</label>
                  <select className="w-full bg-slate-900/5 border border-slate-900/10 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 focus:outline-none appearance-none cursor-pointer hover:bg-slate-900/10 transition-colors">
                    <option value="">All Groups</option>
                    <option value="A">Group A</option>
                    <option value="B">Group B</option>
                    <option value="C">Group C</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <button className="w-full shining-button bg-emerald-500 text-white rounded-xl py-3 px-4 font-black uppercase tracking-[0.2em] text-[10px] shadow-xl shadow-emerald-500/20 hover:bg-emerald-400 transition-colors">
                    Apply Filters
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-900">Official Fixture List</h3>
            <div className="h-px w-8 bg-slate-900/10" />
          </div>
          <div className="flex items-center space-x-2 bg-emerald-500/5 px-3 py-1.5 rounded-full border border-emerald-500/10 shadow-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest leading-none">Global Sync Active</span>
          </div>
        </div>

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
                <div 
                  className="bg-slate-900/5 px-8 py-6 border-b border-slate-900/5 flex items-center justify-between group-hover/card:bg-slate-900/[0.07] transition-colors cursor-pointer"
                  onClick={() => setExpandedComps(prev => prev.includes(comp) ? prev.filter(c => c !== comp) : [...prev, comp])}
                >
                  <div className="flex items-center space-x-6">
                    <div className="w-12 h-12 bg-slate-900/5 border border-slate-900/10 rounded-2xl flex items-center justify-center p-2 shadow-2xl group-hover/card:scale-110 transition-transform">
                      <img src="https://www.gettickets365.com/assets/img/banners/fwc2026.png" alt={comp} className="w-full h-full object-contain brightness-125" />
                    </div>
                    <div>
                      <h2 className="text-lg font-black uppercase tracking-widest text-slate-900 shining-text">{comp}</h2>
                      <div className="flex items-center space-x-3 mt-1">
                        <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Final Tournament</span>
                        <span className="text-slate-900/40 text-[9px]">•</span>
                        <span className="text-[9px] font-black text-slate-800 uppercase tracking-widest">North America</span>
                      </div>
                    </div>
                  </div>
                  <button className="p-3 hover:bg-slate-900/10 rounded-xl transition-colors">
                    <ChevronDown className={`w-6 h-6 transition-transform duration-300 ${expandedComps.includes(comp) ? 'rotate-180 text-emerald-500' : 'text-slate-900/20'}`} />
                  </button>
                </div>
                
                {/* Matches Grid */}
                <AnimatePresence>
                  {expandedComps.includes(comp) && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="divide-y divide-white/5 overflow-hidden"
                    >
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
                        <span className="text-[10px] font-black text-slate-800 mb-2 font-mono-data tracking-widest">{match.time}</span>
                        <div className="flex items-center space-x-2">
                          {match.status === 'LIVE' || match.status.includes("'") || match.status === 'HT' ? (
                            <>
                              <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.6)]" />
                              <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">{match.status}</span>
                            </>
                          ) : (
                            <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest">{match.status}</span>
                          )}
                        </div>
                      </div>
                      
                      {/* Team 1 */}
                      <div className="flex items-center justify-end space-x-6">
                        <span className="text-base md:text-xl font-black text-slate-900 text-right truncate group-hover:shining-text transition-all tracking-tighter uppercase">{match.t1}</span>
                        <div className="w-10 h-10 bg-slate-900/5 rounded-2xl flex-shrink-0 overflow-hidden border border-slate-900/10 p-1 shadow-2xl group-hover:scale-110 transition-transform">
                          <img src={match.t1Flag} alt={match.t1Code} className="w-full h-full object-cover rounded-xl opacity-90" referrerPolicy="no-referrer" />
                        </div>
                      </div>
                      
                      {/* Score */}
                      <div className="flex flex-col items-center justify-center px-6">
                        <div className={`flex items-center space-x-5 px-7 py-3 rounded-2xl shadow-2xl font-mono-data text-2xl font-black tracking-tighter transition-all group-hover:scale-105 ${match.status === 'LIVE' || match.status.includes("'") || match.status === 'HT' ? 'bg-emerald-600 text-white shadow-emerald-500/30' : 'bg-slate-900 text-white'}`}>
                          <span className={match.status === 'UPCOMING' ? 'text-white/20' : ''}>{match.s1}</span>
                          <span className="text-white/30 text-lg">:</span>
                          <span className={match.status === 'UPCOMING' ? 'text-white/20' : ''}>{match.s2}</span>
                        </div>
                      </div>
                      
                      {/* Team 2 */}
                      <div className="flex items-center justify-start space-x-6">
                        <div className="w-10 h-10 bg-slate-900/5 rounded-2xl flex-shrink-0 overflow-hidden border border-slate-900/10 p-1 shadow-2xl group-hover:scale-110 transition-transform">
                          <img src={match.t2Flag} alt={match.t2Code} className="w-full h-full object-cover rounded-xl opacity-90" referrerPolicy="no-referrer" />
                        </div>
                        <span className="text-base md:text-xl font-black text-slate-900 text-left truncate group-hover:shining-text transition-all tracking-tighter uppercase">{match.t2}</span>
                      </div>
                      
                      {/* Actions / Group */}
                      <div className="flex flex-col items-end">
                        <span className="text-[9px] font-black text-slate-800 uppercase tracking-[0.2em] mb-2">{match.group}</span>
                        <div className="flex items-center space-x-3 opacity-100 md:opacity-0 group-hover:opacity-100 transition-all translate-x-0 md:translate-x-4 group-hover:translate-x-0">
                          <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Match Details</span>
                          <ChevronRight className="w-4 h-4 text-emerald-500" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Competition Footer */}
                <div className="bg-slate-900/5 px-8 py-4 border-t border-slate-900/5 flex items-center justify-center">
                  <Link to="/tournaments" className="text-[10px] font-black text-slate-800 uppercase tracking-[0.3em] hover:text-emerald-500 transition-colors flex items-center space-x-3">
                    <span>Full Tournament Schedule</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
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
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter mb-3">No results found</h3>
                <p className="text-slate-800 text-sm max-w-xs text-center mb-10 font-bold">Try adjusting your filters or search query to find the specific fixtures you're looking for.</p>
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
            { icon: Clock, title: "Real-time Intelligence", desc: "Live scores and match events synchronized with sub-second latency via official FIFA data streams.", color: "text-emerald-500" },
            { icon: Activity, title: "Elite Analytics", desc: "Access professional-grade performance metrics and advanced tactical breakdowns for every fixture.", color: "text-blue-500" },
            { icon: Info, title: "Tournament Protocol", desc: "Complete schedules, venue security updates, and host city operational info for 2026.", color: "text-violet-500" }
          ].map((item, i) => (
            <motion.div 
              key={i} 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-8 group hover:bg-white/90 transition-all border-white/60 hover:shadow-2xl hover:-translate-y-1"
            >
              <div className="w-16 h-16 bg-slate-900/5 rounded-2xl flex items-center justify-center mb-6 border border-slate-900/10 group-hover:border-emerald-500/30 transition-all shadow-xl">
                <item.icon className={`w-8 h-8 ${item.color}`} />
              </div>
              <h4 className="text-base font-black uppercase tracking-widest text-slate-900 mb-4 group-hover:shining-text transition-all">{item.title}</h4>
              <p className="text-slate-800 leading-relaxed font-bold text-sm">{item.desc}</p>
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
