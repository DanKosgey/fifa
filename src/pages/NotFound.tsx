import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

// ✅ AGENT: Created a branded 404 Not Found page to handle invalid routes safely
const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center text-slate-900">
      <div className="w-24 h-24 bg-red-500/10 rounded-[2.5rem] flex items-center justify-center mb-8 border border-red-500/20">
        <ShieldAlert className="w-12 h-12 text-red-500" />
      </div>
      <h1 className="text-6xl font-black uppercase tracking-tighter mb-4">404</h1>
      <h2 className="text-2xl font-black uppercase tracking-tight mb-4">Page Not Found</h2>
      <p className="text-slate-500 font-bold uppercase tracking-widest max-w-md mb-10 leading-relaxed text-sm">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link 
        to="/"
        className="shining-button bg-emerald-500 text-white font-black uppercase tracking-[0.3em] px-10 py-5 rounded-2xl flex items-center gap-3 shadow-xl shadow-emerald-500/20 text-[10px]"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Home</span>
      </Link>
    </div>
  );
};

export default NotFound;
