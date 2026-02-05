import { useState } from "react";
import { motion } from "framer-motion";
import { ChamferBox } from "./ChamferBox";

const TABS = ["Work", "Profile", "Contact"];

const Navbar = () => {
  const [activeTab, setActiveTab] = useState("Work");

  return (
    <ChamferBox orientation="tl-br" className="bg-[#4A4A4A] p-px flex-none">
      <div className="chamfer-box tl-br bg-black overflow-hidden">
        <div className="flex justify-center items-center relative px-20">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-8 py-3 text-sm font-medium transition-colors duration-200 cursor-pointer outline-none ${
                activeTab === tab
                  ? "text-white"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              <span className="relative z-10">{tab}</span>
              {activeTab === tab && (
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
