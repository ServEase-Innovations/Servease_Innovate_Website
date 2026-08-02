import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Code2, Users, TestTube2, Globe, Bot, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const SERVICES = [
  {
    id: 'product-dev',
    title: 'Product Development',
    subtitle: 'From Ideation to Scale',
    description: 'We build resilient, scalable architectures that grow with your business. Full-stack expertise across modern web, mobile, and cloud-native environments.',
    icon: <Code2 size={40} className="text-blue-400" />,
    color: 'from-blue-600 to-blue-400',
    bg: 'bg-accent-blue/100/10'
  },
  {
    id: 'it-staffing',
    title: 'IT Staffing & Talent',
    subtitle: 'Elite Teams, On Demand',
    description: 'Access our network of pre-vetted, top-tier engineers. We match the precise technical skills and cultural fit your project demands.',
    icon: <Users size={40} className="text-purple-400" />,
    color: 'from-purple-600 to-purple-400',
    bg: 'bg-purple-50'
  },
  {
    id: 'qa-testing',
    title: 'QA & Testing',
    subtitle: 'Flawless Execution',
    description: '20+ years of QA leadership. We implement rigorous automated and manual testing frameworks to ensure zero-defect releases.',
    icon: <TestTube2 size={40} className="text-rose-400" />,
    color: 'from-rose-600 to-rose-400',
    bg: 'bg-rose-500/10'
  },
  {
    id: 'automation',
    title: 'AI & Automation',
    subtitle: 'Work Smarter, Not Harder',
    description: 'Integrate Gen-AI and Robotic Process Automation (RPA) into your workflows. Reduce overhead and eliminate repetitive manual tasks.',
    icon: <Bot size={40} className="text-accent-orange" />,
    color: 'from-emerald-600 to-emerald-400',
    bg: 'bg-accent-orange/10'
  },
  {
    id: 'web-design',
    title: 'Web Design',
    subtitle: 'Digital Experiences that Convert',
    description: 'Beautiful, responsive, and highly accessible user interfaces. We design with the end-user in mind to maximize engagement and conversion.',
    icon: <Globe size={40} className="text-amber-400" />,
    color: 'from-amber-600 to-amber-400',
    bg: 'bg-amber-500/10'
  }
];

export default function Services() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div className="min-h-screen bg-custom text-brand-900 dark:text-white pt-24 pb-32" ref={containerRef}>
      {/* Background Ambience */}
      <div className="fixed inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      <div className="fixed top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-accent-blue/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-24"
        >
          <div className="inline-flex items-center gap-2 bg-white dark:bg-darkbrand-100 shadow-sm border border-brand-200 dark:border-darkbrand-200 rounded-full px-4 py-2 mb-6 backdrop-blur-sm">
            <Sparkles size={16} className="text-accent-blue" />
            <span className="text-brand-600 dark:text-darkbrand-600 text-sm font-semibold tracking-wider uppercase">Our Capabilities</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold font-display leading-tight mb-6">
            Engineering excellence <br />
            <span className="gradient-text-custom">delivered.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-brand-600 dark:text-darkbrand-600 leading-relaxed">
            From strategic ideation to flawless execution, we provide the technical firepower required to scale your vision. No compromises.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              {/* Glass Card */}
              <div className="relative h-full bg-white dark:bg-darkbrand-100 shadow-sm backdrop-blur-xl border border-brand-200 dark:border-darkbrand-200 rounded-3xl p-8 overflow-hidden transition-all duration-500 hover:border-brand-200 dark:border-darkbrand-200 hover:shadow-2xl hover:bg-white dark:bg-darkbrand-100 shadow-sm">
                
                {/* Glow Effect on Hover */}
                <div className={`absolute -right-20 -top-20 w-48 h-48 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${service.bg}`} />
                
                <div className="relative z-10">
                  <div className={`w-16 h-16 rounded-2xl bg-white dark:bg-darkbrand-100 shadow-sm flex items-center justify-center mb-8 border border-brand-200 dark:border-darkbrand-200 shadow-inner`}>
                    {service.icon}
                  </div>
                  
                  <h4 className="text-sm font-mono text-accent-blue mb-2 uppercase tracking-wider">{service.subtitle}</h4>
                  <h3 className="text-2xl font-bold mb-4 font-display">{service.title}</h3>
                  <p className="text-brand-600 dark:text-darkbrand-600 leading-relaxed mb-8">
                    {service.description}
                  </p>
                  
                  <Link to="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-900 dark:text-white group-hover:text-accent-blue transition-colors">
                    Discuss your project <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}

          {/* CTA Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="group relative md:col-span-2 lg:col-span-1"
          >
            <div className="h-full bg-gradient-to-br from-electric-600 to-blue-800 rounded-3xl p-8 overflow-hidden relative flex flex-col justify-center items-center text-center">
              <div className="absolute inset-0 bg-grid-pattern opacity-30" />
              <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-4 font-display text-brand-900 dark:text-white">Don't see what you need?</h3>
                <p className="text-brand-600 dark:text-darkbrand-600 mb-8">
                  We specialize in custom solutions. Let's talk about your unique technical challenges.
                </p>
                <Link to="/contact" className="btn-primary bg-white dark:bg-darkbrand-100 text-brand-900 dark:text-white hover:bg-white dark:bg-darkbrand-100 border-none shadow-xl">
                  Contact Us
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}