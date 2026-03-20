import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Mail, HelpCircle, ChevronRight, ChevronDown, CheckCircle2 } from 'lucide-react';

const faqs = [
  { q: "How do I purchase official tickets?", a: "Official tickets are only available through the FIFA ticketing portal on this platform. Ensure you have created an account and completed your fan profile verification." },
  { q: "Can I transfer my tickets to a friend?", a: "Yes, ticket transfers are permitted through the official Resale Marketplace up to 48 hours before the match kickoff." },
  { q: "What should I do if my payment failed?", a: "Check your bank authorization limits for international transactions. The system automatically releases failed reservations after 15 minutes." },
  { q: "Are hospitality packages refundable?", a: "Hospitality packages are bound by specific partner terms. Please refer to your VIP confirmation email for exact cancellation windows." }
];

// ✅ AGENT COMPLETED: Unified Support and Help Centre page to resolve footer dead links
const Support = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-24 relative">
      <div className="bg-[#0A0B1A] text-white pt-24 pb-20 relative overflow-hidden z-10 w-full">
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-20 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 mb-8 shadow-lg shadow-slate-900/5">
            <HelpCircle className="w-8 h-8 text-emerald-500" />
          </div>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 shining-text">
            Help Centre
          </h1>
          <p className="text-slate-300 font-bold max-w-2xl text-lg mx-auto leading-relaxed drop-shadow-sm">
            Explore our comprehensive knowledge base or reach out to our dedicated 24/7 Global Support desk for personalized assistance.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
        
        {/* FAQ Section */}
        <div>
          <h2 className="text-2xl font-black uppercase tracking-tight text-slate-900 mb-8 flex items-center gap-3">
            <MessageSquare className="w-6 h-6 text-slate-400" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="glass-card rounded-2xl overflow-hidden shadow-lg shadow-slate-900/5">
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
                >
                  <span className="font-black text-slate-900 uppercase tracking-tight text-sm pr-4">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-emerald-500 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden bg-slate-50/50"
                    >
                      <div className="px-6 pb-6 pt-2 text-slate-700 font-bold leading-relaxed text-sm">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <h2 className="text-2xl font-black uppercase tracking-tight text-slate-900 mb-8 flex items-center gap-3">
            <Mail className="w-6 h-6 text-slate-400" />
            Contact Support
          </h2>
          <div className="glass-card p-8 md:p-10 shadow-2xl shadow-slate-900/5">
            {submitted ? (
              <div className="text-center py-12">
                <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                <h3 className="text-2xl font-black uppercase tracking-tight text-slate-900 mb-4">Message Sent</h3>
                <p className="text-slate-500 font-medium mb-8">Our support team will get back to you within 24 hours.</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="text-[10px] font-black uppercase tracking-widest text-emerald-500 hover:text-emerald-600 transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-800 mb-2 pl-2">Subject</label>
                    <select className="w-full px-4 py-3 bg-slate-50 border border-slate-900/10 rounded-xl text-sm font-medium focus:outline-none focus:border-emerald-500 transition-all text-slate-900 appearance-none">
                      <option>Ticketing Issue</option>
                      <option>Account Access</option>
                      <option>Payment Failure</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 pl-2">Ticket ID (Optional)</label>
                    <input type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-900/10 rounded-xl text-sm font-medium focus:outline-none focus:border-emerald-500 transition-all font-mono-data" placeholder="#TKT-XXXX" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-800 mb-2 pl-2">Email Address</label>
                  <input required type="email" className="w-full px-4 py-3 bg-slate-50 border border-slate-900/10 rounded-xl text-sm font-medium focus:outline-none focus:border-emerald-500 transition-all font-mono-data" placeholder="you@example.com" />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-900/40 mb-2 pl-2">Message</label>
                  <textarea required rows={4} className="w-full px-4 py-3 bg-white/40 border border-white/60 rounded-xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all resize-none shadow-sm placeholder-slate-900/20" placeholder="Describe your issue in detail..."></textarea>
                </div>
                <button 
                  type="submit"
                  className="w-full shining-button bg-slate-900 text-white font-black uppercase tracking-[0.2em] py-4 rounded-xl flex items-center justify-center gap-3 shadow-xl shadow-slate-900/10 text-[10px]"
                >
                  <span>Submit Request</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
