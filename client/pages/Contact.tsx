import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useRef, useEffect } from "react";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const contactMethods = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: "Email Us",
    description: "Get in touch via email for detailed discussions",
    contact: "hello@webstudio.com",
    link: "mailto:hello@webstudio.com",
    available: "We reply within 24 hours"
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    title: "Call Us",
    description: "Speak directly with our team",
    contact: "+1 (555) 123-4567",
    link: "tel:+15551234567",
    available: "Mon-Fri 9AM-6PM EST"
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
      </svg>
    ),
    title: "WhatsApp",
    description: "Quick chat for immediate questions",
    contact: "+1 (555) 123-4567",
    link: "https://wa.me/15551234567",
    available: "Usually online 9AM-6PM EST"
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Visit Us",
    description: "Meet us at our office",
    contact: "123 Innovation Street, Tech City, TC 12345",
    link: "https://maps.google.com/?q=123+Innovation+Street+Tech+City",
    available: "By appointment only"
  }
];

const projectTypes = [
  "New Website",
  "Website Redesign", 
  "E-commerce Development",
  "SEO & Marketing",
  "Branding & Design",
  "Maintenance & Support",
  "Custom Development",
  "Consultation"
];

const budgetRanges = [
  "Under $5,000",
  "$5,000 - $10,000", 
  "$10,000 - $25,000",
  "$25,000 - $50,000",
  "$50,000+"
];

