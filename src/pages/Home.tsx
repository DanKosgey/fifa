import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, MapPin, Calendar, ChevronRight, ShieldCheck, Globe, Info, Ticket, Star, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { apiService, Match, Team, NewsItem } from '../services/api';

const Home = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [activeSlide, setActiveSlide] = useState(0);
  const [filterDate, setFilterDate] = useState('All');
  const [filterGroup, setFilterGroup] = useState('All');
  const [filterCity, setFilterCity] = useState('All');
  
  const [matches, setMatches] = useState<Match[]>([]);
  const [rankings, setRankings] = useState<Team[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [m, r, n] = await Promise.all([
          apiService.getMatches(),
          apiService.getTeams(),
          apiService.getNews()
        ]);
        setMatches(m);
        setRankings(r);
        setNews(n);
      } catch (error) {
        console.error("Failed to fetch home data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const targetDate = new Date('2026-06-11T00:00:00Z').getTime();
    const interval = setInterval(() => {
      const now = Date.now();
      const d = targetDate - now;
      if (d < 0) return clearInterval(interval);
      setTimeLeft({
        days: Math.floor(d / 86400000),
        hours: Math.floor((d % 86400000) / 3600000),
        minutes: Math.floor((d % 3600000) / 60000),
        seconds: Math.floor((d % 60000) / 1000),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const slidesCount = 4;
    const t = setInterval(() => setActiveSlide(s => (s + 1) % slidesCount), 6000);
    return () => clearInterval(t);
  }, []);

  const heroSlides = [
    {
      tag: 'WE ARE 26 | OFFICIAL HUB',
      headline: 'The Grandest\nTournament Ever',
      sub: '48 Elite Nations. 104 Global Showdowns. 3 Host Countries. The beautiful game on its most majestic stage.',
      accent: '#10B981', // Emerald 500
      gradient: 'from-emerald-500/20 to-blue-600/20'
    },
    {
      tag: 'THE WORLD\'S STAGE | 2026',
      headline: '16 Cities.\nOne Dream.',
      sub: 'From Vancouver to Mexico City, North America prepares to host the most inclusive and expansive FIFA World Cup™ in history.',
      accent: '#F43F5E', // Rose 500
      gradient: 'from-rose-500/20 to-indigo-600/20'
    },
    {
      tag: 'DEFENDING THE THRONE',
      headline: 'Argentina Defend\nTheir Title',
      sub: 'The reigning kings of football arrive in North America. Watch as Argentina fights to solidify their legacy as the greatest dynasty in modern history.',
      accent: '#0EA5E9', // Sky 500
      gradient: 'from-sky-500/20 to-emerald-600/20'
    },
    {
      tag: 'THE PINNACLE | JULY 19',
      headline: 'New York\nNew Jersey',
      sub: 'MetLife Stadium will host the historic FIFA World Cup 26™ Final on July 19, 2026. The world is watching.',
      accent: '#8B5CF6', // Violet 500
      gradient: 'from-violet-500/20 to-rose-600/20'
    },
  ];

  const uniqueDates = ['All', ...new Set(matches.map(m => m.date))];
  const uniqueGroups = ['All', ...new Set(matches.map(m => m.group.split(' · ')[0]))];
  const uniqueCities = ['All', ...new Set(matches.map(m => m.city))];

  const filteredMatches = matches.filter(m => {
    const matchDate = filterDate === 'All' || m.date === filterDate;
    const matchGroup = filterGroup === 'All' || m.group.startsWith(filterGroup);
    const matchCity = filterCity === 'All' || m.city === filterCity;
    return matchDate && matchGroup && matchCity;
  });

  const slide = heroSlides[activeSlide];

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Loading Stage...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans text-slate-900">
      <Helmet>
        <title>FIFA World Cup 2026™ | Official Multi-Host Portal</title>
        <meta name="description" content="Welcome to the official portal for FIFA World Cup 2026™. Explore matches, buy tickets, and stay updated with the latest news from the world's biggest tournament." />
      </Helmet>
      {/* ── LIVE TICKER ─────────────────────────────────────── */}
      <div className="bg-slate-900/5 backdrop-blur-md py-3 overflow-hidden border-b border-slate-900/10 relative z-20">
        <div className="ticker-wrap">
          <div className="ticker-move">
            {[...Array(2)].map((_, ri) => (
              <div key={ri} className="flex items-center gap-8 pr-8 whitespace-nowrap">
                <span className="text-slate-900 text-[11px] font-black uppercase tracking-[0.2em] flex items-center">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 mr-3 animate-pulse"></span>
                  Qualification Live
                </span>
                <span className="text-slate-900/20 text-[11px]">/</span>
                <span className="text-emerald-400 text-[11px] font-black uppercase tracking-[0.2em]">📅 Jun 11 – Jul 19, 2026</span>
                <span className="text-slate-900/20 text-[11px]">/</span>
                <span className="text-slate-900 text-[11px] font-black uppercase tracking-[0.2em]">🇲🇽 MEX vs 🇿🇦 RSA — Estadio Azteca</span>
                <span className="text-slate-900/20 text-[11px]">/</span>
                <span className="text-slate-900 text-[11px] font-black uppercase tracking-[0.2em]">🇺🇸 USA vs 🇵🇾 PAR — SoFi Stadium</span>
                <span className="text-slate-900/20 text-[11px]">/</span>
                <span className="text-slate-900 text-[11px] font-black uppercase tracking-[0.2em]">🏆 Defending Champions: 🇦🇷 Argentina</span>
                <span className="text-slate-900/20 text-[11px]">/</span>
                <span className="text-slate-900 text-[11px] font-black uppercase tracking-[0.2em]">⚽ 48 Teams · 104 Matches</span>
                <span className="text-slate-900/20 text-[11px]">/</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="relative min-h-[640px] overflow-hidden flex items-center">
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className={`absolute inset-0 bg-gradient-to-br ${slide.gradient} opacity-30 blur-[120px] pointer-events-none`}
          />
        </AnimatePresence>
        
        <div className="max-w-7xl mx-auto px-4 md:px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10 py-20">
          {/* Left Content */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeSlide}
              initial={{ opacity: 0, x: 40, filter: "blur(10px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -40, filter: "blur(10px)" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <img 
                src="https://www.gettickets365.com/assets/img/banners/fwc2026.png" 
                alt="World Cup Trophy" 
                className="absolute -right-20 top-1/2 -translate-y-1/2 h-[120%] w-auto object-contain pointer-events-none z-0 select-none drop-shadow-2xl" 
                referrerPolicy="no-referrer"
              />
              <div className="relative z-10">
                <div 
                  className="inline-block text-slate-900 text-[11px] font-black tracking-[0.3em] uppercase px-4 py-2 rounded-lg mb-8 border border-white/60 backdrop-blur-md bg-white/40 shadow-sm"
                  style={{ borderColor: `${slide.accent}40` }}
                >
                  {slide.tag}
                </div>
                <h1 className="text-6xl md:text-8xl font-black text-slate-900 leading-[0.88] mb-8 uppercase tracking-tighter whitespace-pre-line shining-text">
                  {slide.headline}
                </h1>
                <p className="text-xl text-slate-800 mb-12 leading-relaxed max-w-md font-semibold drop-shadow-sm">
                  {slide.sub}
                </p>
                {/* ✅ AGENT: Restored missing navigation buttons in Hero */}
                <div className="flex gap-4">
                  <Link to="/tickets" className="shining-button text-white font-black uppercase tracking-[0.3em] px-10 py-5 rounded-xl transition-all shadow-xl shadow-slate-900/20 text-[10px] inline-flex items-center gap-3">
                    Get Tickets
                  </Link>
                  <Link to="/match-centre" className="group glass-card text-slate-900 font-black uppercase tracking-[0.3em] px-10 py-5 rounded-xl transition-all hover:bg-white/80 text-[10px] inline-flex items-center gap-3">
                    Match Centre
                    <ChevronRight className="w-4 h-4 text-emerald-500 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Right side: mini news thumbnails */}
          <div className="grid grid-cols-2 gap-6 relative">
            {heroSlides.map((s, i) => (
              <motion.div 
                key={i} 
                onClick={() => setActiveSlide(i)} 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative h-[160px] cursor-pointer group"
              >
                {/* Smooth Active Background Shifting */}
                {i === activeSlide && (
                  <motion.div 
                    layoutId="hero-card-active"
                    className="absolute inset-0 glass-card rounded-[2rem] z-0 shadow-lg"
                    transition={{ type: "spring", bounce: 0.15, duration: 0.6 }}
                  />
                )}
                
                <div className={`relative z-10 h-full w-full rounded-[2rem] overflow-hidden flex flex-col justify-end p-8 transition-all duration-500 border ${i === activeSlide ? 'border-transparent' : 'border-white/40 opacity-50 hover:opacity-100 bg-white/20'}`}>
                  <div className={`absolute inset-0 opacity-10 bg-gradient-to-br ${s.gradient}`} />
                  
                  {/* Progress Indicator for Active Card */}
                  {i === activeSlide && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-slate-900/5">
                      <motion.div 
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        key={activeSlide}
                        transition={{ duration: 6, ease: "linear" }}
                        className="h-full bg-slate-900/40"
                        style={{ backgroundColor: s.accent }}
                      />
                    </div>
                  )}

                  <div className="relative z-10">
                    <div className="text-[10px] font-black uppercase tracking-[0.3em] mb-3" style={{ color: s.accent }}>{s.tag}</div>
                    <div className="text-xl text-slate-900 font-black leading-tight uppercase tracking-tighter">{s.headline.split('\n')[0]}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Slide dots */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-4 z-20">
          {heroSlides.map((_, i) => (
            <button 
              key={i} 
              onClick={() => setActiveSlide(i)} 
              className={`h-1.5 rounded-full transition-all duration-500 ${i === activeSlide ? 'w-12' : 'w-2 bg-slate-900/20 hover:bg-slate-900/40'}`}
              style={{ background: i === activeSlide ? slide.accent : undefined }}
            />
          ))}
        </div>
      </section>

      {/* ── UPCOMING MATCHES ────────────────────────────────── */}
      <section className="py-24 border-b border-slate-900/5">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <div className="text-[11px] text-slate-800 font-black uppercase tracking-[0.4em] mb-3">FIFA World Cup 26™</div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter shining-text">The Stage Is Set</h2>
            </div>
            {/* ✅ AGENT: Restored All Matches navigation */}
            <Link to="/match-centre" className="group flex items-center gap-3 bg-slate-900/5 hover:bg-slate-900/10 px-6 py-3 rounded-xl transition-all border border-slate-900/5">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900">All Matches</span>
              <ChevronRight className="w-4 h-4 text-emerald-500 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Calendar className="w-4 h-4 text-slate-900/40" />
              </div>
              <select 
                value={filterDate} 
                onChange={(e) => setFilterDate(e.target.value)}
                className="w-full pl-11 pr-4 py-4 glass-card border-white/60 text-[11px] font-black uppercase tracking-widest text-slate-900 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all appearance-none shadow-2xl"
              >
                {uniqueDates.map(d => <option key={d} value={d} className="bg-white">{d === 'All' ? 'All Dates' : d}</option>)}
              </select>
            </div>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Star className="w-4 h-4 text-slate-900/40" />
              </div>
              <select 
                value={filterGroup} 
                onChange={(e) => setFilterGroup(e.target.value)}
                className="w-full pl-11 pr-4 py-4 glass-card border-white/60 text-[11px] font-black uppercase tracking-widest text-slate-900 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all appearance-none shadow-2xl"
              >
                {uniqueGroups.map(g => <option key={g} value={g} className="bg-white">{g === 'All' ? 'All Groups' : g}</option>)}
              </select>
            </div>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <MapPin className="w-4 h-4 text-slate-900/40" />
              </div>
              <select 
                value={filterCity} 
                onChange={(e) => setFilterCity(e.target.value)}
                className="w-full pl-11 pr-4 py-4 glass-card border-white/60 text-[11px] font-black uppercase tracking-widest text-slate-900 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all appearance-none shadow-2xl"
              >
                {uniqueCities.map(c => <option key={c} value={c} className="bg-white">{c === 'All' ? 'All Cities' : c}</option>)}
              </select>
            </div>
          </div>

          {filteredMatches.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredMatches.map((m, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="group glass-card glass-card-hover cursor-pointer flex flex-col"
                >
                  <div className="px-6 py-4 border-b border-white/40 flex justify-between items-center bg-white/20 backdrop-blur-sm">
                    <span className="text-[10px] font-black text-slate-900/60 uppercase tracking-widest">{m.group}</span>
                    <span className="text-[10px] font-black text-slate-900/80 uppercase tracking-widest">{m.date}</span>
                  </div>

                  <div className="p-8 flex-grow flex flex-col justify-center items-center gap-8 relative overflow-hidden">
                    <div className="absolute inset-0 bg-slate-900/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="flex items-center justify-between w-full relative z-10">
                      <div className="flex flex-col items-center gap-3 w-[40%]">
                        <div className="w-14 h-10 rounded-lg shadow-md overflow-hidden border border-slate-900/10 bg-slate-900/5 p-0.5 group-hover:scale-110 transition-transform">
                          <img src={m.t1Flag} alt={m.t1Code} className="w-full h-full object-cover rounded" />
                        </div>
                        <span className="text-2xl font-black text-slate-900 tracking-tighter uppercase">{m.t1Code}</span>
                      </div>

                      <div className="flex flex-col items-center gap-2">
                        <span className="text-[10px] font-black text-slate-900/10 uppercase tracking-widest italic">VS</span>
                        <div className="px-3 py-1 bg-slate-900/10 text-slate-900 text-[10px] font-black uppercase tracking-widest rounded-full border border-slate-900/10">
                          {m.time}
                        </div>
                      </div>

                      <div className="flex flex-col items-center gap-3 w-[40%]">
                        <div className="w-14 h-10 rounded-lg shadow-md overflow-hidden border border-slate-900/10 bg-slate-900/5 p-0.5 group-hover:scale-110 transition-transform">
                          {m.t2Flag ? <img src={m.t2Flag} alt={m.t2Code} className="w-full h-full object-cover rounded" /> : <div className="w-full h-full bg-slate-900/5 flex items-center justify-center"><ShieldCheck className="w-4 h-4 text-slate-900/10" /></div>}
                        </div>
                        <span className="text-2xl font-black text-slate-900 tracking-tighter uppercase">{m.t2Code}</span>
                      </div>
                    </div>
                  </div>

                  <div className="px-6 py-4 bg-white/20 backdrop-blur-sm border-t border-white/40 flex items-center justify-between">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <MapPin className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                      <span className="text-[10px] font-black text-slate-900/80 uppercase tracking-widest truncate">{m.venue}</span>
                    </div>
                    <span className="text-[10px] font-black text-slate-900/60 uppercase tracking-[0.2em] flex-shrink-0 ml-4">{m.city}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 glass-card">
              <div className="w-20 h-20 bg-slate-900/5 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-10 h-10 text-slate-900/10" />
              </div>
              <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-2">No Matches Found</h3>
              <p className="text-sm text-slate-900/40 font-bold uppercase tracking-widest mb-8">Try adjusting your filters to explore more fixtures.</p>
              {/* ✅ AGENT: Restored Reset Filters button */}
              <button 
                onClick={() => { setFilterDate('All'); setFilterCity('All'); setFilterGroup('All'); }}
                className="bg-slate-900/5 hover:bg-slate-900/10 text-slate-900 font-black px-6 py-3 rounded-xl uppercase tracking-widest text-[10px] transition-all"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── HOSPITALITY BANNER ──────────────────────────────── */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="glass-card border-white/60 overflow-hidden relative shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent pointer-events-none" />
            <img 
              src="https://www.gettickets365.com/assets/img/banners/fwc2026.png" 
              alt="World Cup Trophy" 
              className="absolute right-0 top-1/2 -translate-y-1/2 h-[110%] w-auto object-contain opacity-30 pointer-events-none z-0 brightness-125" 
              referrerPolicy="no-referrer"
            />
            
            <div className="px-10 py-16 md:px-20 md:py-24 flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-[2px] w-10 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                  <span className="text-[11px] text-emerald-500 font-black uppercase tracking-[0.4em]">Official VIP Experience</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter mb-6 shining-text">
                  Elite Hospitality
                </h2>
                <p className="text-slate-800 text-lg leading-relaxed max-w-2xl font-bold drop-shadow-sm">
                  The pinnacle of tournament luxury. Secure premium seating, world-class gourmet dining, and exclusive stadium access with our official hospitality programs.
                </p>
              </div>
                <Link to="/hospitality" className="shining-button bg-slate-900 text-white font-black uppercase tracking-[0.3em] px-10 py-5 rounded-xl transition-all shadow-xl shadow-slate-900/10 text-[10px] inline-flex items-center gap-3">
                  Explore Packages
                  <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── TOP STORIES + RANKINGS ──────────────────────────── */}
      <section className="py-24 border-b border-slate-900/5">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Top Stories */}
          <div className="lg:col-span-8">
            <div className="flex justify-between items-end mb-12">
              <div>
                <div className="text-[11px] text-slate-800 font-black uppercase tracking-[0.4em] mb-3">Tournament Intelligence</div>
                <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter shining-text">Breaking Coverage</h2>
              </div>
              {/* Removed See all button */}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Main story */}
              <div className="glass-card overflow-hidden cursor-pointer relative min-h-[440px] md:col-span-2 group border-white/60 shadow-2xl">
                <img src="https://picsum.photos/seed/worldcup1974/1200/800" alt="Main Story" className="w-full h-full object-cover opacity-30 absolute inset-0 group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-12">
                  <div className="text-[11px] text-emerald-500 font-black uppercase tracking-[0.3em] mb-4">1974 FIFA World Cup Germany™</div>
                  <h3 className="text-4xl text-slate-900 font-black leading-[1.1] uppercase tracking-tighter mb-4 group-hover:shining-text transition-all">Watch: The Flying Dutchman drops jaws in Dortmund</h3>
                  <p className="text-slate-800 text-base font-semibold leading-relaxed max-w-xl drop-shadow-sm">Highlights of Johan Cruyff dazzling for the Netherlands in one of the most iconic matches in history.</p>
                </div>
              </div>
            </div>
          </div>

          {/* FIFA/Coca-Cola World Rankings */}
          <div className="lg:col-span-4">
            <div className="flex justify-between items-start mb-12">
              <div>
                <div className="text-[11px] text-slate-900 font-black uppercase tracking-[0.3em] mb-3">Official World Rankings</div>
                <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter shining-text">Global Elite</h2>
              </div>
              <TrendingUp className="w-8 h-8 text-slate-900/10" />
            </div>
            
            <div className="glass-card border-white/60 overflow-hidden mb-8 shadow-2xl">
              {/* Header */}
              <div className="grid grid-cols-[40px_1fr_80px_60px] px-6 py-4 bg-white/20 border-b border-white/40">
                {['#', 'Team', 'Pts', '+/-'].map(h => (
                  <div key={h} className="text-[10px] font-black text-slate-900/40 uppercase tracking-[0.3em]">{h}</div>
                ))}
              </div>
              {/* Rows */}
              <div className="divide-y divide-white/5">
                {rankings.map((r, i) => (
                  <div key={i} className="grid grid-cols-[40px_1fr_80px_60px] px-6 py-5 items-center hover:bg-white/40 transition-colors">
                    <div className="text-sm font-black text-slate-900 font-mono-data">{r.pos}</div>
                    <div className="flex items-center gap-3">
                      <span className="text-xl drop-shadow-sm">{r.flag}</span>
                      <span className="text-[11px] font-black text-slate-900 uppercase tracking-widest">{r.name}</span>
                    </div>
                    <div className="text-[11px] font-black text-slate-900/80 font-mono-data">{r.pts}</div>
                    <div className={`text-[10px] font-black ${r.change.startsWith('+') ? 'text-emerald-500' : r.change === '0' ? 'text-slate-900/20' : 'text-rose-500'}`}>
                      {r.change.startsWith('+') ? '▲' : r.change === '0' ? '—' : '▼'} {r.change.replace(/[+-]/, '')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* ✅ AGENT: Changed to active Link for Rankings */}
            <Link to="/rankings" className="w-full mt-4 flex justify-center py-4 bg-slate-900/5 hover:bg-slate-900/10 text-slate-900 font-black uppercase tracking-[0.2em] text-[10px] rounded-xl transition-all border border-slate-900/5">
              Explore Full Rankings
            </Link>
          </div>
        </div>
      </section>

      {/* ── LATEST NEWS ─────────────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <div className="text-[11px] text-slate-800 font-black uppercase tracking-[0.3em] mb-3">Breaking Stories</div>
              <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter shining-text">Tournament Updates</h2>
            </div>
            {/* ✅ AGENT: Restored All News navigation */}
            <Link to="/news" className="group flex items-center gap-3 bg-slate-900/5 hover:bg-slate-900/10 px-6 py-3 rounded-xl transition-all border border-slate-900/5">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900">All News</span>
              <ChevronRight className="w-4 h-4 text-emerald-500 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {news.map((n, i) => (
              <div key={i} className="group glass-card glass-card-hover cursor-pointer flex flex-col">
                <div className="h-56 overflow-hidden relative">
                  <img src={`https://picsum.photos/seed/${n.seed}wc26/600/400`} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80" />
                  <div className="absolute top-6 left-6 bg-slate-50/80 text-slate-900 text-[9px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest backdrop-blur-md border border-slate-900/10">{n.cat}</div>
                </div>
                <div className="p-8 flex-grow flex flex-col">
                  <h4 className="text-lg font-extrabold text-slate-900 leading-tight mb-6 group-hover:shining-text transition-all uppercase tracking-tight">{n.title}</h4>
                  <div className="mt-auto flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-slate-900/20" />
                    <span className="text-[10px] text-slate-900/40 font-bold uppercase tracking-widest">{n.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TOURNAMENT STATS ────────────────────────────────── */}
      <section className="py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center mb-20">
            <div className="text-[11px] text-emerald-500 font-black uppercase tracking-[0.4em] mb-4">By The Numbers</div>
            <h2 className="text-5xl md:text-7xl font-black text-slate-900 uppercase tracking-tighter shining-text">World's Best on Show</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { n: '48', l: 'Nations', sub: 'First 48-team World Cup ever' },
              { n: '104', l: 'Matches', sub: 'Most matches in history' },
              { n: '16', l: 'Host Cities', sub: 'Across 3 nations' },
              { n: '39', l: 'Days', sub: 'Jun 11 – Jul 19, 2026' },
            ].map((s, i) => (
              <div key={i} className="text-center p-12 glass-card border-white/60 shadow-2xl group hover:bg-white transition-all active:scale-95">
                <div className="text-7xl md:text-8xl font-black text-slate-900 leading-none mb-6 tracking-tighter group-hover:shining-text transition-all">{s.n}</div>
                <div className="text-[13px] font-black text-emerald-500 uppercase tracking-[0.3em] mb-4">{s.l}</div>
                <div className="text-[11px] text-slate-900/60 font-black uppercase tracking-widest leading-relaxed drop-shadow-sm">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER INFO ─────────────────────────────────────── */}
      <footer className="border-t border-slate-900/5 py-16 bg-slate-900/5 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-6">
            <Globe className="w-6 h-6 text-slate-900" />
            <span className="text-[11px] font-black uppercase tracking-widest text-slate-900">FIFA World Cup 26™ Official Platform</span>
          </div>
          <div className="flex gap-8">
            <Link to="/privacy-policy" className="text-[10px] font-bold uppercase tracking-widest text-slate-900/40 hover:text-slate-900 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-[10px] font-bold uppercase tracking-widest text-slate-900/40 hover:text-slate-900 transition-colors">Terms of Service</Link>
            <Link to="/cookie-settings" className="text-[10px] font-bold uppercase tracking-widest text-slate-900/40 hover:text-slate-900 transition-colors">Cookie Settings</Link>
            <Link to="/support" className="text-[10px] font-bold uppercase tracking-widest text-slate-900/40 hover:text-slate-900 transition-colors">Contact Us</Link>
          </div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-slate-900/20">
            © 2026 FIFA. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
