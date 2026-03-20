import { Link, useLocation } from 'react-router-dom';
import { Home, Calendar, Ticket, Newspaper, Trophy } from 'lucide-react';

const MobileNav = () => {
  const location = useLocation();

  const tabs = [
    { name: 'Home',     path: '/',             icon: Home },
    { name: 'Matches',  path: '/match-centre', icon: Calendar },
    { name: 'Tickets',  path: '/tickets',      icon: Ticket },
    { name: 'News',     path: '/news',         icon: Newspaper },
    { name: 'Rankings', path: '/rankings',     icon: Trophy },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[200] lg:hidden bg-white/90 backdrop-blur-2xl border-t border-slate-900/10 shadow-2xl shadow-slate-900/20">
      <div className="flex items-stretch">
        {tabs.map(({ name, path, icon: Icon }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={`flex-1 flex flex-col items-center justify-center py-3 gap-1 transition-all active:scale-95 relative ${
                isActive ? 'text-emerald-500' : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              {isActive && (
                <span className="absolute top-0 left-4 right-4 h-0.5 bg-emerald-500 rounded-b-full shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
              )}
              <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 1.8} />
              <span className={`text-[9px] font-black uppercase tracking-wider leading-none ${isActive ? 'text-emerald-500' : 'text-slate-400'}`}>
                {name}
              </span>
            </Link>
          );
        })}
      </div>
      {/* Safe area padding for devices with home indicators */}
      <div className="h-safe-area-inset-bottom" />
    </nav>
  );
};

export default MobileNav;
