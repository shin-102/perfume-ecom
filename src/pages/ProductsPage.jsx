import React, { useState, useEffect, useRef } from 'react';
import { Search, X, MessageCircle, SlidersHorizontal, ArrowRight } from 'lucide-react';
import Layout from '../components/Layout/Layout';
import useFirestore from '../hooks/useFirestore';

const ProductsPage = () => {
  const { data: perfumes, loading, error } = useFirestore('perfumes');
  const [selectedPerfume, setSelectedPerfume] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredPerfumes, setFilteredPerfumes] = useState([]);
  const sidePanelRef = useRef(null);

  const categories = ['All', ...new Set(perfumes.map(perfume => perfume?.category).filter(Boolean))];

  useEffect(() => {
    const filtered = perfumes.filter(perfume => {
      const matchesSearch = perfume?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            perfume?.description?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || perfume?.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
    setFilteredPerfumes(filtered);
  }, [searchQuery, selectedCategory, perfumes]);

  const handleProductClick = (perfume) => setSelectedPerfume(perfume);
  const closeSidePanel = () => setSelectedPerfume(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidePanelRef.current && !sidePanelRef.current.contains(event.target)) {
        closeSidePanel();
      }
    };
    if (selectedPerfume) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [selectedPerfume]);

  const createWhatsAppLink = (perfumeName) => {
    const message = `Hi, I'm interested in purchasing ${perfumeName}. Can you provide more information?`;
    return `https://wa.me/?text=${encodeURIComponent(message)}`;
  };

  if (loading) return <Layout><div className="mt-40 flex flex-col items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FFCA28]"></div></div></Layout>;
  if (error) return <Layout><div className="mt-40 text-center text-red-500 font-bold uppercase tracking-widest">Console Error: {error}</div></Layout>;

  return (
    <Layout>
      <div className='mt-24 min-h-screen bg-white'>
        <div className="container mx-auto p-6">

          {/* Header Section */}
          <div className="mb-12 border-b-4 border-[#051e34] pb-6">
            <h1 className="text-4xl font-black text-[#051e34] uppercase tracking-tighter">Full Collection</h1>
            <p className="text-[#039BE5] font-bold text-xs uppercase tracking-[0.3em] mt-2">Filter by attributes or search name</p>
          </div>

          {/* Controls Section */}
          <div className="flex flex-col md:flex-row gap-6 mb-12">
            <div className="relative flex-1 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-[#039BE5] transition-colors" />
              <input
                type="text"
                placeholder="Search the scent database..."
                className="pl-12 pr-4 py-4 w-full rounded-none border-b-2 border-gray-200 focus:border-[#FFCA28] focus:outline-none bg-gray-50/50 text-[#051e34] font-medium"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="md:w-72 relative">
              <SlidersHorizontal className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              <select
                className="w-full pl-10 pr-4 py-4 appearance-none rounded-none border-b-2 border-gray-200 focus:border-[#FFCA28] focus:outline-none bg-gray-50/50 text-[#051e34] font-bold text-xs uppercase tracking-widest"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredPerfumes.length > 0 ? (
              filteredPerfumes.map(perfume => (
                <div
                  key={perfume.id}
                  className="group relative bg-white overflow-hidden border border-gray-100 hover:border-transparent transition-all duration-500 hover:shadow-[0_20px_50px_rgba(5,30,52,0.1)]"
                  onClick={() => handleProductClick(perfume)}
                >
                  <div className="aspect-3/4 overflow-hidden bg-gray-100">
                    <img
                      src={perfume.image}
                      alt={perfume.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                        <span className="bg-[#051e34] text-white text-[10px] font-black px-3 py-1 uppercase tracking-widest">
                            {perfume.category}
                        </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h2 className="text-lg font-black text-[#051e34] uppercase tracking-tight mb-1 group-hover:text-[#039BE5] transition-colors">{perfume.name}</h2>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-[#FFA000] font-black tracking-tighter text-xl">{perfume.price}</span>
                      <button className="text-[#051e34] flex items-center gap-1 text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                        Details <ArrowRight size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-20 border-2 border-dashed border-gray-200">
                <p className="text-gray-400 font-bold uppercase tracking-[0.2em]">No results found in Registry</p>
              </div>
            )}
          </div>
        </div>

        {/* Side Panel (Glassmorphism) */}
        {selectedPerfume && (
          <div className="fixed inset-0 bg-[#051e34]/60 backdrop-blur-sm z-60 flex justify-end">
            <div
              ref={sidePanelRef}
              className="bg-white w-full max-w-lg h-full overflow-y-auto shadow-2xl animate-slide-in"
            >
              <div className="sticky top-0 bg-white/90 backdrop-blur-md p-6 border-b border-gray-100 flex justify-between items-center z-10">
                <h2 className="text-xs font-black text-[#051e34] uppercase tracking-[0.4em]">Product Analysis</h2>
                <button onClick={closeSidePanel} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X size={20} /></button>
              </div>

              <div className="p-8">
                <div className="relative mb-8 group">
                  <div className="absolute -inset-1 bg-[#FFCA28] opacity-20 blur-xl group-hover:opacity-40 transition-opacity"></div>
                  <img src={selectedPerfume.image} alt={selectedPerfume.name} className="relative w-full aspect-square object-cover rounded-none shadow-2xl border-b-8 border-[#FFCA28]" />
                </div>

                <div className="mb-8">
                  <span className="text-[#039BE5] font-black text-[10px] uppercase tracking-widest">{selectedPerfume.category}</span>
                  <h3 className="text-4xl font-black text-[#051e34] uppercase tracking-tighter mt-2">{selectedPerfume.name}</h3>
                  <p className="text-[#FFA000] text-3xl font-black tracking-tighter mt-2">{selectedPerfume.price}</p>
                </div>

                <div className="space-y-6">
                   <div>
                      <h4 className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-2">Description</h4>
                      <p className="text-gray-600 leading-relaxed font-medium">{selectedPerfume.description}</p>
                   </div>

                   <div className="bg-gray-50 p-6 border-l-4 border-[#039BE5]">
                      <h4 className="text-[10px] font-black uppercase text-[#051e34] tracking-widest mb-2">Scent Registry Details</h4>
                      <p className="text-sm text-gray-500 italic">{selectedPerfume.details || "Artisanal blend of rare essential oils and molecular notes."}</p>
                   </div>

                    <a
                      href={createWhatsAppLink(selectedPerfume.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-[#051e34] text-white text-center py-5 rounded-none font-black text-xs uppercase tracking-[0.2em] hover:bg-[#039BE5] transition-all flex items-center justify-center gap-3 shadow-xl"
                    >
                      <MessageCircle size={18} />
                      Enquire via WhatsApp
                    </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductsPage;
