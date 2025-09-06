'use client';

import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Player } from '@/types/cricket';

interface CareerProgressionProps {
  player: Player;
}

export function CareerProgression({ player }: CareerProgressionProps) {
  const data = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const careerSpan = Math.floor(player.matchesPlayed / 20); // Approximate career span
    const startYear = currentYear - careerSpan;
    
    const progressionData = [];
    const totalRuns = player.runsScored;
    const totalMatches = player.matchesPlayed;
    
    for (let i = 0; i <= careerSpan; i++) {
      const year = startYear + i;
      const progress = (i + 1) / (careerSpan + 1);
      const runsInYear = Math.floor(totalRuns * progress * 0.8 + Math.random() * totalRuns * 0.4);
      const matchesInYear = Math.floor(totalMatches * progress * 0.8 + Math.random() * totalMatches * 0.4);
      
      progressionData.push({
        year,
        cumulativeRuns: Math.floor(totalRuns * progress),
        cumulativeMatches: Math.floor(totalMatches * progress),
        runsInYear: Math.max(0, runsInYear - (progressionData[i-1]?.cumulativeRuns || 0)),
        matchesInYear: Math.max(0, matchesInYear - (progressionData[i-1]?.cumulativeMatches || 0)),
        average: player.battingAverage + (Math.random() - 0.5) * 10,
      });
    }
    
    return progressionData;
  }, [player]);

  const colors = [
    '#22c55e', '#16a34a', '#15803d', '#166534', '#14532d',
    '#3b82f6', '#2563eb', '#1d4ed8', '#1e40af', '#1e3a8a',
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="font-semibold text-gray-900 dark:text-white">{`${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {`${entry.name}: ${entry.value.toLocaleString()}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Career Progression</span>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Cumulative Performance
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div style={{ width: '100%', height: '350px' }}>
          <ResponsiveContainer>
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis 
                dataKey="year" 
                tick={{ fill: 'currentColor' }}
                axisLine={{ stroke: 'currentColor', opacity: 0.3 }}
              />
              <YAxis 
                tick={{ fill: 'currentColor' }}
                axisLine={{ stroke: 'currentColor', opacity: 0.3 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="cumulativeRuns" 
                name="Cumulative Runs"
                radius={[4, 4, 0, 0]}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-6 grid grid-cols-3 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {data[data.length - 1]?.cumulativeRuns.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Total Runs</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {data[data.length - 1]?.cumulativeMatches}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Total Matches</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {data.length} yrs
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Career Span</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}