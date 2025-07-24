import React, { useContext } from "react";
// I'm assuming your assets file correctly exports the logo you provided.
import { assets } from "../assets/assets.js";
import { AdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa"; // Added an icon for the button

const Navbar = () => {
  // --- All original logic is preserved ---
  const { aToken, setAToken } = useContext(AdminContext);
  const navigate = useNavigate();

  const logout = () => {
    navigate("/");
    if (aToken) {
      setAToken("");
      localStorage.removeItem("aToken");
    }
  };

  // --- The UI is updated for a more compact height ---
  return (
    <div className="flex justify-between items-center px-4 sm:px-8 py-2 bg-white shadow-md sticky top-0 z-50">
      {/* Logo and Title */}
      <div className="flex items-center gap-4">
        <img
          className="h-10 w-auto cursor-pointer" // Reduced height, width is automatic
          src={assets.admin_logo} // This should be your "MENTOS" logo
          alt="Company Logo"
          onClick={() => navigate("/dashboard")} // Added navigation to dashboard on logo click
        />
        <h1 className="hidden sm:block text-lg font-bold text-gray-700">
          Dashboard Panel
        </h1>
      </div>

      {/* Profile/Logout Section */}
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="font-semibold text-gray-800">Admin User</p>
          <p className="text-xs text-gray-500">
            {aToken ? "Administrator" : "Doctor"}
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
