import { Search, Filter, MapPin, Calendar, ShieldCheck, Ticket } from 'lucide-react';
import { Link } from 'react-router-dom';

const Tickets = () => {
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
    }
  ];

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
                placeholder="Search by team, city, or stadium..." 
                className="w-full py-3 text-gray-900 placeholder-gray-500 focus:outline-none font-medium"
              />
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
                <h3 className="font-bold uppercase tracking-wider text-gray-900">Filters</h3>
                <Filter className="w-4 h-4 text-gray-500" />
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-gray-700 mb-3 uppercase">Ticket Type</h4>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-[#005eb8] rounded border-gray-300 focus:ring-[#005eb8]" />
                      <span className="text-gray-700 font-medium">Official Tickets</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-[#005eb8] rounded border-gray-300 focus:ring-[#005eb8]" />
                      <span className="text-gray-700 font-medium">Verified Resale</span>
                    </label>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-gray-700 mb-3 uppercase">Tournament Stage</h4>
                  <div className="space-y-2">
                    {['Group Stage', 'Round of 32', 'Round of 16', 'Quarter-finals', 'Semi-finals', 'Final'].map(stage => (
                      <label key={stage} className="flex items-center space-x-3 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 text-[#005eb8] rounded border-gray-300 focus:ring-[#005eb8]" />
                        <span className="text-gray-700 font-medium">{stage}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Match Listings */}
          <div className="w-full lg:w-3/4 space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Available Matches</h2>
              <span className="text-sm text-gray-500 font-medium">Showing {matches.length} matches</span>
            </div>

            {matches.map((match) => (
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
                    to={`/tickets/${match.id}`}
                    className="w-full bg-[#005eb8] text-white font-bold uppercase tracking-wider px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Ticket className="w-5 h-5" />
                    <span>See Tickets</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tickets;
