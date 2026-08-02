import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Moon, Sun } from 'lucide-react';
import logo from "../assets/logo.png";

const navLinks = [
  { href: '#home', label: 'Home', id: 'home' },
  { href: '#services', label: 'Services', id: 'services' },
  { href: '#product', label: 'Product', id: 'product' },
  { href: '#who-we-are', label: 'Who We Are', id: 'who-we-are' },
  { href: '#careers', label: 'Careers', id: 'careers' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check initial theme from localStorage or system preference
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDark(true);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for scroll spy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -60% 0px' } // triggers when section is near middle of viewport
    );

    navLinks.forEach((link) => {
      const el = document.getElementById(link.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pt-6 pb-4 pointer-events-none">
      <div className="max-w-5xl mx-auto">
        <motion.div 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={`pointer-events-auto transition-all duration-500 rounded-full ${
            scrolled ? 'bg-brand-100/95 dark:bg-darkbrand-100/95 backdrop-blur-2xl shadow-xl dark:shadow-[0_0_30px_rgba(0,240,255,0.15)] border border-brand-200 dark:border-accent-cyan/30 px-4 py-3' : 'bg-transparent px-2 py-4'
          }`}
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#home" onClick={(e) => scrollToSection(e, 'home')} className="flex items-center gap-3 group relative z-10">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-brand-100 flex items-center justify-center shrink-0 border border-brand-200 transition-transform duration-300 group-hover:scale-105">
                <img src={logo} alt="ServEase Innovation Logo" className="w-full h-full object-cover" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-brand-900">ServEase Innovation</span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1 bg-brand-50/50 rounded-full p-1 border border-brand-100">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.id)}
                    className="relative px-4 py-2 text-sm font-medium transition-colors z-10"
                  >
                    <span className={`relative z-10 ${isActive ? 'text-brand-900' : 'text-brand-600 hover:text-brand-900'}`}>
                      {link.label}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-white dark:bg-darkbrand-200 rounded-full shadow-sm border border-brand-200/50 dark:border-darkbrand-200/50"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Desktop CTA & Theme Toggle */}
            <div className="hidden md:flex items-center gap-4 z-10">
              <button onClick={toggleTheme} className="p-2 rounded-full text-brand-600 hover:text-brand-900 dark:text-darkbrand-600 dark:hover:text-white transition-colors bg-brand-50 dark:bg-darkbrand-200">
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="group flex items-center gap-2 bg-brand-900 dark:bg-accent-cyan text-white dark:text-darkbrand-50 px-5 py-2.5 rounded-full text-sm font-medium transition-all hover:bg-black dark:hover:bg-accent-purple hover:shadow-lg hover:-translate-y-0.5 active:scale-95">
                Get Started
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden relative z-50 p-2 text-brand-900 bg-brand-100 rounded-full"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </motion.div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-24 left-4 right-4 bg-brand-100/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-brand-200 overflow-hidden md:hidden pointer-events-auto origin-top"
          >
            <div className="flex flex-col p-6 space-y-4">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.id)}
                    className={`text-lg font-medium p-4 rounded-2xl transition-colors ${
                      isActive ? 'bg-brand-50 text-brand-900' : 'text-brand-600 hover:bg-brand-50 hover:text-brand-900'
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
              <div className="pt-4 border-t border-brand-100">
                <a
                  href="#contact"
                  onClick={(e) => scrollToSection(e, 'contact')}
                  className="flex items-center justify-center gap-2 w-full bg-accent-cyan text-brand-50 p-4 rounded-2xl font-medium"
                >
                  Get Started <ArrowRight size={18} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}