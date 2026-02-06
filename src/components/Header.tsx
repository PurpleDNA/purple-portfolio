import { ChamferBox } from "./ChamferBox";
import Navbar from "./Navbar";
import { useSound } from "../hooks/useSound";

const Header = () => {
  const { play } = useSound("/audio/click-1.mp3");

  return (
    <div className="fixed top-0 left-0 w-full z-100 bg-transparent flex items-center px-[5%] py-4">
      <div className="flex-1" />
      <Navbar />
      <div className="flex-1 flex justify-end">
        <ChamferBox
          as="div"
          orientation="tr-bl"
          hasShadow={true}
          shadowPosition="left"
          className="cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out"
        >
          <a
            href="https://calendly.com/kadirimaroof/30min"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => play()}
            className="bg-white flex items-center gap-3 px-6 py-2 text-background"
          >
            <img src="assets/logos/calendly.png" alt="" className="w-5 h-5" />
            <span className="font-consolas">Book Call</span>
          </a>
        </ChamferBox>
      </div>
    </div>
  );
};

export default Header;
