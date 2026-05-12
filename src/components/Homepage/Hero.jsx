import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDownRight } from 'lucide-react';

/**
 * Hero — cinematic, editorial, full-viewport.
 * Pure CSS parallax: the background image translates slowly on scroll
 * via a requestAnimationFrame loop. No extra deps.
 */
const Hero = () => {
  const bgRef = useRef(null);
  const scrollRef = useRef(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const onScroll = () => { scrollRef.current = window.scrollY; };
    window.addEventListener('scroll', onScroll, { passive: true });

    const tick = () => {
      if (bgRef.current) {
        bgRef.current.style.transform = `translateY(${scrollRef.current * 0.35}px) scale(1.12)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section className="relative h-screen min-h-175 overflow-hidden bg-[#060F1A]">

      {/* ── Parallax Background ── */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          ref={bgRef}
          className="absolute inset-0 will-change-transform"
          style={{ transform: 'translateY(0) scale(1.12)' }}
        >
          <img
            src="https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=2000"
            alt=""
            className="w-full h-full object-cover object-center"
          />
        </div>
        {/* Layered overlays for depth */}
        <div className="absolute inset-0 bg-linear-to-b from-[#060F1A]/80 via-[#060F1A]/30 to-[#060F1A]/90" />
        <div className="absolute inset-0 bg-linear-to-r from-[#060F1A]/70 via-transparent to-transparent" />
      </div>

      {/* ── Decorative vertical text (right edge) ── */}
      <div
        className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 flex-col items-center gap-4 z-20"
        style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
      >
        <span className="text-[9px] font-body font-medium uppercase tracking-[0.4em] text-[#B8B0A4]/50">
          Est. 2024
        </span>
        <div className="w-px h-16 bg-[#C9A84C]/30" />
        <span className="text-[9px] font-body font-medium uppercase tracking-[0.4em] text-[#C9A84C]/60">
          Luxury Parfumerie
        </span>
      </div>

      {/* ── Scroll indicator ── */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3">
        <span className="text-[9px] font-body uppercase tracking-[0.35em] text-[#B8B0A4]/50">Scroll</span>
        <div className="relative w-px h-14 bg-[#B8B0A4]/20 overflow-hidden">
          <div
            className="absolute top-0 left-0 w-full bg-[#C9A84C]"
            style={{
              height: '40%',
              animation: 'slideDown 1.8s cubic-bezier(0.4,0,0.6,1) infinite',
            }}
          />
        </div>
        <style>{`
          @keyframes slideDown {
            0%   { transform: translateY(-100%); opacity: 0; }
            30%  { opacity: 1; }
            100% { transform: translateY(300%); opacity: 0; }
          }
        `}</style>
      </div>

      {/* ── Main Content ── */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-24 px-6 md:px-16 lg:px-24">

        {/* Eyebrow */}
        <div className="flex items-center gap-4 mb-6 animate-fade-in">
          <div className="h-px w-12 bg-[#C9A84C]" />
          <span className="text-[10px] font-body font-medium uppercase tracking-[0.45em] text-[#C9A84C]">
            New Collection — 2024
          </span>
        </div>

        {/* Main Headline */}
        <h1
          className="font-display font-light leading-none mb-8 animate-fade-up"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(4rem, 12vw, 11rem)',
            color: '#F5F0E8',
            letterSpacing: '-0.01em',
          }}
        >
          The Art<br />
          <em
            className="not-italic"
            style={{
              color: '#C9A84C',
              fontStyle: 'italic',
            }}
          >
            of Scent.
          </em>
        </h1>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-8 animate-fade-up delay-300">
          <p
            className="max-w-xs font-body font-light text-[#B8B0A4] leading-relaxed"
            style={{ fontSize: '0.9rem' }}
          >
            Rare ingredients. Artisanal craft.<br />
            Fragrances that tell a story.
          </p>

          <div className="flex items-center gap-6">
            <Link
              to="/products"
              className="group flex items-center gap-3 border border-[#C9A84C]/40 hover:border-[#C9A84C] px-7 py-4 transition-all duration-500 hover:bg-[#C9A84C]/5"
            >
              <span className="text-[11px] font-body font-medium uppercase tracking-[0.3em] text-[#F5F0E8]">
                Explore Collection
              </span>
              <ArrowDownRight
                size={14}
                className="text-[#C9A84C] transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* ── Marquee strip ── */}
      <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-[#C9A84C]/10 bg-[#060F1A]/60 backdrop-blur-sm py-3 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {Array(8).fill(['Eau de Parfum', 'Artisanal Blends', 'Rare Accords', 'Luxury Collection', 'Handcrafted Bottles']).flat().map((text, i) => (
            <span key={i} className="text-[9px] font-body font-medium uppercase tracking-[0.4em] text-[#B8B0A4]/40 mx-8">
              {text} <span className="text-[#C9A84C]/40 mx-4">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
