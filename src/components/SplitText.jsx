import { useRef, useEffect, useState } from 'react';

/**
 * SplitText — scroll-triggered word/char/line animation via GSAP 3.13+.
 * GSAP 3.13+ is required: SplitText became free in that release.
 * Loads lazily from esm.sh to match the project's existing GSAP pattern.
 */

let gsapModules = null;
async function loadGSAP() {
  if (gsapModules) return gsapModules;
  const [{ gsap }, { ScrollTrigger }, { SplitText: GSAPSplitText }] = await Promise.all([
    import('https://esm.sh/gsap@3.13.0'),
    import('https://esm.sh/gsap@3.13.0/ScrollTrigger'),
    import('https://esm.sh/gsap@3.13.0/SplitText'),
  ]);
  gsap.registerPlugin(ScrollTrigger, GSAPSplitText);
  gsapModules = { gsap, ScrollTrigger, GSAPSplitText };
  return gsapModules;
}

const SplitText = ({
  text,
  className = '',
  delay = 50,
  duration = 1.25,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'left',
  tag = 'p',
  onLetterAnimationComplete,
}) => {
  const ref = useRef(null);
  const onCompleteRef = useRef(onLetterAnimationComplete);

  useEffect(() => {
    onCompleteRef.current = onLetterAnimationComplete;
  }, [onLetterAnimationComplete]);

  useEffect(() => {
    if (!ref.current || !text) return;

    const el = ref.current;
    let cancelled = false;
    let splitInstance = null;

    // Convert rootMargin offset into a ScrollTrigger start string
    const startPct = (1 - threshold) * 100;
    const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin);
    const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0;
    const marginUnit  = marginMatch ? (marginMatch[2] || 'px') : 'px';
    const offset =
      marginValue === 0 ? '' :
      marginValue < 0   ? ` -=${Math.abs(marginValue)}${marginUnit}` :
                          ` +=${marginValue}${marginUnit}`;
    const startStr = `top ${startPct}%${offset}`;

    async function init() {
      const { gsap, ScrollTrigger, GSAPSplitText } = await loadGSAP();
      if (cancelled) return;

      // Revert any prior split on this element
      if (el._splitInstance) {
        try { el._splitInstance.revert(); } catch (_) {}
        el._splitInstance = null;
      }

      // Wait for fonts so line-splitting is accurate
      await document.fonts.ready;
      if (cancelled) return;

      splitInstance = GSAPSplitText.create(el, {
        type: splitType,
        autoSplit: true,
        onSplit(self) {
          // Pick the finest-grained targets available
          const targets =
            (splitType.includes('chars') && self.chars?.length)  ? self.chars  :
            (splitType.includes('words') && self.words?.length)  ? self.words  :
            (splitType.includes('lines') && self.lines?.length)  ? self.lines  :
            self.chars || self.words || self.lines || [];

          if (!targets.length) return;

          return gsap.fromTo(targets, { ...from }, {
            ...to,
            duration,
            ease,
            stagger: delay / 1000,
            force3D: true,
            scrollTrigger: {
              trigger: el,
              start: startStr,
              once: true,
            },
            onComplete() {
              onCompleteRef.current?.();
            },
          });
        },
      });

      el._splitInstance = splitInstance;
    }

    init();

    return () => {
      cancelled = true;
      if (splitInstance) {
        try { splitInstance.revert(); } catch (_) {}
      }
      if (el._splitInstance) {
        try { el._splitInstance.revert(); } catch (_) {}
        el._splitInstance = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, delay, duration, ease, splitType,
      JSON.stringify(from), JSON.stringify(to),
      threshold, rootMargin]);

  const Tag = tag || 'p';

  return (
    <Tag
      ref={ref}
      className={className}
      style={{ textAlign }}
    >
      {text}
    </Tag>
  );
};

export default SplitText;