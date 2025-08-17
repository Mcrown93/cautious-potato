/*
 * Global setup for Vitest. Here we provide basic DOM APIs and
 * polyfills required by our React components during tests. Vitest
 * already includes jsdom when `environment: 'jsdom'` is set, but we
 * need to stub `matchMedia` and other browser‑only APIs used in hooks.
 */
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    media: query,
    matches: false,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

// Polyfill navigator.hardwareConcurrency, deviceMemory and connection
Object.defineProperty(window.navigator, 'hardwareConcurrency', {
  value: 8,
});
Object.defineProperty(window.navigator, 'deviceMemory', {
  value: 8,
});
Object.defineProperty(window.navigator, 'connection', {
  value: { effectiveType: '4g' },
});

// Provide a noop scrollTo function
window.scrollTo = () => {};