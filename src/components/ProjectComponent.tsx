import { motion } from "framer-motion";
import { useSound } from "../hooks/useSound";

interface ProjectProps {
  name: string;
  organization: string;
  skill: string;
  year: string;
  image?: string;
  isActive?: boolean;
  index: number;
  setProject: () => void;
  onClick: () => void;
}

const scrollToSection = () => {
  const element = document.getElementById("work");
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "end" });
  }
};

const ProjectComponent = ({
  name,
  organization,
  skill,
  year,
  isActive,
  index,
  setProject,
  onClick,
}: ProjectProps) => {
  const { play } = useSound("/audio/click-1.mp3");

  return (
    <motion.div
      initial={{ x: -50, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeIn",
      }}
      className={`flex items-center gap-3 cursor-pointer transition-all duration-300 transform-gpu
        ${
          isActive
            ? "text-white scale-110"
            : "text-gray-700 hover:text-white hover:scale-110"
        }
      `}
      onClick={() => {
        play();
        scrollToSection();
        onClick();
      }}
      onMouseOver={() => setProject()}
    >
      <span className="shrink-0">
        {name}
        {organization}
      </span>
      <hr className="flex-1 border-gray-800" />
      <span className="shrink-0 uppercase font-consolas text-[10px] tracking-widest opacity-50">
        {skill} {year}
      </span>
    </motion.div>
  );
};

export default ProjectComponent;
