import { useEffect, useState } from 'react';

/**
 * Attempts to classify the device as low-end based on heuristics. We
 * consider devices with limited hardware concurrency (<4 cores), device
 * memory (<4GB) or a 3G connection as low-end. The result is stored in
 * state and re-evaluated only once on mount. This hook is useful for
 * deciding whether to enable expensive animations or high polycount 3D
 * scenes.
 */
export function useLowEndDevice(): boolean {
  const [isLowEnd, setIsLowEnd] = useState(false);
  useEffect(() => {
    const hwConcurrency = navigator.hardwareConcurrency || 4;
    const deviceMemory = (navigator as any).deviceMemory || 4;
    const connection = (navigator as any).connection || {};
    const effectiveType: string = connection.effectiveType || '';
    const slowConnection = /2g|3g/.test(effectiveType);
    if (hwConcurrency <= 4 || deviceMemory <= 4 || slowConnection) {
      setIsLowEnd(true);
    }
  }, []);
  return isLowEnd;
}