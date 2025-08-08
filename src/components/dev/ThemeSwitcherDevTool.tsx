'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/lib/hooks/useTheme';
import { cn } from '@/lib/utils/cn';

// WARNING: This component is only for development purposes and should not be used in production.
const ThemeSwitcherDevTool = () => {
  const { isMounted, setTheme, resolvedTheme } = useTheme();

  const handleThemeChange = () => {
    setTheme(resolvedTheme === 'light' ? 'dark' : 'light');
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="fixed right-8 bottom-8 overflow-hidden">
      <button
        className="bg-background border-primary box-content size-8 cursor-pointer rounded-full border p-1"
        onClick={handleThemeChange}
      >
        <Sun
          className={cn(
            'text-primary absolute top-1/2 left-1/2 size-8 -translate-1/2 transition-all',
            resolvedTheme !== 'light' && '-top-full',
          )}
        />
        <Moon
          className={cn(
            'text-primary absolute top-1/2 left-1/2 size-8 -translate-1/2 transition-all',
            resolvedTheme !== 'dark' && '-top-full',
          )}
        />
      </button>
    </div>
  );
};

export default ThemeSwitcherDevTool;
