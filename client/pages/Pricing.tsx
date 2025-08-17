import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

const pricingTiers = [
  {
    id: "essential",
    name: "Essential",
    description: "Perfect for small businesses and startups",
    basePrice: 2499,
    features: [
      "5-page responsive website",
      "Mobile-first design",
      "Basic SEO setup",
      "Contact form integration",
      "3-month support",
      "Social media integration",
      "Basic analytics setup",
      "SSL certificate"
    ],
    deliveryTime: "5-7 days",
    popular: false,
    color: "blue"
  },
  {
    id: "recommended",
    name: "Recommended",
    description: "Most popular choice for growing businesses",
    basePrice: 4999,
    features: [
      "10-page responsive website",
      "Custom design system",
      "Advanced SEO optimization",
      "CMS integration",
      "6-month support",
      "Analytics & tracking",
      "Performance optimization",
      "E-commerce ready",
      "Blog system",
      "API integrations"
    ],
    deliveryTime: "7-10 days",
    popular: true,
    color: "teal"
  },
  {
    id: "advanced",
    name: "Advanced",
    description: "Enterprise solution with custom features",
    basePrice: 9999,
    features: [
      "Unlimited pages",
      "Custom development",
      "Advanced integrations",
      "Multi-language support",
      "12-month support",
      "Priority support",
      "Custom animations",
      "Advanced e-commerce",
      "User authentication",
      "Custom dashboard",
      "Third-party integrations",
      "Maintenance plan"
    ],
    deliveryTime: "10-14 days",
    popular: false,
    color: "purple"
  }
];

const addOns = [
  {
    id: "extra-pages",
    name: "Additional Pages",
    description: "Extra pages beyond the base package",
    price: 299,
    unit: "per page"
  },
  {
    id: "ecommerce",
    name: "E-commerce Functionality",
    description: "Full shopping cart and payment integration",
    price: 1999,
    unit: "one-time"
  },
  {
    id: "custom-animations",
    name: "Custom Animations",
    description: "Advanced micro-interactions and animations",
    price: 799,
    unit: "one-time"
  },
  {
    id: "multilingual",
    name: "Multi-language Support",
    description: "Support for multiple languages",
    price: 1299,
    unit: "one-time"
  },
  {
    id: "api-integrations",
    name: "API Integrations",
    description: "Third-party service integrations",
    price: 599,
    unit: "per integration"
  },
  {
    id: "maintenance",
    name: "Extended Maintenance",
    description: "Additional months of support and updates",
    price: 299,
    unit: "per month"
  }
];

const faqs = [
  {
    question: "What's included in the base price?",
    answer: "Each tier includes everything listed in the features section, plus hosting setup, SSL certificate, basic training, and the specified support period. No hidden fees."
  },
  {
    question: "How do you handle revisions?",
    answer: "Each project includes 2 rounds of revisions. Additional revisions are available at $150/hour. We work closely with you to minimize the need for extensive changes."
  },
  {
    question: "What if I need custom functionality?",
    answer: "We can build custom features for any project. Custom development is quoted separately based on complexity and time requirements. Contact us for a detailed estimate."
  },
  {
    question: "Do you offer payment plans?",
    answer: "Yes, we offer 50% upfront and 50% on completion for projects over $2,500. For larger projects, we can arrange milestone-based payments."
  },
  {
    question: "What happens after my support period ends?",
    answer: "You can extend support monthly at $299/month, or handle updates yourself. We provide full documentation and training. Emergency support is available at $150/hour."
  },
  {
    question: "Can I upgrade my package later?",
    answer: "Absolutely! You can upgrade to a higher tier or add individual features at any time. We'll credit your original payment toward the upgrade."
  }
];

