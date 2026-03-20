import express from "express";
import { createServer as createViteServer } from "vite";
import { WebSocketServer, WebSocket } from "ws";
import path from "path";

// Mock Database
interface Match {
  id: string;
  date: string;
  time: string;
  t1: string;
  t1Code: string;
  t1Flag: string;
  t2: string;
  t2Code: string;
  t2Flag: string;
  s1: string;
  s2: string;
  status: string;
  competition: string;
  group: string;
  venue: string;
  city: string;
}

export interface Team {
  id: string;
  code: string;
  name: string;
  flag: string;
  pts: string;
  change: string;
  pos: number;
  region: string;
  pot: number;
}

interface NewsItem {
  id: string;
  cat: string;
  title: string;
  seed: string;
  time: string;
}

let matches: Match[] = [
  { id: 'm1', date: '2026-06-11', time: "19:00", t1: "Mexico", t1Code: "MEX", t1Flag: 'https://flagcdn.com/w160/mx.png', t2: "South Africa", t2Code: "RSA", t2Flag: 'https://flagcdn.com/w160/za.png', s1: "0", s2: "0", status: "LIVE", competition: "FIFA World Cup 2026™", group: "Group A", venue: "Estadio Azteca", city: "Mexico City" },
  { id: 'm2', date: '2026-06-12', time: "15:00", t1: "USA", t1Code: "USA", t1Flag: 'https://flagcdn.com/w160/us.png', t2: "Paraguay", t2Code: "PAR", t2Flag: 'https://flagcdn.com/w160/py.png', s1: "2", s2: "1", status: "FT", competition: "FIFA World Cup 2026™", group: "Group B", venue: "SoFi Stadium", city: "Los Angeles" },
  { id: 'm3', date: '2026-06-12', time: "18:00", t1: "Canada", t1Code: "CAN", t1Flag: 'https://flagcdn.com/w160/ca.png', t2: "Norway", t2Code: "NOR", t2Flag: 'https://flagcdn.com/w160/no.png', s1: "1", s2: "1", status: "75'", competition: "FIFA World Cup 2026™", group: "Group C", venue: "BMO Field", city: "Toronto" },
  { id: 'm4', date: '2026-06-13', time: "12:00", t1: "Brazil", t1Code: "BRA", t1Flag: 'https://flagcdn.com/w160/br.png', t2: "Japan", t2Code: "JPN", t2Flag: 'https://flagcdn.com/w160/jp.png', s1: "3", s2: "0", status: "FT", competition: "FIFA World Cup 2026™", group: "Group D", venue: "AT&T Stadium", city: "Dallas" },
  { id: 'm5', date: '2026-06-13', time: "15:00", t1: "France", t1Code: "FRA", t1Flag: 'https://flagcdn.com/w160/fr.png', t2: "Morocco", t2Code: "MAR", t2Flag: 'https://flagcdn.com/w160/ma.png', s1: "0", s2: "0", status: "15'", competition: "FIFA World Cup 2026™", group: "Group E", venue: "MetLife Stadium", city: "New York/New Jersey" },
  { id: 'm6', date: '2026-06-14', time: "12:00", t1: "Argentina", t1Code: "ARG", t1Flag: 'https://flagcdn.com/w160/ar.png', t2: "South Korea", t2Code: "KOR", t2Flag: 'https://flagcdn.com/w160/kr.png', s1: "2", s2: "0", status: "FT", competition: "FIFA World Cup 2026™", group: "Group F", venue: "Hard Rock Stadium", city: "Miami" },
  { id: 'm7', date: '2026-06-14', time: "18:00", t1: "Spain", t1Code: "ESP", t1Flag: 'https://flagcdn.com/w160/es.png', t2: "Australia", t2Code: "AUS", t2Flag: 'https://flagcdn.com/w160/au.png', s1: "1", s2: "2", status: "60'", competition: "FIFA World Cup 2026™", group: "Group G", venue: "Estadio Akron", city: "Guadalajara" },
  { id: 'm8', date: '2026-06-15', time: "21:00", t1: "England", t1Code: "ENG", t1Flag: 'https://flagcdn.com/w160/gb-eng.png', t2: "Egypt", t2Code: "EGY", t2Flag: 'https://flagcdn.com/w160/eg.png', s1: "0", s2: "0", status: "UPCOMING", competition: "FIFA World Cup 2026™", group: "Group H", venue: "Lumen Field", city: "Seattle" },
  { id: 'm9', date: '2026-06-15', time: "14:00", t1: "Germany", t1Code: "GER", t1Flag: 'https://flagcdn.com/w160/de.png', t2: "Uruguay", t2Code: "URU", t2Flag: 'https://flagcdn.com/w160/uy.png', s1: "1", s2: "0", status: "HT", competition: "FIFA World Cup 2026™", group: "Group I", venue: "BC Place", city: "Vancouver" },
];

