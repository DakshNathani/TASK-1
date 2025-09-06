'use client';

import { useState, useMemo } from 'react';
import { Search, User, MapPin, Trophy } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { cricketPlayers } from '@/lib/data';
import { Player } from '@/types/cricket';
import { cn } from '@/lib/utils';

interface PlayerSearchProps {
  selectedPlayer: Player | null;
  onPlayerSelect: (player: Player) => void;
  className?: string;
}

export function PlayerSearch({ selectedPlayer, onPlayerSelect, className }: PlayerSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const filteredPlayers = useMemo(() => {
    if (!searchQuery) return cricketPlayers.slice(0, 6);
    
    return cricketPlayers.filter(player =>
      player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      player.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      player.role.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 6);
  }, [searchQuery]);

  const handlePlayerSelect = (player: Player) => {
    onPlayerSelect(player);
    setIsOpen(false);
    setSearchQuery('');
  };

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
    <div className={cn("relative w-full", className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="text"
          placeholder="Search cricket players..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="pl-10 pr-4 py-3 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-gray-200 dark:border-gray-700 rounded-xl transition-all duration-200 focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
        />
      </div>

      {/* Selected Player Display */}
      {selectedPlayer && !isOpen && (
        <div className="mt-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 rounded-xl border border-green-200 dark:border-green-800">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10 ring-2 ring-green-500/20">
              <AvatarImage src={selectedPlayer.avatar} alt={selectedPlayer.name} />
              <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                  {selectedPlayer.name}
                </h3>
                <Badge className={getRoleColor(selectedPlayer.role)}>
                  {selectedPlayer.role}
                </Badge>
              </div>
              <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600 dark:text-gray-300">
                <div className="flex items-center space-x-1">
                  <MapPin className="h-3 w-3" />
                  <span>{selectedPlayer.country}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Trophy className="h-3 w-3" />
                  <span>{selectedPlayer.matchesPlayed} matches</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search Results */}
      {isOpen && (
        <Card className="absolute top-full left-0 right-0 mt-2 p-2 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-50 max-h-80 overflow-y-auto">
          {filteredPlayers.length === 0 ? (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              <User className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No players found</p>
            </div>
          ) : (
            <div className="space-y-1">
              {filteredPlayers.map((player) => (
                <button
                  key={player.id}
                  onClick={() => handlePlayerSelect(player)}
                  className="w-full p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200 text-left group"
                >
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10 ring-2 ring-transparent group-hover:ring-green-500/20 transition-all duration-200">
                      <AvatarImage src={player.avatar} alt={player.name} />
                      <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors truncate">
                          {player.name}
                        </h4>
                        <Badge className={getRoleColor(player.role)}>
                          {player.role}
                        </Badge>
                        {!player.isActive && (
                          <Badge variant="outline" className="text-xs">
                            Retired
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center justify-between mt-1 text-sm text-gray-600 dark:text-gray-300">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-3 w-3" />
                            <span>{player.country}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Trophy className="h-3 w-3" />
                            <span>{player.matchesPlayed} matches</span>
                          </div>
                        </div>
                        <div className="text-xs font-medium text-green-600 dark:text-green-400">
                          Avg: {player.battingAverage}
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </Card>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/10 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}