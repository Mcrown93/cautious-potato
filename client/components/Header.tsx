import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu';
import { useTranslation } from '@/i18n';
import { useTheme } from '@/hooks/useTheme';

/**
 * The Header component implements a responsive, accessible navigation bar with
 * multi-level menus, a theme toggle and a locale switcher. It adheres to
 * WCAG 2.2 by supporting keyboard navigation (arrow keys within dropdowns,
 * Escape to close) and by providing proper ARIA attributes via Radix UI
 * primitives. On mobile the menu collapses into a hamburger triggered
 * drawer. Language and theme preferences persist via localStorage.
 */
export default function Header() {
  const { t, lang, setLang } = useTranslation();
  const [theme, setTheme] = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Define sub navigation items for the services dropdown. Each item links
  // into the Services page with a hash for deep linking. Additional items
  // can be added here without changing the nav structure below.
  const serviceSections = [
    { id: 'webdev', label: 'Web Dev', href: '/services#webdev' },
    { id: 'seo', label: 'SEO/SEM', href: '/services#seo' },
    { id: 'branding', label: 'Branding', href: '/services#branding' },
    { id: 'maintenance', label: 'Maintenance', href: '/services#maintenance' },
  ];

  // Handler to switch languages. When triggered the page does not reload
  // because I18nProvider updates the context and re-renders consumers.
  const handleLangChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLang(e.target.value as any);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-border bg-background/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center" aria-hidden="true">
              <span className="text-slate-950 font-bold text-sm">Z</span>
            </div>
            <span className="font-semibold text-xl text-foreground">{t('app.name')}</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-4" aria-label="Primary">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>{t('components.header.services')}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-2 p-4 w-44" role="menu" aria-label={t('components.header.services')}>
                      {serviceSections.map((item) => (
                        <li key={item.id} role="none">
                          <NavigationMenuLink
                            asChild
                            className="block px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none"
                          >
                            <Link to={item.href} role="menuitem">
                              {item.label}
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link to="/method" className="px-4 py-2 rounded-md hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-primary">
                      {t('components.header.method') ?? 'Method'}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link to="/portfolio" className="px-4 py-2 rounded-md hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-primary">
                      {t('components.header.portfolio') ?? 'Portfolio'}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link to="/pricing" className="px-4 py-2 rounded-md hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-primary">
                      {t('components.header.pricing') ?? 'Pricing'}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link to="/about" className="px-4 py-2 rounded-md hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-primary">
                      {t('components.header.about') ?? 'About'}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link to="/contact" className="px-4 py-2 rounded-md hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-primary">
                      {t('components.header.contact') ?? 'Contact'}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-2">
            <Button variant="outline" asChild className="px-4 py-2">
              <Link to="/portfolio" aria-label={t('components.header.viewWork')}>
                {t('components.header.viewWork')}
              </Link>
            </Button>
            <Button variant="default" asChild className="px-4 py-2">
              <Link to="/quote" aria-label={t('components.header.requestQuote')}>
                {t('components.header.requestQuote')}
              </Link>
            </Button>
            {/* Theme toggle */}
            <Button variant="ghost" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label={t('components.header.theme') + ': ' + (theme === 'dark' ? t('components.header.light') : t('components.header.dark'))}>
              {theme === 'dark' ? '🌞' : '🌜'}
            </Button>
            {/* Language switcher */}
            <select
              value={lang}
              onChange={handleLangChange}
              className="bg-transparent text-sm border-none focus:ring-0"
              aria-label={t('components.header.language')}
            >
              <option value="en">EN</option>
              <option value="it">IT</option>
              <option value="fr">FR</option>
              <option value="es">ES</option>
              <option value="de">DE</option>
              <option value="pt">PT</option>
            </select>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-accent-foreground hover:bg-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? t('components.header.closeMenu') : t('components.header.openMenu')}
          >
            <span className="sr-only">
              {isMenuOpen ? t('components.header.closeMenu') : t('components.header.openMenu')}
            </span>
            {/* Hamburger and close icons */}
            <svg className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        <div className={`${isMenuOpen ? 'block' : 'hidden'} lg:hidden`}>
          <div className="pt-2 pb-4 space-y-1 border-t border-border" role="menu" aria-label="Mobile Menu">
            {/* Services with sub menu on mobile: we will list all service sections inline */}
            <div className="px-3 py-2">
              <details>
                <summary className="cursor-pointer list-none text-foreground/80 hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary">
                  {t('components.header.services')}
                </summary>
                <ul className="pl-4 mt-2 space-y-1">
                  {serviceSections.map((item) => (
                    <li key={item.id}>
                      <Link
                        to={item.href}
                        className="block px-2 py-1 rounded-md text-foreground/70 hover:text-foreground hover:bg-accent"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
            </div>
            <Link
              to="/method"
              className={`block px-3 py-2 rounded-md text-foreground/80 hover:bg-accent hover:text-accent-foreground ${(location.pathname === '/method') ? 'bg-accent text-accent-foreground' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t('components.header.method') ?? 'Method'}
            </Link>
            <Link
              to="/portfolio"
              className={`block px-3 py-2 rounded-md text-foreground/80 hover:bg-accent hover:text-accent-foreground ${(location.pathname === '/portfolio') ? 'bg-accent text-accent-foreground' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t('components.header.portfolio') ?? 'Portfolio'}
            </Link>
            <Link
              to="/pricing"
              className={`block px-3 py-2 rounded-md text-foreground/80 hover:bg-accent hover:text-accent-foreground ${(location.pathname === '/pricing') ? 'bg-accent text-accent-foreground' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t('components.header.pricing') ?? 'Pricing'}
            </Link>
            <Link
              to="/about"
              className={`block px-3 py-2 rounded-md text-foreground/80 hover:bg-accent hover:text-accent-foreground ${(location.pathname === '/about') ? 'bg-accent text-accent-foreground' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t('components.header.about') ?? 'About'}
            </Link>
            <Link
              to="/contact"
              className={`block px-3 py-2 rounded-md text-foreground/80 hover:bg-accent hover:text-accent-foreground ${(location.pathname === '/contact') ? 'bg-accent text-accent-foreground' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t('components.header.contact') ?? 'Contact'}
            </Link>
            <div className="flex flex-col space-y-2 px-3 pt-3">
              <Button variant="outline" asChild className="justify-start">
                <Link to="/portfolio" onClick={() => setIsMenuOpen(false)} aria-label={t('components.header.viewWork')}>
                  {t('components.header.viewWork')}
                </Link>
              </Button>
              <Button asChild className="justify-start">
                <Link to="/quote" onClick={() => setIsMenuOpen(false)} aria-label={t('components.header.requestQuote')}>
                  {t('components.header.requestQuote')}
                </Link>
              </Button>
              <div className="flex items-center space-x-2 mt-2">
                <Button variant="ghost" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label={t('components.header.theme') + ': ' + (theme === 'dark' ? t('components.header.light') : t('components.header.dark'))}>
                  {theme === 'dark' ? '🌞' : '🌜'}
                </Button>
                <select
                  value={lang}
                  onChange={handleLangChange}
                  className="bg-transparent text-sm border-none focus:ring-0"
                  aria-label={t('components.header.language')}
                >
                  <option value="en">EN</option>
                  <option value="it">IT</option>
                  <option value="fr">FR</option>
                  <option value="es">ES</option>
                  <option value="de">DE</option>
                  <option value="pt">PT</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
