import { useEffect, useState } from 'react';

/**
 * Simple theme manager. Uses localStorage to persist the current theme across
 * sessions. When no theme is stored we respect the user's OS preference. The
 * returned tuple is similar to a useState hook: the current theme and a
 * setter. The theme string is either 'light' or 'dark'.
 */
export type Theme = 'light' | 'dark';

export function useTheme(): [Theme, (theme: Theme) => void] {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme') as Theme | null;
      if (stored === 'light' || stored === 'dark') {
        return stored;
      }
      // detect system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return prefersDark ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const setTheme = (t: Theme) => setThemeState(t);

  return [theme, setTheme];
}