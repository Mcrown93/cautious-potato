const methodSteps = [
  {
    step: "Step 1",
    title: "Discovery",
    duration: "Day 0–1",
    description: "Define goals, target audience, competitors, technical audit.",
    deliverable: "7-day roadmap + feasibility check",
    icon: "📦"
  },
  {
    step: "Step 2", 
    title: "Strategy",
    duration: "Day 1",
    description: "Funnels, channels, KPIs, roadmap.",
    deliverable: "modular cost proposal (Essential · Recommended · Advanced)",
    icon: "📦"
  },
  {
    step: "Step 3",
    title: "UX/UI",
    duration: "Day 1–2", 
    description: "Wireframes, prototypes, content planning.",
    deliverable: "interactive mockup (mobile + desktop flows)",
    icon: "📦"
  },
  {
    step: "Step 4",
    title: "Development",
    duration: "Day 2–5",
    description: "Front-end, CMS, integrations, QA.",
    deliverable: "working build with test data",
    icon: "📦"
  },
  {
    step: "Step 5", 
    title: "Launch",
    duration: "Day 6–7",
    description: "SEO setup, analytics, security, final QA.",
    deliverable: "live website + source code + handover session",
    icon: "📦"
  },
  {
    step: "Step 6",
    title: "Growth",
    duration: "Post-Launch",
    description: "A/B tests, content strategy, ads, CRO.",
    deliverable: "optimization plan or full management package",
    icon: "📦"
  }
];

export default function Method() {
  return (
    <section id="method" className="py-20 lg:py-32 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
            Our 7-Day Method
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            A proven workflow that delivers results fast. From discovery to launch in just one week.
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-teal-500 via-cyan-500 to-teal-500 opacity-20"></div>

          <div className="space-y-16">
            {methodSteps.map((step, index) => (
              <div
                key={index}
                className={`flex flex-col lg:flex-row items-center gap-8 ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className="flex-1 max-w-lg">
                  <div className={`text-center lg:text-${index % 2 === 0 ? 'right' : 'left'}`}>
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-teal-500 text-slate-950 font-bold text-lg mb-4">
                      {index + 1}
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-teal-400 font-semibold mb-4">
                      {step.duration}
                    </p>
                    <p className="text-slate-300 mb-4 leading-relaxed">
                      {step.description}
                    </p>
                    <div className="inline-flex items-center space-x-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-full px-4 py-2">
                      <span className="text-lg">{step.icon}</span>
                      <span className="text-sm text-slate-300 font-medium">
                        Deliverable: {step.deliverable}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Visual element */}
                <div className="flex-1 max-w-lg">
                  <div className="relative">
                    <div className="aspect-video bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 rounded-2xl overflow-hidden">
                      {/* Mockup content based on step */}
                      <div className="h-full flex items-center justify-center">
                        {index === 0 && (
                          <div className="text-center p-8">
                            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                              </svg>
                            </div>
                            <p className="text-slate-400 text-sm">Discovery & Planning</p>
                          </div>
                        )}
                        {index === 1 && (
                          <div className="text-center p-8">
                            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                              </svg>
                            </div>
                            <p className="text-slate-400 text-sm">Strategic Planning</p>
                          </div>
                        )}
                        {index === 2 && (
                          <div className="text-center p-8">
                            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                              </svg>
                            </div>
                            <p className="text-slate-400 text-sm">UX/UI Design</p>
                          </div>
                        )}
                        {index === 3 && (
                          <div className="text-center p-8">
                            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                              </svg>
                            </div>
                            <p className="text-slate-400 text-sm">Development</p>
                          </div>
                        )}
                        {index === 4 && (
                          <div className="text-center p-8">
                            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center">
                              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                              </svg>
                            </div>
                            <p className="text-slate-400 text-sm">Launch</p>
                          </div>
                        )}
                        {index === 5 && (
                          <div className="text-center p-8">
                            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                              </svg>
                            </div>
                            <p className="text-slate-400 text-sm">Growth & Optimization</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
