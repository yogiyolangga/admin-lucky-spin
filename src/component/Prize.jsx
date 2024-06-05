import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Axios from "axios";

export default function PrizeDesktop() {
  const baseUrl = "http://localhost:3001";
  const [openSide, setOpenSide] = useState(false);
  const [loginStatus, setLoginStatus] = useState("");
  const navigate = useNavigate();
  const [editPrizeDisplay, setEditPrizeDisplay] = useState("hidden");

  const deletePrize = () => {
    Axios.delete(`${baseUrl}/deleteBeforeEditPrize`);
  };

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

  function handleClickEditPrize() {
    setEditPrizeDisplay("");
    deletePrize();
  }

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
              Prize Data
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
        <div className="flex justify-between gap-4 py-10 w-full">
          <div className="bg-slate-800 rounded-3xl p-3 w-[40%] shadow-md">
            <DataPrize handleClickEditPrize={handleClickEditPrize} />
          </div>
          <div
            className={`bg-slate-800 rounded-3xl p-3 w-[60%] shadow-md ${editPrizeDisplay}`}
          >
            <EditPrize />
          </div>
        </div>
      </div>
    </div>
  );
}

const DataPrize = ({handleClickEditPrize}) => {
  const defaultPrizes = [
    {
      small: "1000",
      medium: "5000",
      big: "9000",
      huge: "11000",
    },
    {
      small: "2000",
      medium: "6000",
      big: "10000",
      huge: "12000",
    },
    {
      small: "3000",
      medium: "7000",
      big: null,
      huge: null,
    },
    {
      small: "4000",
      medium: "8000",
      big: null,
      huge: null,
    },
  ];
  const [prizes, setPrizes] = useState(defaultPrizes);
  const apiUrl = "http://localhost:3001";

  useEffect(() => {
    const defaultPrize = [
      {
        small: "1000",
        medium: "5000",
        big: "9000",
        huge: "11000",
      },
      {
        small: "2000",
        medium: "6000",
        big: "10000",
        huge: "12000",
      },
      {
        small: "3000",
        medium: "7000",
        big: null,
        huge: null,
      },
      {
        small: "4000",
        medium: "8000",
        big: null,
        huge: null,
      },
    ];
    Axios.get(`${apiUrl}/getprize`).then((response) => {
      if (response.data.length < 1) {
        setPrizes(defaultPrize);
      } else {
        setPrizes(response.data);
      }
    });
  }, []);

  let rupiah = new Intl.NumberFormat("id-ID", {
    currency: "IDR",
  });

  function isNumber(str) {
    if (str > 0) {
      return rupiah.format(str);
    } else {
      return str;
    }
  }

  return (
    <>
      <div className="w-full py-3">
        <div className="w-full flex justify-center items-center flex-wrap gap-2">
          <div className="w-[45%]">
            <h3 className="text-slate-200 ml-1">Small</h3>
            <div className="flex flex-col w-full px-2 py-3 gap-2 my-1 justify-center items-center rounded-xl bg-slate-200 shadow shadow-black">
              {prizes.map((data, index) => (
                <div key={index} className="font-semibold">
                  Rp. {isNumber(data.small)}
                </div>
              ))}
            </div>
          </div>
          <div className="w-[45%]">
            <h3 className="text-slate-200 ml-1">Medium</h3>
            <div className="flex flex-col w-full px-2 py-3 gap-2 my-1 justify-center items-center rounded-xl bg-slate-200 shadow shadow-black">
              {prizes.map((data, index) => (
                <div key={index} className="font-semibold">
                  Rp. {isNumber(data.medium)}
                </div>
              ))}
            </div>
          </div>
          <div className="w-[45%]">
            <h3 className="text-slate-200 ml-1">Big</h3>
            <div className="flex flex-col w-full px-2 py-3 gap-2 my-1 justify-center items-center rounded-xl bg-slate-200 shadow shadow-black">
              {prizes.map((data, index) => (
                <div key={index} className="font-semibold">
                  Rp. {isNumber(data.big)}
                </div>
              ))}
            </div>
          </div>
          <div className="w-[45%]">
            <h3 className="text-slate-200 ml-1">Huge</h3>
            <div className="flex flex-col w-full px-2 py-3 gap-2 my-1 justify-center items-center rounded-xl bg-slate-200 shadow shadow-black">
              {prizes.map((data, index) => (
                <div key={index} className="font-semibold">
                  Rp. {isNumber(data.huge)}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center py-5">
          <button onClick={handleClickEditPrize} className="px-2 py-1 rounded-md bg-blue-500 text-white hover:scale-105 duration-100">
            Edit Prize
          </button>
        </div>
      </div>
    </>
  );
};

const EditPrize = () => {
  const [smallInput, setSmallInput] = useState(4);
  const [mediumInput, setMediumInput] = useState(4);
  const [bigInput, setBigInput] = useState(2);
  const [hugeInput, setHugeInput] = useState(2);
  const [totalPrize, setTotalPrize] = useState(
    12 - smallInput - mediumInput - bigInput - hugeInput
  );
  const apiUrl = "http://localhost:3001";
  const navigate = useNavigate();

  const [smallValues, setSmallValues] = useState([]);
  const [mediumValues, setMediumValues] = useState([]);
  const [bigValues, setBigValues] = useState([]);
  const [hugeValues, setHugeValues] = useState([]);

  function handleAddSmallInput() {
    if (smallInput < 4 && totalPrize >= 1) {
      setSmallInput(smallInput + 1);
      setTotalPrize(totalPrize - 1);
    } else if (smallInput >= 4) {
      alert("Max Small Prize");
    } else {
      alert("Total Prize Limit");
    }
  }

  function handleDeleteSmallInput() {
    if (smallInput > 1) {
      setSmallInput(smallInput - 1);
      setTotalPrize(totalPrize + 1);
    } else {
      alert("At least 1 Prize in Category");
    }
  }

  function handleSmallField({ smallInput }) {
    const smallFieldElements = [];

    for (let i = 0; i < smallInput; i++) {
      smallFieldElements.push(
        <input
          key={i}
          type="number"
          placeholder="10.000"
          className="px-2 py-1 rounded-md w-full"
          maxLength={12}
          onChange={(e) => {
            const newSmallValues = [...smallValues];
            newSmallValues[i] = e.target.value;
            setSmallValues(newSmallValues);
          }}
        />
      );
    }

    return (
      <div className="w-full flex flex-col gap-1">{smallFieldElements}</div>
    );
  }

  function handleAddMediumInput() {
    if (mediumInput < 4 && totalPrize >= 1) {
      setMediumInput(mediumInput + 1);
      setTotalPrize(totalPrize - 1);
    } else if (mediumInput >= 4) {
      alert("Max medium Prize");
    } else {
      alert("Total Prize Limit");
    }
  }

  function handleDeleteMediumInput() {
    if (mediumInput > 1) {
      setMediumInput(mediumInput - 1);
      setTotalPrize(totalPrize + 1);
    } else {
      alert("At least 1 Prize in Category");
    }
  }

  function handleMediumField({ mediumInput }) {
    const mediumFieldElements = [];

    for (let i = 0; i < mediumInput; i++) {
      mediumFieldElements.push(
        <input
          key={i}
          type="number"
          placeholder="10.000"
          className="px-2 py-1 rounded-md w-full"
          maxLength={12}
          onChange={(e) => {
            const newmediumValues = [...mediumValues];
            newmediumValues[i] = e.target.value;
            setMediumValues(newmediumValues);
          }}
        />
      );
    }

    return (
      <div className="w-full flex flex-col gap-1">{mediumFieldElements}</div>
    );
  }

  function handleAddBigInput() {
    if (bigInput < 4 && totalPrize >= 1) {
      setBigInput(bigInput + 1);
      setTotalPrize(totalPrize - 1);
    } else if (bigInput >= 4) {
      alert("Max big Prize");
    } else {
      alert("Total Prize Limit");
    }
  }

  function handleDeleteBigInput() {
    if (bigInput > 1) {
      setBigInput(bigInput - 1);
      setTotalPrize(totalPrize + 1);
    } else {
      alert("At least 1 Prize in Category");
    }
  }

  function handleBigField({ bigInput }) {
    const bigFieldElements = [];

    for (let i = 0; i < bigInput; i++) {
      bigFieldElements.push(
        <input
          key={i}
          type="number"
          placeholder="10.000"
          className="px-2 py-1 rounded-md w-full"
          maxLength={12}
          onChange={(e) => {
            const newbigValues = [...bigValues];
            newbigValues[i] = e.target.value;
            setBigValues(newbigValues);
          }}
        />
      );
    }

    return <div className="w-full flex flex-col gap-1">{bigFieldElements}</div>;
  }

  function handleAddHugeInput() {
    if (hugeInput < 4 && totalPrize >= 1) {
      setHugeInput(hugeInput + 1);
      setTotalPrize(totalPrize - 1);
    } else if (hugeInput >= 4) {
      alert("Max huge Prize");
    } else {
      alert("Total Prize Limit");
    }
  }

  function handleDeleteHugeInput() {
    if (hugeInput > 1) {
      setHugeInput(hugeInput - 1);
      setTotalPrize(totalPrize + 1);
    } else {
      alert("At least 1 Prize in Category");
    }
  }

  function handleHugeField({ hugeInput }) {
    const hugeFieldElements = [];

    for (let i = 0; i < hugeInput; i++) {
      hugeFieldElements.push(
        <input
          key={i}
          type="number"
          placeholder="10.000"
          className="px-2 py-1 rounded-md w-full"
          maxLength={12}
          onChange={(e) => {
            const newHugeValues = [...hugeValues];
            newHugeValues[i] = e.target.value;
            setHugeValues(newHugeValues);
          }}
        />
      );
    }

    return (
      <div className="w-full flex flex-col gap-1">{hugeFieldElements}</div>
    );
  }

  const insertPrize = () => {
    if (totalPrize > 0) {
      alert("Something  went wrong!");
      return;
    }

    Axios.post(`${apiUrl}/updateprize`, {
      smallValues: smallValues,
      mediumValues: mediumValues,
      bigValues: bigValues,
      hugeValues: hugeValues,
    }).then((response) => {
      if (response.data.errMessage) {
        alert(response.data.errMessage);
      } else if (response.data.successMessage) {
        alert(response.data.successMessage);
        navigate("/input");
      } else {
        alert("Error Process Request!");
      }
    });
  };

  return (
    <>
      <div className="w-full px-4 bg-slate-800 rounded-3xl">
        <h1 className="text-xl text-white font-bold">Edit Data Prize</h1>
        <div className="flex justify-evenly gap-1">
          <div>
            <div className="font-semibold text-white text-lg">Small</div>
            {handleSmallField({ smallInput })}
            <div className="py-2 flex justify-end items-center gap-2">
              <button
                onClick={handleAddSmallInput}
                className="px-2 py-1 bg-blue-500 rounded-md text-sm font-semibold"
              >
                Add Row
              </button>
              <button
                onClick={handleDeleteSmallInput}
                className="px-2 py-1 bg-red-500 text-white rounded-md text-sm font-semibold"
              >
                Delete Row
              </button>
            </div>
          </div>
          <div>
            <div className="font-semibold text-white text-lg">Medium</div>
            {handleMediumField({ mediumInput })}
            <div className="py-2 flex justify-end items-center gap-2">
              <button
                onClick={handleAddMediumInput}
                className="px-2 py-1 bg-blue-500 rounded-md text-sm font-semibold"
              >
                Add Row
              </button>
              <button
                onClick={handleDeleteMediumInput}
                className="px-2 py-1 bg-red-500 text-white rounded-md text-sm font-semibold"
              >
                Delete Row
              </button>
            </div>
          </div>
          <div>
            <div className="font-semibold text-white text-lg">Big</div>
            {handleBigField({ bigInput })}
            <div className="py-2 flex justify-end items-center gap-2">
              <button
                onClick={handleAddBigInput}
                className="px-2 py-1 bg-blue-500 rounded-md text-sm font-semibold"
              >
                Add Row
              </button>
              <button
                onClick={handleDeleteBigInput}
                className="px-2 py-1 bg-red-500 text-white rounded-md text-sm font-semibold"
              >
                Delete Row
              </button>
            </div>
          </div>
          <div>
            <div className="font-semibold text-white text-lg">Huge</div>
            {handleHugeField({ hugeInput })}
            <div className="py-2 flex justify-end items-center gap-2">
              <button
                onClick={handleAddHugeInput}
                className="px-2 py-1 bg-blue-500 rounded-md text-sm font-semibold"
              >
                Add Row
              </button>
              <button
                onClick={handleDeleteHugeInput}
                className="px-2 py-1 bg-red-500 text-white text-sm rounded-md font-semibold"
              >
                Delete Row
              </button>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center items-center py-5">
          <button
            onClick={insertPrize}
            className="bg-green-400 px-5 py-1 font-semibold text-xl rounded-md shadow-md"
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
};
