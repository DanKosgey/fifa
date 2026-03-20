/**
 * ApiService
 * Centralized service for all FIFA World Cup 2026™ Platform data communications.
 */

export interface Match {
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

export interface NewsItem {
  id: string;
  cat: string;
  title: string;
  seed: string;
  time: string;
}

export interface TicketListing {
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

class ApiService {
  private baseUrl = '/api';

  async getMatches(): Promise<Match[]> {
    const res = await fetch(`${this.baseUrl}/matches`);
    if (!res.ok) throw new Error('Failed to fetch matches');
    return res.json();
  }

  async getMatch(id: string): Promise<Match> {
    const res = await fetch(`${this.baseUrl}/matches/${id}`);
    if (!res.ok) throw new Error('Failed to fetch match');
    return res.json();
  }

  async getTeams(): Promise<Team[]> {
    const res = await fetch(`${this.baseUrl}/teams`);
    if (!res.ok) throw new Error('Failed to fetch teams');
    return res.json();
  }

  async getNews(): Promise<NewsItem[]> {
    const res = await fetch(`${this.baseUrl}/news`);
    if (!res.ok) throw new Error('Failed to fetch news');
    return res.json();
  }

  async getTickets(matchId: string): Promise<TicketListing[]> {
    const res = await fetch(`${this.baseUrl}/matches/${matchId}/tickets`);
    if (!res.ok) throw new Error('Failed to fetch tickets');
    return res.json();
  }

  async createAlert(alertData: { userId: string; matchId: string; category: string; maxPrice: number }) {
    const res = await fetch(`${this.baseUrl}/alerts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(alertData),
    });
    if (!res.ok) throw new Error('Failed to create alert');
    return res.json();
  }
}

export const apiService = new ApiService();
