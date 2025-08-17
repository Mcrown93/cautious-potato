import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { I18nProvider, useTranslation } from '@/i18n';

describe('I18nProvider', () => {
  it('provides translations and falls back to English', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <I18nProvider>{children}</I18nProvider>
    );
    const { result } = renderHook(() => useTranslation(), { wrapper });
    // default language is browser or English
    expect(result.current.t('app.name')).toBeDefined();
    // Unknown key falls back to key name
    expect(result.current.t('nonexistent.key')).toBe('nonexistent.key');
  });

  it('switches languages and persists', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <I18nProvider>{children}</I18nProvider>
    );
    const { result } = renderHook(() => useTranslation(), { wrapper });
    act(() => {
      result.current.setLang('fr' as any);
    });
    expect(result.current.lang).toBe('fr');
    expect(localStorage.getItem('lang')).toBe('fr');
  });
});