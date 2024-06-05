import { FaPlus } from "react-icons/fa";

const Header = () => {
  return (
    <>
      <div className="flex justify-between px-2 items-center">
        <div>
          <img src="img/fortunewheel.png" alt="Logo" className="w-[100px]" />
        </div>
        <a href="/input" className="font-bold text-lg text-black h-[40px] w-[40px] flex items-center justify-center bg-blue-500 rounded-xl shadow-md shadow-slate-500">
          <FaPlus className="rounded-full h-[35px] text-white" />
        </a>
      </div>
    </>
  );
};

export default Header;
