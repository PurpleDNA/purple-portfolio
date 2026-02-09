import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { projects } from "../data/projects";
import { useSound } from "../hooks/useSound";
import { useEffect, useState, useRef } from "react";
import "./ProjectModal.css";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string | null;
  onNavigate: (id: string) => void;
}

const ProjectModal = ({
  isOpen,
  onClose,
  projectId,
  onNavigate,
}: ProjectModalProps) => {
  const { play } = useSound("/audio/click-1.mp3");
  const [enlargedIndex, setEnlargedIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Navigation wrapper to reset state correctly
  const handleProjectChange = (id: string) => {
    play();
    setEnlargedIndex(null);
    onNavigate(id);
  };

  const projectIndex = projects.findIndex((p) => p.id === projectId);
  const project = projectIndex !== -1 ? projects[projectIndex] : null;

  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : null;
  const nextProject =
    projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null;

  // Handle image navigation
  const navigateImage = (dir: "prev" | "next") => {
    if (!project || enlargedIndex === null) return;
    play();
    const newDir = dir === "next" ? 1 : -1;
    setDirection(newDir);
    const newIndex =
      (enlargedIndex + newDir + project.images.length) % project.images.length;
    setEnlargedIndex(newIndex);
  };

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-100 bg-[#0a0a0a] backdrop-blur-md backdrop-opacity-10"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="relative w-full h-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Viewport (Full Screen) */}
            <div className="relative w-full h-full overflow-hidden">
              {/* 1. Scrollable Content Area */}
              <div
                key={projectId}
                ref={scrollContainerRef}
                className={`w-full h-screen p-6 md:p-10 custom-scrollbar ${
                  enlargedIndex !== null ? "overflow-hidden" : "overflow-y-auto"
                }`}
              >
                {/* Content Wrapper (Fades out when enlarged) */}
                <div
                  className={`transition-opacity duration-300 ${enlargedIndex !== null ? "opacity-0 pointer-events-none" : "opacity-100"}`}
                >
                  {/* Back Button */}
                  <button
                    onClick={() => {
                      play();
                      onClose();
                    }}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-12 group"
                  >
                    <ArrowLeft
                      size={18}
                      className="group-hover:-translate-x-1 transition-transform"
                    />
                    <span className="font-consolas text-sm">Go Back</span>
                  </button>

                  {/* Info Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="space-y-10">
                      <h1 className="text-3xl md:text-5xl font-consolas font-bold leading-tight">
                        {project.title}
                      </h1>
                      <p className="text-base md:text-lg leading-relaxed max-w-xl">
                        {project.description}
                      </p>

                      <div className="grid grid-cols-2 gap-8">
                        <div>
                          <h3 className="text-xs font-consolas mb-2 uppercase tracking-widest font-semibold">
                            Industry
                          </h3>
                          <p className="text-gray-200 text-sm font-satoshi">
                            {project.industry}
                          </p>
                        </div>
                        <div>
                          <h3 className="text-xs font-consolas mb-2 uppercase tracking-widest font-semibold">
                            Classification
                          </h3>
                          <p className="text-gray-200 text-sm font-satoshi">
                            {project.classifications}
                          </p>
                        </div>
                        <div>
                          <h3 className="text-xs font-consolas mb-2 uppercase tracking-widest font-semibold">
                            Technology
                          </h3>
                          <p className="text-gray-200 text-sm font-satoshi">
                            {project.technology.join(", ")}
                          </p>
                        </div>
                        <div>
                          <h3 className="text-xs font-consolas  mb-2 uppercase tracking-widest font-semibold">
                            Role
                          </h3>
                          <p className="text-gray-200 text-sm font-satoshi">
                            {project.role}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-10">
                      <div>
                        <h3 className="text-lg font-consolas text-white mb-4 border-b border-white/10 pb-2 inline-block">
                          Challenges
                        </h3>
                        <ul className="space-y-3">
                          {project.challenges.map((c, i) => (
                            <li
                              key={i}
                              className="flex gap-3 text-gray-400 text-sm font-satoshi"
                            >
                              <span className="text-purple-500">•</span>
                              {c}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-lg font-consolas text-white mb-4 border-b border-white/10 pb-2 inline-block">
                          Solution
                        </h3>
                        <ul className="space-y-3">
                          {project.solutions.map((s, i) => (
                            <li
                              key={i}
                              className="flex gap-3 text-gray-400 text-sm font-satoshi"
                            >
                              <span className="text-green-500">•</span>
                              {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Image Slider */}
                  <div className="mt-20 relative overflow-hidden rounded-2xl bg-transparent py-8 group/slider">
                    <div
                      className="flex gap-6 whitespace-nowrap animate-slide"
                      style={{ width: "fit-content" }}
                    >
                      {project.images.concat(project.images).map((img, i) => (
                        <div
                          key={i}
                          className="w-72 md:w-96 h-48 md:h-64 bg-gray-900 rounded-xl overflow-hidden shrink-0 border border-white/5 shadow-2xl cursor-pointer hover:scale-120 transition-all duration-300 hover:mx-10"
                          onClick={() => {
                            play();
                            setEnlargedIndex(i % project.images.length);
                          }}
                        >
                          <img
                            src={img}
                            alt=""
                            className="w-full h-full object-cover transition-all duration-500"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Project Navigation Footer */}
                  <div className="mt-16 flex items-center justify-center gap-48">
                    <div className="w-max">
                      {prevProject && (
                        <button
                          onClick={() => handleProjectChange(prevProject.id)}
                          className="flex items-center gap-4 text-gray-500 hover:text-white transition-colors group text-left cursor-pointer"
                        >
                          <img
                            src="assets/previous-project.png"
                            alt=""
                            className="w-8 h-8"
                          />
                          <div>
                            <span className="block text-[10px] uppercase tracking-widest text-white/30 font-consolas">
                              Previous
                            </span>
                            <span className="font-satoshi text-sm md:text-base font-semibold">
                              {prevProject.title}
                            </span>
                          </div>
                        </button>
                      )}
                    </div>
                    <div className="w-max">
                      {nextProject && (
                        <button
                          onClick={() => handleProjectChange(nextProject.id)}
                          className="flex items-center gap-4 text-gray-500 hover:text-white transition-colors group text-right cursor-pointer"
                        >
                          <div>
                            <span className="block text-[10px] uppercase tracking-widest text-white/30 font-consolas">
                              Next
                            </span>
                            <span className="font-satoshi text-sm md:text-base font-semibold">
                              {nextProject.title}
                            </span>
                          </div>
                          <img
                            src="assets/next-project.png"
                            alt=""
                            className="w-8 h-8"
                          />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Enlarged Image Lightbox - Siblings to the scroll area */}
              <AnimatePresence mode="wait" custom={direction}>
                {enlargedIndex !== null && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-50 flex items-center justify-center bg-black/95"
                    onClick={() => setEnlargedIndex(null)}
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        play();
                        setEnlargedIndex(null);
                      }}
                      className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-50 text-white"
                    >
                      <X size={24} />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigateImage("prev");
                      }}
                      className="absolute left-6 p-4 bg-white/5 hover:bg-white/10 rounded-full transition-colors z-50 text-white/50 hover:text-white"
                    >
                      <ChevronLeft size={32} />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigateImage("next");
                      }}
                      className="absolute right-6 p-4 bg-white/5 hover:bg-white/10 rounded-full transition-colors z-50 text-white/50 hover:text-white"
                    >
                      <ChevronRight size={32} />
                    </button>

                    <div className="w-full h-full flex items-center justify-center p-4 md:p-12 overflow-hidden pointer-events-none">
                      <motion.img
                        key={enlargedIndex}
                        custom={direction}
                        variants={{
                          enter: (d: number) => ({
                            x: d > 0 ? "100%" : "-100%",
                            opacity: 0,
                          }),
                          center: { x: 0, opacity: 1 },
                          exit: (d: number) => ({
                            x: d < 0 ? "100%" : "-100%",
                            opacity: 0,
                          }),
                        }}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                          x: { type: "spring", stiffness: 300, damping: 30 },
                          opacity: { duration: 0.2 },
                        }}
                        src={project.images[enlargedIndex]}
                        className="max-w-full max-h-full object-contain shadow-2xl pointer-events-auto"
                      />
                    </div>

                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/5 rounded-full backdrop-blur-md border border-white/10">
                      <span className="font-consolas text-sm text-white/50">
                        {enlargedIndex + 1} / {project.images.length}
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
