import { ChamferBox } from "./ChamferBox";
import { useSound } from "../hooks/useSound";

const socialLinks = [
  {
    name: "LinkedIn",
    logo: "/assets/logos/linkedin.png",
    url: "https://www.linkedin.com/in/maroof-kadiri",
  },
  {
    name: "WhatsApp",
    logo: "/assets/logos/whatsapp.png",
    url: "https://wa.me/2349065919964",
  },
  {
    name: "Instagram",
    logo: "/assets/logos/instagram.png",
    url: "https://www.instagram.com/mk_bayo/",
  },
  {
    name: "X",
    logo: "/assets/logos/twitter.png",
    url: "https://x.com/mk_bayo",
  },
  {
    name: "GitHub",
    logo: "/assets/logos/github.png",
    url: "https://github.com/PurpleDNA/",
  },
];

const Contact = () => {
  const { play: playClick1 } = useSound("/audio/click-1.mp3");
  const { play: playMouseClick } = useSound("/audio/mouse-click.mp3");

  return (
    <section id="contact" className="section bg-black text-white py-20 pb-32">
      <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
        {/* Left Side: Info */}
        <div className="flex-1 space-y-6">
          {/* Available for work badge (Replicated from Hero) */}
          <div className="flex items-center gap-3 font-consolas text-[11px] md:text-sm text-[#0EC126] uppercase tracking-wider">
            <div className="w-8 h-8 relative">
              <img
                src="assets/green-circle.png"
                alt=""
                className="relative animate-spin w-full h-full animation-duration-3000"
              />
              <img
                src="assets/green-ellipse.png"
                alt=""
                className="absolute left-1/2 top-1/2 w-3 h-3 -translate-x-1/2 -translate-y-1/2 animate-[spin_3s_linear_infinite_reverse]"
              />
            </div>
            <p>Available for work</p>
          </div>

          <div className="space-y-4">
            <h2 className="md:text-2xl lg:text-3xl font-consolas font-bold">
              Contact Me
            </h2>
            <p className="font-satoshi text-gray-400 leading-relaxed max-w-md">
              I am open to remote & on-site fulltime, part-time, and contract
              web development opportunities. Let's work together.
            </p>
          </div>

          <div className="space-y-8">
            <div className="space-y-1">
              <h3 className="font-consolas text-gray-500 uppercase tracking-widest text-sm">
                Phone number
              </h3>
              <p className="font-satoshi text-lg text-gray-200">
                +234 906 591 9964
              </p>
            </div>
            <div className="space-y-1">
              <h3 className="font-consolas text-gray-500 uppercase tracking-widest text-sm">
                Email
              </h3>
              <p className="font-satoshi text-lg text-gray-200">
                <a
                  href="mailto:maroof.kadiri@outlook.com"
                  className="transition-all duration-300 ease-in-out hover:border-b hover:border-white"
                >
                  maroof.kadiri@outlook.com
                </a>
              </p>
            </div>
          </div>

          {/* Socials */}
          <div className="flex flex-wrap gap-8 pt-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playMouseClick()}
                className=" flex items-center justify-center"
              >
                <img
                  src={social.logo}
                  alt={social.name}
                  className="w-8 h-8 object-contain opacity-80 hover:opacity-100 transition-all duration-300 ease-in-out hover:-translate-y-1"
                />
              </a>
            ))}
          </div>

          {/* Resume Button */}
          <div className="pt-6">
            <ChamferBox<"a">
              as="a"
              href="#"
              target="_blank"
              orientation="tr-bl"
              hasShadow={true}
              shadowPosition="left"
              className="cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out inline-block"
            >
              <a
                href="assets/MAROOF_KADIRI_CV.pdf"
                target="_blank"
                onClick={() => playClick1()}
                className="bg-[#d1d1d1] flex items-center gap-3 px-8 py-3 text-black"
              >
                <img src="assets/logos/resume.png" alt="" className="w-5 h-5" />
                <span className="font-consolas font-bold">My Resume</span>
              </a>
            </ChamferBox>
          </div>
        </div>

        {/* Right Side: Profile Image */}
        <div className="flex-1 w-full max-w-xl">
          <img
            src="assets/kadiri-maroof.png"
            alt="Maroof Kadiri"
            className="w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 transition-all duration-700"
          />
        </div>
      </div>
    </section>
  );
};

export default Contact;
