import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Ticket, X, ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function TicketAdPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Show the popup shortly after the page loads
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleRedirect = () => {
    setIsVisible(false);
    navigate('/match/1');
  };

  // Don't show the popup if we're already on the match details page
  if (location.pathname.startsWith('/match/')) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-6 right-6 z-50 w-80 bg-gradient-to-br from-[#00143F] to-[#003b73] rounded-2xl shadow-2xl border border-blue-400/20 overflow-hidden"
        >
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-indigo-500/20 rounded-full blur-2xl -ml-10 -mb-10 pointer-events-none" />

          <div className="relative p-5">
            {/* Close button */}
            <button
              onClick={() => setIsVisible(false)}
              className="absolute top-3 right-3 p-1.5 text-blue-200 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              aria-label="Close advertisement"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Content */}
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 border border-blue-400/30">
                <Ticket className="w-5 h-5 text-blue-300" />
              </div>
              <div className="pr-4">
                <h3 className="text-white font-bold text-base flex items-center gap-1.5">
                  Premium Tickets <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                </h3>
                <p className="text-blue-100/80 text-xs mt-1 leading-relaxed">
                  Looking to buy or sell? Explore our interactive 3D seat map for the best views.
                </p>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={handleRedirect}
              className="w-full group relative flex items-center justify-center gap-2 bg-white text-[#00143F] font-bold text-sm py-2.5 px-4 rounded-xl hover:bg-blue-50 transition-all active:scale-[0.98]"
            >
              <span>Buy Ticket</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
