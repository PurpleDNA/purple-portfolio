import { ChamferBox } from "./ChamferBox";
import { AnimatedCounter } from "./AnimatedCounter";

const techStack = [
  { name: "Javascript", logo: "/assets/logos/javascript.png" },
  { name: "Typescript", logo: "/assets/logos/typescript.png" },
  { name: "NextJS", logo: "/assets/logos/next.png" },
  { name: "React", logo: "/assets/logos/react.png" },
  { name: "Tailwind CSS", logo: "/assets/logos/tailwindcss.png" },
  { name: "Redux", logo: "/assets/logos/redux.png" },
  { name: "Git", logo: "/assets/logos/git.png" },
  { name: "Appwrite", logo: "/assets/logos/appwrite.png" },
  { name: "Sanity", logo: "/assets/logos/sanity.png" },
  { name: "Supabase", logo: "/assets/logos/supabase.png" },
  { name: "Web3JS", logo: "/assets/logos/web3js.png" },
  { name: "n8n", logo: "/assets/logos/n8n.png" },
];

const stats = [
  { value: "4", label: "Years", sublabel: "Codecraft Mastery" },
  { value: "18", label: "", sublabel: "Completed Projects" },
  { value: "3", label: "", sublabel: "Supervised Projects" },
];

const Profile = () => {
  return (
    <section id="profile" className="section bg-black text-white py-20 pb-0">
      <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row gap-16 lg:gap-24">
        {/* Left Side: Bio & Info - Balanced Width */}
        <div className="flex-1 space-y-12">
          <div className="space-y-6">
            <h2 className="md:text-2xl lg:text-3xl font-consolas font-bold">
              My Profile
            </h2>
            <p className="font-satoshi text-gray-300 leading-relaxed">
              Hi, I'm Maroof Kadiri, I'm a frontend developer with 3 years of
              experience building modern, scalable web applications with unique
              interfaces and engaging user experiences. I have a natural
              curiosity for technology and how things work—the why behind what
              we see. This curiosity, combined with a creative approach to
              applying knowledge, has shaped my habit of solving real-world,
              complex problems through code.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="md:text-2xl lg:text-3xl font-consolas font-bold">
              Off the keyboard
            </h3>
            <p className="font-satoshi text-gray-400 leading-relaxed">
              Whenever I touch grass, I love hanging out with a few friends
              doing activities that creates memories. I am obsessed with movies(
              so send me one and I'll rate it). I'm also into anime, play
              football, and read computer science books to feed that curiosity
              about how things actually work.
            </p>
          </div>

          {/* Stats */}
          <div className="flex flex-nowrap gap-4 sm:gap-8 md:gap-16 pt-8 overflow-x-auto no-scrollbar">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col">
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl md:text-6xl font-bold font-satoshi">
                    <AnimatedCounter value={stat.value} />
                  </span>
                  {stat.label && (
                    <span className="text-lg md:text-xl font-satoshi text-gray-400">
                      {stat.label}
                    </span>
                  )}
                </div>
                <span className="text-xs md:text-sm font-satoshi text-gray-500 uppercase tracking-widest mt-1">
                  {stat.sublabel}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Techstack - Balanced Width & Styled Container (Non-Chamfered) */}
        <div className="flex-1 w-full flex flex-col">
          <div className="w-full bg-[#111111] border border-white/10 p-3 md:p-6 flex flex-col items-center gap-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              {techStack.map((tech) => (
                <ChamferBox
                  key={tech.name}
                  className="w-full h-20 bg-linear-to-br from-[#1a1a1a] to-[#0a0a0a] border border-white/10 hover:border-white/20 transition-all flex items-center px-6 gap-4"
                  hasDecoration={true}
                  orientation="tl-br"
                >
                  <div className="w-10 h-10 flex items-center justify-center shrink-0">
                    <img
                      src={tech.logo}
                      alt={tech.name}
                      className="w-8 h-8 object-contain opacity-90"
                    />
                  </div>
                  <span className="font-consolas text-lg text-gray-200">
                    {tech.name}
                  </span>
                </ChamferBox>
              ))}
            </div>

            <div className="text-center">
              <span className="text-2xl font-consolas text-gray-600/30 uppercase tracking-[0.4em]">
                Techstack
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
