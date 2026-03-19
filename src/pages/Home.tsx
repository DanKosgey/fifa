import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, MapPin, Calendar, ChevronRight, ShieldCheck, Globe } from 'lucide-react';

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
    const t = setInterval(() => setActiveSlide(s => (s + 1) % slidesCount), 5000);
    return () => clearInterval(t);
  }, []);

  const heroSlides = [
    {
      tag: 'WE ARE 26',
      headline: 'The Largest\nWorld Cup Ever',
      sub: '48 teams. 104 matches. 3 host nations. The beautiful game on its biggest stage.',
      accent: '#00FF66',
      gradient: 'from-[#00FF66] to-[#0066FF]'
    },
    {
      tag: 'HOST CITIES',
      headline: '16 Cities.\nOne Dream.',
      sub: 'From Vancouver to Mexico City, North America is ready to welcome the world.',
      accent: '#FF0066',
      gradient: 'from-[#FF0066] to-[#6600FF]'
    },
    {
      tag: 'DEFENDING CHAMPIONS',
      headline: 'Argentina Begin\nTitle Defense',
      sub: 'La Albiceleste look to become the first back-to-back World Cup champions since Brazil in 1962.',
      accent: '#0066FF',
      gradient: 'from-[#0066FF] to-[#00FF66]'
    },
    {
      tag: 'THE FINAL',
      headline: 'New York\nNew Jersey',
      sub: 'MetLife Stadium will host the historic FIFA World Cup 26™ Final on July 19, 2026.',
      accent: '#6600FF',
      gradient: 'from-[#6600FF] to-[#FF0066]'
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

  const topStories = [
    { cat: 'WE ARE 26', title: 'Suker: France \'98 is stitched into my soul', time: '1h ago', seed: 'suker' },
    { cat: 'WE ARE 26', title: '28 Superstars: Cristiano Ronaldo', time: '3h ago', seed: 'cr7' },
    { cat: '1998 FIFA WORLD CUP™', title: 'Bergkamp on his otherworldly goal against Argentina', time: '5h ago', seed: 'bergkamp' },
    { cat: 'FIFA WORLD CUP™', title: 'World Cup wonder goals: Mhbalala electrifies Soccer City', time: '7h ago', seed: 'wonder' },
    { cat: 'WE ARE 26', title: '84 days to go: Rapid Roger raises his record', time: '9h ago', seed: 'rapid' },
  ];

  const tournaments = [
    { title: 'FIFA World Cup 26™', color: '#000000', accent: '#00FF66', emoji: '🏆' },
    { title: 'FIFA World Cup 26™ Play-Off Tournament', color: '#111111', accent: '#FF0066', emoji: '⚽' },
    { title: "FIFA Women's World Cup Brazil 2027™", color: '#000000', accent: '#0066FF', emoji: '🌟' },
  ];

  const slide = heroSlides[activeSlide];

  return (
    <div className="bg-[#f4f5f7] min-h-screen font-['Inter',sans-serif]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@700;800;900&display=swap');
        .font-brand { font-family: 'Poppins', sans-serif; }
        .ticker-wrap { overflow: hidden; white-space: nowrap; }
        .ticker-move { display: inline-flex; gap: 48px; animation: ticker 35s linear infinite; }
        @keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>

      {/* ── LIVE TICKER ─────────────────────────────────────── */}
      <div className="bg-black py-2.5 overflow-hidden border-b border-white/10 font-brand">
        <div className="ticker-wrap">
          <div className="ticker-move">
            {[...Array(2)].map((_, ri) => (
              <React.Fragment key={ri}>
                <span className="text-white text-[13px] font-bold tracking-wide flex items-center">
                  <span className="inline-block w-2 h-2 rounded-full bg-[#00FF66] mr-2 animate-pulse"></span>
                  QUALIFICATION LIVE
                </span>
                <span className="text-white/30 text-[13px]">|</span>
                <span className="text-[#00FF66] text-[13px] font-bold tracking-wide">📅 Jun 11 – Jul 19, 2026</span>
                <span className="text-white/30 text-[13px]">|</span>
                <span className="text-white text-[13px] font-bold tracking-wide">🇲🇽 MEX vs 🇿🇦 RSA — Estadio Azteca — Opening Match</span>
                <span className="text-white/30 text-[13px]">|</span>
                <span className="text-white text-[13px] font-bold tracking-wide">🇺🇸 USA vs 🇵🇾 PAR — SoFi Stadium, Los Angeles</span>
                <span className="text-white/30 text-[13px]">|</span>
                <span className="text-white text-[13px] font-bold tracking-wide">🇨🇦 CAN vs UEFA Playoff — BMO Field, Toronto</span>
                <span className="text-white/30 text-[13px]">|</span>
                <span className="text-white text-[13px] font-bold tracking-wide">🏆 Defending Champions: 🇦🇷 Argentina</span>
                <span className="text-white/30 text-[13px]">|</span>
                <span className="text-white text-[13px] font-bold tracking-wide">⚽ 48 Teams · 104 Matches · 16 Cities</span>
                <span className="text-white/30 text-[13px]">|</span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* ── HERO SLIDER ─────────────────────────────────────── */}
      <section className="relative min-h-[560px] overflow-hidden transition-all duration-700 ease-in-out flex items-center bg-black">
        {/* Dynamic colorful background glow based on active slide */}
        <div className={`absolute inset-0 opacity-40 bg-gradient-to-br ${slide.gradient} blur-[120px] pointer-events-none transition-all duration-1000`} />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.15] pointer-events-none" 
             style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 py-16">
          {/* Left Content */}
          <div key={activeSlide} className="animate-in fade-in slide-in-from-bottom-4 duration-700 relative">
            <img src="https://www.gettickets365.com/assets/img/banners/fwc2026.png" alt="World Cup Trophy" className="absolute -right-10 -top-20 h-[500px] w-auto object-contain opacity-80 pointer-events-none z-0" />
            <div className="relative z-10">
              <div 
                className="inline-block text-black text-[13px] font-black tracking-[0.2em] uppercase px-4 py-1.5 rounded-sm mb-6 font-brand"
                style={{ background: slide.accent }}
              >
                {slide.tag}
              </div>
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[0.95] mb-6 uppercase tracking-tighter font-brand whitespace-pre-line">
                {slide.headline}
              </h1>
              <p className="text-lg text-white/80 mb-10 leading-relaxed max-w-md font-medium">
                {slide.sub}
              </p>
              <div className="flex flex-wrap gap-4 font-brand">
                <button 
                  className="text-black px-8 py-4 text-[15px] font-black rounded-sm uppercase tracking-widest transition-transform hover:scale-105"
                  style={{ background: slide.accent }}
                >
                  Read More
                </button>
                <Link 
                  to="/fixtures"
                  className="bg-transparent text-white border-2 border-white/40 px-8 py-4 text-[15px] font-black rounded-sm uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
                >
                  View Matches
                </Link>
              </div>
            </div>
          </div>

          {/* Right side: mini news thumbnails */}
          <div className="grid grid-cols-2 gap-4 lg:gap-5">
            {heroSlides.map((s, i) => (
              <div 
                key={i} 
                onClick={() => setActiveSlide(i)} 
                className={`rounded-xl overflow-hidden cursor-pointer relative h-[140px] flex flex-col justify-end p-4 transition-all duration-300 border-2 bg-black ${i === activeSlide ? 'scale-105 shadow-2xl' : 'border-transparent hover:border-white/30'}`}
                style={{ borderColor: i === activeSlide ? slide.accent : undefined }}
              >
                <div className={`absolute inset-0 opacity-30 bg-gradient-to-br ${s.gradient}`} />
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative z-10 font-brand">
                  <div className="text-[11px] text-white/70 font-black uppercase tracking-widest mb-1.5" style={{ color: i === activeSlide ? slide.accent : undefined }}>{s.tag}</div>
                  <div className="text-[16px] text-white font-black leading-tight uppercase">{s.headline.split('\n')[0]}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Slide dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {heroSlides.map((_, i) => (
            <button 
              key={i} 
              onClick={() => setActiveSlide(i)} 
              className={`h-2.5 rounded-full transition-all duration-300 ${i === activeSlide ? 'w-10' : 'w-2.5 bg-white/40 hover:bg-white/60'}`}
              style={{ background: i === activeSlide ? slide.accent : undefined }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ── STAGE IS SET: UPCOMING MATCHES ──────────────────── */}
      <section className="bg-[#f4f5f7] py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-8 font-brand gap-4">
            <div>
              <div className="text-[12px] text-gray-500 font-bold uppercase tracking-[0.2em] mb-2">FIFA World Cup 26™</div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 uppercase tracking-tight">The Stage Is Set</h2>
            </div>
            <Link to="/fixtures" className="text-indigo-600 text-[13px] font-bold uppercase tracking-[0.15em] flex items-center gap-1 hover:text-indigo-800 transition-colors pb-1">
              All Matches <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <select 
              value={filterDate} 
              onChange={(e) => setFilterDate(e.target.value)}
              className="bg-white border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-3 font-medium shadow-sm outline-none"
            >
              {uniqueDates.map(d => <option key={d} value={d}>{d === 'All' ? 'All Dates' : d}</option>)}
            </select>
            <select 
              value={filterGroup} 
              onChange={(e) => setFilterGroup(e.target.value)}
              className="bg-white border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-3 font-medium shadow-sm outline-none"
            >
              {uniqueGroups.map(g => <option key={g} value={g}>{g === 'All' ? 'All Groups' : g}</option>)}
            </select>
            <select 
              value={filterCity} 
              onChange={(e) => setFilterCity(e.target.value)}
              className="bg-white border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-3 font-medium shadow-sm outline-none"
            >
              {uniqueCities.map(c => <option key={c} value={c}>{c === 'All' ? 'All Cities' : c}</option>)}
            </select>
          </div>

          {filteredMatches.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredMatches.map((m, i) => {
              const neonColors = ['#00FF66', '#FF0066', '#0066FF', '#6600FF'];
              const accentColor = neonColors[i % neonColors.length];
              
              return (
                <div key={i} className="bg-black rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 group flex flex-col relative border border-gray-800 cursor-pointer">
                  {/* Top Accent Line */}
                  <div className="h-1.5 w-full" style={{ backgroundColor: accentColor }} />
                  
                  {/* Header */}
                  <div className="px-6 py-4 flex justify-between items-center border-b border-white/10 bg-white/5">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.5)]" style={{ backgroundColor: accentColor }} />
                      <span className="text-[11px] font-black text-white uppercase tracking-widest font-brand">{m.group}</span>
                    </div>
                    <span className="text-[11px] font-bold text-gray-400 tracking-wider">{m.date}</span>
                  </div>

                  {/* Body */}
                  <div className="p-6 flex-grow flex flex-col justify-center relative overflow-hidden">
                    {/* Subtle glow behind teams */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 blur-[50px] opacity-20 rounded-full pointer-events-none transition-opacity duration-500 group-hover:opacity-40" style={{ backgroundColor: accentColor }}></div>
                    
                    <div className="flex items-center justify-between relative z-10">
                      {/* Home */}
                      <div className="flex flex-col items-center w-[35%]">
                        <div className="w-16 h-12 rounded-lg shadow-lg overflow-hidden mb-4 border border-white/10 bg-gray-900 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                          {m.homeFlag ? <img src={m.homeFlag} alt={m.homeCode} className="w-full h-full object-cover" /> : <span className="text-gray-600 font-bold">?</span>}
                        </div>
                        <span className="text-3xl font-black text-white font-brand uppercase leading-none mb-1">{m.homeCode}</span>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center leading-tight">{m.home}</span>
                      </div>

                      {/* Center */}
                      <div className="flex flex-col items-center w-[30%] px-2">
                        <div className="text-[11px] font-black text-gray-500 mb-2 font-brand uppercase tracking-widest">VS</div>
                        <div className="bg-white text-black px-4 py-1.5 rounded-sm text-[13px] font-black tracking-widest shadow-sm">
                          {m.time}
                        </div>
                        <div className="text-[9px] font-bold text-gray-500 uppercase tracking-[0.2em] mt-2">Local</div>
                      </div>

                      {/* Away */}
                      <div className="flex flex-col items-center w-[35%]">
                        <div className="w-16 h-12 rounded-lg shadow-lg overflow-hidden mb-4 border border-white/10 bg-gray-900 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                          {m.awayFlag ? <img src={m.awayFlag} alt={m.awayCode} className="w-full h-full object-cover" /> : <ShieldCheck className="w-5 h-5 text-gray-600" />}
                        </div>
                        <span className="text-3xl font-black text-white font-brand uppercase leading-none mb-1">{m.awayCode}</span>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center leading-tight">{m.away === 'TBD' ? 'To Be Decided' : m.away}</span>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="px-6 py-4 bg-white/5 border-t border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-[11px] font-bold text-white uppercase tracking-wide truncate max-w-[120px]">{m.venue}</span>
                    </div>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{m.city}</span>
                  </div>
                </div>
              );
            })}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-200 shadow-sm">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-2 font-brand">No Matches Found</h3>
              <p className="text-gray-500 font-medium mb-6">We couldn't find any matches matching your selected filters.</p>
              <button 
                onClick={() => { setFilterDate('All'); setFilterGroup('All'); setFilterCity('All'); }} 
                className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wider hover:bg-indigo-700 transition-colors shadow-sm"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── HOSPITALITY BANNER ──────────────────────────────── */}
      <section className="py-12 bg-[#f4f5f7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#0a0a0a] rounded-3xl overflow-hidden relative shadow-2xl border border-gray-800">
            {/* Subtle gold/premium gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/10 via-transparent to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-[#d4af37]/5 to-transparent pointer-events-none" />
            <img src="https://www.gettickets365.com/assets/img/banners/fwc2026.png" alt="World Cup Trophy" className="absolute right-10 top-1/2 -translate-y-1/2 h-[120%] w-auto object-contain opacity-50 pointer-events-none z-0" />
            
            <div className="px-8 py-12 md:px-12 md:py-16 flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-[1px] w-8 bg-[#d4af37]"></div>
                  <span className="text-[11px] text-[#d4af37] font-bold uppercase tracking-[0.3em]">VIP Experience</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-4 font-brand">
                  Official Hospitality
                </h2>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-2xl font-medium">
                  Elevate your FIFA World Cup 26™ experience. Secure premium seating, world-class dining, and exclusive access with our official hospitality packages.
                </p>
              </div>
              <div className="flex-shrink-0">
                <button className="bg-[#d4af37] text-black px-8 py-4 text-[13px] font-black rounded-sm uppercase tracking-[0.15em] hover:bg-white transition-colors shadow-[0_0_20px_rgba(212,175,55,0.2)] font-brand">
                  Explore Packages
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TOP STORIES + RANKINGS ──────────────────────────── */}
      <section className="py-16 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12">
          
          {/* Top Stories */}
          <div>
            <div className="flex justify-between items-end mb-8 font-brand">
              <h2 className="text-4xl font-black text-black uppercase tracking-tighter">Top Stories</h2>
              <button className="text-black text-[14px] font-black uppercase tracking-widest hover:text-[#0066FF] transition-colors">See all ›</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-6">
              {/* Main story */}
              <div className="rounded-2xl overflow-hidden cursor-pointer bg-black relative min-h-[360px] md:row-span-2 group">
                <img src="https://picsum.photos/seed/worldcup1974/600/400" alt="Main Story" className="w-full h-full object-cover opacity-60 absolute inset-0 group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 font-brand">
                  <div className="text-[12px] text-[#00FF66] font-black uppercase tracking-widest mb-3">1974 FIFA World Cup Germany™</div>
                  <div className="text-3xl text-white font-black leading-tight uppercase">Watch: The Flying Dutchman drops jaws in Dortmund</div>
                  <div className="text-[15px] text-white/80 mt-3 font-semibold font-sans">Highlights of Johan Cruyff dazzling for the Netherlands</div>
                </div>
              </div>
              
              {/* Side stories */}
              <div className="flex flex-col gap-3">
                {topStories.slice(0, 4).map((s, i) => (
                  <div key={i} className="flex gap-4 cursor-pointer p-3 rounded-xl hover:bg-gray-50 transition-colors group border border-transparent hover:border-gray-100">
                    <img src={`https://picsum.photos/seed/${s.seed}/100/80`} alt="" className="w-24 h-20 object-cover rounded-lg flex-shrink-0" />
                    <div className="flex flex-col justify-center">
                      <div className="text-[11px] text-[#0066FF] font-black uppercase tracking-widest mb-1.5 font-brand">{s.cat}</div>
                      <div className="text-[15px] text-black font-bold leading-snug group-hover:text-[#0066FF] transition-colors">{s.title}</div>
                      <div className="text-[12px] text-gray-500 font-medium mt-2 flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {s.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* FIFA/Coca-Cola World Rankings */}
          <div>
            <div className="flex justify-between items-center mb-3 font-brand">
              <div>
                <div className="text-[12px] text-gray-500 font-black uppercase tracking-widest">FIFA/Coca-Cola</div>
                <h2 className="text-3xl font-black text-black uppercase tracking-tighter">World Rankings</h2>
              </div>
              <div className="text-4xl">🥤</div>
            </div>
            <div className="text-[13px] text-gray-500 font-semibold mb-6 font-brand">Latest Official Men's World Ranking</div>
            
            <div className="border-2 border-gray-100 rounded-2xl overflow-hidden mb-6">
              {/* Header */}
              <div className="grid grid-cols-[40px_1fr_80px_50px] px-5 py-3.5 bg-gray-50 border-b-2 border-gray-100 font-brand">
                {['#', 'Team', 'Points', '+/-'].map(h => (
                  <div key={h} className="text-[12px] font-black text-gray-500 uppercase tracking-widest">{h}</div>
                ))}
              </div>
              {/* Rows */}
              <div className="bg-white">
                {rankings.map((r, i) => (
                  <div key={i} className={`grid grid-cols-[40px_1fr_80px_50px] px-5 py-4 items-center hover:bg-gray-50 transition-colors ${i < rankings.length - 1 ? 'border-b border-gray-100' : ''}`}>
                    <div className="text-[16px] font-black text-black font-brand">{r.pos}</div>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{r.flag}</span>
                      <span className="text-[15px] font-bold text-black font-brand uppercase">{r.name}</span>
                    </div>
                    <div className="text-[14px] font-semibold text-gray-600">{r.pts}</div>
                    <div className={`text-[14px] font-black font-brand ${r.change.startsWith('+') ? 'text-[#00FF66]' : r.change === '0' ? 'text-gray-400' : 'text-[#FF0066]'}`}>
                      {r.change.startsWith('+') ? '▲' : r.change === '0' ? '—' : '▼'} {r.change.replace(/[+-]/, '')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button className="w-full bg-black text-white py-4 text-[14px] font-black rounded-sm uppercase tracking-widest hover:bg-[#0066FF] transition-colors font-brand">
              Follow Live Rankings ›
            </button>
          </div>
        </div>
      </section>

      {/* ── LATEST NEWS ─────────────────────────────────────── */}
      <section className="py-16 bg-[#f4f5f7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10 font-brand">
            <div>
              <h2 className="text-4xl font-black text-black uppercase tracking-tighter">Latest News</h2>
              <div className="w-16 h-1.5 bg-[#00FF66] mt-3" />
            </div>
            <button className="text-black text-[14px] font-black uppercase tracking-widest hover:text-[#0066FF] transition-colors">All News ›</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {news.map((n, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden cursor-pointer border-2 border-transparent hover:border-black hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className="h-48 overflow-hidden relative">
                  <img src={`https://picsum.photos/seed/${n.seed}wc26/400/300`} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 left-4 bg-black text-white text-[11px] font-black px-3 py-1.5 rounded-sm uppercase tracking-widest font-brand">{n.cat}</div>
                </div>
                <div className="p-6">
                  <div className="text-[17px] font-bold text-black leading-snug mb-4 group-hover:text-[#0066FF] transition-colors">{n.title}</div>
                  <div className="text-[13px] text-gray-500 font-medium flex items-center gap-1.5"><Clock className="w-4 h-4" /> {n.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TOURNAMENT STATS ────────────────────────────────── */}
      <section className="bg-black py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#6600FF]/20 via-[#FF0066]/20 to-[#00FF66]/20 blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 font-brand">
            <div className="text-[14px] text-[#00FF66] font-black uppercase tracking-[0.2em] mb-3">By The Numbers</div>
            <h2 className="text-5xl md:text-6xl font-black text-white uppercase tracking-tighter">World's Best on Show</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-1 bg-white/5 rounded-3xl overflow-hidden border border-white/10 p-1">
            {[
              { n: '48', l: 'Nations', sub: 'First 48-team World Cup ever' },
              { n: '104', l: 'Matches', sub: 'Most matches in history' },
              { n: '16', l: 'Host Cities', sub: 'Across 3 nations' },
              { n: '39', l: 'Days', sub: 'Jun 11 – Jul 19, 2026' },
            ].map((s, i) => (
              <div key={i} className="text-center py-12 px-6 bg-black/60 backdrop-blur-md font-brand rounded-2xl">
                <div className="text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500 leading-none mb-3">{s.n}</div>
                <div className="text-[18px] font-black text-[#00FF66] uppercase tracking-widest mb-2">{s.l}</div>
                <div className="text-[14px] text-white/60 font-medium font-sans">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── UPCOMING TOURNAMENTS ────────────────────────────── */}
      <section className="py-16 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10 font-brand">
            <h2 className="text-4xl font-black text-black uppercase tracking-tighter">Upcoming Tournaments</h2>
            <button className="text-black text-[14px] font-black uppercase tracking-widest hover:text-[#0066FF] transition-colors">See All ›</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tournaments.map((t, i) => (
              <div key={i} className="rounded-2xl overflow-hidden cursor-pointer relative h-[240px] group bg-black">
                <div className="absolute inset-0 opacity-40 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-60" style={{ background: `radial-gradient(circle at top right, ${t.accent}, transparent 70%)` }} />
                <div className="absolute inset-0 flex flex-col justify-between p-8 z-10 font-brand">
                  <div className="text-6xl leading-none">{t.emoji}</div>
                  <div>
                    <div className="inline-block text-black text-[11px] font-black tracking-widest uppercase px-3 py-1.5 rounded-sm mb-3" style={{ background: t.accent }}>Coming Soon</div>
                    <div className="text-3xl text-white font-black uppercase leading-tight tracking-tighter">{t.title}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
