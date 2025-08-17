import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

const portfolioItems = [
  {
    slug: "saas-signups-up-42",
    title: "SaaS signups up by 42% in 12 weeks",
    industry: "SaaS",
    client: "TechFlow",
    summary: "We rebuilt the landing page, clarified value proposition, and optimized performance for maximum conversions.",
    kpis: [
      { label: "Signups", value: "+42%" },
      { label: "LCP", value: "-0.9s" },
      { label: "Conversion", value: "+28%" }
    ],
    services: ["WebDev", "SEO", "CRO"],
    stack: ["React", "Vite", "GA4"],
    thumb: {
      src: "https://images.pexels.com/photos/4974922/pexels-photo-4974922.jpeg",
      alt: "Landing page redesign for a SaaS product, hero and signup module",
      width: 1280,
      height: 800
    },
    featured: true
  },
  {
    slug: "corporate-redesign",
    title: "Corporate site: -1.8s load time, +60% traffic",
    industry: "Corporate",
    client: "InnovaCorp",
    summary: "Complete rebuild with performance optimization and technical SEO improvements delivered remarkable results.",
    kpis: [
      { label: "Load Time", value: "-1.8s" },
      { label: "Organic", value: "+60%" },
      { label: "CWV Score", value: "100%" }
    ],
    services: ["WebDev", "Tech SEO", "Performance"],
    stack: ["Next.js", "WordPress", "Cloudflare"],
    thumb: {
      src: "https://images.pexels.com/photos/577195/pexels-photo-577195.jpeg",
      alt: "Corporate website redesign with improved performance metrics",
      width: 1280,
      height: 800
    },
    featured: true
  },
  {
    slug: "agency-portfolio-hub",
    title: "Filterable case hub boosts conversion +33%",
    industry: "Agency",
    client: "CreativeStudio",
    summary: "Built a dynamic portfolio system with advanced filtering, interactive galleries, and analytics integration.",
    kpis: [
      { label: "Conversion", value: "+33%" },
      { label: "Dwell Time", value: "+18%" },
      { label: "Engagement", value: "+45%" }
    ],
    services: ["WebDev", "UX", "Analytics"],
    stack: ["React", "Sanity", "Vercel"],
    thumb: {
      src: "https://images.pexels.com/photos/7598011/pexels-photo-7598011.jpeg",
      alt: "Portfolio hub with filtering interface and case study cards",
      width: 1280,
      height: 800
    },
    featured: false
  },
  {
    slug: "b2b-lead-engine",
    title: "+47% qualified leads for B2B services",
    industry: "B2B Services",
    client: "GrowthPartners",
    summary: "Comprehensive SEO strategy with content optimization and lead capture improvements delivered outstanding ROI.",
    kpis: [
      { label: "MQL", value: "+47%" },
      { label: "CTR", value: "+22%" },
      { label: "Cost/Lead", value: "-35%" }
    ],
    services: ["SEO", "Content", "CRO"],
    stack: ["WordPress", "HubSpot", "Matomo"],
    thumb: {
      src: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg",
      alt: "B2B services website with lead generation forms and content",
      width: 1280,
      height: 800
    },
    featured: false
  },
  {
    slug: "brand-system-rollout",
    title: "Unified brand system across web/app",
    industry: "Enterprise",
    client: "TechGiant",
    summary: "Created comprehensive design system and rolled out across all digital touchpoints for consistency.",
    kpis: [
      { label: "Consistency", value: "+100%" },
      { label: "Design Debt", value: "-40%" },
      { label: "Dev Speed", value: "+25%" }
    ],
    services: ["Branding", "Design System", "Documentation"],
    stack: ["Figma", "Storybook", "Tailwind"],
    thumb: {
      src: "https://images.pexels.com/photos/1188751/pexels-photo-1188751.jpeg",
      alt: "Brand system documentation and component library",
      width: 1280,
      height: 800
    },
    featured: false
  },
  {
    slug: "maintenance-sla-impact",
    title: "99.9% uptime and 100% CWV",
    industry: "E-commerce",
    client: "ShopMaster",
    summary: "Implemented comprehensive monitoring, security, and performance optimization with guaranteed SLA.",
    kpis: [
      { label: "Uptime", value: "99.9%" },
      { label: "CWV", value: "100%" },
      { label: "Security", value: "0 Issues" }
    ],
    services: ["Maintenance", "Security", "Monitoring"],
    stack: ["Cloudflare", "Sentry", "UptimeRobot"],
    thumb: {
      src: "https://images.pexels.com/photos/17489158/pexels-photo-17489158.jpeg",
      alt: "Performance monitoring dashboard with uptime metrics",
      width: 1280,
      height: 800
    },
    featured: false
  }
];

