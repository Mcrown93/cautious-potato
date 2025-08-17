import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";

const projectTypes = [
  {
    id: "new-website",
    name: "New Website",
    description: "Complete website from scratch",
    basePrice: 4999,
    features: ["Custom Design", "Responsive Development", "SEO Setup", "3 Months Support"]
  },
  {
    id: "redesign",
    name: "Website Redesign",
    description: "Refresh your existing website",
    basePrice: 3999,
    features: ["New Design", "Modern Technology", "Performance Optimization", "Migration"]
  },
  {
    id: "ecommerce",
    name: "E-commerce",
    description: "Online store with payment processing",
    basePrice: 7999,
    features: ["Product Catalog", "Payment Integration", "Inventory Management", "Order System"]
  },
  {
    id: "custom",
    name: "Custom Development",
    description: "Specialized functionality and integrations",
    basePrice: 9999,
    features: ["Custom Features", "API Integrations", "Advanced Functionality", "Scalable Architecture"]
  }
];

const additionalServices = [
  { id: "branding", name: "Branding & Logo Design", price: 1999 },
  { id: "copywriting", name: "Professional Copywriting", price: 799 },
  { id: "photography", name: "Professional Photography", price: 1299 },
  { id: "seo-advanced", name: "Advanced SEO Package", price: 1499 },
  { id: "social-media", name: "Social Media Integration", price: 599 },
  { id: "analytics", name: "Advanced Analytics Setup", price: 399 },
  { id: "training", name: "Extended Training Sessions", price: 499 },
  { id: "maintenance", name: "12-Month Maintenance Plan", price: 2999 }
];

const timelineOptions = [
  "ASAP (Rush - +25% fee)",
  "1-2 weeks",
  "2-4 weeks", 
  "1-2 months",
  "2-3 months",
  "3+ months",
  "Flexible"
];

