import { Link } from "react-router-dom";

const kpis = [
  {
    value: "+47%",
    label: "qualified leads",
    qualifier: "3-month window",
    color: "text-emerald-400"
  },
  {
    value: "-1.2s",
    label: "faster load time",
    qualifier: "post-launch",
    color: "text-teal-400"
  },
  {
    value: "100%",
    label: "Core Web Vitals",
    qualifier: "top 5 pages",
    color: "text-cyan-400"
  },
  {
    value: "+68%",
    label: "organic traffic",
    qualifier: "SEO + content",
    color: "text-blue-400"
  },
  {
    value: "92%",
    label: "client retention",
    qualifier: "yearly average",
    color: "text-purple-400"
  }
];

export default function KPIStrip() {
  return (
    <section className="py-16 lg:py-24 bg-slate-950 border-y border-slate-800/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
            Results at a glance
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Real outcomes from recent projects. Every metric is measured and verified.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8">
          {kpis.map((kpi, index) => (
            <div
              key={index}
              className="group relative bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 text-center hover:border-slate-600/50 transition-all duration-300 hover:transform hover:scale-105"
            >
              {/* Icon placeholder */}
              <div className="w-10 h-10 mx-auto mb-4 rounded-full bg-slate-700/50 flex items-center justify-center">
                <div className={`w-2 h-2 rounded-full ${kpi.color.replace('text-', 'bg-')}`} />
              </div>

              {/* Value */}
              <div className={`text-3xl lg:text-4xl font-bold ${kpi.color} mb-2`}>
                {kpi.value}
              </div>

              {/* Label */}
              <div className="text-slate-300 font-medium mb-1">
                {kpi.label}
              </div>

              {/* Qualifier */}
              {kpi.qualifier && (
                <div className="text-slate-400 text-sm">
                  {kpi.qualifier}
                </div>
              )}

              {/* Hover effect */}
              <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${kpi.color.replace('text-', 'bg-')}`} />
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/portfolio"
            className="inline-flex items-center rounded-full border border-slate-600 bg-slate-800/50 hover:bg-slate-700/50 px-6 py-3 text-slate-100 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            See case studies
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
