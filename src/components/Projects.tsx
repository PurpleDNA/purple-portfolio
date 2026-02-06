import { useState } from "react";
import { ChamferBox } from "./ChamferBox";
import ProjectComponent from "./ProjectComponent";

interface Project {
  name: string;
  organization: string;
  skill: string;
  year: string;
  image?: string;
}

const projects = [
  {
    name: "Centrium - ",
    organization: "Sabertooth",
    skill: "Frontend",
    year: "2024",
    image: "assets/projects/centrium.png",
  },
  {
    name: "TopSpecial Ops - ",
    organization: "Bakery",
    skill: "Fullstack",
    year: "2025",
    image: "assets/projects/top-special.png",
  },
  {
    name: "Purple Combinator - ",
    organization: "Startup Platform",
    skill: "Fullstack",
    year: "2024",
    image: "assets/projects/purple-combinator.png",
  },
  {
    name: "FPL Pulse - ",
    organization: "Startup Platform",
    skill: "Frontend",
    year: "2025",
    image: "assets/projects/fpl-pulse.png",
  },
  {
    name: "N8N Lead Generation",
    organization: "",
    skill: "Automation",
    year: "2026",
    image: "assets/projects/n8n-leads.png",
  },
  {
    name: "Aguda Partners ",
    organization: "Website",
    skill: "Frontend",
    year: "2025",
    image: "assets/projects/aguda.png",
  },
];

const Projects = () => {
  const [project, setProject] = useState<Project>(projects[0]);
  console.log(project);

  return (
    <div className="section space-y-8">
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
        <div className="flex flex-col gap-10 w-1/2">
          {projects.map((project, index) => (
            <ProjectComponent
              key={index}
              name={project.name}
              organization={project.organization}
              skill={project.skill}
              year={project.year}
              setProject={() => setProject(project)}
            />
          ))}
        </div>
        <ChamferBox className="w-1/2">
          <img src={project.image} alt="" />
        </ChamferBox>
      </div>
    </div>
  );
};

export default Projects;
