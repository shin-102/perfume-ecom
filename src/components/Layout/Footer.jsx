import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#060F1A] text-[#B8B0A4] overflow-hidden relative">

      {/* ── Oversized background text ── */}
      <div
        className="absolute bottom-0 left-0 right-0 select-none pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <p
          className="font-display font-light text-center leading-none whitespace-nowrap"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(5rem, 18vw, 16rem)',
            color: 'transparent',
            WebkitTextStroke: '1px rgba(201,168,76,0.06)',
            transform: 'translateY(30%)',
            letterSpacing: '0.05em',
          }}
        >
          FireScent
        </p>
      </div>

      {/* ── Top section ── */}
      <div className="relative z-10 container mx-auto px-6 md:px-16 lg:px-24 pt-24 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20">

          {/* Brand column — 5 cols */}
          <div className="md:col-span-5">
            <Link to="/" className="inline-flex items-baseline gap-0.5 mb-8 group">
              <span
                className="font-display font-light tracking-[0.15em] text-[#F5F0E8] text-3xl group-hover:text-[#C9A84C] transition-colors duration-500"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Fire
              </span>
              <span
                className="font-display font-semibold tracking-[0.15em] text-[#C9A84C] text-3xl"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Scent
              </span>
            </Link>

            <p className="font-body font-light text-[#B8B0A4] leading-relaxed text-sm max-w-xs">
              Elevating fragrance through rare ingredients, artisanal craft, and the relentless pursuit of olfactory excellence.
            </p>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 mt-10 text-[10px] font-body font-medium uppercase tracking-[0.3em] text-[#C9A84C] border border-[#C9A84C]/30 px-6 py-3.5 hover:border-[#C9A84C] hover:bg-[#C9A84C]/5 transition-all duration-400"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.529 5.855L0 24l6.335-1.499A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.6a9.578 9.578 0 01-4.905-1.35l-.35-.21-3.762.89.943-3.653-.228-.374A9.571 9.571 0 012.4 12C2.4 6.699 6.699 2.4 12 2.4S21.6 6.699 21.6 12 17.301 21.6 12 21.6z"/>
              </svg>
              Enquire via WhatsApp
            </a>
          </div>

          {/* Nav columns — 7 cols */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-10">
            {[
              {
                title: 'Collection',
                links: ['Best Sellers', 'New Arrivals', 'Exclusives', 'Gift Sets'],
              },
              {
                title: 'Support',
                links: ['Track Order', 'Returns', 'Contact Us', 'FAQ'],
              },
              {
                title: 'Company',
                links: ['Our Story', 'Craftsmanship', 'Sustainability', 'Careers'],
              },
            ].map(({ title, links }) => (
              <div key={title}>
                <h3
                  className="font-body font-medium text-[10px] uppercase tracking-[0.35em] text-[#C9A84C] mb-6"
                >
                  {title}
                </h3>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="font-body font-light text-sm text-[#B8B0A4] hover:text-[#F5F0E8] transition-colors duration-300"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="relative z-10 mx-6 md:mx-16 lg:mx-24 h-px bg-white/5" />

      {/* ── Bottom row ── */}
      <div className="relative z-10 container mx-auto px-6 md:px-16 lg:px-24 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-body font-light text-[11px] text-[#B8B0A4]/40 uppercase tracking-[0.25em]">
          © {new Date().getFullYear()} <a href="https://decipher-agency.com" className='hover:text-sky-400 transition-colors'>Decipher Agency</a>. All rights reserved.
        </p>

        <div className="flex items-center gap-6">
          {/* Social icons */}
          {[
            {
              label: 'Instagram',
              icon: (
                <svg fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                </svg>
              ),
            },
            {
              label: 'Twitter',
              icon: (
                <svg fill="currentColor" className="w-4 h-4" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              ),
            },
            {
              label: 'Facebook',
              icon: (
                <svg fill="currentColor" className="w-4 h-4" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              ),
            },
          ].map(({ label, icon }) => (
            <a
              key={label}
              href="#"
              aria-label={label}
              className="text-[#B8B0A4]/40 hover:text-[#C9A84C] transition-colors duration-300"
            >
              {icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
