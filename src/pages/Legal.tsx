import React from 'react';
import { ShieldCheck } from 'lucide-react';

// ✅ AGENT COMPLETED: Generic Legal disclosure page to handle Privacy/Terms/Cookie dead links
const Legal = () => {
  return (
    <div className="min-h-screen bg-transparent text-slate-900 pb-32">
      <div className="bg-slate-50 py-24 border-b border-slate-900/5">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl border border-slate-900/5 mb-8 shadow-lg shadow-slate-900/5">
            <ShieldCheck className="w-8 h-8 text-emerald-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-slate-900 mb-6 font-primary">
            Legal & Privacy Protocol
          </h1>
          <p className="text-slate-800 font-bold text-lg uppercase tracking-tight max-w-2xl mx-auto leading-relaxed">
            Official legal framework and data protection protocols for the FIFA World Cup 26™ digital ecosystem.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-8 pt-16 prose prose-slate prose-emerald lg:prose-lg max-w-none">
        <h2 className="text-2xl font-black uppercase tracking-tight text-slate-900 mb-6">1. Terms of Service</h2>
        <p className="text-slate-600 mb-8 leading-relaxed">
          Welcome to the official digital platform of the FIFA World Cup 2026™. By accessing or using our websites, 
          mobile applications, and ticketing services, you agree to be bound by these comprehensive terms of service. 
          The platform provides real-time information, interactive games, and official ticket purchasing channels.
        </p>

        <h2 className="text-2xl font-black uppercase tracking-widest text-slate-900 mb-6 mt-12">2. Official Privacy Protocol</h2>
        <p className="text-slate-600 mb-8 leading-relaxed">
          We take your privacy seriously. The collection, processing, and protection of personal data including names, 
          contact details, and payment information during ticketing processes adheres strictly to global data protection laws. 
          Data is only shared with verified third-party vendors necessary for event security and credential verification.
        </p>

        <h2 className="text-2xl font-black uppercase tracking-tight text-slate-900 mb-6 mt-12">3. Cookie Settings</h2>
        <p className="text-slate-600 mb-8 leading-relaxed">
          This platform utilizes cookies and similar tracking technologies to enhance user experience, provide live websocket updates, and ensure secure authentication. 
          Essential cookies cannot be disabled as they are required for ticket checkout infrastructure.
        </p>

        <div className="mt-16 p-8 bg-slate-50 rounded-3xl border border-slate-900/5 text-center">
          <p className="text-slate-800 text-sm font-black uppercase tracking-[0.2em] mb-4">Questions regarding our legal protocol?</p>
          <a href="/support" className="inline-block shining-button bg-slate-900 text-white font-black uppercase tracking-[0.2em] px-8 py-4 rounded-xl text-[10px] hover:bg-slate-800 transition-all">
            Contact Legal Protocol
          </a>
        </div>
      </div>
    </div>
  );
};

export default Legal;
