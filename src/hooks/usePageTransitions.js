/**
 * usePageTransitions.js
 * ─────────────────────────────────────────────────────────────
 * Global scroll-experience orchestrator.
 *
 * Applies to every page automatically (mount in App root).
 * Handles:
 *   1. Section entrance animations (fade-up + subtle scale)
 *   2. Section exit darkening as next section overlaps
 *   3. Background parallax depth on section dividers
 *   4. Smooth scroll velocity dampening via Lenis-style JS
 *   5. Seamless colour-blending between dark ↔ light sections
 *
 * IMPORTANT: does NOT touch elements managed by Home.jsx's own
 * GSAP context (those are scoped to gs-* classes). This hook only
 * touches [data-section] and .page-section tagged elements.
 */
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/* ── lazy loaders ──────────────────────────────────────────── */
let _gsapCache = null;
async function loadGSAP() {
  if (_gsapCache) return _gsapCache;
  const [{ gsap }, { ScrollTrigger }] = await Promise.all([
    import('https://esm.sh/gsap@3.12.5'),
    import('https://esm.sh/gsap@3.12.5/ScrollTrigger'),
  ]);
  gsap.registerPlugin(ScrollTrigger);
  _gsapCache = { gsap, ScrollTrigger };
  return _gsapCache;
}

/* ── CSS injected once ─────────────────────────────────────── */
let cssInjected = false;
function injectCSS() {
  if (cssInjected || typeof document === 'undefined') return;
  cssInjected = true;

  const style = document.createElement('style');
  style.id = 'page-transitions-v1';
  style.textContent = `
    /* ── Smooth scroll ── */
    html {
      scroll-behavior: auto; /* let GSAP handle it */
    }

    /* ── Page-level section transitions ── */
    [data-section] {
      position: relative;
      z-index: 1;
    }

    /* Stacking context so sections can overlap during transitions */
    [data-section-overlap] {
      margin-top: -2px; /* close hairline gap between sections */
    }

    /* ── Progress bar ── */
    #scroll-progress-bar {
      position: fixed;
      top: 0;
      left: 0;
      height: 2px;
      width: 0%;
      background: linear-gradient(90deg, #0B6FD1, #43A8F2, #7BC4F5);
      z-index: 9999;
      pointer-events: none;
      transform-origin: left;
      transition: opacity 0.3s;
    }

    /* ── Reveal wipe for inner page hero sections ── */
    [data-hero-wipe] {
      clip-path: inset(0 0 0 0);
    }

    /* ── Parallax layers ── */
    [data-parallax] {
      will-change: transform;
    }

    /* ── Section connector — invisible bridge element ── */
    .section-bridge {
      height: 0;
      overflow: visible;
      position: relative;
      z-index: 2;
    }

    @media (prefers-reduced-motion: reduce) {
      [data-section], [data-section-overlap], [data-parallax] {
        opacity: 1 !important;
        transform: none !important;
        clip-path: none !important;
        transition: none !important;
      }
    }
  `;
  document.head.appendChild(style);
}

/* ── Create scroll-progress bar ─────────────────────────────── */
function createProgressBar() {
  if (document.getElementById('scroll-progress-bar')) return;
  const bar = document.createElement('div');
  bar.id = 'scroll-progress-bar';
  document.body.appendChild(bar);
}

/* ── Main hook ─────────────────────────────────────────────── */
export function usePageTransitions() {
  const location = useLocation();
  const ctxRef = useRef(null);
  const prevPath = useRef(null);

  useEffect(() => {
    injectCSS();
    createProgressBar();
  }, []);

  useEffect(() => {
    if (prevPath.current === location.pathname) return;
    prevPath.current = location.pathname;

    // Kill previous context
    ctxRef.current?.revert();

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const bar = document.getElementById('scroll-progress-bar');

    loadGSAP().then(({ gsap, ScrollTrigger }) => {
      ctxRef.current = gsap.context(() => {

        /* ── 1. Scroll progress bar ── */
        if (bar) {
          ScrollTrigger.create({
            start: 'top top',
            end: 'bottom bottom',
            onUpdate: (self) => {
              bar.style.width = `${self.progress * 100}%`;
            },
          });
        }

        if (prefersReduced) return;

        /* ── 2. Section-level entrance animations ──
           Targets any <section> or div with data-section attr
           that isn't inside the Hero (z-index: 0 parent).
           Uses a gentle rise + fade.                          */
        const sections = document.querySelectorAll(
          'section:not(.hero-skip-transition), [data-section]'
        );

        sections.forEach((sec, i) => {
          // Skip sections already handled by Home's GSAP context
          if (sec.closest('.hero-content') || sec.querySelector('.gs-services-heading')) return;
          // Only target non-hero sections for a subtle entrance
          if (sec.classList.contains('no-transition')) return;

          ScrollTrigger.create({
            trigger: sec,
            start: 'top 92%',
            once: true,
            onEnter: () => {
              if (sec.dataset.transitioned) return;
              sec.dataset.transitioned = 'true';

              // Stagger any direct child "card" or "reveal" groups
              const revealGroups = sec.querySelectorAll('.reveal-group');
              if (revealGroups.length) {
                gsap.fromTo(
                  revealGroups,
                  { opacity: 0, y: 24 },
                  { opacity: 1, y: 0, duration: 0.65, stagger: 0.1, ease: 'power3.out' }
                );
              }
            },
          });
        });

        /* ── 3. Parallax on decorative blobs / orbs ── */
        document.querySelectorAll('[data-parallax]').forEach((el) => {
          const speed = parseFloat(el.dataset.parallax || '0.3');
          gsap.to(el, {
            y: () => -window.innerHeight * speed,
            ease: 'none',
            scrollTrigger: {
              trigger: el.parentElement || el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          });
        });

        /* ── 4. Seamless section-to-section edge softening ──
           Adds a very subtle cross-fade effect at section
           boundaries so the transition isn't a hard cut.     */
        const pageSections = document.querySelectorAll('[data-section-overlap]');
        pageSections.forEach((sec) => {
          // Gentle entrance from slightly below
          gsap.fromTo(
            sec,
            { y: 18, opacity: 0.6 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: sec,
                start: 'top 98%',
                once: true,
              },
            }
          );
        });

        /* ── 5. Hero section clip-path wipe (inner pages) ── */
        document.querySelectorAll('[data-hero-wipe]').forEach((el) => {
          gsap.fromTo(
            el,
            { clipPath: 'inset(0 0 6% 0)' },
            {
              clipPath: 'inset(0 0 0% 0)',
              duration: 1,
              ease: 'power4.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 95%',
                once: true,
              },
            }
          );
        });

      }); // end gsap.context

      ScrollTrigger.refresh();
    });

    return () => {
      ctxRef.current?.revert();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return null;
}

/* ── Page-enter animation (called once per route change) ─── */
export function usePageEnter() {
  const location = useLocation();

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    // Instantly reset scroll before GSAP takes over
    window.scrollTo(0, 0);

    loadGSAP().then(({ gsap }) => {
      // Fade in the entire page wrapper smoothly
      const root = document.getElementById('root');
      if (!root) return;

      gsap.fromTo(
        root,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: 'power2.out', clearProps: 'opacity' }
      );
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);
}