const Hero = () => {
  return (
    <div className="relative min-h-[calc(100vh-80px)] flex flex-col justify-between px-6 py-12 md:px-16 md:py-20 lg:px-24 overflow-hidden">
      {/* Top Section */}
      <div className="flex flex-col gap-6 z-10">
        <h2 className="font-consolas text-lg md:text-xl text-white tracking-[0.2em] uppercase">
          KADIRI MAROOF AKINBAYODE
        </h2>

        <div className="flex items-center gap-3 font-consolas text-[11px] md:text-sm text-[#0EC126] uppercase tracking-wider">
          <div className="w-8 h-8 relative">
            <img
              src="assets/green-circle.png"
              alt=""
              className="relative animate-spin w-full h-full"
            />
            <img
              src="assets/green-ellipse.png"
              alt=""
              className="absolute left-1/2 top-1/2 w-3 h-3 -translate-x-1/2 -translate-y-1/2"
            />
          </div>
          <p>Available for work</p>
        </div>
      </div>

      {/* Main Title Section */}
      <div className="mb-12 md:mb-20 z-10">
        <h1 className="font-consolas text-2xl md:text-4xl lg:text-6xl font-bold text-white leading-[1.1] max-w-6xl">
          Front End Developer & AI Automation Engineer
        </h1>
      </div>

      <img
        src="assets/dna-gray.png"
        alt="DNA Structure"
        className="absolute right-0 -bottom-20 w-1/2 opacity-50 "
      />
    </div>
  );
};

export default Hero;
