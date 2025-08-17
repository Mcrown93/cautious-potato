import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

const services = [
  {
    id: "web-development",
    title: "Web Design & Development",
    subtitle: "Modern, Fast, Conversion-Focused Websites",
    description: "We create stunning, high-performance websites that convert visitors into customers. Our development process focuses on user experience, accessibility, and measurable business outcomes.",
    image: "https://images.pexels.com/photos/4974922/pexels-photo-4974922.jpeg",
    features: [
      "Responsive Design",
      "Performance Optimization",
      "SEO-Ready Structure",
      "Accessibility (WCAG AA)",
      "Modern Tech Stack",
      "CMS Integration"
    ],
    process: [
      "Discovery & Planning",
      "Design & Prototyping", 
      "Development & Testing",
      "Launch & Optimization"
    ],
    deliverables: [
      "Responsive Website",
      "Source Code",
      "Documentation",
      "Training Session",
      "3-Month Support"
    ],
    stats: [
      { value: "< 2s", label: "Average Load Time" },
      { value: "99%", label: "Uptime Guarantee" },
      { value: "100%", label: "Mobile Optimized" }
    ],
    caseStudy: {
      title: "SaaS Platform Redesign",
      result: "+42% conversion rate",
      description: "Complete redesign and development of a SaaS landing page resulting in significant conversion improvements."
    }
  },
  {
    id: "seo-sem",
    title: "SEO & Search Marketing",
    subtitle: "Drive Qualified Traffic & Increase Visibility",
    description: "Our comprehensive SEO and SEM strategies help you rank higher, attract more qualified traffic, and achieve measurable ROI from search engines.",
    image: "https://images.pexels.com/photos/577195/pexels-photo-577195.jpeg",
    features: [
      "Technical SEO Audit",
      "Keyword Research",
      "Content Optimization",
      "Link Building",
      "Local SEO",
      "PPC Management"
    ],
    process: [
      "SEO Audit & Analysis",
      "Strategy Development",
      "Implementation & Optimization",
      "Monitoring & Reporting"
    ],
    deliverables: [
      "SEO Strategy",
      "Optimized Content",
      "Technical Improvements",
      "Monthly Reports",
      "Performance Dashboard"
    ],
    stats: [
      { value: "+68%", label: "Average Traffic Increase" },
      { value: "Top 3", label: "Ranking Achievement" },
      { value: "150%", label: "Average ROI" }
    ],
    caseStudy: {
      title: "B2B Lead Generation",
      result: "+47% qualified leads",
      description: "SEO strategy implementation that dramatically increased qualified lead generation for a B2B services company."
    }
  },
  {
    id: "branding-design",
    title: "Branding & Design",
    subtitle: "Cohesive Brand Identity & Visual Systems",
    description: "Build a strong, recognizable brand that resonates with your audience. We create comprehensive brand identities and design systems that work across all touchpoints.",
    image: "https://images.pexels.com/photos/7598011/pexels-photo-7598011.jpeg",
    features: [
      "Brand Strategy",
      "Logo Design",
      "Visual Identity",
      "Design Systems",
      "Brand Guidelines",
      "Marketing Materials"
    ],
    process: [
      "Brand Discovery",
      "Concept Development",
      "Design & Refinement",
      "System Creation"
    ],
    deliverables: [
      "Brand Strategy",
      "Logo & Identity",
      "Brand Guidelines",
      "Design System",
      "Asset Library"
    ],
    stats: [
      { value: "100%", label: "Brand Recognition" },
      { value: "+25%", label: "Brand Equity" },
      { value: "Consistent", label: "Cross-Platform" }
    ],
    caseStudy: {
      title: "Enterprise Rebrand",
      result: "Unified brand system",
      description: "Complete brand overhaul for an enterprise client, creating consistency across all digital and physical touchpoints."
    }
  },
  {
    id: "maintenance-performance",
    title: "Maintenance & Performance",
    subtitle: "Keep Your Website Fast, Secure & Updated",
    description: "Ensure your website stays fast, secure, and up-to-date with our comprehensive maintenance and performance optimization services.",
    image: "https://images.pexels.com/photos/17489158/pexels-photo-17489158.jpeg",
    features: [
      "Performance Monitoring",
      "Security Updates",
      "Backup Management",
      "Uptime Monitoring",
      "Speed Optimization",
      "24/7 Support"
    ],
    process: [
      "Initial Assessment",
      "Setup & Configuration",
      "Ongoing Monitoring",
      "Regular Reporting"
    ],
    deliverables: [
      "Monitoring Setup",
      "Security Configuration",
      "Backup System",
      "Monthly Reports",
      "Performance Dashboard"
    ],
    stats: [
      { value: "99.9%", label: "Uptime Guarantee" },
      { value: "24/7", label: "Monitoring" },
      { value: "< 1hr", label: "Response Time" }
    ],
    caseStudy: {
      title: "E-commerce Optimization",
      result: "99.9% uptime achieved",
      description: "Implemented comprehensive monitoring and optimization for an e-commerce platform, achieving industry-leading uptime."
    }
  }
];

