import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import useFirestore from '../../hooks/useFirestore';

/**
 * Highlight — editorial asymmetric product showcase.
 *
 * Layout:
 *   [1] Large feature card — col-span 2, tall
 *   [2] Smaller card — right side, top
 *   [3] Smaller card — right side, bottom-left
 *   [4] Smaller card — right side, bottom-right
 *
 * On mobile: vertical stack.
 */

/* Observe-based fade-in for each card */
const FadeInSection = ({ children, delay = 0, className = '' }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

const Highlight = () => {
  const { data: perfumes, loading, error } = useFirestore('perfumes');
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (perfumes?.length) setItems(perfumes.slice(0, 4));
  }, [perfumes]);

  /* ── Loading ── */
  if (loading) {
    return (
      <section className="bg-[#F5F0E8] min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div
            className="w-12 h-12 border border-[#C9A84C]/30 rounded-full"
            style={{ animation: 'spin 2s linear infinite', borderTopColor: '#C9A84C' }}
          />
          <span
            className="text-[10px] font-body font-medium uppercase tracking-[0.4em] text-[#B8B0A4]"
          >
            Loading collection
          </span>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </section>
    );
  }

  /* ── Error ── */
  if (error) {
    return (
      <section className="bg-[#F5F0E8] py-24 text-center">
        <p className="font-body text-sm text-[#B8B0A4] uppercase tracking-widest">
          Unable to load collection
        </p>
      </section>
    );
  }

  const [feat, ...rest] = items;

  return (
    <section className="bg-[#F5F0E8] overflow-hidden">

      {/* ── Section Header ── */}
      <FadeInSection className="px-6 md:px-16 lg:px-24 pt-28 pb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-[#C9A84C]" />
              <span className="text-[10px] font-body font-medium uppercase tracking-[0.4em] text-[#C9A84C]">
                Curated Selection
              </span>
            </div>
            <h2
              className="font-display font-light leading-none"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(3rem, 7vw, 6rem)',
                color: '#0A1628',
                letterSpacing: '-0.01em',
              }}
            >
              Featured<br />
              <em style={{ fontStyle: 'italic', color: '#C9A84C' }}>Fragrances</em>
            </h2>
          </div>

          <div className="md:max-w-xs">
            <p className="font-body font-light text-[#B8B0A4] leading-relaxed text-sm">
              Artisanal blends that redefine modern perfumery — each verified for potency, longevity, and rare molecular composition.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 mt-6 text-[10px] font-body font-medium uppercase tracking-[0.3em] text-[#0A1628] border-b border-[#C9A84C] pb-1 hover:text-[#C9A84C] transition-colors duration-300"
            >
              View full collection <ArrowUpRight size={12} />
            </Link>
          </div>
        </div>
      </FadeInSection>

      {/* ── Asymmetric Grid ── */}
      <div className="px-6 md:px-16 lg:px-24 pb-28">
        {items.length === 0 ? (
          <p className="font-body text-[#B8B0A4] text-center py-20 text-sm uppercase tracking-widest">
            No featured fragrances yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">

            {/* ── Feature Card (large, left) ── */}
            {feat && (
              <FadeInSection delay={0} className="md:col-span-2 md:row-span-2">
                <ProductCardLarge perfume={feat} />
              </FadeInSection>
            )}

            {/* ── Small Cards (right column) ── */}
            {rest.map((perfume, i) => (
              <FadeInSection key={perfume.id} delay={(i + 1) * 120}>
                <ProductCardSmall perfume={perfume} />
              </FadeInSection>
            ))}
          </div>
        )}
      </div>

      {/* ── Bottom CTA strip ── */}
      <FadeInSection>
        <div className="border-t border-[#0A1628]/8 mx-6 md:mx-16 lg:mx-24 py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="font-display font-light text-2xl text-[#0A1628] italic" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Every bottle tells a story.
          </p>
          <Link
            to="/products"
            className="group flex items-center gap-3 bg-[#0A1628] text-[#F5F0E8] px-8 py-4 hover:bg-[#C9A84C] transition-colors duration-500"
          >
            <span className="text-[10px] font-body font-medium uppercase tracking-[0.3em]">
              Discover More
            </span>
            <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>
      </FadeInSection>
    </section>
  );
};

/* ── Large Feature Card ───────────────────────────────────── */
const ProductCardLarge = ({ perfume }) => (
  <Link to="/products" className="group block relative overflow-hidden bg-[#0A1628] h-full min-h-130">
    {/* Image */}
    <div className="absolute inset-0 overflow-hidden">
      <img
        src={perfume.image}
        alt={perfume.name}
        className="w-full h-full object-cover opacity-60 transition-all duration-1000 group-hover:scale-105 group-hover:opacity-70"
      />
      <div className="absolute inset-0 bg-linear-to-t from-[#0A1628] via-[#0A1628]/20 to-transparent" />
    </div>

    {/* Tag */}
    <div className="absolute top-6 left-6 z-10">
      <span className="text-[9px] font-body font-medium uppercase tracking-[0.35em] text-[#C9A84C] border border-[#C9A84C]/40 px-3 py-1.5">
        {perfume.category}
      </span>
    </div>

    {/* Arrow */}
    <div className="absolute top-6 right-6 z-10 w-10 h-10 border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-2 group-hover:translate-x-0">
      <ArrowUpRight size={16} className="text-[#C9A84C]" />
    </div>

    {/* Content */}
    <div className="absolute bottom-0 left-0 right-0 z-10 p-8">
      <p className="font-body text-[10px] font-medium uppercase tracking-[0.35em] text-[#B8B0A4] mb-3">
        Featured
      </p>
      <h3
        className="font-display font-light text-[#F5F0E8] leading-none mb-4 transition-colors duration-300 group-hover:text-[#C9A84C]"
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(2rem, 4vw, 3.5rem)',
        }}
      >
        {perfume.name}
      </h3>
      <div className="flex items-center justify-between">
        <p className="font-body font-light text-[#B8B0A4] text-sm leading-relaxed max-w-xs line-clamp-2">
          {perfume.description}
        </p>
        <span
          className="font-display font-light text-3xl text-[#C9A84C] ml-6 shrink-0"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {perfume.price}
        </span>
      </div>
    </div>
  </Link>
);

/* ── Small Card ───────────────────────────────────────────── */
const ProductCardSmall = ({ perfume }) => (
  <Link to="/products" className="group block relative overflow-hidden bg-white h-56">
    {/* Image */}
    <div className="absolute inset-0 overflow-hidden">
      <img
        src={perfume.image}
        alt={perfume.name}
        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-108 saturate-[0.85] group-hover:saturate-100"
      />
      <div className="absolute inset-0 bg-linear-to-t from-[#0A1628]/80 via-transparent to-transparent" />
    </div>

    {/* Content */}
    <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
      <span className="text-[8px] font-body font-medium uppercase tracking-[0.35em] text-[#C9A84C]">
        {perfume.category}
      </span>
      <h4
        className="font-display font-light text-[#F5F0E8] text-xl leading-tight mt-1 group-hover:text-[#C9A84C] transition-colors duration-300"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        {perfume.name}
      </h4>
    </div>

    {/* Price pill - reveals on hover */}
    <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-all duration-400 translate-y-1 group-hover:translate-y-0">
      <span
        className="font-display font-light text-lg text-[#F5F0E8] bg-[#0A1628]/80 backdrop-blur-sm px-3 py-1"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        {perfume.price}
      </span>
    </div>
  </Link>
);

export default Highlight;
