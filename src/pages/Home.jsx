import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Code2, Users, TestTube2, Globe,
  Bot, Zap, Shield, Star, ChevronRight, TrendingUp,
  Award, Clock, Sparkles, CheckCircle2,
  Home as HomeIcon, User, Heart, ChefHat, Car
} from 'lucide-react';
import DotField from '../components/DotField';

/* ─── GSAP lazy loader ──────────────────────────────────────────── */
let gsapCache = null;
async function loadGSAP() {
  if (gsapCache) return gsapCache;
  const [{ gsap }, { ScrollTrigger }] = await Promise.all([
    import('https://esm.sh/gsap@3.12.5'),
    import('https://esm.sh/gsap@3.12.5/ScrollTrigger'),
  ]);
  gsap.registerPlugin(ScrollTrigger);
  gsapCache = { gsap, ScrollTrigger };
  return gsapCache;
}

/* ─── useGSAP hook ──────────────────────────────────────────────── */
function useGSAP(callback, deps = []) {
  const ctx = useRef(null);
  useEffect(() => {
    let cleanup;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    loadGSAP().then(({ gsap, ScrollTrigger }) => {
      ctx.current = gsap.context(() => {
        cleanup = callback({ gsap, ScrollTrigger, prefersReduced });
      });
    });

    return () => {
      ctx.current?.revert();
      if (typeof cleanup === 'function') cleanup();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

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

/* ─── Spotlight Card ────────────────────────────────────────────── */
function SpotlightCard({ children, className = '' }) {
  const cardRef = useRef(null);
  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };
  return (
    <div ref={cardRef} onMouseMove={handleMouseMove} className={`spotlight-card ${className}`}>
      {children}
    </div>
  );
}

/* ─── Ticker ─────────────────────────────────────────────────────── */
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

/* ─── Floating Badge ─────────────────────────────────────────────── */
function FloatingBadge({ icon, label, value, delay, className }) {
  return (
    <div
      className={`floating-badge gs-badge ${className}`}
      style={{ '--badge-delay': delay }}
    >
      <div className="floating-badge-icon">{icon}</div>
      <div>
        <div className="floating-badge-value">{value}</div>
        <div className="floating-badge-label">{label}</div>
      </div>
    </div>
  );
}

/* ─── Data ───────────────────────────────────────────────────────── */
const services = [
  { icon: <Code2 size={22} />, title: 'Product Development', desc: 'End-to-end SDLC from ideation to launch, scaling with your business.', gradient: 'from-electric-600 to-electric-400' },
  { icon: <Users size={22} />, title: 'IT Staffing', desc: 'Agile, pre-vetted tech talent matched to your exact project needs.', gradient: 'from-electric-500 to-electric-300' },
  { icon: <TestTube2 size={22} />, title: 'QA & Testing', desc: '20+ years of experience ensuring quality before it reaches users.', gradient: 'from-electric-600 to-electric-400' },
  { icon: <Globe size={22} />, title: 'Web Design', desc: 'Responsive, accessible, and visually compelling digital experiences.', gradient: 'from-electric-500 to-electric-300' },
  { icon: <Bot size={22} />, title: 'Automation', desc: 'Gen AI-integrated frameworks that let any team automate with ease.', gradient: 'from-electric-600 to-electric-400' },
];

const stats = [
  { value: '30', suffix: '+', label: 'Years Combined Experience', icon: <Award size={18} /> },
  { value: '20', suffix: '+', label: 'QA Expertise (Years)', icon: <Shield size={18} /> },
  { value: '2024', suffix: '', label: 'Year Founded', icon: <Clock size={18} /> },
  { value: '∞', suffix: '', label: 'Ideas Brought to Life', icon: <TrendingUp size={18} /> },
];

const productChips = [
  { label: 'Maids', icon: <HomeIcon size={14} /> },
  { label: 'Baby Caregivers', icon: <User size={14} /> },
  { label: 'Elderly Care', icon: <Heart size={14} /> },
  { label: 'Cooks', icon: <ChefHat size={14} /> },
  { label: 'Drivers', icon: <Car size={14} /> },
  { label: 'Patient Care', icon: <Shield size={14} /> },
];

/* ─── Main Component ─────────────────────────────────────────────── */
export default function Home() {
  /* refs for GSAP targets */
  const heroRef       = useRef(null);
  const heroBadgeRef  = useRef(null);
  const heroH1Ref     = useRef(null);
  const heroSubRef    = useRef(null);
  const heroCTARef    = useRef(null);
  const heroChipsRef  = useRef(null);
  const orb1Ref       = useRef(null);
  const orb2Ref       = useRef(null);
  const aboutRef      = useRef(null);
  const servicesRef   = useRef(null);
  const productRef    = useRef(null);
  const ctaRef        = useRef(null);

  /* ── GSAP animations ── */
  useGSAP(({ gsap, ScrollTrigger, prefersReduced }) => {
    if (prefersReduced) return;

    /* Helper: fade-up stagger for a list of elements */
    const fadeUp = (targets, trigger, { delay = 0, stagger = 0.08, y = 36, duration = 0.75 } = {}) => {
      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          stagger,
          ease: 'power3.out',
          scrollTrigger: { trigger, start: 'top 82%', once: true },
        }
      );
    };

    /* ── HERO entrance ── */
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    heroTl
      .fromTo(heroBadgeRef.current,  { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, 0.3)
      .fromTo(heroH1Ref.current,     { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8 }, 0.5)
      .fromTo(heroSubRef.current,    { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.7 }, 0.72)
      .fromTo(heroCTARef.current,    { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6 }, 0.9)
      .fromTo(heroChipsRef.current,  { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5 }, 1.05);

    /* Floating badges staggered */
    gsap.fromTo('.gs-badge',
      { opacity: 0, x: 24 },
      { opacity: 1, x: 0, duration: 0.6, stagger: 0.18, ease: 'power2.out', delay: 1.1 }
    );

    /* ── ORB parallax on scroll ── */
    if (orb1Ref.current) {
      gsap.to(orb1Ref.current, {
        y: -120,
        ease: 'none',
        scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: 1.5 },
      });
    }
    if (orb2Ref.current) {
      gsap.to(orb2Ref.current, {
        y: 80,
        ease: 'none',
        scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: 2 },
      });
    }

    /* ── ABOUT section ── */
    if (aboutRef.current) {
      const left  = aboutRef.current.querySelector('.gs-about-left');
      const right = aboutRef.current.querySelector('.gs-about-right');
      const items = aboutRef.current.querySelectorAll('.gs-about-item');
      const statCards = aboutRef.current.querySelectorAll('.gs-stat');

      if (left) gsap.fromTo(left,  { opacity: 0, x: -48 }, { opacity: 1, x: 0, duration: 0.85, ease: 'power3.out', scrollTrigger: { trigger: left,  start: 'top 80%', once: true } });
      if (right) gsap.fromTo(right, { opacity: 0, x:  48 }, { opacity: 1, x: 0, duration: 0.85, ease: 'power3.out', scrollTrigger: { trigger: right, start: 'top 80%', once: true } });

      if (items.length) fadeUp(items, aboutRef.current, { stagger: 0.07, y: 20 });

      /* Stat cards scale-up with stagger */
      if (statCards.length) {
        gsap.fromTo(statCards,
          { opacity: 0, scale: 0.88, y: 24 },
          {
            opacity: 1, scale: 1, y: 0,
            duration: 0.6, stagger: 0.1, ease: 'back.out(1.4)',
            scrollTrigger: { trigger: aboutRef.current.querySelector('.gs-stats-grid'), start: 'top 82%', once: true },
          }
        );
      }
    }

    /* ── SERVICES section ── */
    if (servicesRef.current) {
      const heading = servicesRef.current.querySelector('.gs-services-heading');
      const cards   = servicesRef.current.querySelectorAll('.gs-service-card');
      const cta     = servicesRef.current.querySelector('.gs-services-cta');

      if (heading) fadeUp([heading], servicesRef.current, { y: 32 });

      if (cards.length) {
        gsap.fromTo(cards,
          { opacity: 0, y: 48, scale: 0.95 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.65, stagger: 0.09, ease: 'power3.out',
            scrollTrigger: { trigger: servicesRef.current, start: 'top 75%', once: true },
          }
        );
      }
      if (cta) fadeUp([cta], servicesRef.current, { delay: 0.4, y: 20 });
    }

    /* ── PRODUCT section ── */
    if (productRef.current) {
      const copy  = productRef.current.querySelector('.gs-product-copy');
      const chips = productRef.current.querySelectorAll('.gs-chip');

      if (copy) {
        gsap.fromTo(copy,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: copy, start: 'top 80%', once: true } }
        );
      }
      if (chips.length) {
        gsap.fromTo(chips,
          { opacity: 0, scale: 0.8, y: 24 },
          {
            opacity: 1, scale: 1, y: 0,
            duration: 0.5, stagger: 0.07, ease: 'back.out(1.5)',
            scrollTrigger: { trigger: productRef.current, start: 'top 76%', once: true },
          }
        );
      }

      /* Subtle parallax on the decorative orb inside product teaser */
      const innerOrb = productRef.current.querySelector('.gs-product-orb');
      if (innerOrb) {
        gsap.to(innerOrb, {
          y: -60,
          ease: 'none',
          scrollTrigger: { trigger: productRef.current, start: 'top bottom', end: 'bottom top', scrub: 2 },
        });
      }
    }

    /* ── CTA section ── */
    if (ctaRef.current) {
      const ring1   = ctaRef.current.querySelector('.gs-ring-1');
      const ring2   = ctaRef.current.querySelector('.gs-ring-2');
      const content = ctaRef.current.querySelector('.gs-cta-content');
      const btns    = ctaRef.current.querySelectorAll('.gs-cta-btn');

      if (content) fadeUp([content], ctaRef.current, { y: 36 });

      /* Pulsing rings re-implemented via GSAP for more control */
      if (ring1 && ring2) {
        gsap.fromTo([ring1, ring2],
          { scale: 1, opacity: 0.15 },
          {
            scale: 1.6, opacity: 0,
            duration: 2.5, stagger: 1,
            ease: 'power1.out',
            repeat: -1,
            scrollTrigger: { trigger: ctaRef.current, start: 'top 85%' },
          }
        );
      }

      if (btns.length) {
        gsap.fromTo(btns,
          { opacity: 0, y: 18 },
          {
            opacity: 1, y: 0, duration: 0.55, stagger: 0.1, ease: 'power2.out',
            scrollTrigger: { trigger: ctaRef.current, start: 'top 82%', once: true },
          }
        );
      }
    }

    /* ── Wave divider parallax ── */
    const wave = document.querySelector('.gs-wave');
    if (wave) {
      gsap.to(wave, {
        y: -16,
        ease: 'none',
        scrollTrigger: { trigger: wave, start: 'top bottom', end: 'bottom top', scrub: 1 },
      });
    }

  }, []);

  return (
    <>
      <style>{`
        /* ── Spotlight card ── */
        .spotlight-card {
          position: relative;
          background: rgba(255, 255, 255, 0.06);
          backdrop-filter: blur(10px);
          border-radius: 1.5rem;
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: box-shadow 0.3s, transform 0.3s, border-color 0.3s;
          overflow: hidden;
          will-change: transform;
        }
        .spotlight-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: radial-gradient(400px circle at var(--mouse-x,50%) var(--mouse-y,50%), rgba(26,141,232,0.12), transparent 60%);
          opacity: 0;
          transition: opacity 0.3s;
          pointer-events: none;
          z-index: 1;
        }
        .spotlight-card:hover::before { opacity: 1; }
        .spotlight-card:hover {
          box-shadow: 0 20px 40px -8px rgba(0,0,0,0.3), 0 0 0 1px rgba(26,141,232,0.15);
          transform: translateY(-4px);
          border-color: rgba(26,141,232,0.2);
        }
        .spotlight-card > * { position: relative; z-index: 2; }

        /* ── Ticker ── */
        .ticker-wrapper { mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent); }
        .ticker-track { animation: ticker-scroll 28s linear infinite; white-space: nowrap; }
        .ticker-wrapper:hover .ticker-track { animation-play-state: paused; }
        @keyframes ticker-scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .ticker-item { display: inline-flex; align-items: center; gap: 10px; padding: 6px 20px 6px 0; color: rgba(255,255,255,0.55); font-size: 0.875rem; font-weight: 500; letter-spacing: 0.01em; transition: color 0.2s; }
        .ticker-item:hover { color: rgba(255,255,255,0.9); }
        .ticker-dot { width: 4px; height: 4px; border-radius: 50%; background: rgba(67,168,242,0.6); flex-shrink: 0; }

        /* ── Floating badge ── */
        .floating-badge {
          display: flex; align-items: center; gap: 10px;
          background: rgba(255,255,255,0.08); backdrop-filter: blur(16px);
          border: 1px solid rgba(255,255,255,0.14); border-radius: 14px;
          padding: 10px 14px; box-shadow: 0 8px 32px rgba(0,0,0,0.15);
          opacity: 0;
        }
        .floating-badge-icon { width: 34px; height: 34px; border-radius: 9px; background: rgba(26,141,232,0.25); display: flex; align-items: center; justify-content: center; color: #7BC4F5; flex-shrink: 0; }
        .floating-badge-value { font-size: 0.9375rem; font-weight: 700; color: white; line-height: 1.2; font-family: 'Plus Jakarta Sans', sans-serif; }
        .floating-badge-label { font-size: 0.6875rem; color: rgba(255,255,255,0.5); line-height: 1.3; white-space: nowrap; }

        /* ── Orb ── */
        .hero-mesh { position: absolute; border-radius: 50%; filter: blur(80px); pointer-events: none; }
        @keyframes orb-drift { 0%,100% { transform: translate(0,0) scale(1); } 33% { transform: translate(30px,-20px) scale(1.05); } 66% { transform: translate(-20px,15px) scale(0.97); } }
        .orb-drift { animation: orb-drift 12s ease-in-out infinite; }

        /* ── Hero initial hidden state ── */
        .gs-hero-hidden { opacity: 0; }

        /* ── Service icon ring ── */
        .service-icon-ring { position: relative; width: 52px; height: 52px; border-radius: 14px; display: flex; align-items: center; justify-content: center; overflow: hidden; flex-shrink: 0; transition: transform 0.3s; }
        .spotlight-card:hover .service-icon-ring { transform: scale(1.08) rotate(-3deg); }

        /* ── Stat card ── */
        .stat-card {
          position: relative;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.06);
          backdrop-filter: blur(10px);
          border-radius: 1.25rem;
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 1.5rem;
          transition: box-shadow 0.3s, border-color 0.3s, transform 0.3s;
        }
        .stat-card:hover {
          border-color: rgba(26,141,232,0.25);
          box-shadow: 0 12px 28px -6px rgba(0,0,0,0.2);
          transform: translateY(-2px);
        }
        .stat-card::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -60%;
          width: 50%;
          height: 200%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent);
          transform: skewX(-20deg);
          transition: left 0.6s ease;
          pointer-events: none;
        }
        .stat-card:hover::after { left: 120%; }

        /* ── Product chip ── */
        @keyframes chip-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
        .product-chip { animation: chip-float 3s ease-in-out infinite; transition: background 0.2s, border-color 0.2s, color 0.2s; }
        .product-chip:hover { background: rgba(255,255,255,0.18) !important; border-color: rgba(255,255,255,0.35) !important; color: white !important; }

        /* ── CTA pulse rings ── */
        .cta-ring { position: absolute; width: 5rem; height: 5rem; background: rgba(26,141,232,0.2); border-radius: 50%; }

        /* ── Btn shimmer ── */
        .btn-shimmer { position: relative; overflow: hidden; }
        .btn-shimmer::after { content: ''; position: absolute; top: 0; left: -100%; width: 60%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent); transition: left 0.5s ease; }
        .btn-shimmer:hover::after { left: 150%; }

        /* ── Scroll indicator ── */
        @keyframes scroll-bob { 0%,100% { transform: translateY(0); opacity: 0.4; } 50% { transform: translateY(6px); opacity: 0.8; } }
        .scroll-bob { animation: scroll-bob 2s ease-in-out infinite; }

        /* ── Wave ── */
        .gs-wave { display: block; line-height: 0; }

        /* ── GSAP stat initial ── */
        .gs-stat { opacity: 0; }

        /* ── will-change hints ── */
        .gs-badge, .gs-service-card, .gs-chip, .gs-stat { will-change: transform, opacity; }

        /* ── DotField styles ── */
        .hero-dotfield-wrapper {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          pointer-events: none;
        }
        .hero-dotfield-wrapper .dot-field-container {
          width: 100%;
          height: 100%;
          position: relative;
        }
        .hero-dotfield-wrapper canvas {
          display: block !important;
          width: 100% !important;
          height: 100% !important;
        }
        .hero-content {
          position: relative;
          z-index: 1;
        }

        /* ── Custom background color ── */
        .bg-custom {
          background-color: #082f49;
        }

        /* ── Custom text colors for dark background ── */
        .text-custom-primary {
          color: rgba(255, 255, 255, 0.9);
        }
        .text-custom-secondary {
          color: rgba(255, 255, 255, 0.6);
        }
        .text-custom-muted {
          color: rgba(255, 255, 255, 0.4);
        }

        .section-label-custom {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 0.375rem 1rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.5);
          margin-bottom: 1rem;
        }

        .section-title-custom {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 700;
          font-size: 2.25rem;
          line-height: 1.1;
          color: white;
          margin-bottom: 1rem;
        }

        @media (min-width: 768px) {
          .section-title-custom {
            font-size: 2.75rem;
          }
        }

        .gradient-text-custom {
          background: linear-gradient(to right, #7BC4F5, #A8D8F9);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        @media (prefers-reduced-motion: reduce) {
          .orb-drift, .product-chip, .ticker-track { animation: none !important; }
          .gs-hero-hidden, .gs-stat, .floating-badge { opacity: 1 !important; transform: none !important; }
        }
      `}</style>

      <div className="min-h-screen bg-custom">

        {/* ══ HERO ═══════════════════════════════════════════════════ */}
        <section 
          ref={heroRef} 
          className="relative min-h-screen flex items-center overflow-hidden bg-custom"
        >
          {/* DotField Background - Visible and interactive */}
          <div className="hero-dotfield-wrapper">
            <DotField
              dotRadius={2}
              dotSpacing={16}
              bulgeStrength={80}
              glowRadius={100}
              sparkle={true}
              waveAmplitude={2}
              glowColor="#689e89"
              gradientFrom="rgba(59, 130, 246, 0.4)"
              gradientTo="rgb(0, 255, 98)"
              cursorRadius={200}
            />
          </div>

          {/* Grid overlay */}
          <div className="absolute inset-0 bg-grid-pattern opacity-10 z-0 pointer-events-none" />

          {/* Orbs — refs for parallax */}
          <div ref={orb1Ref} className="hero-mesh orb-drift w-[500px] h-[500px] bg-white/5 top-1/4 -left-40 z-0" />
          <div ref={orb2Ref} className="hero-mesh w-[400px] h-[400px] bg-electric-300/10 bottom-1/4 -right-24 z-0" />

          {/* Floating proof badges */}
          <div className="hidden lg:block absolute right-[8%] top-[28%] z-10">
            <FloatingBadge icon={<Award size={16} />} label="Combined Experience" value="30+ Years" delay="0.8s" />
          </div>
          <div className="hidden lg:block absolute right-[10%] top-[46%] z-10">
            <FloatingBadge icon={<Shield size={16} />} label="QA Expertise" value="20+ Years" delay="1s" />
          </div>
          <div className="hidden lg:block absolute right-[7%] top-[63%] z-10">
            <FloatingBadge icon={<Zap size={16} className="fill-current" />} label="Founded" value="2024" delay="1.2s" />
          </div>

          {/* Hero content */}
          <div className="hero-content relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-0">
            <div className="max-w-3xl">

              <div ref={heroBadgeRef} className="gs-hero-hidden inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-8 backdrop-blur-sm">
                <Zap size={12} className="text-electric-400 fill-electric-400" />
                <span className="text-white/70 text-xs font-medium tracking-wide">ServEase Innovation & Technology</span>
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              </div>

              <h1 ref={heroH1Ref} className="gs-hero-hidden font-display font-bold text-5xl sm:text-6xl lg:text-7xl text-white leading-[1.06] mb-6">
                Empowering Your{' '}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-white via-electric-100 to-electric-300 bg-clip-text text-transparent">
                    Digital Future
                  </span>
                  <span className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-electric-400 to-transparent rounded-full" style={{ width: '100%' }} />
                </span>
              </h1>

              <p ref={heroSubRef} className="gs-hero-hidden text-white/70 text-lg lg:text-xl leading-relaxed mb-10 max-w-xl backdrop-blur-sm">
                Unleashing the potential of technology for your business. From software development to AI-powered automation — we build the tools that move you forward.
              </p>

              <div ref={heroCTARef} className="gs-hero-hidden flex flex-col sm:flex-row gap-4 mb-14">
                <Link to="/contact" className="btn-primary btn-shimmer text-base py-3.5 px-8 group">
                  Get Started
                  <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
                <Link to="/services" className="inline-flex items-center gap-2 border-2 border-white/25 text-white hover:border-white/60 hover:bg-white/10 font-semibold px-8 py-3.5 rounded-full transition-all duration-200 group backdrop-blur-sm">
                  Our Services
                  <ChevronRight size={18} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
              </div>

              <div ref={heroChipsRef} className="gs-hero-hidden flex flex-wrap items-center gap-3">
                {['Product Development', 'QA & Testing', 'IT Staffing', 'Automation', 'Web Design'].map((chip) => (
                  <span key={chip} className="inline-flex items-center gap-1.5 text-white/50 text-xs font-medium border border-white/12 rounded-full px-3 py-1.5 bg-white/5 hover:bg-white/10 hover:text-white/80 transition-colors cursor-default backdrop-blur-sm">
                    <CheckCircle2 size={11} className="text-electric-400" />
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Ticker */}
          <div className="absolute bottom-16 left-0 right-0 z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-3">
              <p className="text-white/30 text-xs uppercase tracking-widest font-mono">Services we provide</p>
            </div>
            <Ticker />
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 scroll-bob z-10">
            <div className="w-5 h-8 border border-white/20 rounded-full flex justify-center pt-1.5">
              <div className="w-0.5 h-2 bg-white/40 rounded-full" />
            </div>
          </div>
        </section>

        {/* Wave divider */}
        <svg className="gs-wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 48" preserveAspectRatio="none">
          <path d="M0,48 L0,24 C240,0 480,48 720,24 C960,0 1200,48 1440,24 L1440,48 Z" fill="#082f49" />

        </svg>

        {/* ══ ABOUT ═══════════════════════════════════════════════════ */}
        <section ref={aboutRef} className="bg-custom py-20 lg:py-28 -mt-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">

              <div className="gs-about-left" style={{ opacity: 0 }}>
                <span className="section-label-custom">
                  <Zap size={12} className="fill-electric-500" /> About ServEase
                </span>
                <h2 className="section-title-custom mb-6">
                  We make your ideas{' '}
                  <span className="gradient-text-custom">work for you</span>
                </h2>
                <p className="text-white/60 leading-relaxed mb-5">
                  Founded in 2024, ServEase Innovation & Technology has quickly established itself as a trusted partner for businesses worldwide. Our founders bring over 30 years of collective IT expertise, building solutions that are reliable, scalable, and human-centered.
                </p>
                <p className="text-white/60 leading-relaxed mb-8">
                  We believe technology should serve people — not the other way around. That's why every solution we deliver is tailored to meet the unique goals of each client.
                </p>

                <ul className="space-y-2.5 mb-8">
                  {['End-to-end product development', 'Pre-vetted IT talent network', 'Award-winning QA & automation'].map((f) => (
                    <li key={f} className="gs-about-item flex items-center gap-2.5 text-sm text-white/70" style={{ opacity: 0 }}>
                      <div className="w-5 h-5 rounded-full bg-electric-500/20 flex items-center justify-center shrink-0">
                        <CheckCircle2 size={12} className="text-electric-400" />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>

                <Link to="/who-we-are" className="inline-flex items-center gap-2 border-2 border-white/25 text-white hover:border-white/60 hover:bg-white/10 font-semibold px-6 py-3 rounded-full transition-all duration-200 group">
                  Meet the Team
                  <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>

              {/* Stats grid */}
              <div className="gs-about-right gs-stats-grid grid grid-cols-2 gap-4" style={{ opacity: 0 }}>
                {stats.map(({ value, suffix, label, icon }) => (
                  <div key={label} className="gs-stat stat-card">
                    <div className="flex items-center gap-2 text-electric-400 mb-3">{icon}</div>
                    <div className="font-display font-bold text-3xl text-white mb-1">
                      <AnimatedCounter target={value} suffix={suffix} />
                    </div>
                    <div className="text-white/50 text-sm leading-snug">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══ SERVICES ════════════════════════════════════════════════ */}
        <section ref={servicesRef} className="bg-custom py-20 lg:py-28 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-electric-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="gs-services-heading text-center mb-16" style={{ opacity: 0 }}>
              <span className="section-label-custom justify-center">
                <Code2 size={12} /> What We Do
              </span>
              <h2 className="section-title-custom mb-4">
                Services built to <span className="gradient-text-custom">scale with you</span>
              </h2>
              <p className="text-white/60 text-center max-w-2xl mx-auto">
                From initial concept to live product, our team covers every layer of the technology stack.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {services.map(({ icon, title, desc, gradient }) => (
                <SpotlightCard key={title} className="gs-service-card p-6 group" style={{ opacity: 0 }}>
                  <div className={`service-icon-ring bg-gradient-to-br ${gradient} text-white shadow-lg shadow-electric-500/20 mb-4`}>
                    {icon}
                  </div>
                  <h3 className="font-display font-semibold text-white text-lg mb-2">{title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-5">{desc}</p>
                  <Link to="/services" className="inline-flex items-center gap-1.5 text-electric-400 text-sm font-medium group-hover:gap-2.5 transition-all duration-200">
                    Learn more <ArrowRight size={14} />
                  </Link>
                </SpotlightCard>
              ))}

              {/* Dark CTA card */}
              <div className="gs-service-card bg-white/5 backdrop-blur-sm rounded-3xl p-6 flex flex-col justify-between sm:col-span-2 lg:col-span-1 relative overflow-hidden group border border-white/5" style={{ opacity: 0 }}>
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
                <Link to="/contact" className="inline-flex items-center gap-2 bg-white text-navy-900 font-semibold px-5 py-2.5 rounded-full text-sm hover:bg-electric-300 transition-colors w-fit">
                  Contact Us <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            <div className="gs-services-cta text-center mt-10" style={{ opacity: 0 }}>
              <Link to="/services" className="inline-flex items-center gap-2 border-2 border-white/25 text-white hover:border-white/60 hover:bg-white/10 font-semibold px-6 py-3 rounded-full transition-all duration-200 group">
                View All Services
                <ChevronRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* ══ PRODUCT TEASER ══════════════════════════════════════════ */}
        <section ref={productRef} className="bg-custom py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-navy-900/80 via-navy-800/60 to-navy-900/80 rounded-3xl overflow-hidden relative border border-white/5">
              <div className="absolute inset-0 bg-grid-pattern opacity-20" />
              <div className="gs-product-orb absolute top-0 right-0 w-80 h-80 bg-electric-500/15 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-electric-300/8 rounded-full blur-3xl pointer-events-none" />

              <div className="relative p-10 lg:p-16 grid lg:grid-cols-2 gap-12 items-center">

                <div className="gs-product-copy" style={{ opacity: 0 }}>
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

                  <Link to="/product" className="inline-flex items-center gap-2 bg-white text-navy-900 font-semibold px-6 py-3 rounded-full hover:bg-electric-300 transition-colors btn-shimmer group">
                    Explore ServEaso
                    <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </div>

                {/* Chips */}
                <div className="grid grid-cols-2 gap-3">
                  {productChips.map(({ label, icon }, i) => (
                    <div
                      key={label}
                      className="gs-chip product-chip bg-white/8 border border-white/10 rounded-2xl px-4 py-3 text-white/65 text-sm font-medium cursor-default flex items-center gap-2"
                      style={{ animationDelay: `${i * 0.4}s`, opacity: 0 }}
                    >
                      <span className="text-electric-400">{icon}</span>
                      {label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ CTA ═════════════════════════════════════════════════════ */}
        <section ref={ctaRef} className="bg-custom py-20 lg:py-28 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-50" />

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="gs-cta-content" style={{ opacity: 0 }}>
              {/* Pulse rings */}
              <div className="relative inline-flex items-center justify-center mb-8">
                <div className="gs-ring-1 cta-ring" style={{ opacity: 0 }} />
                <div className="gs-ring-2 cta-ring" style={{ opacity: 0 }} />
                <div className="relative w-14 h-14 bg-gradient-to-br from-electric-600 to-electric-400 rounded-2xl flex items-center justify-center shadow-lg shadow-electric-500/30 z-10">
                  <Zap size={24} className="text-white fill-white" />
                </div>
              </div>

              <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-4">
                Ready to build something{' '}
                <span className="gradient-text-custom">extraordinary?</span>
              </h2>
              <p className="text-white/60 mb-10 leading-relaxed max-w-xl mx-auto">
                Book a free consultation and we'll map your needs to the right solution — no commitment required.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact" className="gs-cta-btn btn-primary btn-shimmer text-base py-3.5 px-8 group" style={{ opacity: 0 }}>
                  Start a Conversation
                  <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
                <Link to="/services" className="gs-cta-btn inline-flex items-center gap-2 border-2 border-white/25 text-white hover:border-white/60 hover:bg-white/10 font-semibold px-8 py-3.5 rounded-full transition-all duration-200 group" style={{ opacity: 0 }}>
                  Explore Services
                  <ChevronRight size={18} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
              </div>

              <p className="mt-8 text-white/40 text-sm flex items-center justify-center gap-2">
                <Shield size={13} className="text-electric-400" />
                No commitment required · Respond within 24 hours
              </p>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}