import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

export default function AddTicket() {
  const apiUrl = "http://localhost:3001";
  const [openSide, setOpenSide] = useState(false);
  const navigate = useNavigate();
  const [loginStatus, setLoginStatus] = useState("");
  const [username, setUsername] = useState("");
  const [spincode, setSpincode] = useState("");
  const [prize, setPrize] = useState("");

  const caracter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  function randomSpincode(length) {
    let hasilSpincode = "";
    const caracterLength = caracter.length;
    for (let i = 0; i < length; i++) {
      hasilSpincode += caracter.charAt(
        Math.floor(Math.random() * caracterLength)
      );
    }
    return hasilSpincode;
  }

  const generateSpincode = () => {
    setSpincode(randomSpincode(7));
  };

  const insertData = () => {
    function hariNi() {
      var today = new Date(),
        month = "" + (today.getMonth() + 1),
        day = "" + today.getDate(),
        year = today.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-");
    }
    var tanggal = "";
    tanggal = hariNi();
    Axios.post(`${apiUrl}/insertdata`, {
      tanggal: tanggal,
      username: username,
      spincode: spincode,
      prize: prize,
      loginStatus: loginStatus,
    }).then((response) => {
      if (response.data.messageError) {
        alert(response.data.messageError);
      } else {
        alert("Input Data Succesfully!");
        navigate("/");
      }
    });
  };

  function today() {
    var today = new Date(),
      month = "" + (today.getMonth() + 1),
      day = "" + today.getDate(),
      year = today.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  var todayNow = "";
  todayNow = today();

  useEffect(() => {
    Axios.get(`${apiUrl}/logadmin`).then((response) => {
      if (response.data.loggedIn === true) {
        setLoginStatus(response.data.admin[0].user);
      } else {
        navigate("/login");
      }
    });
  }, [navigate]);

  return (
    <>
      <div className="flex">
        <div className="opacity-5">
          <Sidebar openSide={openSide} setOpenSide={setOpenSide} />
        </div>
        <div className="fixed">
          <Sidebar openSide={openSide} setOpenSide={setOpenSide} />
        </div>
        <div className="py-10  w-full px-14">
          <div className="w-full flex justify-between ">
            <div className="flex w-1/2 items-center gap-8">
              <p className="text-center font-bold text-2xl text-black">
                All List Data
              </p>
              <div className="font-semibold text-sm px-2 py-1 bg-slate-200 rounded-lg">
                {todayNow}
              </div>
              <div>
                <a
                  href="/input"
                  className="px-3 py-1 rounded text-lg font-semibold text-white bg-blue-500"
                >
                  Add New
                </a>
              </div>
            </div>
            <div className="flex items-center justify-end gap-1 w-1/2">
              <img
                src="img/user.jpg"
                alt="User"
                className="w-[50px] h-[50px] rounded-full"
              />
              <p>{loginStatus}</p>
            </div>
          </div>
          <div className="py-10 w-full px-14">
            <Input
              generateSpincode={generateSpincode}
              spincode={spincode}
              setSpincode={setSpincode}
              setUsername={setUsername}
              setPrize={setPrize}
              insertData={insertData}
            />
          </div>
        </div>
      </div>
    </>
  );
}

const Input = ({
  generateSpincode,
  spincode,
  setSpincode,
  setUsername,
  setPrize,
  insertData,
}) => {
  return (
    <>
      <div className="flex flex-col gap-2.5 w-full">
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          className="px-2 py-1.5 border  border-slate-200 rounded-md shadow"
        />
        <div className="flex justify-between">
          <input
            type="text"
            placeholder="Spincode"
            value={spincode}
            onChange={(e) => {
              setSpincode(e.target.value);
            }}
            className="px-2 py-1.5 rounded-md w-[48%] border  border-slate-200 shadow"
          />
          <button
            onClick={generateSpincode}
            className="w-[48%] bg-blue-500 text-white font-semibold rounded-md shadow"
          >
            Generate Code
          </button>
        </div>
        <select
          name="hadiah"
          id="hadiah"
          className="rounded-md border border-slate-200 h-10 shadow px-1"
          onChange={(e) => {
            setPrize(e.target.value);
          }}
        >
          <option value="">Choose a gift category</option>
          <option value="SMALL">SMALL</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="BIG">BIG</option>
          <option value="HUGE">HUGE</option>
        </select>
        <button
          onClick={insertData}
          className="bg-blue-500 text-white font-semibold rounded-md shadow py-2"
        >
          Submit
        </button>
      </div>
    </>
  );
};
