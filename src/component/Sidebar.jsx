import React, { useEffect } from "react";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import { HiHomeModern } from "react-icons/hi2";
import { ImNewspaper } from "react-icons/im";
import { TbGiftFilled } from "react-icons/tb";
import { AiFillAlert } from "react-icons/ai";
import { HiOutlineLogout } from "react-icons/hi";
import { useLocation, useNavigate } from "react-router-dom";
import Axios from "axios";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");

const Sidebar = ({ openSide, setOpenSide }) => {
  const navigate = useNavigate();
  const baseUrl = "http://localhost:3001";
  const location = useLocation();

  const logout = () => {
    Axios.post(`${baseUrl}/outadmin`).then((response) => {
      if (response.data.loggedIn === false) {
        navigate("/login");
      }
    });
  };

  useEffect(() => {
    const claimed = document.getElementById("claimed");
    socket.on("receive_message", (data) => {
      claimed.classList.add("text-red-500");
      claimed.classList.remove("text-white");
    });
  }, []);

  return (
    <div className="flex p-2 h-screen">
      <div
        className={`bg-blue-500 rounded-xl py-5 h-full flex flex-col justify-between gap-3 ${
          openSide
            ? "w-72 md:w-72 items-start px-3"
            : "px-1 w-14 md:w-20 items-center"
        } max-w-[13rem] duration-200`}
      >
        <div>
          <a href="/">
            <div className="flex items-center justify-center mb-10">
              <img src="img/fortunewheel.png" alt="Logo" className="w-full" />
            </div>
          </a>
          <a href="/">
            <div
              className={`flex items-center rounded-2xl px-2 py-2 hover:translate-x-2 duration-100 ${
                location.pathname === "/"
                  ? "bg-slate-200 text-blue-500"
                  : "text-white"
              } ${!openSide && "justify-center"} `}
            >
              <HiHomeModern className="text-3xl" />
              <h1 className={` ml-2 ${!openSide && "hidden"}`}>Home</h1>
            </div>
          </a>
          <a href="/notif">
            <div
              className={`flex items-center rounded-2xl py-2 px-2 hover:translate-x-2 duration-100 ${
                location.pathname === "/notif"
                  ? "bg-slate-200 text-blue-500"
                  : "text-white"
              } ${!openSide && "justify-center"} `}
            >
              <AiFillAlert id="claimed" className="text-3xl" />
              <h1 className={` ml-2 ${!openSide && "hidden"}`}>Notif</h1>
            </div>
          </a>
          <a href="/details">
            <div
              className={`flex items-center rounded-2xl py-2 px-2 hover:translate-x-2 duration-100 ${
                location.pathname === "/details"
                  ? "bg-slate-200 text-blue-500"
                  : "text-white"
              } ${!openSide && "justify-center"} `}
            >
              <ImNewspaper className="text-3xl " />
              <h1 className={` ml-2 ${!openSide && "hidden"}`}>Details</h1>
            </div>
          </a>
          <a href="/prize">
            <div
              className={`flex items-center rounded-2xl py-2 px-2 hover:translate-x-2 duration-100 ${
                location.pathname === "/prize"
                  ? "bg-slate-200 text-blue-500"
                  : "text-white"
              } ${!openSide && "justify-center"} `}
            >
              <TbGiftFilled className="text-3xl " />
              <h1 className={` ml-2 ${!openSide && "hidden"}`}>Prize</h1>
            </div>
          </a>
          <div
            onClick={logout}
            className={`flex items-center py-2 px-2 hover:translate-x-2 duration-100 cursor-pointer ${
              !openSide && "justify-center"
            } `}
          >
            <HiOutlineLogout className="text-3xl text-white" />
            <h1 className={`text-white ml-2 ${!openSide && "hidden"}`}>
              Sign Out
            </h1>
          </div>
        </div>
        <div className="w-full flex justify-center">
          <BsFillArrowLeftSquareFill
            className={`text-white text-3xl rounded-md cursor-pointer ${
              !openSide && "rotate-180"
            }`}
            onClick={() => setOpenSide(!openSide)}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
