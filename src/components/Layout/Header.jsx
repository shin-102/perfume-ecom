import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="fixed top-0 w-full z-50 bg-white border-b-2 border-[#FFCA28] shadow-sm">
      <div className="container mx-auto flex flex-wrap p-4 flex-col md:flex-row items-center justify-between">

        {/* Firebase-Inspired Logo */}
        <Link to="/" className="flex title-font font-bold items-center text-[#051e34] mb-4 md:mb-0">
          <div className="bg-[#FFCA28] p-1.5 rounded-lg shadow-inner">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
          <span className="ml-3 text-2xl font-black tracking-tight uppercase">Scent<span className="text-[#FFA000]">Base</span></span>
        </Link>

        {/* Navigation */}
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-sm font-bold text-[#051e34] tracking-wide uppercase">
          <Link to='/' className="mr-8 hover:text-[#039BE5] transition-colors border-b-2 border-transparent hover:border-[#FFCA28] pb-1">Boutique</Link>
          <Link to='/products' className="mr-8 hover:text-[#039BE5] transition-colors border-b-2 border-transparent hover:border-[#FFCA28] pb-1">Collections</Link>
          <Link to='/admin' className="text-xs text-gray-400 hover:text-red-500 transition-colors">Console</Link>
        </nav>

        {/* Interaction */}
        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-[#051e34] hover:text-[#039BE5]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#039BE5] text-[10px] text-white font-bold">0</span>
          </button>
          <button className="bg-[#051e34] text-white px-5 py-2 text-xs font-bold uppercase rounded hover:bg-[#039BE5] shadow-lg transition-all">
            Login
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
