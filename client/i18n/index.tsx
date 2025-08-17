import React, { createContext, useContext, useEffect, useState } from 'react';
import en from '../../locales/en.json';
import it from '../../locales/it.json';
import fr from '../../locales/fr.json';
import es from '../../locales/es.json';
import de from '../../locales/de.json';
import pt from '../../locales/pt.json';

/*
 * A simple internationalisation provider. It loads all available locale
 * dictionaries statically and provides a `t` function for translating
 * arbitrary nested keys. The current language is stored in localStorage
 * so that user preferences persist across reloads. When a key is missing
 * from the selected language the English version is used instead and a
 * warning is logged in development. See `i18n.md` for details on how to
 * add new strings.
 */
type Locale = 'en' | 'it' | 'fr' | 'es' | 'de' | 'pt';

type Dictionaries = Record<Locale, any>;

const dictionaries: Dictionaries = { en, it, fr, es, de, pt };

interface I18nContextValue {
  lang: Locale;
  setLang: (lang: Locale) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Locale>(() => {
    const stored = localStorage.getItem('lang');
    if (stored && ['en','it','fr','es','de','pt'].includes(stored)) {
      return stored as Locale;
    }
    const browserLang = navigator.language.slice(0, 2) as Locale;
    return ['en','it','fr','es','de','pt'].includes(browserLang) ? browserLang : 'en';
  });

  useEffect(() => {
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const t = (key: string): string => {
    const keys = key.split('.');
    let current: any = dictionaries[lang];
    for (const k of keys) {
      current = current?.[k];
      if (current === undefined) break;
    }
    if (current === undefined) {
      // Fallback to English
      let fallback: any = dictionaries.en;
      for (const k of keys) {
        fallback = fallback?.[k];
        if (fallback === undefined) break;
      }
      if (fallback !== undefined) {
        if (import.meta.env.DEV) {
          // eslint-disable-next-line no-console
          console.warn(`Missing translation for key "${key}" in locale ${lang}`);
        }
        return fallback;
      }
      if (import.meta.env.DEV) {
        console.warn(`Unknown translation key "${key}"`);
      }
      return key;
    }
    return current;
  };

  const setLang = (l: Locale) => setLangState(l);

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslation() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useTranslation must be used within an I18nProvider');
  return ctx;
}