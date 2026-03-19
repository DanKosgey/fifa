import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, MapPin, Calendar, ChevronRight, ShieldCheck, Globe, Info, Ticket, Star, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const Home = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [activeSlide, setActiveSlide] = useState(0);
  const [filterDate, setFilterDate] = useState('All');
  const [filterGroup, setFilterGroup] = useState('All');
  const [filterCity, setFilterCity] = useState('All');

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
      tag: 'WE ARE 26',
      headline: 'The Largest\nWorld Cup Ever',
      sub: '48 teams. 104 matches. 3 host nations. The beautiful game on its biggest stage.',
      accent: '#10B981', // Emerald 500
      gradient: 'from-emerald-500/20 to-blue-600/20'
    },
    {
      tag: 'HOST CITIES',
      headline: '16 Cities.\nOne Dream.',
      sub: 'From Vancouver to Mexico City, North America is ready to welcome the world.',
      accent: '#F43F5E', // Rose 500
      gradient: 'from-rose-500/20 to-indigo-600/20'
    },
    {
      tag: 'DEFENDING CHAMPIONS',
      headline: 'Argentina Begin\nTitle Defense',
      sub: 'La Albiceleste look to become the first back-to-back World Cup champions since Brazil in 1962.',
      accent: '#0EA5E9', // Sky 500
      gradient: 'from-sky-500/20 to-emerald-600/20'
    },
    {
      tag: 'THE FINAL',
      headline: 'New York\nNew Jersey',
      sub: 'MetLife Stadium will host the historic FIFA World Cup 26™ Final on July 19, 2026.',
      accent: '#8B5CF6', // Violet 500
      gradient: 'from-violet-500/20 to-rose-600/20'
    },
  ];

  const matches = [
    { date: 'THU 11 JUN 2026', time: '19:00', group: 'GROUP A · MATCH 1', home: 'Mexico', homeCode: 'MEX', homeFlag: 'https://flagcdn.com/w160/mx.png', away: 'South Africa', awayCode: 'RSA', awayFlag: 'https://flagcdn.com/w160/za.png', venue: 'Estadio Azteca', city: 'Mexico City' },
    { date: 'FRI 12 JUN 2026', time: '15:00', group: 'GROUP B · MATCH 1', home: 'USA', homeCode: 'USA', homeFlag: 'https://flagcdn.com/w160/us.png', away: 'Paraguay', awayCode: 'PAR', awayFlag: 'https://flagcdn.com/w160/py.png', venue: 'SoFi Stadium', city: 'Los Angeles' },
    { date: 'FRI 12 JUN 2026', time: '18:00', group: 'GROUP C · MATCH 1', home: 'Canada', homeCode: 'CAN', homeFlag: 'https://flagcdn.com/w160/ca.png', away: 'UEFA PO', awayCode: 'TBD', awayFlag: '', venue: 'BMO Field', city: 'Toronto' },
    { date: 'SAT 13 JUN 2026', time: '12:00', group: 'GROUP D · MATCH 1', home: 'Brazil', homeCode: 'BRA', homeFlag: 'https://flagcdn.com/w160/br.png', away: 'TBD', awayCode: 'TBD', awayFlag: '', venue: 'AT&T Stadium', city: 'Dallas' },
    { date: 'SAT 13 JUN 2026', time: '15:00', group: 'GROUP E · MATCH 1', home: 'France', homeCode: 'FRA', homeFlag: 'https://flagcdn.com/w160/fr.png', away: 'TBD', awayCode: 'TBD', awayFlag: '', venue: 'MetLife Stadium', city: 'New York/New Jersey' },
    { date: 'SUN 14 JUN 2026', time: '12:00', group: 'GROUP F · MATCH 1', home: 'Argentina', homeCode: 'ARG', homeFlag: 'https://flagcdn.com/w160/ar.png', away: 'TBD', awayCode: 'TBD', awayFlag: '', venue: 'Hard Rock Stadium', city: 'Miami' },
    { date: 'SUN 14 JUN 2026', time: '18:00', group: 'GROUP A · MATCH 2', home: 'Mexico', homeCode: 'MEX', homeFlag: 'https://flagcdn.com/w160/mx.png', away: 'TBD', awayCode: 'TBD', awayFlag: '', venue: 'Estadio Akron', city: 'Guadalajara' },
    { date: 'MON 15 JUN 2026', time: '15:00', group: 'GROUP B · MATCH 2', home: 'USA', homeCode: 'USA', homeFlag: 'https://flagcdn.com/w160/us.png', away: 'TBD', awayCode: 'TBD', awayFlag: '', venue: 'Lumen Field', city: 'Seattle' },
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

  const rankings = [
    { pos: 1, name: 'Spain', flag: '🇪🇸', pts: '1927.38', change: '+5' },
    { pos: 2, name: 'Argentina', flag: '🇦🇷', pts: '1873.35', change: '-2' },
    { pos: 3, name: 'France', flag: '🇫🇷', pts: '1851.93', change: '+1' },
    { pos: 4, name: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', pts: '1824.73', change: '-1' },
    { pos: 5, name: 'Brazil', flag: '🇧🇷', pts: '1782.46', change: '0' },
  ];

  const news = [
    { cat: 'QUALIFICATION', title: 'Only Six Spots Remain: The Nations Still Fighting for 2026', seed: 'qualify', time: '2h ago' },
    { cat: 'TEAMS', title: 'Debutants Ready to Shine: Cape Verde, Curaçao, Jordan & Uzbekistan', seed: 'debut', time: '4h ago' },
    { cat: 'VENUES', title: 'MetLife Stadium Prepares for the Most-Watched Final in History', seed: 'stadium', time: '6h ago' },
    { cat: 'FEATURES', title: '28 Superstars: Cristiano Ronaldo\'s World Cup Legacy Explored', seed: 'ronaldo', time: '8h ago' },
  ];

  const slide = heroSlides[activeSlide];

  return (
    <div className="min-h-screen font-sans text-slate-900">
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
                className="absolute -right-20 top-1/2 -translate-y-1/2 h-[110%] w-auto object-contain opacity-50 pointer-events-none z-0 select-none brightness-110" 
                referrerPolicy="no-referrer"
              />
              <div className="relative z-10">
                <div 
                  className="inline-block text-slate-900 text-[11px] font-black tracking-[0.3em] uppercase px-4 py-2 rounded-lg mb-8 border border-slate-900/10 backdrop-blur-md bg-slate-900/5"
                  style={{ borderColor: `${slide.accent}40` }}
                >
                  {slide.tag}
                </div>
                <h1 className="text-6xl md:text-8xl font-black text-slate-900 leading-[0.88] mb-8 uppercase tracking-tighter whitespace-pre-line shining-text">
                  {slide.headline}
                </h1>
                <p className="text-lg text-slate-900/60 mb-12 leading-relaxed max-w-md font-medium">
                  {slide.sub}
                </p>
                {/* Removed Explore More and Match Centre buttons */}
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
                    className="absolute inset-0 bg-slate-900/10 rounded-[2rem] z-0 border border-slate-900/20 shadow-[0_0_40px_rgba(255,255,255,0.05)]"
                    transition={{ type: "spring", bounce: 0.15, duration: 0.6 }}
                  />
                )}
                
                <div className={`relative z-10 h-full w-full rounded-[2rem] overflow-hidden flex flex-col justify-end p-8 transition-all duration-500 border ${i === activeSlide ? 'border-transparent' : 'border-slate-900/5 opacity-50 hover:opacity-100'}`}>
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
              <div className="text-[11px] text-slate-900/40 font-black uppercase tracking-[0.3em] mb-3">FIFA World Cup 26™</div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter shining-text">The Stage Is Set</h2>
            </div>
            {/* Removed All Matches link */}
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
                className="w-full pl-11 pr-4 py-4 bg-slate-900/5 border border-slate-900/10 rounded-xl text-[11px] font-black uppercase tracking-widest text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/5 focus:border-slate-900/40 transition-all appearance-none shadow-sm backdrop-blur-md"
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
                className="w-full pl-11 pr-4 py-4 bg-slate-900/5 border border-slate-900/10 rounded-xl text-[11px] font-black uppercase tracking-widest text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/5 focus:border-slate-900/40 transition-all appearance-none shadow-sm backdrop-blur-md"
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
                className="w-full pl-11 pr-4 py-4 bg-slate-900/5 border border-slate-900/10 rounded-xl text-[11px] font-black uppercase tracking-widest text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/5 focus:border-slate-900/40 transition-all appearance-none shadow-sm backdrop-blur-md"
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
                  <div className="px-6 py-4 border-b border-slate-900/5 flex justify-between items-center bg-slate-900/5">
                    <span className="text-[10px] font-black text-slate-900/40 uppercase tracking-widest">{m.group}</span>
                    <span className="text-[10px] font-bold text-slate-900/40 uppercase tracking-widest">{m.date}</span>
                  </div>

                  <div className="p-8 flex-grow flex flex-col justify-center items-center gap-8 relative overflow-hidden">
                    <div className="absolute inset-0 bg-slate-900/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="flex items-center justify-between w-full relative z-10">
                      <div className="flex flex-col items-center gap-3 w-[40%]">
                        <div className="w-14 h-10 rounded-lg shadow-md overflow-hidden border border-slate-900/10 bg-slate-900/5 p-0.5 group-hover:scale-110 transition-transform">
                          <img src={m.homeFlag} alt={m.homeCode} className="w-full h-full object-cover rounded" />
                        </div>
                        <span className="text-2xl font-black text-slate-900 tracking-tighter uppercase">{m.homeCode}</span>
                      </div>

                      <div className="flex flex-col items-center gap-2">
                        <span className="text-[10px] font-black text-slate-900/10 uppercase tracking-widest italic">VS</span>
                        <div className="px-3 py-1 bg-slate-900/10 text-slate-900 text-[10px] font-black uppercase tracking-widest rounded-full border border-slate-900/10">
                          {m.time}
                        </div>
                      </div>

                      <div className="flex flex-col items-center gap-3 w-[40%]">
                        <div className="w-14 h-10 rounded-lg shadow-md overflow-hidden border border-slate-900/10 bg-slate-900/5 p-0.5 group-hover:scale-110 transition-transform">
                          {m.awayFlag ? <img src={m.awayFlag} alt={m.awayCode} className="w-full h-full object-cover rounded" /> : <div className="w-full h-full bg-slate-900/5 flex items-center justify-center"><ShieldCheck className="w-4 h-4 text-slate-900/10" /></div>}
                        </div>
                        <span className="text-2xl font-black text-slate-900 tracking-tighter uppercase">{m.awayCode}</span>
                      </div>
                    </div>
                  </div>

                  <div className="px-6 py-4 bg-slate-900/5 border-t border-slate-900/5 flex items-center justify-between">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <MapPin className="w-3.5 h-3.5 text-slate-900/40 flex-shrink-0" />
                      <span className="text-[10px] font-bold text-slate-900/60 uppercase tracking-widest truncate">{m.venue}</span>
                    </div>
                    <span className="text-[10px] font-black text-slate-900/40 uppercase tracking-widest flex-shrink-0 ml-4">{m.city}</span>
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
              {/* Removed Reset Filters button */}
            </div>
          )}
        </div>
      </section>

      {/* ── HOSPITALITY BANNER ──────────────────────────────── */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="bg-slate-900/5 backdrop-blur-xl rounded-[2.5rem] overflow-hidden relative shadow-2xl border border-slate-900/10">
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
                  <span className="text-[11px] text-emerald-500 font-black uppercase tracking-[0.4em]">VIP Experience</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter mb-6 shining-text">
                  Official Hospitality
                </h2>
                <p className="text-slate-900/40 text-lg leading-relaxed max-w-2xl font-medium">
                  Elevate your FIFA World Cup 26™ experience. Secure premium seating, world-class dining, and exclusive access with our official hospitality packages.
                </p>
              </div>
              {/* Removed Explore Packages button */}
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
                <div className="text-[11px] text-slate-900/40 font-black uppercase tracking-[0.3em] mb-3">Latest Updates</div>
                <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter shining-text">Top Stories</h2>
              </div>
              {/* Removed See all button */}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Main story */}
              <div className="rounded-[2rem] overflow-hidden cursor-pointer bg-slate-900/5 relative min-h-[440px] md:col-span-2 group border border-slate-900/10 backdrop-blur-md">
                <img src="https://picsum.photos/seed/worldcup1974/1200/800" alt="Main Story" className="w-full h-full object-cover opacity-30 absolute inset-0 group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-10">
                  <div className="text-[11px] text-emerald-400 font-black uppercase tracking-[0.2em] mb-4">1974 FIFA World Cup Germany™</div>
                  <h3 className="text-4xl text-slate-900 font-black leading-[1.1] uppercase tracking-tight mb-4 group-hover:shining-text transition-all">Watch: The Flying Dutchman drops jaws in Dortmund</h3>
                  <p className="text-slate-900/60 text-base font-medium leading-relaxed max-w-xl">Highlights of Johan Cruyff dazzling for the Netherlands in one of the most iconic matches in history.</p>
                </div>
              </div>
            </div>
          </div>

          {/* FIFA/Coca-Cola World Rankings */}
          <div className="lg:col-span-4">
            <div className="flex justify-between items-start mb-12">
              <div>
                <div className="text-[11px] text-slate-900/40 font-black uppercase tracking-[0.3em] mb-3">FIFA/Coca-Cola</div>
                <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter shining-text">Rankings</h2>
              </div>
              <TrendingUp className="w-8 h-8 text-slate-900/10" />
            </div>
            
            <div className="glass-card overflow-hidden mb-8">
              {/* Header */}
              <div className="grid grid-cols-[40px_1fr_80px_60px] px-6 py-4 bg-slate-900/5 border-b border-slate-900/10">
                {['#', 'Team', 'Pts', '+/-'].map(h => (
                  <div key={h} className="text-[10px] font-black text-slate-900/40 uppercase tracking-widest">{h}</div>
                ))}
              </div>
              {/* Rows */}
              <div className="divide-y divide-white/5">
                {rankings.map((r, i) => (
                  <div key={i} className="grid grid-cols-[40px_1fr_80px_60px] px-6 py-5 items-center hover:bg-slate-900/5 transition-colors">
                    <div className="text-sm font-black text-slate-900 font-mono-data">{r.pos}</div>
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{r.flag}</span>
                      <span className="text-[11px] font-black text-slate-900 uppercase tracking-widest">{r.name}</span>
                    </div>
                    <div className="text-[11px] font-bold text-slate-900/60 font-mono-data">{r.pts}</div>
                    <div className={`text-[10px] font-black ${r.change.startsWith('+') ? 'text-emerald-500' : r.change === '0' ? 'text-slate-900/20' : 'text-rose-500'}`}>
                      {r.change.startsWith('+') ? '▲' : r.change === '0' ? '—' : '▼'} {r.change.replace(/[+-]/, '')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Removed Full Rankings List button */}
          </div>
        </div>
      </section>

      {/* ── LATEST NEWS ─────────────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <div className="text-[11px] text-slate-900/40 font-black uppercase tracking-[0.3em] mb-3">Global News</div>
              <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter shining-text">Latest Stories</h2>
            </div>
            {/* Removed All News button */}
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
              <div key={i} className="text-center p-10 bg-slate-900/5 backdrop-blur-xl rounded-[2.5rem] border border-slate-900/10 shadow-2xl group hover:bg-slate-900/10 transition-all">
                <div className="text-7xl md:text-8xl font-black text-slate-900 leading-none mb-4 tracking-tighter group-hover:shining-text transition-all">{s.n}</div>
                <div className="text-[13px] font-black text-emerald-500 uppercase tracking-[0.2em] mb-4">{s.l}</div>
                <div className="text-[11px] text-slate-900/40 font-bold uppercase tracking-widest leading-relaxed">{s.sub}</div>
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
            {['Privacy Policy', 'Terms of Service', 'Cookie Settings', 'Contact Us'].map(link => (
              <a key={link} href="#" className="text-[10px] font-bold uppercase tracking-widest text-slate-900/40 hover:text-slate-900 transition-colors">{link}</a>
            ))}
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
