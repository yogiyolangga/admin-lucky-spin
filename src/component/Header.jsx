import React from "react";
import logo from "../assets/logo.png";

const Header = () => {

    return (
        <div className="fixed w-full pl-14 md:pl-24 mx-auto py-3 bg-black bg-opacity-70 z-10">
            <img src={logo} alt="Terminal4D" className="mx-auto h-12" />
        </div>
    )
};
export default Header;