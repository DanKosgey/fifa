import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Tournaments from './pages/Tournaments';
import MatchCentre from './pages/MatchCentre';
import MatchDetail from './pages/MatchDetail';
import TicketAdPopup from './components/TicketAdPopup';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans bg-gray-50 text-gray-900">
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
        <TicketAdPopup />
      </div>
    </Router>
  );
}

export default App;
