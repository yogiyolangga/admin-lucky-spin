import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const baseurl = "http://localhost:3001";
  const navigate = useNavigate();

  const login = () => {
    Axios.post(`${baseurl}/logadmin`, {
      username: username,
      password: password,
    }).then((response) => {
      if (response.data.message) {
        setLoginStatus(response.data.message);
      } else {
        setLoginStatus(response.data[0].admin);
        navigate("/");
      }
    });
  };

  useEffect((event) => {
    Axios.get(`${baseurl}/logadmin`).then((response) => {
      if (response.data.loggedIn === true) {
        navigate("/");
      }
    });
  });

  const [loginMobile, setLoginMobile] = useState("");
  const [loginDesktop, setLoginDesktop] = useState("hidden");

  useEffect(() => {
    if (window.innerWidth >= 768) {
      setLoginMobile("hidden");
      setLoginDesktop("");
    } else {
      setLoginMobile("");
      setLoginDesktop("hidden");
    }
  }, []);

  return (
    <>
      <div id="login-desktop" className={`${loginDesktop}`}>
        <LoginDesktop
          login={login}
          setUsername={setUsername}
          setPassword={setPassword}
          loginStatus={loginStatus}
        />
      </div>
      <div
        id="login-mobile"
        className={`${loginMobile} w-full flex flex-wrap justify-center h-screen bg-gradient-to-t from-black to-slate-500 absolute z-10`}
      >
        <div className="w-full flex justify-center py-2 h-[30%]">
          <img src="img/dashboard.png" className="w-52" alt="Login Dashboard" />
        </div>
        <div className="w-full px-4 pb-5 pt-16 bg-white rounded-tl-[100px] h-[70%]">
          <p className="w-full text-center font-bold mb-2 text-[40px]">LOGIN</p>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            className="w-full px-2 h-10 bg-slate-300 rounded-2xl"
          />
          <input
            type="password"
            id="Password"
            name="Password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="w-full px-2 h-10 bg-slate-300 rounded-2xl mt-3"
          />
          <button
            className="w-full px-2 bg-slate-800 rounded-2xl mt-3 h-14 font-semibold text-white"
            onClick={login}
          >
            Login
          </button>
          <div className="w-fit mx-auto px-4 mt-2 bg-red-500 rounded-md text-white text-center">
            {loginStatus}
          </div>
        </div>
        <div className="w-full text-center bg-white -mt-10">
          <span>
            Don't have account,{" "}
            <span className="text-blue-400"> Sign Up Here..</span>
          </span>
        </div>
      </div>
    </>
  );
};

export default Login;

const LoginDesktop = ({ login, setPassword, setUsername, loginStatus }) => {
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      login();
    }
  };

  return (
    <>
      <div className="bg-login h-screen w-full bg-gray-400 absolute z-20 flex justify-center items-center">
        <div className="w-[80%] flex bg-slate-500 bg-opacity-25 rounded-3xl px-4 pt-4 backdrop-blur-sm">
          <div className="w-1/2 flex items-end justify-center">
            <img
              src="img/admin-ilustration.png"
              alt="login dashboard"
              className="w-[500px] h-[500px]"
            />
          </div>
          <div className="w-1/2 flex justify-center flex-col gap-3 items-center">
            <h2 className="text-white font-bold text-3xl text-center">
              Hello, Welcome Back!
            </h2>
            <p className="text-white">Login with</p>
            <div className="flex py-2 px-2 border border-white rounded-xl text-white w-[80%] justify-between">
              <p>User : admin</p>
              <p>Pass : passwordnew</p>
            </div>
            <p className="text-red-500 text-sm">{loginStatus}</p>
            <input
              type="text"
              className="w-[80%] rounded-md h-10 bg-slate-200 flex items-center justify-center px-2"
              placeholder="Username"
              onKeyPress={handleKeyPress}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <input
              type="password"
              className="w-[80%] rounded-md h-10 bg-slate-200 flex items-center justify-center px-2"
              placeholder="Password"
              onKeyPress={handleKeyPress}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <p className="text-right w-[80%] text-white cursor-pointer">
              Forget password ?
            </p>
            <button
              className="w-[80%] px-2 bg-slate-400 hover:scale-105 duration-150 rounded-2xl mt-3 h-14 font-semibold text-lg"
              onClick={login}
            >
              Login
            </button>
            <p className="text-white font-light cursor-pointer">
              Don't have account ? Ask Admin
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
