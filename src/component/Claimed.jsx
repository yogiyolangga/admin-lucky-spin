import React, { useEffect, useState } from "react";
import Axios from "axios";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";

const Claimed = () => {
  const [dataClaim, setDataClaim] = useState([]);
  const baseUrl = "http://localhost:3001";
  const [openSide, setOpenSide] = useState(false);
  const [loginStatus, setLoginStatus] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get(`${baseUrl}/claimed`).then((response) => {
      setDataClaim(response.data);
    });
  }, []);

  const updateKonfir = (id) => {
    Axios.put(`${baseUrl}/confirmed/${id}`);
    setDataClaim(dataClaim.filter((data) => data.id !== id));
  };

  let rupiah = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });

  function isNumber(str) {
    if (str >= 0) {
      return rupiah.format(str);
    } else {
      return str;
    }
  }

  useEffect(() => {
    Axios.get(`${baseUrl}/logadmin`).then((response) => {
      if (response.data.loggedIn === true) {
        setLoginStatus(response.data.admin[0].user);
      } else {
        navigate("/login");
      }
    });
  }, [navigate]);

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

  return (
    <div className="flex w-full">
      <div className="opacity-5">
        <Sidebar openSide={openSide} setOpenSide={setOpenSide} />
      </div>
      <div className="fixed">
        <Sidebar openSide={openSide} setOpenSide={setOpenSide} />
      </div>
      <div className="py-10  w-full">
        <div className="w-full px-14 flex justify-between ">
          <div className="flex w-1/2 items-center gap-8">
            <p className="text-center font-bold text-2xl text-black">
              Notification Spin
            </p>
            <div className="font-semibold text-sm px-2 py-1 bg-slate-200 rounded-lg">
              {todayNow}
            </div>
            <div>
              <a href="/input" className="px-3 py-1 rounded text-lg font-semibold text-white bg-blue-500">Add New</a>
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
        <div className="w-full py-5 px-14">
          <div className="w-full bg-slate-200 rounded-3xl shadow-md">
              <div className="text-lg border-b-2 border-white bg-slate-400 w-full flex justify-evenly rounded-3xl text-slate-900">
                <th className="py-3 text-center w-1/6">Username</th>
                <th className="py-3 text-center w-1/6">Spincode</th>
                <th className="py-3 text-center w-1/6">Category</th>
                <th className="py-3 text-center w-1/6">Nominal</th>
                <th className="py-3 text-center w-1/6">Date</th>
                <th className="py-3 text-center w-1/6">Action</th>
              </div>
              {dataClaim.map((val) => (
                <div
                  key={val.id}
                  className="border-b-2 border-white hover:bg-slate-300 duration-100 flex justify-evenly"
                >
                  <td className="py-3 text-center w-1/6">{val.username}</td>
                  <td className="py-3 text-center w-1/6">{val.spincode}</td>
                  <td className="py-3 text-center w-1/6">{val.hadiah}</td>
                  <td className="py-3 text-center w-1/6">{isNumber(val.nominal)}</td>
                  <td className="py-3 text-center w-1/6">{val.tanggal}</td>
                  <td className="py-3 text-center w-1/6">
                    <div
                      className="px-2 py-1 w-fit bg-blue-500 rounded-md mx-auto font-semibold text-white shadow hover:scale-105 duration-100 cursor-pointer"
                      onClick={() => {
                        updateKonfir(val.id);
                      }}
                    >
                    Confirm
                    </div>
                  </td>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Claimed;
