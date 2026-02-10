import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChamferBox } from "./ChamferBox";
import { useSound } from "../hooks/useSound";

const TABS = [
  { label: "Work", id: "work" },
  { label: "Profile", id: "profile" },
  { label: "Contact", id: "contact" },
];

const Navbar = () => {
  const [activeTab, setActiveTab] = useState("");
  const { play } = useSound("/audio/click-1.mp3");

  const scrollToSection = (id: string, label: string) => {
    const element = document.getElementById(id);
    if (element) {
      play();
      element.scrollIntoView({ behavior: "smooth", block: "center" });
      setActiveTab(label);
    }
  };

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px", // Adjust these values to tune when a section is considered "active"
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.id === "hero") {
            setActiveTab("");
          } else {
            const tab = TABS.find((t) => t.id === entry.target.id);
            if (tab) {
              setActiveTab(tab.label);
            }
          }
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );

    // Observe all tabs
    TABS.forEach((tab) => {
      const element = document.getElementById(tab.id);
      if (element) observer.observe(element);
    });

    // Also observe hero to clear active tab
    const heroElement = document.getElementById("hero");
    if (heroElement) observer.observe(heroElement);

    return () => observer.disconnect();
  }, []);

  return (
    <ChamferBox orientation="tl-br" className="bg-[#4A4A4A] p-px flex-none">
      <div className="chamfer-box tl-br bg-black overflow-hidden">
        <div className="flex justify-center items-center relative px-20">
          {TABS.map((tab) => (
            <button
              key={tab.label}
              onClick={() => scrollToSection(tab.id, tab.label)}
              className={`relative px-8 py-3 text-sm font-medium transition-colors duration-200 cursor-pointer outline-none ${
                activeTab === tab.label
                  ? "text-white"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              <span className="relative z-10 font-consolas uppercase tracking-wider">
                {tab.label}
              </span>
              {activeTab === tab.label && (
                <motion.div
                  layoutId="active-tab"
                  className="absolute inset-y-0 left-0 right-0 border-y border-white"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                  }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </ChamferBox>
  );
};

export default Navbar;
