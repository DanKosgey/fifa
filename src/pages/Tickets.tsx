import React, { useState, useEffect, useMemo } from 'react';
import { Search, Filter, MapPin, Calendar, ShieldCheck, Ticket, X, Check, ChevronRight, Info, Star, TrendingUp, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { apiService, Match } from '../services/api';

const Tickets = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOfficial, setFilterOfficial] = useState(true);
  const [filterResale, setFilterResale] = useState(true);
  const [selectedStages, setSelectedStages] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("price-low");
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const data = await apiService.getMatches();
        setMatches(data);
      } catch (error) {
        console.error("Failed to fetch matches for tickets:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMatches();
  }, []);

  const filteredMatches = useMemo(() => {
    return matches.filter(match => {
      const matchesSearch = 
        match.t1.toLowerCase().includes(searchQuery.toLowerCase()) ||
        match.t2.toLowerCase().includes(searchQuery.toLowerCase()) ||
        match.venue.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Mocking availability flags for now as they aren't in the Match interface yet
      // but we can assume all matches have at least one type in this prototype
      const hasOfficial = true; 
      const hasResale = true;
      const matchesType = (filterOfficial && hasOfficial) || (filterResale && hasResale);
      
      const matchesStage = selectedStages.length === 0 || selectedStages.includes(match.competition) || selectedStages.includes(match.group);
      
      return matchesSearch && matchesType && matchesStage;
    }).sort((a, b) => {
      // Prices are mocked for the list view since they aren't in the Match interface
      const pA = 150 + (parseInt(a.id.replace(/\D/g, '') || '0') * 20);
      const pB = 150 + (parseInt(b.id.replace(/\D/g, '') || '0') * 20);
      
      if (sortBy === "price-low") return pA - pB;
      if (sortBy === "price-high") return pB - pA;
      return 0;
    });
  }, [matches, searchQuery, filterOfficial, filterResale, selectedStages, sortBy]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (searchQuery) count++;
    if (!filterOfficial || !filterResale) count++;
    count += selectedStages.length;
    return count;
  }, [searchQuery, filterOfficial, filterResale, selectedStages]);

  const toggleStage = (stage: string) => {
    setSelectedStages(prev => 
      prev.includes(stage) ? prev.filter(s => s !== stage) : [...prev, stage]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setFilterOfficial(true);
    setFilterResale(true);
    setSelectedStages([]);
    setSortBy("price-low");
  };

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-900 selection:bg-emerald-500/30">
      <Helmet>
        <title>Tickets | FIFA World Cup 2026™ Official Sales</title>
        <meta name="description" content="Secure your seat at the world's biggest event. Official ticket sales and secure resale platform for FIFA World Cup 2026™." />
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
        <img 
          src="https://www.gettickets365.com/assets/img/banners/fwc2026.png" 
          alt="World Cup 2026" 
          className="absolute right-0 top-1/2 -translate-y-1/2 h-[140%] w-auto opacity-20 pointer-events-none z-0 select-none grayscale contrast-125"
          referrerPolicy="no-referrer"
        />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-3 bg-slate-900/5 backdrop-blur-xl px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] border border-slate-900/10 mb-10"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-slate-900 font-black">OFFICIAL FIFA WORLD CUP 26™ TICKETING PLATFORM</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-8 leading-[0.85] text-slate-900"
          >
            Secure Your <span className="shining-text text-emerald-400">Seat</span><br />
            at the <span className="text-blue-500">World Cup</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-800 max-w-2xl font-semibold mb-16 leading-relaxed drop-shadow-sm"
          >
            Secure your place in history. From official releases to our verified fan-to-fan marketplace, every ticket is 100% guaranteed for the world’s biggest sporting event.
          </motion.p>
          
          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col md:flex-row gap-4 max-w-4xl glass-card p-4 rounded-[2.5rem] shadow-2xl border border-slate-900/10"
          >
            <div className="flex-grow relative flex items-center px-6">
              <Search className="w-6 h-6 text-slate-900/20 mr-5" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by team, city, or stadium..." 
                className="w-full py-5 bg-transparent text-slate-900 placeholder:text-slate-900/10 focus:outline-none font-black text-sm uppercase tracking-[0.2em]"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="p-2 hover:bg-slate-900/5 rounded-full transition-all">
                  <X className="w-4 h-4 text-slate-900/20" />
                </button>
              )}
            </div>
            {/* ✅ AGENT: Wired up Find Tickets button to smoothly scroll to the match listings */}
            <button 
              onClick={() => document.getElementById('matches-list')?.scrollIntoView({ behavior: 'smooth' })}
              className="shining-button bg-emerald-500 text-white font-black uppercase tracking-[0.3em] px-12 py-6 rounded-[1.5rem] hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-500/20 text-[10px]"
            >
              Find Tickets
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── MAIN CONTENT ────────────────────────────────────── */}
      {/* ✅ AGENT: Added id="matches-list" to serve as the smooth scroll translation target */}
      <section id="matches-list" className="max-w-7xl mx-auto px-4 md:px-8 py-24 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Filters Sidebar */}
          <div className="w-full lg:w-1/4">
            <div className="glass-card p-10 rounded-[2.5rem] shadow-2xl border border-slate-900/10 sticky top-32">
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center space-x-4">
                  <h3 className="text-sm font-black uppercase tracking-[0.3em] text-slate-900">Filters</h3>
                  {activeFilterCount > 0 && (
                    <span className="bg-emerald-500 text-white text-[10px] font-black px-2.5 py-1 rounded-lg shadow-lg shadow-emerald-500/20">
                      {activeFilterCount}
                    </span>
                  )}
                </div>
                {activeFilterCount > 0 && (
                  <button 
                    onClick={clearFilters} 
                    className="text-[10px] font-black text-rose-500 hover:text-rose-400 uppercase tracking-widest flex items-center space-x-2 transition-all"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Reset</span>
                  </button>
                )}
              </div>
              
              <div className="space-y-12">
                {/* Ticket Type Section */}
                <div>
                  <h4 className="text-[10px] font-black text-slate-900/20 mb-6 uppercase tracking-[0.3em]">Ticket Type</h4>
                  <div className="space-y-4">
                    <button 
                      onClick={() => setFilterOfficial(!filterOfficial)}
                      className={`w-full flex items-center justify-between px-6 py-5 rounded-2xl border transition-all duration-300 text-left ${
                        filterOfficial 
                        ? 'bg-slate-900/10 border-slate-900/20 text-slate-900 shadow-xl' 
                        : 'bg-slate-900/5 border-slate-900/5 text-slate-900/20 hover:border-slate-900/10'
                      }`}
                    >
                      <span className="text-[11px] font-black uppercase tracking-[0.2em]">Official</span>
                      {filterOfficial && <Check className="w-4 h-4 text-emerald-400" />}
                    </button>
                    <button 
                      onClick={() => setFilterResale(!filterResale)}
                      className={`w-full flex items-center justify-between px-6 py-5 rounded-2xl border transition-all duration-300 text-left ${
                        filterResale 
                        ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400 shadow-xl shadow-emerald-500/10' 
                        : 'bg-slate-900/5 border-slate-900/5 text-slate-900/20 hover:border-slate-900/10'
                      }`}
                    >
                      <span className="text-[11px] font-black uppercase tracking-[0.2em]">Verified Resale</span>
                      {filterResale && <Check className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Tournament Stage Section */}
                <div>
                  <h4 className="text-[10px] font-black text-slate-900/20 mb-6 uppercase tracking-[0.3em]">Tournament Stage</h4>
                  <div className="flex flex-wrap gap-3">
                    {['Group Stage', 'Round of 32', 'Round of 16', 'Quarter-finals', 'Semi-finals', 'Final'].map(stage => {
                      const isSelected = selectedStages.includes(stage);
                      return (
                        <button
                          key={stage}
                          onClick={() => toggleStage(stage)}
                          className={`px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 border ${
                            isSelected
                            ? 'bg-blue-600 border-blue-500 text-slate-900 shadow-xl shadow-blue-600/20'
                            : 'bg-slate-900/5 border-slate-900/5 text-slate-900/20 hover:border-slate-900/10 hover:text-slate-900/40'
                          }`}
                        >
                          {stage}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="glass-card p-6 border-white/60">
                  <div className="flex items-center gap-3 mb-4">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900">Buyer Protection</span>
                  </div>
                  <p className="text-[10px] text-slate-800 leading-relaxed font-bold uppercase tracking-widest">
                    All tickets are 100% verified. Our guarantee ensures you'll get your tickets in time for the match.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Match Listings */}
          <div className="w-full lg:w-3/4 space-y-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-8">
              <div>
                <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter mb-2">Available Matches</h2>
                <span className="text-[10px] text-slate-800 font-black uppercase tracking-[0.4em]">LIVE INVENTORY: {filteredMatches.length} FIXTURES AVAILABLE</span>
              </div>
              
              <div className="flex items-center space-x-4 glass-card px-6 py-4 border-white/60">
                <Filter className="w-4 h-4 text-slate-900/40" />
                <span className="text-[10px] font-black text-slate-900/40 uppercase tracking-[0.2em]">Sort:</span>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-[11px] font-black text-slate-900 uppercase tracking-widest focus:outline-none bg-transparent cursor-pointer appearance-none pr-4"
                >
                  <option value="price-low" className="bg-white">Price: Low to High</option>
                  <option value="price-high" className="bg-white">Price: High to Low</option>
                  <option value="tickets-low" className="bg-white">Availability: Low to High</option>
                  <option value="tickets-high" className="bg-white">Availability: High to Low</option>
                </select>
              </div>
            </div>

            <div className="space-y-8">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-32 gap-6 bg-white rounded-[3rem] border border-slate-900/10 shadow-2xl">
                  <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Loading Inventory...</span>
                </div>
              ) : (
                <AnimatePresence mode="popLayout">
                  {filteredMatches.length > 0 ? (
                    filteredMatches.map((match) => (
                      <motion.div 
                        key={match.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        className="group glass-card rounded-[2.5rem] shadow-2xl border border-slate-900/10 overflow-hidden hover:border-emerald-500/50 hover:shadow-emerald-500/10 transition-all flex flex-col md:flex-row"
                      >
                        {/* Match Info */}
                        <div className="p-10 flex-grow border-b md:border-b-0 md:border-r border-slate-900/5">
                          <div className="flex items-center space-x-4 mb-8">
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600 bg-emerald-500/10 px-4 py-1.5 rounded-xl border border-emerald-500/20">{match.competition}</span>
                            <div className="flex items-center space-x-3 text-[10px] font-black text-slate-900/50 uppercase tracking-[0.2em]">
                              <Calendar className="w-4 h-4 text-blue-500" />
                              <span>{match.date} • {match.time}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between mb-10">
                            <div className="flex items-center space-x-8 w-[45%]">
                              <div className="w-16 h-10 bg-slate-900/5 rounded-xl overflow-hidden border border-slate-900/10 shadow-xl p-1">
                                <img src={match.t1Flag} alt={match.t1} className="w-full h-full object-cover rounded-lg" referrerPolicy="no-referrer" />
                              </div>
                              <span className="text-3xl font-black uppercase tracking-tighter text-slate-900">{match.t1}</span>
                            </div>
                            <span className="text-sm font-black text-slate-900/10 italic tracking-[0.5em]">VS</span>
                            <div className="flex items-center space-x-8 w-[45%] justify-end">
                              <span className="text-3xl font-black uppercase tracking-tighter text-slate-900">{match.t2}</span>
                              <div className="w-16 h-10 bg-slate-900/5 rounded-xl overflow-hidden border border-slate-900/10 shadow-xl p-1">
                                <img src={match.t2Flag} alt={match.t2} className="w-full h-full object-cover rounded-lg" referrerPolicy="no-referrer" />
                              </div>
                            </div>
                          </div>
  
                          <div className="flex items-center text-[10px] text-slate-900/50 font-black uppercase tracking-[0.2em]">
                            <MapPin className="w-4 h-4 mr-3 text-emerald-500" />
                            {match.venue}
                          </div>
                        </div>
  
                        {/* Ticket Action */}
                        <div className="p-10 bg-slate-900/5 flex flex-col justify-center items-center md:items-end min-w-[320px]">
                          <div className="text-center md:text-right mb-10">
                            <div className="text-[10px] text-slate-900/30 font-black uppercase tracking-[0.3em] mb-3">Tickets from</div>
                            <div className="text-5xl font-black text-slate-900 font-mono-data tracking-tighter">${150 + (parseInt(match.id.replace(/\D/g, '') || '0') * 20)}</div>
                            <div className="flex items-center justify-center md:justify-end gap-5 mt-6">
                              <div className="flex items-center gap-2.5">
                                <div className={`w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]`} />
                                <span className="text-[9px] font-black text-slate-900/20 uppercase tracking-[0.2em]">Official</span>
                              </div>
                              <div className="flex items-center gap-2.5">
                                <div className={`w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]`} />
                                <span className="text-[9px] font-black text-slate-900/20 uppercase tracking-[0.2em]">Resale</span>
                              </div>
                            </div>
                          </div>
                          <Link 
                            to={`/match/${match.id}`}
                            className="w-full shining-button bg-emerald-500 text-white font-black uppercase tracking-[0.3em] px-10 py-6 rounded-2xl hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-500/20 text-[10px] flex items-center justify-center gap-4"
                          >
                            <Ticket className="w-4 h-4" />
                            <span>View Tickets</span>
                          </Link>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="glass-card rounded-[3rem] p-32 text-center border border-slate-900/10 shadow-2xl">
                      <div className="w-28 h-28 bg-slate-900/5 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 border border-slate-900/10">
                        <Search className="w-14 h-14 text-slate-900/10" />
                      </div>
                      <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-4">No matches found</h3>
                      <p className="text-xs text-slate-900/20 font-bold uppercase tracking-[0.2em] mb-12 leading-relaxed">Try adjusting your filters or search query to find available fixtures.</p>
                      <button onClick={clearFilters} className="text-emerald-400 font-black uppercase tracking-[0.3em] text-[10px] hover:text-emerald-300 transition-all border-b-2 border-emerald-400/20 pb-2">Clear all filters</button>
                    </div>
                  )}
                </AnimatePresence>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── INFO SECTION ────────────────────────────────────── */}
      <section className="bg-slate-50/50 py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 to-transparent z-0" />
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="space-y-8">
              <div className="w-16 h-16 bg-slate-900/5 rounded-[1.5rem] flex items-center justify-center border border-slate-900/10">
                <ShieldCheck className="w-8 h-8 text-emerald-500" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">100% Guaranteed</h3>
              <p className="text-slate-900/30 text-sm leading-relaxed font-bold uppercase tracking-widest">Every ticket is verified by our team. We guarantee you'll get into the stadium or your money back.</p>
            </div>
            <div className="space-y-8">
              <div className="w-16 h-16 bg-slate-900/5 rounded-[1.5rem] flex items-center justify-center border border-slate-900/10">
                <TrendingUp className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Real-time Pricing</h3>
              <p className="text-slate-900/30 text-sm leading-relaxed font-bold uppercase tracking-widest">Our marketplace updates instantly. Get the best prices as they drop in real-time.</p>
            </div>
            <div className="space-y-8">
              <div className="w-16 h-16 bg-slate-900/5 rounded-[1.5rem] flex items-center justify-center border border-slate-900/10">
                <Globe className="w-8 h-8 text-violet-500" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Global Support</h3>
              <p className="text-slate-900/30 text-sm leading-relaxed font-bold uppercase tracking-widest">Our support team is available 24/7 in multiple languages to assist with your booking.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tickets;
