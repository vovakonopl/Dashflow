import { useTheme as useNextTheme } from 'next-themes';
import { useEffect, useState } from 'react';

type TTheme = 'light' | 'dark';

export function useTheme() {
  const { theme, setTheme, resolvedTheme, ...rest } = useNextTheme();
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return {
    isMounted,
    setTheme: (theme: TTheme) => setTheme(theme),
    resolvedTheme: resolvedTheme as TTheme | 'system' | undefined,
    theme: theme as TTheme | undefined,
    ...rest,
  };
}
