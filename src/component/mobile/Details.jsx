import Header from "../mobile/Header";
import React, { useState, useEffect, useCallback } from "react";
import Axios from "axios";
import { FaRegCopy } from "react-icons/fa";

export default function Details() {
  const [displayDetail, setDisplayDetail] = useState("scale-0 hidden");
  const defaultDataDetail = [
    {
      username: "-",
      admin: "-",
      chance: 0,
      hadiah: "-",
      id: 0,
      konfir: 0,
      nominal: "-",
      spincode: "-",
      tanggal: "-",
    },
  ];
  const [dataDetail, setDataDetail] = useState(defaultDataDetail);
  const apiUrl = "http://localhost:3001";

  const getDetail = (id) => {
    Axios.get(`${apiUrl}/getdetail/${id}`).then((response) => {
      setDataDetail(response.data);
      setDisplayDetail("scale-100");
    });
  };

  const handleCloseDetails = useCallback(() => {
    setDisplayDetail("scale-0 hidden");
  }, []);

  return (
    <>
      <div className="w-full pt-4 pb-20 relative">
        <div className="w-full pb-4">
          <Header />
        </div>
        <div className="w-full bg-slate-200">
          <Filter />
        </div>
        <div>
          <Data getDetail={getDetail} />
        </div>
        <div
          className={`fixed w-full min-h-screen bg-slate-800 bg-opacity-40 top-0 z-10 flex justify-center items-center ${displayDetail}`}
        >
          <DetailsData
            dataDetail={dataDetail}
            handleCloseDetails={handleCloseDetails}
          />
        </div>
      </div>
    </>
  );
}

const Filter = () => {
  const handleClickFilter = () => {
    alert("This feature is not available on mobile yet. Use Desktop Version for Better Experience");
  }
  return (
    <>
      <div className="w-[80%] py-3 mx-auto">
        <div className="w-full flex justify-between items-center">
          <button onClick={handleClickFilter} className="py-1.5 px-3 rounded-2xl bg-blue-500 text-white font-semibold">
            Filter Data
          </button>
          <button
          onClick={handleClickFilter}
            className="py-1.5 px-3 rounded-2xl bg-blue-200 text-blue-800 font-semibold"
          >
            Clear Filter
          </button>
        </div>
      </div>
    </>
  );
};

const Data = ({ getDetail }) => {
  const [dataList, setDataList] = useState([]);
  const apiUrl = "http://localhost:3001";
  const [hideButton, setHideButton] = useState("");

  useEffect(() => {
    Axios.get(`${apiUrl}/getdata`).then((response) => {
      setDataList(response.data);
    });
  }, []);

  const getAllData = () => {
    Axios.get(`${apiUrl}/getalldata`).then((response) => {
      setDataList(response.data);
      setHideButton("hidden");
    });
  };

  const rupiah = new Intl.NumberFormat("id-ID", {
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

  return (
    <>
      <div className="w-full flex flex-col gap-2.5 px-2 bg-slate-200">
        <h1 className="text-center font-semibold text-lg">
          Total Data {dataList.length}
        </h1>
        {dataList.map((data) => (
          <div
            key={data.id}
            className="flex px-4 justify-between items-center py-2 bg-white rounded shadow"
          >
            <div className="flex flex-col">
              <h3 className="font-semibold text-lg text-black">
                {data.username}
              </h3>
              <span className="font-light text-slate-500 text-sm">
                {data.tanggal}
              </span>
            </div>
            <div className="flex flex-col">
              <h3 className="font-semibold text-lg text-black">
                {isNumber(data.nominal)}
              </h3>
              <span className="font-light text-slate-500 text-sm">
                {data.hadiah}
              </span>
            </div>
            <button
              onClick={() => {
                getDetail(data.id);
              }}
              className="font-semibold text-blue-500 text-lg"
            >
              Details
            </button>
          </div>
        ))}
        <div className="w-full pt-2 pb-6 flex justify-center">
          <button
            onClick={getAllData}
            className={`bg-blue-500 rounded-md py-2 px-4 mx-auto font-semibold text-lg ${hideButton}`}
          >
            Load More Data
          </button>
        </div>
      </div>
    </>
  );
};

const DetailsData = ({ dataDetail, handleCloseDetails }) => {
  const rupiah = new Intl.NumberFormat("id-ID", {
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

  const copyCode = () => {
    navigator.clipboard.writeText(dataDetail[0].spincode);
    alert("Copied!");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const detailContainer = document.getElementById("details");
      if (detailContainer && !detailContainer.contains(event.target)) {
        handleCloseDetails();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleCloseDetails]);

  return (
    <>
      <div
        id="details"
        className="w-[80%] py-4 flex flex-col bg-white rounded-xl font-semibold"
      >
        <div className="flex justify-between w-full px-2">
          <p>Username :</p>
          <p>{dataDetail[0].username}</p>
        </div>
        <div className="flex justify-between w-full px-2 bg-slate-200">
          <p>Date :</p>
          <p>{dataDetail[0].tanggal}</p>
        </div>
        <div className="flex justify-between w-full px-2">
          <p>SpinCode :</p>
          <div className="flex gap-1 items-center">
            <FaRegCopy onClick={copyCode} className="text-blue-500" />{" "}
            <p>{dataDetail[0].spincode}</p>
          </div>
        </div>
        <div className="flex justify-between w-full px-2 bg-slate-200">
          <p>Prize :</p>
          <p>{dataDetail[0].hadiah}</p>
        </div>
        <div className="flex justify-between w-full px-2">
          <p>Get Prize :</p>
          <p>{isNumber(dataDetail[0].nominal) || "-"}</p>
        </div>
        <div className="flex justify-between w-full px-2 bg-slate-200">
          <p>Chance :</p>
          <p>
            {dataDetail[0].chance === 0 ? "Used" : "Available"}
          </p>
        </div>
        <div className="flex justify-between w-full px-2">
          <p>Admin :</p>
          <p>{dataDetail[0].admin}</p>
        </div>
      </div>
    </>
  );
};
