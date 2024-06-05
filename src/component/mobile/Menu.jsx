import { FaHome } from "react-icons/fa";
import { TbGiftFilled } from "react-icons/tb";
import { FaRectangleList } from "react-icons/fa6";
import { RiAccountPinCircleFill } from "react-icons/ri";
import { MdNotificationsActive } from "react-icons/md";
import { useLocation } from "react-router-dom";

export default function Menu() {
  const location = useLocation();

  return (
    <>
      <div className="py-1 w-full bg-white flex justify-evenly items-center border-t-2 border-r-zinc-500 shadow-sm">
        <a href="/" className="flex flex-col gap-1 items-center justify-center p-2">
          <FaHome className={` ${location.pathname === "/" ? "text-blue-500" : "text-zinc-500"} w-[25px] h-[25px]`}  />
          <span className="font-semibold text-sm text-zinc-500">Home</span>
        </a>
        <a href="/details" className="flex flex-col gap-1 items-center justify-center p-2">
          <FaRectangleList className={` ${location.pathname === "/details" ? "text-blue-500" : "text-zinc-500"} w-[25px] h-[25px]`} />
          <span className="font-semibold text-sm text-zinc-500">Details</span>
        </a>
        <a href="/notif" className="flex flex-col gap-1 items-center justify-center p-2">
          <MdNotificationsActive className={` ${location.pathname === "/notif" ? "text-blue-500" : "text-zinc-500"} w-[25px] h-[25px]`} />
          <span className="font-semibold text-sm text-zinc-500">Notif</span>
        </a>
        <a href="/prize" className="flex flex-col gap-1 items-center justify-center p-2">
          <TbGiftFilled className={` ${location.pathname === "/prize" ? "text-blue-500" : "text-zinc-500"} w-[25px] h-[25px]`} />
          <span className="font-semibold text-sm text-zinc-500">Prize</span>
        </a>
        <a href="/account" className="flex flex-col gap-1 items-center justify-center p-2">
          <RiAccountPinCircleFill  className={` ${location.pathname === "/account" ? "text-blue-500" : "text-zinc-500"} w-[25px] h-[25px]`} />
          <span className="font-semibold text-sm text-zinc-500">Account</span>
        </a>
      </div>
    </>
  );
}