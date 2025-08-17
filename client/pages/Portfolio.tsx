import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

const portfolioItems = [
  {
    slug: "saas-signups-up-42",
    title: "SaaS Signups Increased by 42%",
    client: "TechFlow",
    industry: "SaaS",
    services: ["Web Development", "SEO", "CRO"],
    technologies: ["React", "Vite", "GA4", "Tailwind"],
    year: "2024",
    featured: true,
    image: "https://images.pexels.com/photos/4974922/pexels-photo-4974922.jpeg",
    description: "Complete redesign and optimization of a SaaS landing page, focusing on conversion optimization and user experience improvements.",
    challenge: "Low conversion rates and poor user engagement on the existing landing page were limiting business growth.",
    solution: "Redesigned the entire user journey, implemented A/B testing, optimized loading speeds, and created compelling value propositions.",
    results: [
      { metric: "Conversion Rate", value: "+42%", description: "Significant increase in trial signups" },
      { metric: "Page Load Time", value: "-0.9s", description: "Improved site performance" },
      { metric: "User Engagement", value: "+28%", description: "Better user interaction metrics" }
    ],
    testimonial: {
      quote: "The new landing page completely transformed our conversion rates. The team understood our goals perfectly.",
      author: "Sarah Chen",
      position: "VP Marketing, TechFlow"
    },
    duration: "3 weeks",
    tags: ["Conversion Optimization", "Performance", "User Experience"]
  },
  {
    slug: "corporate-redesign",
    title: "Corporate Website Performance Overhaul",
    client: "InnovaCorp",
    industry: "Corporate",
    services: ["Web Development", "Technical SEO", "Performance Optimization"],
    technologies: ["Next.js", "WordPress", "Cloudflare", "Vercel"],
    year: "2024",
    featured: true,
    image: "https://images.pexels.com/photos/577195/pexels-photo-577195.jpeg",
    description: "Complete rebuild of a corporate website focusing on performance, SEO, and user experience improvements.",
    challenge: "Slow loading times, poor SEO performance, and outdated design were hurting business credibility.",
    solution: "Rebuilt using modern technologies, implemented comprehensive SEO strategy, and optimized for Core Web Vitals.",
    results: [
      { metric: "Load Time", value: "-1.8s", description: "Dramatically improved performance" },
      { metric: "Organic Traffic", value: "+60%", description: "Increased search visibility" },
      { metric: "Core Web Vitals", value: "100%", description: "Perfect performance scores" }
    ],
    testimonial: {
      quote: "Our new website is not just faster—it's a powerful business tool that drives results.",
      author: "Michael Rodriguez",
      position: "CEO, InnovaCorp"
    },
    duration: "4 weeks",
    tags: ["Performance", "SEO", "Modern Architecture"]
  },
  {
    slug: "agency-portfolio-hub",
    title: "Interactive Portfolio Hub",
    client: "CreativeStudio",
    industry: "Agency",
    services: ["Web Development", "UX Design", "Analytics"],
    technologies: ["React", "Sanity", "Vercel", "Framer Motion"],
    year: "2024",
    featured: false,
    image: "https://images.pexels.com/photos/7598011/pexels-photo-7598011.jpeg",
    description: "Dynamic portfolio system with advanced filtering, interactive galleries, and comprehensive analytics integration.",
    challenge: "Static portfolio website wasn't showcasing work effectively or generating leads.",
    solution: "Created an interactive, filterable portfolio with dynamic content management and lead capture systems.",
    results: [
      { metric: "Conversion Rate", value: "+33%", description: "More project inquiries" },
      { metric: "Time on Site", value: "+18%", description: "Better engagement" },
      { metric: "Lead Quality", value: "+45%", description: "Higher qualified prospects" }
    ],
    testimonial: {
      quote: "The new portfolio system has become our most effective sales tool.",
      author: "Lisa Park",
      position: "Creative Director, CreativeStudio"
    },
    duration: "2 weeks",
    tags: ["Interactive Design", "Portfolio", "Lead Generation"]
  },
  {
    slug: "b2b-lead-engine",
    title: "B2B Lead Generation Engine",
    client: "GrowthPartners",
    industry: "B2B Services",
    services: ["SEO", "Content Strategy", "CRO"],
    technologies: ["WordPress", "HubSpot", "Matomo", "Zapier"],
    year: "2023",
    featured: false,
    image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg",
    description: "Comprehensive SEO strategy and lead generation system for B2B services company.",
    challenge: "Low online visibility and insufficient qualified leads were limiting business growth.",
    solution: "Implemented comprehensive SEO strategy, created valuable content, and optimized conversion funnels.",
    results: [
      { metric: "Qualified Leads", value: "+47%", description: "More high-quality prospects" },
      { metric: "Organic CTR", value: "+22%", description: "Better search performance" },
      { metric: "Cost per Lead", value: "-35%", description: "More efficient acquisition" }
    ],
    testimonial: {
      quote: "Our lead quality and quantity improved dramatically. The ROI has been exceptional.",
      author: "David Kim",
      position: "Head of Sales, GrowthPartners"
    },
    duration: "6 weeks",
    tags: ["Lead Generation", "SEO", "B2B Marketing"]
  },
  {
    slug: "brand-system-rollout",
    title: "Enterprise Brand System",
    client: "TechGiant",
    industry: "Enterprise",
    services: ["Branding", "Design System", "Documentation"],
    technologies: ["Figma", "Storybook", "Tailwind", "React"],
    year: "2023",
    featured: false,
    image: "https://images.pexels.com/photos/1188751/pexels-photo-1188751.jpeg",
    description: "Comprehensive brand system and design language for enterprise technology company.",
    challenge: "Inconsistent brand presentation across multiple platforms and teams.",
    solution: "Created unified design system with comprehensive documentation and component library.",
    results: [
      { metric: "Brand Consistency", value: "+100%", description: "Unified presentation" },
      { metric: "Design Debt", value: "-40%", description: "Reduced inconsistencies" },
      { metric: "Development Speed", value: "+25%", description: "Faster implementation" }
    ],
    testimonial: {
      quote: "The design system has transformed how we work. Everything is consistent and efficient now.",
      author: "Jennifer Wu",
      position: "Design Director, TechGiant"
    },
    duration: "8 weeks",
    tags: ["Design System", "Branding", "Enterprise"]
  },
  {
    slug: "ecommerce-optimization",
    title: "E-commerce Performance & Monitoring",
    client: "ShopMaster",
    industry: "E-commerce",
    services: ["Maintenance", "Performance", "Security"],
    technologies: ["Cloudflare", "Sentry", "UptimeRobot", "WooCommerce"],
    year: "2023",
    featured: false,
    image: "https://images.pexels.com/photos/17489158/pexels-photo-17489158.jpeg",
    description: "Comprehensive monitoring, optimization, and maintenance system for high-traffic e-commerce platform.",
    challenge: "Frequent downtime and performance issues were affecting sales and customer satisfaction.",
    solution: "Implemented 24/7 monitoring, performance optimization, and proactive maintenance protocols.",
    results: [
      { metric: "Uptime", value: "99.9%", description: "Industry-leading reliability" },
      { metric: "Page Speed", value: "100%", description: "Perfect Core Web Vitals" },
      { metric: "Security Issues", value: "0", description: "Zero breaches or incidents" }
    ],
    testimonial: {
      quote: "Since the optimization, our site has been rock solid. Sales have never been better.",
      author: "Alex Thompson",
      position: "CTO, ShopMaster"
    },
    duration: "Ongoing",
    tags: ["Performance", "Security", "E-commerce"]
  }
];

