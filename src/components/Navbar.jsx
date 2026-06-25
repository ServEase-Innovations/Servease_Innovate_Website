import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Zap } from 'lucide-react';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/product', label: 'Product' },
  { to: '/who-we-are', label: 'Who We Are' },
  { to: '/careers', label: 'Careers' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const isActive = (to) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-electric-600 to-electric-400 rounded-lg flex items-center justify-center shadow-lg shadow-electric-500/25 group-hover:shadow-electric-500/40 transition-shadow">
              <Zap size={16} className="text-white fill-white" />
            </div>
            <div className="flex flex-col leading-none">
              <span
                className={`font-display font-bold text-sm tracking-tight transition-colors duration-200 ${
                  scrolled ? 'text-navy-900' : 'text-white'
                }`}
              >
                ServEase
              </span>
              <span className="font-mono text-electric-400 text-[9px] tracking-widest uppercase font-medium">
                Innovation
              </span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(({ to, label }) => {
              const active = isActive(to);
              return (
                <Link
                  key={to}
                  to={to}
                  className={`
                    relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                    ${active
                      ? scrolled
                        ? 'text-electric-600 bg-electric-500/8'
                        : 'text-white bg-white/15'
                      : scrolled
                        ? 'text-gray-700 hover:text-navy-900 hover:bg-gray-100/80'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }
                  `}
                >
                  {label}
                  {/* Active underline indicator */}
                  {active && (
                    <span
                      className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 w-4 rounded-full transition-all duration-200 ${
                        scrolled ? 'bg-electric-500' : 'bg-white'
                      }`}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link to="/contact" className="btn-primary text-sm py-2.5">
              Get Started
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              scrolled
                ? 'text-gray-700 hover:bg-gray-100'
                : 'text-white hover:bg-white/10'
            }`}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-white border-t border-gray-100 px-4 py-4 space-y-1 shadow-lg">
          {navLinks.map(({ to, label }) => {
            const active = isActive(to);
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  active
                    ? 'bg-electric-500/10 text-electric-600 font-semibold'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-navy-900'
                }`}
              >
                {label}
                {active && (
                  <span className="w-1.5 h-1.5 rounded-full bg-electric-500 shrink-0" />
                )}
              </Link>
            );
          })}
          <div className="pt-3 pb-1">
            <Link to="/contact" className="btn-primary w-full justify-center text-sm">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}