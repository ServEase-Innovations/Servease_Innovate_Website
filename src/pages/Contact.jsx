import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, MapPin, Send, Zap } from 'lucide-react';

export default function Contact() {
  const [focusedField, setFocusedField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.target);
    
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString()
    })
      .then(() => {
        setIsSuccess(true);
        setIsSubmitting(false);
      })
      .catch(() => {
        alert('There was an error submitting the form. Please try again.');
        setIsSubmitting(false);
      });
  };

  const inputClasses = (name) => `
    w-full bg-white dark:bg-darkbrand-100 shadow-sm border border-brand-200 dark:border-darkbrand-200 rounded-xl px-4 py-4 text-brand-900 dark:text-white placeholder-white/30
    transition-all duration-300 outline-none
    ${focusedField === name ? 'bg-white dark:bg-darkbrand-100 shadow-sm border-electric-500 shadow-sm' : 'hover:border-brand-200 dark:border-darkbrand-200'}
  `;

  return (
    <div className="min-h-screen bg-custom text-brand-900 dark:text-white overflow-hidden pb-32">
      <div className="fixed inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      <div className="fixed top-1/4 right-0 w-96 h-96 bg-accent-blue/10 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-0 left-1/4 w-96 h-96 bg-purple-50 blur-[120px] pointer-events-none" />

      <div className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 bg-accent-blue/10 border border-electric-500/20 text-accent-blue rounded-full px-4 py-2 mb-6">
              <Zap size={16} />
              <span className="text-sm font-semibold uppercase tracking-wider">Contact Us</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold font-display mb-6">
              Let's build something <br/>
              <span className="gradient-text-custom">extraordinary.</span>
            </h2>
            <p className="text-xl text-brand-700 dark:text-darkbrand-600 max-w-2xl mx-auto">
              Whether you have a fully fleshed-out RFP or just a napkin sketch, we're ready to engineer it.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {[
              { icon: <MessageSquare />, title: 'Chat to sales', desc: 'Speak to our friendly team.', info: 'sales@serveaseinnovation.com' },
              { icon: <Mail />, title: 'Support', desc: 'We are here to help.', info: 'support@serveaseinnovation.com' },
              { icon: <MapPin />, title: 'Visit us', desc: 'HQ in Bangalore, with presence in Dubai.', info: '123 Tech Park, Bangalore, India' }
            ].map((item, i) => (
              <div key={i} className="bg-white dark:bg-darkbrand-100 shadow-sm border border-brand-200 dark:border-darkbrand-200 rounded-2xl p-6 flex gap-4 hover:bg-white dark:bg-darkbrand-100 shadow-sm transition-colors">
                <div className="w-12 h-12 bg-accent-blue/10 rounded-xl flex items-center justify-center text-accent-blue shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                  <p className="text-brand-700 dark:text-darkbrand-600 text-sm mb-2">{item.desc}</p>
                  <a href="#" className="text-accent-blue font-medium text-sm hover:underline">{item.info}</a>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-3 bg-white dark:bg-darkbrand-100 shadow-sm backdrop-blur-xl border border-brand-200 dark:border-darkbrand-200 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-blue/10 blur-[80px] pointer-events-none" />
            
            {isSuccess ? (
              <div className="relative z-10 text-center py-12 px-6 bg-green-50/50 dark:bg-green-900/10 border border-green-200 dark:border-green-800/30 rounded-2xl">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-800/50 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Send size={24} />
                </div>
                <h3 className="text-2xl font-bold text-brand-900 dark:text-white mb-3">Message Sent!</h3>
                <p className="text-brand-700 dark:text-darkbrand-600 mb-8 max-w-sm mx-auto">
                  Thank you for reaching out. Our team will get back to you shortly.
                </p>
                <button 
                  onClick={() => setIsSuccess(false)} 
                  className="btn-outline border-brand-200 dark:border-darkbrand-200 hover:border-brand-900 dark:hover:border-white"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form className="relative z-10 space-y-6" name="contact" data-netlify="true" netlify-honeypot="bot-field" onSubmit={handleSubmit}>
                <input type="hidden" name="form-name" value="contact" />
                <p className="hidden">
                  <label>
                    Don’t fill this out if you're human: <input name="bot-field" />
                  </label>
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-brand-700 dark:text-darkbrand-600 mb-2">First Name</label>
                    <input type="text" name="firstName" required placeholder="John" className={inputClasses('fname')} onFocus={() => setFocusedField('fname')} onBlur={() => setFocusedField(null)} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brand-700 dark:text-darkbrand-600 mb-2">Last Name</label>
                    <input type="text" name="lastName" required placeholder="Doe" className={inputClasses('lname')} onFocus={() => setFocusedField('lname')} onBlur={() => setFocusedField(null)} />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-brand-700 dark:text-darkbrand-600 mb-2">Email Address</label>
                  <input type="email" name="email" required placeholder="john@company.com" className={inputClasses('email')} onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField(null)} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-brand-700 dark:text-darkbrand-600 mb-2">How can we help?</label>
                  <textarea rows="4" name="message" required placeholder="Tell us a little about your project..." className={inputClasses('message')} onFocus={() => setFocusedField('message')} onBlur={() => setFocusedField(null)} />
                </div>

                <button type="submit" disabled={isSubmitting} className="w-full btn-primary justify-center py-4 text-lg disabled:opacity-70 transition-opacity">
                  {isSubmitting ? 'Sending...' : (
                    <>Send Message <Send size={20} className="ml-2" /></>
                  )}
                </button>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </div>
  );
}