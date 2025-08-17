import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Clock,
  Users,
  Target,
  Lightbulb,
  Code,
  Rocket,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface MethodStep {
  day: number;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  duration: string;
  team: string[];
  icon: React.ReactNode;
  color: string;
  gradient: string;
}

const methodSteps: MethodStep[] = [
  {
    day: 1,
    title: "Discovery & Strategy",
    subtitle: "Understanding Your Vision",
    description:
      "We dive deep into your business goals, target audience, and competitive landscape to create a comprehensive project roadmap.",
    deliverables: [
      "Project scope document",
      "Technical requirements analysis",
      "User persona mapping",
      "Competitive analysis report",
      "Initial wireframes",
    ],
    duration: "8 hours",
    team: ["Project Manager", "UX Strategist", "Business Analyst"],
    icon: <Lightbulb className="w-6 h-6" />,
    color: "from-blue-500 to-cyan-500",
    gradient:
      "bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20",
  },
  {
    day: 2,
    title: "Design & Architecture",
    subtitle: "Crafting the Perfect Blueprint",
    description:
      "Our design team creates stunning visual concepts while our architects plan the technical foundation for optimal performance.",
    deliverables: [
      "UI/UX design mockups",
      "Design system guidelines",
      "Technical architecture plan",
      "Database schema design",
      "API endpoint specifications",
    ],
    duration: "10 hours",
    team: ["UI/UX Designer", "System Architect", "Frontend Lead"],
    icon: <Target className="w-6 h-6" />,
    color: "from-purple-500 to-pink-500",
    gradient:
      "bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20",
  },
  {
    day: 3,
    title: "Frontend Development",
    subtitle: "Building Interactive Experiences",
    description:
      "We bring designs to life with modern frameworks, ensuring responsive design and exceptional user experience across all devices.",
    deliverables: [
      "Responsive component library",
      "Interactive user interfaces",
      "Animation and micro-interactions",
      "Cross-browser compatibility",
      "Mobile-first implementation",
    ],
    duration: "12 hours",
    team: ["Frontend Developers", "UI Engineer", "Animation Specialist"],
    icon: <Code className="w-6 h-6" />,
    color: "from-emerald-500 to-teal-500",
    gradient:
      "bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20",
  },
  {
    day: 4,
    title: "Backend Integration",
    subtitle: "Powering Your Application",
    description:
      "Robust backend development with secure APIs, database optimization, and third-party service integrations.",
    deliverables: [
      "RESTful API development",
      "Database implementation",
      "Authentication system",
      "Third-party integrations",
      "Security implementations",
    ],
    duration: "12 hours",
    team: ["Backend Developers", "Database Engineer", "DevOps Specialist"],
    icon: <Users className="w-6 h-6" />,
    color: "from-orange-500 to-red-500",
    gradient:
      "bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20",
  },
  {
    day: 5,
    title: "Testing & Optimization",
    subtitle: "Ensuring Excellence",
    description:
      "Comprehensive testing across all platforms and devices, performance optimization, and security audits.",
    deliverables: [
      "Automated test suites",
      "Performance optimization",
      "Security vulnerability testing",
      "Cross-platform testing",
      "Load testing reports",
    ],
    duration: "10 hours",
    team: ["QA Engineers", "Performance Specialist", "Security Analyst"],
    icon: <CheckCircle className="w-6 h-6" />,
    color: "from-indigo-500 to-blue-500",
    gradient:
      "bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20",
  },
  {
    day: 6,
    title: "Deployment & Setup",
    subtitle: "Going Live",
    description:
      "Seamless deployment to production with monitoring, analytics, and backup systems in place.",
    deliverables: [
      "Production deployment",
      "SSL certificates setup",
      "Analytics integration",
      "Monitoring systems",
      "Backup strategies",
    ],
    duration: "8 hours",
    team: ["DevOps Engineer", "System Administrator", "Monitoring Specialist"],
    icon: <Rocket className="w-6 h-6" />,
    color: "from-violet-500 to-purple-500",
    gradient:
      "bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20",
  },
  {
    day: 7,
    title: "Launch & Handover",
    subtitle: "Your Success Story Begins",
    description:
      "Final review, documentation delivery, team training, and ongoing support setup for a smooth transition.",
    deliverables: [
      "Complete documentation",
      "Team training sessions",
      "Admin panel walkthrough",
      "Support system setup",
      "Success metrics baseline",
    ],
    duration: "6 hours",
    team: ["Project Manager", "Technical Writer", "Support Specialist"],
    icon: <Star className="w-6 h-6" />,
    color: "from-yellow-500 to-orange-500",
    gradient:
      "bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20",
  },
];

const stats = [
  {
    label: "Total Development Time",
    value: "66 hours",
    icon: <Clock className="w-5 h-5" />,
  },
  { label: "Team Members", value: "8-12", icon: <Users className="w-5 h-5" /> },
  { label: "Success Rate", value: "98%", icon: <Target className="w-5 h-5" /> },
  {
    label: "Client Satisfaction",
    value: "4.9/5",
    icon: <Star className="w-5 h-5" />,
  },
];

