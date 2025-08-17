import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from '@/i18n';

export default function Cookies() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Helmet>
        <title>{t('pages.cookies.title')}</title>
        <meta name="description" content={t('pages.cookies.description')} />
        <link rel="canonical" href="/cookies" />
      </Helmet>
      <Header />
      <main className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8 prose prose-slate dark:prose-invert mx-auto max-w-4xl">
        <h1>{t('pages.cookies.title')}</h1>
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        <p>
          This site uses cookies to improve your browsing experience. We use
          strictly necessary cookies by default. Optional analytics and
          marketing cookies are disabled until you grant consent.
        </p>
        <p>
          You can manage your cookie preferences at any time from the footer by
          clicking “Cookie Preferences”.
        </p>
      </main>
      <Footer />
    </div>
  );
}