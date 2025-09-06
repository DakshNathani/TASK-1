import { Player, PerformanceData, ComparisonData } from '@/types/cricket';

export const cricketPlayers: Player[] = [
  {
    id: '1',
    name: 'Virat Kohli',
    country: 'India',
    role: 'Batsman',
    battingAverage: 53.62,
    bowlingAverage: null,
    matchesPlayed: 274,
    runsScored: 13848,
    wicketsTaken: 4,
    centuries: 46,
    fifties: 65,
    avatar: 'https://images.pexels.com/photos/163452/basketball-dunk-blue-game-163452.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    isActive: true,
  },
  {
    id: '2',
    name: 'Joe Root',
    country: 'England',
    role: 'Batsman',
    battingAverage: 49.23,
    bowlingAverage: 45.5,
    matchesPlayed: 140,
    runsScored: 11561,
    wicketsTaken: 32,
    centuries: 31,
    fifties: 57,
    avatar: 'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    isActive: true,
  },
  {
    id: '3',
    name: 'Steve Smith',
    country: 'Australia',
    role: 'Batsman',
    battingAverage: 60.73,
    bowlingAverage: 61.0,
    matchesPlayed: 109,
    runsScored: 9685,
    wicketsTaken: 18,
    centuries: 32,
    fifties: 41,
    avatar: 'https://images.pexels.com/photos/1374634/pexels-photo-1374634.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    isActive: true,
  },
  {
    id: '4',
    name: 'Kane Williamson',
    country: 'New Zealand',
    role: 'Batsman',
    battingAverage: 54.31,
    bowlingAverage: 45.2,
    matchesPlayed: 101,
    runsScored: 8743,
    wicketsTaken: 12,
    centuries: 32,
    fifties: 35,
    avatar: 'https://images.pexels.com/photos/1557238/pexels-photo-1557238.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    isActive: true,
  },
  {
    id: '5',
    name: 'Babar Azam',
    country: 'Pakistan',
    role: 'Batsman',
    battingAverage: 45.87,
    bowlingAverage: null,
    matchesPlayed: 54,
    runsScored: 4154,
    wicketsTaken: 0,
    centuries: 10,
    fifties: 26,
    avatar: 'https://images.pexels.com/photos/1040883/pexels-photo-1040883.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    isActive: true,
  },
  {
    id: '6',
    name: 'Pat Cummins',
    country: 'Australia',
    role: 'Bowler',
    battingAverage: 17.23,
    bowlingAverage: 22.59,
    matchesPlayed: 67,
    runsScored: 1154,
    wicketsTaken: 269,
    centuries: 0,
    fifties: 2,
    avatar: 'https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    isActive: true,
  },
  {
    id: '7',
    name: 'Ravindra Jadeja',
    country: 'India',
    role: 'All-rounder',
    battingAverage: 36.14,
    bowlingAverage: 24.58,
    matchesPlayed: 73,
    runsScored: 2614,
    wicketsTaken: 294,
    centuries: 3,
    fifties: 17,
    avatar: 'https://images.pexels.com/photos/1708936/pexels-photo-1708936.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    isActive: true,
  },
  {
    id: '8',
    name: 'MS Dhoni',
    country: 'India',
    role: 'Wicket-keeper',
    battingAverage: 38.09,
    bowlingAverage: null,
    matchesPlayed: 90,
    runsScored: 4876,
    wicketsTaken: 0,
    centuries: 6,
    fifties: 33,
    avatar: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    isActive: false,
  },
];

export const generatePerformanceData = (playerId: string): PerformanceData[] => {
  const player = cricketPlayers.find(p => p.id === playerId);
  if (!player) return [];

  const currentYear = new Date().getFullYear();
  const data: PerformanceData[] = [];

  for (let i = 5; i >= 0; i--) {
    const year = currentYear - i;
    const baseRuns = Math.floor(player.runsScored / 6) + Math.random() * 500;
    const baseWickets = Math.floor(player.wicketsTaken / 6) + Math.random() * 20;
    
    data.push({
      year,
      runs: Math.floor(baseRuns + (Math.random() - 0.5) * 200),
      wickets: Math.floor(baseWickets + (Math.random() - 0.5) * 10),
      average: player.battingAverage + (Math.random() - 0.5) * 10,
      strikeRate: 75 + Math.random() * 50,
    });
  }

  return data;
};

export const generateComparisonData = (player1Id: string, player2Id: string): ComparisonData[] => {
  const p1 = cricketPlayers.find(p => p.id === player1Id);
  const p2 = cricketPlayers.find(p => p.id === player2Id);
  
  if (!p1 || !p2) return [];

  return [
    {
      category: 'Batting Average',
      player1: p1.battingAverage,
      player2: p2.battingAverage,
      maxValue: 100,
    },
    {
      category: 'Centuries',
      player1: p1.centuries,
      player2: p2.centuries,
      maxValue: 50,
    },
    {
      category: 'Fifties',
      player1: p1.fifties,
      player2: p2.fifties,
      maxValue: 100,
    },
    {
      category: 'Matches',
      player1: p1.matchesPlayed,
      player2: p2.matchesPlayed,
      maxValue: 300,
    },
    {
      category: 'Total Runs',
      player1: p1.runsScored / 100,
      player2: p2.runsScored / 100,
      maxValue: 200,
    },
    {
      category: 'Wickets',
      player1: p1.wicketsTaken,
      player2: p2.wicketsTaken,
      maxValue: 500,
    },
  ];
};