import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from '@/i18n';
import { useState } from 'react';

/*
 * The footer presents four columns: sitemap, resources, legal and contacts.
 * A newsletter subscription form collects email addresses and validates
 * them with a Zod schema. The back-to-top button is implemented with
 * smooth scrolling and is keyboard accessible. All text is translated via
 * the i18n provider. Social icons are included inline with accessible
 * labels. The current year is inserted at runtime.
 */

const newsletterSchema = z.object({
  email: z.string().email(),
});

interface NewsletterForm {
  email: string;
}

export default function Footer() {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<NewsletterForm>({
    resolver: zodResolver(newsletterSchema),
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Set current year
    const yearElements = document.querySelectorAll('[data-year]');
    yearElements.forEach((el) => {
      el.textContent = new Date().getFullYear().toString();
    });
    // Back to top handler
    const backToTopButton = document.querySelector('.back-to-top');
    const handleBackToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    backToTopButton?.addEventListener('click', handleBackToTop);
    return () => backToTopButton?.removeEventListener('click', handleBackToTop);
  }, []);

  const onSubmit = (data: NewsletterForm) => {
    // Simulate async subscribe; in reality this should POST to backend
    setSubmitted(true);
    setTimeout(() => {
      reset();
      setSubmitted(false);
    }, 2000);
  };

  return (
    <footer role="contentinfo" aria-labelledby="footer-heading" className="bg-background text-foreground border-t border-border">
      <h2 id="footer-heading" className="sr-only">
        {t('components.footer.sitemap')}
      </h2>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Sitemap */}
          <nav aria-labelledby="footer-sitemap">
            <h3 id="footer-sitemap" className="text-sm font-semibold uppercase tracking-wider mb-4">
              {t('components.footer.sitemap')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services" className="hover:underline focus-visible:underline">
                  {t('components.header.services')}
                </Link>
              </li>
              <li>
                <Link to="/method" className="hover:underline focus-visible:underline">
                  {t('components.header.method')}
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="hover:underline focus-visible:underline">
                  {t('components.header.portfolio')}
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:underline focus-visible:underline">
                  {t('components.header.pricing')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:underline focus-visible:underline">
                  {t('components.header.about')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:underline focus-visible:underline">
                  {t('components.header.contact')}
                </Link>
              </li>
            </ul>
          </nav>
          {/* Resources */}
          <nav aria-labelledby="footer-resources">
            <h3 id="footer-resources" className="text-sm font-semibold uppercase tracking-wider mb-4">
              {t('components.footer.resources')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/blog" className="hover:underline focus-visible:underline">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/resources" className="hover:underline focus-visible:underline">
                  Resources
                </Link>
              </li>
              <li>
                <Link to="/docs" className="hover:underline focus-visible:underline">
                  Docs
                </Link>
              </li>
            </ul>
          </nav>
          {/* Legal */}
          <nav aria-labelledby="footer-legal">
            <h3 id="footer-legal" className="text-sm font-semibold uppercase tracking-wider mb-4">
              {t('components.footer.legal')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="hover:underline focus-visible:underline">
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="hover:underline focus-visible:underline">
                  Cookies
                </Link>
              </li>
              <li>
                <Link to="/accessibility" className="hover:underline focus-visible:underline">
                  Accessibility
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:underline focus-visible:underline">
                  Terms
                </Link>
              </li>
            </ul>
          </nav>
          {/* Contacts */}
          <address aria-labelledby="footer-contacts" className="not-italic">
            <h3 id="footer-contacts" className="text-sm font-semibold uppercase tracking-wider mb-4">
              {t('components.footer.contacts')}
            </h3>
            <p>
              <a href="mailto:hello@zenhaven.dev" className="hover:underline focus-visible:underline">
                hello@zenhaven.dev
              </a>
            </p>
            <p>
              <a href="tel:+390000000000" className="hover:underline focus-visible:underline">
                +39 000 000 000
              </a>
            </p>
            <p>Mon–Fri 09:00–18:00 CET</p>
            <p>Zen Haven S.r.l. – VAT IT00000000000</p>
            <p>Cagliari, Italy</p>
          </address>
        </div>
        {/* Newsletter and bottom */}
        <div className="mt-12 border-t border-border pt-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col sm:flex-row items-start sm:items-end gap-2"
              aria-label={t('components.footer.newsletter.title') || 'Subscribe to our newsletter'}
            >
              <div className="flex flex-col">
                <label htmlFor="newsletter-email" className="sr-only">
                  {t('components.newsletter.label')}
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  autoComplete="email"
                  placeholder={t('components.footer.newsletter.placeholder')}
                  aria-invalid={errors.email ? 'true' : 'false'}
                  className="px-3 py-2 rounded-md border border-border bg-background text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary"
                  {...register('email')}
                />
                {errors.email && (
                  <span role="alert" className="mt-1 text-sm text-red-600">
                    {t('components.newsletter.error')}
                  </span>
                )}
              </div>
              <button
                type="submit"
                className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                disabled={submitted}
              >
                {submitted ? '…' : t('components.footer.newsletter.submit')}
              </button>
              {isSubmitSuccessful && !submitted && (
                <p role="status" className="ml-2 text-sm text-green-500">
                  {t('components.newsletter.success')}
                </p>
              )}
            </form>
            <div className="flex items-center gap-4">
              <a
                href="https://www.linkedin.com/company/zenhaven"
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                <span className="sr-only">LinkedIn</span>
              </a>
              <a
                href="https://twitter.com/zenhaven"
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                aria-label="Twitter"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="https://instagram.com/zenhaven"
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.017 0C8.396 0 7.999.01 6.756.048 5.517.087 4.686.222 3.971.42a5.979 5.979 0 0 0-2.161 1.404A5.979 5.979 0 0 0 .42 3.971C.222 4.686.087 5.517.048 6.756.01 7.999 0 8.396 0 12.017c0 3.624.01 4.021.048 5.264.039 1.24.174 2.071.372 2.786.196.822.52 1.52 1.004 2.161a5.979 5.979 0 0 0 2.161 1.404c.715.198 1.546.333 2.786.372C7.999 23.99 8.396 24 12.017 24c3.624 0 4.021-.01 5.264-.048 1.24-.039 2.071-.174 2.786-.372a5.979 5.979 0 0 0 2.161-1.404 5.979 5.979 0 0 0 1.404-2.161c.198-.715.333-1.546.372-2.786C23.99 16.021 24 15.624 24 12.017c0-3.624-.01-4.021-.048-5.264-.039-1.24-.174-2.071-.372-2.786a5.979 5.979 0 0 0-1.404-2.161A5.979 5.979 0 0 0 20.015.42C19.3.222 18.469.087 17.229.048 15.986.01 15.589 0 12.017 0zm0 2.161c3.557 0 3.98.01 5.238.048 1.264.058 1.95.27 2.407.445.605.236 1.037.517 1.491.972.455.455.736.886.972 1.491.175.457.387 1.143.445 2.407.038 1.258.048 1.681.048 5.238 0 3.557-.01 3.98-.048 5.238-.058 1.264-.27 1.95-.445 2.407-.236.605-.517 1.037-.972 1.491-.455.455-.886.736-1.491.972-.457.175-1.143.387-2.407.445-1.258.038-1.681.048-5.238.048-3.557 0-3.98-.01-5.238-.048-1.264-.058-1.95-.27-2.407-.445-.605-.236-1.037-.517-1.491-.972-.455-.455-.736-.886-.972-1.491-.175-.457-.387-1.143-.445-2.407C2.171 15.997 2.161 15.574 2.161 12.017c0-3.557.01-3.98.048-5.238.058-1.264.27-1.95.445-2.407.236-.605.517-1.037.972-1.491.455-.455.886-.736 1.491-.972.457-.175 1.143-.387 2.407-.445C8.037 2.171 8.46 2.161 12.017 2.161zm0 3.478a6.378 6.378 0 1 0 0 12.756 6.378 6.378 0 1 0 0-12.756zm0 10.515a4.137 4.137 0 1 1 0-8.274 4.137 4.137 0 0 1 0 8.274zm8.108-10.987a1.49 1.49 0 1 1-2.98 0 1.49 1.49 0 0 1 2.98 0z" />
                </svg>
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
            <p className="text-sm text-foreground/70">
              © <span data-year></span> {t('app.name')}. All rights reserved.
            </p>
            <button
              type="button"
              className="back-to-top inline-flex items-center gap-2 px-3 py-2 rounded-md border border-border hover:bg-accent hover:text-accent-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Back to top"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              <span className="sr-only">Back to top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}