const timelines = [
  "ASAP",
  "Within 1 month",
  "1-3 months",
  "3-6 months",
  "6+ months",
  "Just exploring"
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
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
                setVisibleElements((prev) => [...prev, index]);
              }, index * 100);
            }
          }
        });
      },
      { threshold: 0.1 },
    );
    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    return () => observer.disconnect();
  }, [visibleElements]);

  // Define Zod schema for strong validation
  const ContactSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Please enter a valid email address'),
    company: z.string().optional().or(z.literal('')),
    phone: z.string().optional().or(z.literal('')),
    projectType: z.string().optional().or(z.literal('')),
    budget: z.string().optional().or(z.literal('')),
    timeline: z.string().optional().or(z.literal('')),
    message: z.string().min(20, 'Please provide more details (at least 20 characters)'),
    consent: z.boolean().refine((val) => val === true, {
      message: 'Please accept our privacy policy',
    }),
    newsletter: z.boolean().optional(),
    honeypot: z.string().max(0).optional(),
  });

  type ContactFormData = z.infer<typeof ContactSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      phone: '',
      projectType: '',
      budget: '',
      timeline: '',
      message: '',
      consent: false,
      newsletter: false,
      honeypot: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    // Anti‑spam check
    if (data.honeypot) return;
    try {
      // Simulate network latency
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitted(true);
      reset();
    } catch (err) {
      console.error('Form submission error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950/20" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Get <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">In Touch</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
            Ready to start your project? We'd love to hear about your goals and discuss how we can help bring your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contact-form"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-semibold rounded-full transition-all duration-300 transform hover:scale-105"
            >
              Start Your Project
            </a>
            <a
              href="#contact-methods"
              className="inline-flex items-center px-8 py-4 border border-slate-600 hover:border-slate-500 text-slate-300 hover:text-white font-semibold rounded-full transition-all duration-300"
            >
              Contact Options
            </a>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section id="contact-methods" className="py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">How to Reach Us</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Choose the communication method that works best for you. We're here to help!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactMethods.map((method, index) => (
              <div
                key={method.title}
                ref={el => sectionRefs.current[index] = el}
                className={`group transition-all duration-700 ${
                  visibleElements.includes(index) 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-20 opacity-0'
                }`}
              >
                <a
                  href={method.link}
                  target={method.link.startsWith('http') ? '_blank' : undefined}
                  rel={method.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="block h-full bg-slate-800/30 backdrop-blur-sm border border-slate-700/40 rounded-2xl p-8 text-center hover:border-slate-600/60 hover:bg-slate-800/50 transition-all duration-300 group-hover:transform group-hover:scale-105"
                >
                  <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center text-slate-950 group-hover:scale-110 transition-transform duration-300">
                    {method.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-teal-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all duration-500">
                    {method.title}
                  </h3>
                  <p className="text-slate-300 mb-4 leading-relaxed">
                    {method.description}
                  </p>
                  <p className="font-semibold text-teal-400 mb-2">
                    {method.contact}
                  </p>
                  <p className="text-slate-400 text-sm">
                    {method.available}
                  </p>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact-form" className="py-20 lg:py-32 bg-slate-900/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Tell Us About Your Project</h2>
            <p className="text-xl text-slate-300">
              The more details you provide, the better we can understand your needs and provide an accurate quote.
            </p>
          </div>

          <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/40 rounded-3xl p-8 lg:p-12">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4">Thank You!</h3>
                <p className="text-slate-300 mb-6">
                  We've received your message and will get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-semibold rounded-full transition-all duration-300"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" noValidate>
                {/* Honeypot */}
                <div className="sr-only" aria-hidden="true">
                  <input
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    {...register('honeypot')}
                  />
                </div>

                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-200 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      placeholder="John Doe"
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      aria-invalid={errors.name ? 'true' : 'false'}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                      {...register('name')}
                    />
                    {errors.name && (
                      <p id="name-error" className="mt-1 text-sm text-red-400" role="alert">
                        {errors.name.message as string}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-200 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="john@company.com"
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      aria-invalid={errors.email ? 'true' : 'false'}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      {...register('email')}
                    />
                    {errors.email && (
                      <p id="email-error" className="mt-1 text-sm text-red-400" role="alert">
                        {errors.email.message as string}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-slate-200 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      placeholder="Acme Inc."
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      {...register('company')}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-slate-200 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      placeholder="+1 (555) 123-4567"
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      {...register('phone')}
                    />
                  </div>
                </div>
                {/* Project Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label htmlFor="projectType" className="block text-sm font-medium text-slate-200 mb-2">
                      Project Type
                    </label>
                    <select
                      id="projectType"
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      {...register('projectType')}
                    >
                      <option value="">Select a type</option>
                      {projectTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-slate-200 mb-2">
                      Budget Range
                    </label>
                    <select
                      id="budget"
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      {...register('budget')}
                    >
                      <option value="">Select budget</option>
                      {budgetRanges.map((range) => (
                        <option key={range} value={range}>
                          {range}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="timeline" className="block text-sm font-medium text-slate-200 mb-2">
                      Timeline
                    </label>
                    <select
                      id="timeline"
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      {...register('timeline')}
                    >
                      <option value="">Select timeline</option>
                      {timelines.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-200 mb-2">
                    Project Description *
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    placeholder="Tell us about your project goals, target audience, specific requirements, and any challenges you're facing. The more details you provide, the better we can help."
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                    aria-invalid={errors.message ? 'true' : 'false'}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    {...register('message')}
                  />
                  {errors.message && (
                    <p id="message-error" className="mt-1 text-sm text-red-400" role="alert">
                      {errors.message.message as string}
                    </p>
                  )}
                </div>

                {/* Checkboxes */}
                <div className="space-y-4">
                  <label className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      className="mt-1 w-5 h-5 rounded border-slate-600 bg-slate-700 text-teal-500 focus:ring-teal-500 focus:ring-offset-0"
                      {...register('consent')}
                    />
                    <span className="text-sm text-slate-300">
                      I agree to the processing of my personal data in accordance with the{' '}
                      <a href="/privacy" className="text-teal-400 hover:text-teal-300 underline">
                        Privacy Policy
                      </a>
                      . *
                    </span>
                  </label>
                  {errors.consent && (
                    <p className="text-sm text-red-400" role="alert">
                      {errors.consent.message as string}
                    </p>
                  )}
                  <label className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      className="mt-1 w-5 h-5 rounded border-slate-600 bg-slate-700 text-teal-500 focus:ring-teal-500 focus:ring-offset-0"
                      {...register('newsletter')}
                    />
                    <span className="text-sm text-slate-300">
                      I'd like to receive occasional updates about web design trends and tips.
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <div className="text-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-semibold rounded-full transition-all duration-300 transform hover:scale-105"
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-current"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                  <p className="mt-4 text-sm text-slate-400">
                    We typically respond within 24 hours during business days.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 lg:py-32">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Frequently Asked Questions</h2>
            <p className="text-xl text-slate-300">
              Quick answers to common questions about getting started.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">How quickly can you start my project?</h3>
                <p className="text-slate-300 text-sm">
                  We typically begin new projects within 1-2 weeks of contract signing. Rush projects can often be accommodated.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Do you work with clients remotely?</h3>
                <p className="text-slate-300 text-sm">
                  Yes! We work with clients worldwide. Our entire process is designed for seamless remote collaboration.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">What do you need to get started?</h3>
                <p className="text-slate-300 text-sm">
                  Just your project goals, target audience info, and any existing brand assets. We'll guide you through the rest.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">How do you handle project communication?</h3>
                <p className="text-slate-300 text-sm">
                  Regular updates via email, scheduled calls, and a project dashboard where you can track progress in real-time.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">What if I need changes after launch?</h3>
                <p className="text-slate-300 text-sm">
                  All projects include support period. After that, we offer maintenance plans or hourly support as needed.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Do you provide training?</h3>
                <p className="text-slate-300 text-sm">
                  Absolutely! We provide comprehensive training on managing your new website, plus documentation and video guides.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
