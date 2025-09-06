'use client';

import { useState } from 'react';
import { Menu, X, BarChart3, Users, MessageSquare, Home, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    {
      id: 'overview',
      name: 'Overview',
      icon: Home,
      description: 'Player stats & info',
    },
    {
      id: 'performance',
      name: 'Performance',
      icon: TrendingUp,
      description: 'Career trends',
    },
    {
      id: 'comparison',
      name: 'Comparison',
      icon: BarChart3,
      description: 'Compare players',
    },
    {
      id: 'progression',
      name: 'Career Journey',
      icon: Users,
      description: 'Career timeline',
    },
    {
      id: 'chat',
      name: 'AI Assistant',
      icon: MessageSquare,
      description: 'Ask questions',
    },
  ];

  const NavContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
            <BarChart3 className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Cricket Analytics
          </h2>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
          Interactive Player Dashboard
        </p>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => {
                onSectionChange(item.id);
                setIsOpen(false);
              }}
              className={cn(
                "w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 text-left group",
                activeSection === item.id
                  ? "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              )}
            >
              <Icon
                className={cn(
                  "h-5 w-5 transition-colors",
                  activeSection === item.id
                    ? "text-green-600 dark:text-green-400"
                    : "text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200"
                )}
              />
              <div>
                <div className="font-medium">{item.name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {item.description}
                </div>
              </div>
            </button>
          );
        })}
      </nav>

      <div className="p-4">
        <div className="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-xl">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
            💡 Pro Tip
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Use the AI Assistant to get insights about player performance, career highlights, and playing style analysis.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm"
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-80 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-r border-gray-200 dark:border-gray-700">
        <NavContent />
      </aside>

      {/* Mobile sidebar */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
          <aside className="fixed inset-y-0 left-0 w-80 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 z-50 lg:hidden">
            <div className="absolute top-4 right-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <NavContent />
          </aside>
        </>
      )}
    </>
  );
}