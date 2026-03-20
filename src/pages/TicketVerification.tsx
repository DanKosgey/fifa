import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Search, CheckCircle2, AlertCircle, QrCode, FileCheck } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const TicketVerification = () => {
  const [ticketId, setTicketId] = useState("");
  const [status, setStatus] = useState<'idle' | 'verifying' | 'valid' | 'invalid'>('idle');

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketId) return;
    
    setStatus('verifying');
    
    // Simulate verification delay
    setTimeout(() => {
      // Mock validation logic: ID starting with 'FWC' is valid
      if (ticketId.toUpperCase().startsWith('FWC')) {
        setStatus('valid');
      } else {
        setStatus('invalid');
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-24 relative overflow-hidden">
      <Helmet>
        <title>Ticket Verification | FIFA World Cup 2026™</title>
        <meta name="description" content="Verify the authenticity of your FIFA World Cup 2026™ tickets. Use our official portal to ensure your entry is valid and secure." />
      </Helmet>

      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="bg-[#0A0B1A] text-white pt-24 pb-20 relative overflow-hidden z-10 w-full text-center">
        <div className="max-w-4xl mx-auto px-4 md:px-8 relative z-20">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 mb-8 shadow-lg shadow-slate-900/5">
            <QrCode className="w-8 h-8 text-emerald-500" />
          </div>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 shining-text">
            Ticket <br/>Verification
          </h1>
          <p className="text-slate-300 font-bold text-lg mx-auto drop-shadow-sm leading-relaxed">
            Ensure the authenticity of your tournament experience. Every official ticket contains a unique encrypted identifier that can be verified here.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 relative z-10">
        <div className="max-w-3xl mx-auto">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="glass-card p-10 md:p-16 border-white/60 shadow-2xl"
          >
            <div className="text-center mb-12">
              <h3 className="text-2xl font-black uppercase tracking-tight text-slate-900 mb-4">Official Authenticator</h3>
              <p className="text-slate-500 font-bold uppercase tracking-widest text-xs leading-relaxed">Enter your 12-digit Ticket ID or scan your physical ticket to proceed with instant validation.</p>
            </div>

            <form onSubmit={handleVerify} className="space-y-8">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                  <FileCheck className="w-6 h-6 text-slate-900/20" />
                </div>
                <input 
                  type="text" 
                  value={ticketId}
                  onChange={(e) => setTicketId(e.target.value.toUpperCase())}
                  disabled={status === 'verifying'}
                  className="w-full pl-16 pr-6 py-6 bg-slate-900/5 border border-slate-900/10 rounded-2xl text-xl font-black focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-mono-data placeholder:text-slate-900/10"
                  placeholder="ID: FWC-XXXX-XXXX"
                />
              </div>

              <button 
                type="submit"
                disabled={status === 'verifying' || !ticketId}
                className="w-full shining-button bg-slate-900 text-white font-black uppercase tracking-[0.3em] py-6 rounded-2xl flex items-center justify-center gap-4 shadow-xl shadow-slate-900/10 text-[10px] disabled:opacity-50"
              >
                {status === 'verifying' ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>AUTHENTICATING WITH CORE SYSTEMS...</span>
                  </>
                ) : (
                  <>
                    <span>VERIFY TICKET AUTHENTICITY</span>
                    <ShieldCheck className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <AnimatePresence mode="wait">
              {status === 'valid' && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="mt-12 p-10 bg-emerald-500/5 border border-emerald-500/30 rounded-3xl text-center"
                >
                  <div className="w-16 h-16 bg-emerald-500 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-500/20">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-black text-emerald-600 uppercase tracking-tighter mb-2">Ticket Verified</h3>
                  <p className="text-emerald-700/60 font-black uppercase tracking-widest text-[10px] mb-6">Match: Mexico vs South Africa • Group A</p>
                  <p className="text-slate-900 font-bold text-sm leading-relaxed mb-8">This ticket is 100% authentic and registered to the global FIFA World Cup 26™ database. We look forward to seeing you at the stadium.</p>
                  <button onClick={() => setStatus('idle')} className="text-[10px] font-black uppercase tracking-widest text-emerald-600 hover:text-emerald-700">Verify another ticket</button>
                </motion.div>
              )}

              {status === 'invalid' && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="mt-12 p-10 bg-red-500/5 border border-red-500/30 rounded-3xl text-center"
                >
                  <div className="w-16 h-16 bg-red-500 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-red-500/20">
                    <AlertCircle className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-black text-red-600 uppercase tracking-tighter mb-2">Invalid Ticket ID</h3>
                  <p className="text-red-700/60 font-black uppercase tracking-widest text-[10px] mb-6">Error Code: E-TKT-404</p>
                  <p className="text-slate-900 font-bold text-sm leading-relaxed mb-8">The provided identifier could not be validated. If you purchased this through a third-party, please contact our support desk immediately.</p>
                  <button onClick={() => setStatus('idle')} className="text-[10px] font-black uppercase tracking-widest text-red-600 hover:text-red-700">Try again</button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-card p-8 border-white/60 flex items-start gap-6">
              <div className="w-12 h-12 bg-slate-900/5 rounded-xl flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h4 className="font-black text-slate-900 uppercase tracking-tight mb-2 text-sm">Official Resale</h4>
                <p className="text-[11px] font-bold text-slate-500 leading-relaxed uppercase tracking-wide">Only tickets purchased via FIFA.com or official resale partners can be verified.</p>
              </div>
            </div>
            <div className="glass-card p-8 border-white/60 flex items-start gap-6">
              <div className="w-12 h-12 bg-slate-900/5 rounded-xl flex items-center justify-center shrink-0">
                <Search className="w-6 h-6 text-emerald-500" />
              </div>
              <div>
                <h4 className="font-black text-slate-900 uppercase tracking-tight mb-2 text-sm">Instant Audit</h4>
                <p className="text-[11px] font-bold text-slate-500 leading-relaxed uppercase tracking-wide">Our global synchronisation engine ensures real-time validation across all host cities.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketVerification;
