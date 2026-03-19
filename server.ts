import express from "express";
import { createServer as createViteServer } from "vite";
import { WebSocketServer, WebSocket } from "ws";
import path from "path";

// Mock Database
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

// Connected clients for real-time notifications
const clients = new Map<string, WebSocket>();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.get("/api/matches/:id/tickets", (req, res) => {
    const matchId = req.params.id;
    const matchListings = listings.filter((l) => l.matchId === matchId);
    res.json(matchListings);
  });

  app.post("/api/alerts", (req, res) => {
    const { userId, matchId, category, maxPrice } = req.body;
    
    if (!userId || !matchId || !category || !maxPrice) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newAlert: PriceAlert = {
      id: Math.random().toString(36).substring(7),
      userId,
      matchId,
      category,
      maxPrice: Number(maxPrice),
    };

    alerts.push(newAlert);
    res.status(201).json(newAlert);
  });

  app.get("/api/alerts/:userId", (req, res) => {
    const userAlerts = alerts.filter((a) => a.userId === req.params.userId);
    res.json(userAlerts);
  });

  app.delete("/api/alerts/:id", (req, res) => {
    alerts = alerts.filter((a) => a.id !== req.params.id);
    res.json({ success: true });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  const server = app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });

  // WebSocket Server
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws, req) => {
    // In a real app, authenticate the user. Here we just take a userId from query params
    const url = new URL(req.url || "", `http://${req.headers.host}`);
    const userId = url.searchParams.get("userId");

    if (userId) {
      clients.set(userId, ws);
      
      ws.on("close", () => {
        clients.delete(userId);
      });
    }
  });

  // Background task to simulate price drops
  setInterval(() => {
    let priceDropped = false;
    
    // Randomly drop a price for a listing
    if (Math.random() > 0.5) {
      const listingIndex = Math.floor(Math.random() * listings.length);
      const listing = listings[listingIndex];
      
      // Drop price by 5-15%
      const dropAmount = listing.price * (0.05 + Math.random() * 0.1);
      const newPrice = Math.max(50, Math.floor(listing.price - dropAmount));
      
      if (newPrice < listing.price) {
        listing.price = newPrice;
        priceDropped = true;
        
        // Check alerts
        const triggeredAlerts = alerts.filter(
          (a) => a.matchId === listing.matchId && (a.category === 'Any' || a.category === listing.category) && a.maxPrice >= newPrice
        );

        triggeredAlerts.forEach((alert) => {
          const client = clients.get(alert.userId);
          if (client && client.readyState === WebSocket.OPEN) {
            client.send(
              JSON.stringify({
                type: "PRICE_DROP",
                payload: {
                  alertId: alert.id,
                  matchId: listing.matchId,
                  category: listing.category,
                  newPrice: newPrice,
                  message: `Price drop alert! ${listing.category} tickets are now $${newPrice}.`,
                },
              })
            );
          }
          
          // Remove alert after triggering (one-time alert)
          alerts = alerts.filter((a) => a.id !== alert.id);
        });
      }
    }
    
    // Broadcast updated listings to all clients if prices changed
    if (priceDropped) {
      clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(
            JSON.stringify({
              type: "LISTINGS_UPDATE",
              payload: listings,
            })
          );
        }
      });
    }
  }, 5000); // Check every 5 seconds

  // Background task to simulate score updates
  setInterval(() => {
    const matchIds = ['m1', 'm3', 'm5', 'm7', 'm9']; // Only update matches that could be live
    const randomMatchId = matchIds[Math.floor(Math.random() * matchIds.length)];
    
    // Simulate a goal
    const s1 = Math.floor(Math.random() * 4);
    const s2 = Math.floor(Math.random() * 4);
    
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({
          type: 'SCORE_UPDATE',
          payload: {
            matchId: randomMatchId,
            s1: s1.toString(),
            s2: s2.toString(),
            status: 'LIVE'
          }
        }));
      }
    });
  }, 8000); // Update a score every 8 seconds
}

startServer();