export default function Pricing() {
  const [selectedTier, setSelectedTier] = useState("recommended");
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [customPageCount, setCustomPageCount] = useState(0);
  const [customIntegrations, setCustomIntegrations] = useState(0);
  const [customMaintenanceMonths, setCustomMaintenanceMonths] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [visibleElements, setVisibleElements] = useState<number[]>([]);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  const selectedTierData = pricingTiers.find(tier => tier.id === selectedTier);

  // Calculate total price
  const calculateTotal = () => {
    if (!selectedTierData) return 0;
    
    let total = selectedTierData.basePrice;
    
    selectedAddOns.forEach(addOnId => {
      const addOn = addOns.find(a => a.id === addOnId);
      if (addOn) {
        if (addOn.id === "extra-pages") {
          total += addOn.price * customPageCount;
        } else if (addOn.id === "api-integrations") {
          total += addOn.price * customIntegrations;
        } else if (addOn.id === "maintenance") {
          total += addOn.price * customMaintenanceMonths;
        } else {
          total += addOn.price;
        }
      }
    });
    
    return total;
  };

  const toggleAddOn = (addOnId: string) => {
    setSelectedAddOns(prev => 
      prev.includes(addOnId) 
        ? prev.filter(id => id !== addOnId)
        : [...prev, addOnId]
    );
  };

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
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Transparent <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">Pricing</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
            Clear, upfront pricing with no hidden fees. Choose the package that fits your needs, or customize your own solution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/quote"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-semibold rounded-full transition-all duration-300 transform hover:scale-105"
            >
              Get Custom Quote
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 border border-slate-600 hover:border-slate-500 text-slate-300 hover:text-white font-semibold rounded-full transition-all duration-300"
            >
              Discuss Your Project
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Choose Your Package</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              All packages include our proven 7-day delivery methodology, premium support, and satisfaction guarantee.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <div
                key={tier.id}
                ref={el => sectionRefs.current[index] = el}
                className={`relative transition-all duration-700 ${
                  visibleElements.includes(index) 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-20 opacity-0'
                } ${
                  tier.popular ? 'scale-105 z-10' : ''
                }`}
              >
                <div className={`relative h-full rounded-3xl border-2 p-8 transition-all duration-300 ${
                  selectedTier === tier.id
                    ? 'border-teal-500 bg-slate-800/50 shadow-xl shadow-teal-500/10'
                    : tier.popular
                    ? 'border-teal-500/50 bg-slate-800/30'
                    : 'border-slate-700/40 bg-slate-800/20 hover:border-slate-600/60'
                }`}>
                  
                  {tier.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 text-sm font-semibold rounded-full">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                    <p className="text-slate-400 mb-6">{tier.description}</p>
                    <div className="mb-4">
                      <span className="text-4xl font-bold">${tier.basePrice.toLocaleString()}</span>
                      <span className="text-slate-400 ml-2">starting</span>
                    </div>
                    <div className="text-sm text-teal-400 mb-6">
                      Delivery: {tier.deliveryTime}
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center mt-0.5">
                          <svg className="w-3 h-3 text-slate-950" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-slate-300 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => setSelectedTier(tier.id)}
                    className={`w-full py-3 rounded-full font-semibold transition-all duration-300 ${
                      selectedTier === tier.id
                        ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950'
                        : 'border border-slate-600 text-slate-300 hover:border-teal-500 hover:text-teal-400'
                    }`}
                  >
                    {selectedTier === tier.id ? 'Selected' : 'Select Package'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Calculator */}
      <section className="py-20 lg:py-32 bg-slate-900/50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Customize Your Package</h2>
            <p className="text-xl text-slate-300">
              Add extra features and services to create the perfect solution for your needs.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Add-ons Selection */}
            <div>
              <h3 className="text-2xl font-semibold mb-6">Additional Services</h3>
              <div className="space-y-4">
                {addOns.map((addOn) => (
                  <div key={addOn.id} className="flex items-center justify-between p-4 bg-slate-800/30 rounded-xl border border-slate-700/40">
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        id={addOn.id}
                        checked={selectedAddOns.includes(addOn.id)}
                        onChange={() => toggleAddOn(addOn.id)}
                        className="w-5 h-5 rounded border-slate-600 bg-slate-700 text-teal-500 focus:ring-teal-500 focus:ring-offset-0"
                      />
                      <label htmlFor={addOn.id} className="cursor-pointer">
                        <div className="font-semibold">{addOn.name}</div>
                        <div className="text-sm text-slate-400">{addOn.description}</div>
                      </label>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">${addOn.price.toLocaleString()}</div>
                      <div className="text-sm text-slate-400">{addOn.unit}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Custom Quantities */}
              {selectedAddOns.includes("extra-pages") && (
                <div className="mt-4 p-4 bg-slate-800/30 rounded-xl border border-slate-700/40">
                  <label className="block text-sm font-medium mb-2">Number of extra pages</label>
                  <input
                    type="number"
                    min="0"
                    max="50"
                    value={customPageCount}
                    onChange={(e) => setCustomPageCount(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              )}

              {selectedAddOns.includes("api-integrations") && (
                <div className="mt-4 p-4 bg-slate-800/30 rounded-xl border border-slate-700/40">
                  <label className="block text-sm font-medium mb-2">Number of integrations</label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={customIntegrations}
                    onChange={(e) => setCustomIntegrations(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              )}

              {selectedAddOns.includes("maintenance") && (
                <div className="mt-4 p-4 bg-slate-800/30 rounded-xl border border-slate-700/40">
                  <label className="block text-sm font-medium mb-2">Additional maintenance months</label>
                  <input
                    type="number"
                    min="0"
                    max="24"
                    value={customMaintenanceMonths}
                    onChange={(e) => setCustomMaintenanceMonths(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              )}
            </div>

            {/* Price Summary */}
            <div className="lg:sticky lg:top-8">
              <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700/40">
                <h3 className="text-2xl font-semibold mb-6">Your Custom Quote</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span>{selectedTierData?.name} Package</span>
                    <span className="font-semibold">${selectedTierData?.basePrice.toLocaleString()}</span>
                  </div>

                  {selectedAddOns.map(addOnId => {
                    const addOn = addOns.find(a => a.id === addOnId);
                    if (!addOn) return null;

                    let quantity = 1;
                    let price = addOn.price;

                    if (addOn.id === "extra-pages") {
                      quantity = customPageCount;
                      price = addOn.price * quantity;
                    } else if (addOn.id === "api-integrations") {
                      quantity = customIntegrations;
                      price = addOn.price * quantity;
                    } else if (addOn.id === "maintenance") {
                      quantity = customMaintenanceMonths;
                      price = addOn.price * quantity;
                    }

                    if (quantity === 0) return null;

                    return (
                      <div key={addOnId} className="flex justify-between items-center text-sm">
                        <span>
                          {addOn.name}
                          {quantity > 1 && ` (${quantity})`}
                        </span>
                        <span>${price.toLocaleString()}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="border-t border-slate-700 pt-4 mb-6">
                  <div className="flex justify-between items-center text-xl font-semibold">
                    <span>Total Project Cost</span>
                    <span className="text-teal-400">${calculateTotal().toLocaleString()}</span>
                  </div>
                  <div className="text-sm text-slate-400 mt-2">
                    Delivery: {selectedTierData?.deliveryTime}
                  </div>
                </div>

                <div className="space-y-3">
                  <Link
                    to="/quote"
                    state={{ 
                      selectedTier, 
                      selectedAddOns, 
                      customOptions: { 
                        pages: customPageCount, 
                        integrations: customIntegrations, 
                        maintenance: customMaintenanceMonths 
                      },
                      totalPrice: calculateTotal()
                    }}
                    className="w-full inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-semibold rounded-full transition-all duration-300"
                  >
                    Request This Quote
                  </Link>
                  <Link
                    to="/contact"
                    className="w-full inline-flex items-center justify-center px-6 py-3 border border-slate-600 hover:border-slate-500 text-slate-300 hover:text-white font-semibold rounded-full transition-all duration-300"
                  >
                    Discuss Custom Needs
                  </Link>
                </div>

                <div className="mt-6 text-sm text-slate-400">
                  <p>• All prices include taxes and fees</p>
                  <p>• 50% upfront, 50% on completion</p>
                  <p>• 30-day satisfaction guarantee</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 lg:py-32">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Pricing FAQ</h2>
            <p className="text-xl text-slate-300">
              Common questions about our pricing and payment terms.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/40 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-slate-700/20 transition-colors duration-200"
                >
                  <span className="font-semibold">{faq.question}</span>
                  <svg 
                    className={`w-5 h-5 transition-transform duration-200 ${
                      expandedFaq === index ? 'rotate-180' : ''
                    }`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandedFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-slate-300 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-slate-900 to-teal-950/20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Get a detailed quote tailored to your specific needs and timeline.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/quote"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-semibold rounded-full transition-all duration-300 transform hover:scale-105"
            >
              Get Your Quote
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 border border-slate-600 hover:border-slate-500 text-slate-300 hover:text-white font-semibold rounded-full transition-all duration-300"
            >
              Schedule a Call
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
