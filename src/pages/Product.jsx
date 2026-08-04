import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Smartphone, Heart, Sparkles, MapPin, CheckCircle2 } from 'lucide-react';

export default function Product() {
  return (
    <div className="min-h-screen bg-custom text-brand-900 dark:text-white overflow-hidden pb-32">
      {/* Background Elements */}
      <div className="fixed inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      <div className="fixed top-20 left-10 w-96 h-96 bg-accent-blue/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-20 right-10 w-[500px] h-[500px] bg-purple-50 rounded-full blur-[150px] pointer-events-none" />

      {/* Hero Section */}
      <div className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 bg-accent-blue/10 border border-electric-500/30 text-accent-blue rounded-full px-4 py-2 mb-8 backdrop-blur-sm">
              <Sparkles size={16} />
              <span className="text-sm font-semibold tracking-wide uppercase">ServEaso</span>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-bold font-display leading-[1.1] mb-6">
              Meet Our <span className="text-gradient-primary">Flagship Product</span>
            </h2>
            
            <p className="text-xl text-brand-700 dark:text-darkbrand-600 leading-relaxed mb-8">
              A revolutionary location-based home care application. We connect busy professionals and families with highly-vetted, trusted household help—on demand.
            </p>

            <ul className="space-y-4 mb-10">
              {[
                'Real-time location matching for instant care',
                'Rigorous 5-step background verification',
                'Seamless payments and scheduling'
              ].map((feature, i) => (
                <motion.li 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + (i * 0.1) }}
                  className="flex items-center gap-3 text-brand-700 dark:text-darkbrand-600"
                >
                  <CheckCircle2 className="text-accent-blue shrink-0" size={20} />
                  <span>{feature}</span>
                </motion.li>
              ))}
            </ul>
            
            <div className="flex gap-4">
              <button className="btn-primary text-base py-4 px-8 shadow-xl shadow-electric-500/20">
                Join the Waitlist
              </button>
            </div>
          </motion.div>

          {/* Interactive Mobile Mockup Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="relative hidden lg:block h-[600px] w-full"
          >
            {/* The "Phone" container */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[600px] bg-brand-50 dark:bg-darkbrand-50 border-[8px] border-gray-800 rounded-[3rem] shadow-2xl overflow-hidden z-10 flex flex-col relative">
              
              {/* Dynamic UI Elements inside the phone */}
              <div className="absolute inset-0 bg-gradient-to-br from-electric-900 to-navy-900 opacity-50" />
              
              <div className="relative z-10 p-6 flex flex-col h-full">
                <div className="flex items-center justify-between mb-8">
                  <div className="w-8 h-8 rounded-full bg-white dark:bg-darkbrand-100 shadow-sm" />
                  <div className="w-24 h-4 rounded-full bg-white dark:bg-darkbrand-100 shadow-sm" />
                </div>
                
                <h3 className="text-2xl font-bold mb-2">Find Help Nearby</h3>
                <p className="text-sm text-brand-700 dark:text-darkbrand-600 mb-6"><MapPin size={12} className="inline mr-1" /> Bangalore, India</p>

                <div className="space-y-3">
                  {[1, 2, 3].map((card) => (
                    <motion.div 
                      key={card}
                      whileHover={{ scale: 1.05 }}
                      className="bg-white dark:bg-darkbrand-100 shadow-sm backdrop-blur-md p-4 rounded-2xl border border-brand-200 dark:border-darkbrand-200 flex items-center gap-4 cursor-pointer"
                    >
                      <div className="w-12 h-12 rounded-full bg-accent-blue/10 flex items-center justify-center">
                        <Heart size={20} className="text-accent-blue" />
                      </div>
                      <div>
                        <div className="w-24 h-4 rounded bg-white dark:bg-darkbrand-100 shadow-sm mb-2" />
                        <div className="w-16 h-3 rounded bg-white dark:bg-darkbrand-100 shadow-sm" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Orbiting Elements */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-brand-200 dark:border-darkbrand-200 rounded-full"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-brand-50 dark:bg-darkbrand-50 rounded-2xl border border-brand-200 dark:border-darkbrand-200 flex items-center justify-center shadow-lg">
                <Shield className="text-accent-orange" size={24} />
              </div>
              <div className="absolute bottom-1/4 -right-4 w-16 h-16 bg-brand-50 dark:bg-darkbrand-50 rounded-2xl border border-brand-200 dark:border-darkbrand-200 flex items-center justify-center shadow-lg">
                <Smartphone className="text-accent-blue" size={24} />
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
      
    </div>
  );
}