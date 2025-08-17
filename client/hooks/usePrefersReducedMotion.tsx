import { useEffect, useState } from 'react';

/**
 * Determines whether the user has requested reduced motion via the
 * `prefers-reduced-motion` media query. This value is stored in state
 * and updated on change so that consumers re-render accordingly. When
 * reduced motion is preferred animations should be simplified or disabled.
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(media.matches);
    const listener = (event: MediaQueryListEvent) => {
      setPrefersReduced(event.matches);
    };
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);
  return prefersReduced;
}