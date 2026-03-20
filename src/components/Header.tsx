import { Link, useLocation } from 'react-router-dom';
import { Menu, Search, Globe, User, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion'; // Changed from 'motion/react' to 'framer-motion' for layoutId
import { useState } from 'react'; // Added useState

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // ✅ AGENT: Added mobile menu state
  const location = useLocation();

  const navLinks = [
    { name: 'Tournaments', path: '/tournaments' },
    { name: 'Match Centre', path: '/match-centre' },
    { name: 'Tickets', path: '/tickets' },
    { name: 'News', path: '/news' },
    { name: 'Rankings', path: '/rankings' },
    { name: 'Play Zone', path: '/play' },
    { name: 'Official Store', path: '/store' },
  ];

  return (
    <header className="w-full sticky top-0 z-[100] font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
      `}</style>

      {/* Top Utility Bar */}
      <div className="bg-slate-50 text-slate-900 text-[10px] font-black tracking-[0.2em] uppercase py-2.5 px-4 md:px-8 hidden md:flex justify-between items-center border-b border-slate-900/5">
        <div className="flex space-x-8 opacity-60">
          {/* Removed Hospitality, FIFA+, Inside FIFA, Collect links */}
        </div>
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2 text-emerald-500">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="font-black">AUTHENTIC FIFA WORLD CUP 26™ PLATFORM</span>
          </div>
          <div className="h-3 w-px bg-slate-900/10" />
          <div className="flex items-center space-x-4 opacity-60">
            <Link to="/support" className="hover:opacity-100 transition-opacity">Support</Link>
            <Link to="/contact" className="hover:opacity-100 transition-opacity">Contact</Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="bg-white/70 backdrop-blur-2xl text-slate-900 py-4 px-4 md:px-8 flex items-center justify-between border-b border-white/50 shadow-sm shadow-slate-200/50">
        <div className="flex items-center space-x-6">
          {/* Original mobile menu button, now wired up */}
          <button 
            title="Menu"
            className="p-2 hover:bg-slate-900/10 rounded-xl transition-colors focus:outline-none lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
          <Link to="/" title="Home" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center overflow-hidden border border-slate-200 shadow-sm group-hover:scale-105 transition-transform p-1">
              <img src="https://www.gettickets365.com/assets/img/banners/fwc2026.png" alt="FIFA World Cup Trophy" className="h-full w-auto object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tighter uppercase leading-none text-[#006437]">FIFA</span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0A0B1A] leading-none mt-1">World Cup 2026</span>
            </div>
          </Link>
        </div>

        <nav className="hidden lg:flex items-center space-x-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link 
                key={link.name}
                to={link.path} 
                className={`px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all relative group ${
                  isActive ? 'text-slate-900 bg-slate-900/5' : 'text-slate-800 hover:text-slate-900 hover:bg-slate-900/5'
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.div 
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-4 right-4 h-0.5 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center space-x-2 md:space-x-3">
          <button title="Search" className="p-2.5 hover:bg-slate-900/10 rounded-xl transition-colors focus:outline-none text-slate-900/40 hover:text-slate-900">
            <Search className="w-5 h-5" />
          </button>
          <button title="Select Language" className="p-2.5 hover:bg-slate-900/10 rounded-xl transition-colors focus:outline-none flex items-center space-x-2 text-slate-900/40 hover:text-slate-900">
            <Globe className="w-5 h-5" />
            <span className="text-[10px] font-black hidden md:inline uppercase tracking-widest">EN</span>
          </button>
          <Link to="/auth" title="User Profile" className="shining-button p-2.5 rounded-xl flex items-center justify-center">
            <User className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* ── MOBILE NAVIGATION DRAWER ─────────────────────── */}
      {/* ✅ AGENT: Implemented responsive mobile navigation drawer */}
      <div 
        className={`lg:hidden fixed inset-0 bg-[#0A0B1A]/95 backdrop-blur-xl z-40 transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ top: '72px' }}
      >
        <div className="flex flex-col p-6 space-y-6">
          <Link to="/tournaments" onClick={() => setIsMobileMenuOpen(false)} className={`text-xl font-bold uppercase tracking-wider ${location.pathname === '/tournaments' ? 'text-emerald-400' : 'text-white'}`}>Tournaments</Link>
          <Link to="/match-centre" onClick={() => setIsMobileMenuOpen(false)} className={`text-xl font-bold uppercase tracking-wider ${location.pathname === '/match-centre' ? 'text-emerald-400' : 'text-white'}`}>Match Centre</Link>
          <Link to="/tickets" onClick={() => setIsMobileMenuOpen(false)} className={`text-xl font-bold uppercase tracking-wider ${location.pathname === '/tickets' ? 'text-emerald-400' : 'text-white'}`}>Tickets</Link>
          <Link to="/news" onClick={() => setIsMobileMenuOpen(false)} className={`text-xl font-bold uppercase tracking-wider ${location.pathname === '/news' ? 'text-emerald-400' : 'text-white'}`}>News</Link>
          <Link to="/rankings" onClick={() => setIsMobileMenuOpen(false)} className={`text-xl font-bold uppercase tracking-wider ${location.pathname === '/rankings' ? 'text-emerald-400' : 'text-white'}`}>Rankings</Link>
          <Link to="/play" onClick={() => setIsMobileMenuOpen(false)} className={`text-xl font-bold uppercase tracking-wider ${location.pathname === '/play' ? 'text-emerald-400' : 'text-white'}`}>Play</Link>
          <Link to="/store" onClick={() => setIsMobileMenuOpen(false)} className={`text-xl font-bold uppercase tracking-wider ${location.pathname === '/store' ? 'text-emerald-400' : 'text-white'}`}>Store</Link>
          <div className="h-[1px] bg-white/10 w-full my-4"></div>
          <button className="text-lg font-medium text-slate-300 hover:text-white flex items-center gap-3"><Globe className="w-5 h-5"/> English (EN)</button>
          <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-slate-300 hover:text-white flex items-center gap-3"><User className="w-5 h-5"/> Sign In</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
