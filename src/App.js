import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./component/Dashboard";
import Datalist from "./component/Datalist";
import PrizeDesktop from "./component/Prize";
import Claimed from "./component/Claimed";
import Login from "./component/Login";
import Axios from "axios";
import io from "socket.io-client";
import { useEffect } from "react";
import notifSound from "./assets/bells.wav";
import Home from "./component/mobile/Home";
import Menu from "./component/mobile/Menu";
import Details from "./component/mobile/Details";
import Notif from "./component/mobile/Notif";
import Prize from "./component/mobile/Prize";
import Account from "./component/mobile/Account";
import InputData from "./component/mobile/InputData";
import AddTicket from "./component/AddTicket";

const socket = io.connect("http://localhost:3001");

function App() {
  Axios.defaults.withCredentials = true;

  useEffect(() => {
    socket.on("receive_message", (data) => {
      let audio = new Audio(notifSound);
      audio.play();
    });
  }, []);

  return (
    <Router>
      <div className="w-full">
        {/* Desktop Display */}
        <div className="hidden md:block">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/details" element={<Datalist />} />
            <Route path="/prize" element={<PrizeDesktop />} />
            <Route path="/notif" element={<Claimed />} />
            <Route path="/input" element={<AddTicket />} />
          </Routes>
        </div>
        {/* Mobile Display */}
        <div className="md:hidden">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/details" element={<Details />} />
            <Route path="/notif" element={<Notif />} />
            <Route path="/prize" element={<Prize />} />
            <Route path="/account" element={<Account />} />
            <Route path="/input" element={<InputData />} />
          </Routes>
        </div>
        <div className="hidden md:block">
          {/* <Footer /> */}
        </div>
        <div className="fixed bottom-0 w-full md:hidden">
          <Menu />
        </div>
      </div>
    </Router>
  );
}

export default App;
