import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false); }, [location]);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-700 ${
          scrolled
            ? 'bg-[#060F1A]/90 backdrop-blur-xl border-b border-white/5 py-3'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-baseline gap-0.5 group">
            <span
              className="font-display text-2xl font-light tracking-[0.15em] text-[#F5F0E8] group-hover:text-[#C9A84C] transition-colors duration-500"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Fire
            </span>
            <span
              className="font-display text-2xl font-semibold tracking-[0.15em] text-[#C9A84C]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Scent
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {[
              { label: 'Boutique', to: '/' },
              { label: 'Collections', to: '/products' },
            ].map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                className={`relative text-[11px] font-body font-medium uppercase tracking-[0.25em] transition-colors duration-300 after:absolute after:-bottom-1 after:left-0 after:h-px after:bg-[#C9A84C] after:transition-all after:duration-500 ${
                  isActive(to)
                    ? 'text-[#C9A84C] after:w-full'
                    : 'text-[#B8B0A4] hover:text-[#F5F0E8] after:w-0 hover:after:w-full'
                }`}
              >
                {label}
              </Link>
            ))}
            <Link
              to="/admin"
              className="text-[10px] font-body font-medium uppercase tracking-[0.2em] text-[#B8B0A4]/50 hover:text-[#B8B0A4] transition-colors duration-300"
            >
              Admin
            </Link>
          </nav>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-6">
            <a
              href="https://wa.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-body font-medium uppercase tracking-[0.25em] text-[#B8B0A4] border border-[#C9A84C]/30 px-5 py-2.5 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all duration-400"
            >
              Enquire
            </a>
          </div>

          {/* Mobile Burger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block h-px w-6 bg-[#F5F0E8] transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-px bg-[#F5F0E8] transition-all duration-300 ${menuOpen ? 'w-0 opacity-0' : 'w-4'}`} />
            <span className={`block h-px w-6 bg-[#F5F0E8] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-[#060F1A] flex flex-col items-center justify-center transition-all duration-700 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col items-center gap-10">
          {[
            { label: 'Boutique', to: '/' },
            { label: 'Collections', to: '/products' },
            { label: 'Admin', to: '/admin' },
          ].map(({ label, to }, i) => (
            <Link
              key={to}
              to={to}
              className="font-display text-5xl font-light tracking-widest text-[#F5F0E8] hover:text-[#C9A84C] transition-colors duration-300"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                animationDelay: `${i * 0.1}s`,
              }}
            >
              {label}
            </Link>
          ))}
        </nav>
        <p className="absolute bottom-10 font-body text-[10px] uppercase tracking-[0.3em] text-[#B8B0A4]/50">
          Luxury Fragrances
        </p>
      </div>
    </>
  );
};

export default Header;
