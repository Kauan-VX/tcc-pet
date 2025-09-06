'use client';

import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/use-theme';
import { Monitor, Moon, Sun } from 'lucide-react';
import { useState } from 'react';

export function ThemeToggle() {
  const { theme, toggleTheme, isDark, isLight, isSystem, isLoading } =
    useTheme();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggle = () => {
    setIsAnimating(true);
    toggleTheme();
    setTimeout(() => setIsAnimating(false), 500);
  };

  const getIcon = () => {
    if (isLoading) {
      return <Monitor className="h-4 w-4 animate-pulse" />;
    }

    if (isLight) {
      return <Sun className="h-4 w-4 text-yellow-500" />;
    }

    if (isDark) {
      return <Moon className="h-4 w-4 text-blue-400" />;
    }

    return <Monitor className="h-4 w-4 text-gray-500" />;
  };

  const getThemeLabel = () => {
    if (isLoading) return 'Loading...';
    if (isLight) return 'Light';
    if (isDark) return 'Dark';
    return 'System';
  };

  if (isLoading) {
    return (
      <Button
        variant="outline"
        size="icon"
        disabled
        className="relative overflow-hidden"
      >
        <Monitor className="h-4 w-4 animate-pulse" />
        <span className="sr-only">Loading theme</span>
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleToggle}
      className={`
        relative overflow-hidden transition-all duration-300 hover:scale-105
        ${isAnimating ? 'animate-rotate' : ''}
        ${isDark ? 'bg-slate-900 border-slate-700 hover:bg-slate-800' : ''}
        ${isLight ? 'bg-white border-gray-300 hover:bg-gray-50' : ''}
      `}
      title={`Switch to ${isLight ? 'dark' : isDark ? 'system' : 'light'} theme`}
    >
      <div className="relative flex items-center justify-center">
        <div
          className={`
            transition-all duration-300 transform
            ${isAnimating ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}
          `}
        >
          {getIcon()}
        </div>

        {/* Animated background effect */}
        <div
          className={`
            absolute inset-0 rounded-md opacity-0 transition-opacity duration-300
            ${isAnimating ? 'opacity-20' : 'opacity-0'}
            ${isDark ? 'bg-blue-400' : 'bg-yellow-400'}
          `}
        />
      </div>
      <span className="sr-only">{getThemeLabel()} theme</span>
    </Button>
  );
}
