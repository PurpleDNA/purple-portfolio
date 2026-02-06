import { motion } from "framer-motion";

interface ProjectProps {
  name: string;
  organization: string;
  skill: string;
  year: string;
  image?: string;
  isActive?: boolean;
  index: number;
  setProject: () => void;
}

const ProjectComponent = ({
  name,
  organization,
  skill,
  year,
  isActive,
  index,
  setProject,
}: ProjectProps) => {
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
      onMouseOver={() => setProject()}
    >
      <span>
        {name}
        {organization}
      </span>
      <hr className="flex-1 border-gray-800" />
      <span>
        {skill} {year}
      </span>
    </motion.div>
  );
};

export default ProjectComponent;
