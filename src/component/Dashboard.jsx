import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { MdDataset } from "react-icons/md";
import { MdOutlinePendingActions } from "react-icons/md";
import { MdToday } from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";
import Stack from "@mui/material/Stack";
import { Gauge } from "@mui/x-charts/Gauge";
import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";

const Dashboard = () => {
  const navigate = useNavigate();
  const [loginStatus, setLoginStatus] = useState("");
  const apiUrl = "http://localhost:3001";
  const [openSide, setOpenSide] = useState(false);

  useEffect(() => {
    Axios.get(`${apiUrl}/logadmin`).then((response) => {
      if (response.data.loggedIn === true) {
        setLoginStatus(response.data.admin[0].user);
      } else {
        navigate("/login");
      }
    });
  }, [navigate]);

  useEffect(() => {}, [loginStatus]);

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
              Dashboard Admin
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
        <div className="py-5 px-14">
          <Cards />
        </div>
        <div className="py-5 px-14">
          <Section2 />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

const Cards = () => {
  const apiUrl = "http://localhost:3001";
  const [data, setData] = useState([]);
  const [dataToday, setDataToday] = useState([]);
  const [dataClaim, setDataClaim] = useState([]);
  const [totalPrize, setTotalPrize] = useState(0);
  const [dataPending, setDataPending] = useState([]);

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

    Axios.get(`${apiUrl}/getclaimed`).then((response) => {
      setDataClaim(response.data);
    });

    Axios.get(`${apiUrl}/claimed`).then((response) => {
      setDataPending(response.data);
    });
  });
  return (
    <>
      <div className="flex justify-between">
        <div className="flex flex-wrap w-1/2 gap-2 justify-evenly">
          <a href="/details" className="w-[48%] bg-slate-200 rounded-lg shadow-md flex justify-between p-3 hover:scale-105 duration-100 cursor-pointer">
            <div className="flex flex-col">
              <h1 className="font-bold text-lg text-slate-800">All Ticket</h1>
              <p className="font-extrabold text-3xl text-slate-800">
                {data.length}
              </p>
              <p className="text-blue-500 font-light text-sm">
                All data ticket has been created
              </p>
            </div>
            <div>
              <MdDataset className="text-4xl text-blue-500" />
            </div>
          </a>
          <a href="/notif" className="w-[48%] bg-slate-200 rounded-lg shadow-md flex justify-between p-3 hover:scale-105 duration-100 cursor-pointer">
            <div className="flex flex-col">
              <h1 className="font-bold text-lg text-slate-800">Pending</h1>
              <p className="font-extrabold text-3xl text-slate-800">{dataPending.length}</p>
              <p className="text-blue-500 font-light text-sm">
                Already spin but not yet confirm
              </p>
            </div>
            <div>
              <MdOutlinePendingActions className="text-4xl text-blue-500" />
            </div>
          </a>
          <div className="w-[48%] bg-slate-200 rounded-lg shadow-md flex justify-between p-3 hover:scale-105 duration-100 cursor-pointer">
            <div className="flex flex-col">
              <h1 className="font-bold text-lg text-slate-800">Today</h1>
              <p className="font-extrabold text-3xl text-slate-800">
                {dataToday.length}
              </p>
              <p className="text-blue-500 font-light text-sm">
                Data Ticker Spin Created Today
              </p>
            </div>
            <div>
              <MdToday className="text-4xl text-blue-500" />
            </div>
          </div>
          <div className="w-[48%] bg-slate-200 rounded-lg shadow-md flex justify-between p-3 hover:scale-105 duration-100 cursor-pointer">
            <div className="flex flex-col">
              <h1 className="font-bold text-lg text-slate-800">Approved</h1>
              <p className="font-extrabold text-3xl text-slate-800">{dataClaim.length}</p>
              <p className="text-blue-500 font-light text-sm">
                Data spin already approved
              </p>
            </div>
            <div>
              <GiConfirmed className="text-4xl text-blue-500" />
            </div>
          </div>
        </div>
        <div className="flex w-1/2 gap-2 justify-evenly">
          <div className="w-[48%] bg-slate-200 flex flex-col p-3 rounded-lg shadow-md hover:scale-105 duration-150 cursor-pointer">
            <div className="text-slate-800 text-xl font-bold">Total Prize</div>
            <div className="font-extrabold text-4xl text-slate-800">
              {isNumber(totalPrize)}
            </div>
            <p className="text-xs font-semibold text-slate-400">
              Lorem ipsum dolor sit amet
            </p>
            <div>
              <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={{ xs: 1, md: 3 }}
              >
                <Gauge width={100} height={100} value={60} />
                <Gauge
                  width={100}
                  height={100}
                  value={80}
                  valueMin={10}
                  valueMax={100}
                />
              </Stack>
            </div>
          </div>
          <div className="w-[48%] bg-slate-200 flex flex-col p-3 rounded-lg shadow-md hover:scale-105 duration-150 cursor-pointer">
            <div className="text-slate-800 text-xl font-bold">New Customer</div>
            <div className="font-extrabold text-4xl text-slate-800">120</div>
            <p className="text-xs font-semibold text-slate-400">
              Lorem ipsum dolor sit amet
            </p>
            <div className="w-full flex justify-center items-center">
              <PieChart
                series={[
                  {
                    data: [
                      { id: 0, value: 10, label: "Cus A" },
                      { id: 1, value: 15, label: "Cus B" },
                      { id: 2, value: 20, label: "Cus C" },
                    ],
                  },
                ]}
                width={250}
                height={100}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Section2 = () => {
  const [dataList, setDataList] = useState([]);
  const apiUrl = "http://localhost:3001";

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
      setDataList(response.data);
    });
  }, []);

  const columns = [
    { field: "username", headerName: "Username", width: 100, },
    {
      field: "spincode",
      headerName: "Spin Code",
      width: 150,
    },
    {
      field: "hadiah",
      headerName: "Category",
      width: 150,
    },
    {
      field: "chance",
      headerName: "Chance",
      width: 110,
    },
  ];

  return (
    <>
      <div className="flex justify-between w-full gap-4">
        <div className="bg-slate-200 w-1/2 rounded-lg shadow-md flex justify-center items-center">
          <BarChart
            series={[
              { data: [3, 4, 1, 6, 5], stack: "A", label: "SMALL" },
              { data: [4, 3, 1, 5, 8], stack: "A", label: "MEDIUM" },
              { data: [4, 2, 5, 4, 1], stack: "B", label: "BIG" },
              { data: [2, 8, 1, 3, 1], stack: "B", label: "HUGE" },
            ]}
            width={600}
            height={350}
          />
        </div>
        <div className="bg-slate-200 w-1/2 rounded-lg shadow-md flex flex-col justify-between gap-3 p-3">
          <h1 className="font-bold text-slate-800 text-2xl">
            Lucky Ticket List Today
          </h1>
          <div className="">
            <Box sx={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={dataList}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 6,
                    },
                  },
                }}
                pageSizeOptions={[6]}
                disableRowSelectionOnClick
              />
            </Box>
          </div>
        </div>
      </div>
    </>
  );
};
