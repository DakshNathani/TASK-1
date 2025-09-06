'use client';

import { Player } from '@/types/cricket';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Trophy, Target, Award, MapPin, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsOverviewProps {
  player: Player;
  className?: string;
}

export function StatsOverview({ player, className }: StatsOverviewProps) {
  const stats = [
    {
      label: 'Batting Average',
      value: player.battingAverage.toFixed(2),
      icon: Target,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20',
      change: '+2.1',
      trend: 'up',
    },
    {
      label: 'Total Runs',
      value: player.runsScored.toLocaleString(),
      icon: TrendingUp,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900/20',
      change: '+450',
      trend: 'up',
    },
    {
      label: 'Centuries',
      value: player.centuries.toString(),
      icon: Trophy,
      color: 'text-yellow-600 dark:text-yellow-400',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/20',
      change: '+2',
      trend: 'up',
    },
    {
      label: 'Matches Played',
      value: player.matchesPlayed.toString(),
      icon: Calendar,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20',
      change: '+5',
      trend: 'up',
    },
  ];

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Batsman': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      case 'Bowler': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      case 'All-rounder': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'Wicket-keeper': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Player Info Header */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 border-green-200 dark:border-green-800">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {player.name}
                </h2>
                <Badge className={getRoleColor(player.role)}>
                  {player.role}
                </Badge>
                {!player.isActive && (
                  <Badge variant="outline" className="text-xs">
                    Retired
                  </Badge>
                )}
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span className="font-medium">{player.country}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Award className="h-4 w-4" />
                  <span>{player.fifties} Fifties</span>
                </div>
                {player.wicketsTaken > 0 && (
                  <div className="flex items-center space-x-1">
                    <Target className="h-4 w-4" />
                    <span>{player.wicketsTaken} Wickets</span>
                  </div>
                )}
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                #{player.id}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Player ID
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card 
              key={stat.label} 
              className="hover:shadow-lg transition-all duration-300 hover:scale-105 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className={cn(
                      "inline-flex items-center justify-center w-10 h-10 rounded-lg",
                      stat.bgColor
                    )}>
                      <Icon className={cn("h-5 w-5", stat.color)} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {stat.value}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-green-600 dark:text-green-400">
                    <TrendingUp className="h-3 w-3" />
                    <span>{stat.change}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Bowling Stats (if applicable) */}
      {player.bowlingAverage && (
        <Card className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/10 dark:to-red-900/10 border-orange-200 dark:border-orange-800">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Bowling Performance
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                  {player.bowlingAverage.toFixed(2)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Bowling Average
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                  {player.wicketsTaken}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Total Wickets
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {(player.wicketsTaken / player.matchesPlayed).toFixed(1)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Wickets/Match
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}