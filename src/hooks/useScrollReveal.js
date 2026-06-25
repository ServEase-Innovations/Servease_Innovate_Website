/**
 * useScrollReveal.js  (v2 — GSAP-powered)
 * ─────────────────────────────────────────────────────────────
 * Drop-in replacement for the original IntersectionObserver
 * version.  All existing call sites (useScrollReveal,
 * useScrollRevealAll, useHorizontalScrollPin) work unchanged,
 * but animations now use GSAP for smoother, GPU-accelerated
 * motion that matches the Home-page quality.
 */
import { useEffect, useRef } from 'react';

/* ── lazy GSAP loader ──────────────────────────────────────── */
let _cache = null;
async function loadGSAP() {
  if (_cache) return _cache;
  const [{ gsap }, { ScrollTrigger }] = await Promise.all([
    import('https://esm.sh/gsap@3.12.5'),
    import('https://esm.sh/gsap@3.12.5/ScrollTrigger'),
  ]);
  gsap.registerPlugin(ScrollTrigger);
  _cache = { gsap, ScrollTrigger };
  return _cache;
}

/* ── CSS injected once ─────────────────────────────────────── */
let cssInjected = false;
function injectRevealCSS() {
  if (cssInjected || typeof document === 'undefined') return;
  cssInjected = true;
  const style = document.createElement('style');
  style.id = 'scroll-reveal-v2';
  style.textContent = `
    /* Initial hidden state for .reveal elements */
    .reveal {
      opacity: 0;
      transform: translateY(36px);
      transition: none !important; /* let GSAP own the animation */
      will-change: opacity, transform;
    }
    /* Visible state — set by JS */
    .reveal.visible {
      opacity: 1;
      transform: translateY(0);
      will-change: auto;
    }
    @media (prefers-reduced-motion: reduce) {
      .reveal, .reveal.visible {
        opacity: 1 !important;
        transform: none !important;
        transition: none !important;
      }
    }
  `;
  document.head.appendChild(style);
}

/* ── useScrollReveal (single element) ─────────────────────── */
export function useScrollReveal() {
  const ref = useRef(null);

  useEffect(() => {
    injectRevealCSS();
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      el.classList.add('visible');
      return;
    }

    loadGSAP().then(({ gsap }) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          observer.unobserve(el);
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: 'power3.out',
            onComplete: () => {
              el.classList.add('visible');
              el.style.willChange = 'auto';
            },
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
      );
      observer.observe(el);
      return () => observer.disconnect();
    });
  }, []);

  return ref;
}

/* ── useScrollRevealAll (batch, with stagger groups) ──────── */
export function useScrollRevealAll(selector = '.reveal') {
  useEffect(() => {
    injectRevealCSS();

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      document.querySelectorAll(selector).forEach((el) => el.classList.add('visible'));
      return;
    }

    loadGSAP().then(({ gsap }) => {
      const elements = Array.from(document.querySelectorAll(selector));
      if (!elements.length) return;

      /* Group elements that are close together vertically into
         stagger groups so they animate in as a cohesive set.     */
      const STAGGER_WINDOW = 80; // px — elements within this band animate together
      const groups = [];
      let currentGroup = [];

      const sorted = [...elements].sort(
        (a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top
      );

      sorted.forEach((el) => {
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (currentGroup.length === 0) {
          currentGroup.push(el);
        } else {
          const groupTop =
            currentGroup[0].getBoundingClientRect().top + window.scrollY;
          if (top - groupTop < STAGGER_WINDOW) {
            currentGroup.push(el);
          } else {
            groups.push(currentGroup);
            currentGroup = [el];
          }
        }
      });
      if (currentGroup.length) groups.push(currentGroup);

      const observers = [];

      groups.forEach((group) => {
        const trigger = group[0];
        let triggered = false;

        const obs = new IntersectionObserver(
          ([entry]) => {
            if (!entry.isIntersecting || triggered) return;
            triggered = true;
            obs.disconnect();

            gsap.fromTo(
              group,
              { opacity: 0, y: 36 },
              {
                opacity: 1,
                y: 0,
                duration: 0.72,
                stagger: 0.08,
                ease: 'power3.out',
                onComplete: () => {
                  group.forEach((el) => {
                    el.classList.add('visible');
                    el.style.willChange = 'auto';
                  });
                },
              }
            );
          },
          { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
        );

        obs.observe(trigger);
        observers.push(obs);
      });

      return () => observers.forEach((o) => o.disconnect());
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

/**
 * useHorizontalScrollPin  (unchanged API)
 * Pins a section while the user scrolls past it, sliding an inner
 * horizontal track left-to-right. Works with GSAP ScrollTrigger.
 */
export function useHorizontalScrollPin(wrapperRef, trackRef) {
  useEffect(() => {
    const wrapper = wrapperRef.current;
    const track   = trackRef.current;
    if (!wrapper || !track) return;

    let st;

    loadGSAP().then(({ gsap, ScrollTrigger }) => {
      st = ScrollTrigger.create({
        trigger: wrapper,
        start: 'top top',
        end: () => `+=${wrapper.offsetHeight - window.innerHeight}`,
        pin: true,
        scrub: true,
        onUpdate: (self) => {
          const maxTranslate = Math.max(
            track.scrollWidth - (track.parentElement?.offsetWidth ?? 0),
            0
          );
          track.style.transform = `translateX(-${self.progress * maxTranslate}px)`;
        },
      });
    });

    return () => {
      st?.kill();
    };
  }, [wrapperRef, trackRef]);
}