import React, { useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";


const Navbar = () => {
  const navigate = useNavigate();
  const {token, setToken, userData} = useContext(AppContext);
  const [showMenu, setShowMenu] = useState(false);

  const logout = () => {
    setToken(false);
    localStorage.removeItem('token');
    navigate('/');
  }
  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400 rounded-full px-5 md:px-10">
      <span
        onClick={() => navigate("/")}
        className="text-3xl font-extrabold bg-gradient-to-r from-black via-neutral-700 to-black bg-clip-text text-transparent cursor-pointer tracking-tight select-none hover:drop-shadow-md transition duration-300"
      >
        Mentos
      </span>

      <ul className="md:flex items-start gap-5 font-medium hidden">
        <NavLink to="/">
          <li className="py-1">HOME</li>
          <hr className="border-none outline-none h-0.5 bg-secondary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/blogs">
          <li className="py-1">BLOGS</li>
          <hr className="border-none outline-none h-0.5 bg-secondary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/mentors">
          <li className="py-1">MENTORS</li>
          <hr className="border-none outline-none h-0.5 bg-secondary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/about">
          <li className="py-1">ABOUT</li>
          <hr className="border-none outline-none h-0.5 bg-secondary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/contact">
          <li className="py-1">CONTACT</li>
          <hr className="border-none outline-none h-0.5 bg-secondary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink
          to="http://localhost:5174/"
          className="bg-transparent text-black px-6 py-2 rounded-full border border-black hover:bg-black hover:text-white transition duration-300 shadow-sm hover:shadow-md"
        >
          ADMIN PANEL
        </NavLink>
      </ul>

      <div className="flex items-center gap-4 ">
        {token && userData ? (
          <div className="flex items-center gap-4 cursor-pointer group relative">
            <img className="w-8 rounded-full" src={userData.image} alt="" />
            <img className="w-2.5" src={assets.dropdown_icon} alt="" />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-black z-20 hidden group-hover:block">
              <div className="min-w-48 bg-white rounded flex flex-col gap-2 p-4">
                <p
                  onClick={() => navigate("/my-profile")}
                  className="cursor-pointer hover:bg-black hover:text-white px-4 py-2 rounded"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate("/my-sessions")}
                  className="hover:bg-black hover:text-white cursor-pointer px-4 py-2 rounded"
                >
                  My Sessions
                </p>
                <p
                  onClick={logout}
                  className="hover:bg-black hover:text-white cursor-pointer px-4 py-2 rounded"
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-black text-white px-8 py-3 rounded-full font-light hidden md:block"
          >
            Create account
          </button>
        )}
        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden"
          src={assets.menu_icon}
          alt=""
        />

        {/*  Mobile Menu  */}
        <div
          className={`md:hidden fixed right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all ${
            showMenu ? "w-full" : "h-0 w-0"
          }`}
        >
          <div className="flex items-center justify-between px-5 py-6">
            <img src={assets.logo} className="w-36" alt="" />
            <img
              onClick={() => setShowMenu(false)}
              src={assets.cross_icon}
              className="w-7"
              alt=""
            />
          </div>
          <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
            <NavLink onClick={() => setShowMenu(false)} to="/">
              <p className="px-4 py-2 rounded full inline-block">HOME</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/blogs">
              <p className="px-4 py-2 rounded full inline-block">BLOGS</p>
            </NavLink>
            <NavLink to="/mentors" onClick={() => setShowMenu(false)}>
              <li className="py-1">MENTORS</li>
              <hr className="border-none outline-none h-0.5  w-3/5 m-auto hidden" />
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/about">
              <p className="px-4 py-2 rounded full inline-block">ABOUT</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/contact">
              <p className="px-4 py-2 rounded full inline-block">CONTACT</p>
            </NavLink>
            <NavLink
              onClick={() => setShowMenu(false)}
              to="http://localhost:5174/"
            >
              <p className="px-4 py-2 rounded full inline-block">ADMIN PANEL</p>
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;