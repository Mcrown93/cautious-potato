import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

/**
 * Simple GDPR‑style cookie consent banner. It shows once until the user
 * responds. Users can opt into analytics cookies; all other cookies are
 * considered essential and therefore always allowed. The choice is
 * persisted in localStorage. When analytics consent is granted the
 * Plausible analytics script is loaded dynamically. You can add more
 * consent categories as needed.
 */
export default function CookieConsent() {
  const [show, setShow] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    // Show banner if consent not stored
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShow(true);
    } else if (consent === 'analytics') {
      // if analytics previously accepted then load script immediately
      loadPlausible();
    }
  }, []);

  const loadPlausible = () => {
    // Avoid adding multiple scripts
    if (document.querySelector('script[data-analytics]')) return;
    const script = document.createElement('script');
    script.setAttribute('data-analytics', 'plausible');
    script.defer = true;
    // Replace domain with your production domain
    script.setAttribute('data-domain', 'zen-haven.com');
    script.src = 'https://plausible.io/js/script.js';
    document.body.appendChild(script);
  };

  const accept = () => {
    localStorage.setItem('cookieConsent', analytics ? 'analytics' : 'essential');
    if (analytics) loadPlausible();
    setShow(false);
  };

  if (!show) return null;
  return (
    <div
      role="region"
      aria-live="polite"
      className="fixed inset-x-0 bottom-0 z-50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 border-t border-border bg-card text-card-foreground shadow-lg"
    >
      <div className="flex-1 text-sm">
        We use cookies to improve your experience. Enable analytics cookies to
        help us understand traffic and improve our services.
      </div>
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
          <input
            type="checkbox"
            className="form-checkbox h-4 w-4"
            checked={analytics}
            onChange={(e) => setAnalytics(e.target.checked)}
          />
          Allow analytics
        </label>
        <Button onClick={accept} className="px-3 py-2">
          Accept
        </Button>
      </div>
    </div>
  );
}