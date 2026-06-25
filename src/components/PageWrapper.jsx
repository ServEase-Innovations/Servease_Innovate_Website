/**
 * PageWrapper.jsx
 * ─────────────────────────────────────────────────────────────
 * Wraps every page with:
 *   1. Page-enter fade animation (GSAP)
 *   2. Scroll progress bar
 *   3. Seamless section-to-section flow via CSS & GSAP
 *
 * Replace your existing layout wrapper with this, keeping
 * Navbar, <children />, Footer structure intact.
 *
 * Usage (in App.jsx):
 *   import PageWrapper from './components/PageWrapper';
 *   ...
 *   <PageWrapper>
 *     <Navbar />
 *     <Routes>...</Routes>
 *     <Footer />
 *   </PageWrapper>
 */
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import ScrollProgressBar from './ScrollProgressBar';

/* ── lazy GSAP ──────────────────────────────────────────────── */
let _gsap = null;
async function getGSAP() {
  if (_gsap) return _gsap;
  const { gsap } = await import('https://esm.sh/gsap@3.12.5');
  _gsap = gsap;
  return gsap;
}

/* ── global CSS (injected once) ─────────────────────────────── */
let cssInjected = false;
function injectGlobalCSS() {
  if (cssInjected || typeof document === 'undefined') return;
  cssInjected = true;

  const style = document.createElement('style');
  style.id = 'page-wrapper-globals';
  style.textContent = `
    /* Smooth scroll at browser level for anchor links */
    html { scroll-behavior: smooth; }

    /* Close any hairline gaps between adjacent sections
       that share the same background color.              */
    section + section,
    section + div + section {
      margin-top: -1px;
    }

    /* Prevent layout flash before GSAP runs */
    .page-enter {
      opacity: 0;
    }

    /* ── Inner-page hero sections ── */
    /* All inner pages use #082f49 hero bg — add a subtle
       bottom gradient so the transition into white feels
       natural rather than an abrupt cut.                 */
    .inner-hero-gradient::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 80px;
      background: linear-gradient(to bottom, transparent, rgba(8,47,73,0.4));
      pointer-events: none;
    }

    /* Wave SVG connectors */
    .section-wave {
      display: block;
      line-height: 0;
      margin-bottom: -2px;
    }

    @media (prefers-reduced-motion: reduce) {
      html { scroll-behavior: auto; }
      .page-enter { opacity: 1 !important; }
    }
  `;
  document.head.appendChild(style);
}

export default function PageWrapper({ children }) {
  const location = useLocation();
  const wrapRef = useRef(null);
  const prevPath = useRef(null);

  useEffect(() => {
    injectGlobalCSS();
  }, []);

  useEffect(() => {
    if (prevPath.current === location.pathname) return;
    prevPath.current = location.pathname;

    const el = wrapRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    getGSAP().then((gsap) => {
      // Brief fade-in on page enter
      gsap.fromTo(
        el,
        { opacity: 0 },
        { opacity: 1, duration: 0.35, ease: 'power2.out', clearProps: 'opacity' }
      );
    });
  }, [location.pathname]);

  return (
    <div ref={wrapRef}>
      <ScrollProgressBar />
      {children}
    </div>
  );
}