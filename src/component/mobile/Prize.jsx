import { useEffect, useState } from "react";
import Header from "./Header";
import { CiEdit } from "react-icons/ci";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { ImCancelCircle } from "react-icons/im";

export default function Prize() {
  const apiUrl = "http://localhost:3001";
  const [positionEditPrize, setPositionEditPrize] = useState(
    "-translate-y-[100%]"
  );

  const deletePrize = () => {
    Axios.delete(`${apiUrl}/deleteBeforeEditPrize`);
  };

  function handleClickEditPrize() {
    setPositionEditPrize("translate-y-0");
    deletePrize();
  }

  function closeEditPrize() {
    setPositionEditPrize("-translate-y-[100%]");
  }
  return (
    <>
      <div className="w-full pt-4 pb-20 relative">
        <div>
          <Header />
        </div>
        <div>
          <DataPrize />
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleClickEditPrize}
            className="py-1 px-4 bg-blue-500 rounded-md shadow-md shadow-black"
          >
            <CiEdit className="text-white text-[30px]" />
          </button>
        </div>
        <div
          className={`absolute bg-slate-800 min-h-screen w-full top-0 pb-20 duration-300 ${positionEditPrize}`}
        >
          <EditPrize closeEditPrize={closeEditPrize} />
        </div>
      </div>
    </>
  );
}

const DataPrize = () => {
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
            <h3 className="text-slate-500 ml-1">Small</h3>
            <div className="flex flex-col w-full px-2 py-3 gap-2 my-1 justify-center items-center rounded-xl bg-slate-200 shadow shadow-black">
              {prizes.map((data, index) => (
                <div key={index} className="font-semibold">
                  Rp. {isNumber(data.small)}
                </div>
              ))}
            </div>
          </div>
          <div className="w-[45%]">
            <h3 className="text-slate-500 ml-1">Medium</h3>
            <div className="flex flex-col w-full px-2 py-3 gap-2 my-1 justify-center items-center rounded-xl bg-slate-200 shadow shadow-black">
              {prizes.map((data, index) => (
                <div key={index} className="font-semibold">
                  Rp. {isNumber(data.medium)}
                </div>
              ))}
            </div>
          </div>
          <div className="w-[45%]">
            <h3 className="text-slate-500 ml-1">Big</h3>
            <div className="flex flex-col w-full px-2 py-3 gap-2 my-1 justify-center items-center rounded-xl bg-slate-200 shadow shadow-black">
              {prizes.map((data, index) => (
                <div key={index} className="font-semibold">
                  Rp. {isNumber(data.big)}
                </div>
              ))}
            </div>
          </div>
          <div className="w-[45%]">
            <h3 className="text-slate-500 ml-1">Huge</h3>
            <div className="flex flex-col w-full px-2 py-3 gap-2 my-1 justify-center items-center rounded-xl bg-slate-200 shadow shadow-black">
              {prizes.map((data, index) => (
                <div key={index} className="font-semibold">
                  Rp. {isNumber(data.huge)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const EditPrize = ({ closeEditPrize }) => {
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
        navigate("/");
      } else {
        alert("Error Process Request!");
      }
    });
  };

  return (
    <>
      <div className="w-full px-4 pt-5 pb-20 bg-slate-800">
        <button
          onClick={closeEditPrize}
          className="p-1 w-full flex justify-end px-2"
        >
          <ImCancelCircle className="text-white text-2xl" />
        </button>
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
