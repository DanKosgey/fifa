import { Link } from 'react-router-dom';
import { Menu, Search, Globe, User } from 'lucide-react';

const Header = () => {
  return (
    <header className="w-full">
      {/* Top Utility Bar */}
      <div className="bg-[#00143F] text-white text-[11px] font-bold tracking-wider uppercase py-2 px-4 md:px-8 hidden md:flex justify-between items-center">
        <div className="flex space-x-6">
          <a href="#" className="hover:text-gray-300 transition-colors">Tickets & Hospitality</a>
          <a href="#" className="hover:text-gray-300 transition-colors">FIFA+</a>
          <a href="#" className="hover:text-gray-300 transition-colors">FIFA Store</a>
          <a href="#" className="hover:text-gray-300 transition-colors">FIFA Collect</a>
          <a href="#" className="hover:text-gray-300 transition-colors">Inside FIFA</a>
        </div>
        <div className="flex space-x-4">
          {/* Empty right side for now, or maybe login/register if it was there */}
        </div>
      </div>

      {/* Main Navbar */}
      <div className="bg-[#005eb8] text-white py-3 px-4 md:px-8 flex items-center justify-between sticky top-0 z-50 shadow-md">
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors focus:outline-none">
            <Menu className="w-6 h-6" />
          </button>
          <Link to="/" className="flex items-center gap-2">
            <img src="https://www.gettickets365.com/assets/img/banners/fwc2026.png" alt="World Cup Trophy" className="h-10 w-auto object-contain" />
            <span className="text-2xl font-black tracking-tighter uppercase italic">FIFA</span>
          </Link>
        </div>

        <nav className="hidden lg:flex items-center space-x-6 text-sm font-bold uppercase tracking-wide">
          <Link to="/tournaments" className="hover:text-gray-200 transition-colors py-2">Tournaments</Link>
          <Link to="/match-centre" className="hover:text-gray-200 transition-colors py-2">Match Centre</Link>
          <a href="#" className="hover:text-gray-200 transition-colors py-2">News</a>
          <a href="#" className="hover:text-gray-200 transition-colors py-2">Rankings</a>
          <a href="#" className="hover:text-gray-200 transition-colors py-2">Play</a>
          <a href="#" className="hover:text-gray-200 transition-colors py-2">FIFA Rewards</a>
          <a href="#" className="hover:text-gray-200 transition-colors py-2">Shop</a>
          <a href="#" className="hover:text-gray-200 transition-colors py-2">Watch on FIFA+</a>
          <a href="#" className="hover:text-gray-200 transition-colors py-2">Inside FIFA</a>
        </nav>

        <div className="flex items-center space-x-2 md:space-x-4">
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors focus:outline-none">
            <Search className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors focus:outline-none flex items-center space-x-1">
            <Globe className="w-5 h-5" />
            <span className="text-xs font-bold hidden md:inline">EN</span>
          </button>
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors focus:outline-none">
            <User className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
