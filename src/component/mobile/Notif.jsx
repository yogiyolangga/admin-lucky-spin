import Header from "./Header";
import { GiConfirmed } from "react-icons/gi";
import React, { useEffect, useState } from "react";
import Axios from "axios";

export default function Notif() {
  return (
    <>
      <div className=" w-full pt-4 pb-20">
        <div>
          <Header />
        </div>
        <div className="">
          <Data />
        </div>
        <div className="flex justify-center items-center pt-10">
          <img
            src="img/notif.png"
            alt="Notification"
            className="w-[200px] h-[200px]"
          />
        </div>
      </div>
    </>
  );
}

const Data = () => {
  const [dataClaim, setDataClaim] = useState([]);
  const apiUrl = "http://localhost:3001";

  useEffect(() => {
    Axios.get(`${apiUrl}/claimed`).then((response) => {
      setDataClaim(response.data);
    });
  });

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

  const confirmed = (id) => {
    Axios.put(`${apiUrl}/confirmed/${id}`);
    setDataClaim(dataClaim.filter((data) => data.id !== id));
  }

  return (
    <>
      <div className="w-full flex flex-col gap-2.5 px-2 py-4 text-center text-slate-400">
        {dataClaim.length > 1 ? dataClaim.map((data) => (
          <div
            key={data.id}
            className="flex px-4 justify-between items-center py-2 rounded shadow bg-slate-200 border border-black animate-pulse"
          >
            <div className="flex flex-col">
              <h3 className="font-semibold text-lg text-black">
                {data.username}
              </h3>
            </div>
            <div className="flex flex-col">
              <h3 className="font-semibold text-lg text-black">{isNumber(data.nominal)}</h3>
              <span className="font-light text-slate-500 text-sm">{data.hadiah}</span>
            </div>
            <button onClick={() => {
              confirmed(data.id);
            }} className="font-semibold text-white bg-blue-500 p-3 rounded-lg shadow-md text-lg">
              <GiConfirmed className="text-xl" />
            </button>
          </div>
        )) : "No Have Data Yet!"}
      </div>
    </>
  );
};
