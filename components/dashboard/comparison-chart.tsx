'use client';

import { useState, useMemo } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { generateComparisonData, cricketPlayers } from '@/lib/data';
import { Player } from '@/types/cricket';

interface ComparisonChartProps {
  player: Player;
}

export function ComparisonChart({ player }: ComparisonChartProps) {
  const [compareWith, setCompareWith] = useState<string>('');
  
  const otherPlayers = useMemo(() => 
    cricketPlayers.filter(p => p.id !== player.id), 
    [player.id]
  );

  const data = useMemo(() => {
    if (!compareWith) return [];
    return generateComparisonData(player.id, compareWith);
  }, [player.id, compareWith]);

  const chartData = useMemo(() => {
    return data.map(item => ({
      category: item.category,
      [player.name]: (item.player1 / item.maxValue) * 100,
      [otherPlayers.find(p => p.id === compareWith)?.name || 'Player 2']: (item.player2 / item.maxValue) * 100,
    }));
  }, [data, player.name, compareWith, otherPlayers]);

  const selectedPlayer = useMemo(() => 
    otherPlayers.find(p => p.id === compareWith),
    [otherPlayers, compareWith]
  );

  return (
    <Card className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Player Comparison</CardTitle>
          <div className="flex items-center space-x-4">
            <Select value={compareWith} onValueChange={setCompareWith}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Compare with..." />
              </SelectTrigger>
              <SelectContent>
                {otherPlayers.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    <div className="flex items-center space-x-2">
                      <span>{p.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {p.country}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        {selectedPlayer && (
          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>{player.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>{selectedPlayer.name}</span>
            </div>
          </div>
        )}
      </CardHeader>
      <CardContent>
        {!compareWith ? (
          <div className="flex items-center justify-center h-80 text-gray-500 dark:text-gray-400">
            <div className="text-center">
              <div className="text-4xl mb-4">📊</div>
              <p className="text-lg font-medium">Select a player to compare</p>
              <p className="text-sm">Choose another player to see detailed comparison</p>
            </div>
          </div>
        ) : (
          <div style={{ width: '100%', height: '400px' }}>
            <ResponsiveContainer>
              <RadarChart data={chartData} margin={{ top: 20, right: 80, bottom: 20, left: 80 }}>
                <PolarGrid stroke="currentColor" opacity={0.3} />
                <PolarAngleAxis 
                  dataKey="category" 
                  tick={{ fill: 'currentColor', fontSize: 12 }}
                />
                <PolarRadiusAxis 
                  angle={90} 
                  domain={[0, 100]} 
                  tick={{ fill: 'currentColor', fontSize: 10 }}
                  tickCount={5}
                />
                <Radar
                  name={player.name}
                  dataKey={player.name}
                  stroke="#22c55e"
                  fill="#22c55e"
                  fillOpacity={0.2}
                  strokeWidth={3}
                  dot={{ fill: '#22c55e', strokeWidth: 2, r: 4 }}
                />
                <Radar
                  name={selectedPlayer?.name}
                  dataKey={selectedPlayer?.name || 'Player 2'}
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.2}
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}