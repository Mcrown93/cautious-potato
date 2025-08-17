import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function FinalCTA() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    consent: false,
    company: "" // honeypot
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Enter your name.";
    }

    if (!formData.email.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email.";
    }

    if (formData.message.trim().length < 20) {
      newErrors.message = "Add some details (≥ 20 characters).";
    }

    if (!formData.consent) {
      newErrors.consent = "Consent is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    // Anti-spam: honeypot check
    if (formData.company) return;

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        message: "",
        consent: false,
        company: ""
      });
      setErrors({});
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <section id="contact-cta" aria-labelledby="final-cta-title" className="py-16 lg:py-24 bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Content */}
          <header className="lg:py-8">
            <h3 id="final-cta-title" className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Ready to start? Tell us about your project.
            </h3>
            <p className="text-xl text-slate-300 mb-8">
              Get a modular quote and a 7-day roadmap — no obligation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button
                size="lg"
                asChild
                className="bg-teal-500 hover:bg-teal-600 text-slate-950 px-8 py-3 text-lg font-semibold rounded-full"
              >
                <a href="/quote">Request a Quote</a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-slate-300 text-slate-300 hover:bg-slate-300 hover:text-slate-950 px-8 py-3 text-lg font-semibold rounded-full"
              >
                <a href="https://wa.me/XXXXXXXXXXX" rel="noopener" target="_blank">
                  Chat on WhatsApp
                </a>
              </Button>
            </div>

            <div className="space-y-4 text-slate-400">
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Fast delivery: launch in just 7 days</span>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span>Measurable results (traffic, leads, conversions)</span>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>SLA & security monitoring</span>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <span>Mobile-first, accessible by default</span>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <span>Transparent pricing & process</span>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <span>Scalable architecture, future-proof</span>
              </div>
            </div>
          </header>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-slate-700/40 bg-white/5 p-6 lg:p-8 shadow-xl backdrop-blur-sm"
            noValidate
          >
            {/* Honeypot */}
            <div className="sr-only" aria-hidden="true">
              <label htmlFor="company">Company</label>
              <input
                id="company"
                name="company"
                type="text"
                autoComplete="organization"
                value={formData.company}
                onChange={handleChange}
                tabIndex={-1}
              />
            </div>

            <div className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-200 mb-2">
                  Name *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-600 bg-slate-800/50 px-4 py-3 text-white placeholder-slate-400 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                  aria-invalid={errors.name ? "true" : "false"}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && (
                  <p id="name-error" className="mt-1 text-sm text-red-400">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-200 mb-2">
                  Email *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  inputMode="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-600 bg-slate-800/50 px-4 py-3 text-white placeholder-slate-400 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                  aria-invalid={errors.email ? "true" : "false"}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="mt-1 text-sm text-red-400">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-200 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  minLength={20}
                  placeholder="What are your goals, pages, timeline?"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-600 bg-slate-800/50 px-4 py-3 text-white placeholder-slate-400 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 resize-none"
                  aria-invalid={errors.message ? "true" : "false"}
                  aria-describedby={errors.message ? "message-error" : undefined}
                />
                {errors.message && (
                  <p id="message-error" className="mt-1 text-sm text-red-400">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Consent */}
              <div className="flex items-start space-x-3">
                <input
                  id="consent"
                  name="consent"
                  type="checkbox"
                  required
                  checked={formData.consent}
                  onChange={handleChange}
                  className="mt-1 h-4 w-4 rounded border-slate-600 bg-slate-800 text-teal-500 focus:ring-2 focus:ring-cyan-500/50 focus:ring-offset-0"
                  aria-invalid={errors.consent ? "true" : "false"}
                  aria-describedby={errors.consent ? "consent-error" : undefined}
                />
                <label htmlFor="consent" className="text-sm text-slate-300">
                  I agree to the processing of my data as described in the{" "}
                  <a href="/privacy" className="text-teal-400 underline underline-offset-2 hover:text-teal-300">
                    Privacy Policy
                  </a>
                  .
                </label>
              </div>
              {errors.consent && (
                <p id="consent-error" className="text-sm text-red-400">
                  {errors.consent}
                </p>
              )}

              {/* Submit */}
              <div className="space-y-4">
                <Button
                  type="submit"
                  disabled={isSubmitting || !formData.consent}
                  className="w-full bg-teal-500 hover:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-semibold py-3 rounded-lg"
                >
                  {isSubmitting ? "Sending..." : "Send Request"}
                </Button>
                <p className="text-center text-sm text-slate-400">
                  We reply within 1 business day.
                </p>
              </div>

              {/* Success message */}
              {submitted && (
                <div
                  role="status"
                  className="rounded-lg bg-emerald-500/10 border border-emerald-500/30 p-4 text-emerald-400 text-center"
                >
                  Thanks! Your request has been received.
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
