import React, { useState, useEffect } from "react";
import Axios from "axios";
import Datatable, { createTheme } from "react-data-table-component";
import Datepicker from "react-tailwindcss-datepicker";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";

const Datalist = () => {
  const [dataList, setDataList] = useState([]);
  const [records, setRecords] = useState([]);
  const [value, setValue] = useState({
    stardDate: null,
    endDate: null,
  });
  const baseUrl = "http://localhost:3001";
  const [openSide, setOpenSide] = useState(false);
  const [loginStatus, setLoginStatus] = useState("");
  const navigate = useNavigate();

  const handleValueChange = (newValue) => {
    setValue(newValue);

    Axios.post(`${baseUrl}/api/daterange`, {
      startDate: newValue.startDate,
      endDate: newValue.endDate,
    }).then((response) => {
      setDataList(response.data);
      setRecords(response.data);
    });
  };

  const deleteData = (id) => {
    Axios.delete(`${baseUrl}/api/delete/${id}`);
    setDataList(dataList.filter((data) => data.id !== id));
    setRecords(dataList.filter((data) => data.id !== id));
  };

  useEffect(() => {
    Axios.get(`${baseUrl}/getalldata`).then((response) => {
      setDataList(response.data);
      setRecords(response.data);
    });
  }, []);

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

  const columns = [
    {
      name: <div className="mx-auto laptop:text-lg">Tanggal</div>,
      selector: (row) => row.tanggal,
      cell: (row) => <div className="mx-auto">{row.tanggal}</div>,
      sortable: true,
    },
    {
      name: <div className="mx-auto laptop:text-lg">Username</div>,
      cell: (row) => <div className="mx-auto">{row.username}</div>,
    },
    {
      name: <div className="mx-auto laptop:text-lg">Spincode</div>,
      cell: (row) => <div className="mx-auto">{row.spincode}</div>,
    },
    {
      name: <div className="mx-auto laptop:text-lg">Kategori</div>,
      cell: (row) => <div className="mx-auto">{row.hadiah}</div>,
    },
    {
      name: <div className="mx-auto laptop:text-lg">Hadiah</div>,
      cell: (row) => <div className="mx-auto">{isNumber(row.nominal)}</div>,
    },
    {
      name: <div className="mx-auto laptop:text-lg">Kesempatan</div>,
      selector: (row) => row.chance,
      cell: (row) => <div className="mx-auto">{row.chance}</div>,
      sortable: true,
    },
    {
      name: <div className="mx-auto laptop:text-lg">Admin</div>,
      selector: (row) => row.admin,
      cell: (row) => <div className="mx-auto">{row.admin}</div>,
      sortable: true,
    },
    {
      name: <div className="mx-auto laptop:text-lg">Action</div>,

      cell: (row) => (
        <div
          className="bg-red-600 text-white px-2 mx-auto cursor-pointer border-b-2 hover:border-none rounded-lg py-1 hover:bg-red-700 transition-all ease-in"
          onClick={() => {
            deleteData(row.id);
          }}
        >
          Hapus
        </div>
      ),
    },
  ];

  const [pending, setPending] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      Axios.get(`${baseUrl}/getalldata`).then((response) => {
        setDataList(response.data);
        setRecords(response.data);
        setPending(false);
      });
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  createTheme(
    "solarized",
    {
      text: {
        primary: "white",
        secondary: "white",
      },
      background: {
        default: "#1e1e1d",
      },
      context: {
        background: "#cb4b16",
        text: "#FFFFFF",
      },
      divider: {
        default: "white",
      },
      action: {
        button: "rgba(0,0,0,.54)",
        hover: "rgba(0,0,0,.08)",
        disabled: "rgba(0,0,0,.12)",
      },
    },
    "dark"
  );

  useEffect(() => {
    Axios.get(`${baseUrl}/logadmin`).then((response) => {
      if (response.data.loggedIn === true) {
        setLoginStatus(response.data.admin[0].user);
      } else {
        navigate("/login");
      }
    });
  }, [navigate]);

  function handleFilter(e) {
    const newData = dataList.filter((row) => {
      return row.username.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setRecords(newData);
  }

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
        <div className="w-full flex flex-wrap py-1 gap-1">
          <a
            href="/"
            className="md:w-[30%] w-full text-white font-semibold flex justify-center items-center bg-blue-500 h-10 rounded-md"
          >
            Tambah Data
          </a>
          <input
            type="text"
            className="md:w-[30%] h-10 w-full border border-slate-700 px-1 rounded-md"
            placeholder="Cari Username..."
            onChange={handleFilter}
          />
          <div className="md:w-[39%] w-full">
            <Datepicker
              value={value}
              onChange={handleValueChange}
              popoverDirection="down"
              showShortcuts={true}
              primaryColor="amber"
              showFooter={true}
            />
          </div>
        </div>
        <Datatable
          columns={columns}
          data={records}
          fixedHeader
          pagination
          theme="solarized"
          progressPending={pending}
        ></Datatable>
      </div>
    </div>
  );
};

export default Datalist;
