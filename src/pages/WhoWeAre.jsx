import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Sparkles, Users, Code2, Globe } from 'lucide-react';

const TEAM = [
  { name: 'Founding Team', role: 'Leadership', experience: '30+ Years Combined' },
  { name: 'Engineering', role: 'Development', experience: 'Full Stack & AI' },
  { name: 'Quality Assurance', role: 'Testing', experience: '20+ Years Expertise' }
];

const TIMELINE = [
  { year: '2024', title: 'ServEase Innovation is Born', desc: 'Founded with a mission to bridge the gap between complex technology and human-centric solutions.' },
  { year: 'Today', title: 'Global Impact', desc: 'Delivering robust software and scaling the ServEaso flagship product across multiple regions.' },
  { year: 'Future', title: 'Relentless Innovation', desc: 'Expanding our AI & Automation offerings to revolutionize how businesses operate.' }
];

export default function WhoWeAre() {
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ["start center", "end center"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <div className="min-h-screen bg-custom text-brand-900 dark:text-white overflow-hidden pb-32">
      <div className="fixed inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      {/* Hero Section */}
      <div className="relative pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="inline-flex items-center gap-2 bg-white dark:bg-darkbrand-100 shadow-sm border border-brand-200 dark:border-darkbrand-200 rounded-full px-4 py-2 mb-6">
            <Users size={16} className="text-accent-blue" />
            <span className="text-brand-700 dark:text-darkbrand-600 text-sm font-semibold tracking-wider uppercase">Who We Are</span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-bold font-display leading-tight mb-8">
            Technology that <br/>
            <span className="gradient-text-custom">serves people.</span>
          </h2>
          
          <p className="text-xl text-brand-700 dark:text-darkbrand-600 max-w-2xl mx-auto leading-relaxed">
            We are a collective of veteran engineers, designers, and strategists. We believe in building software that doesn't just function—it empowers.
          </p>
        </motion.div>
      </div>

      {/* Timeline Section */}
      <div className="relative px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto py-20" ref={timelineRef}>
        <div className="absolute left-[24px] md:left-1/2 top-0 bottom-0 w-[2px] bg-white dark:bg-darkbrand-100 shadow-sm" />
        <motion.div 
          className="absolute left-[24px] md:left-1/2 top-0 bottom-0 w-[2px] bg-electric-500 origin-top" 
          style={{ scaleY }} 
        />

        {TIMELINE.map((item, index) => {
          const isEven = index % 2 === 0;
          return (
            <motion.div 
              key={item.year}
              initial={{ opacity: 0, x: isEven ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className={`relative flex items-center justify-between mb-24 md:mb-32 ${isEven ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Center Node */}
              <div className="absolute left-[16px] md:left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-electric-500 border-4 border-navy-900 shadow-md z-10" />
              
              <div className="hidden md:block w-[45%]" />
              
              <div className="w-full md:w-[45%] pl-14 md:pl-0">
                <div className="bg-white dark:bg-darkbrand-100 shadow-sm backdrop-blur-md border border-brand-200 dark:border-darkbrand-200 rounded-2xl p-8 hover:bg-white dark:bg-darkbrand-100 shadow-sm transition-colors">
                  <span className="text-accent-blue font-mono font-bold mb-2 block">{item.year}</span>
                  <h3 className="text-2xl font-bold mb-3 font-display">{item.title}</h3>
                  <p className="text-brand-700 dark:text-darkbrand-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Core Teams */}
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-display mb-4">Our Backbone</h2>
          <p className="text-brand-700 dark:text-darkbrand-600 max-w-xl mx-auto">The expertise driving our success and yours.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {TEAM.map((member, i) => (
            <motion.div 
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-gradient-to-b from-white to-gray-50 backdrop-blur-xl border border-brand-200 dark:border-darkbrand-200 rounded-2xl p-8 text-center group"
            >
              <div className="w-16 h-16 mx-auto bg-accent-blue/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Globe size={24} className="text-accent-blue" />
              </div>
              <h3 className="text-xl font-bold mb-2">{member.name}</h3>
              <p className="text-accent-blue font-medium mb-1">{member.role}</p>
              <p className="text-sm text-brand-700 dark:text-darkbrand-600">{member.experience}</p>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
}