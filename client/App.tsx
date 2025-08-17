import "./global.css";

import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import RouteSkeleton from "@/components/RouteSkeleton";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { I18nProvider } from "@/i18n";
import { HelmetProvider } from "react-helmet-async";
import CookieConsent from '@/components/CookieConsent';

// Lazily load all route components to enable code splitting. Each page will
// only be loaded when its route becomes active. This dramatically reduces
// the initial JavaScript bundle size and improves first load performance.
const Index = lazy(() => import("./pages/Index"));
const Services = lazy(() => import("./pages/Services"));
const Method = lazy(() => import("./pages/Method"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const Pricing = lazy(() => import("./pages/Pricing"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Quote = lazy(() => import("./pages/Quote"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Additional pages
const Blog = lazy(() => import('./pages/Blog'));
const Article = lazy(() => import('./pages/Article'));
const Resources = lazy(() => import('./pages/Resources'));
const Docs = lazy(() => import('./pages/Docs'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Cookies = lazy(() => import('./pages/Cookies'));
const Accessibility = lazy(() => import('./pages/Accessibility'));
const Terms = lazy(() => import('./pages/Terms'));

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        <HelmetProvider>
          <TooltipProvider>
            {/*
              Skip link allows keyboard and screen reader users to bypass
              the navigation and jump straight to the main content. It
              becomes visible when focused.
            */}
            <a
              href="#main-content"
              className="skip-link fixed left-2 top-2 -translate-y-full focus:translate-y-0 transition-transform duration-300 bg-primary text-primary-foreground py-2 px-4 rounded-md z-[1000]"
            >
              Skip to content
            </a>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              {/* Cookie consent banner is rendered outside of Routes so that
                  it persists across page navigations. */}
              <CookieConsent />
              {/* Main content wrapper used by skip link */}
              <div id="main-content" className="pt-16">
                <Routes>
                <Route
                  path="/"
                  element={
                    <ErrorBoundary>
                      <Suspense fallback={<RouteSkeleton />}>
                        <Index />
                      </Suspense>
                    </ErrorBoundary>
                  }
                />
                <Route
                  path="/services"
                  element={
                    <ErrorBoundary>
                      <Suspense fallback={<RouteSkeleton />}>
                        <Services />
                      </Suspense>
                    </ErrorBoundary>
                  }
                />
                <Route
                  path="/method"
                  element={
                    <ErrorBoundary>
                      <Suspense fallback={<RouteSkeleton />}>
                        <Method />
                      </Suspense>
                    </ErrorBoundary>
                  }
                />
                <Route
                  path="/portfolio"
                  element={
                    <ErrorBoundary>
                      <Suspense fallback={<RouteSkeleton />}>
                        <Portfolio />
                      </Suspense>
                    </ErrorBoundary>
                  }
                />
                <Route
                  path="/pricing"
                  element={
                    <ErrorBoundary>
                      <Suspense fallback={<RouteSkeleton />}>
                        <Pricing />
                      </Suspense>
                    </ErrorBoundary>
                  }
                />
                <Route
                  path="/about"
                  element={
                    <ErrorBoundary>
                      <Suspense fallback={<RouteSkeleton />}>
                        <About />
                      </Suspense>
                    </ErrorBoundary>
                  }
                />
                <Route
                  path="/contact"
                  element={
                    <ErrorBoundary>
                      <Suspense fallback={<RouteSkeleton />}>
                        <Contact />
                      </Suspense>
                    </ErrorBoundary>
                  }
                />
                <Route
                  path="/quote"
                  element={
                    <ErrorBoundary>
                      <Suspense fallback={<RouteSkeleton />}>
                        <Quote />
                      </Suspense>
                    </ErrorBoundary>
                  }
                />
                <Route
                  path="/blog"
                  element={
                    <ErrorBoundary>
                      <Suspense fallback={<RouteSkeleton />}>
                        <Blog />
                      </Suspense>
                    </ErrorBoundary>
                  }
                />
                <Route
                  path="/blog/:slug"
                  element={
                    <ErrorBoundary>
                      <Suspense fallback={<RouteSkeleton />}>
                        <Article />
                      </Suspense>
                    </ErrorBoundary>
                  }
                />
                <Route
                  path="/resources"
                  element={
                    <ErrorBoundary>
                      <Suspense fallback={<RouteSkeleton />}>
                        <Resources />
                      </Suspense>
                    </ErrorBoundary>
                  }
                />
                <Route
                  path="/docs"
                  element={
                    <ErrorBoundary>
                      <Suspense fallback={<RouteSkeleton />}>
                        <Docs />
                      </Suspense>
                    </ErrorBoundary>
                  }
                />
                <Route
                  path="/privacy"
                  element={
                    <ErrorBoundary>
                      <Suspense fallback={<RouteSkeleton />}>
                        <Privacy />
                      </Suspense>
                    </ErrorBoundary>
                  }
                />
                <Route
                  path="/cookies"
                  element={
                    <ErrorBoundary>
                      <Suspense fallback={<RouteSkeleton />}>
                        <Cookies />
                      </Suspense>
                    </ErrorBoundary>
                  }
                />
                <Route
                  path="/accessibility"
                  element={
                    <ErrorBoundary>
                      <Suspense fallback={<RouteSkeleton />}>
                        <Accessibility />
                      </Suspense>
                    </ErrorBoundary>
                  }
                />
                <Route
                  path="/terms"
                  element={
                    <ErrorBoundary>
                      <Suspense fallback={<RouteSkeleton />}>
                        <Terms />
                      </Suspense>
                    </ErrorBoundary>
                  }
                />
                {/* fallback route */}
                <Route
                  path="*"
                  element={
                    <ErrorBoundary>
                      <Suspense fallback={<RouteSkeleton />}>
                        <NotFound />
                      </Suspense>
                    </ErrorBoundary>
                  }
                />
              </Routes>
              </div>
            </BrowserRouter>
          </TooltipProvider>
        </HelmetProvider>
      </I18nProvider>
    </QueryClientProvider>
  );
};

createRoot(document.getElementById('root')!).render(<App />);
