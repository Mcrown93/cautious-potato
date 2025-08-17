import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const services = [
  {
    id: "webdev",
    title: "Web Design & Development",
    problem: "Outdated websites fail to convert.",
    solution: "Responsive, accessible, fast websites tailored to your brand.",
    outcome: "More leads, better user experience, higher trust.",
    image: {
      url: "https://images.pexels.com/photos/4974922/pexels-photo-4974922.jpeg",
      alt: "Top view of young programmer working on multiple laptops in a modern office setting."
    },
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    gradient: "from-blue-500 to-cyan-500",
    stats: ["50+ Projects", "99% Uptime", "< 2s Load Time"]
  },
  {
    id: "seo",
    title: "SEO/SEM",
    problem: "Without visibility, a great site goes unnoticed.",
    solution: "On-page, off-page, and technical SEO + paid campaigns.",
    outcome: "Higher rankings, more qualified traffic, measurable ROI.",
    image: {
      url: "https://images.pexels.com/photos/577195/pexels-photo-577195.jpeg",
      alt: "Overhead view of a laptop showing data visualizations and charts on its screen."
    },
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    gradient: "from-green-500 to-emerald-500",
    stats: ["+68% Traffic", "Top 3 Rankings", "150% ROI"]
  },
  {
    id: "branding",
    title: "Branding & Design",
    problem: "Inconsistent brand identity confuses visitors.",
    solution: "Logos, brand assets, and consistent design systems.",
    outcome: "Stronger recognition, trust, and long-term equity.",
    image: {
      url: "https://images.pexels.com/photos/7598011/pexels-photo-7598011.jpeg",
      alt: "A close-up view of a brand strategy document on a desk surrounded by design artworks."
    },
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
      </svg>
    ),
    gradient: "from-purple-500 to-pink-500",
    stats: ["Brand Identity", "Design Systems", "100% Recognition"]
  },
  {
    id: "maintenance",
    title: "Maintenance & Performance",
    problem: "Sites degrade without monitoring.",
    solution: "SLA, security, updates, and continuous optimization.",
    outcome: "Always online, safe, and fast websites.",
    image: {
      url: "https://images.pexels.com/photos/17489158/pexels-photo-17489158.jpeg",
      alt: "Close-up of a blue screen error shown on a data center control terminal."
    },
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    gradient: "from-orange-500 to-red-500",
    stats: ["99.9% Uptime", "24/7 Monitoring", "Auto Updates"]
  }
];

