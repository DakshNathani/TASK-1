export interface Player {
  id: string;
  name: string;
  country: string;
  role: 'Batsman' | 'Bowler' | 'All-rounder' | 'Wicket-keeper';
  battingAverage: number;
  bowlingAverage: number | null;
  matchesPlayed: number;
  runsScored: number;
  wicketsTaken: number;
  centuries: number;
  fifties: number;
  avatar: string;
  isActive: boolean;
}

export interface PerformanceData {
  year: number;
  runs: number;
  wickets: number;
  average: number;
  strikeRate: number;
}

export interface ComparisonData {
  category: string;
  player1: number;
  player2: number;
  maxValue: number;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  color?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}