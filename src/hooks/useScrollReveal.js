import { useEffect, useRef } from 'react';

export function useScrollReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

export function useScrollRevealAll(selector = '.reveal') {
  useEffect(() => {
    const elements = document.querySelectorAll(selector);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

/**
 * Pins a section while the user scrolls past it, sliding an inner
 * horizontal track left-to-right in proportion to scroll progress —
 * the same "pinned heading + cards glide by" effect used for step/stat
 * carousels. `wrapperRef` is a tall spacer; `trackRef` is the row that
 * translates horizontally.
 */
export function useHorizontalScrollPin(wrapperRef, trackRef) {
  useEffect(() => {
    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    if (!wrapper || !track) return;

    const update = () => {
      const rect = wrapper.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const scrollDistance = wrapper.offsetHeight - viewportH;
      if (scrollDistance <= 0) return;

      // Progress (0 → 1) through the pinned wrapper's scroll range
      const progress = Math.min(Math.max(-rect.top / scrollDistance, 0), 1);
      const maxTranslate = Math.max(track.scrollWidth - track.parentElement.offsetWidth, 0);
      track.style.transform = `translateX(-${progress * maxTranslate}px)`;
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [wrapperRef, trackRef]);
}