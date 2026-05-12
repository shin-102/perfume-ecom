import { useState, useEffect, useRef } from 'react';
import { Search, X, MessageCircle, ChevronDown, ArrowUpRight } from 'lucide-react';
import Layout from '../components/Layout/Layout';
import { useData } from '../context/DataContext';

/* ─────────────────────────────────────────────
   ProductsPage
   Editorial hero → calm product grid → side panel
───────────────────────────────────────────── */
const ProductsPage = () => {
  const { perfumes, loading, error } = useData();
  const [selectedPerfume, setSelectedPerfume]   = useState(null);
  const [searchQuery, setSearchQuery]           = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredPerfumes, setFilteredPerfumes] = useState([]);
  const sidePanelRef = useRef(null);
  const gridRef      = useRef(null);

  const categories = ['All', ...new Set((perfumes || []).map(p => p?.category).filter(Boolean))];

  useEffect(() => {
    const filtered = perfumes.filter(p => {
      const matchSearch   = p?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            p?.description?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCategory = selectedCategory === 'All' || p?.category === selectedCategory;
      return matchSearch && matchCategory;
    });
    setFilteredPerfumes(filtered);
  }, [searchQuery, selectedCategory, perfumes]);

  // Close side panel on outside click
  useEffect(() => {
    const handler = (e) => {
      if (sidePanelRef.current && !sidePanelRef.current.contains(e.target)) {
        setSelectedPerfume(null);
      }
    };
    if (selectedPerfume) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [selectedPerfume]);

  // Lock body scroll when panel is open
  useEffect(() => {
    document.body.style.overflow = selectedPerfume ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selectedPerfume]);

  const createWhatsAppLink = (name) => {
    const msg = `Hi, I'm interested in purchasing ${name}. Can you provide more information?`;
    return `https://wa.me/?text=${encodeURIComponent(msg)}`;
  };

  const scrollToGrid = () => {
    gridRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  /* ── Loading ── */
  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-[#060F1A] flex flex-col items-center justify-center gap-6">
          <div
            className="w-12 h-12 rounded-full border border-[#C9A84C]/30"
            style={{ animation: 'spin 2s linear infinite', borderTopColor: '#C9A84C' }}
          />
          <span className="font-body text-[10px] font-medium uppercase tracking-[0.4em] text-[#B8B0A4]">
            Loading Collection
          </span>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </Layout>
    );
  }

  /* ── Error ── */
  if (error) {
    return (
      <Layout>
        <div className="min-h-screen bg-[#060F1A] flex items-center justify-center">
          <p className="font-body text-sm text-red-400/70 uppercase tracking-widest">{error}</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>

      {/* ══════════════════════════════════════════
          1. EDITORIAL HERO
      ══════════════════════════════════════════ */}
      <section className="relative min-h-screen bg-[#060F1A] flex flex-col overflow-hidden">

        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1588776814546-1ffbb6bd7e37?auto=format&fit=crop&q=80&w=2000"
            alt=""
            className="w-full h-full object-cover opacity-20"
            style={{ filter: 'saturate(0.4)' }}
          />
          <div className="absolute inset-0 bg-linear-to-b from-[#060F1A]/60 via-transparent to-[#060F1A]" />
        </div>

        {/* Vertical eyebrow — left edge */}
        <div
          className="hidden lg:flex absolute left-8 bottom-24 flex-col items-center gap-3 z-10"
          style={{ writingMode: 'vertical-rl' }}
        >
          <div className="h-16 w-px bg-[#C9A84C]/20" />
          <span className="text-[9px] font-body font-medium uppercase tracking-[0.4em] text-[#B8B0A4]/40">
            {filteredPerfumes.length} Scents
          </span>
        </div>

        {/* Hero content */}
        <div className="relative z-10 flex-1 flex flex-col justify-end px-6 md:px-16 lg:px-24 pb-24 pt-40">
          <div className="flex items-center gap-4 mb-6" style={{ animation: 'fadeUp 0.9s cubic-bezier(0.22,1,0.36,1) both' }}>
            <div className="h-px w-8 bg-[#C9A84C]" />
            <span className="text-[10px] font-body font-medium uppercase tracking-[0.45em] text-[#C9A84C]">
              Full Collection
            </span>
          </div>

          <h1
            className="font-display font-light leading-none mb-10"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(3.5rem, 10vw, 9rem)',
              color: '#F5F0E8',
              animation: 'fadeUp 0.9s cubic-bezier(0.22,1,0.36,1) 0.1s both',
              letterSpacing: '-0.01em',
            }}
          >
            Every<br />
            <em style={{ fontStyle: 'italic', color: '#C9A84C' }}>Scent.</em>
          </h1>

          <div
            className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
            style={{ animation: 'fadeUp 0.9s cubic-bezier(0.22,1,0.36,1) 0.25s both' }}
          >
            <p className="font-body font-light text-[#B8B0A4] text-sm max-w-xs leading-relaxed">
              Browse our complete catalogue of artisanal fragrances, each a world unto itself.
            </p>
            <button
              onClick={scrollToGrid}
              className="group flex items-center gap-3 text-[10px] font-body font-medium uppercase tracking-[0.3em] text-[#F5F0E8] border border-white/10 hover:border-[#C9A84C]/50 px-6 py-3.5 transition-all duration-500"
            >
              Browse Collection
              <ChevronDown size={14} className="text-[#C9A84C] animate-bounce" />
            </button>
          </div>
        </div>

        <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(40px); } to { opacity:1; transform:translateY(0); } }`}</style>
      </section>

      {/* ══════════════════════════════════════════
          2. FILTER BAR (transition zone)
      ══════════════════════════════════════════ */}
      <div className="sticky top-0 z-30 bg-[#F5F0E8]/95 backdrop-blur-md border-b border-[#0A1628]/8 shadow-sm">
        <div className="container mx-auto px-6 md:px-16 lg:px-24 py-4 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">

          {/* Search */}
          <div className="relative flex-1 group">
            <Search className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 text-[#B8B0A4] group-focus-within:text-[#C9A84C] transition-colors" />
            <input
              type="text"
              placeholder="Search fragrances…"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-7 pr-4 py-2.5 bg-transparent border-b border-[#0A1628]/15 focus:border-[#C9A84C] outline-none font-body text-sm text-[#0A1628] placeholder-[#B8B0A4] transition-colors duration-300"
            />
          </div>

          {/* Divider */}
          <div className="hidden sm:block h-6 w-px bg-[#0A1628]/10" />

          {/* Category pills */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1 sm:pb-0">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`shrink-0 text-[9px] font-body font-medium uppercase tracking-[0.3em] px-4 py-2 transition-all duration-300 ${
                  selectedCategory === cat
                    ? 'bg-[#0A1628] text-[#F5F0E8]'
                    : 'bg-transparent text-[#B8B0A4] hover:text-[#0A1628] border border-[#0A1628]/10 hover:border-[#0A1628]/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Result count */}
          <div className="hidden lg:block shrink-0">
            <span className="font-body text-[10px] font-medium uppercase tracking-[0.3em] text-[#B8B0A4]">
              {filteredPerfumes.length} results
            </span>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          3. PRODUCT GRID
      ══════════════════════════════════════════ */}
      <div
        ref={gridRef}
        className="bg-[#F5F0E8] min-h-screen"
      >
        <div className="container mx-auto px-6 md:px-16 lg:px-24 py-16">
          {filteredPerfumes.length === 0 ? (
            <div className="py-32 text-center">
              <p className="font-display font-light text-4xl text-[#0A1628]/20 italic" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                No fragrances found.
              </p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                className="mt-6 text-[10px] font-body uppercase tracking-[0.3em] text-[#C9A84C] border-b border-[#C9A84C] pb-1"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
              {filteredPerfumes.map((perfume, index) => (
                <ProductCard
                  key={perfume.id}
                  perfume={perfume}
                  index={index}
                  onClick={() => setSelectedPerfume(perfume)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          4. SIDE PANEL
      ══════════════════════════════════════════ */}
      {selectedPerfume && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-[#060F1A]/70 backdrop-blur-sm"
            style={{ animation: 'fadeIn 0.4s ease both' }}
          />

          {/* Panel */}
          <div
            ref={sidePanelRef}
            className="relative bg-[#F5F0E8] w-full max-w-md h-full overflow-y-auto shadow-2xl flex flex-col"
            style={{ animation: 'slideInRight 0.5s cubic-bezier(0.22,1,0.36,1) both' }}
          >
            {/* Close */}
            <button
              onClick={() => setSelectedPerfume(null)}
              className="absolute top-6 right-6 z-20 w-9 h-9 flex items-center justify-center border border-[#0A1628]/15 hover:border-[#0A1628]/40 transition-colors duration-300"
            >
              <X size={16} className="text-[#0A1628]" />
            </button>

            {/* Image */}
            <div className="relative h-[55vh] overflow-hidden bg-[#0A1628] shrink-0">
              <img
                src={selectedPerfume.image}
                alt={selectedPerfume.name}
                className="w-full h-full object-cover opacity-80"
                style={{ filter: 'saturate(0.7)' }}
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#0A1628]/60 via-transparent to-transparent" />

              {/* Category badge */}
              <div className="absolute top-6 left-6">
                <span className="text-[9px] font-body font-medium uppercase tracking-[0.35em] text-[#C9A84C] border border-[#C9A84C]/50 px-3 py-1.5">
                  {selectedPerfume.category}
                </span>
              </div>
            </div>

            {/* Details */}
            <div className="flex-1 p-8 flex flex-col gap-6">
              <div>
                <h2
                  className="font-display font-light leading-none mb-3"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 'clamp(2rem, 5vw, 3rem)',
                    color: '#0A1628',
                  }}
                >
                  {selectedPerfume.name}
                </h2>
                <p
                  className="font-display font-light text-3xl text-[#C9A84C]"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {selectedPerfume.price}
                </p>
              </div>

              <div className="h-px bg-[#0A1628]/8" />

              <div>
                <h3 className="text-[10px] font-body font-medium uppercase tracking-[0.35em] text-[#B8B0A4] mb-3">
                  Description
                </h3>
                <p className="font-body font-light text-[#0A1628] leading-relaxed text-sm">
                  {selectedPerfume.description}
                </p>
              </div>

              {selectedPerfume.details && (
                <div className="bg-white border-l-2 border-[#C9A84C] p-5">
                  <h3 className="text-[10px] font-body font-medium uppercase tracking-[0.35em] text-[#B8B0A4] mb-2">
                    Fragrance Notes
                  </h3>
                  <p className="font-body font-light text-sm text-[#0A1628]/70 italic leading-relaxed">
                    {selectedPerfume.details}
                  </p>
                </div>
              )}

              <div className="mt-auto pt-4">
                <a
                  href={createWhatsAppLink(selectedPerfume.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-full flex items-center justify-center gap-3 bg-[#0A1628] hover:bg-[#C9A84C] text-[#F5F0E8] py-5 transition-colors duration-500"
                >
                  <MessageCircle size={16} className="shrink-0" />
                  <span className="text-[10px] font-body font-medium uppercase tracking-[0.3em]">
                    Enquire via WhatsApp
                  </span>
                </a>
              </div>
            </div>
          </div>

          <style>{`
            @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
            @keyframes slideInRight { from { transform:translateX(100%); opacity:0; } to { transform:translateX(0); opacity:1; } }
          `}</style>
        </div>
      )}
    </Layout>
  );
};

/* ─────────────────────────────────────────────
   Product Card
───────────────────────────────────────────── */
const ProductCard = ({ perfume, index, onClick }) => {
  const ref  = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      onClick={onClick}
      className="group cursor-pointer"
      style={{
        opacity:    visible ? 1 : 0,
        transform:  visible ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.8s cubic-bezier(0.22,1,0.36,1) ${index * 60}ms, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${index * 60}ms`,
      }}
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-white aspect-3/4 mb-5">
        <img
          src={perfume.image}
          alt={perfume.name}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 saturate-[0.8] group-hover:saturate-100"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-[#060F1A]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-5">
          <span className="flex items-center gap-2 text-[9px] font-body font-medium uppercase tracking-[0.35em] text-[#F5F0E8]">
            View Details <ArrowUpRight size={12} />
          </span>
        </div>
        {/* Category tag */}
        <div className="absolute top-4 left-4">
          <span className="text-[8px] font-body font-medium uppercase tracking-[0.3em] text-[#C9A84C] bg-[#060F1A]/80 backdrop-blur-sm px-2.5 py-1">
            {perfume.category}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="px-1">
        <div className="flex items-start justify-between gap-2">
          <h3
            className="font-display font-light leading-snug group-hover:text-[#C9A84C] transition-colors duration-300 flex-1"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '1.35rem',
              color: '#0A1628',
            }}
          >
            {perfume.name}
          </h3>
          <span
            className="font-display font-light text-xl text-[#C9A84C] shrink-0 mt-0.5"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {perfume.price}
          </span>
        </div>

        {/* Animated underline */}
        <div className="mt-3 h-px w-0 bg-[#C9A84C] group-hover:w-full transition-all duration-500" />
      </div>
    </div>
  );
};

export default ProductsPage;