// Custom hook for intersection observer
function useIntersectionObserver(options = {}) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1, ...options },
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return [ref, isInView] as const;
}

export default function Method() {
  const [activeDay, setActiveDay] = useState<number | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [containerRef, isInView] = useIntersectionObserver({ threshold: 0.1 });

  // Auto-advance timeline
  useEffect(() => {
    if (!isInView) return;

    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % methodSteps.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isInView]);

  // Interactive timeline background
  useEffect(() => {
    const canvas = document.getElementById(
      "method-canvas",
    ) as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
    }[] = [];

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        alpha: Math.random() * 0.3 + 0.1,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.offsetWidth)
          particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.offsetHeight)
          particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 1, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${particle.alpha})`;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-950">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <canvas
          id="method-canvas"
          className="absolute inset-0 w-full h-full opacity-40"
          style={{ pointerEvents: "none" }}
        />

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-6 bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200">
              Proven Methodology
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent mb-6">
              Our 7-Day Method
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
              A revolutionary approach that transforms your ideas into
              production-ready applications in just one week, without
              compromising on quality or innovation.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12"
          >
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 shadow-lg"
              >
                <CardContent className="p-6 text-center">
                  <div className="flex items-center justify-center mb-2 text-teal-400">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-300">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section ref={containerRef} className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Day-by-Day Breakdown
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Each day is carefully planned with specific deliverables,
              dedicated team members, and measurable outcomes to ensure your
              project stays on track.
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Central Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-teal-500/30 to-cyan-500/30 rounded-full hidden md:block" />

            {methodSteps.map((step, index) => (
              <motion.div
                key={step.day}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`relative mb-12 md:mb-20 ${
                  index % 2 === 0 ? "md:pr-1/2" : "md:pl-1/2 md:text-right"
                }`}
                onMouseEnter={() => setActiveDay(step.day)}
                onMouseLeave={() => setActiveDay(null)}
              >
                {/* Timeline Node */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full bg-slate-800 border-4 border-teal-500 flex items-center justify-center z-10 hidden md:flex">
                  <div
                    className={`transition-all duration-300 ${
                      currentStep === index
                        ? "scale-110 text-teal-400"
                        : "scale-100 text-slate-400"
                    }`}
                  >
                    {step.icon}
                  </div>
                </div>

                {/* Content Card */}
                <Card
                  className={`bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-500 ${
                    activeDay === step.day ? "scale-105" : ""
                  } ${index % 2 === 0 ? "md:mr-8" : "md:ml-8"}`}
                >
                  <CardContent className="p-8">
                    <div
                      className={`flex items-center mb-4 ${index % 2 === 0 ? "" : "md:justify-end"}`}
                    >
                      <Badge
                        className={`bg-gradient-to-r ${step.color} text-white border-0 mr-3`}
                      >
                        Day {step.day}
                      </Badge>
                      <span className="text-sm text-slate-300">
                        {step.duration}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-lg text-teal-400 mb-4">
                      {step.subtitle}
                    </p>
                    <p className="text-slate-300 mb-6">{step.description}</p>

                    {/* Deliverables */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-white mb-3">
                        Key Deliverables:
                      </h4>
                      <ul className="space-y-2">
                        {step.deliverables.map((deliverable, idx) => (
                          <li
                            key={idx}
                            className="flex items-center text-slate-300"
                          >
                            <CheckCircle className="w-4 h-4 text-teal-500 mr-2 flex-shrink-0" />
                            {deliverable}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Team */}
                    <div>
                      <h4 className="font-semibold text-white mb-3">
                        Team Members:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {step.team.map((member, idx) => (
                          <Badge
                            key={idx}
                            variant="secondary"
                            className="bg-slate-700/50 text-slate-200"
                          >
                            {member}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-teal-600 to-cyan-600">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Why Our Method Works
            </h2>
            <p className="text-xl text-teal-100 max-w-3xl mx-auto mb-12">
              Our proven methodology combines agile development with creative
              excellence, delivering exceptional results in record time.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {[
                {
                  title: "Structured Approach",
                  description:
                    "Every day has clear objectives and deliverables, ensuring steady progress and transparency.",
                  icon: <Target className="w-8 h-8" />,
                },
                {
                  title: "Expert Team",
                  description:
                    "Specialized professionals work in parallel, maximizing efficiency and maintaining quality.",
                  icon: <Users className="w-8 h-8" />,
                },
                {
                  title: "Rapid Delivery",
                  description:
                    "Complete projects in 7 days without compromising on quality or attention to detail.",
                  icon: <Rocket className="w-8 h-8" />,
                },
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-teal-100">{benefit.description}</p>
                </motion.div>
              ))}
            </div>

            <Button
              size="lg"
              className="bg-white text-teal-600 hover:bg-teal-50 font-semibold px-8 py-4 text-lg"
            >
              Start Your 7-Day Journey
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