export default function Quote() {
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Contact Info
    name: "",
    email: "",
    company: "",
    phone: "",
    
    // Project Details
    projectType: "",
    projectDescription: "",
    targetAudience: "",
    currentWebsite: "",
    goals: "",
    timeline: "",
    budget: "",
    
    // Features
    pageCount: "5",
    features: [] as string[],
    additionalServices: [] as string[],
    
    // Legal
    consent: false,
    newsletter: false,
    
    // Anti-spam
    honeypot: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [estimatedPrice, setEstimatedPrice] = useState(0);

  // Initialize from location state if coming from pricing page
  useEffect(() => {
    if (location.state) {
      const { selectedTier, selectedAddOns, customOptions, totalPrice } = location.state;
      if (selectedTier) {
        setFormData(prev => ({
          ...prev,
          projectType: selectedTier,
          pageCount: customOptions?.pages?.toString() || "5",
          additionalServices: selectedAddOns || []
        }));
        setEstimatedPrice(totalPrice || 0);
      }
    }
  }, [location.state]);

  // Calculate estimated price
  useEffect(() => {
    const selectedProject = projectTypes.find(p => p.id === formData.projectType);
    let total = selectedProject ? selectedProject.basePrice : 0;
    
    // Add additional services
    formData.additionalServices.forEach(serviceId => {
      const service = additionalServices.find(s => s.id === serviceId);
      if (service) total += service.price;
    });
    
    // Add page count multiplier (if more than base 5 pages)
    const extraPages = Math.max(0, parseInt(formData.pageCount) - 5);
    total += extraPages * 299;
    
    // Add rush fee if ASAP
    if (formData.timeline.includes("ASAP")) {
      total *= 1.25;
    }
    
    setEstimatedPrice(total);
  }, [formData.projectType, formData.additionalServices, formData.pageCount, formData.timeline]);

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};
    
    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = "Name is required";
      if (!formData.email.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) {
        newErrors.email = "Valid email is required";
      }
    }
    
    if (step === 2) {
      if (!formData.projectType) newErrors.projectType = "Please select a project type";
      if (!formData.projectDescription.trim() || formData.projectDescription.length < 50) {
        newErrors.projectDescription = "Please provide more details (at least 50 characters)";
      }
    }
    
    if (step === 4) {
      if (!formData.consent) newErrors.consent = "Please accept our privacy policy";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const toggleService = (serviceId: string) => {
    setFormData(prev => ({
      ...prev,
      additionalServices: prev.additionalServices.includes(serviceId)
        ? prev.additionalServices.filter(id => id !== serviceId)
        : [...prev.additionalServices, serviceId]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(4)) return;
    if (formData.honeypot) return; // Anti-spam
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitted(true);
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { number: 1, title: "Contact Info", description: "Tell us about yourself" },
    { number: 2, title: "Project Details", description: "Describe your project" },
    { number: 3, title: "Features & Services", description: "What do you need?" },
    { number: 4, title: "Review & Submit", description: "Final details" }
  ];

  const selectedProject = projectTypes.find(p => p.id === formData.projectType);

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-950 text-white">
        <Header />
        <div className="pt-24 pb-16 lg:pt-32 lg:pb-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <div className="py-20">
              <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">Quote Request Submitted!</h1>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                Thank you for your detailed information. We'll review your requirements and send you a personalized quote within 24 hours.
              </p>
              <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/40 rounded-2xl p-8 max-w-2xl mx-auto mb-8">
                <h3 className="text-lg font-semibold mb-4">What happens next?</h3>
                <div className="space-y-3 text-left">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-teal-400 rounded-full" />
                    <span className="text-slate-300">We'll review your requirements (within 2 hours)</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-teal-400 rounded-full" />
                    <span className="text-slate-300">Prepare a detailed proposal with timeline</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-teal-400 rounded-full" />
                    <span className="text-slate-300">Send personalized quote (within 24 hours)</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-teal-400 rounded-full" />
                    <span className="text-slate-300">Schedule a call to discuss details</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-slate-400">
                  Estimated project value: <span className="text-2xl font-bold text-teal-400">${estimatedPrice.toLocaleString()}</span>
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/"
                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-semibold rounded-full transition-all duration-300 transform hover:scale-105"
                  >
                    Back to Homepage
                  </a>
                  <a
                    href="/portfolio"
                    className="inline-flex items-center px-8 py-4 border border-slate-600 hover:border-slate-500 text-slate-300 hover:text-white font-semibold rounded-full transition-all duration-300"
                  >
                    View Our Work
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header />
      
      {/* Hero */}
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950/20" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Request Your <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">Quote</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
            Get a personalized quote tailored to your specific needs. Our detailed form helps us understand your project better.
          </p>
          
          {/* Progress Steps */}
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                    step.number <= currentStep 
                      ? 'border-teal-500 bg-teal-500 text-slate-950' 
                      : 'border-slate-600 text-slate-400'
                  }`}>
                    {step.number < currentStep ? (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      step.number
                    )}
                  </div>
                  <div className="ml-3 hidden md:block">
                    <div className={`text-sm font-semibold ${step.number <= currentStep ? 'text-white' : 'text-slate-400'}`}>
                      {step.title}
                    </div>
                    <div className="text-xs text-slate-500">{step.description}</div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-12 h-0.5 mx-4 transition-colors duration-300 ${
                      step.number < currentStep ? 'bg-teal-500' : 'bg-slate-700'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-20 lg:py-32">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/40 rounded-3xl p-8 lg:p-12">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Honeypot */}
              <div className="sr-only" aria-hidden="true">
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Step 1: Contact Info */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold mb-2">Contact Information</h2>
                    <p className="text-slate-400">Let us know how to reach you</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-slate-200 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="John Doe"
                      />
                      {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-slate-200 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="john@company.com"
                      />
                      {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
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
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="Acme Inc."
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-slate-200 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Project Details */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold mb-2">Project Details</h2>
                    <p className="text-slate-400">Tell us about your project</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-200 mb-4">
                      Project Type *
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {projectTypes.map((type) => (
                        <div
                          key={type.id}
                          className={`cursor-pointer p-4 border-2 rounded-xl transition-all duration-300 ${
                            formData.projectType === type.id
                              ? 'border-teal-500 bg-teal-500/10'
                              : 'border-slate-600 hover:border-slate-500'
                          }`}
                          onClick={() => setFormData(prev => ({ ...prev, projectType: type.id }))}
                        >
                          <h3 className="font-semibold mb-2">{type.name}</h3>
                          <p className="text-sm text-slate-400 mb-3">{type.description}</p>
                          <p className="text-teal-400 font-semibold">${type.basePrice.toLocaleString()} starting</p>
                        </div>
                      ))}
                    </div>
                    {errors.projectType && <p className="mt-2 text-sm text-red-400">{errors.projectType}</p>}
                  </div>

                  <div>
                    <label htmlFor="projectDescription" className="block text-sm font-medium text-slate-200 mb-2">
                      Project Description *
                    </label>
                    <textarea
                      id="projectDescription"
                      name="projectDescription"
                      required
                      rows={6}
                      value={formData.projectDescription}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                      placeholder="Describe your project goals, target audience, key features needed, and any specific requirements..."
                    />
                    {errors.projectDescription && <p className="mt-1 text-sm text-red-400">{errors.projectDescription}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="timeline" className="block text-sm font-medium text-slate-200 mb-2">
                        Preferred Timeline
                      </label>
                      <select
                        id="timeline"
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      >
                        <option value="">Select timeline</option>
                        {timelineOptions.map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="budget" className="block text-sm font-medium text-slate-200 mb-2">
                        Budget Range
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      >
                        <option value="">Select budget</option>
                        <option value="under-5k">Under $5,000</option>
                        <option value="5k-10k">$5,000 - $10,000</option>
                        <option value="10k-25k">$10,000 - $25,000</option>
                        <option value="25k-50k">$25,000 - $50,000</option>
                        <option value="50k-plus">$50,000+</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Features & Services */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold mb-2">Features & Additional Services</h2>
                    <p className="text-slate-400">Customize your package</p>
                  </div>

                  {selectedProject && (
                    <div className="bg-slate-700/30 rounded-xl p-6 mb-6">
                      <h3 className="text-lg font-semibold mb-4">Selected: {selectedProject.name}</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {selectedProject.features.map((feature, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-teal-400 rounded-full" />
                            <span className="text-sm text-slate-300">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <label htmlFor="pageCount" className="block text-sm font-medium text-slate-200 mb-2">
                      Estimated Number of Pages
                    </label>
                    <input
                      type="number"
                      id="pageCount"
                      name="pageCount"
                      min="1"
                      max="100"
                      value={formData.pageCount}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                    <p className="mt-1 text-sm text-slate-400">
                      Extra pages beyond 5: ${((parseInt(formData.pageCount) - 5) * 299).toLocaleString()} (+$299 per page)
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-200 mb-4">
                      Additional Services
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {additionalServices.map((service) => (
                        <div
                          key={service.id}
                          className={`cursor-pointer p-4 border rounded-xl transition-all duration-300 ${
                            formData.additionalServices.includes(service.id)
                              ? 'border-teal-500 bg-teal-500/10'
                              : 'border-slate-600 hover:border-slate-500'
                          }`}
                          onClick={() => toggleService(service.id)}
                        >
                          <div className="flex justify-between items-center">
                            <h4 className="font-semibold">{service.name}</h4>
                            <span className="text-teal-400 font-semibold">${service.price.toLocaleString()}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Review & Submit */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold mb-2">Review Your Request</h2>
                    <p className="text-slate-400">Confirm your details and submit</p>
                  </div>

                  {/* Quote Summary */}
                  <div className="bg-slate-700/30 rounded-xl p-6">
                    <h3 className="text-xl font-semibold mb-6">Quote Summary</h3>
                    
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between">
                        <span>{selectedProject?.name} Package</span>
                        <span>${selectedProject?.basePrice.toLocaleString()}</span>
                      </div>
                      
                      {parseInt(formData.pageCount) > 5 && (
                        <div className="flex justify-between text-sm">
                          <span>Extra Pages ({parseInt(formData.pageCount) - 5})</span>
                          <span>${((parseInt(formData.pageCount) - 5) * 299).toLocaleString()}</span>
                        </div>
                      )}
                      
                      {formData.additionalServices.map(serviceId => {
                        const service = additionalServices.find(s => s.id === serviceId);
                        return service ? (
                          <div key={serviceId} className="flex justify-between text-sm">
                            <span>{service.name}</span>
                            <span>${service.price.toLocaleString()}</span>
                          </div>
                        ) : null;
                      })}
                      
                      {formData.timeline.includes("ASAP") && (
                        <div className="flex justify-between text-sm text-orange-400">
                          <span>Rush Fee (25%)</span>
                          <span>+${Math.round(estimatedPrice * 0.2).toLocaleString()}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="border-t border-slate-600 pt-4">
                      <div className="flex justify-between items-center text-xl font-semibold">
                        <span>Estimated Total</span>
                        <span className="text-teal-400">${estimatedPrice.toLocaleString()}</span>
                      </div>
                      <p className="text-sm text-slate-400 mt-2">
                        *Final price may vary based on specific requirements
                      </p>
                    </div>
                  </div>

                  {/* Consent */}
                  <div className="space-y-4">
                    <label className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        name="consent"
                        checked={formData.consent}
                        onChange={handleChange}
                        className="mt-1 w-5 h-5 rounded border-slate-600 bg-slate-700 text-teal-500 focus:ring-teal-500 focus:ring-offset-0"
                      />
                      <span className="text-sm text-slate-300">
                        I agree to the processing of my personal data and accept the{" "}
                        <a href="/privacy" className="text-teal-400 hover:text-teal-300 underline">
                          Privacy Policy
                        </a>
                        . *
                      </span>
                    </label>
                    {errors.consent && <p className="text-sm text-red-400">{errors.consent}</p>}

                    <label className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        name="newsletter"
                        checked={formData.newsletter}
                        onChange={handleChange}
                        className="mt-1 w-5 h-5 rounded border-slate-600 bg-slate-700 text-teal-500 focus:ring-teal-500 focus:ring-offset-0"
                      />
                      <span className="text-sm text-slate-300">
                        Subscribe to our newsletter for web design tips and updates.
                      </span>
                    </label>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-8">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="inline-flex items-center px-6 py-3 border border-slate-600 hover:border-slate-500 text-slate-300 hover:text-white font-semibold rounded-full transition-all duration-300"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Previous
                  </button>
                )}

                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="ml-auto inline-flex items-center px-8 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-semibold rounded-full transition-all duration-300"
                  >
                    Next Step
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting || !formData.consent}
                    className="ml-auto inline-flex items-center px-8 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-semibold rounded-full transition-all duration-300"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      "Submit Quote Request"
                    )}
                  </button>
                )}
              </div>

              {/* Estimated Price Display */}
              {estimatedPrice > 0 && currentStep >= 3 && (
                <div className="fixed bottom-8 right-8 bg-slate-800 border border-slate-700 rounded-xl p-4 shadow-lg">
                  <div className="text-center">
                    <div className="text-sm text-slate-400">Estimated Total</div>
                    <div className="text-xl font-bold text-teal-400">${estimatedPrice.toLocaleString()}</div>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
