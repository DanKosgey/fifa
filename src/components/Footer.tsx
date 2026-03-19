import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Globe, ShieldCheck, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 text-slate-900 pt-24 pb-12 font-sans border-t border-slate-900/5">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
      `}</style>
      
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          
          {/* Brand Column */}
          <div className="space-y-8">
            <Link to="/" className="flex items-center gap-4 group">
              <div className="w-12 h-12 bg-slate-900/5 rounded-2xl flex items-center justify-center p-2 border border-slate-900/10 group-hover:scale-105 transition-transform">
                <img src="https://www.gettickets365.com/assets/img/banners/fwc2026.png" alt="FIFA" className="h-full w-auto object-contain brightness-0 invert" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tighter uppercase leading-none">FIFA</span>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 leading-none mt-1">World Cup 2026</span>
              </div>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">
              The official marketplace for the FIFA World Cup 2026™. Secure your tickets, hospitality, and travel packages for the biggest sporting event in history.
            </p>
            <div className="flex items-center space-x-4">
              <a href="#" className="w-10 h-10 bg-slate-900/5 rounded-xl flex items-center justify-center border border-slate-900/10 hover:bg-slate-900/10 transition-all text-slate-500 hover:text-slate-900">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-900/5 rounded-xl flex items-center justify-center border border-slate-900/10 hover:bg-slate-900/10 transition-all text-slate-500 hover:text-slate-900">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-900/5 rounded-xl flex items-center justify-center border border-slate-900/10 hover:bg-slate-900/10 transition-all text-slate-500 hover:text-slate-900">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-900/5 rounded-xl flex items-center justify-center border border-slate-900/10 hover:bg-slate-900/10 transition-all text-slate-500 hover:text-slate-900">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Tournament</h4>
            <ul className="space-y-4">
              <li><Link to="/tournaments" className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-widest">Host Cities</Link></li>
              <li><Link to="/match-centre" className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-widest">Match Schedule</Link></li>
              <li><a href="#" className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-widest">Teams & Rankings</a></li>
              <li><a href="#" className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-widest">Official News</a></li>
              <li><a href="#" className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-widest">Inside FIFA</a></li>
            </ul>
          </div>

          {/* Tickets & Support */}
          <div className="space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Tickets & Support</h4>
            <ul className="space-y-4">
              <li><Link to="/tickets" className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-widest">Buy Tickets</Link></li>
              <li><a href="#" className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-widest">Hospitality Packages</a></li>
              <li><a href="#" className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-widest">Resale Marketplace</a></li>
              <li><a href="#" className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-widest">Help Centre</a></li>
              <li><a href="#" className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-widest">Ticket Verification</a></li>
            </ul>
          </div>

          {/* Contact & Legal */}
          <div className="space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Contact</h4>
            <ul className="space-y-5">
              <li className="flex items-center space-x-4 group cursor-pointer">
                <div className="w-10 h-10 bg-slate-900/5 rounded-xl flex items-center justify-center border border-slate-900/10 group-hover:bg-slate-900/10 transition-all">
                  <Mail className="w-4 h-4 text-slate-500 group-hover:text-slate-900" />
                </div>
                <span className="text-sm font-bold text-slate-500 group-hover:text-slate-900 transition-colors uppercase tracking-widest">tickets@fifa.com</span>
              </li>
              <li className="flex items-center space-x-4 group cursor-pointer">
                <div className="w-10 h-10 bg-slate-900/5 rounded-xl flex items-center justify-center border border-slate-900/10 group-hover:bg-slate-900/10 transition-all">
                  <Phone className="w-4 h-4 text-slate-500 group-hover:text-slate-900" />
                </div>
                <span className="text-sm font-bold text-slate-500 group-hover:text-slate-900 transition-colors uppercase tracking-widest">+41 43 222 7777</span>
              </li>
              <li className="flex items-center space-x-4 group cursor-pointer">
                <div className="w-10 h-10 bg-slate-900/5 rounded-xl flex items-center justify-center border border-slate-900/10 group-hover:bg-slate-900/10 transition-all">
                  <MapPin className="w-4 h-4 text-slate-500 group-hover:text-slate-900" />
                </div>
                <span className="text-sm font-bold text-slate-500 group-hover:text-slate-900 transition-colors uppercase tracking-widest">Zurich, Switzerland</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-slate-900/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-3 text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Official FIFA Marketplace</span>
            </div>
            <div className="h-4 w-px bg-slate-900/10 hidden md:block" />
            <p className="text-[10px] text-slate-600 font-black uppercase tracking-[0.2em]">
              © {currentYear} FIFA. All rights reserved.
            </p>
          </div>
          
          <div className="flex items-center space-x-8">
            <a href="#" className="text-[10px] font-black text-slate-600 hover:text-slate-900 uppercase tracking-[0.2em] transition-colors">Privacy Policy</a>
            <a href="#" className="text-[10px] font-black text-slate-600 hover:text-slate-900 uppercase tracking-[0.2em] transition-colors">Terms of Service</a>
            <a href="#" className="text-[10px] font-black text-slate-600 hover:text-slate-900 uppercase tracking-[0.2em] transition-colors">Cookie Settings</a>
            <button className="flex items-center space-x-2 text-[10px] font-black text-slate-600 hover:text-slate-900 uppercase tracking-[0.2em] transition-colors">
              <Globe className="w-4 h-4" />
              <span>English (US)</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
