'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme } from '@/hooks/use-theme';
import { Check, Monitor, Moon, Palette, Sun } from 'lucide-react';
import { useState } from 'react';

export function ThemeSelector() {
  const { theme, setTheme, isDark, isLight, isSystem, isLoading } = useTheme();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleThemeChange = (newTheme: string) => {
    if (newTheme === theme) return;

    setIsAnimating(true);
    setTheme(newTheme);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const themes = [
    {
      value: 'light',
      label: 'Light',
      icon: Sun,
      description: 'Light mode',
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/20',
    },
    {
      value: 'dark',
      label: 'Dark',
      icon: Moon,
      description: 'Dark mode',
      color: 'text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20',
    },
    {
      value: 'system',
      label: 'System',
      icon: Monitor,
      description: 'Follow system preference',
      color: 'text-gray-500',
      bgColor: 'bg-gray-100 dark:bg-gray-900/20',
    },
  ];

  const currentTheme = themes.find((t) => t.value === theme) || themes[2];
  const CurrentIcon = currentTheme.icon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={`
            relative overflow-hidden transition-all duration-300 hover:scale-105
            ${isAnimating ? 'animate-pulse' : ''}
            min-w-[120px] justify-start gap-2
          `}
          disabled={isLoading}
        >
          <div className="relative flex items-center gap-2">
            <div
              className={`
                transition-all duration-300 transform
                ${isAnimating ? 'animate-rotate' : ''}
              `}
            >
              {isLoading ? (
                <Palette className="h-4 w-4 animate-pulse" />
              ) : (
                <CurrentIcon className={`h-4 w-4 ${currentTheme.color}`} />
              )}
            </div>
            <span className="text-sm font-medium">
              {isLoading ? 'Loading...' : currentTheme.label}
            </span>
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        {themes.map((themeOption) => {
          const Icon = themeOption.icon;
          const isSelected = theme === themeOption.value;

          return (
            <DropdownMenuItem
              key={themeOption.value}
              onClick={() => handleThemeChange(themeOption.value)}
              className={`
                flex items-center gap-3 cursor-pointer transition-all duration-200
                ${isSelected ? themeOption.bgColor : ''}
                hover:scale-[1.02] hover:shadow-sm
              `}
            >
              <div className="relative">
                <Icon className={`h-4 w-4 ${themeOption.color}`} />
                {isSelected && (
                  <div className="absolute -top-1 -right-1">
                    <Check className="h-3 w-3 text-green-500 animate-slide-in" />
                  </div>
                )}
              </div>

              <div className="flex-1">
                <div className="font-medium">{themeOption.label}</div>
                <div className="text-xs text-muted-foreground">
                  {themeOption.description}
                </div>
              </div>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
