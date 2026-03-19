import { ArrowRight, Calendar, MapPin } from 'lucide-react';

const Tournaments = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative w-full h-[500px] bg-[#00143F] text-white flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent z-10" />
        <img 
          src="https://picsum.photos/seed/tournament/1920/1080" 
          alt="Tournament" 
          className="absolute inset-0 w-full h-full object-cover opacity-50"
          referrerPolicy="no-referrer"
        />
        <img src="https://www.gettickets365.com/assets/img/banners/fwc2026.png" alt="World Cup Trophy" className="absolute right-0 bottom-0 h-[120%] w-auto object-contain opacity-40 pointer-events-none z-10" />
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 md:px-8 lg:px-16 flex flex-col md:flex-row items-center justify-between w-full">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider border border-white/20">
              <Calendar className="w-4 h-4" />
              <span>11 Jun - 19 Jul 2026</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
              FIFA World<br />Cup 26™
            </h1>
            <div className="space-y-2">
              <p className="text-sm font-bold uppercase tracking-wider text-gray-300">Countdown to FIFA World Cup 2026</p>
              <div className="flex space-x-4 text-3xl md:text-4xl font-black italic tracking-tighter">
                <div className="flex flex-col items-center"><span className="text-[#005eb8]">843</span><span className="text-xs text-gray-400 uppercase not-italic font-bold">Days</span></div>
                <span className="text-gray-600">:</span>
                <div className="flex flex-col items-center"><span className="text-white">08</span><span className="text-xs text-gray-400 uppercase not-italic font-bold">Hrs</span></div>
                <span className="text-gray-600">:</span>
                <div className="flex flex-col items-center"><span className="text-white">01</span><span className="text-xs text-gray-400 uppercase not-italic font-bold">Mins</span></div>
                <span className="text-gray-600">:</span>
                <div className="flex flex-col items-center"><span className="text-white">42</span><span className="text-xs text-gray-400 uppercase not-italic font-bold">Secs</span></div>
              </div>
            </div>
            <button className="bg-white text-black font-bold uppercase tracking-wider px-8 py-4 rounded-full flex items-center space-x-2 hover:bg-gray-200 transition-colors mt-8">
              <span>View matches</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Upcoming Tournaments */}
      <section className="py-16 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        <h2 className="text-3xl font-black uppercase tracking-tight text-[#00143F] mb-8">Upcoming tournaments & events</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "FIFA Futsal World Cup 2024™", dates: "14 Sep - 6 Oct 2024", location: "Uzbekistan", img: "futsal" },
            { title: "FIFA U-20 Women's World Cup 2024™", dates: "31 Aug - 22 Sep 2024", location: "Colombia", img: "u20" },
            { title: "FIFA Club World Cup 2025™", dates: "15 Jun - 13 Jul 2025", location: "USA", img: "club" }
          ].map((tourney, i) => (
            <div key={i} className="group cursor-pointer flex flex-col h-full bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="relative h-48 overflow-hidden bg-gray-100 flex items-center justify-center p-8">
                <img 
                  src={`https://picsum.photos/seed/${tourney.img}/400/300`} 
                  alt={tourney.title} 
                  className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500 mix-blend-multiply"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-6 flex-grow flex flex-col justify-between border-t border-gray-100">
                <div>
                  <h3 className="font-bold text-lg leading-tight text-gray-900 group-hover:text-[#005eb8] transition-colors mb-4">{tourney.title}</h3>
                  <div className="space-y-2 text-sm text-gray-600 font-medium">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span>{tourney.dates}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span>{tourney.location}</span>
                    </div>
                  </div>
                </div>
                <button className="mt-6 w-full py-2 border border-gray-200 rounded-full font-bold uppercase tracking-wider text-xs hover:border-[#005eb8] hover:text-[#005eb8] transition-colors">
                  More Info
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Tournaments */}
      <section className="bg-gray-100 py-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-black uppercase tracking-tight text-[#00143F] mb-8">Recent tournaments & events</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "FIFA Women's World Cup 2023™", dates: "20 Jul - 20 Aug 2023", location: "Australia & New Zealand", img: "wwc" },
              { title: "FIFA World Cup Qatar 2022™", dates: "20 Nov - 18 Dec 2022", location: "Qatar", img: "qatar" },
              { title: "FIFA Club World Cup 2023™", dates: "12 Dec - 22 Dec 2023", location: "Saudi Arabia", img: "club23" }
            ].map((tourney, i) => (
              <div key={i} className="group cursor-pointer flex flex-col h-full bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-200">
                <div className="relative h-48 overflow-hidden bg-gray-50 flex items-center justify-center p-8">
                  <img 
                    src={`https://picsum.photos/seed/${tourney.img}/400/300`} 
                    alt={tourney.title} 
                    className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500 mix-blend-multiply grayscale group-hover:grayscale-0"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-6 flex-grow flex flex-col justify-between border-t border-gray-100">
                  <div>
                    <h3 className="font-bold text-lg leading-tight text-gray-900 group-hover:text-[#005eb8] transition-colors mb-4">{tourney.title}</h3>
                    <div className="space-y-2 text-sm text-gray-600 font-medium">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>{tourney.dates}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span>{tourney.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tournaments;
