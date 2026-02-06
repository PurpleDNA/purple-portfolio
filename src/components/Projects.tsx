import { useState } from "react";
import { motion } from "framer-motion";
import ProjectComponent from "./ProjectComponent";

interface Project {
  name: string;
  organization: string;
  skill: string;
  year: string;
  image?: string;
}

const projects: Project[] = [
  {
    name: "Centrium - ",
    organization: "Sabertooth",
    skill: "Frontend",
    year: "2024",
    image: "/assets/projects/centrium.png",
  },
  {
    name: "TopSpecial Ops - ",
    organization: "Bakery",
    skill: "Fullstack",
    year: "2025",
    image: "/assets/projects/top-special.png",
  },
  {
    name: "Purple Combinator - ",
    organization: "Startup Platform",
    skill: "Fullstack",
    year: "2024",
    image: "/assets/projects/purple-combinator.png",
  },
  {
    name: "FPL Pulse - ",
    organization: "Startup Platform",
    skill: "Frontend",
    year: "2025",
    image: "/assets/projects/fpl-pulse.png",
  },
  {
    name: "N8N Lead Generation",
    organization: "",
    skill: "Automation",
    year: "2026",
    image: "/assets/projects/n8n-leads.png",
  },
  {
    name: "Aguda Partners ",
    organization: "Website",
    skill: "Frontend",
    year: "2025",
    image: "/assets/projects/aguda.png",
  },
];

const Projects = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div id="work" className="section space-y-8">
      <div className="flex flex-col gap-4 w-full">
        <h1 className="font-consolas md:text-2xl lg:text-3xl font-bold text-white leading-[1.1] ">
          Selected Projects
        </h1>
        <p className="font-satoshi text-white leading-normal w-1/2">
          I focus on building fast, responsive interfaces with clean,
          maintainable code. I’m mindful of performance, accessibility, and
          state management, and how architectural decisions impact long-term
          scalability.
        </p>
      </div>
      <div className="flex justify-between gap-10 items-center">
        <div className="flex flex-col gap-10 w-[40%]">
          {projects.map((p, index) => (
            <ProjectComponent
              key={index}
              name={p.name}
              organization={p.organization}
              skill={p.skill}
              year={p.year}
              isActive={index === currentIndex}
              index={index}
              setProject={() => setCurrentIndex(index)}
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
    </div>
  );
};

export default Projects;
