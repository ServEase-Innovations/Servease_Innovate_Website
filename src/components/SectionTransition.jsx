/**
 * SectionTransition.jsx
 * ─────────────────────────────────────────────────────────────
 * Wraps any section/block and applies a scroll-triggered entrance
 * animation, creating a seamless, "one-page flow" feel.
 *
 * Three animation types:
 *   'rise'    – fades up from below (default)
 *   'reveal'  – clip-path wipe from bottom
 *   'fade'    – pure cross-fade
 *
 * Usage:
 *   <SectionTransition>
 *     <YourSectionContent />
 *   </SectionTransition>
 *
 *   <SectionTransition type="reveal" delay={0.1} overlap={true}>
 *     ...
 *   </SectionTransition>
 *
 * Props
 *   type       – 'rise' | 'reveal' | 'fade'          default: 'rise'
 *   delay      – seconds before animation starts      default: 0
 *   duration   – animation duration in seconds        default: 0.85
 *   y          – rise distance in px (for 'rise')     default: 48
 *   once       – only animate once                    default: true
 *   className  – extra classes on the wrapper div
 *   style      – extra inline styles on wrapper
 *   threshold  – IO threshold                         default: 0.08
 */
import { useEffect, useRef } from 'react';

let _gsap = null;
async function getGSAP() {
  if (_gsap) return _gsap;
  const { gsap } = await import('https://esm.sh/gsap@3.12.5');
  _gsap = gsap;
  return gsap;
}

export default function SectionTransition({
  children,
  type = 'rise',
  delay = 0,
  duration = 0.85,
  y = 48,
  once = true,
  className = '',
  style = {},
  threshold = 0.08,
}) {
  const ref = useRef(null);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect prefers-reduced-motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      el.style.opacity = '1';
      el.style.transform = 'none';
      el.style.clipPath = 'none';
      return;
    }

    // Set initial state
    if (type === 'rise') {
      el.style.opacity = '0';
      el.style.transform = `translateY(${y}px)`;
      el.style.willChange = 'opacity, transform';
    } else if (type === 'reveal') {
      el.style.clipPath = 'inset(0 0 100% 0)';
      el.style.willChange = 'clip-path';
    } else if (type === 'fade') {
      el.style.opacity = '0';
      el.style.willChange = 'opacity';
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || done.current) return;
        if (once) done.current = true;

        getGSAP().then((gsap) => {
          if (type === 'rise') {
            gsap.to(el, {
              opacity: 1,
              y: 0,
              duration,
              delay,
              ease: 'power3.out',
              clearProps: 'willChange',
            });
          } else if (type === 'reveal') {
            gsap.to(el, {
              clipPath: 'inset(0 0 0% 0)',
              duration,
              delay,
              ease: 'power4.out',
              clearProps: 'willChange,clipPath',
            });
          } else if (type === 'fade') {
            gsap.to(el, {
              opacity: 1,
              duration,
              delay,
              ease: 'power2.out',
              clearProps: 'willChange',
            });
          }
        });

        if (once) observer.unobserve(el);
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}