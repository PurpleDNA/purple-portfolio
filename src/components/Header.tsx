import { ChamferBox } from "./ChamferBox";
import Navbar from "./Navbar";

const Header = () => {
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
          <div className="bg-white flex items-center gap-1 px-6 py-2 text-background">
            <img src="assets/logos/telegram.png" alt="" className="w-5 h-5" />
            <span className="font-consolas">Message Now</span>
          </div>
        </ChamferBox>
      </div>
    </div>
  );
};

export default Header;
