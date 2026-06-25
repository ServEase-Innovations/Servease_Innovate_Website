import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Zap } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/product', label: 'Product' },
  { to: '/who-we-are', label: 'Who We Are' },
  { to: '/careers', label: 'Careers' },
  { to: '/contact', label: 'Contact' },
];

// Animated shimmer border gradient
const ShimmerBorder = () => (
  <motion.div
    className="absolute inset-0 rounded-full pointer-events-none"
    style={{
      background:
        'linear-gradient(105deg, transparent 20%, rgba(99,202,255,0.18) 40%, rgba(139,92,246,0.12) 55%, transparent 70%)',
      backgroundSize: '200% 100%',
    }}
    animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
    transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
  />
);

// Cursor-following spotlight inside the navbar
function CursorSpotlight({ containerRef }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 30 });
  const springY = useSpring(y, { stiffness: 200, damping: 30 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const move = (e) => {
      const rect = el.getBoundingClientRect();
      x.set(e.clientX - rect.left);
      y.set(e.clientY - rect.top);
    };
    el.addEventListener('mousemove', move);
    el.addEventListener('mouseenter', () => setVisible(true));
    el.addEventListener('mouseleave', () => setVisible(false));
    return () => {
      el.removeEventListener('mousemove', move);
    };
  }, [containerRef, x, y]);

  return (
    <motion.div
      className="pointer-events-none absolute rounded-full"
      style={{
        width: 220,
        height: 220,
        left: springX,
        top: springY,
        x: '-50%',
        y: '-50%',
        background:
          'radial-gradient(circle, rgba(99,202,255,0.10) 0%, rgba(139,92,246,0.05) 50%, transparent 70%)',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.3s',
      }}
    />
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const location = useLocation();
  const navRef = useRef(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const diff = currentY - lastScrollY.current;

      setScrolled(currentY > 30);

      if (currentY > 80) {
        if (diff > 8) {
          setHidden(true);
          setIsOpen(false);
        } else if (diff < -4) {
          setHidden(false);
        }
      } else {
        setHidden(false);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const isActive = (to) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);

  // Glass style changes with scroll
  const glassBackground = scrolled
    ? 'rgba(8, 14, 28, 0.82)'
    : 'rgba(10, 18, 36, 0.75)';
  const blurAmount = scrolled ? '28px' : '20px';

  return (
    <>
      {/* Inject keyframes for the gradient border glow */}
      <style>{`
        @keyframes gradientSpin {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .nav-glow-border::before {
          content: '';
          position: absolute;
          inset: -1px;
          border-radius: 9999px;
          padding: 1px;
          background: linear-gradient(
            135deg,
            rgba(99,202,255,0.55) 0%,
            rgba(139,92,246,0.35) 35%,
            rgba(56,189,248,0.20) 60%,
            rgba(99,202,255,0.55) 100%
          );
          background-size: 300% 300%;
          animation: gradientSpin 6s ease infinite;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: destination-out;
          mask-composite: exclude;
          pointer-events: none;
        }
        .mobile-glass {
          background: rgba(8, 14, 28, 0.92);
          backdrop-filter: blur(32px) saturate(180%);
          -webkit-backdrop-filter: blur(32px) saturate(180%);
          border: 1px solid rgba(99,202,255,0.13);
        }
      `}</style>

      {/* ── Navbar ── */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-50 flex justify-center"
        animate={{
          paddingTop: scrolled ? '10px' : '18px',
          y: hidden ? '-110%' : 0,
          opacity: hidden ? 0 : 1,
        }}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        initial={{ y: -80, opacity: 0 }}
      >
        <motion.nav
          ref={navRef}
          className="nav-glow-border relative overflow-hidden"
          style={{
            width: scrolled ? 'calc(100% - 40px)' : 'calc(100% - 64px)',
            maxWidth: scrolled ? '1100px' : '1000px',
            borderRadius: '9999px',
            background: glassBackground,
            backdropFilter: `blur(${blurAmount}) saturate(180%)`,
            WebkitBackdropFilter: `blur(${blurAmount}) saturate(180%)`,
            boxShadow: scrolled
              ? '0 8px 40px rgba(0,0,0,0.55), 0 0 0 1px rgba(99,202,255,0.10), inset 0 1px 0 rgba(255,255,255,0.06)'
              : '0 4px 24px rgba(0,0,0,0.40), 0 0 0 1px rgba(99,202,255,0.10), inset 0 1px 0 rgba(255,255,255,0.08)',
          }}
          animate={{
            width: scrolled ? 'calc(100% - 40px)' : 'calc(100% - 64px)',
            maxWidth: scrolled ? '1100px' : '1000px',
            opacity: 1,
            scale: 1,
          }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          initial={{ opacity: 0, scale: 0.95 }}
        >
          {/* Cursor spotlight */}
          <CursorSpotlight containerRef={navRef} />

          {/* Shimmer sweep */}
          <ShimmerBorder />

          {/* Inner highlight line at top */}
          <div
            className="pointer-events-none absolute top-0 left-8 right-8 h-px"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(255,255,255,0.18) 30%, rgba(99,202,255,0.22) 60%, transparent)',
            }}
          />

          <div className="px-5 sm:px-6">
            <div
              className="flex items-center justify-between"
              style={{ height: scrolled ? '52px' : '60px', transition: 'height 0.4s ease' }}
            >
              {/* ── Logo ── */}
              <Link to="/" className="flex items-center gap-2.5 group shrink-0">
                <motion.div
                  className="relative flex items-center justify-center rounded-xl"
                  style={{
                    width: 34,
                    height: 34,
                    background: 'linear-gradient(135deg, #38bdf8 0%, #818cf8 100%)',
                    boxShadow: '0 0 16px rgba(56,189,248,0.40)',
                  }}
                  whileHover={{ scale: 1.08, boxShadow: '0 0 28px rgba(56,189,248,0.65)' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                  <Zap size={15} className="text-white fill-white" />
                </motion.div>
                <div className="flex flex-col leading-none">
                  <span className="font-bold text-[13px] tracking-tight text-white">
                    ServEase
                  </span>
                  <span
                    className="text-[8px] tracking-[0.2em] uppercase font-medium"
                    style={{ color: '#38bdf8' }}
                  >
                    Innovation
                  </span>
                </div>
              </Link>

              {/* ── Desktop Links ── */}
              <div className="hidden lg:flex items-center gap-0.5">
                {navLinks.map(({ to, label }) => {
                  const active = isActive(to);
                  return (
                    <Link
                      key={to}
                      to={to}
                      onMouseEnter={() => setHoveredLink(to)}
                      onMouseLeave={() => setHoveredLink(null)}
                      className="relative px-3.5 py-2 rounded-full text-[13px] font-medium transition-colors duration-200 select-none"
                      style={{
                        color: active
                          ? '#e0f2fe'
                          : hoveredLink === to
                          ? 'rgba(255,255,255,0.90)'
                          : 'rgba(255,255,255,0.58)',
                      }}
                    >
                      {/* Hover / active background pill */}
                      <AnimatePresence>
                        {(active || hoveredLink === to) && (
                          <motion.span
                            layoutId="nav-pill"
                            className="absolute inset-0 rounded-full"
                            style={{
                              background: active
                                ? 'rgba(56,189,248,0.14)'
                                : 'rgba(255,255,255,0.07)',
                              border: active
                                ? '1px solid rgba(56,189,248,0.25)'
                                : '1px solid rgba(255,255,255,0.08)',
                            }}
                            initial={{ opacity: 0, scale: 0.92 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.92 }}
                            transition={{ duration: 0.18, ease: 'easeOut' }}
                          />
                        )}
                      </AnimatePresence>

                      <span className="relative z-10">{label}</span>

                      {/* Active dot */}
                      {active && (
                        <motion.span
                          layoutId="active-dot"
                          className="absolute bottom-1 left-1/2 -translate-x-1/2 rounded-full"
                          style={{
                            width: 3,
                            height: 3,
                            background: '#38bdf8',
                            boxShadow: '0 0 6px rgba(56,189,248,0.8)',
                          }}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                        />
                      )}
                    </Link>
                  );
                })}
              </div>

              {/* ── CTA ── */}
              <div className="hidden lg:flex items-center shrink-0">
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    to="/contact"
                    className="relative inline-flex items-center px-5 py-2.5 rounded-full text-[13px] font-semibold text-white overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%)',
                      boxShadow:
                        '0 0 20px rgba(14,165,233,0.35), inset 0 1px 0 rgba(255,255,255,0.20)',
                    }}
                  >
                    {/* Shine sweep on hover */}
                    <motion.span
                      className="pointer-events-none absolute inset-0 rounded-full"
                      style={{
                        background:
                          'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.18) 50%, transparent 70%)',
                        backgroundSize: '200% 100%',
                      }}
                      animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
                    />
                    <span className="relative z-10">Get Started</span>
                  </Link>
                </motion.div>
              </div>

              {/* ── Mobile toggle ── */}
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2 rounded-full text-white/70 hover:text-white"
                style={{ background: 'rgba(255,255,255,0.07)' }}
                whileTap={{ scale: 0.92 }}
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isOpen ? (
                    <motion.span
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.18 }}
                    >
                      <X size={20} />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.18 }}
                    >
                      <Menu size={20} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </motion.nav>
      </motion.div>

      {/* ── Mobile Menu (dropdown beneath pill) ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="lg:hidden fixed z-40"
            style={{ top: scrolled ? 76 : 96, left: 20, right: 20 }}
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            <div
              className="mobile-glass rounded-3xl overflow-hidden"
              style={{
                boxShadow:
                  '0 20px 60px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)',
              }}
            >
              {/* Top shimmer */}
              <div
                className="h-px mx-6"
                style={{
                  background:
                    'linear-gradient(90deg, transparent, rgba(56,189,248,0.30), transparent)',
                }}
              />

              <div className="px-3 py-3 space-y-0.5">
                {navLinks.map(({ to, label }, i) => {
                  const active = isActive(to);
                  return (
                    <motion.div
                      key={to}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.2 }}
                    >
                      <Link
                        to={to}
                        className="flex items-center justify-between px-4 py-3 rounded-2xl text-[13px] font-medium transition-all duration-200"
                        style={{
                          background: active
                            ? 'rgba(56,189,248,0.12)'
                            : 'transparent',
                          color: active ? '#e0f2fe' : 'rgba(255,255,255,0.62)',
                          border: active
                            ? '1px solid rgba(56,189,248,0.20)'
                            : '1px solid transparent',
                        }}
                      >
                        {label}
                        {active && (
                          <motion.span
                            layoutId="mobile-dot"
                            className="w-1.5 h-1.5 rounded-full shrink-0"
                            style={{
                              background: '#38bdf8',
                              boxShadow: '0 0 6px rgba(56,189,248,0.8)',
                            }}
                          />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}

                <div className="px-1 pt-2 pb-1">
                  <Link
                    to="/contact"
                    className="flex items-center justify-center w-full py-3 rounded-2xl text-[13px] font-semibold text-white"
                    style={{
                      background: 'linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%)',
                      boxShadow: '0 0 20px rgba(14,165,233,0.30)',
                    }}
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}