/**
 * ScrollToTop.jsx  (v2 — GSAP page transitions)
 * ─────────────────────────────────────────────────────────────
 * On every route change:
 *   1. Instantly scrolls to top
 *   2. Fades the new page content in smoothly
 *
 * Drop-in replacement for the original version.
 */
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

let _gsap = null;
async function getGSAP() {
  if (_gsap) return _gsap;
  const { gsap } = await import('https://esm.sh/gsap@3.12.5');
  _gsap = gsap;
  return gsap;
}

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const prevPath = useRef(null);

  useEffect(() => {
    if (prevPath.current === pathname) return;
    prevPath.current = pathname;

    // Instant scroll reset
    window.scrollTo({ top: 0, behavior: 'instant' });

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    // Fade in main content
    getGSAP().then((gsap) => {
      const main = document.querySelector('main') || document.getElementById('root');
      if (!main) return;
      gsap.fromTo(
        main,
        { opacity: 0.3 },
        { opacity: 1, duration: 0.4, ease: 'power2.out', clearProps: 'opacity' }
      );
    });
  }, [pathname]);

  return null;
}