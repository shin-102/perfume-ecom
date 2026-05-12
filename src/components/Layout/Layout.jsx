import { useEffect, useRef } from 'react';
import Header from './Header';
import Footer from './Footer';

/**
 * Layout — wraps every public page.
 * Adds:
 *  • Custom cursor (dot + ring)
 *  • Film-grain overlay (CSS animation)
 */
const Layout = ({ children }) => {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const pos     = useRef({ x: 0, y: 0 });
  const ring    = useRef({ x: 0, y: 0 });
  const rafId   = useRef(null);

  useEffect(() => {
    // Hide standard cursor when layout mounts
    document.body.classList.add('hide-standard-cursor');

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top  = `${e.clientY}px`;
      }
    };

    // Smooth ring follows with lerp
    const lerp = (a, b, t) => a + (b - a) * t;
    const tick = () => {
      ring.current.x = lerp(ring.current.x, pos.current.x, 0.12);
      ring.current.y = lerp(ring.current.y, pos.current.y, 0.12);
      if (ringRef.current) {
        ringRef.current.style.left = `${ring.current.x}px`;
        ringRef.current.style.top  = `${ring.current.y}px`;
      }
      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);

    window.addEventListener('mousemove', onMove, { passive: true });

    return () => {
      // Show standard cursor again when layout unmounts
      document.body.classList.remove('hide-standard-cursor');
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId.current);
    };

  }, []);

  return (
    <>
      {/* Custom cursor — hidden on touch/mobile */}
      <div
        ref={dotRef}
        className="cursor-dot hidden lg:block"
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className="cursor-ring hidden lg:block"
        aria-hidden="true"
      />

      {/* Grain overlay */}
      <div className="grain" aria-hidden="true" />

      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
