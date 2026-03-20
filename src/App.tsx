import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Tournaments from './pages/Tournaments';
import MatchCentre from './pages/MatchCentre';
import MatchDetail from './pages/MatchDetail';
import Tickets from './pages/Tickets';
import NotFound from './pages/NotFound';
import News from './pages/News';
import Rankings from './pages/Rankings';
import Play from './pages/Play';
import Store from './pages/Store';
import Auth from './pages/Auth';
import Legal from './pages/Legal';
import Support from './pages/Support';
import Teams from './pages/Teams';
import Hospitality from './pages/Hospitality';
import InsideFifa from './pages/InsideFifa';
import TicketVerification from './pages/TicketVerification';
import BallTicketWidget from './components/BallTicketWidget';

function App() {
  return (
    <HelmetProvider>
      <CartProvider>
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
              <Route path="/tickets" element={<Tickets />} />
              <Route path="/news" element={<News />} />
              <Route path="/rankings" element={<Rankings />} />
              <Route path="/play" element={<Play />} />
              <Route path="/store" element={<Store />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/privacy-policy" element={<Legal />} />
              <Route path="/terms" element={<Legal />} />
              <Route path="/cookie-settings" element={<Legal />} />
              <Route path="/support" element={<Support />} />
              <Route path="/contact" element={<Support />} />
              <Route path="/help-centre" element={<Support />} />
              <Route path="/ticket-verification" element={<TicketVerification />} />
              <Route path="/teams" element={<Teams />} />
              <Route path="/hospitality" element={<Hospitality />} />
              <Route path="/inside-fifa" element={<InsideFifa />} />
              <Route path="/legal" element={<Legal />} />
              {/* ✅ AGENT: Added catch-all route for missing pages to prevent unhandled routing state */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <BallTicketWidget />
        </div>
      </div>
        </Router>
      </CartProvider>
    </HelmetProvider>
  );
}

export default App;
