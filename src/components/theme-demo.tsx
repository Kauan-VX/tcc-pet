'use client';

import { ThemeSelector } from '@/components/theme-selector';
import { ThemeToggle } from '@/components/theme-toggle';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useTheme } from '@/hooks/use-theme';
import { Monitor, Moon, Sparkles, Sun } from 'lucide-react';

export function ThemeDemo() {
  const { theme, resolvedTheme, isDark, isLight, isSystem } = useTheme();

  const getThemeInfo = () => {
    return {
      current: theme || 'system',
      resolved: resolvedTheme || 'light',
      icon: isLight ? Sun : isDark ? Moon : Monitor,
      description: isLight
        ? 'Bright and clean interface'
        : isDark
          ? 'Easy on the eyes for night coding'
          : 'Adapts to your system preference',
    };
  };

  const themeInfo = getThemeInfo();
  const ThemeIcon = themeInfo.icon;

  return (
    <div className="space-y-6">
      <Card className="theme-gradient border-2 shadow-lg animate-fade-in-up">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 animate-pulse-gentle" />
            Theme System Demo
          </CardTitle>
          <CardDescription>
            Modern theme switching with beautiful animations
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="flex flex-wrap gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Toggle Button</label>
              <ThemeToggle />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Theme Selector</label>
              <ThemeSelector />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="animate-heartbeat">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-2">
                  <ThemeIcon className="h-4 w-4" />
                  <span className="font-semibold">Current Theme</span>
                </div>
                <Badge variant="secondary" className="mb-2">
                  {themeInfo.current}
                </Badge>
                <p className="text-sm text-muted-foreground">
                  {themeInfo.description}
                </p>
              </CardContent>
            </Card>

            <Card className="animate-float">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-4 h-4 rounded-full bg-primary animate-pulse-gentle" />
                  <span className="font-semibold">Resolved Theme</span>
                </div>
                <Badge variant="outline" className="mb-2">
                  {themeInfo.resolved}
                </Badge>
                <p className="text-sm text-muted-foreground">
                  The actual theme being applied
                </p>
              </CardContent>
            </Card>

            <Card className="animate-fade-in-up">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-4 h-4 rounded-full theme-gradient animate-rotate" />
                  <span className="font-semibold">Animation Status</span>
                </div>
                <Badge variant="default" className="mb-2">
                  Active
                </Badge>
                <p className="text-sm text-muted-foreground">
                  Smooth transitions enabled
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="border rounded-lg p-4 space-y-2">
            <h4 className="font-semibold">Theme Features:</h4>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>Smooth transitions between themes</li>
              <li>System preference detection</li>
              <li>Beautiful animations and effects</li>
              <li>Consistent color tokens</li>
              <li>Accessibility support</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
