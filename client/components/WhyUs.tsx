import { Link } from "react-router-dom";

const benefits = [
  {
    id: "speed",
    title: "Fast delivery",
    pitch: "Launch in 7 days with a validated prototype before code.",
    bullets: ["7-day roadmap", "Prototype day 1–2", "Zero-CLS build"],
    chip: "≤ 7 days",
    link: { label: "See how we work →", href: "/#method" },
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    color: "teal"
  },
  {
    id: "results",
    title: "Measurable results",
    pitch: "KPIs tracked from day one: traffic, CTR, leads, CWV.",
    bullets: ["KPI plan", "GA4/Matomo", "Dashboard export"],
    chip: "100% CWV",
    link: { label: "See case studies →", href: "/portfolio" },
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    color: "cyan"
  },
  {
    id: "sla",
    title: "SLA & security",
    pitch: "Managed updates, backups, monitoring, and response SLAs.",
    bullets: ["99.9% uptime", "Daily backups", "Incident workflow"],
    chip: "99.9% uptime",
    link: { label: "See plans →", href: "/services/maintenance" },
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    color: "yellow"
  },
  {
    id: "a11y",
    title: "Accessible by default",
    pitch: "WCAG AA practices, keyboard nav, visible focus, alt text.",
    bullets: ["A11y checklist", "Axe audits", "Reduced-motion"],
    chip: "AA baseline",
    link: { label: "Our standards →", href: "/#method" },
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
      </svg>
    ),
    color: "emerald"
  },
  {
    id: "pricing",
    title: "Transparent pricing & process",
    pitch: "Modular quote, 3 options, clear scope and revision policy.",
    bullets: ["3 options", "Point model", "Revision policy"],
    chip: "3 plans",
    link: { label: "View pricing →", href: "/pricing" },
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    color: "purple"
  },
  {
    id: "scale",
    title: "Scalable architecture",
    pitch: "Modern stack with CMS + integrations and clean interfaces.",
    bullets: ["CMS ready", "API/CRM", "Staging + CI/CD"],
    chip: "Future-proof",
    link: { label: "See stack →", href: "/#tech-stack" },
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    color: "teal"
  }
];

const getColorClasses = (color: string) => {
  const colors = {
    teal: {
      icon: "text-teal-400 bg-teal-400/10 border-teal-400/20",
      chip: "border-teal-400/30 bg-teal-400/10 text-teal-400",
      accent: "group-hover:border-teal-400/30"
    },
    cyan: {
      icon: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
      chip: "border-cyan-400/30 bg-cyan-400/10 text-cyan-400",
      accent: "group-hover:border-cyan-400/30"
    },
    yellow: {
      icon: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
      chip: "border-yellow-400/30 bg-yellow-400/10 text-yellow-400",
      accent: "group-hover:border-yellow-400/30"
    },
    emerald: {
      icon: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
      chip: "border-emerald-400/30 bg-emerald-400/10 text-emerald-400",
      accent: "group-hover:border-emerald-400/30"
    },
    purple: {
      icon: "text-purple-400 bg-purple-400/10 border-purple-400/20",
      chip: "border-purple-400/30 bg-purple-400/10 text-purple-400",
      accent: "group-hover:border-purple-400/30"
    }
  };
  return colors[color as keyof typeof colors] || colors.teal;
};

export default function WhyUs() {
  return (
    <section id="why-us" className="py-20 lg:py-32 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
            Why choose us
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Speed, measurable results, and a transparent process—built on accessibility and security.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
          {benefits.map((benefit) => {
            const colorClasses = getColorClasses(benefit.color);
            
            return (
              <div
                key={benefit.id}
                className={`group relative bg-slate-800/30 backdrop-blur-sm border border-slate-700/40 rounded-2xl p-6 transition-all duration-300 hover:transform hover:scale-[1.02] ${colorClasses.accent}`}
              >
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl border mb-6 ${colorClasses.icon}`}>
                  {benefit.icon}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-3">
                  {benefit.title}
                </h3>
                
                <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                  {benefit.pitch}
                </p>

                {/* Bullets */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {benefit.bullets.map((bullet, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center rounded-lg border border-slate-600/60 bg-slate-700/30 px-2 py-1 text-slate-200 text-xs"
                    >
                      {bullet}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${colorClasses.chip}`}>
                    {benefit.chip}
                  </span>
                  <Link
                    to={benefit.link.href}
                    className="text-slate-300 hover:text-white text-sm font-medium underline underline-offset-4 transition-colors"
                  >
                    {benefit.link.label}
                  </Link>
                </div>

                {/* Screen reader description */}
                <p className="sr-only">
                  {benefit.title}: {benefit.pitch}. Key points: {benefit.bullets.join(", ")}.
                </p>
              </div>
            );
          })}
        </div>

        {/* Proof badges */}
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          <span className="rounded-full border border-slate-600/50 bg-slate-800/30 px-4 py-2 text-slate-300 text-sm">
            ≤ 7 days launch
          </span>
          <span className="rounded-full border border-slate-600/50 bg-slate-800/30 px-4 py-2 text-slate-300 text-sm">
            100% Core Web Vitals
          </span>
          <span className="rounded-full border border-slate-600/50 bg-slate-800/30 px-4 py-2 text-slate-300 text-sm">
            99.9% uptime
          </span>
          <span className="rounded-full border border-slate-600/50 bg-slate-800/30 px-4 py-2 text-slate-300 text-sm">
            WCAG AA baseline
          </span>
        </div>

        {/* CTAs */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/quote"
            className="inline-flex items-center justify-center rounded-full bg-teal-500 hover:bg-teal-600 px-8 py-3 text-slate-950 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            Request a Quote
          </Link>
          <Link
            to="/#method"
            className="inline-flex items-center justify-center rounded-full border border-slate-600 bg-slate-800/50 hover:bg-slate-700/50 px-8 py-3 text-slate-100 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            See our Method
          </Link>
        </div>
      </div>
    </section>
  );
}
