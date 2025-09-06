'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/layout/sidebar';
import { ThemeToggle } from '@/components/layout/theme-toggle';
import { PlayerSearch } from '@/components/dashboard/player-search';
import { StatsOverview } from '@/components/dashboard/stats-overview';
import { PerformanceChart } from '@/components/dashboard/performance-chart';
import { ComparisonChart } from '@/components/dashboard/comparison-chart';
import { CareerProgression } from '@/components/dashboard/career-progression';
import { ChatInterface } from '@/components/chat/chat-interface';
import { cricketPlayers } from '@/lib/data';
import { Player } from '@/types/cricket';

export default function DashboardPage() {
  const [activeSection, setActiveSection] = useState('overview');
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(cricketPlayers[0]);

  const renderContent = () => {
    if (!selectedPlayer) {
      return (
        <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
          <div className="text-center">
            <div className="text-6xl mb-4">🏏</div>
            <h2 className="text-2xl font-bold mb-2">Cricket Analytics Dashboard</h2>
            <p className="text-lg">Search and select a player to begin analyzing their performance</p>
          </div>
        </div>
      );
    }

    switch (activeSection) {
      case 'overview':
        return <StatsOverview player={selectedPlayer} />;
      case 'performance':
        return <PerformanceChart player={selectedPlayer} />;
      case 'comparison':
        return <ComparisonChart player={selectedPlayer} />;
      case 'progression':
        return <CareerProgression player={selectedPlayer} />;
      case 'chat':
        return <ChatInterface selectedPlayer={selectedPlayer} className="h-full" />;
      default:
        return <StatsOverview player={selectedPlayer} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="flex h-screen">
        <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 px-4 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex-1 max-w-2xl">
                <PlayerSearch
                  selectedPlayer={selectedPlayer}
                  onPlayerSelect={setSelectedPlayer}
                />
              </div>
              <div className="ml-4">
                <ThemeToggle />
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-auto p-4 lg:p-8">
            <div className="max-w-7xl mx-auto">
              {renderContent()}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}