export default function EnhancedPortfolio() {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = itemRefs.current.indexOf(entry.target as HTMLElement);
            if (index !== -1 && !visibleItems.includes(index)) {
              setTimeout(() => {
                setVisibleItems(prev => [...prev, index]);
              }, index * 100);
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    itemRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [visibleItems]);

  // Mouse tracking for advanced effects
  const handleMouseMove = (e: React.MouseEvent) => {
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      setMousePosition({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height
      });
    }
  };

  return (
    <section 
      id="portfolio" 
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-slate-900 overflow-hidden"
      onMouseMove={handleMouseMove}
      style={{
        background: `
          radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(20, 184, 166, 0.08) 0%, transparent 50%),
          linear-gradient(135deg, #1e293b 0%, #0f172a 100%)
        `
      }}
    >
      {/* Dynamic background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute w-96 h-96 bg-gradient-to-br from-teal-500/5 to-cyan-500/5 rounded-full blur-3xl transition-all duration-1000"
          style={{
            left: `${mousePosition.x * 80}%`,
            top: `${mousePosition.y * 80}%`,
            transform: `translate(-50%, -50%) scale(${1 + mousePosition.x * 0.3})`
          }}
        />
        <div 
          className="absolute w-64 h-64 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-full blur-3xl transition-all duration-700"
          style={{
            right: `${(1 - mousePosition.x) * 60}%`,
            bottom: `${(1 - mousePosition.y) * 60}%`,
            transform: `translate(50%, 50%) scale(${1 + mousePosition.y * 0.2})`
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Enhanced Section Header */}
        <div className="text-center mb-16">
          <div className="relative inline-block mb-6">
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
              Portfolio Highlights
            </h2>
            <div className="absolute -inset-4 bg-gradient-to-r from-teal-400/10 to-cyan-400/10 blur-xl rounded-lg" />
          </div>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Selected projects with measurable outcomes. Each case study demonstrates our commitment to results.
          </p>
        </div>

        {/* Featured Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {portfolioItems.filter(item => item.featured).map((item, index) => (
            <article
              key={item.slug}
              ref={el => itemRefs.current[index] = el}
              className={`group relative transition-all duration-700 ease-out ${
                visibleItems.includes(index) 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-20 opacity-0'
              }`}
              onMouseEnter={() => setHoveredItem(index)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className="relative rounded-3xl overflow-hidden bg-slate-800/30 backdrop-blur-sm border border-slate-700/40 shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:border-slate-600/60 group-hover:transform group-hover:scale-[1.02]">
                
                {/* Image with advanced hover effects */}
                <div className="relative h-64 lg:h-80 overflow-hidden">
                  <img
                    className="w-full h-full object-cover transform transition-all duration-700 group-hover:scale-110"
                    src={item.thumb.src}
                    width={item.thumb.width}
                    height={item.thumb.height}
                    alt={item.thumb.alt}
                    loading={index < 2 ? 'eager' : 'lazy'}
                  />
                  
                  {/* Gradient overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Floating elements */}
                  <div className="absolute top-6 right-6">
                    <div className="px-3 py-1 bg-black/60 backdrop-blur-sm text-white text-sm font-semibold rounded-full border border-white/20">
                      Featured
                    </div>
                  </div>

                  {/* Client badge */}
                  <div className="absolute top-6 left-6">
                    <div className="px-3 py-1 bg-teal-500/20 backdrop-blur-sm text-teal-400 text-sm font-semibold rounded-full border border-teal-400/30">
                      {item.client}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="absolute inset-x-0 bottom-0 p-8">
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-slate-700/50 backdrop-blur-sm text-slate-300 text-sm rounded-full mb-3">
                      {item.industry}
                    </span>
                    <h3 className="text-xl lg:text-2xl font-bold text-white mb-3 leading-tight group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-teal-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all duration-500">
                      <Link 
                        to={`/portfolio/${item.slug}`}
                        className="hover:underline focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded"
                      >
                        {item.title}
                      </Link>
                    </h3>
                    <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                      {item.summary}
                    </p>
                  </div>

                  {/* KPIs */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.kpis.slice(0, 3).map((kpi, kpiIndex) => (
                      <span
                        key={kpiIndex}
                        className="inline-flex items-center rounded-full border border-emerald-400/40 bg-emerald-500/15 px-3 py-1 text-white text-sm font-semibold transform transition-all duration-500 hover:scale-105"
                      >
                        <strong className="mr-1 text-emerald-400">{kpi.value}</strong>
                        {kpi.label}
                      </span>
                    ))}
                  </div>

                  {/* Services and CTA */}
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2 flex-wrap">
                      {item.services.slice(0, 3).map((service, serviceIndex) => (
                        <span
                          key={serviceIndex}
                          className="rounded-lg border border-slate-600/60 bg-slate-700/30 px-2 py-1 text-slate-200 text-xs"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                    <Link
                      to={`/portfolio/${item.slug}`}
                      className="inline-flex items-center rounded-full bg-teal-500 hover:bg-teal-600 px-4 py-2 text-slate-950 text-sm font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-teal-500/25"
                    >
                      View Case →
                    </Link>
                  </div>

                  <p className="sr-only">{item.summary}</p>
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
              </div>
            </article>
          ))}
        </div>

        {/* Regular Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {portfolioItems.filter(item => !item.featured).map((item, index) => {
            const adjustedIndex = index + 2; // Account for featured items
            return (
              <article
                key={item.slug}
                ref={el => itemRefs.current[adjustedIndex] = el}
                className={`group relative transition-all duration-700 ease-out ${
                  visibleItems.includes(adjustedIndex) 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-20 opacity-0'
                }`}
                onMouseEnter={() => setHoveredItem(adjustedIndex)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className="relative rounded-2xl overflow-hidden bg-slate-800/30 backdrop-blur-sm border border-slate-700/40 shadow-lg hover:shadow-xl transition-all duration-500 group-hover:border-slate-600/60 group-hover:transform group-hover:scale-105">
                  
                  <Link to={`/portfolio/${item.slug}`} className="block aspect-[4/3] relative overflow-hidden">
                    <img
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      src={item.thumb.src}
                      width={item.thumb.width}
                      height={item.thumb.height}
                      alt={item.thumb.alt}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent" />
                  </Link>

                  <div className="absolute inset-0 flex flex-col justify-between p-4">
                    <div className="self-start">
                      <span className="inline-block px-2 py-1 bg-slate-700/50 backdrop-blur-sm text-slate-300 text-xs rounded-full">
                        {item.industry}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-white text-sm font-semibold leading-tight mb-2">
                        <Link 
                          to={`/portfolio/${item.slug}`}
                          className="hover:text-teal-400 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded"
                        >
                          {item.title}
                        </Link>
                      </h3>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {item.kpis.slice(0, 2).map((kpi, kpiIndex) => (
                          <span
                            key={kpiIndex}
                            className="inline-flex items-center rounded-full border border-teal-400/40 bg-teal-500/15 px-2 py-0.5 text-white text-xs font-semibold"
                          >
                            <strong className="mr-1">{kpi.value}</strong>
                            {kpi.label}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex gap-1">
                          {item.services.slice(0, 2).map((service, serviceIndex) => (
                            <span
                              key={serviceIndex}
                              className="rounded-md border border-slate-600/60 bg-slate-700/50 px-2 py-0.5 text-slate-200 text-xs"
                            >
                              {service}
                            </span>
                          ))}
                        </div>
                        <Link
                          to={`/portfolio/${item.slug}`}
                          className="text-teal-400 hover:text-teal-300 text-xs font-semibold transition-colors"
                        >
                          View →
                        </Link>
                      </div>
                    </div>

                    <p className="sr-only">{item.summary}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Enhanced CTA */}
        <div className="text-center mt-16">
          <div className="relative inline-block">
            <Link
              to="/portfolio"
              className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-semibold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-teal-500/25"
            >
              View All Case Studies
              <svg className="w-5 h-5 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <div className="absolute -inset-3 bg-gradient-to-r from-teal-400/20 to-cyan-400/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>
      </div>
    </section>
  );
}
