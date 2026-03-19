import { Link, useLocation } from 'react-router-dom';
import { Menu, Search, Globe, User, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

const Header = () => {
  const location = useLocation();

  const navLinks = [
    { name: 'Tournaments', path: '/tournaments' },
    { name: 'Match Centre', path: '/match-centre' },
    { name: 'Tickets', path: '/tickets' },
    { name: 'News', path: '#' },
    { name: 'Rankings', path: '#' },
    { name: 'Play', path: '#' },
    { name: 'FIFA Store', path: '#' },
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
          <div className="flex items-center space-x-2 text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Official Marketplace</span>
          </div>
          <div className="h-3 w-px bg-slate-900/10" />
          <div className="flex items-center space-x-4 opacity-60">
            <a href="#" className="hover:opacity-100 transition-opacity">Support</a>
            <a href="#" className="hover:opacity-100 transition-opacity">Contact</a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="bg-slate-50/40 backdrop-blur-2xl text-slate-900 py-4 px-4 md:px-8 flex items-center justify-between border-b border-slate-900/10 shadow-2xl shadow-black/50">
        <div className="flex items-center space-x-6">
          <button className="p-2 hover:bg-slate-900/10 rounded-xl transition-colors focus:outline-none lg:hidden">
            <Menu className="w-6 h-6" />
          </button>
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-slate-900/10 backdrop-blur-md rounded-xl flex items-center justify-center p-1.5 border border-slate-900/20 shadow-lg group-hover:scale-105 transition-transform">
              <img src="https://www.gettickets365.com/assets/img/banners/fwc2026.png" alt="FIFA" className="h-full w-auto object-contain brightness-0 invert" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tighter uppercase leading-none shining-text">FIFA</span>
              <span className="text-[8px] font-black uppercase tracking-[0.3em] text-slate-900/40 leading-none mt-1">World Cup 2026</span>
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
                  isActive ? 'text-slate-900' : 'text-slate-900/40 hover:text-slate-900 hover:bg-slate-900/5'
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
          <button className="p-2.5 hover:bg-slate-900/10 rounded-xl transition-colors focus:outline-none text-slate-900/40 hover:text-slate-900">
            <Search className="w-5 h-5" />
          </button>
          <button className="p-2.5 hover:bg-slate-900/10 rounded-xl transition-colors focus:outline-none flex items-center space-x-2 text-slate-900/40 hover:text-slate-900">
            <Globe className="w-5 h-5" />
            <span className="text-[10px] font-black hidden md:inline uppercase tracking-widest">EN</span>
          </button>
          <div className="h-6 w-px bg-slate-900/10 mx-2 hidden md:block" />
          <button className="shining-button p-2.5 rounded-xl">
            <User className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
