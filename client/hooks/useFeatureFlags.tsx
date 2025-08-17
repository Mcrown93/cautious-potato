import { useMemo } from 'react';

/**
 * Hook that reads feature flag environment variables and returns a strongly
 * typed object. Flags are evaluated once on first render. When adding
 * additional flags update the FeatureFlags interface accordingly. All flags
 * default to false when not set.
 */
export interface FeatureFlags {
  mobileUi: boolean;
  enablePwa: boolean;
  mobilePerfMode: boolean;
  hero3d: boolean;
  particles3d: boolean;
  audioReactive: boolean;
}

export function useFeatureFlags(): FeatureFlags {
  return useMemo(() => {
    const env = import.meta.env;
    return {
      mobileUi: env.VITE_MOBILE_UI === 'true',
      enablePwa: env.VITE_ENABLE_PWA === 'true',
      mobilePerfMode: env.VITE_MOBILE_PERF_MODE === 'on',
      hero3d: env.VITE_3D_HERO === 'on',
      particles3d: env.VITE_3D_PARTICLES === 'on',
      audioReactive: env.VITE_AUDIO_REACTIVE === 'on'
    };
  }, []);
}