import { Link } from "react-router-dom";

const portfolioItems = [
  {
    slug: "saas-signups-up-42",
    title: "SaaS signups up by 42% in 12 weeks",
    industry: "SaaS",
    summary: "We rebuilt the landing, clarified value proposition, and tuned performance.",
    kpis: [
      { label: "Signups", value: "+42%" },
      { label: "LCP", value: "-0.9s" }
    ],
    services: ["WebDev", "SEO", "React"],
    stack: ["React", "Vite", "GA4"],
    thumb: {
      src: "/placeholder.svg",
      alt: "Landing page redesign for a SaaS product, hero and signup module",
      width: 1280,
      height: 800
    }
  },
  {
    slug: "corporate-redesign",
    title: "Corporate site: -1.8s load time, +60% traffic",
    industry: "Corporate",
    summary: "Complete rebuild with performance optimization and technical SEO improvements.",
    kpis: [
      { label: "Load Time", value: "-1.8s" },
      { label: "Organic", value: "+60%" }
    ],
    services: ["WebDev", "Tech SEO", "Vite"],
    stack: ["Vite", "WordPress", "Cloudflare"],
    thumb: {
      src: "/placeholder.svg",
      alt: "Corporate website redesign with improved performance metrics",
      width: 1280,
      height: 800
    }
  },
  {
    slug: "agency-portfolio-hub",
    title: "Filterable case hub boosts conversion +33%",
    industry: "Agency",
    summary: "Built a dynamic portfolio system with advanced filtering and analytics integration.",
    kpis: [
      { label: "Conversion", value: "+33%" },
      { label: "Dwell Time", value: "+18%" }
    ],
    services: ["WebDev", "UX", "GA4"],
    stack: ["React", "Sanity", "Vercel"],
    thumb: {
      src: "/placeholder.svg",
      alt: "Portfolio hub with filtering interface and case study cards",
      width: 1280,
      height: 800
    }
  },
  {
    slug: "b2b-lead-engine",
    title: "+47% qualified leads for B2B services",
    industry: "B2B Services",
    summary: "Comprehensive SEO strategy with content optimization and lead capture improvements.",
    kpis: [
      { label: "MQL", value: "+47%" },
      { label: "CTR", value: "+22%" }
    ],
    services: ["SEO", "Content", "CRO"],
    stack: ["WordPress", "HubSpot", "Matomo"],
    thumb: {
      src: "/placeholder.svg",
      alt: "B2B services website with lead generation forms and content",
      width: 1280,
      height: 800
    }
  },
  {
    slug: "brand-system-rollout",
    title: "Unified brand system across web/app",
    industry: "Enterprise",
    summary: "Created comprehensive design system and rolled out across all digital touchpoints.",
    kpis: [
      { label: "Consistency", value: "+100%" },
      { label: "Design Debt", value: "-40%" }
    ],
    services: ["Branding", "Design System"],
    stack: ["Figma", "Storybook", "Tailwind"],
    thumb: {
      src: "/placeholder.svg",
      alt: "Brand system documentation and component library",
      width: 1280,
      height: 800
    }
  },
  {
    slug: "maintenance-sla-impact",
    title: "99.9% uptime and 100% CWV",
    industry: "E-commerce",
    summary: "Implemented comprehensive monitoring, security, and performance optimization.",
    kpis: [
      { label: "Uptime", value: "99.9%" },
      { label: "CWV", value: "100%" }
    ],
    services: ["Maintenance", "CDN", "Monitoring"],
    stack: ["Cloudflare", "Sentry", "UptimeRobot"],
    thumb: {
      src: "/placeholder.svg",
      alt: "Performance monitoring dashboard with uptime metrics",
      width: 1280,
      height: 800
    }
  }
];

export default function PortfolioHighlights() {
  return (
    <section id="portfolio" className="py-20 lg:py-32 bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
            Portfolio Highlights
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Selected projects with measurable outcomes. Explore the full case studies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
          {portfolioItems.map((item, index) => (
            <article
              key={item.slug}
              className="group relative rounded-2xl overflow-clip border border-slate-700/40 bg-slate-800/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-[1.02]"
            >
              <Link to={`/portfolio/${item.slug}`} className="block aspect-[16/10] relative overflow-hidden">
                <img
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  src={item.thumb.src}
                  width={item.thumb.width}
                  height={item.thumb.height}
                  alt={item.thumb.alt}
                  loading={index < 3 ? 'eager' : 'lazy'}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
              </Link>

              <div className="absolute inset-0 grid grid-rows-[1fr_auto_auto] p-6">
                <div className="self-start">
                  <h3 className="text-white text-lg lg:text-xl font-semibold leading-tight mb-2">
                    <Link 
                      to={`/portfolio/${item.slug}`}
                      className="hover:text-teal-400 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded"
                    >
                      {item.title}
                    </Link>
                  </h3>
                  <p className="text-slate-300 text-sm">
                    {item.industry}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 self-end mb-4">
                  {item.kpis.slice(0, 2).map((kpi, kpiIndex) => (
                    <span
                      key={kpiIndex}
                      className="inline-flex items-center rounded-full border border-teal-400/40 bg-teal-500/15 px-3 py-1 text-white text-sm font-semibold"
                    >
                      <strong className="mr-1">{kpi.value}</strong>
                      {kpi.label}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {item.services.slice(0, 2).map((service, serviceIndex) => (
                      <span
                        key={serviceIndex}
                        className="rounded-md border border-slate-600/60 bg-slate-700/50 px-2 py-1 text-slate-200 text-xs"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                  <Link
                    to={`/portfolio/${item.slug}`}
                    className="inline-flex items-center rounded-full bg-teal-500 hover:bg-teal-600 px-4 py-2 text-slate-950 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    View case →
                  </Link>
                </div>

                <p className="sr-only">{item.summary}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/portfolio"
            className="inline-flex items-center rounded-full border border-slate-600 bg-slate-800/50 hover:bg-slate-700/50 px-6 py-3 text-slate-100 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            View all case studies
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
