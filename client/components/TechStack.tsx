import { useState } from "react";

type Category = "All" | "CMS" | "Frontend" | "Analytics" | "Automation" | "CRM/Email" | "Hosting/CDN" | "Monitoring";

const integrations = [
  {
    id: "react",
    name: "React",
    category: "Frontend" as const,
    note: "Component model for fast, scalable interfaces.",
    usedCount: 12
  },
  {
    id: "vite",
    name: "Vite", 
    category: "Frontend" as const,
    note: "Lightning-fast dev server and modern builds.",
    usedCount: 10
  },
  {
    id: "wordpress",
    name: "WordPress",
    category: "CMS" as const,
    note: "Ubiquitous CMS with robust editor and plugins.",
    usedCount: 8
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    category: "Frontend" as const,
    note: "Utility-first, consistent design systems.",
    usedCount: 15
  },
  {
    id: "ga4",
    name: "GA4",
    category: "Analytics" as const,
    note: "Event-based analytics with consent mode.",
    usedCount: 14
  },
  {
    id: "matomo",
    name: "Matomo",
    category: "Analytics" as const,
    note: "Privacy-friendly analytics, self-hosted option.",
    usedCount: 6
  },
  {
    id: "zapier",
    name: "Zapier",
    category: "Automation" as const,
    note: "Connect forms to CRMs and workflows.",
    usedCount: 9
  },
  {
    id: "hubspot",
    name: "HubSpot",
    category: "CRM/Email" as const,
    note: "CRM, forms, and lead tracking.",
    usedCount: 7
  },
  {
    id: "vercel",
    name: "Vercel",
    category: "Hosting/CDN" as const,
    note: "Global edge hosting for front-ends.",
    usedCount: 11
  },
  {
    id: "netlify",
    name: "Netlify",
    category: "Hosting/CDN" as const,
    note: "CI/CD for static and hybrid sites.",
    usedCount: 8
  },
  {
    id: "cloudflare",
    name: "Cloudflare",
    category: "Hosting/CDN" as const,
    note: "CDN, security, and analytics.",
    usedCount: 13
  },
  {
    id: "sentry",
    name: "Sentry",
    category: "Monitoring" as const,
    note: "Front-end error monitoring.",
    usedCount: 5
  },
  {
    id: "next",
    name: "Next.js",
    category: "Frontend" as const,
    note: "Hybrid SSR/ISR for SEO and performance.",
    usedCount: 9
  },
  {
    id: "sanity",
    name: "Sanity",
    category: "CMS" as const,
    note: "Structured content, real-time collaboration.",
    usedCount: 4
  },
  {
    id: "mailchimp",
    name: "Mailchimp",
    category: "CRM/Email" as const,
    note: "Email lists, campaigns, and automations.",
    usedCount: 8
  },
  {
    id: "uptimerobot",
    name: "UptimeRobot",
    category: "Monitoring" as const,
    note: "Availability monitoring.",
    usedCount: 12
  }
];

const categories: Category[] = ["All", "CMS", "Frontend", "Analytics", "Automation", "CRM/Email", "Hosting/CDN", "Monitoring"];

export default function TechStack() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");

  const filteredIntegrations = selectedCategory === "All" 
    ? integrations 
    : integrations.filter(item => item.category === selectedCategory);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "CMS": return "border-yellow-400/40 text-yellow-400";
      case "Frontend": return "border-teal-400/40 text-teal-400";
      case "Analytics": return "border-cyan-400/40 text-cyan-400";
      case "Automation": return "border-emerald-400/40 text-emerald-400";
      case "CRM/Email": return "border-purple-400/40 text-purple-400";
      case "Hosting/CDN": return "border-blue-400/40 text-blue-400";
      case "Monitoring": return "border-red-400/40 text-red-400";
      default: return "border-slate-400/40 text-slate-400";
    }
  };

  return (
    <section id="tech-stack" className="py-20 lg:py-32 bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
            Tech Stack & Integrations
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Modern frameworks, CMS, analytics, and automations — integrated with privacy and performance in mind.
          </p>
        </div>

        {/* Filter chips */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? "border-teal-400 bg-teal-400/10 text-teal-400"
                  : "border-slate-600 text-slate-300 hover:border-slate-500 hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 lg:gap-6">
          {filteredIntegrations.map((item) => (
            <div
              key={item.id}
              className="group relative bg-slate-800/30 backdrop-blur-sm border border-slate-700/40 rounded-2xl p-4 text-center hover:border-slate-600/50 transition-all duration-300 hover:transform hover:scale-105"
            >
              {/* Logo placeholder */}
              <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-slate-700/50 flex items-center justify-center">
                <div className="w-6 h-6 bg-slate-500 rounded-md" />
              </div>

              {/* Name */}
              <h3 className="text-white text-sm font-semibold mb-2">
                {item.name}
              </h3>

              {/* Note */}
              <p className="text-slate-400 text-xs leading-tight mb-3 line-clamp-2">
                {item.note}
              </p>

              {/* Usage count */}
              <div className="flex items-center justify-between text-xs">
                <span className={`inline-flex items-center rounded-full border px-2 py-1 ${getCategoryColor(item.category)}`}>
                  {item.category}
                </span>
                <span className="text-slate-500">
                  {item.usedCount} projects
                </span>
              </div>

              {/* Hover effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-teal-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-16 text-center">
          <p className="text-slate-400 text-sm mb-6 max-w-2xl mx-auto">
            Analytics run in compliance with consent. Privacy-friendly options available (Matomo, Plausible). 
            Data processing agreements on request.
          </p>
          <a
            href="/services#integrations"
            className="inline-flex items-center rounded-full border border-slate-600 bg-slate-800/50 hover:bg-slate-700/50 px-6 py-3 text-slate-100 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            See how we integrate tools
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