export default function EnhancedServices() {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = cardRefs.current.indexOf(entry.target as HTMLDivElement);
            if (index !== -1 && !visibleCards.includes(index)) {
              setTimeout(() => {
                setVisibleCards(prev => [...prev, index]);
              }, index * 150);
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    cardRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [visibleCards]);

  // Parallax effect for background elements
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const scrolled = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
        
        sectionRef.current.style.setProperty('--scroll-progress', scrolled.toString());
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      id="services" 
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-slate-900 overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 20% 80%, rgba(20, 184, 166, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(6, 182, 212, 0.1) 0%, transparent 50%),
          linear-gradient(135deg, #0f172a 0%, #1e293b 100%)
        `
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-teal-500/10 to-cyan-500/10 rounded-full blur-3xl transform transition-transform duration-1000"
          style={{
            transform: `translate(${(hoveredCard === 0 || hoveredCard === 1) ? '-20px' : '0'}, ${(hoveredCard === 0 || hoveredCard === 1) ? '-20px' : '0'}) rotate(${hoveredCard !== null ? hoveredCard * 45 : 0}deg)`
          }}
        />
        <div 
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-500/10 to-pink-500/10 rounded-full blur-3xl transform transition-transform duration-1000"
          style={{
            transform: `translate(${(hoveredCard === 2 || hoveredCard === 3) ? '20px' : '0'}, ${(hoveredCard === 2 || hoveredCard === 3) ? '20px' : '0'}) rotate(${hoveredCard !== null ? -hoveredCard * 30 : 0}deg)`
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header with magnetic effect */}
        <div className="text-center mb-16">
          <div className="relative inline-block mb-6">
            <h2 className="text-3xl lg:text-5xl font-bold text-white">
              Our Services
            </h2>
            <div className="absolute -inset-2 bg-gradient-to-r from-teal-400/20 to-cyan-400/20 blur-xl rounded-lg opacity-50" />
          </div>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            From concept to launch and beyond, we provide end-to-end web solutions that drive results.
          </p>
        </div>

        {/* Enhanced Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {services.map((service, index) => (
            <div
              key={service.id}
              ref={el => cardRefs.current[index] = el}
              className={`group relative transition-all duration-700 ease-out ${
                visibleCards.includes(index) 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-20 opacity-0'
              }`}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Card Container */}
              <div className="relative h-full bg-slate-800/30 backdrop-blur-sm border border-slate-700/40 rounded-3xl overflow-hidden transition-all duration-500 group-hover:border-slate-600/60 group-hover:bg-slate-800/50 group-hover:transform group-hover:scale-[1.02] group-hover:shadow-2xl group-hover:shadow-teal-500/10">
                
                {/* Image Section with Parallax */}
                <div className="relative h-48 lg:h-56 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 to-slate-800/80 z-10" />
                  <img
                    src={service.image.url}
                    alt={service.image.alt}
                    className="w-full h-full object-cover transform transition-all duration-700 group-hover:scale-110"
                    loading={index < 2 ? "eager" : "lazy"}
                  />
                  
                  {/* Overlay gradient based on service */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-500`} />
                  
                  {/* Floating icon */}
                  <div className="absolute top-6 right-6 z-20">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${service.gradient} text-white flex items-center justify-center transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 shadow-lg`}>
                      {service.icon}
                    </div>
                  </div>

                  {/* Stats overlay */}
                  <div className="absolute bottom-4 left-4 right-4 z-20">
                    <div className="flex gap-2 flex-wrap">
                      {service.stats.map((stat, statIndex) => (
                        <span
                          key={statIndex}
                          className={`px-3 py-1 bg-black/40 backdrop-blur-sm text-white text-xs font-semibold rounded-full border border-white/20 transform transition-all duration-500 delay-${statIndex * 100} ${
                            visibleCards.includes(index) ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                          }`}
                        >
                          {stat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8">
                  <h3 className="text-2xl lg:text-3xl font-bold text-white mb-6 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-teal-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all duration-500">
                    {service.title}
                  </h3>

                  <div className="space-y-6">
                    {/* Problem */}
                    <div className="relative">
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center mt-1">
                          <div className="w-2 h-2 bg-red-400 rounded-full" />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-red-400 uppercase tracking-wide mb-2">Problem</h4>
                          <p className="text-slate-300 leading-relaxed">{service.problem}</p>
                        </div>
                      </div>
                    </div>

                    {/* Solution */}
                    <div className="relative">
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center mt-1">
                          <div className="w-2 h-2 bg-blue-400 rounded-full" />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-blue-400 uppercase tracking-wide mb-2">Solution</h4>
                          <p className="text-slate-300 leading-relaxed">{service.solution}</p>
                        </div>
                      </div>
                    </div>

                    {/* Outcome */}
                    <div className="relative">
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center mt-1">
                          <div className="w-2 h-2 bg-green-400 rounded-full" />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-green-400 uppercase tracking-wide mb-2">Outcome</h4>
                          <p className="text-slate-300 leading-relaxed">{service.outcome}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced CTA */}
                  <div className="mt-8">
                    <Link
                      to="/method"
                      className="group/cta inline-flex items-center text-teal-400 hover:text-teal-300 font-semibold transition-all duration-300 relative"
                    >
                      <span className="relative z-10">See how we work</span>
                      <svg className="w-5 h-5 ml-2 transform transition-all duration-300 group-hover/cta:translate-x-1 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                      <div className="absolute inset-0 bg-gradient-to-r from-teal-400/10 to-cyan-400/10 rounded-lg scale-0 group-hover/cta:scale-100 transition-transform duration-300 -mx-2 -my-1" />
                    </Link>
                  </div>
                </div>

                {/* Hover glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`} />
                
                {/* Magnetic border effect */}
                <div className="absolute inset-0 rounded-3xl transition-all duration-500 group-hover:shadow-[0_0_50px_rgba(20,184,166,0.15)]" />
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="relative inline-block">
            <Link
              to="/services"
              className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-semibold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-teal-500/25"
            >
              Explore All Services
              <svg className="w-5 h-5 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <div className="absolute -inset-2 bg-gradient-to-r from-teal-400/20 to-cyan-400/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>
      </div>
    </section>
  );
}
