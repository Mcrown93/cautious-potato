import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

const teamMembers = [
  {
    id: "sarah-chen",
    name: "Sarah Chen",
    role: "Founder & Creative Director",
    bio: "With over 8 years in digital design and strategy, Sarah leads our creative vision and ensures every project delivers exceptional results. Previously at top agencies in San Francisco.",
    image: "https://images.pexels.com/photos/7988516/pexels-photo-7988516.jpeg",
    skills: ["Design Strategy", "UX/UI Design", "Brand Development", "Team Leadership"],
    social: {
      linkedin: "https://linkedin.com/in/sarahchen",
      twitter: "https://twitter.com/sarahchen"
    },
    favorite: "Creating designs that solve real business problems"
  },
  {
    id: "mike-rodriguez",
    name: "Mike Rodriguez",
    role: "Lead Developer",
    bio: "Full-stack developer with expertise in modern web technologies. Mike ensures our websites are fast, secure, and scalable. Former tech lead at several successful startups.",
    image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg",
    skills: ["React", "Node.js", "Performance Optimization", "DevOps"],
    social: {
      linkedin: "https://linkedin.com/in/mikerodriguez",
      github: "https://github.com/mikerodriguez"
    },
    favorite: "Building lightning-fast web experiences"
  },
  {
    id: "lisa-park",
    name: "Lisa Park",
    role: "SEO & Marketing Strategist",
    bio: "Digital marketing expert with a focus on SEO and conversion optimization. Lisa helps our clients achieve sustainable growth through data-driven strategies.",
    image: "https://images.pexels.com/photos/7988516/pexels-photo-7988516.jpeg",
    skills: ["SEO Strategy", "Content Marketing", "Analytics", "CRO"],
    social: {
      linkedin: "https://linkedin.com/in/lisapark",
      twitter: "https://twitter.com/lisapark"
    },
    favorite: "Turning data into actionable growth strategies"
  },
  {
    id: "david-kim",
    name: "David Kim",
    role: "Brand Strategist",
    bio: "Brand expert who helps businesses develop compelling identities and messaging. David's work has helped numerous companies establish strong market presence.",
    image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg",
    skills: ["Brand Strategy", "Visual Identity", "Messaging", "Market Research"],
    social: {
      linkedin: "https://linkedin.com/in/davidkim",
      behance: "https://behance.net/davidkim"
    },
    favorite: "Crafting brand stories that resonate"
  }
];

const companyValues = [
  {
    title: "Results-Driven",
    description: "Every decision is made with measurable outcomes in mind. We don't just create beautiful designs—we create business value.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    )
  },
  {
    title: "Transparent Process",
    description: "Clear communication, upfront pricing, and no surprises. You'll always know exactly what we're working on and why.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    title: "Continuous Learning",
    description: "The web evolves rapidly, and so do we. We stay ahead of trends and technologies to deliver cutting-edge solutions.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    )
  },
  {
    title: "Client Partnership",
    description: "We don't just work for you—we work with you. Your success is our success, and we're invested in your long-term growth.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )
  }
];

const timeline = [
  {
    year: "2019",
    title: "The Beginning",
    description: "Sarah founded WebStudio with a vision to help businesses succeed through exceptional web experiences."
  },
  {
    year: "2020",
    title: "Team Growth",
    description: "Expanded to include specialized developers and marketing experts to offer comprehensive solutions."
  },
  {
    year: "2021",
    title: "Methodology Refined",
    description: "Developed our signature 7-day delivery process, ensuring fast turnaround without compromising quality."
  },
  {
    year: "2022",
    title: "50+ Projects",
    description: "Reached a major milestone of 50 completed projects with consistently excellent client satisfaction."
  },
  {
    year: "2023",
    title: "Industry Recognition",
    description: "Recognized as a top web development agency, with several projects winning design and performance awards."
  },
  {
    year: "2024",
    title: "Expansion & Innovation",
    description: "Launched advanced services including AI integration and next-generation web technologies."
  }
];

const stats = [
  { value: "50+", label: "Projects Completed" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "5", label: "Team Members" },
  { value: "4", label: "Years Experience" }
];

