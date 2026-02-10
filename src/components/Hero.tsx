import { useState, useEffect, useRef } from "react";
import Typewriter from "./Typewriter";

const Hero = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [targetText, setTargetText] = useState("KADIRI MAROOF AKINBAYODE");
  const [isHovered, setIsHovered] = useState(false);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const leaveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate normalized mouse position relative to center of viewport (-0.5 to 0.5)
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      id="hero"
      className="relative min-h-[calc(100vh-80px)] !py-0 flex justify-around section flex-col overflow-hidden backdrop-blur-3xl"
    >
      {/* Top Section */}
      <div className="flex flex-col gap-6 z-10">
        <h2
          className={`font-consolas text-lg md:text-xl text-white tracking-[0.2em] uppercase group py-3 w-1/2 transition-all duration-300 ease-in-out ${isHovered ? "border-y cursor-crosshair border-white" : ""}`}
          onMouseEnter={() => {
            if (leaveTimeoutRef.current) {
              clearTimeout(leaveTimeoutRef.current);
              leaveTimeoutRef.current = null;
            }
            hoverTimeoutRef.current = setTimeout(() => {
              setTargetText("CODENAME: PURPLE DNA");
              setIsHovered(true);
            }, 250);
          }}
          onMouseLeave={() => {
            if (hoverTimeoutRef.current) {
              clearTimeout(hoverTimeoutRef.current);
              hoverTimeoutRef.current = null;
            }

            leaveTimeoutRef.current = setTimeout(() => {
              setTargetText("KADIRI MAROOF AKINBAYODE");
              setIsHovered(false);
            }, 250);
          }}
        >
          <Typewriter text={targetText} speed={50} eraseSpeed={20} />
        </h2>

        <div className="flex items-center gap-3 font-consolas text-[11px] md:text-sm text-[#0EC126] uppercase tracking-wider">
          <div className="w-8 h-8 relative">
            <img
              src="assets/green-circle.png"
              alt=""
              className="relative animate-spin w-full h-full animation-duration-3000"
            />
            <img
              src="assets/green-ellipse.png"
              alt=""
              className="absolute left-1/2 top-1/2 w-3 h-3 -translate-x-1/2 -translate-y-1/2 animate-[spin_3s_linear_infinite_reverse]"
            />
          </div>
          <p>Available for work</p>
        </div>
      </div>

      {/* Main Title Section */}
      <div className="mb-12 md:mb-20 z-10">
        <h1 className="font-consolas text-2xl md:text-4xl lg:text-6xl font-bold text-white leading-[1.1] max-w-6xl animate-slide-up-fade opacity-0 [animation-delay:400ms]">
          Front End Developer & AI Automation Engineer
        </h1>
      </div>

      <img
        src="assets/dna-gray.png"
        alt="DNA Structure"
        className={`absolute left-1/2 top-1/2 -translate-1/2 w-1/2 pointer-events-none transition-all duration-700 ease-out blur-sm ${
          isHovered
            ? "opacity-60 sepia-[1] hue-rotate-250 saturate-[5] brightness-125 drop-shadow-[0_0_50px_rgba(168,85,247,0.5)] animate-dna-pulse"
            : "opacity-20 scale-[1.3]"
        }`}
        style={{
          transform: `translate(${mousePos.x * -400}px, ${mousePos.y * -400}px)`,
        }}
      />
    </div>
  );
};

export default Hero;