let teams: Team[] = [
  { id: '1', code: 'ARG', name: 'Argentina', flag: '🇦🇷', pts: '1855.20', change: '0', pos: 1, region: 'CONMEBOL', pot: 1 },
  { id: '2', code: 'FRA', name: 'France', flag: '🇫🇷', pts: '1840.59', change: '+1', pos: 2, region: 'UEFA', pot: 1 },
  { id: '3', code: 'BRA', name: 'Brazil', flag: '🇧🇷', pts: '1837.56', change: '-1', pos: 3, region: 'CONMEBOL', pot: 1 },
  { id: '4', code: 'ENG', name: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', pts: '1807.88', change: '0', pos: 4, region: 'UEFA', pot: 1 },
  { id: '5', code: 'BEL', name: 'Belgium', flag: '🇧🇪', pts: '1792.64', change: '0', pos: 5, region: 'UEFA', pot: 1 },
  { id: '11', code: 'USA', name: 'USA', flag: '🇺🇸', pts: '1665.27', change: '+2', pos: 11, region: 'CONCACAF', pot: 1 },
  { id: '12', code: 'MEX', name: 'Mexico', flag: '🇲🇽', pts: '1661.46', change: '0', pos: 12, region: 'CONCACAF', pot: 1 },
  { id: '13', code: 'MAR', name: 'Morocco', flag: '🇲🇦', pts: '1658.49', change: '-1', pos: 13, region: 'CAF', pot: 2 },
  { id: '18', code: 'JPN', name: 'Japan', flag: '🇯🇵', pts: '1614.33', change: '+1', pos: 18, region: 'AFC', pot: 2 },
  { id: '20', code: 'SEN', name: 'Senegal', flag: '🇸🇳', pts: '1594.31', change: '0', pos: 20, region: 'CAF', pot: 3 },
  { id: '21', code: 'KOR', name: 'South Korea', flag: '🇰🇷', pts: '1580.00', change: '0', pos: 21, region: 'AFC', pot: 3 },
  { id: '22', code: 'AUS', name: 'Australia', flag: '🇦🇺', pts: '1570.00', change: '0', pos: 22, region: 'AFC', pot: 3 },
];

let news: NewsItem[] = [
  { id: 'n1', cat: 'QUALIFICATION', title: 'Only Six Spots Remain: The Nations Still Fighting for 2026', seed: 'qualify', time: '2h ago' },
  { id: 'n2', cat: 'TEAMS', title: 'Debutants Ready to Shine: Cape Verde, Curaçao, Jordan & Uzbekistan', seed: 'debut', time: '4h ago' },
  { id: 'n3', cat: 'VENUES', title: 'MetLife Stadium Prepares for the Most-Watched Final in History', seed: 'stadium', time: '6h ago' },
  { id: 'n4', cat: 'FEATURES', title: '28 Superstars: Cristiano Ronaldo\'s World Cup Legacy Explored', seed: 'ronaldo', time: '8h ago' },
];

interface TicketListing {
  id: string;
  matchId: string;
  category: string;
  price: number;
  sectionId?: string;
  row?: string;
  seat?: string;
  seller?: string;
  type?: string;
}

interface PriceAlert {
  id: string;
  userId: string;
  matchId: string;
  category: string;
  maxPrice: number;
}

let listings: TicketListing[] = [
  { id: "t1", matchId: "m1", category: "Category 1", price: 800, sectionId: "W_LOW", row: "A", seat: "12", seller: "VerifiedFan", type: "e-ticket" },
  { id: "t2", matchId: "m1", category: "Category 1", price: 750, sectionId: "W_LOW", row: "B", seat: "14", seller: "TrustTickets", type: "e-ticket" },
  { id: "t3", matchId: "m1", category: "Category 2", price: 500, sectionId: "E_LOW", row: "F", seat: "22", seller: "SoccerFan99", type: "paper" },
  { id: "t4", matchId: "m1", category: "Category 2", price: 480, sectionId: "N_LOW", row: "C", seat: "8", seller: "VerifiedFan", type: "e-ticket" },
  { id: "t5", matchId: "m1", category: "Category 3", price: 250, sectionId: "S_LOW", row: "D", seat: "15", seller: "QuickTix", type: "e-ticket" },
  { id: "t6", matchId: "m1", category: "Category 4", price: 150, sectionId: "N_UP", row: "AA", seat: "101", seller: "GlobalTickets", type: "e-ticket" },
  { id: "t7", matchId: "m1", category: "Category 4", price: 140, sectionId: "NW_UP", row: "BB", seat: "45", seller: "Fan2Fan", type: "e-ticket" },
  { id: "t8", matchId: "m1", category: "Category 3", price: 280, sectionId: "SE_LOW", row: "G", seat: "33", seller: "VerifiedFan", type: "e-ticket" },
];

let alerts: PriceAlert[] = [];
const clients = new Map<string, WebSocket>();

async function startServer() {
  const app = express();
  const PORT = 3000;
  app.use(express.json());

  app.get("/api/health", (req, res) => res.json({ status: "ok" }));

  app.get("/api/matches", (req, res) => res.json(matches));
  app.get("/api/teams", (req, res) => res.json(teams));
  app.get("/api/news", (req, res) => res.json(news));

  app.get("/api/matches/:id/tickets", (req, res) => {
    const matchId = req.params.id;
    res.json(listings.filter((l) => l.matchId === matchId));
  });

  app.post("/api/alerts", (req, res) => {
    const { userId, matchId, category, maxPrice } = req.body;
    if (!userId || !matchId || !category || !maxPrice) return res.status(400).json({ error: "Missing fields" });
    const newAlert = { id: Math.random().toString(36).substring(7), userId, matchId, category, maxPrice: Number(maxPrice) };
    alerts.push(newAlert);
    res.status(201).json(newAlert);
  });

  app.get("/api/alerts/:userId", (req, res) => res.json(alerts.filter((a) => a.userId === req.params.userId)));
  app.delete("/api/alerts/:id", (req, res) => {
    alerts = alerts.filter((a) => a.id !== req.params.id);
    res.json({ success: true });
  });

  // Explicitly handle unknown /api routes
  app.all("/api/*", (req, res) => {
    res.status(404).json({ error: `API route ${req.path} not found` });
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({ server: { middlewareMode: true }, appType: "spa" });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => res.sendFile(path.join(distPath, "index.html")));
  }

  const server = app.listen(PORT, "0.0.0.0", () => console.log(`Server running on http://localhost:${PORT}`));
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws, req) => {
    const url = new URL(req.url || "", `http://${req.headers.host}`);
    const userId = url.searchParams.get("userId");
    if (userId) {
      clients.set(userId, ws);
      ws.on("close", () => clients.delete(userId));
    }
  });

  setInterval(() => {
    if (Math.random() > 0.5) {
      const listing = listings[Math.floor(Math.random() * listings.length)];
      const newPrice = Math.max(50, Math.floor(listing.price * (0.85 + Math.random() * 0.1)));
      if (newPrice < listing.price) {
        listing.price = newPrice;
        const triggered = alerts.filter(a => a.matchId === listing.matchId && (a.category === 'Any' || a.category === listing.category) && a.maxPrice >= newPrice);
        triggered.forEach(alert => {
          const client = clients.get(alert.userId);
          if (client && client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: "PRICE_DROP", payload: { alertId: alert.id, matchId: listing.matchId, category: listing.category, newPrice, message: `Price drop alert! ${listing.category} tickets are now $${newPrice}.` } }));
          }
          alerts = alerts.filter(a => a.id !== alert.id);
        });
        clients.forEach(client => { if (client.readyState === WebSocket.OPEN) client.send(JSON.stringify({ type: "LISTINGS_UPDATE", payload: listings })); });
      }
    }
  }, 5000);

  setInterval(() => {
    const m = matches[Math.floor(Math.random() * matches.length)];
    if (m.status === 'FT' || m.status === 'UPCOMING') return;
    const s1 = (parseInt(m.s1) + (Math.random() > 0.9 ? 1 : 0)).toString();
    const s2 = (parseInt(m.s2) + (Math.random() > 0.9 ? 1 : 0)).toString();
    m.s1 = s1; m.s2 = s2;
    wss.clients.forEach(client => { if (client.readyState === WebSocket.OPEN) client.send(JSON.stringify({ type: 'SCORE_UPDATE', payload: { matchId: m.id, s1, s2, status: m.status } })); });
  }, 8000);
}

startServer();
