'use client';

import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/use-theme';
import { Monitor, Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export function SimpleThemeToggle() {
  const { theme, toggleTheme, isDark, isLight, isLoading } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || isLoading) {
    return (
      <Button variant="outline" size="icon" disabled>
        <Monitor className="h-4 w-4 animate-pulse" />
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg"
      title={`Switch to ${isLight ? 'dark' : isDark ? 'system' : 'light'} theme`}
    >
      <div className="relative w-4 h-4">
        {/* Light theme icon */}
        <Sun
          className={`absolute inset-0 h-4 w-4 text-yellow-500 transition-all duration-500 ${
            isLight
              ? 'rotate-0 scale-100 opacity-100'
              : 'rotate-90 scale-0 opacity-0'
          }`}
        />

        {/* Dark theme icon */}
        <Moon
          className={`absolute inset-0 h-4 w-4 text-blue-400 transition-all duration-500 ${
            isDark
              ? 'rotate-0 scale-100 opacity-100'
              : '-rotate-90 scale-0 opacity-0'
          }`}
        />

        {/* System theme icon */}
        <Monitor
          className={`absolute inset-0 h-4 w-4 text-gray-500 transition-all duration-500 ${
            theme === 'system'
              ? 'rotate-0 scale-100 opacity-100'
              : 'rotate-180 scale-0 opacity-0'
          }`}
        />
      </div>

      {/* Animated background */}
      <div className="absolute inset-0 rounded-md bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 transition-opacity duration-300 hover:opacity-100" />
    </Button>
  );
}
