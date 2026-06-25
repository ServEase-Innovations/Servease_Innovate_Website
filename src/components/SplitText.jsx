/**
 * SplitText.jsx
 * ─────────────────────────────────────────────────────────────
 * Splits text into words (or chars) and stagger-animates them
 * into view when the element enters the viewport.
 *
 * Uses GSAP + IntersectionObserver (no ScrollTrigger dep needed).
 *
 * Props
 *   text        – string to render
 *   tag         – wrapper element type (default: 'p')
 *   className   – classes forwarded to the wrapper
 *   splitType   – 'words' | 'chars'  (default: 'words')
 *   delay       – per-item stagger in ms (default: 30)
 *   duration    – tween duration in seconds (default: 0.6)
 *   ease        – GSAP ease string (default: 'power3.out')
 *   from        – GSAP fromTo "from" vars (default: opacity 0, y 20)
 *   to          – GSAP fromTo "to"   vars (default: opacity 1, y 0)
 *   threshold   – IntersectionObserver threshold (default: 0.1)
 *   rootMargin  – IntersectionObserver rootMargin (default: '-40px')
 *   textAlign   – CSS text-align (default: 'inherit')
 */
import { useEffect, useRef } from 'react';

let _gsap = null;
async function getGSAP() {
  if (_gsap) return _gsap;
  const { gsap } = await import('https://esm.sh/gsap@3.12.5');
  _gsap = gsap;
  return gsap;
}

export default function SplitText({
  text = '',
  tag: Tag = 'p',
  className = '',
  splitType = 'words',
  delay = 30,
  duration = 0.6,
  ease = 'power3.out',
  from = { opacity: 0, y: 20 },
  to   = { opacity: 1, y: 0  },
  threshold = 0.1,
  rootMargin = '-40px',
  textAlign = 'inherit',
}) {
  const wrapRef = useRef(null);
  const animated = useRef(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap || animated.current) return;

    // Split into spans
    const raw   = text.trim();
    const units = splitType === 'chars'
      ? raw.split('')
      : raw.split(/\s+/);

    // Rebuild DOM
    wrap.innerHTML = units
      .map((u) =>
        `<span class="split-unit" style="display:inline-block;overflow:hidden;"><span class="split-inner" style="display:inline-block;">${u === ' ' ? '&nbsp;' : u}</span></span>`
      )
      .join(splitType === 'chars' ? '' : '&nbsp;');

    const inners = wrap.querySelectorAll('.split-inner');

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || animated.current) return;
        animated.current = true;
        observer.disconnect();

        getGSAP().then((gsap) => {
          gsap.fromTo(
            inners,
            { ...from },
            {
              ...to,
              duration,
              ease,
              stagger: delay / 1000,
            }
          );
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(wrap);
    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Tag
      ref={wrapRef}
      className={className}
      style={{ textAlign }}
    >
      {text}
    </Tag>
  );
}