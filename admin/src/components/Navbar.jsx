import React, { useContext } from "react";

import { assets } from "../assets/assets.js";
import { AdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { MentorContext } from "../context/MentorContext.jsx";

const Navbar = () => {
  
  const { aToken, setAToken } = useContext(AdminContext);
  const { mToken, setMToken } = useContext(MentorContext);

  const navigate = useNavigate();

  const logout = () => {
    navigate("/");
    mToken && setMToken("");
    mToken && localStorage.removeItem("mToken");
    aToken && setAToken("");
    aToken && localStorage.removeItem("aToken");
  };


  return (
    <div className="flex justify-between items-center px-4 sm:px-8 py-2 bg-white shadow-md sticky top-0 z-50">
      {/* Logo and Title */}
      <div className="flex items-center gap-4">
        <img
          className="h-10 w-auto cursor-pointer"
          src={assets.admin_logo} 
          alt="Company Logo"
          onClick={() => navigate("/dashboard")} 
        />
        <h1 className="hidden sm:block text-lg font-bold text-gray-700">
          Dashboard Panel
        </h1>
      </div>

      {/* Profile/Logout Section */}
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="font-semibold text-gray-800">Dashboard User</p>
          <p className="text-xs text-gray-500">
            {aToken ? "Administrator" : "Mentor"}
          </p>
        </div>
        <button
          onClick={logout}
          
          className="flex items-center gap-2 bg-black text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 transition-all duration-300"
          aria-label="Logout"
        >
          <FaSignOutAlt />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
