import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useFeatureFlags } from '@/hooks/useFeatureFlags';

describe('useFeatureFlags', () => {
  it('returns false for unspecified flags', () => {
    const { result } = renderHook(() => useFeatureFlags());
    expect(result.current.mobileUi).toBe(false);
    expect(result.current.enablePwa).toBe(false);
    expect(result.current.mobilePerfMode).toBe(false);
    expect(result.current.hero3d).toBe(false);
    expect(result.current.particles3d).toBe(false);
    expect(result.current.audioReactive).toBe(false);
  });

  it('parses boolean and on/off flags', () => {
    // Mock import.meta.env values
    const originalEnv = import.meta.env;
    // @ts-expect-error we deliberately mutate the env for testing
    import.meta.env = {
      VITE_MOBILE_UI: 'true',
      VITE_ENABLE_PWA: 'true',
      VITE_MOBILE_PERF_MODE: 'on',
      VITE_3D_HERO: 'on',
      VITE_3D_PARTICLES: 'on',
      VITE_AUDIO_REACTIVE: 'on',
    };
    const { result } = renderHook(() => useFeatureFlags());
    expect(result.current.mobileUi).toBe(true);
    expect(result.current.enablePwa).toBe(true);
    expect(result.current.mobilePerfMode).toBe(true);
    expect(result.current.hero3d).toBe(true);
    expect(result.current.particles3d).toBe(true);
    expect(result.current.audioReactive).toBe(true);
    // Restore env
    // @ts-expect-error restore
    import.meta.env = originalEnv;
  });
});