interface ProjectProps {
  name: string;
  organization: string;
  skill: string;
  year: string;
  image?: string;
  setProject: () => void;
}

const ProjectComponent = ({
  name,
  organization,
  skill,
  year,
  setProject,
}: ProjectProps) => {
  return (
    <div
      className="flex items-center gap-3 text-gray-700 cursor-pointer hover:text-white hover:scale-110 transition-all duration-300"
      onClick={() => setProject()}
    >
      <span>
        {name}
        {organization}
      </span>
      <hr className="flex-1" />
      <span>
        {skill} {year}
      </span>
    </div>
  );
};

export default ProjectComponent;
