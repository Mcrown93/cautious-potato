import { Link } from "react-router-dom";

const services = [
  {
    id: "webdev",
    title: "Web Design & Development",
    problem: "Outdated websites fail to convert.",
    solution: "Responsive, accessible, fast websites tailored to your brand.",
    outcome: "More leads, better user experience, higher trust.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    id: "seo",
    title: "SEO/SEM",
    problem: "Without visibility, a great site goes unnoticed.",
    solution: "On-page, off-page, and technical SEO + paid campaigns.",
    outcome: "Higher rankings, more qualified traffic, measurable ROI.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    gradient: "from-green-500 to-emerald-500"
  },
  {
    id: "branding",
    title: "Branding & Design",
    problem: "Inconsistent brand identity confuses visitors.",
    solution: "Logos, brand assets, and consistent design systems.",
    outcome: "Stronger recognition, trust, and long-term equity.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
      </svg>
    ),
    gradient: "from-purple-500 to-pink-500"
  },
  {
    id: "maintenance",
    title: "Maintenance & Performance",
    problem: "Sites degrade without monitoring.",
    solution: "SLA, security, updates, and continuous optimization.",
    outcome: "Always online, safe, and fast websites.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    gradient: "from-orange-500 to-red-500"
  }
];

export default function Services() {
  return (
    <section id="services" className="py-20 lg:py-32 bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
            Our Services
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            From concept to launch and beyond, we provide end-to-end web solutions that drive results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="group relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 hover:border-slate-600/50 transition-all duration-300 hover:transform hover:scale-[1.02]"
            >
              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-r ${service.gradient} text-white mb-6`}>
                {service.icon}
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-white mb-4">
                {service.title}
              </h3>

              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="text-sm font-semibold text-red-400 uppercase tracking-wide mb-2">Problem</h4>
                  <p className="text-slate-300">{service.problem}</p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-blue-400 uppercase tracking-wide mb-2">Solution</h4>
                  <p className="text-slate-300">{service.solution}</p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-green-400 uppercase tracking-wide mb-2">Outcome</h4>
                  <p className="text-slate-300">{service.outcome}</p>
                </div>
              </div>

              {/* CTA */}
              <Link
                to="/method"
                className="inline-flex items-center text-teal-400 hover:text-teal-300 font-semibold group-hover:translate-x-1 transition-all duration-200"
              >
                See how we work
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>

              {/* Hover effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
