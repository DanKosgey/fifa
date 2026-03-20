import React from 'react';
import { motion } from 'framer-motion';
import { Star, CheckCircle, ChevronRight, Briefcase } from 'lucide-react';

const packages = [
  { id: 'club', name: 'FIFA Club', price: '$950', color: 'bg-blue-600', 
    features: ['Prime Category 1 match ticket', 'Shared stadium lounge access', 'Gourmet deli-style food offering', 'Premium beverages in lounge', 'Official commemorative gift'] },
  { id: 'premier', name: 'Business Seat', price: '$2,250', color: 'bg-emerald-600', popular: true,
    features: ['Prime Category 1 match ticket', 'Premium shared luxury lounge', 'Chef-curated hot food stations', 'Champagne & premium bar selection', 'VIP parking (1 per 4 guests)', 'Exclusive tournament gift'] },
  { id: 'suite', name: 'Private Suite', price: '$15,000+', color: 'bg-slate-900', 
    features: ['Private stadium suite (up to 20 guests)', 'Elevated private suite seating', 'Personalised five-star catering', 'Exclusive open bar with champagne', 'VIP priority fast-track access', 'Customized corporate branding options'] }
];

// ✅ AGENT COMPLETED: Hospitality VIP package tier list resolving broken links
const Hospitality = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-24 relative overflow-hidden">
      <div className="bg-[#0A0B1A] text-white pt-24 pb-32 relative overflow-hidden z-10 w-full text-center">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B1A] to-slate-900 z-0 opacity-50"></div>
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-20">
          <div className="inline-flex items-center justify-center w-16 h-16 glass-card bg-white/10 border-white/20 mb-8 shadow-xl">
            <Star className="w-8 h-8 text-emerald-500" />
          </div>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 shining-text">
            Official <br/>Hospitality
          </h1>
          <p className="text-slate-300 font-semibold max-w-2xl text-lg mx-auto mb-10 leading-relaxed drop-shadow-sm">
            Elevate your FIFA World Cup™ experience with premium lounges, exquisite dining, and the best seats in the stadium.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-20 -mt-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, i) => (
            <motion.div 
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`glass-card p-12 transition-all duration-300 relative flex flex-col border-white/60 shadow-2xl ${pkg.popular ? 'scale-105 z-10 border-emerald-500/50 shadow-emerald-500/10' : ''}`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full border-4 border-[#0A0B1A]">
                  Most Popular
                </div>
              )}
              
              <div className="mb-8">
                <div className={`w-12 h-12 rounded-xl mb-6 flex items-center justify-center text-white ${pkg.color} shadow-lg`}>
                  <Briefcase className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight text-slate-900 mb-2">{pkg.name}</h3>
                <div className="flex items-end gap-2 text-slate-900 font-mono-data">
                  <span className="text-4xl font-black tracking-tighter">{pkg.price}</span>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">/ person</span>
                </div>
              </div>

              <div className="space-y-4 flex-grow mb-10">
                {pkg.features.map((feat, fi) => (
                  <div key={fi} className="flex items-start gap-3">
                    <CheckCircle className={`w-5 h-5 shrink-0 ${pkg.popular ? 'text-emerald-500' : 'text-slate-300'}`} />
                    <span className="text-sm font-medium text-slate-600 leading-relaxed">{feat}</span>
                  </div>
                ))}
              </div>

              <button className={`w-full py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all ${pkg.popular ? 'bg-emerald-500 text-white shadow-xl shadow-emerald-500/20 hover:bg-emerald-400' : 'bg-slate-50 text-slate-900 border border-slate-900/10 hover:bg-slate-900/10'}`}>
                <span>Request Details</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hospitality;
