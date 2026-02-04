import { ChamferBox } from "./ChamferBox";
const Navbar = () => {
  return (
    <ChamferBox orientation="tl-br" className="bg-[#4A4A4A] p-px flex-none">
      <div className="chamfer-box tl-br bg-black">
        <div className="flex justify-center gap-12 px-16 py-2">
          <a href="#">Work</a>
          <a href="#">Profile</a>
          <a href="#">Contact</a>
        </div>
      </div>
    </ChamferBox>
  );
};

export default Navbar;
