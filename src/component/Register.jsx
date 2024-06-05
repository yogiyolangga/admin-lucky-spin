import React, { useEffect, useState } from "react";
import Axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [insertStatus, setInsertStatus] = useState("");
  const [dataUser, setDataUser] = useState([]);
  const baseUrl = "http://localhost:3001";

  const regis = () => {
    Axios.post(`${baseUrl}/api/regis`, {
      username: username,
      password: password,
    }).then((response) => {
      if (response.data.message) {
        setInsertStatus(response.data.message);
      } else {
        setInsertStatus("");
        setDataUser([
          {
            user: username,
          },
          ...dataUser,
        ]);
      }
    });
  };

  useEffect(() => {
    Axios.get(`${baseUrl}/api/getuser`).then(
        (response) => {
            setDataUser(response.data);
        }
    )
  },[])

  return (
    <div className="md:w-[80%] w-[98%] mx-auto pl-14 md:pl-20 pb-10 pt-24">
      <p className="text-center text-white font-bold">Tambah Admin Baru</p>

      <div className="w-full flex flex-wrap gap-1 justify-center rounded-md py-3">
        <input
          type="text"
          id="username"
          name="username"
          maxLength={30}
          placeholder="Username"
          className="mx-auto h-8 px-2 rounded-md w-[80%] md:w-1/2"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          type="text"
          id="password"
          name="password"
          placeholder="Password"
          className="mx-auto h-8 px-2 rounded-md w-[80%] md:w-1/2"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button
          type="submit"
          className="mx-auto px-2 rounded-md w-[80%] bg-[#00d71e] h-8 md:w-1/2"
          onClick={regis}
        >
          Submit
        </button>
      </div>
      <div className="w-fit mb-3 mx-auto">
        <p className="text-center mt-2 text-red-600 bg-slate-200 rounded-sm">
          {insertStatus}
        </p>
      </div>
      <div className="w-[98%] md:w-[80%] mx-auto">
        <table className="table-auto w-full text-center rounded-md overflow-hidden">
          <thead className="text-gray-400 bg-gray-700 text-base">
            <tr>
              <th className="py-3 w-fit">No</th>
              <th className="py-3">Username</th>
            </tr>
          </thead>
          <tbody>
            {dataUser.length > 0 &&
              dataUser.map((val, index) => (
                <tr
                  key={val.user}
                  className="bg-gray-800 border-b-2 hover:bg-gray-700 text-white"
                >
                  <td className="py-2">{index + 1}</td>
                  <td className="py-2">{val.user}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Register;
