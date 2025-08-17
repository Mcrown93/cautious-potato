import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTheme } from '@/hooks/useTheme';

describe('useTheme', () => {
  it('defaults to system preference when no stored value', () => {
    // Remove stored theme
    localStorage.removeItem('theme');
    const { result } = renderHook(() => useTheme());
    const [theme] = result.current;
    expect(['light', 'dark']).toContain(theme);
  });

  it('persists and toggles theme', () => {
    const { result } = renderHook(() => useTheme());
    act(() => {
      result.current[1]('dark');
    });
    expect(result.current[0]).toBe('dark');
    expect(localStorage.getItem('theme')).toBe('dark');
  });
});