const filters = {
  industry: ["All", "SaaS", "Corporate", "Agency", "B2B Services", "Enterprise", "E-commerce"],
  service: ["All", "Web Development", "SEO", "CRO", "Branding", "Performance", "Maintenance"],
  year: ["All", "2024", "2023"],
  technology: ["All", "React", "Next.js", "WordPress", "Figma", "Tailwind"]
};

export default function Portfolio() {
  const [activeFilters, setActiveFilters] = useState({
    industry: "All",
    service: "All", 
    year: "All",
    technology: "All"
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState(portfolioItems);
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const itemRefs = useRef<(HTMLElement | null)[]>([]);

  // Filter items based on active filters and search
  useEffect(() => {
    let filtered = portfolioItems.filter(item => {
      const matchesIndustry = activeFilters.industry === "All" || item.industry === activeFilters.industry;
      const matchesService = activeFilters.service === "All" || item.services.includes(activeFilters.service);
      const matchesYear = activeFilters.year === "All" || item.year === activeFilters.year;
      const matchesTechnology = activeFilters.technology === "All" || item.technologies.includes(activeFilters.technology);
      const matchesSearch = searchTerm === "" || 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.client.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesIndustry && matchesService && matchesYear && matchesTechnology && matchesSearch;
    });

    // Sort featured items first
    filtered.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });

    setFilteredItems(filtered);
    setVisibleItems([]);
  }, [activeFilters, searchTerm]);

  // Intersection Observer for animations
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
      { threshold: 0.1 }
    );

    itemRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [filteredItems, visibleItems]);

  const updateFilter = (filterType: keyof typeof activeFilters, value: string) => {
    setActiveFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const clearAllFilters = () => {
    setActiveFilters({
      industry: "All",
      service: "All",
      year: "All",
      technology: "All"
    });
    setSearchTerm("");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950/20" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Our <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">Portfolio</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Explore our case studies and see how we've helped businesses achieve measurable results through strategic design and development.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-400 mb-2">50+</div>
              <div className="text-slate-400 text-sm">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400 mb-2">98%</div>
              <div className="text-slate-400 text-sm">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-400 mb-2">+165%</div>
              <div className="text-slate-400 text-sm">Avg. Performance Gain</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">24/7</div>
              <div className="text-slate-400 text-sm">Support Coverage</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="py-8 border-b border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative max-w-md mx-auto">
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-10 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Filter Chips */}
          <div className="space-y-4">
            {Object.entries(filters).map(([filterType, options]) => (
              <div key={filterType}>
                <label className="block text-sm font-medium text-slate-300 mb-2 capitalize">
                  {filterType}
                </label>
                <div className="flex flex-wrap gap-2">
                  {options.map((option) => (
                    <button
                      key={option}
                      onClick={() => updateFilter(filterType as keyof typeof activeFilters, option)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                        activeFilters[filterType as keyof typeof activeFilters] === option
                          ? "bg-teal-500 text-slate-950"
                          : "bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-slate-700"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* View Controls */}
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center space-x-4">
              <span className="text-slate-400 text-sm">
                {filteredItems.length} project{filteredItems.length !== 1 ? 's' : ''} found
              </span>
              {(Object.values(activeFilters).some(f => f !== "All") || searchTerm) && (
                <button
                  onClick={clearAllFilters}
                  className="text-teal-400 hover:text-teal-300 text-sm font-medium"
                >
                  Clear all filters
                </button>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "grid" ? "bg-teal-500 text-slate-950" : "bg-slate-800/50 text-slate-400 hover:text-white"
                }`}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "list" ? "bg-teal-500 text-slate-950" : "bg-slate-800/50 text-slate-400 hover:text-white"
                }`}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {filteredItems.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-800/50 flex items-center justify-center">
                <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.511-.799-6.236-2.138l-.000001-.000001c-.71-.513-1.3-1.123-1.764-1.81A10.981 10.981 0 013 9c0-5.523 4.477-10 10-10s10 4.477 10 10c0 2.042-.612 3.94-1.664 5.519-.315.473-.683.91-1.096 1.306z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">No projects found</h3>
              <p className="text-slate-400 mb-4">Try adjusting your filters or search terms</p>
              <button
                onClick={clearAllFilters}
                className="inline-flex items-center px-4 py-2 bg-teal-500 text-slate-950 font-semibold rounded-full hover:bg-teal-600 transition-colors"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className={`grid gap-8 ${
              viewMode === "grid" 
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
                : "grid-cols-1"
            }`}>
              {filteredItems.map((item, index) => (
                <article
                  key={item.slug}
                  ref={el => itemRefs.current[index] = el}
                  className={`group relative transition-all duration-700 ease-out ${
                    visibleItems.includes(index) 
                      ? 'translate-y-0 opacity-100' 
                      : 'translate-y-20 opacity-0'
                  } ${viewMode === "list" ? "flex gap-6" : ""}`}
                >
                  <div className={`relative rounded-2xl overflow-hidden bg-slate-800/30 backdrop-blur-sm border border-slate-700/40 shadow-lg hover:shadow-xl transition-all duration-500 group-hover:border-slate-600/60 group-hover:transform group-hover:scale-105 ${
                    viewMode === "list" ? "flex w-full" : ""
                  }`}>
                    
                    {/* Image */}
                    <div className={`relative overflow-hidden ${
                      viewMode === "list" ? "w-80 flex-shrink-0" : "aspect-[4/3]"
                    }`}>
                      <img
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        src={item.image}
                        alt={item.title}
                        loading={index < 6 ? 'eager' : 'lazy'}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent" />
                      
                      {/* Featured badge */}
                      {item.featured && (
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-teal-500 text-slate-950 text-sm font-semibold rounded-full">
                            Featured
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}>
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-1 bg-slate-700/50 text-slate-300 text-xs rounded-full">
                            {item.industry}
                          </span>
                          <span className="px-2 py-1 bg-teal-500/20 text-teal-400 text-xs rounded-full">
                            {item.year}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-teal-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all duration-500">
                          <Link 
                            to={`/portfolio/${item.slug}`}
                            className="hover:underline focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded"
                          >
                            {item.title}
                          </Link>
                        </h3>
                        <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      {/* Results */}
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        {item.results.slice(0, 3).map((result, resultIndex) => (
                          <div key={resultIndex} className="text-center">
                            <div className="text-lg font-bold text-teal-400 mb-1">
                              {result.value}
                            </div>
                            <div className="text-slate-400 text-xs">
                              {result.metric}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Services */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {item.services.slice(0, 3).map((service, serviceIndex) => (
                          <span
                            key={serviceIndex}
                            className="rounded-md border border-slate-600/60 bg-slate-700/30 px-2 py-1 text-slate-200 text-xs"
                          >
                            {service}
                          </span>
                        ))}
                      </div>

                      <Link
                        to={`/portfolio/${item.slug}`}
                        className="inline-flex items-center text-teal-400 hover:text-teal-300 font-semibold text-sm transition-colors"
                      >
                        View Case Study
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-slate-900 to-teal-950/20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Create Your Success Story?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Let's discuss how we can help you achieve similar results for your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/quote"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-semibold rounded-full transition-all duration-300 transform hover:scale-105"
            >
              Start Your Project
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 border border-slate-600 hover:border-slate-500 text-slate-300 hover:text-white font-semibold rounded-full transition-all duration-300"
            >
              Discuss Your Needs
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
