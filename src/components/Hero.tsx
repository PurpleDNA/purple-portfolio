import { useState, useEffect, useRef } from "react";
import Typewriter from "./Typewriter";

const REAL_NAME = "KADIRI MAROOF AKINBAYODE";
const CODENAME = "CODENAME: PURPLE DNA";

const Hero = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [targetText, setTargetText] = useState(REAL_NAME);
  const [isHovered, setIsHovered] = useState(false);
  // The "hover to decode" prompt is retired for the session once they hover.
  const [showDecodeHint, setShowDecodeHint] = useState(
    () => sessionStorage.getItem("decodeHintDismissed") !== "true",
  );
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const leaveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const userInteractedRef = useRef(false);
  const demoRevertRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dismissDecodeHint = () => {
    sessionStorage.setItem("decodeHintDismissed", "true");
    setShowDecodeHint(false);
  };

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

  // One-time teaser: shortly after load, auto-play the name/helix effect once
  // and then revert — so visitors learn the name is interactive. The blinking
  // "hover to decode" prompt then invites them to try it themselves. Skipped if
  // they've already discovered it this session (or hover before it fires).
  useEffect(() => {
    if (sessionStorage.getItem("decodeHintDismissed") === "true") return;

    const startTimer = setTimeout(() => {
      if (userInteractedRef.current) return;
      setTargetText(CODENAME);
      setIsHovered(true);
      demoRevertRef.current = setTimeout(() => {
        if (userInteractedRef.current) return;
        setTargetText(REAL_NAME);
        setIsHovered(false);
      }, 2200);
    }, 3000);

    return () => {
      clearTimeout(startTimer);
      if (demoRevertRef.current) clearTimeout(demoRevertRef.current);
    };
  }, []);

  return (
    <div
      id="hero"
      className="relative min-h-[calc(100vh-80px)] !py-0 flex justify-around section flex-col overflow-hidden backdrop-blur-3xl"
    >
      {/* Top Section */}
      <div className="flex flex-col gap-6 z-10">
        <div className="flex flex-col gap-1 w-1/2">
          <h2
            className={`font-consolas text-lg md:text-xl text-white tracking-[0.2em] uppercase group py-3 w-full transition-all duration-300 ease-in-out ${isHovered ? "border-y cursor-crosshair border-white" : ""}`}
            onMouseEnter={() => {
              // A real hover cancels the teaser, retires the hint, and takes over.
              userInteractedRef.current = true;
              dismissDecodeHint();
              if (demoRevertRef.current) {
                clearTimeout(demoRevertRef.current);
                demoRevertRef.current = null;
              }
              if (leaveTimeoutRef.current) {
                clearTimeout(leaveTimeoutRef.current);
                leaveTimeoutRef.current = null;
              }
              hoverTimeoutRef.current = setTimeout(() => {
                setTargetText(CODENAME);
                setIsHovered(true);
              }, 250);
            }}
            onMouseLeave={() => {
              if (hoverTimeoutRef.current) {
                clearTimeout(hoverTimeoutRef.current);
                hoverTimeoutRef.current = null;
              }

              leaveTimeoutRef.current = setTimeout(() => {
                setTargetText(REAL_NAME);
                setIsHovered(false);
              }, 250);
            }}
          >
            <Typewriter text={targetText} speed={50} eraseSpeed={20} />
          </h2>

          {/* Discoverability hint — a dim terminal prompt that blinks, telling
              visitors the name responds to hover. Hidden while the effect is
              active, and gone for good once they've hovered this session. */}
          <span
            className={`font-consolas text-[10px] md:text-xs uppercase tracking-[0.2em] text-white/40 transition-opacity duration-300 ${showDecodeHint && !isHovered ? "opacity-100" : "opacity-0"}`}
          >
            <span className="text-white/60">&#9656;</span> hover name to decode
            <span className="animate-blink">_</span>
          </span>
        </div>

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
