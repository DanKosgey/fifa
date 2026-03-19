import React, { useState, useEffect, useRef } from 'react';
import { Search, Filter, ChevronDown, ChevronLeft, ChevronRight, Calendar, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MatchCentre = () => {
  const navigate = useNavigate();
  const [matches, setMatches] = useState([
    { id: 'm1', time: "19:00", t1: "Mexico", t2: "South Africa", s1: "0", s2: "0", status: "LIVE", competition: "FIFA World Cup 2026™" },
    { id: 'm2', time: "15:00", t1: "USA", t2: "Paraguay", s1: "2", s2: "1", status: "FT", competition: "FIFA World Cup 2026™" },
    { id: 'm3', time: "18:00", t1: "Canada", t2: "Norway", s1: "1", s2: "1", status: "75'", competition: "FIFA World Cup 2026™" },
    { id: 'm4', time: "12:00", t1: "Brazil", t2: "Japan", s1: "3", s2: "0", status: "FT", competition: "FIFA World Cup 2026™" },
    { id: 'm5', time: "15:00", t1: "France", t2: "Morocco", s1: "0", s2: "0", status: "15'", competition: "FIFA World Cup 2026™" },
    { id: 'm6', time: "12:00", t1: "Argentina", t2: "South Korea", s1: "2", s2: "0", status: "FT", competition: "FIFA World Cup 2026™" },
    { id: 'm7', time: "18:00", t1: "Spain", t2: "Australia", s1: "1", s2: "2", status: "60'", competition: "FIFA World Cup 2026™" },
    { id: 'm8', time: "21:00", t1: "England", t2: "Egypt", s1: "0", s2: "0", status: "UPCOMING", competition: "FIFA World Cup 2026™" },
    { id: 'm9', time: "14:00", t1: "Germany", t2: "Uruguay", s1: "1", s2: "0", status: "HT", competition: "FIFA World Cup 2026™" },
    { id: 'm10', time: "17:00", t1: "Portugal", t2: "Nigeria", s1: "0", s2: "0", status: "UPCOMING", competition: "FIFA World Cup 2026™" },
    { id: 'm11', time: "20:00", t1: "Netherlands", t2: "Chile", s1: "0", s2: "0", status: "UPCOMING", competition: "FIFA World Cup 2026™" }
  ]);

  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}`;
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

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

  const europaLeagueMatches = matches.filter(m => m.competition === "UEFA Europa League");
  const conferenceLeagueMatches = matches.filter(m => m.competition === "UEFA Europa Conference League");

  return (
    <div className="w-full bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 pt-8 px-4 md:px-8 lg:px-16 relative overflow-hidden">
        <img src="https://www.gettickets365.com/assets/img/banners/fwc2026.png" alt="World Cup Trophy" className="absolute right-10 top-0 h-full w-auto object-contain opacity-10 pointer-events-none z-0" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-4">
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-[#00143F]">Match Centre</h1>
            <div className="flex bg-gray-100 p-1 rounded-full">
              <button className="px-6 py-2 rounded-full bg-white shadow-sm text-sm font-bold uppercase tracking-wider text-[#00143F]">Men</button>
              <button className="px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider text-gray-500 hover:text-[#00143F] transition-colors">Women</button>
            </div>
          </div>

          {/* Sub-tabs */}
          <div className="flex space-x-8 border-b border-gray-200">
            <button className="pb-4 border-b-4 border-[#005eb8] text-sm font-bold uppercase tracking-wider text-[#005eb8]">Matches</button>
            <button className="pb-4 border-b-4 border-transparent text-sm font-bold uppercase tracking-wider text-gray-500 hover:text-[#00143F] transition-colors">Competitions</button>
            <button className="pb-4 border-b-4 border-transparent text-sm font-bold uppercase tracking-wider text-gray-500 hover:text-[#00143F] transition-colors">Teams</button>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input 
              type="text" 
              className="block w-full pl-11 pr-4 py-3 border border-gray-300 rounded-full leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#005eb8] focus:border-[#005eb8] sm:text-sm transition-shadow" 
              placeholder="Search for a match, team or competition" 
            />
          </div>
        </div>

        {/* Date Ribbon */}
        <div className="flex items-center justify-between bg-white border border-gray-200 rounded-xl p-2 mb-6 shadow-sm overflow-x-auto">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"><ChevronLeft className="w-5 h-5 text-gray-500" /></button>
          
          <div className="flex space-x-2 min-w-max px-4">
            {[
              { day: "THU", date: "15 FEB", active: false },
              { day: "FRI", date: "16 FEB", active: false },
              { day: "SAT", date: "17 FEB", active: false },
              { day: "SUN", date: "18 FEB", active: false },
              { day: "MON", date: "19 FEB", active: false },
              { day: "TUE", date: "20 FEB", active: false },
              { day: "WED", date: "21 FEB", active: true },
              { day: "THU", date: "22 FEB", active: false },
              { day: "FRI", date: "23 FEB", active: false }
            ].map((d, i) => (
              <button 
                key={i} 
                className={`flex flex-col items-center justify-center px-4 py-2 rounded-lg transition-colors ${d.active ? 'bg-[#005eb8] text-white shadow-md' : 'hover:bg-gray-100 text-gray-600'}`}
              >
                <span className={`text-[10px] font-bold uppercase tracking-widest ${d.active ? 'text-blue-200' : 'text-gray-400'}`}>{d.day}</span>
                <span className="text-sm font-black tracking-tight">{d.date}</span>
              </button>
            ))}
          </div>
          
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"><ChevronRight className="w-5 h-5 text-gray-500" /></button>
        </div>

        {/* Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2 cursor-pointer group">
              <div className="relative">
                <input type="checkbox" className="sr-only" />
                <div className="w-10 h-6 bg-gray-200 rounded-full shadow-inner transition-colors group-hover:bg-gray-300"></div>
                <div className="absolute w-4 h-4 bg-white rounded-full shadow left-1 top-1 transition-transform"></div>
              </div>
              <span className="text-sm font-bold uppercase tracking-wider text-gray-700">Live</span>
            </label>
            <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-full text-sm font-bold uppercase tracking-wider text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
              <Calendar className="w-4 h-4" />
              <span>Change Day</span>
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-full text-sm font-bold uppercase tracking-wider text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
              <span>Sort</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-full text-sm font-bold uppercase tracking-wider text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        {/* Match List */}
        <div className="space-y-8">
          {/* Competition Group */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                  <img src="https://picsum.photos/seed/uefa/50/50" alt="UEFA" className="w-full h-full object-cover mix-blend-multiply" referrerPolicy="no-referrer" />
                </div>
                <h2 className="text-lg font-bold uppercase tracking-wide text-[#00143F]">UEFA Europa League</h2>
              </div>
              <ChevronDown className="w-5 h-5 text-gray-400" />
            </div>
            
            <div className="divide-y divide-gray-100">
              {europaLeagueMatches.map((match) => (
                <div key={match.id} onClick={() => navigate('/match/1')} className="flex flex-col md:flex-row items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors group cursor-pointer">
                  <div className="flex items-center w-full md:w-auto mb-4 md:mb-0">
                    <span className="text-sm font-bold text-gray-400 w-16">{match.time}</span>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#005eb8] bg-blue-50 px-2 py-1 rounded hidden md:inline-block mr-4 opacity-0 group-hover:opacity-100 transition-opacity">Match Centre</span>
                  </div>
                  
                  <div className="flex items-center justify-center w-full md:w-auto flex-grow max-w-2xl">
                    <div className="flex items-center justify-end w-1/3 space-x-3">
                      <span className="font-bold text-gray-900 text-right truncate">{match.t1}</span>
                      <div className="w-6 h-6 bg-gray-200 rounded-full flex-shrink-0 overflow-hidden">
                        <img src={`https://picsum.photos/seed/${match.t1}/50/50`} alt={match.t1} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-center w-24 px-4">
                      <div className={`bg-[#00143F] text-white font-black text-lg px-3 py-1 rounded shadow-inner flex items-center space-x-2 transition-all duration-300 ${match.status === 'LIVE' ? 'ring-2 ring-red-500 animate-pulse' : ''}`}>
                        <span>{match.s1}</span>
                        <span className="text-gray-400 text-sm">-</span>
                        <span>{match.s2}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-start w-1/3 space-x-3">
                      <div className="w-6 h-6 bg-gray-200 rounded-full flex-shrink-0 overflow-hidden">
                        <img src={`https://picsum.photos/seed/${match.t2}/50/50`} alt={match.t2} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <span className="font-bold text-gray-900 text-left truncate">{match.t2}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-end w-full md:w-24 mt-4 md:mt-0">
                    <span className={`text-xs font-bold uppercase tracking-widest px-2 py-1 rounded flex items-center gap-1 ${match.status === 'LIVE' ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-500'}`}>
                      {match.status === 'LIVE' && <Activity className="w-3 h-3 animate-pulse" />}
                      {match.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Another Competition Group */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                  <img src="https://picsum.photos/seed/uecl/50/50" alt="UECL" className="w-full h-full object-cover mix-blend-multiply" referrerPolicy="no-referrer" />
                </div>
                <h2 className="text-lg font-bold uppercase tracking-wide text-[#00143F]">UEFA Europa Conference League</h2>
              </div>
              <ChevronDown className="w-5 h-5 text-gray-400" />
            </div>
            
            <div className="divide-y divide-gray-100">
              {conferenceLeagueMatches.map((match) => (
                <div key={match.id} onClick={() => navigate('/match/1')} className="flex flex-col md:flex-row items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors group cursor-pointer">
                  <div className="flex items-center w-full md:w-auto mb-4 md:mb-0">
                    <span className="text-sm font-bold text-gray-400 w-16">{match.time}</span>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#005eb8] bg-blue-50 px-2 py-1 rounded hidden md:inline-block mr-4 opacity-0 group-hover:opacity-100 transition-opacity">Match Centre</span>
                  </div>
                  
                  <div className="flex items-center justify-center w-full md:w-auto flex-grow max-w-2xl">
                    <div className="flex items-center justify-end w-1/3 space-x-3">
                      <span className="font-bold text-gray-900 text-right truncate">{match.t1}</span>
                      <div className="w-6 h-6 bg-gray-200 rounded-full flex-shrink-0 overflow-hidden">
                        <img src={`https://picsum.photos/seed/${match.t1}/50/50`} alt={match.t1} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-center w-24 px-4">
                      <div className={`bg-[#00143F] text-white font-black text-lg px-3 py-1 rounded shadow-inner flex items-center space-x-2 transition-all duration-300 ${match.status === 'LIVE' ? 'ring-2 ring-red-500 animate-pulse' : ''}`}>
                        <span>{match.s1}</span>
                        <span className="text-gray-400 text-sm">-</span>
                        <span>{match.s2}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-start w-1/3 space-x-3">
                      <div className="w-6 h-6 bg-gray-200 rounded-full flex-shrink-0 overflow-hidden">
                        <img src={`https://picsum.photos/seed/${match.t2}/50/50`} alt={match.t2} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <span className="font-bold text-gray-900 text-left truncate">{match.t2}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-end w-full md:w-24 mt-4 md:mt-0">
                    <span className={`text-xs font-bold uppercase tracking-widest px-2 py-1 rounded flex items-center gap-1 ${match.status === 'LIVE' ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-500'}`}>
                      {match.status === 'LIVE' && <Activity className="w-3 h-3 animate-pulse" />}
                      {match.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchCentre;
