import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Code2, Users, TestTube2, Globe,
  Bot, Zap, Shield, Star, ChevronRight, TrendingUp,
  Award, Clock, Sparkles, CheckCircle2
} from 'lucide-react';
import { useScrollRevealAll } from '../hooks/useScrollReveal';

/* ─── Animated Counter ─────────────────────────────────────────── */
function AnimatedCounter({ target, suffix = '', duration = 1800 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const isInfinity = target === '∞';
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          if (isInfinity) { setCount('∞'); return; }
          const numeric = parseFloat(target);
          const start = performance.now();
          const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * numeric));
            if (progress < 1) requestAnimationFrame(tick);
            else setCount(numeric);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ─── Spotlight Card (cursor-glow hover) ───────────────────────── */
function SpotlightCard({ children, className = '' }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`spotlight-card ${className}`}
    >
      {children}
    </div>
  );
}

/* ─── Horizontal Ticker ─────────────────────────────────────────── */
const tickerItems = [
  'Maids', 'Baby Caregivers', 'Elderly Care', 'Cooks', 'Drivers',
  'Patient Care', 'House Surveillance', 'Japa Maids', 'Home Staffing',
];

function Ticker() {
  return (
    <div className="ticker-wrapper overflow-hidden flex" aria-hidden="true">
      <div className="ticker-track flex items-center gap-0 shrink-0">
        {[...tickerItems, ...tickerItems].map((item, i) => (
          <span key={i} className="ticker-item">
            <span className="ticker-dot" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Floating Proof Badge ──────────────────────────────────────── */
function FloatingBadge({ icon, label, value, delay, className }) {
  return (
    <div
      className={`floating-badge animate-fade-in ${className}`}
      style={{ animationDelay: delay, animationFillMode: 'both' }}
    >
      <div className="floating-badge-icon">{icon}</div>
      <div>
        <div className="floating-badge-value">{value}</div>
        <div className="floating-badge-label">{label}</div>
      </div>
    </div>
  );
}

/* ─── Data ──────────────────────────────────────────────────────── */
const services = [
  {
    icon: <Code2 size={22} />,
    title: 'Product Development',
    desc: 'End-to-end SDLC from ideation to launch, scaling with your business.',
    gradient: 'from-electric-600 to-electric-400',
  },
  {
    icon: <Users size={22} />,
    title: 'IT Staffing',
    desc: 'Agile, pre-vetted tech talent matched to your exact project needs.',
    gradient: 'from-electric-500 to-electric-300',
  },
  {
    icon: <TestTube2 size={22} />,
    title: 'QA & Testing',
    desc: '20+ years of experience ensuring quality before it reaches users.',
    gradient: 'from-electric-600 to-electric-400',
  },
  {
    icon: <Globe size={22} />,
    title: 'Web Design',
    desc: 'Responsive, accessible, and visually compelling digital experiences.',
    gradient: 'from-electric-500 to-electric-300',
  },
  {
    icon: <Bot size={22} />,
    title: 'Automation',
    desc: 'Gen AI-integrated frameworks that let any team automate with ease.',
    gradient: 'from-electric-600 to-electric-400',
  },
];

const stats = [
  { value: '30', suffix: '+', label: 'Years Combined Experience', icon: <Award size={18} /> },
  { value: '20', suffix: '+', label: 'QA Expertise (Years)', icon: <Shield size={18} /> },
  { value: '2024', suffix: '', label: 'Year Founded', icon: <Clock size={18} /> },
  { value: '∞', suffix: '', label: 'Ideas Brought to Life', icon: <TrendingUp size={18} /> },
];

const productChips = ['Maids', 'Baby Caregivers', 'Elderly Care', 'Cooks', 'Drivers', 'Patient Care'];

/* ─── Component ─────────────────────────────────────────────────── */
export default function Home() {
  useScrollRevealAll();

  return (
    <>
      {/* Inline styles for elements that need dynamic CSS variables */}
      <style>{`
        /* Spotlight card glow */
        .spotlight-card {
          position: relative;
          background: white;
          border-radius: 1.5rem;
          border: 1px solid #f3f4f6;
          transition: box-shadow 0.3s, transform 0.3s, border-color 0.3s;
          overflow: hidden;
        }
        .spotlight-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: radial-gradient(
            400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
            rgba(26, 141, 232, 0.06),
            transparent 60%
          );
          opacity: 0;
          transition: opacity 0.3s;
          pointer-events: none;
          z-index: 1;
        }
        .spotlight-card:hover::before { opacity: 1; }
        .spotlight-card:hover {
          box-shadow: 0 20px 40px -8px rgba(6, 32, 92, 0.08), 0 0 0 1px rgba(26,141,232,0.15);
          transform: translateY(-4px);
          border-color: rgba(26,141,232,0.2);
        }
        .spotlight-card > * { position: relative; z-index: 2; }

        /* Ticker */
        .ticker-wrapper { mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent); }
        .ticker-track {
          animation: ticker-scroll 28s linear infinite;
          white-space: nowrap;
        }
        .ticker-wrapper:hover .ticker-track { animation-play-state: paused; }
        @keyframes ticker-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ticker-item {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 6px 20px 6px 0;
          color: rgba(255,255,255,0.55);
          font-size: 0.875rem;
          font-weight: 500;
          letter-spacing: 0.01em;
          transition: color 0.2s;
        }
        .ticker-item:hover { color: rgba(255,255,255,0.9); }
        .ticker-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: rgba(67, 168, 242, 0.6);
          flex-shrink: 0;
        }

        /* Floating badge */
        .floating-badge {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255,255,255,0.14);
          border-radius: 14px;
          padding: 10px 14px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.15);
        }
        .floating-badge-icon {
          width: 34px;
          height: 34px;
          border-radius: 9px;
          background: rgba(26,141,232,0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #7BC4F5;
          flex-shrink: 0;
        }
        .floating-badge-value {
          font-size: 0.9375rem;
          font-weight: 700;
          color: white;
          line-height: 1.2;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .floating-badge-label {
          font-size: 0.6875rem;
          color: rgba(255,255,255,0.5);
          line-height: 1.3;
          white-space: nowrap;
        }

        /* Hero mesh orb */
        @keyframes orb-drift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -20px) scale(1.05); }
          66% { transform: translate(-20px, 15px) scale(0.97); }
        }
        .orb-drift { animation: orb-drift 12s ease-in-out infinite; }
        .orb-drift-reverse { animation: orb-drift 16s ease-in-out infinite reverse; }

        /* Service card icon ring */
        .service-icon-ring {
          position: relative;
          width: 52px;
          height: 52px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          flex-shrink: 0;
          transition: transform 0.3s;
        }
        .spotlight-card:hover .service-icon-ring { transform: scale(1.08) rotate(-3deg); }

        /* Stat card shimmer */
        .stat-card {
          position: relative;
          overflow: hidden;
          background: linear-gradient(145deg, #f8fafc, #ffffff);
          border-radius: 1.25rem;
          border: 1px solid #f1f5f9;
          padding: 1.5rem;
          transition: box-shadow 0.3s, border-color 0.3s, transform 0.3s;
        }
        .stat-card:hover {
          border-color: rgba(26,141,232,0.25);
          box-shadow: 0 12px 28px -6px rgba(6,32,92,0.08);
          transform: translateY(-2px);
        }
        .stat-card::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -60%;
          width: 50%;
          height: 200%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent);
          transform: skewX(-20deg);
          transition: left 0.6s ease;
          pointer-events: none;
        }
        .stat-card:hover::after { left: 120%; }

        /* Product chip wave */
        @keyframes chip-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        .product-chip {
          animation: chip-float 3s ease-in-out infinite;
          transition: background 0.2s, border-color 0.2s, color 0.2s;
        }
        .product-chip:hover {
          background: rgba(255,255,255,0.18) !important;
          border-color: rgba(255,255,255,0.35) !important;
          color: white !important;
        }

        /* Wave divider */
        .wave-divider { display: block; line-height: 0; }

        /* CTA section pulse ring */
        @keyframes ring-pulse {
          0% { transform: scale(1); opacity: 0.15; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        .ring-pulse-1 { animation: ring-pulse 3s ease-out infinite; }
        .ring-pulse-2 { animation: ring-pulse 3s ease-out 1s infinite; }

        /* Btn shimmer */
        .btn-shimmer {
          position: relative;
          overflow: hidden;
        }
        .btn-shimmer::after {
          content: '';
          position: absolute;
          top: 0; left: -100%; width: 60%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent);
          transition: left 0.5s ease;
        }
        .btn-shimmer:hover::after { left: 150%; }

        /* Scroll indicator bounce custom */
        @keyframes scroll-bob {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(6px); opacity: 0.8; }
        }
        .scroll-bob { animation: scroll-bob 2s ease-in-out infinite; }

        /* Mesh radial hero accent */
        .hero-mesh {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
        }

        /* Check badge on features */
        @keyframes check-pop {
          0% { transform: scale(0.5) rotate(-20deg); opacity: 0; }
          80% { transform: scale(1.1) rotate(3deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        .check-pop { animation: check-pop 0.4s ease-out both; }
      `}</style>

      <div className="min-h-screen">

        {/* ── Hero ─────────────────────────────────────────────────── */}
        <section className="relative min-h-screen flex items-center bg-hero-gradient overflow-hidden">
          {/* Grid overlay */}
          <div className="absolute inset-0 bg-grid-pattern opacity-15" />

          {/* Animated mesh orbs */}
          <div className="hero-mesh orb-drift w-[500px] h-[500px] bg-white/8 top-1/4 -left-40" />
          <div className="hero-mesh orb-drift-reverse w-[400px] h-[400px] bg-electric-300/20 bottom-1/4 -right-24" />
          <div className="hero-mesh w-[300px] h-[300px] bg-electric-500/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 orb-drift" style={{ animationDelay: '-4s' }} />

          {/* Floating proof badges — desktop only */}
          <div className="hidden lg:block absolute right-[8%] top-[28%]">
            <FloatingBadge
              icon={<Award size={16} />}
              label="Combined Experience"
              value="30+ Years"
              delay="0.8s"
            />
          </div>
          <div className="hidden lg:block absolute right-[10%] top-[46%]">
            <FloatingBadge
              icon={<Shield size={16} />}
              label="QA Expertise"
              value="20+ Years"
              delay="1s"
            />
          </div>
          <div className="hidden lg:block absolute right-[7%] top-[63%]">
            <FloatingBadge
              icon={<Zap size={16} className="fill-current" />}
              label="Founded"
              value="2024"
              delay="1.2s"
            />
          </div>

          {/* Hero content */}
          <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-0">
            <div className="max-w-3xl">

              {/* Badge */}
              <div
                className="inline-flex items-center gap-2 bg-white/8 border border-white/15 rounded-full px-4 py-2 mb-8 animate-fade-in"
                style={{ animationFillMode: 'both' }}
              >
                <Zap size={12} className="text-electric-400 fill-electric-400" />
                <span className="text-white/70 text-xs font-medium tracking-wide">ServEase Innovation & Technology</span>
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              </div>

              {/* Headline */}
              <h1
                className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl text-white leading-[1.06] mb-6 animate-fade-up"
                style={{ animationDelay: '0.1s', animationFillMode: 'both' }}
              >
                Empowering Your{' '}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-white via-electric-100 to-electric-300 bg-clip-text text-transparent">
                    Digital Future
                  </span>
                  {/* Underline accent */}
                  <span
                    className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-electric-400 to-transparent rounded-full animate-slide-in"
                    style={{ width: '100%', animationDelay: '0.7s', animationFillMode: 'both' }}
                  />
                </span>
              </h1>

              {/* Subheadline */}
              <p
                className="text-white/65 text-lg lg:text-xl leading-relaxed mb-10 max-w-xl animate-fade-up"
                style={{ animationDelay: '0.22s', animationFillMode: 'both' }}
              >
                Unleashing the potential of technology for your business. From software development to AI-powered automation — we build the tools that move you forward.
              </p>

              {/* CTAs */}
              <div
                className="flex flex-col sm:flex-row gap-4 mb-14 animate-fade-up"
                style={{ animationDelay: '0.34s', animationFillMode: 'both' }}
              >
                <Link
                  to="/contact"
                  className="btn-primary btn-shimmer text-base py-3.5 px-8 group"
                >
                  Get Started
                  <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 border-2 border-white/25 text-white hover:border-white/60 hover:bg-white/8 font-semibold px-8 py-3.5 rounded-full transition-all duration-200 group"
                >
                  Our Services
                  <ChevronRight size={18} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
              </div>

              {/* Trust chips */}
              <div
                className="flex flex-wrap items-center gap-3 animate-fade-up"
                style={{ animationDelay: '0.46s', animationFillMode: 'both' }}
              >
                {['Product Development', 'QA & Testing', 'IT Staffing', 'Automation', 'Web Design'].map((chip) => (
                  <span
                    key={chip}
                    className="inline-flex items-center gap-1.5 text-white/50 text-xs font-medium border border-white/12 rounded-full px-3 py-1.5 bg-white/5 hover:bg-white/10 hover:text-white/80 transition-colors cursor-default"
                  >
                    <CheckCircle2 size={11} className="text-electric-400" />
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Ticker strip */}
          <div
            className="absolute bottom-16 left-0 right-0 animate-fade-in"
            style={{ animationDelay: '0.6s', animationFillMode: 'both' }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-3">
              <p className="text-white/30 text-xs uppercase tracking-widest font-mono">Services we provide</p>
            </div>
            <Ticker />
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 scroll-bob">
            <div className="w-5 h-8 border border-white/20 rounded-full flex justify-center pt-1.5">
              <div className="w-0.5 h-2 bg-white/40 rounded-full" />
            </div>
          </div>
        </section>

        {/* Wave divider */}
        <svg className="wave-divider" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 48" preserveAspectRatio="none">
          <path d="M0,48 L0,24 C240,0 480,48 720,24 C960,0 1200,48 1440,24 L1440,48 Z" fill="white" />
        </svg>

        {/* ── About Strip ────────────────────────────────────────── */}
        <section className="bg-white py-20 lg:py-28 -mt-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">

              <div className="reveal">
                <span className="section-label">
                  <Zap size={12} className="fill-electric-500" /> About ServEase
                </span>
                <h2 className="section-title mb-6">
                  We make your ideas{' '}
                  <span className="gradient-text">work for you</span>
                </h2>
                <p className="text-gray-500 leading-relaxed mb-5">
                  Founded in 2024, ServEase Innovation & Technology has quickly established itself as a trusted partner for businesses worldwide. Our founders bring over 30 years of collective IT expertise, building solutions that are reliable, scalable, and human-centered.
                </p>
                <p className="text-gray-500 leading-relaxed mb-8">
                  We believe technology should serve people — not the other way around. That's why every solution we deliver is tailored to meet the unique goals of each client.
                </p>

                {/* Mini feature list */}
                <ul className="space-y-2.5 mb-8">
                  {['End-to-end product development', 'Pre-vetted IT talent network', 'Award-winning QA & automation'].map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-gray-600">
                      <div className="w-5 h-5 rounded-full bg-electric-500/10 flex items-center justify-center shrink-0">
                        <CheckCircle2 size={12} className="text-electric-500" />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>

                <Link to="/who-we-are" className="btn-outline btn-shimmer group">
                  Meet the Team
                  <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>

              {/* Animated Stats grid */}
              <div className="grid grid-cols-2 gap-4 reveal">
                {stats.map(({ value, suffix, label, icon }) => (
                  <div key={label} className="stat-card">
                    <div className="flex items-center gap-2 text-electric-500 mb-3">
                      {icon}
                    </div>
                    <div className="font-display font-bold text-3xl text-navy-900 mb-1">
                      <AnimatedCounter target={value} suffix={suffix} />
                    </div>
                    <div className="text-gray-500 text-sm leading-snug">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Services Preview ───────────────────────────────────── */}
        <section className="bg-gray-50 py-20 lg:py-28 relative overflow-hidden">
          {/* Decorative background blob */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-electric-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-navy-900/3 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center mb-16 reveal">
              <span className="section-label justify-center">
                <Code2 size={12} /> What We Do
              </span>
              <h2 className="section-title mb-4">
                Services built to <span className="gradient-text">scale with you</span>
              </h2>
              <p className="section-subtitle mx-auto text-center text-gray-500">
                From initial concept to live product, our team covers every layer of the technology stack.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {services.map(({ icon, title, desc, gradient }, i) => (
                <SpotlightCard
                  key={title}
                  className="reveal p-6 group"
                  style={{ transitionDelay: `${i * 70}ms` }}
                >
                  {/* Icon */}
                  <div className={`service-icon-ring bg-gradient-to-br ${gradient} text-white shadow-lg shadow-electric-500/20 mb-4`}>
                    {icon}
                  </div>

                  <h3 className="font-display font-semibold text-navy-900 text-lg mb-2">{title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-5">{desc}</p>

                  <Link
                    to="/services"
                    className="inline-flex items-center gap-1.5 text-electric-500 text-sm font-medium group-hover:gap-2.5 transition-all duration-200"
                  >
                    Learn more <ArrowRight size={14} />
                  </Link>
                </SpotlightCard>
              ))}

              {/* Dark CTA card */}
              <div
                className="bg-gradient-to-br from-navy-900 to-navy-800 rounded-3xl p-6 flex flex-col justify-between reveal sm:col-span-2 lg:col-span-1 relative overflow-hidden group"
                style={{ transitionDelay: `${services.length * 70}ms` }}
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-electric-500/10 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-electric-300/5 rounded-full blur-xl pointer-events-none" />
                <div className="relative">
                  <div className="w-11 h-11 bg-white/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-white/15 transition-colors">
                    <Star size={20} className="text-gold-400 fill-gold-400" />
                  </div>
                  <h3 className="font-display font-semibold text-white text-lg mb-2">Ready to transform?</h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-6">
                    Every great product starts with a conversation. Let's talk about yours.
                  </p>
                </div>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-white text-navy-900 font-semibold px-5 py-2.5 rounded-full text-sm hover:bg-electric-300 transition-colors w-fit group relative"
                >
                  Contact Us <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            <div className="text-center mt-10 reveal">
              <Link to="/services" className="btn-outline inline-flex group">
                View All Services
                <ChevronRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── Product Teaser ─────────────────────────────────────── */}
        <section className="bg-white py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 rounded-3xl overflow-hidden relative">
              {/* Grid + glows */}
              <div className="absolute inset-0 bg-grid-pattern opacity-20" />
              <div className="absolute top-0 right-0 w-80 h-80 bg-electric-500/15 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-electric-300/8 rounded-full blur-3xl pointer-events-none" />

              <div className="relative p-10 lg:p-16 grid lg:grid-cols-2 gap-12 items-center">
                {/* Copy */}
                <div className="reveal">
                  <div className="inline-flex items-center gap-2 bg-electric-500/15 border border-electric-500/20 rounded-full px-3 py-1.5 mb-5">
                    <Sparkles size={12} className="text-electric-400" />
                    <span className="text-electric-300 text-xs font-semibold tracking-wide">Our Flagship Product</span>
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-4 leading-tight">
                    Introducing{' '}
                    <span className="bg-gradient-to-r from-electric-400 to-electric-200 bg-clip-text text-transparent">
                      ServEaso
                    </span>
                  </h2>
                  <p className="text-white/55 leading-relaxed mb-8">
                    A location-based home care service application launching in the Indian market. Connecting busy professionals, parents, and the elderly with trusted, vetted household help — on demand.
                  </p>

                  <div className="flex items-center gap-3 mb-8">
                    <div className="flex -space-x-2">
                      {['B', 'K', 'D'].map((l) => (
                        <div key={l} className="w-8 h-8 rounded-full bg-gradient-to-br from-electric-500 to-electric-300 flex items-center justify-center text-white text-xs font-bold border-2 border-navy-900">
                          {l}
                        </div>
                      ))}
                    </div>
                    <span className="text-white/50 text-sm">Launching in Bangalore & Dubai</span>
                  </div>

                  <Link
                    to="/product"
                    className="inline-flex items-center gap-2 bg-white text-navy-900 font-semibold px-6 py-3 rounded-full hover:bg-electric-300 transition-colors btn-shimmer group"
                  >
                    Explore ServEaso
                    <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </div>

                {/* Chips with staggered wave float */}
                <div className="grid grid-cols-2 gap-3 reveal">
                  {productChips.map((item, i) => (
                    <div
                      key={item}
                      className="product-chip bg-white/8 border border-white/10 rounded-2xl px-4 py-3 text-white/65 text-sm font-medium cursor-default"
                      style={{ animationDelay: `${i * 0.4}s` }}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA Section ────────────────────────────────────────── */}
        <section className="bg-gray-50 py-20 lg:py-28 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-50" />

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center reveal">
            {/* Pulse rings */}
            <div className="relative inline-flex items-center justify-center mb-8">
              <div className="absolute w-20 h-20 bg-electric-500/20 rounded-full ring-pulse-1" />
              <div className="absolute w-20 h-20 bg-electric-500/15 rounded-full ring-pulse-2" />
              <div className="relative w-14 h-14 bg-gradient-to-br from-electric-600 to-electric-400 rounded-2xl flex items-center justify-center shadow-lg shadow-electric-500/30">
                <Zap size={24} className="text-white fill-white" />
              </div>
            </div>

            <h2 className="text-3xl lg:text-4xl font-display font-bold text-navy-900 mb-4">
              Ready to build something{' '}
              <span className="gradient-text">extraordinary?</span>
            </h2>
            <p className="text-gray-500 mb-10 leading-relaxed max-w-xl mx-auto">
              Book a free consultation and we'll map your needs to the right solution — no commitment required.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn-primary btn-shimmer text-base py-3.5 px-8 group">
                Start a Conversation
                <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
              <Link to="/services" className="btn-outline text-base py-3.5 px-8 group">
                Explore Services
                <ChevronRight size={18} className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </div>

            {/* Trust line */}
            <p className="mt-8 text-gray-400 text-sm flex items-center justify-center gap-2">
              <Shield size={13} className="text-electric-400" />
              No commitment required · Respond within 24 hours
            </p>
          </div>
        </section>

      </div>
    </>
  );
}