const faqs = [
  {
    question: "How long does a typical project take?",
    answer: "Most projects are completed within our 7-day methodology. Simple websites can be delivered in 3-5 days, while complex applications may take 2-3 weeks. We provide a detailed timeline during the discovery phase."
  },
  {
    question: "Do you provide ongoing support after launch?",
    answer: "Yes, we offer comprehensive maintenance packages including security updates, performance monitoring, backups, and 24/7 support. All our projects include 3 months of complimentary support."
  },
  {
    question: "Can you work with our existing brand guidelines?",
    answer: "Absolutely! We can work within your existing brand guidelines or help you develop new ones. Our team is experienced in maintaining brand consistency across all digital touchpoints."
  },
  {
    question: "What's included in your SEO services?",
    answer: "Our SEO services include technical audits, keyword research, content optimization, link building, local SEO, and monthly reporting. We focus on sustainable, white-hat techniques that deliver long-term results."
  },
  {
    question: "Do you offer custom development solutions?",
    answer: "Yes, we specialize in custom development using modern technologies like React, Next.js, and Node.js. We can build anything from simple websites to complex web applications and integrations."
  }
];

export default function Services() {
  const [activeService, setActiveService] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [visibleElements, setVisibleElements] = useState<number[]>([]);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionRefs.current.indexOf(entry.target as HTMLElement);
            if (index !== -1 && !visibleElements.includes(index)) {
              setTimeout(() => {
                setVisibleElements(prev => [...prev, index]);
              }, index * 100);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [visibleElements]);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950/20" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Our <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">Services</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
            Comprehensive web solutions designed to drive growth, improve performance, and deliver measurable results for your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/quote"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-semibold rounded-full transition-all duration-300 transform hover:scale-105"
            >
              Get Started Today
            </Link>
            <Link
              to="/portfolio"
              className="inline-flex items-center px-8 py-4 border border-slate-600 hover:border-slate-500 text-slate-300 hover:text-white font-semibold rounded-full transition-all duration-300"
            >
              View Our Work
            </Link>
          </div>
        </div>
      </section>

      {/* Services Detail */}
      <section className="py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              ref={el => sectionRefs.current[index] = el}
              className={`mb-32 last:mb-0 transition-all duration-700 ${
                visibleElements.includes(index) 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-20 opacity-0'
              }`}
            >
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}>
                {/* Content */}
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="mb-6">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                      {service.title}
                    </h2>
                    <h3 className="text-xl text-teal-400 font-semibold mb-6">
                      {service.subtitle}
                    </h3>
                    <p className="text-slate-300 text-lg leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold mb-4">Key Features</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-teal-400 rounded-full" />
                          <span className="text-slate-300 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    {service.stats.map((stat, statIndex) => (
                      <div key={statIndex} className="text-center">
                        <div className="text-2xl font-bold text-teal-400 mb-1">
                          {stat.value}
                        </div>
                        <div className="text-slate-400 text-sm">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Case Study Preview */}
                  <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/40 rounded-2xl p-6">
                    <h5 className="font-semibold mb-2">Case Study: {service.caseStudy.title}</h5>
                    <p className="text-teal-400 font-semibold mb-2">{service.caseStudy.result}</p>
                    <p className="text-slate-300 text-sm mb-4">{service.caseStudy.description}</p>
                    <Link 
                      to="/portfolio" 
                      className="text-teal-400 hover:text-teal-300 text-sm font-semibold"
                    >
                      Read Full Case Study →
                    </Link>
                  </div>
                </div>

                {/* Image */}
                <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                  <div className="relative group">
                    <div className="absolute -inset-4 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 blur-xl rounded-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
                    <img
                      src={service.image}
                      alt={`${service.title} service`}
                      className="relative w-full h-64 lg:h-80 object-cover rounded-2xl shadow-xl"
                      loading={index < 2 ? "eager" : "lazy"}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent rounded-2xl" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process Overview */}
      <section className="py-20 lg:py-32 bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Our Process</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              A proven methodology that ensures quality results and timely delivery for every project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {["Discovery", "Strategy", "Execution", "Optimization"].map((step, index) => (
              <div key={step} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center text-slate-950 font-bold text-xl mb-4 mx-auto">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step}</h3>
                <p className="text-slate-300 text-sm">
                  {index === 0 && "Understanding your goals and requirements"}
                  {index === 1 && "Developing the optimal approach"}
                  {index === 2 && "Building and implementing solutions"}
                  {index === 3 && "Monitoring and improving performance"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 lg:py-32">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Frequently Asked Questions</h2>
            <p className="text-xl text-slate-300">
              Get answers to common questions about our services and process.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/40 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-slate-700/20 transition-colors duration-200"
                >
                  <span className="font-semibold">{faq.question}</span>
                  <svg 
                    className={`w-5 h-5 transition-transform duration-200 ${
                      expandedFaq === index ? 'rotate-180' : ''
                    }`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandedFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-slate-300 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-slate-900 to-teal-950/20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Let's discuss your project and create a custom solution that drives results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/quote"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-semibold rounded-full transition-all duration-300 transform hover:scale-105"
            >
              Request a Quote
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 border border-slate-600 hover:border-slate-500 text-slate-300 hover:text-white font-semibold rounded-full transition-all duration-300"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
