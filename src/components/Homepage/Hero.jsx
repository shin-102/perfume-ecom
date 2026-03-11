import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="text-[#051e34] body-font pt-20 bg-linear-to-b from-white to-gray-50">
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        <div className="lg:grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-5xl text-4xl mb-6 font-black leading-tight uppercase tracking-tighter">
            Digital Luxury,
            <br className="hidden lg:inline-block"/> <span className="text-[#FFA000]">Analogue Essence</span>
          </h1>
          <p className="mb-8 leading-relaxed text-gray-600 text-lg max-w-lg">
            Experience the future of fragrance. ScentBase combines curated artisanal perfumery with the reliability of Firebase technology to deliver your next signature scent instantly.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/products" className="inline-flex text-white bg-[#051e34] border-0 py-3 px-8 focus:outline-none hover:bg-[#039BE5] rounded-sm text-sm font-bold uppercase tracking-widest shadow-xl transition-all">
              Explore Shop
            </Link>
            <Link to="/admin" className="inline-flex text-[#051e34] border-2 border-[#051e34] py-2.5 px-8 focus:outline-none hover:bg-[#051e34] hover:text-white rounded-sm text-sm font-bold uppercase tracking-widest transition-all">
              Dashboard
            </Link>
          </div>
        </div>
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 relative">
          {/* Decorative Glow */}
          <div className="absolute -inset-4 bg-[#FFCA28] rounded-full blur-3xl opacity-10 animate-pulse"></div>
          <img
            className="relative object-cover object-center rounded-2xl shadow-2xl border-t-8 border-[#FFCA28]"
            alt="luxury perfume bottle"
            src="https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=720&h=600"
          />
        </div>
      </div>
    </section>
  )
}

export default Hero;
