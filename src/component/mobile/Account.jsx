import Axios from "axios";
import Header from "./Header";
import { IoLogOut } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function Account() {
  const apiUrl = "http://localhost:3001";
  const navigate = useNavigate();
  const logoutAccount = () => {
    Axios.post(`${apiUrl}/outadmin`).then((response) => {
      if (response.data.loggedIn === false) {
        navigate("/login");
      }
    });
  };
  return (
    <>
      <div className="w-full pt-4 pb-20 px-3">
        <Header />
        <div className="w-full py-10 flex justify-center">
          <span className="font-bold">
            Hello There! Thanks for Trying this App
          </span>
        </div>
        <div className="w-full py-2">
          <button
            onClick={logoutAccount}
            className="w-full bg-blue-500 rounded-md shadow-md flex justify-center items-center py-4 font-bold text-xl gap-2"
          >
            Logout <IoLogOut className="text-xl text-white" />
          </button>
        </div>
      </div>
    </>
  );
}
