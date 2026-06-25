import { Link } from 'react-router-dom';
import { Zap, Mail, Phone, MapPin } from 'lucide-react';

const footerLinks = {
  Company: [
    { to: '/who-we-are', label: 'Who We Are' },
    { to: '/careers', label: 'Careers' },
    { to: '/contact', label: 'Contact Us' },
  ],
  Services: [
    { to: '/services', label: 'Product Development' },
    { to: '/services', label: 'IT Staffing' },
    { to: '/services', label: 'QA & Testing' },
    { to: '/services', label: 'Web Design' },
    { to: '/services', label: 'Automation' },
  ],
  Product: [
    { to: '/product', label: 'ServEaso' },
    { to: '/product', label: 'Mandi System' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-white">

      {/* ── Top CTA strip ──────────────────────────────────────── */}
      <div className="border-b border-white/10 bg-gradient-to-r from-electric-500/20 to-electric-300/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col items-center text-center gap-5 md:flex-row md:justify-between md:text-left">
          <div>
            <h3 className="font-display font-bold text-xl mb-1">
              Ready to empower your digital future?
            </h3>
            <p className="text-white/60 text-sm">
              Let's build something extraordinary together.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-white text-navy-900 font-semibold px-6 py-3 rounded-full hover:bg-electric-300 hover:text-navy-900 transition-colors duration-200 whitespace-nowrap shrink-0"
          >
            Start a Conversation
          </Link>
        </div>
      </div>

      {/* ── Main footer ────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-5">

          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-2 text-center sm:text-left">
            <Link to="/" className="inline-flex items-center gap-2 mb-5">
              <div className="w-9 h-9 bg-gradient-to-br from-electric-600 to-electric-400 rounded-lg flex items-center justify-center shrink-0">
                <Zap size={18} className="text-white fill-white" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display font-bold text-white tracking-tight">
                  ServEase
                </span>
                <span className="font-mono text-electric-300 text-[9px] tracking-widest uppercase font-medium">
                  Innovation
                </span>
              </div>
            </Link>

            <p className="text-white/55 text-sm leading-relaxed mb-6 max-w-xs mx-auto sm:mx-0">
              Empowering your digital future. We turn ideas into scalable technology solutions for businesses of all sizes.
            </p>

            <div className="space-y-3 flex flex-col items-center sm:items-start">
              <a
                href="tel:+918040906245"
                className="flex items-center gap-3 text-white/55 hover:text-white text-sm transition-colors"
              >
                <Phone size={14} className="text-electric-400 shrink-0" />
                +91 80 4090 6245
              </a>
              <a
                href="mailto:info@serveaseinnovation.com"
                className="flex items-center gap-3 text-white/55 hover:text-white text-sm transition-colors"
              >
                <Mail size={14} className="text-electric-400 shrink-0" />
                info@serveaseinnovation.com
              </a>
              <div className="flex items-center gap-3 text-white/55 text-sm">
                <MapPin size={14} className="text-electric-400 shrink-0" />
                Bangalore, India
              </div>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading} className="text-center sm:text-left">
              <h4 className="font-display font-semibold text-white text-sm mb-5 tracking-wide">
                {heading}
              </h4>
              <ul className="space-y-3">
                {links.map(({ to, label }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      className="text-white/50 hover:text-white text-sm transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom bar ─────────────────────────────────────────── */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="text-white/40 text-xs text-center sm:text-left">
            © {new Date().getFullYear()} Saneha ServEase Talent Tap Group — All Rights Reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="text-white/40 hover:text-electric-400 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter / X"
              className="text-white/40 hover:text-electric-400 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

    </footer>
  );
}