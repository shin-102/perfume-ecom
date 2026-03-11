const Footer = () => {
  return (
    <footer className="bg-[#051e34] text-gray-300 font-sans border-t-4 border-[#FFCA28]">
      <div className="container px-5 py-16 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">

        {/* Brand Column */}
        <div className="w-64 shrink-0 md:mx-0 mx-auto text-center md:text-left">
          <a className="flex title-font font-medium items-center md:justify-start justify-center text-white">
            <div className="bg-[#FFCA28] p-1.5 rounded-lg">
               <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
               </svg>
            </div>
            <span className="ml-3 text-xl font-bold tracking-widest uppercase">Scent<span className="text-[#FFCA28]">Base</span></span>
          </a>
          <p className="mt-4 text-sm leading-relaxed">Elevating fragrance through the power of data and luxury craftsmanship.</p>
        </div>

        {/* Links Columns */}
        <div className="flex grow flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
          {["Collection", "Support", "Company"].map((title, i) => (
            <div key={i} className="lg:w-1/3 md:w-1/2 w-full px-4">
              <h2 className="title-font font-bold text-[#FFCA28] tracking-widest text-sm mb-4 uppercase">{title}</h2>
              <nav className="list-none mb-10 space-y-2 text-sm">
                <li><a className="hover:text-white transition-colors cursor-pointer">Best Sellers</a></li>
                <li><a className="hover:text-white transition-colors cursor-pointer">New Arrivals</a></li>
                <li><a className="hover:text-white transition-colors cursor-pointer">Track Order</a></li>
              </nav>
            </div>
          ))}
        </div>
      </div>

      {/* Socials & Copyright */}
      <div className="bg-[#021424] py-6">
        <div className="container mx-auto px-5 flex flex-wrap flex-col sm:flex-row items-center">
          <p className="text-gray-500 text-sm sm:text-left text-center">
            © {new Date().getFullYear()} ScentBase — Built with Firebase
          </p>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
            <a className="text-[#FFCA28] hover:text-[#039BE5] transition-transform hover:scale-125 cursor-pointer">
              <svg fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path></svg>
            </a>
            <a className="ml-4 text-[#FFCA28] hover:text-[#039BE5] transition-transform hover:scale-125 cursor-pointer">
              <svg fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path></svg>
            </a>
            <a className="ml-4 text-[#FFCA28] hover:text-[#039BE5] transition-transform hover:scale-125 cursor-pointer">
              <svg fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path></svg>
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
