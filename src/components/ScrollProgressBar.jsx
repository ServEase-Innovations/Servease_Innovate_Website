/**
 * ScrollProgressBar.jsx
 * ─────────────────────────────────────────────────────────────
 * Mounts a thin gradient progress bar at the very top of the
 * viewport that fills as the user scrolls down the page.
 *
 * Drop this inside your layout root (App.jsx / Layout.jsx).
 * Respects prefers-reduced-motion.
 */
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollProgressBar() {
  const barRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let rafId;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight =
          document.documentElement.scrollHeight -
          document.documentElement.clientHeight;
        const progress = docHeight > 0 ? scrollTop / docHeight : 0;
        bar.style.transform = `scaleX(${progress})`;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // initial call

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [location.pathname]);

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        zIndex: 9999,
        pointerEvents: 'none',
        background: 'linear-gradient(90deg, #0B6FD1, #43A8F2, #7BC4F5)',
        transform: 'scaleX(0)',
        transformOrigin: 'left center',
        willChange: 'transform',
      }}
      ref={barRef}
    />
  );
}