export default function About() {
  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  const [visibleElements, setVisibleElements] = useState<number[]>([]);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  // Intersection Observer for animations
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
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                About <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">WebStudio</span>
              </h1>
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                We're a passionate team of designers, developers, and strategists dedicated to creating exceptional web experiences that drive real business results.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/portfolio"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-semibold rounded-full transition-all duration-300 transform hover:scale-105"
                >
                  View Our Work
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center px-8 py-4 border border-slate-600 hover:border-slate-500 text-slate-300 hover:text-white font-semibold rounded-full transition-all duration-300"
                >
                  Get in Touch
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden border border-slate-700/40">
                <img
                  src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg"
                  alt="WebStudio team collaborating"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-full blur-2xl" />
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-2xl" />
            </div>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-teal-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-slate-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 lg:py-32 bg-slate-900/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Our Story</h2>
            <p className="text-xl text-slate-300 leading-relaxed">
              Founded in 2019 with a simple mission: help businesses succeed online through exceptional web experiences. 
              What started as a one-person studio has grown into a dedicated team of experts, but our core values remain the same.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-teal-500 to-cyan-500 opacity-30" />
            
            <div className="space-y-12">
              {timeline.map((event, index) => (
                <div
                  key={event.year}
                  ref={el => sectionRefs.current[index] = el}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  } transition-all duration-700 ${
                    visibleElements.includes(index) 
                      ? 'translate-y-0 opacity-100' 
                      : 'translate-y-20 opacity-0'
                  }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                    <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/40 rounded-2xl p-6">
                      <div className="text-2xl font-bold text-teal-400 mb-2">
                        {event.year}
                      </div>
                      <h3 className="text-xl font-semibold mb-3">
                        {event.title}
                      </h3>
                      <p className="text-slate-300 leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full border-4 border-slate-950" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Our Values</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              These principles guide everything we do and ensure we deliver exceptional results for every client.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyValues.map((value, index) => (
              <div
                key={value.title}
                ref={el => sectionRefs.current[timeline.length + index] = el}
                className={`group text-center transition-all duration-700 ${
                  visibleElements.includes(timeline.length + index) 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-20 opacity-0'
                }`}
              >
                <div className="relative mb-6">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center text-slate-950 group-hover:scale-110 transition-transform duration-300">
                    {value.icon}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                <p className="text-slate-300 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 lg:py-32 bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Meet Our Team</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Passionate professionals who bring diverse skills and perspectives to every project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={member.id}
                ref={el => sectionRefs.current[timeline.length + companyValues.length + index] = el}
                className={`group cursor-pointer transition-all duration-700 ${
                  visibleElements.includes(timeline.length + companyValues.length + index) 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-20 opacity-0'
                }`}
                onClick={() => setSelectedMember(selectedMember === member.id ? null : member.id)}
              >
                <div className="relative bg-slate-800/30 backdrop-blur-sm border border-slate-700/40 rounded-2xl overflow-hidden transition-all duration-300 group-hover:border-slate-600/60 group-hover:transform group-hover:scale-105">
                  
                  {/* Image */}
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-teal-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all duration-500">
                      {member.name}
                    </h3>
                    <p className="text-teal-400 font-semibold mb-3">{member.role}</p>
                    <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                      {member.bio}
                    </p>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {member.skills.slice(0, 2).map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-2 py-1 bg-slate-700/50 text-slate-300 text-xs rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                      {member.skills.length > 2 && (
                        <span className="px-2 py-1 bg-slate-700/50 text-slate-400 text-xs rounded-full">
                          +{member.skills.length - 2} more
                        </span>
                      )}
                    </div>

                    {/* Expanded Details */}
                    {selectedMember === member.id && (
                      <div className="mt-4 pt-4 border-t border-slate-700/50">
                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-slate-300 mb-2">All Skills</h4>
                          <div className="flex flex-wrap gap-2">
                            {member.skills.map((skill, skillIndex) => (
                              <span
                                key={skillIndex}
                                className="px-2 py-1 bg-teal-500/20 text-teal-400 text-xs rounded-full border border-teal-500/30"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-slate-300 mb-2">Favorite Thing</h4>
                          <p className="text-slate-400 text-sm italic">"{member.favorite}"</p>
                        </div>

                        {/* Social Links */}
                        <div className="flex space-x-3">
                          {Object.entries(member.social).map(([platform, url]) => (
                            <a
                              key={platform}
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-slate-400 hover:text-teal-400 transition-colors"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <span className="sr-only">{platform}</span>
                              <div className="w-5 h-5 bg-slate-600 rounded" />
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="mt-4 text-center">
                      <button className="text-teal-400 text-sm font-semibold hover:text-teal-300 transition-colors">
                        {selectedMember === member.id ? 'Show Less' : 'Learn More'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-slate-900 to-teal-950/20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Work Together?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Let's discuss how our team can help bring your vision to life and achieve your business goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-semibold rounded-full transition-all duration-300 transform hover:scale-105"
            >
              Start a Conversation
            </Link>
            <Link
              to="/portfolio"
              className="inline-flex items-center px-8 py-4 border border-slate-600 hover:border-slate-500 text-slate-300 hover:text-white font-semibold rounded-full transition-all duration-300"
            >
              See Our Work
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
