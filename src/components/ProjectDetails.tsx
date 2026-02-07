import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { projects } from "../data/projects";
import { useSound } from "../hooks/useSound";
import { useEffect } from "react";

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { play } = useSound("/audio/click-1.mp3");

  const projectIndex = projects.findIndex((p) => p.id === id);
  const project = projects[projectIndex];

  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : null;
  const nextProject =
    projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Project not found
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={project.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-black text-white px-6 md:px-20 py-32"
      >
        {/* Back Button */}
        <button
          onClick={() => {
            play();
            navigate("/");
          }}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-12 group"
        >
          <ArrowLeft
            size={20}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span className="font-consolas">Go back</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
          {/* Left Side: Basic Info */}
          <div className="space-y-12">
            <h1 className="text-4xl md:text-6xl font-consolas font-bold">
              {project.title}
            </h1>

            <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
              {project.description}
            </p>

            <div className="grid grid-cols-2 gap-10">
              <div>
                <h3 className="text-sm font-consolas text-white mb-2 uppercase tracking-widest">
                  Industry
                </h3>
                <p className="text-gray-400 font-satoshi">{project.industry}</p>
              </div>
              <div>
                <h3 className="text-sm font-consolas text-white mb-2 uppercase tracking-widest">
                  Classification
                </h3>
                <p className="text-gray-400 font-satoshi">
                  {project.classifications}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-consolas text-white mb-2 uppercase tracking-widest">
                  Technology
                </h3>
                <p className="text-gray-400 font-satoshi">
                  {project.technology.join(", ")}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-consolas text-white mb-2 uppercase tracking-widest">
                  Role
                </h3>
                <p className="text-gray-400 font-satoshi">{project.role}</p>
              </div>
            </div>
          </div>

          {/* Right Side: Challenges & Solutions */}
          <div className="space-y-12">
            <div>
              <h3 className="text-xl font-consolas text-white mb-6">
                Challenges
              </h3>
              <ul className="space-y-4">
                {project.challenges.map((challenge, i) => (
                  <li key={i} className="flex gap-4 text-gray-400 font-satoshi">
                    <span className="text-white">-</span>
                    {challenge}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-consolas text-white mb-6">
                Solution
              </h3>
              <ul className="space-y-4">
                {project.solutions.map((solution, i) => (
                  <li key={i} className="flex gap-4 text-gray-400 font-satoshi">
                    <span className="text-white">-</span>
                    {solution}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Sliding Images Gallery */}
        <div className="mt-24 relative overflow-hidden group">
          <motion.div
            className="flex gap-8 whitespace-nowrap"
            animate={{
              x: ["0%", "-50%"],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ width: "fit-content" }}
            whileHover={{ animationPlayState: "paused" }}
          >
            {/* Double the images for a seamless loop */}
            {[...project.images, ...project.images].map((img, i) => (
              <div
                key={i}
                className="w-100 md:w-150 h-64 md:h-100 bg-gray-900 rounded-2xl overflow-hidden shrink-0"
              >
                <img
                  src={img}
                  alt={`Project image ${i}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Navigation Buttons */}
        <div className="mt-24 flex items-center justify-center gap-12">
          {prevProject && (
            <Link
              to={`/project/${prevProject.id}`}
              onClick={() => play()}
              className="flex items-center gap-4 text-gray-400 hover:text-white transition-colors group"
            >
              <div className="p-2 border border-white/20 bg-white/5 rounded-md group-hover:bg-white/10 transition-colors">
                <ChevronLeft size={24} />
              </div>
              <span className="font-satoshi text-lg">Previous Project</span>
            </Link>
          )}

          {nextProject && (
            <Link
              to={`/project/${nextProject.id}`}
              onClick={() => play()}
              className="flex items-center gap-4 text-gray-400 hover:text-white transition-colors group"
            >
              <span className="font-satoshi text-lg">Next Project</span>
              <div className="p-2 border border-white/20 bg-white/5 rounded-md group-hover:bg-white/10 transition-colors">
                <ChevronRight size={24} />
              </div>
            </Link>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectDetails;
