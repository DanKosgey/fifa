import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Clock, ArrowLeft, ShieldCheck, Ticket, Filter, Bell, X, AlertCircle, Smartphone, Printer, Download, CreditCard, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import SeatMap, { Section } from '../components/SeatMap';

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
          // Update tickets if they belong to this match
          const matchTickets = data.payload.filter((t: TicketListing) => t.matchId === (id || 'm1'));
          setTickets(matchTickets);
        } else if (data.type === 'PRICE_DROP') {
          // Show notification
          const newNotification = {
            id: Math.random().toString(36).substring(7),
            message: data.payload.message
          };
          setNotifications(prev => [...prev, newNotification]);
          
          // Auto-remove notification after 5 seconds
          setTimeout(() => {
            setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
          }, 5000);
        }
      } catch (e) {
        console.error("WebSocket message error:", e);
      }
    };

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, [id]);

  const handleCreateAlert = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const res = await fetch('/api/alerts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId.current,
          matchId: id || 'm1',
          category: alertCategory,
          maxPrice: Number(alertPrice),
        }),
      });

      if (res.ok) {
        setAlertSuccess(true);
      }
    } catch (error) {
      console.error("Failed to create alert:", error);
    }
  };

  // Filter tickets based on selected section
  const filteredTickets = selectedSection
    ? tickets.filter((t) => t.category === selectedSection || t.sectionId === selectedSection)
    : tickets;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
      {/* Background Banner */}
      <img 
        src="https://www.gettickets365.com/assets/img/banners/fwc2026.png" 
        alt="World Cup 2026" 
        className="fixed right-0 top-1/4 h-[80vh] w-auto opacity-[0.05] pointer-events-none z-0"
        referrerPolicy="no-referrer"
      />

      {/* Notifications Area */}
      <div className="fixed top-20 right-4 z-50 flex flex-col gap-2">
        <AnimatePresence>
          {notifications.map(notif => (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              className="bg-emerald-500 text-white px-6 py-4 rounded-xl shadow-lg flex items-center gap-3 max-w-sm"
            >
              <AlertCircle className="w-6 h-6 flex-shrink-0" />
              <p className="font-bold text-sm">{notif.message}</p>
              <button 
                onClick={() => setNotifications(prev => prev.filter(n => n.id !== notif.id))}
                className="ml-auto hover:bg-emerald-600 p-1 rounded-full transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-500 hover:text-indigo-600 transition-colors mb-6 font-medium"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Matches
      </button>

      {/* Match Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <img src={MATCH_DATA.homeFlag} alt={MATCH_DATA.homeTeam} className="w-16 h-12 object-cover rounded shadow-sm" />
              <span className="text-2xl font-bold text-gray-900">VS</span>
              <img src={MATCH_DATA.awayFlag} alt={MATCH_DATA.awayTeam} className="w-16 h-12 object-cover rounded shadow-sm" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {MATCH_DATA.homeTeam} vs {MATCH_DATA.awayTeam}
              </h1>
              <p className="text-indigo-600 font-medium">{MATCH_DATA.stage}</p>
            </div>
          </div>

          <div className="flex flex-col gap-2 text-gray-600 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span>{new Date(MATCH_DATA.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-400" />
              <span>{MATCH_DATA.time} Local Time</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span>{MATCH_DATA.stadium}, {MATCH_DATA.location}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Seat Map */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Select Your Section</h2>
            <p className="text-sm text-gray-500 mb-6">
              Click on a section of the stadium to view available tickets.
            </p>
            <SeatMap selectedSection={selectedSection} onSelectSection={setSelectedSection} />
          </div>
        </div>

        {/* Right Column: Ticket Listings */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">
                {selectedSection ? `Tickets in ${selectedSection.replace('_', ' ')}` : 'All Available Tickets'}
              </h2>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setIsPriceAlertOpen(true)}
                  className="flex items-center gap-1.5 text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors bg-indigo-50 px-3 py-1.5 rounded-full"
                >
                  <Bell className="w-4 h-4" />
                  Price Alert
                </button>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Qty:</span>
                  <select
                    value={ticketQuantity}
                    onChange={(e) => setTicketQuantity(Number(e.target.value))}
                    className="border-gray-300 rounded-md text-sm focus:ring-indigo-500 focus:border-indigo-500 py-1.5 pl-3 pr-8"
                  >
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-6">
              <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                <Filter className="w-4 h-4" />
                Filter
              </button>
              <button className="px-3 py-1.5 text-sm font-medium text-indigo-700 bg-indigo-50 rounded-full hover:bg-indigo-100 transition-colors">
                Lowest Price
              </button>
              <button className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                Best Value
              </button>
            </div>

            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              {loading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
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
                        transition={{ duration: 0.2 }}
                        className="border border-gray-200 rounded-xl p-4 hover:border-indigo-300 hover:shadow-md transition-all bg-white group"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-bold text-gray-900 text-lg">
                                ${ticket.price}
                              </span>
                              <span className="text-xs text-gray-500">/ ticket</span>
                            </div>
                            <div className="text-sm font-medium text-gray-800">
                              {ticket.category || (ticket.sectionId ? `Section ${ticket.sectionId.replace('_', ' ')}` : 'General Admission')}
                              {ticket.row && ` • Row ${ticket.row}`}
                            </div>
                          </div>
                          <button 
                            onClick={() => {
                              setSelectedTicket(ticket);
                              setCheckoutStep('details');
                              setIsCheckoutOpen(true);
                            }}
                            className="bg-[#0066FF] text-white px-5 py-2.5 rounded-sm font-black text-[11px] uppercase tracking-widest hover:bg-[#0052cc] transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100 shadow-md"
                          >
                            Buy Ticket
                          </button>
                        </div>

                        <div className="flex items-center justify-between pt-3 mt-1 border-t border-gray-100">
                          <div className="flex items-center gap-1.5">
                            <div className="bg-emerald-50 p-1 rounded-full border border-emerald-100">
                              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                            </div>
                            <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">
                              {ticket.seller || 'Verified Resale'}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <div className="bg-indigo-50 p-1 rounded-full border border-indigo-100">
                              {(ticket.type || 'e-ticket').toLowerCase().includes('paper') ? (
                                <Printer className="w-3.5 h-3.5 text-indigo-600" />
                              ) : (
                                <Smartphone className="w-3.5 h-3.5 text-indigo-600" />
                              )}
                            </div>
                            <span className="text-[11px] font-bold text-indigo-700 uppercase tracking-wider">
                              {ticket.type || 'E-Ticket'}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-12"
                    >
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Ticket className="w-8 h-8 text-gray-400" />
                      </div>
                      <h3 className="text-gray-900 font-medium mb-1">No tickets found</h3>
                      <p className="text-gray-500 text-sm">
                        Try selecting a different section or adjusting your filters.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      <AnimatePresence>
        {isCheckoutOpen && selectedTicket && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden border border-gray-200"
            >
              <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#0066FF]/10 flex items-center justify-center">
                    <Ticket className="w-5 h-5 text-[#0066FF]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black uppercase tracking-widest text-gray-900">Secure Checkout</h3>
                    <p className="text-xs text-gray-500 font-medium">FIFA World Cup 2026™</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsCheckoutOpen(false)}
                  className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6">
                {checkoutStep === 'details' && (
                  <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="font-bold text-gray-900">{MATCH_DATA.homeTeam} vs {MATCH_DATA.awayTeam}</h4>
                          <p className="text-sm text-gray-500">{new Date(MATCH_DATA.date).toLocaleDateString()} • {MATCH_DATA.stadium}</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center py-3 border-t border-gray-200">
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Section</p>
                          <p className="font-bold text-gray-900">{selectedTicket.category || (selectedTicket.sectionId ? `Section ${selectedTicket.sectionId.replace('_', ' ')}` : 'General Admission')}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Quantity</p>
                          <p className="font-bold text-gray-900">{ticketQuantity} Ticket(s)</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Ticket Price ({ticketQuantity}x)</span>
                        <span>${(selectedTicket.price * ticketQuantity).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Service Fee</span>
                        <span>${(selectedTicket.price * ticketQuantity * 0.15).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-black text-lg text-gray-900 pt-3 border-t border-gray-200">
                        <span>Total</span>
                        <span>${(selectedTicket.price * ticketQuantity * 1.15).toFixed(2)}</span>
                      </div>
                    </div>

                    <button 
                      onClick={() => setCheckoutStep('payment')}
                      className="w-full bg-[#0066FF] text-white font-black py-4 rounded-sm uppercase tracking-widest hover:bg-[#0052cc] transition-colors shadow-lg"
                    >
                      Proceed to Payment
                    </button>
                  </motion.div>
                )}

                {checkoutStep === 'payment' && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Card Information</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <CreditCard className="w-5 h-5 text-gray-400" />
                          </div>
                          <input 
                            type="text" 
                            placeholder="Card number"
                            className="w-full pl-10 border-gray-300 rounded-t-md focus:ring-[#0066FF] focus:border-[#0066FF] shadow-sm py-3"
                          />
                        </div>
                        <div className="flex">
                          <input 
                            type="text" 
                            placeholder="MM / YY"
                            className="w-1/2 border-gray-300 border-t-0 rounded-bl-md focus:ring-[#0066FF] focus:border-[#0066FF] shadow-sm py-3"
                          />
                          <input 
                            type="text" 
                            placeholder="CVC"
                            className="w-1/2 border-gray-300 border-t-0 border-l-0 rounded-br-md focus:ring-[#0066FF] focus:border-[#0066FF] shadow-sm py-3"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Name on Card</label>
                        <input 
                          type="text" 
                          placeholder="John Doe"
                          className="w-full border-gray-300 rounded-md focus:ring-[#0066FF] focus:border-[#0066FF] shadow-sm py-3"
                        />
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button 
                        onClick={() => setCheckoutStep('details')}
                        className="w-1/3 bg-gray-100 text-gray-900 font-black py-4 rounded-sm uppercase tracking-widest hover:bg-gray-200 transition-colors"
                      >
                        Back
                      </button>
                      <button 
                        onClick={() => {
                          setCheckoutStep('success');
                        }}
                        className="w-2/3 bg-[#0066FF] text-white font-black py-4 rounded-sm uppercase tracking-widest hover:bg-[#0052cc] transition-colors shadow-lg flex items-center justify-center gap-2"
                      >
                        <ShieldCheck className="w-5 h-5" />
                        Pay ${(selectedTicket.price * ticketQuantity * 1.15).toFixed(2)}
                      </button>
                    </div>
                  </motion.div>
                )}

                {checkoutStep === 'success' && (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-6 flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                      <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                    </div>
                    <h3 className="text-2xl font-black uppercase tracking-widest text-gray-900 mb-2">Booking Confirmed!</h3>
                    <p className="text-gray-500 text-sm mb-6">Your tickets have been secured. A confirmation email has been sent to your inbox.</p>
                    
                    <div className="w-full bg-gray-50 rounded-xl border border-dashed border-gray-300 p-6 mb-8 text-left">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-1">Booking ID</span>
                          <span className="text-lg font-mono font-bold text-[#00143F]">FWC-{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-1">Status</span>
                          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2 py-1 rounded">Confirmed</span>
                        </div>
                      </div>
                      
                      <div className="space-y-3 pt-4 border-t border-gray-200">
                        <div className="flex justify-between">
                          <span className="text-xs text-gray-500">Match</span>
                          <span className="text-xs font-bold text-gray-900">{MATCH_DATA.homeTeam} vs {MATCH_DATA.awayTeam}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs text-gray-500">Category</span>
                          <span className="text-xs font-bold text-gray-900">{selectedTicket.category || `Section ${selectedTicket.sectionId?.replace('_', ' ')}`}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs text-gray-500">Quantity</span>
                          <span className="text-xs font-bold text-gray-900">{ticketQuantity} Tickets</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs text-gray-500">Total Paid</span>
                          <span className="text-xs font-bold text-gray-900">${(selectedTicket.price * ticketQuantity * 1.15).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col w-full gap-3">
                      <button 
                        onClick={() => window.print()}
                        className="w-full bg-[#00143F] text-white font-black py-4 rounded-sm uppercase tracking-widest hover:bg-black transition-colors flex items-center justify-center gap-2"
                      >
                        <Printer className="w-5 h-5" />
                        Print Tickets
                      </button>
                      <button 
                        className="w-full bg-white border border-gray-200 text-gray-700 font-black py-4 rounded-sm uppercase tracking-widest hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                      >
                        <Download className="w-5 h-5" />
                        Download PDF
                      </button>
                      <button 
                        onClick={() => {
                          setIsCheckoutOpen(false);
                          setCheckoutStep('details');
                        }}
                        className="w-full text-gray-400 font-bold py-2 text-xs uppercase tracking-widest hover:text-gray-600 transition-colors"
                      >
                        Close Window
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-100"
            >
              <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-gray-50/50">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                    <Bell className="w-4 h-4 text-indigo-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Set Price Alert</h3>
                </div>
                <button 
                  onClick={() => {
                    setIsPriceAlertOpen(false);
                    setTimeout(() => setAlertSuccess(false), 300);
                  }}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6">
                {alertSuccess ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-emerald-50 border border-emerald-100 p-6 rounded-xl flex flex-col items-center text-center gap-3"
                  >
                    <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mb-1">
                      <ShieldCheck className="w-7 h-7 text-emerald-600" />
                    </div>
                    <p className="font-bold text-emerald-900 text-lg">Alert Set Successfully!</p>
                    <p className="text-sm text-emerald-700 leading-relaxed">
                      We'll notify you the moment {alertCategory === 'Any' ? 'any tickets' : <><strong className="font-bold">{alertCategory}</strong> tickets</>} drop below <strong className="font-bold">${alertPrice}</strong>.
                    </p>
                    <button 
                      onClick={() => {
                        setIsPriceAlertOpen(false);
                        setTimeout(() => setAlertSuccess(false), 300);
                      }}
                      className="mt-4 w-full py-2.5 bg-emerald-600 text-white text-sm font-bold rounded-xl hover:bg-emerald-700 transition-colors shadow-sm"
                    >
                      Done
                    </button>
                  </motion.div>
                ) : (
                  <form 
                    onSubmit={handleCreateAlert}
                    className="space-y-5"
                  >
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1.5">Ticket Category</label>
                      <select 
                        value={alertCategory}
                        onChange={(e) => setAlertCategory(e.target.value)}
                        className="w-full border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                      >
                        <option value="Any">Any Category</option>
                        <option value="Category 1">Category 1 (Premium)</option>
                        <option value="Category 2">Category 2</option>
                        <option value="Category 3">Category 3</option>
                        <option value="Category 4">Category 4</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1.5">Maximum Price ($)</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 font-medium">$</span>
                        </div>
                        <input 
                          type="number" 
                          required
                          min="1"
                          placeholder="e.g. 150"
                          value={alertPrice}
                          onChange={(e) => setAlertPrice(e.target.value)}
                          className="w-full pl-8 border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                        />
                      </div>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                      <p className="text-xs text-blue-800 leading-relaxed">
                        <strong className="font-bold">How it works:</strong> You will receive a real-time notification as soon as a matching ticket drops below your target price.
                      </p>
                    </div>
                    <button 
                      type="submit"
                      className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition-colors shadow-sm"
                    >
                      Create Price Alert
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
