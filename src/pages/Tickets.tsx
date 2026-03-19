import React, { useState, useMemo } from 'react';
import { Search, Filter, MapPin, Calendar, ShieldCheck, Ticket, X, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const Tickets = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOfficial, setFilterOfficial] = useState(true);
  const [filterResale, setFilterResale] = useState(true);
  const [selectedStages, setSelectedStages] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("price-low");

  const matches = [
    {
      id: 1,
      team1: "Argentina",
      team2: "France",
      date: "15 Jun 2026",
      time: "20:00",
      venue: "MetLife Stadium, New York/New Jersey",
      stage: "Group Stage",
      startingPrice: 150,
      availableTickets: 342,
      hasOfficial: true,
      hasResale: true,
    },
    {
      id: 2,
      team1: "USA",
      team2: "England",
      date: "18 Jun 2026",
      time: "18:00",
      venue: "SoFi Stadium, Los Angeles",
      stage: "Group Stage",
      startingPrice: 200,
      availableTickets: 128,
      hasOfficial: false,
      hasResale: true,
    },
    {
      id: 3,
      team1: "Brazil",
      team2: "Spain",
      date: "22 Jun 2026",
      time: "21:00",
      venue: "Azteca Stadium, Mexico City",
      stage: "Group Stage",
      startingPrice: 180,
      availableTickets: 512,
      hasOfficial: true,
      hasResale: false,
    },
    {
      id: 4,
      team1: "Germany",
      team2: "Japan",
      date: "25 Jun 2026",
      time: "19:00",
      venue: "Hard Rock Stadium, Miami",
      stage: "Round of 32",
      startingPrice: 250,
      availableTickets: 89,
      hasOfficial: true,
      hasResale: true,
    },
    {
      id: 5,
      team1: "Portugal",
      team2: "Morocco",
      date: "28 Jun 2026",
      time: "20:30",
      venue: "Lumen Field, Seattle",
      stage: "Round of 16",
      startingPrice: 350,
      availableTickets: 45,
      hasOfficial: false,
      hasResale: true,
    }
  ];

  const filteredMatches = useMemo(() => {
    return matches.filter(match => {
      const matchesSearch = 
        match.team1.toLowerCase().includes(searchQuery.toLowerCase()) ||
        match.team2.toLowerCase().includes(searchQuery.toLowerCase()) ||
        match.venue.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesType = (filterOfficial && match.hasOfficial) || (filterResale && match.hasResale);
      
      const matchesStage = selectedStages.length === 0 || selectedStages.includes(match.stage);
      
      return matchesSearch && matchesType && matchesStage;
    }).sort((a, b) => {
      if (sortBy === "price-low") return a.startingPrice - b.startingPrice;
      if (sortBy === "price-high") return b.startingPrice - a.startingPrice;
      if (sortBy === "tickets-low") return a.availableTickets - b.availableTickets;
      if (sortBy === "tickets-high") return b.availableTickets - a.availableTickets;
      return 0;
    });
  }, [searchQuery, filterOfficial, filterResale, selectedStages, sortBy]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (searchQuery) count++;
    if (!filterOfficial || !filterResale) count++;
    count += selectedStages.length;
    return count;
  }, [searchQuery, filterOfficial, filterResale, selectedStages]);

  const toggleStage = (stage: string) => {
    setSelectedStages(prev => 
      prev.includes(stage) ? prev.filter(s => s !== stage) : [...prev, stage]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setFilterOfficial(true);
    setFilterResale(true);
    setSelectedStages([]);
    setSortBy("price-low");
  };

  return (
    <div className="w-full bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-[#00143F] text-white py-16 px-4 md:px-8 lg:px-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="https://picsum.photos/seed/crowd/1920/600" alt="Crowd" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
        <img 
          src="https://www.gettickets365.com/assets/img/banners/fwc2026.png" 
          alt="World Cup 2026" 
          className="absolute right-0 top-1/2 -translate-y-1/2 h-[150%] w-auto opacity-10 pointer-events-none z-0"
          referrerPolicy="no-referrer"
        />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center space-x-2 bg-blue-600/30 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider border border-blue-400/30 mb-6">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span className="text-blue-100">Official & Verified Resale Marketplace</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">
            Secure Your Seat
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl font-medium mb-8">
            Buy official tickets directly or shop verified resale tickets from other fans. 100% guaranteed entry.
          </p>
          
          {/* Search Bar */}
          <div className="flex flex-col md:flex-row gap-4 max-w-3xl bg-white p-2 rounded-2xl shadow-xl">
            <div className="flex-grow relative flex items-center px-4">
              <Search className="w-5 h-5 text-gray-400 mr-3" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by team, city, or stadium..." 
                className="w-full py-3 text-gray-900 placeholder-gray-500 focus:outline-none font-medium"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              )}
            </div>
            <button className="bg-[#005eb8] text-white font-bold uppercase tracking-wider px-8 py-3 rounded-xl hover:bg-blue-700 transition-colors">
              Find Tickets
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Filters Sidebar */}
          <div className="w-full lg:w-1/4">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <h3 className="font-bold uppercase tracking-wider text-gray-900">Filters</h3>
                  {activeFilterCount > 0 && (
                    <span className="bg-[#005eb8] text-white text-[10px] font-black px-1.5 py-0.5 rounded-full">
                      {activeFilterCount}
                    </span>
                  )}
                </div>
                {activeFilterCount > 0 && (
                  <button 
                    onClick={clearFilters} 
                    className="text-[10px] font-black text-red-500 hover:text-red-700 uppercase tracking-widest flex items-center space-x-1 transition-colors"
                  >
                    <X className="w-3 h-3" />
                    <span>Reset</span>
                  </button>
                )}
              </div>
              
              <div className="space-y-8">
                {/* Ticket Type Section */}
                <div>
                  <h4 className="text-[11px] font-black text-gray-400 mb-4 uppercase tracking-widest">Ticket Type</h4>
                  <div className="grid grid-cols-1 gap-2">
                    <button 
                      onClick={() => setFilterOfficial(!filterOfficial)}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-all duration-200 text-left ${
                        filterOfficial 
                        ? 'bg-blue-50 border-[#005eb8] text-[#005eb8] shadow-sm' 
                        : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      <span className="text-sm font-bold">Official Tickets</span>
                      {filterOfficial && <Check className="w-4 h-4" />}
                    </button>
                    <button 
                      onClick={() => setFilterResale(!filterResale)}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-all duration-200 text-left ${
                        filterResale 
                        ? 'bg-green-50 border-green-600 text-green-700 shadow-sm' 
                        : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      <span className="text-sm font-bold">Verified Resale</span>
                      {filterResale && <Check className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Tournament Stage Section */}
                <div>
                  <h4 className="text-[11px] font-black text-gray-400 mb-4 uppercase tracking-widest">Tournament Stage</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Group Stage', 'Round of 32', 'Round of 16', 'Quarter-finals', 'Semi-finals', 'Final'].map(stage => {
                      const isSelected = selectedStages.includes(stage);
                      return (
                        <button
                          key={stage}
                          onClick={() => toggleStage(stage)}
                          className={`px-3 py-2 rounded-lg text-xs font-bold transition-all duration-200 border ${
                            isSelected
                            ? 'bg-[#00143F] border-[#00143F] text-white shadow-md transform scale-105'
                            : 'bg-white border-gray-200 text-gray-600 hover:border-gray-400'
                          }`}
                        >
                          {stage}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {activeFilterCount > 0 && (
                  <button 
                    onClick={clearFilters}
                    className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-bold uppercase tracking-widest rounded-xl transition-colors"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Match Listings */}
          <div className="w-full lg:w-3/4 space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Available Matches</h2>
                <span className="text-sm text-gray-500 font-medium">Showing {filteredMatches.length} matches</span>
              </div>
              
              <div className="flex items-center space-x-2 bg-white border border-gray-200 rounded-xl px-3 py-2 shadow-sm">
                <Filter className="w-4 h-4 text-gray-400" />
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Sort By:</span>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-sm font-bold text-gray-900 focus:outline-none bg-transparent cursor-pointer"
                >
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="tickets-low">Availability: Low to High</option>
                  <option value="tickets-high">Availability: High to Low</option>
                </select>
              </div>
            </div>

            {filteredMatches.length > 0 ? (
              filteredMatches.map((match) => (
                <div key={match.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col md:flex-row">
                  {/* Match Info */}
                  <div className="p-6 flex-grow border-b md:border-b-0 md:border-r border-gray-100">
                    <div className="flex items-center space-x-2 mb-4">
                      <span className="text-xs font-bold uppercase tracking-widest text-[#005eb8] bg-blue-50 px-2 py-1 rounded">{match.stage}</span>
                      <div className="flex items-center space-x-1 text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        <Calendar className="w-3 h-3" />
                        <span>{match.date} • {match.time}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="flex items-center space-x-3 w-1/2">
                        <div className="w-8 h-8 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
                          <img src={`https://picsum.photos/seed/${match.team1}/50/50`} alt={match.team1} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                        <span className="text-xl font-black uppercase tracking-tight text-gray-900">{match.team1}</span>
                      </div>
                      <span className="text-sm font-bold text-gray-400">VS</span>
                      <div className="flex items-center space-x-3 w-1/2 justify-end">
                        <span className="text-xl font-black uppercase tracking-tight text-gray-900">{match.team2}</span>
                        <div className="w-8 h-8 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
                          <img src={`https://picsum.photos/seed/${match.team2}/50/50`} alt={match.team2} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center text-sm text-gray-600 font-medium">
                      <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                      {match.venue}
                    </div>
                  </div>

                  {/* Ticket Action */}
                  <div className="p-6 bg-gray-50 flex flex-col justify-center items-center md:items-end min-w-[250px]">
                    <div className="text-center md:text-right mb-4">
                      <div className="text-sm text-gray-500 font-medium mb-1">Tickets from</div>
                      <div className="text-3xl font-black text-[#00143F]">${match.startingPrice}</div>
                      <div className="flex items-center justify-center md:justify-end space-x-2 mt-2">
                        {match.hasOfficial && <span className="w-2 h-2 rounded-full bg-blue-500" title="Official Tickets Available"></span>}
                        {match.hasResale && <span className="w-2 h-2 rounded-full bg-green-500" title="Resale Tickets Available"></span>}
                        <span className="text-xs text-gray-500 font-medium">{match.availableTickets} listings</span>
                      </div>
                    </div>
                    <Link 
                      to={`/match/${match.id}`}
                      className="w-full bg-[#005eb8] text-white font-bold uppercase tracking-wider px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                    >
                      <Ticket className="w-5 h-5" />
                      <span>See Tickets</span>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-2xl p-12 text-center border border-gray-200">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">No matches found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your filters or search query to find what you're looking for.</p>
                <button onClick={clearFilters} className="text-[#005eb8] font-bold uppercase tracking-widest text-sm hover:underline">Clear all filters</button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tickets;
