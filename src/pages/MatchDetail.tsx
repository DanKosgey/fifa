import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Clock, ArrowLeft, ShieldCheck, Ticket, Filter, Bell, X, AlertCircle, Smartphone, Printer, Download, CreditCard, CheckCircle2, ChevronRight, Info, Globe, TrendingUp, Star, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import SeatMap from '../components/SeatMap';

// Mock data for the match
const MATCH_DATA = {
  id: 'm1',
  homeTeam: 'Brazil',
  awayTeam: 'France',
  date: '2026-06-15',
  time: '20:00',
  stadium: 'MetLife Stadium',
  location: 'New York/New Jersey',
  stage: 'Group Stage',
  homeFlag: 'https://flagcdn.com/w320/br.png',
  awayFlag: 'https://flagcdn.com/w320/fr.png',
};

interface TicketListing {
  id: string;
  matchId: string;
  category: string;
  price: number;
  sectionId?: string;
  row?: string;
  seat?: string;
  seller?: string;
  type?: string;
}

export default function MatchDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [ticketQuantity, setTicketQuantity] = useState<number>(1);
  const [tickets, setTickets] = useState<TicketListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState<{id: string, message: string}[]>([]);

  // Price Alert States
  const [isPriceAlertOpen, setIsPriceAlertOpen] = useState(false);
  const [alertCategory, setAlertCategory] = useState('Any');
  const [alertPrice, setAlertPrice] = useState('');
  const [alertSuccess, setAlertSuccess] = useState(false);
  
  // Checkout States
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<TicketListing | null>(null);
  const [checkoutStep, setCheckoutStep] = useState<'details' | 'payment' | 'success'>('details');

  // Generate a random user ID for this session
  const userId = useRef(`user_${Math.random().toString(36).substring(7)}`);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    // Fetch initial tickets
    const fetchTickets = async () => {
      try {
        const res = await fetch(`/api/matches/${id || 'm1'}/tickets`);
        if (res.ok) {
          const data = await res.json();
          setTickets(data);
        }
      } catch (error) {
        console.error("Failed to fetch tickets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();

    // Connect to WebSocket
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}?userId=${userId.current}`;
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'LISTINGS_UPDATE') {
          const matchTickets = data.payload.filter((t: TicketListing) => t.matchId === (id || 'm1'));
          setTickets(matchTickets);
        } else if (data.type === 'PRICE_DROP') {
          const newNotification = {
            id: Math.random().toString(36).substring(7),
            message: data.payload.message
          };
          setNotifications(prev => [...prev, newNotification]);
          setTimeout(() => {
            setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
          }, 5000);
        }
      } catch (e) {
        console.error("WebSocket message error:", e);
      }
    };

    return () => {
      if (ws.readyState === WebSocket.OPEN) ws.close();
    };
  }, [id]);

  const handleCreateAlert = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/alerts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: userId.current,
          matchId: id || 'm1',
          category: alertCategory,
          maxPrice: Number(alertPrice),
        }),
      });
      if (res.ok) setAlertSuccess(true);
    } catch (error) {
      console.error("Failed to create alert:", error);
    }
  };

  const filteredTickets = useMemo(() => {
    return selectedSection
      ? tickets.filter((t) => t.category === selectedSection || t.sectionId === selectedSection)
      : tickets;
  }, [tickets, selectedSection]);

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-900 selection:bg-emerald-500/30">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap');
        .font-mono-data { font-family: 'JetBrains Mono', monospace; }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
      `}</style>

      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      {/* ── TOP NAVIGATION RAIL ──────────────────────────────── */}
      <div className="bg-slate-50/50 backdrop-blur-xl border-b border-slate-900/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <button onClick={() => navigate('/match-centre')} className="flex items-center space-x-2 group">
              <ArrowLeft className="w-4 h-4 text-slate-900/40 group-hover:text-slate-900 transition-colors" />
              <span className="text-sm font-bold uppercase tracking-wider text-slate-900/40 group-hover:text-slate-900 transition-colors">Match Centre</span>
            </button>
          </div>
          <div className="flex items-center space-x-4">
             <div className="flex items-center space-x-2 bg-slate-900/5 px-3 py-1.5 rounded-full border border-slate-900/10 backdrop-blur-md">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-900/60">Live Updates</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── MATCH HERO HEADER ───────────────────────────────── */}
      <div className="relative pt-16 pb-16 px-4 md:px-8 overflow-hidden border-b border-slate-900/5">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/5 to-transparent pointer-events-none" />
        <img 
          src="https://www.gettickets365.com/assets/img/banners/fwc2026.png" 
          alt="World Cup 2026" 
          className="absolute right-0 top-0 h-full w-auto opacity-[0.08] pointer-events-none z-0 brightness-125"
          referrerPolicy="no-referrer"
        />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-20">
              {/* Home Team */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-28 h-20 bg-slate-900/5 rounded-2xl shadow-2xl border border-slate-900/10 p-1 mb-6 backdrop-blur-md group hover:scale-105 transition-transform">
                  <img src={MATCH_DATA.homeFlag} alt={MATCH_DATA.homeTeam} className="w-full h-full object-cover rounded-xl" />
                </div>
                <h2 className="text-3xl font-black tracking-tighter uppercase text-slate-900 shining-text">{MATCH_DATA.homeTeam}</h2>
                <span className="text-[10px] font-black text-slate-900/30 uppercase tracking-[0.3em] mt-2">Host Team</span>
              </motion.div>

              {/* VS Divider */}
              <div className="flex flex-col items-center">
                <div className="text-5xl font-black text-slate-900/10 italic tracking-tighter mb-4">VS</div>
                <div className="px-6 py-2 bg-emerald-500 text-white text-[11px] font-black uppercase tracking-[0.3em] rounded-full shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                  {MATCH_DATA.stage}
                </div>
              </div>

              {/* Away Team */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-28 h-20 bg-slate-900/5 rounded-2xl shadow-2xl border border-slate-900/10 p-1 mb-6 backdrop-blur-md group hover:scale-105 transition-transform">
                  <img src={MATCH_DATA.awayFlag} alt={MATCH_DATA.awayTeam} className="w-full h-full object-cover rounded-xl" />
                </div>
                <h2 className="text-3xl font-black tracking-tighter uppercase text-slate-900 shining-text">{MATCH_DATA.awayTeam}</h2>
                <span className="text-[10px] font-black text-slate-900/30 uppercase tracking-[0.3em] mt-2">Challenger</span>
              </motion.div>
            </div>

            {/* Match Info Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-8 min-w-[340px] relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="space-y-6 relative z-10">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 bg-slate-900/5 rounded-xl flex items-center justify-center border border-slate-900/10">
                    <Calendar className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-900/30 uppercase tracking-widest">Match Date</p>
                    <p className="text-sm font-black text-slate-900 uppercase tracking-tight">{new Date(MATCH_DATA.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                  </div>
                </div>
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 bg-slate-900/5 rounded-xl flex items-center justify-center border border-slate-900/10">
                    <Clock className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-900/30 uppercase tracking-widest">Kick-off Time</p>
                    <p className="text-sm font-black text-slate-900 uppercase tracking-tight">{MATCH_DATA.time} Local Time</p>
                  </div>
                </div>
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 bg-slate-900/5 rounded-xl flex items-center justify-center border border-slate-900/10">
                    <MapPin className="w-6 h-6 text-rose-400" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-900/30 uppercase tracking-widest">Venue</p>
                    <p className="text-sm font-black text-slate-900 uppercase tracking-tight">{MATCH_DATA.stadium}, {MATCH_DATA.location}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left: Stadium Map */}
          <div className="lg:col-span-7">
            <div className="glass-card rounded-[2.5rem] p-8 sticky top-24 border border-slate-900/10 shadow-2xl shadow-emerald-500/5">
              <div className="flex items-center justify-between mb-10">
                <div>
                  <h2 className="text-3xl font-black tracking-tighter uppercase text-slate-900 shining-text">Stadium Map</h2>
                  <p className="text-[10px] text-emerald-400/60 font-black uppercase tracking-[0.2em] mt-2">Select a section to filter tickets</p>
                </div>
                <div className="flex items-center space-x-3 bg-slate-900/5 px-4 py-2 rounded-xl border border-slate-900/10 backdrop-blur-md">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-[10px] font-black text-slate-900/70 uppercase tracking-widest">Interactive View</span>
                </div>
              </div>
              
              <div className="bg-slate-900 rounded-3xl p-8 shadow-inner shadow-black/5 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <SeatMap selectedSection={selectedSection} onSelectSection={setSelectedSection} />
              </div>

              <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="bg-slate-900/5 border border-slate-900/10 rounded-2xl p-4 flex flex-col items-center text-center">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 mb-2" />
                  <span className="text-[9px] font-black text-slate-900/40 uppercase tracking-widest">Verified Seats</span>
                </div>
                <div className="bg-slate-900/5 border border-slate-900/10 rounded-2xl p-4 flex flex-col items-center text-center">
                  <TrendingUp className="w-5 h-5 text-blue-400 mb-2" />
                  <span className="text-[9px] font-black text-slate-900/40 uppercase tracking-widest">Real-time Prices</span>
                </div>
                <div className="bg-slate-900/5 border border-slate-900/10 rounded-2xl p-4 flex flex-col items-center text-center">
                  <Star className="w-5 h-5 text-amber-400 mb-2" />
                  <span className="text-[9px] font-black text-slate-900/40 uppercase tracking-widest">Premium Access</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Ticket Listings */}
          <div className="lg:col-span-5 space-y-8">
            <div className="glass-card rounded-[2.5rem] border border-slate-900/10 p-8 shadow-2xl">
              <div className="flex flex-col gap-8 mb-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-500/20 rounded-2xl flex items-center justify-center border border-emerald-500/30">
                      <Ticket className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black tracking-tighter uppercase text-slate-900">
                        {selectedSection ? `Section ${selectedSection.replace('_', ' ')}` : 'Available Tickets'}
                      </h2>
                      <p className="text-[10px] text-slate-900/30 font-black uppercase tracking-widest mt-1">
                        {filteredTickets.length} Listings Found
                      </p>
                    </div>
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsPriceAlertOpen(true)}
                    className="w-12 h-12 bg-slate-900/5 text-slate-900 rounded-2xl flex items-center justify-center border border-slate-900/10 hover:bg-slate-900/10 transition-all group"
                  >
                    <Bell className="w-5 h-5 text-slate-900/60 group-hover:text-emerald-400 transition-colors" />
                  </motion.button>
                </div>

                {selectedSection && (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center justify-between bg-emerald-500/10 border border-emerald-500/20 rounded-2xl px-5 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                      <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Filtering by Section {selectedSection.replace('_', ' ')}</span>
                    </div>
                    <button 
                      onClick={() => setSelectedSection(null)}
                      className="p-1 hover:bg-emerald-500/20 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4 text-emerald-400" />
                    </button>
                  </motion.div>
                )}

                <div className="flex items-center gap-4">
                  <div className="flex-1 relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Search className="w-4 h-4 text-slate-900/30 group-focus-within:text-emerald-400 transition-colors" />
                    </div>
                    <select
                      value={ticketQuantity}
                      onChange={(e) => setTicketQuantity(Number(e.target.value))}
                      className="w-full pl-12 pr-4 py-4 bg-slate-900/5 border border-slate-900/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all appearance-none cursor-pointer"
                    >
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <option key={num} value={num} className="bg-white text-slate-900">{num} Ticket{num > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>
                  <button className="w-14 h-14 bg-slate-900/5 border border-slate-900/10 rounded-2xl flex items-center justify-center hover:bg-slate-900/10 transition-colors group">
                    <Filter className="w-5 h-5 text-slate-900/30 group-hover:text-slate-900 transition-colors" />
                  </button>
                </div>
              </div>

              {/* Tickets Scroll Area */}
              <div className="space-y-4 max-h-[650px] overflow-y-auto pr-2 custom-scrollbar">
                {loading ? (
                  <div className="flex flex-col items-center justify-center py-32 gap-6">
                    <div className="relative">
                      <div className="w-12 h-12 border-4 border-slate-900/5 border-t-emerald-500 rounded-full animate-spin" />
                      <div className="absolute inset-0 blur-lg bg-emerald-500/20 animate-pulse" />
                    </div>
                    <span className="text-[10px] font-black text-slate-900/20 uppercase tracking-[0.3em] animate-pulse">Scanning Listings</span>
                  </div>
                ) : (
                  <AnimatePresence mode="popLayout">
                    {filteredTickets.length > 0 ? (
                      filteredTickets.map((ticket) => (
                        <motion.div
                          key={ticket.id}
                          layout
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          whileHover={{ y: -4 }}
                          className="group glass-card border border-slate-900/10 rounded-3xl p-6 hover:border-emerald-500/50 hover:bg-slate-900/[0.08] transition-all cursor-pointer relative overflow-hidden"
                          onClick={() => {
                            setSelectedTicket(ticket);
                            setCheckoutStep('details');
                            setIsCheckoutOpen(true);
                          }}
                        >
                          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-emerald-500/10 transition-colors" />
                          
                          <div className="flex justify-between items-start mb-6 relative z-10">
                            <div>
                              <div className="flex items-baseline gap-2 mb-2">
                                <span className="text-3xl font-black text-slate-900 font-mono-data tracking-tighter">
                                  ${ticket.price}
                                </span>
                                <span className="text-[10px] font-black text-slate-900/30 uppercase tracking-widest">/ ticket</span>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1 bg-slate-900/5 border border-slate-900/10 rounded-lg text-[9px] font-black text-slate-900 uppercase tracking-widest">
                                  {ticket.category || (ticket.sectionId ? `Section ${ticket.sectionId.replace('_', ' ')}` : 'General Admission')}
                                </span>
                                {ticket.row && (
                                  <span className="px-3 py-1 bg-slate-900/5 border border-slate-900/10 rounded-lg text-[9px] font-black text-slate-900/40 uppercase tracking-widest">
                                    Row {ticket.row}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="w-12 h-12 bg-slate-900/5 rounded-2xl flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-slate-900 transition-all duration-500 border border-slate-900/10 group-hover:border-emerald-400/50">
                              <ChevronRight className="w-6 h-6" />
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-5 border-t border-slate-900/5 relative z-10">
                            <div className="flex items-center gap-2.5">
                              <div className="w-6 h-6 bg-emerald-500/10 rounded-lg flex items-center justify-center border border-emerald-500/20">
                                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                              </div>
                              <span className="text-[9px] font-black text-slate-900/40 uppercase tracking-[0.2em]">
                                {ticket.seller || 'Verified Resale'}
                              </span>
                            </div>
                            <div className="flex items-center gap-2.5">
                              <div className="w-6 h-6 bg-blue-500/10 rounded-lg flex items-center justify-center border border-blue-500/20">
                                { (ticket.type || 'e-ticket').toLowerCase().includes('paper') ? <Printer className="w-3.5 h-3.5 text-blue-400" /> : <Smartphone className="w-3.5 h-3.5 text-blue-400" /> }
                              </div>
                              <span className="text-[9px] font-black text-slate-900/40 uppercase tracking-[0.2em]">
                                {ticket.type || 'Digital Pass'}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <div className="flex flex-col items-center justify-center py-32 text-center">
                        <div className="w-20 h-20 bg-slate-900/5 rounded-full flex items-center justify-center mb-6 border border-slate-900/10">
                          <Ticket className="w-10 h-10 text-slate-900/10" />
                        </div>
                        <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight mb-2">No tickets found</h3>
                        <p className="text-xs text-slate-900/30 font-bold px-12 uppercase tracking-widest leading-relaxed">Try selecting a different stadium section or clearing your filters.</p>
                      </div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── CHECKOUT MODAL ──────────────────────────────────── */}
      <AnimatePresence>
        {isCheckoutOpen && selectedTicket && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-50/80 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 40 }}
              className="glass-card rounded-[2.5rem] shadow-2xl w-full max-w-lg overflow-hidden border border-slate-900/10"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-8 border-b border-slate-900/5 bg-slate-900/5">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                    <Globe className="w-6 h-6 text-slate-900" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black uppercase tracking-widest text-slate-900">Secure Checkout</h3>
                    <p className="text-[10px] text-emerald-400 font-black uppercase tracking-[0.2em] mt-1">Official Resale Platform</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsCheckoutOpen(false)}
                  className="w-10 h-10 flex items-center justify-center text-slate-900/30 hover:text-slate-900 hover:bg-slate-900/10 rounded-xl transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-8">
                {checkoutStep === 'details' && (
                  <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                    <div className="bg-slate-900/5 p-6 rounded-3xl border border-slate-900/10">
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight">{MATCH_DATA.homeTeam} vs {MATCH_DATA.awayTeam}</h4>
                          <p className="text-[10px] text-slate-900/30 font-black uppercase tracking-widest mt-2">{MATCH_DATA.stadium} • {new Date(MATCH_DATA.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-8 pt-6 border-t border-slate-900/5">
                        <div>
                          <p className="text-[9px] text-slate-900/30 uppercase tracking-[0.2em] font-black mb-2">Section</p>
                          <p className="text-xs font-black text-slate-900 uppercase tracking-widest">{selectedTicket.category || (selectedTicket.sectionId ? `Sec ${selectedTicket.sectionId.replace('_', ' ')}` : 'GA')}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[9px] text-slate-900/30 uppercase tracking-[0.2em] font-black mb-2">Quantity</p>
                          <p className="text-xs font-black text-slate-900 uppercase tracking-widest">{ticketQuantity} Ticket{ticketQuantity > 1 ? 's' : ''}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-5">
                      <div className="flex justify-between text-[10px] font-black text-slate-900/40 uppercase tracking-widest">
                        <span>Base Price ({ticketQuantity}x)</span>
                        <span className="font-mono-data text-slate-900">${(selectedTicket.price * ticketQuantity).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-[10px] font-black text-slate-900/40 uppercase tracking-widest">
                        <span>Service Fee (15%)</span>
                        <span className="font-mono-data text-slate-900">${(selectedTicket.price * ticketQuantity * 0.15).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center pt-6 border-t border-slate-900/5">
                        <span className="text-xs font-black text-slate-900 uppercase tracking-[0.2em]">Total Amount</span>
                        <span className="text-3xl font-black text-slate-900 font-mono-data tracking-tighter shining-text">${(selectedTicket.price * ticketQuantity * 1.15).toFixed(2)}</span>
                      </div>
                    </div>

                    <button 
                      onClick={() => setCheckoutStep('payment')}
                      className="shining-button w-full bg-emerald-500 text-white font-black py-6 rounded-2xl uppercase tracking-[0.3em] text-[10px] hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-500/20"
                    >
                      Continue to Payment
                    </button>
                  </motion.div>
                )}

                {checkoutStep === 'payment' && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                    <div className="space-y-6">
                      <div>
                        <label className="block text-[10px] font-black text-slate-900/30 uppercase tracking-widest mb-4">Card Details</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                            <CreditCard className="w-5 h-5 text-slate-900/20" />
                          </div>
                          <input 
                            type="text" 
                            placeholder="Card number"
                            className="w-full pl-14 pr-4 py-5 bg-slate-900/5 border border-slate-900/10 rounded-t-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 text-sm font-black text-slate-900 placeholder:text-slate-900/10"
                          />
                        </div>
                        <div className="flex">
                          <input 
                            type="text" 
                            placeholder="MM / YY"
                            className="w-1/2 px-5 py-5 bg-slate-900/5 border border-slate-900/10 border-t-0 rounded-bl-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 text-sm font-black text-slate-900 placeholder:text-slate-900/10"
                          />
                          <input 
                            type="text" 
                            placeholder="CVC"
                            className="w-1/2 px-5 py-5 bg-slate-900/5 border border-slate-900/10 border-t-0 border-l-0 rounded-br-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 text-sm font-black text-slate-900 placeholder:text-slate-900/10"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-[10px] font-black text-slate-900/30 uppercase tracking-widest mb-4">Cardholder Name</label>
                        <input 
                          type="text" 
                          placeholder="Full Name as on Card"
                          className="w-full px-5 py-5 bg-slate-900/5 border border-slate-900/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 text-sm font-black text-slate-900 placeholder:text-slate-900/10"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-5 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl">
                      <ShieldCheck className="w-6 h-6 text-emerald-400" />
                      <p className="text-[9px] font-black text-emerald-400/60 uppercase tracking-widest leading-relaxed">Your payment is encrypted and processed securely. We never store your card details.</p>
                    </div>

                    <div className="flex gap-4">
                      <button 
                        onClick={() => setCheckoutStep('details')}
                        className="flex-1 bg-slate-900/5 text-slate-900 font-black py-6 rounded-2xl uppercase tracking-[0.2em] text-[10px] hover:bg-slate-900/10 transition-all border border-slate-900/10"
                      >
                        Back
                      </button>
                      <button 
                        onClick={() => setCheckoutStep('success')}
                        className="flex-[2] shining-button bg-emerald-500 text-white font-black py-6 rounded-2xl uppercase tracking-[0.3em] text-[10px] hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-500/20"
                      >
                        Confirm Purchase
                      </button>
                    </div>
                  </motion.div>
                )}

                {checkoutStep === 'success' && (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-8 flex flex-col items-center text-center">
                    <div className="w-24 h-24 bg-emerald-500/20 rounded-[2.5rem] flex items-center justify-center mb-8 border border-emerald-500/30 shadow-2xl shadow-emerald-500/20">
                      <ShieldCheck className="w-12 h-12 text-emerald-400" />
                    </div>
                    <h3 className="text-3xl font-black tracking-tighter uppercase text-slate-900 mb-3 shining-text">Order Confirmed</h3>
                    <p className="text-[10px] text-slate-900/30 font-black uppercase tracking-[0.3em] mb-12">Your tickets are secured</p>
                    
                    <div className="w-full bg-slate-900/5 rounded-3xl border border-dashed border-slate-900/10 p-8 mb-12 text-left relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl rounded-full -mr-16 -mt-16" />
                      
                      <div className="flex justify-between items-start mb-8 relative z-10">
                        <div>
                          <span className="text-[9px] font-black uppercase tracking-widest text-slate-900/30 block mb-2">Booking Reference</span>
                          <span className="text-xl font-mono-data font-black text-slate-900 tracking-tighter">FWC-{Math.random().toString(36).substr(2, 6).toUpperCase()}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[9px] font-black uppercase tracking-widest text-slate-900/30 block mb-2">Status</span>
                          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/20">Verified</span>
                        </div>
                      </div>
                      
                      <div className="space-y-5 pt-8 border-t border-slate-900/5 relative z-10">
                        <div className="flex justify-between">
                          <span className="text-[10px] font-black text-slate-900/30 uppercase tracking-widest">Match</span>
                          <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{MATCH_DATA.homeTeam} vs {MATCH_DATA.awayTeam}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[10px] font-black text-slate-900/30 uppercase tracking-widest">Quantity</span>
                          <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{ticketQuantity} Tickets</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[10px] font-black text-slate-900/30 uppercase tracking-widest">Total Paid</span>
                          <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest font-mono-data">${(selectedTicket.price * ticketQuantity * 1.15).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col w-full gap-5">
                      <button 
                        onClick={() => window.print()}
                        className="w-full bg-slate-900 text-white font-black py-6 rounded-2xl uppercase tracking-[0.3em] text-[10px] hover:bg-slate-900/90 transition-all shadow-xl flex items-center justify-center gap-4"
                      >
                        <Printer className="w-5 h-5" />
                        Print Tickets
                      </button>
                      <button 
                        onClick={() => setIsCheckoutOpen(false)}
                        className="w-full bg-slate-900/5 border border-slate-900/10 text-slate-900/40 font-black py-6 rounded-2xl uppercase tracking-[0.2em] text-[10px] hover:bg-slate-900/10 transition-all"
                      >
                        Return to Dashboard
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Price Alert Modal */}
      <AnimatePresence>
        {isPriceAlertOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-50/80 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 40 }}
              className="glass-card rounded-[2.5rem] shadow-2xl w-full max-w-md overflow-hidden border border-slate-900/10"
            >
              <div className="flex items-center justify-between p-8 border-b border-slate-900/10 bg-slate-900/5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                    <Bell className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">Price Monitor</h3>
                    <p className="text-[10px] text-slate-900/30 font-bold uppercase tracking-widest">Real-time Notifications</p>
                  </div>
                </div>
                <button 
                  onClick={() => { setIsPriceAlertOpen(false); setAlertSuccess(false); }}
                  className="p-2 text-slate-900/30 hover:text-slate-900 hover:bg-slate-900/10 rounded-full transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-10">
                {alertSuccess ? (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-emerald-500/20 rounded-[2rem] flex items-center justify-center mb-8 border border-emerald-500/30">
                      <ShieldCheck className="w-10 h-10 text-emerald-400" />
                    </div>
                    <h4 className="text-2xl font-black tracking-tight uppercase text-slate-900 mb-3">Monitor Active</h4>
                    <p className="text-xs text-slate-900/40 font-bold leading-relaxed mb-10 px-4 uppercase tracking-widest">
                      We'll notify you instantly when {alertCategory === 'Any' ? 'any tickets' : <><strong className="text-emerald-400">{alertCategory}</strong> tickets</>} drop below <strong className="text-emerald-400">${alertPrice}</strong>.
                    </p>
                    <button 
                      onClick={() => { setIsPriceAlertOpen(false); setAlertSuccess(false); }}
                      className="w-full py-6 shining-button bg-emerald-500 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-500/20"
                    >
                      Understood
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleCreateAlert} className="space-y-8">
                    <div>
                      <label className="block text-[10px] font-black text-slate-900/30 uppercase tracking-[0.2em] mb-4">Target Category</label>
                      <div className="relative">
                        <select 
                          value={alertCategory}
                          onChange={(e) => setAlertCategory(e.target.value)}
                          className="w-full px-6 py-6 bg-slate-900/5 border border-slate-900/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 text-sm font-black text-slate-900 appearance-none transition-all"
                        >
                          <option value="Any" className="bg-white">Any Category</option>
                          <option value="Category 1" className="bg-white">Category 1 (Premium)</option>
                          <option value="Category 2" className="bg-white">Category 2</option>
                          <option value="Category 3" className="bg-white">Category 3</option>
                          <option value="Category 4" className="bg-white">Category 4</option>
                        </select>
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-900/20">
                          <ChevronRight className="w-4 h-4 rotate-90" />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-900/30 uppercase tracking-[0.2em] mb-4">Maximum Price ($)</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                          <span className="text-slate-900/20 font-black text-xl">$</span>
                        </div>
                        <input 
                          type="number" 
                          required
                          min="1"
                          placeholder="e.g. 150"
                          value={alertPrice}
                          onChange={(e) => setAlertPrice(e.target.value)}
                          className="w-full pl-12 pr-6 py-6 bg-slate-900/5 border border-slate-900/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 text-xl font-black text-slate-900 placeholder:text-slate-900/10 transition-all"
                        />
                      </div>
                    </div>
                    <div className="bg-slate-900/5 p-6 rounded-2xl border border-slate-900/10">
                      <p className="text-[10px] text-slate-900/30 leading-relaxed font-bold uppercase tracking-widest flex items-start gap-3">
                        <Info className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>Our system scans listings every 30 seconds to find the best deals for you.</span>
                      </p>
                    </div>
                    <button 
                      type="submit"
                      className="w-full shining-button bg-emerald-500 text-white font-black py-6 rounded-2xl uppercase tracking-[0.3em] text-[10px] hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-500/20"
                    >
                      Activate Monitor
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
