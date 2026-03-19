import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Tournaments from './pages/Tournaments';
import MatchCentre from './pages/MatchCentre';
import MatchDetail from './pages/MatchDetail';
import BallTicketWidget from './components/BallTicketWidget';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans bg-slate-50 text-slate-900 selection:bg-emerald-500/30 overflow-x-hidden">
        {/* Global Atmospheric Background */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full animate-pulse-slow" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full animate-pulse-slow delay-1000" />
          <div className="absolute top-[30%] right-[10%] w-[30%] h-[30%] bg-violet-500/5 blur-[100px] rounded-full animate-pulse-slow delay-2000" />
        </div>

        <div className="relative z-10 flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tournaments" element={<Tournaments />} />
              <Route path="/match-centre" element={<MatchCentre />} />
              <Route path="/match/:id" element={<MatchDetail />} />
            </Routes>
          </main>
          <Footer />
          <BallTicketWidget />
        </div>
      </div>
    </Router>
  );
}

export default App;
