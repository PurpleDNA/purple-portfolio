import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import ProjectComponent from "./ProjectComponent";
import ProjectModal from "./ProjectModal";
import { projects } from "../data/projects";

const Projects = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const mobileSliderRef = useRef<HTMLDivElement>(null);

  const handleProjectClick = (id: string) => {
    setSelectedProjectId(id);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const observerOptions = {
      root: mobileSliderRef.current,
      threshold: 0.6,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = parseInt(
            entry.target.getAttribute("data-index") || "0",
          );
          setCurrentIndex(index);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );
    const targets = mobileSliderRef.current?.querySelectorAll("[data-index]");
    targets?.forEach((t) => observer.observe(t));

    return () => observer.disconnect();
  }, []);

  return (
    <div id="work" className="section space-y-8">
      <div className="flex flex-col gap-4 w-full">
        <h1 className="font-consolas text-xl md:text-2xl lg:text-3xl font-bold text-white leading-[1.1] ">
          Selected Projects
        </h1>
        <p className="font-satoshi text-white leading-normal w-full md:w-1/2 text-sm md:text-base">
          I focus on building fast, responsive interfaces with clean,
          maintainable code. I’m mindful of performance, accessibility, and
          state management, and how architectural decisions impact long-term
          scalability.
        </p>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex justify-between gap-10 items-center">
        <div className="flex flex-col gap-10 w-[40%]">
          {projects.map((p, index) => (
            <ProjectComponent
              key={p.id}
              name={p.name}
              organization={p.organization}
              skill={p.skill}
              year={p.year}
              isActive={index === currentIndex}
              index={index}
              setProject={() => setCurrentIndex(index)}
              onClick={() => handleProjectClick(p.id)}
            />
          ))}
        </div>
        <div className="w-1/2 overflow-hidden aspect-square relative shrink-0">
          <motion.div
            className="absolute inset-0 w-full h-full"
            animate={{ y: `-${currentIndex * 100}%` }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 20,
              mass: 1,
              duration: 300,
            }}
          >
            {projects.map((p, index) => (
              <div key={index} className="w-full h-full shrink-0 p-10">
                <img src={p.image} alt={p.name} className="w-full h-full" />
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Mobile Reels-Style Slider */}
      <div className="md:hidden relative group">
        <div
          ref={mobileSliderRef}
          className="h-[60vh] overflow-y-auto snap-y snap-mandatory no-scrollbar pr-8"
        >
          {projects.map((p, index) => (
            <div
              key={p.id}
              data-index={index}
              className="snap-start w-full h-full shrink-0 flex flex-col gap-4 pb-16"
              onClick={() => handleProjectClick(p.id)}
            >
              <div className="flex flex-col gap-1">
                <h3 className="text-xl font-bold text-white font-consolas">
                  {p.name} {p.organization}
                </h3>
                <span className="text-[10px] text-gray-500 font-consolas uppercase tracking-widest">
                  {p.skill} {p.year}
                </span>
              </div>
              <div className="flex-1 overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Sleek Custom Tracker */}
        <div className="absolute right-0 top-0 bottom-16 flex flex-col items-center py-4">
          <div className="w-px h-full bg-white/10 relative">
            <motion.div
              className="absolute w-0.5 bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
              animate={{
                height: `${100 / projects.length}%`,
                top: `${(currentIndex / projects.length) * 100}%`,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </div>
        </div>
      </div>

      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        projectId={selectedProjectId}
        onNavigate={(id: string) => setSelectedProjectId(id)}
        setCurrentIndex={setCurrentIndex}
      />
    </div>
  );
};

export default Projects;
