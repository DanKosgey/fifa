import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Clock, Search, Filter, ChevronRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { apiService, NewsItem } from '../services/api';

const News = () => {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  const filters = ["All", "OFFICIAL", "INTERVIEW", "TICKETING", "FEATURES", "INNOVATION"];

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await apiService.getNews();
        setNews(data);
      } catch (error) {
        console.error("Failed to fetch news:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  const displayNews = news.filter(n => {
    const matchesSearch = n.title.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = activeFilter === "All" || n.cat === activeFilter;
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Loading Stories...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-24 relative overflow-hidden">
      <Helmet>
        <title>Latest News | FIFA World Cup 2026™ Updates</title>
        <meta name="description" content="Stay updated with breaking news, exclusive interviews, and official announcements from the FIFA World Cup 2026™." />
      </Helmet>
      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-blue-500/5 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-emerald-500/5 blur-[120px]" />
      </div>

      <div className="bg-[#0A0B1A] text-white pt-24 pb-16 relative overflow-hidden z-10 w-full">
        <div className="absolute inset-0 bg-[url('https://www.gettickets365.com/assets/img/banners/fwc2026.png')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-20">
          <div className="flex items-center space-x-3 mb-6">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500">Global Coverage</span>
            <div className="h-px w-12 bg-emerald-500/30" />
          </div>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 shining-text">
            Tournament <br />News
          </h1>
          <p className="text-slate-300 font-bold max-w-xl text-lg flex items-center gap-3 drop-shadow-sm leading-relaxed">
            The official home for breaking stories, exclusive interviews, and match coverage from across the globe.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          {/* Filters */}
          <div className="flex overflow-x-auto w-full md:w-auto gap-2 pb-2 md:pb-0 hide-scrollbar">
            {filters.map(f => (
              <button 
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`flex-shrink-0 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                  activeFilter === f 
                    ? 'bg-emerald-500 text-white border-white/40 shadow-xl shadow-emerald-500/20' 
                    : 'glass-card text-slate-900/60 border-white/40 hover:border-white hover:bg-white transition-all'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-72">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="block w-full pl-11 pr-4 py-3 glass-card rounded-xl text-sm font-black text-slate-900 placeholder-slate-900/20 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500/60 transition-all shadow-2xl border-white/60 uppercase tracking-widest"
              placeholder="Search coverage..." 
            />
          </div>
        </div>

        {displayNews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {displayNews.map((n, i) => (
              <motion.div 
                key={n.id} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group glass-card glass-card-hover cursor-pointer flex flex-col border-white/60 shadow-2xl"
              >
                <div className="h-56 overflow-hidden relative border-b border-slate-900/5">
                  <img src={`https://picsum.photos/seed/${n.seed}wc26/600/400`} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90" />
                  <div className="absolute top-4 left-4 bg-slate-900/80 text-white text-[9px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest backdrop-blur-md">
                    {n.cat}
                  </div>
                </div>
                <div className="p-8 flex-grow flex flex-col">
                  <h4 className="text-lg font-black text-slate-900 leading-tight mb-6 group-hover:text-emerald-600 transition-colors uppercase tracking-tight">{n.title}</h4>
                  <div className="mt-auto flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-emerald-500" />
                      <span className="text-[10px] text-slate-800 font-black uppercase tracking-widest">{n.time}</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-emerald-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center bg-white rounded-[2rem] border border-slate-900/10 shadow-lg shadow-slate-900/5">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-2">No Stories Found</h3>
            <p className="text-sm text-slate-500 font-medium mb-8">We couldn't find any news articles matching your current filters.</p>
            <button 
              onClick={() => { setSearch(''); setActiveFilter('All'); }}
              className="px-8 py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default News;
