import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Code2, Users, Shield, Zap } from 'lucide-react';
import InfiniteScrollTags from '../components/InfiniteScrollTags';

const FEATURES = [
  { icon: <Code2 className="text-accent-blue" />, title: 'Custom Engineering', desc: 'Scalable architectures built with modern stacks.' },
  { icon: <Users className="text-accent-pink" />, title: 'Elite Talent', desc: 'Pre-vetted engineering teams ready to deploy.' },
  { icon: <Shield className="text-accent-purple" />, title: 'Enterprise Quality', desc: 'Rigorous QA and automated testing pipelines.' },
  { icon: <Zap className="text-accent-orange" />, title: 'AI Automation', desc: 'Gen-AI integrated workflows to supercharge speed.' }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-brand-50 dark:bg-darkbrand-50 relative overflow-hidden">
      
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] rounded-full bg-gradient-to-tr from-accent-blue/10 to-accent-purple/10 blur-[120px] animate-blob" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-accent-pink/10 to-accent-orange/10 blur-[120px] animate-blob" style={{ animationDelay: '2s' }} />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjAuMDUiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PHBhdGggZD0iTTAgNjBMMjAgNjBMMTcuOTM4IDQxLjY0MUwxNSAxNUwwIDBaIiBvcGFjaXR5PSIwLjAyNCIvPjxwb2x5Z29uIHBvaW50cz0iNjAgMCA0MCAwIDE1IDE1IDQxLjY0MSAxNy45MzgiIG9wYWNpdHk9IjAuMDI0Ii8+PC9nPjwvc3ZnPg==')] opacity-[0.15]" />
      </div>

      {/* Hero Section */}
      <div className="relative z-10 pt-40 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 text-center lg:text-left"
        >
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-display font-black leading-[1.05] tracking-tight mb-8">
            Build fast. <br className="hidden lg:block" />
            Scale <span className="text-gradient-primary">faster.</span>
          </h1>
          
          <p className="text-xl text-brand-600 dark:text-darkbrand-600 leading-relaxed mb-10 max-w-2xl mx-auto lg:mx-0">
            We engineer high-performance web and mobile applications for companies that demand excellence. Stop settling for mediocre software.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
            <a href="#contact" className="w-full sm:w-auto btn-primary text-lg px-10 py-5">
              Start a Project <ArrowRight size={20} />
            </a>
            <a href="#services" className="w-full sm:w-auto btn-outline text-lg px-10 py-5">
              Explore Services
            </a>
          </div>
        </motion.div>

        {/* Right Visuals (Floating UI Mockup) */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="flex-1 relative w-full max-w-lg lg:max-w-none hidden md:block"
        >
          <div className="relative w-full aspect-square">
            {/* Main Floating Card */}
            <motion.div 
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-10 left-10 right-10 bottom-10 glass-card p-8 flex flex-col justify-between"
            >
              <div className="flex justify-between items-center mb-8">
                <div className="w-12 h-12 rounded-2xl bg-white dark:bg-darkbrand-100 flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-accent-blue" />
                </div>
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-brand-200" />
                  <div className="w-3 h-3 rounded-full bg-brand-200" />
                  <div className="w-3 h-3 rounded-full bg-brand-200" />
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="h-4 w-3/4 bg-white dark:bg-darkbrand-100 rounded-full" />
                <div className="h-4 w-1/2 bg-white dark:bg-darkbrand-100 rounded-full" />
                <div className="h-4 w-5/6 bg-white dark:bg-darkbrand-100 rounded-full" />
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="h-24 bg-gradient-to-br from-brand-50 to-brand-100 rounded-2xl border border-brand-200 dark:border-darkbrand-200 p-4">
                  <div className="w-8 h-8 rounded-full bg-white dark:bg-darkbrand-100 mb-2" />
                  <div className="h-2 w-1/2 bg-brand-200 rounded-full" />
                </div>
                <div className="h-24 bg-gradient-to-br from-brand-50 to-brand-100 rounded-2xl border border-brand-200 dark:border-darkbrand-200 p-4">
                  <div className="w-8 h-8 rounded-full bg-white dark:bg-darkbrand-100 mb-2" />
                  <div className="h-2 w-1/2 bg-brand-200 rounded-full" />
                </div>
              </div>
            </motion.div>

            {/* Orbiting Elements */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border border-dashed border-brand-300 rounded-full"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white dark:bg-darkbrand-100 rounded-2xl shadow-xl flex items-center justify-center rotate-[-360deg]">
                <Zap className="text-accent-orange" size={24} />
              </div>
              <div className="absolute bottom-1/4 -right-6 w-16 h-16 bg-white dark:bg-darkbrand-100 rounded-2xl shadow-xl flex items-center justify-center rotate-[-360deg]">
                <Shield className="text-accent-purple" size={24} />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Infinite Scroll Infinite Scroll Tags (which I need to update separately, but render here) */}
      <div className="relative z-10 py-20 border-y border-brand-200 dark:border-darkbrand-200 bg-white dark:bg-darkbrand-100/50 backdrop-blur-md">
         <div className="text-center mb-8">
           <h3 className="text-sm font-bold tracking-widest uppercase text-brand-400">Our Expertise</h3>
         </div>
         <InfiniteScrollTags />
      </div>

      {/* Features Grid */}
      <div className="relative z-10 py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Built for the modern web.</h2>
          <p className="text-xl text-brand-600 dark:text-darkbrand-600">We don't just write code. We architect solutions that give you a competitive edge in the market.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-darkbrand-100 rounded-3xl p-8 shadow-sm border border-brand-100 dark:border-darkbrand-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-brand-50 dark:bg-darkbrand-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold font-display mb-3">{feature.title}</h3>
              <p className="text-brand-600 dark:text-darkbrand-600 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
      
    </div>
  );
}