import { Button, Popover } from "antd";
import React, { useState } from "react";
import { LoginOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

import Logo from "../assets/LOGO new.png";
import "antd/dist/antd.css";

const NavBar = () => {
  let Links = [
    { name: "HOME", link: "/" },
    { name: "ABOUT", link: "/about" },
    { name: "SERVICES", link: "/services" },
    { name: "CONTACT", link: "/contact" },
  ];

  const [open, setOpen] = useState(false);

  const history = useNavigate();

  const logoutHandler = () => {
    localStorage.setItem("authToken", null);
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("type");
    localStorage.removeItem("id");
    history("/login");
  };

  const content = (
    <div style={{ width: "2px" }}>
      <div>
        <Button
          onClick={() =>
            history(
              `/user-dashboard/${localStorage.getItem(
                "username"
              )}/?_optProfile=my`
            )
          }
        >
          Profile
        </Button>
      </div>
      <div className="mt-1">
        <Button onClick={logoutHandler}>Logout</Button>
      </div>
    </div>
  );

  return (
    <div className="shadow-md w-full fixed top-0 left-0 z-10">
      <div className="md:flex items-center justify-between bg-zinc-600 py-2 md:px-10 px-7">
        <div className="font-bold text-2xl cursor-pointer flex items-center font-[Poppins] text-sky-600">
          <div className=" w-10 h-10 mr-1">
            <img src={Logo} alt="logo" />
          </div>
          <span className="text-2xl">aThSaa Book-Store</span>
        </div>

        <div
          onClick={() => setOpen(!open)}
          className="text-3xl absolute right-8 top-8 cursor-pointer md:hidden text-white"
        >
          <ion-icon name={open ? "close" : "menu-sharp"}></ion-icon>
        </div>
        {localStorage.getItem("username") === null ? (
          <ul
            className={`md:flex md:items-center font-semibold md:pb-0  pb-0 absolute md:static bg-zinc-600  md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-10 transition-all duration-500 ease-in ${
              open ? "top-21 opacity-100" : "top-[-490px]"
            } md:opacity-100`}
          >
            {Links.map((Link) => (
              <li key={Link.name} className="md:ml-2 text-lg md:my-0 my-7">
                <a
                  href={Link.link}
                  className=" text-white hover:text-sky-500 hover:bg-gray-700 py-2 hover:py-2 px-4 hover:px-4 hover:rounded-full  duration-500"
                >
                  {Link.name}
                </a>
              </li>
            ))}
            <Link to="/login">
              <button className="inline-flex items-center bg-red-600 text-white border-0 py-1 px-3 focus:outline-none hover:bg-blue-400 rounded-full text-base mt-4 md:mt-0 translate-x-6">
                <LoginOutlined />
                &nbsp;Login
              </button>
            </Link>
          </ul>
        ) : (
          <ul
            className={`md:flex md:items-center font-semibold md:pb-0 mt-3  pb-0 absolute md:static bg-zinc-600   md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-10 transition-all duration-500 ease-in ${
              open ? "top-21 opacity-100" : "top-[-490px]"
            } md:opacity-100`}
          >
            <div className=" flex ite">
              <button className="inline-flex items-center bg-sky-600 text-white border-0 py-1 px-3 focus:outline-none hover:bg-black rounded-full text-base mt-4 md:mt-0 translate-x-6">
                <Popover
                  placement="bottom"
                  content={content}
                  title={`Hello ${localStorage.getItem("username")} ❤️`}
                  trigger="hover"
                >
                  My Account
                </Popover>
              </button>
            </div>
          </ul>
        )}
      </div>
    </div>
  );
};

export default NavBar;
