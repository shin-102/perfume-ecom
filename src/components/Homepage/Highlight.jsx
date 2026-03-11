import { useState, useEffect } from 'react';
import useFirestore from '../../hooks/useFirestore';
import { ArrowUpRight } from 'lucide-react';

const Highlight = () => {
  const { data: perfumes, loading, error } = useFirestore('perfumes');
  const [highlightedPerfumes, setHighlightedPerfumes] = useState([]);

  useEffect(() => {
    if (perfumes && perfumes.length > 0) {
      // Taking the first 4 to maintain the grid balance
      setHighlightedPerfumes(perfumes.slice(0, 4));
    }
  }, [perfumes]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 space-y-6 bg-white">
        <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#039BE5]"></div>
            <div className="absolute inset-0 flex items-center justify-center font-black text-[10px] text-[#051e34]">DB</div>
        </div>
        <p className="text-[#051e34] font-black uppercase tracking-[0.4em] text-[10px]">Syncing Scent Registry...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container px-5 py-24 mx-auto text-center bg-white">
        <div className="bg-red-50 border-l-4 border-red-500 p-6 inline-block text-left">
            <p className="text-red-500 text-[10px] font-black uppercase tracking-widest mb-1">System Error</p>
            <p className="text-gray-700 font-bold uppercase tracking-tight">External Sync Interrupted: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-white text-[#051e34] body-font relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#051e34_1px,transparent_1px)] bg-size-[20px_20px]"></div>

      <div className="container px-5 py-24 mx-auto relative z-10">
        <div className="flex flex-wrap w-full mb-20 items-end">
          <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
            <div className="flex items-center gap-2 mb-2">
                <span className="h-0.5 w-8 bg-[#FFCA28]"></span>
                <h2 className="text-[10px] text-[#039BE5] tracking-[0.4em] font-black uppercase">Curated Discovery</h2>
            </div>
            <h1 className="text-5xl font-black title-font uppercase tracking-tighter leading-none">
                Featured <br/> <span className="text-[#039BE5]">Fragrances</span>
            </h1>
          </div>
          <div className="lg:w-1/2 w-full">
            <p className="leading-relaxed text-gray-500 font-medium text-lg border-l-2 border-gray-100 pl-6 lg:ml-6">
              Our automated registry highlights artisanal blends that redefine modern perfumery.
              Each entry is verified for potency, longevity, and rare molecular composition.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap -m-4">
          {highlightedPerfumes.map((perfume, index) => (
            <div key={perfume.id} className="xl:w-1/4 md:w-1/2 p-4 group">
              <div className="bg-white p-2 h-full border border-gray-100 group-hover:border-[#039BE5]/20 transition-all duration-500 relative">

                {/* Visual ID Tag */}
                <div className="absolute top-0 left-0 bg-[#051e34] text-[#FFCA28] text-[9px] font-black px-3 py-1 z-20">
                    ENTRY_00{index + 1}
                </div>

                <div className="relative overflow-hidden aspect-4/5 bg-gray-50">
                   <img
                    className="h-full w-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                    src={perfume.image}
                    alt={perfume.name}
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-[#051e34]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <div className="p-4 bg-white/90 backdrop-blur-sm scale-90 group-hover:scale-100 transition-transform duration-500">
                        <ArrowUpRight size={24} className="text-[#051e34]" />
                    </div>
                  </div>
                </div>

                <div className="p-4 mt-2">
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-[#039BE5] text-[9px] font-black uppercase tracking-[0.2em]">{perfume.category}</span>
                        <span className="text-[#FFA000] font-black text-xs tracking-tighter">{perfume.price}</span>
                    </div>
                    <h2 className="text-lg text-[#051e34] font-black uppercase tracking-tight mb-3 group-hover:text-[#039BE5] transition-colors">
                        {perfume.name}
                    </h2>
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest leading-relaxed line-clamp-2 mb-4">
                        {perfume.description}
                    </p>

                    <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                        <span className="text-[9px] font-black uppercase text-gray-300">Auth Registry Inc.</span>
                        <button className="text-[#051e34] font-black text-[10px] uppercase tracking-widest flex items-center group/btn">
                           Analyze
                           <span className="ml-1 h-0.5 w-0 bg-[#FFCA28] group-hover/btn:w-4 transition-all duration-300"></span>
                        </button>
                    </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Highlight;
