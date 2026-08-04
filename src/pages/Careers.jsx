import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Coffee, Laptop, Heart, ChevronRight, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

const BENEFITS = [
  { icon: <Laptop />, title: 'Remote-First', desc: 'Work from anywhere. We value output, not office hours.' },
  { icon: <Heart />, title: 'Health & Wellness', desc: 'Comprehensive coverage for you and your dependents.' },
  { icon: <Rocket />, title: 'Growth Budget', desc: 'Annual stipend for courses, conferences, and books.' },
  { icon: <Coffee />, title: 'Unlimited PTO', desc: 'Take the time you need to recharge and stay sharp.' }
];

const ROLES = [
  { title: 'Senior Full Stack Engineer', type: 'Remote', dept: 'Engineering' },
  { title: 'Product Designer (UI/UX)', type: 'Remote', dept: 'Design' },
  { title: 'QA Automation Engineer', type: 'Hybrid', dept: 'Quality' }
];

export default function Careers() {
  return (
    <div className="min-h-screen bg-custom text-brand-900 dark:text-white overflow-hidden pb-32">
      <div className="fixed inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      {/* Hero */}
      <div className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 bg-accent-orange/10 border border-accent-orange/20 text-accent-orange rounded-full px-4 py-2 mb-6">
            <Briefcase size={16} />
            <span className="text-sm font-semibold uppercase tracking-wider">We are hiring</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold font-display mb-6">
            Build the future <br/>
            <span className="gradient-text-custom">with us.</span>
          </h2>
          <p className="text-xl text-brand-700 dark:text-darkbrand-600 mb-8 max-w-2xl mx-auto">
            Join a collective of passionate builders. We're tackling hard problems and shipping products that matter.
          </p>
        </motion.div>
      </div>

      {/* Benefits Grid */}
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {BENEFITS.map((benefit, i) => (
            <motion.div 
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-darkbrand-100 shadow-sm border border-brand-200 dark:border-darkbrand-200 rounded-2xl p-6 backdrop-blur-md"
            >
              <div className="w-12 h-12 bg-accent-blue/10 rounded-xl flex items-center justify-center text-accent-blue mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
              <p className="text-brand-700 dark:text-darkbrand-600 text-sm leading-relaxed">{benefit.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Open Roles */}
      <div className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto py-16">
        <h2 className="text-3xl font-display font-bold mb-8">Open Positions</h2>
        
        <div className="space-y-4">
          {ROLES.map((role, i) => (
            <motion.div 
              key={role.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-white dark:bg-darkbrand-100 shadow-sm border border-brand-200 dark:border-darkbrand-200 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between hover:bg-white dark:bg-darkbrand-100 shadow-sm transition-colors cursor-pointer"
            >
              <div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-accent-blue transition-colors">{role.title}</h3>
                <div className="flex gap-3 text-sm text-brand-700 dark:text-darkbrand-600">
                  <span className="bg-white dark:bg-darkbrand-100 shadow-sm px-2 py-1 rounded">{role.dept}</span>
                  <span className="bg-white dark:bg-darkbrand-100 shadow-sm px-2 py-1 rounded">{role.type}</span>
                </div>
              </div>
              
              <div className="mt-4 md:mt-0">
                <Link to="/contact" className="inline-flex items-center gap-2 text-accent-blue font-semibold group-hover:gap-3 transition-all">
                  Apply Now <ChevronRight size={16} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 text-center p-8 border border-dashed border-brand-200 dark:border-darkbrand-200 rounded-2xl bg-white dark:bg-darkbrand-100 shadow-sm">
          <p className="text-brand-700 dark:text-darkbrand-600 mb-4">Don't see a role that fits?</p>
          <Link to="/contact" className="btn-primary py-2 px-6">Send an Open Application</Link>
        </div>
      </div>

    </div>
  );
}