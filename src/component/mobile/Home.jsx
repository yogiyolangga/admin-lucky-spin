import { RiSearchLine } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { React } from "react";
import Header from "./Header";
import { useState, useEffect } from "react";
import Axios from "axios";

export default function Home() {
  const [data, setData] = useState([]);
  const [dataToday, setDataToday] = useState([]);
  const [dataClaim, setDataClaim] = useState([]);
  const [totalPrize, setTotalPrize] = useState(0);
  const apiUrl = "http://localhost:3001";

  useEffect(() => {
    Axios.get(`${apiUrl}/getalldata`).then((response) => {
      setData(response.data);
      const totalNominal = response.data.reduce(
        (accumulator, currentObject) => {
          return accumulator + Number(currentObject.nominal);
        },
        0
      );
      setTotalPrize(totalNominal);
    });
  }, []);

  useEffect(() => {
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

    Axios.get(`${apiUrl}/api/gettoday/${tanggal}`).then((response) => {
      setDataToday(response.data);
    });
  }, []);

  useEffect(() => {
    Axios.get(`${apiUrl}/getclaimed`).then((response) => {
      setDataClaim(response.data);
    });
  }, []);

  return (
    <>
      <div className="w-full pt-4 pb-20">
        <Header />
        <div className="w-full px-2 py-3.5">
          <div className="flex items-center px-2 bg-slate-200 h-10 rounded-xl shadow gap-1">
            <RiSearchLine className="h-8" />
            <input
              type="text"
              placeholder="Search"
              className="h-10 bg-slate-200"
            />
          </div>
        </div>
        <Cards
          data={data}
          dataToday={dataToday}
          dataClaim={dataClaim}
          totalPrize={totalPrize}
        />
        <div>
          <Charts data={data} />
        </div>
      </div>
    </>
  );
}

const Cards = ({ data, dataToday, dataClaim, totalPrize }) => {
  const rupiah = new Intl.NumberFormat("id-ID", {
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
      <div className="w-full px-2 flex flex-wrap gap-2 justify-center border-b pt-3 pb-8">
        <div className="w-[48%] py-3 flex flex-col gap-1 justify-center bg-slate-200 rounded-lg shadow px-2">
          <div className="w-full flex justify-evenly items-center">
            <FaUsers className="text-blue-500 text-[30px]" />
            <p className="font-extrabold text-xl text-black">{data.length}</p>
          </div>
          <p className="text-slate-500 font-semibold text-sm text-center">
            Total Fortune All
          </p>
        </div>
        <div className="w-[48%] py-3 flex flex-col gap-1 justify-center bg-slate-200 rounded-lg shadow px-2">
          <div className="w-full flex justify-evenly items-center">
            <FaUsers className="text-blue-500 text-[30px]" />
            <p className="font-extrabold text-xl text-black">
              {dataToday.length}
            </p>
          </div>
          <p className="text-slate-500 font-semibold text-sm text-center">
            Total Fortune Today
          </p>
        </div>
        <div className="w-[48%] py-3 flex flex-col gap-1 justify-center bg-slate-200 rounded-lg shadow px-2">
          <div className="w-full flex justify-evenly items-center">
            <FaUsers className="text-blue-500 text-[30px]" />
            <p className="font-extrabold text-xl text-black">
              {dataClaim.length}
            </p>
          </div>
          <p className="text-slate-500 font-semibold text-sm text-center">
            Total Fortune Approved
          </p>
        </div>
        <div className="w-[48%] py-3 flex flex-col gap-1 justify-center bg-slate-200 rounded-lg shadow px-2">
          <div className="w-full flex justify-evenly items-center">
            <FaUsers className="text-blue-500 text-[30px]" />
            <p className="font-extrabold text-[100%] text-black">
              {isNumber(totalPrize)}
            </p>
          </div>
          <p className="text-slate-500 font-semibold text-sm text-center">
            Total Prize
          </p>
        </div>
      </div>
    </>
  );
};

const Charts = ({ data }) => {
  const smallLength = data.filter(
    (item) => item.hadiah.toLowerCase() === "small"
  ).length;
  const mediumLength = data.filter(
    (item) => item.hadiah.toLowerCase() === "medium"
  ).length;
  const bigLength = data.filter(
    (item) => item.hadiah.toLowerCase() === "big"
  ).length;
  const hugeLength = data.filter(
    (item) => item.hadiah.toLowerCase() === "huge"
  ).length;

  const dataCharts = [
    { name: "Small", category: smallLength },
    { name: "Medium", category: mediumLength },
    { name: "Big", category: bigLength },
    { name: "Huge", category: hugeLength },
  ];
  return (
    <>
      <div className="flex flex-col justify-center px-3 py-1">
        <div className="flex justify-between py-2">
          <h1 className="font-bold text-xl">Overview</h1>
          <div className="rounded-2xl p-1 bg-slate-400 flex gap-1">
            <div className="p-1 font-semibold text-sm bg-slate-400 rounded-2xl">
              Today
            </div>
            <div className="p-1 font-semibold text-sm bg-white rounded-2xl">
              All Time
            </div>
          </div>
        </div>
        <BarChart
          width={330}
          height={350}
          data={dataCharts}
          className="mx-auto"
          margin={{
            top: 20,
            right: 15,
            left: -15,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="category" stackId="a" fill="rgb(59 130 246)" />
        </BarChart>
      </div>
    </>
  );
};
