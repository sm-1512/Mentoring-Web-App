import React, { useState, useContext } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken, userData } = useContext(AppContext);
  const [showMenu, setShowMenu] = useState(false);

  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <header className="w-full border-b border-gray-300">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 md:px-10">
        <div className="flex items-center justify-between gap-x-3 py-3 sm:py-4">
          {/* Logo */}
          <button
            onClick={() => navigate("/")}
            className="shrink-0 select-none text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-black via-neutral-700 to-black bg-clip-text text-transparent tracking-tight hover:drop-shadow-md transition duration-300"
            aria-label="Go to home"
          >
            Mentos
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 font-medium">
            <NavLink to="/">
              <span className="py-1">HOME</span>
            </NavLink>
            <NavLink to="/blogs">
              <span className="py-1">BLOGS</span>
            </NavLink>
            <NavLink to="/mentors">
              <span className="py-1">MENTORS</span>
            </NavLink>
            <NavLink to="/about">
              <span className="py-1">ABOUT</span>
            </NavLink>
            <NavLink to="/contact">
              <span className="py-1">CONTACT</span>
            </NavLink>
            <NavLink
              to="https://mentos-admin.onrender.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-transparent text-black px-5 py-2 rounded-full border border-black hover:bg-black hover:text-white transition duration-300 shadow-sm hover:shadow-md"
            >
              ADMIN PANEL
            </NavLink>
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-x-3 sm:gap-x-4 shrink-0">
            {token && userData ? (
              <div className="relative group flex items-center gap-3 cursor-pointer">
                <img
                  className="w-8 h-8 rounded-full object-cover"
                  src={userData.image}
                  alt="profile"
                />
                <img
                  className="w-3"
                  src={assets.dropdown_icon}
                  alt="open menu"
                />
                <div className="absolute top-0 right-0 pt-12 text-base font-medium text-black z-30 hidden group-hover:block">
                  <div className="min-w-48 bg-white rounded-xl shadow-lg border border-gray-200 flex flex-col gap-1 p-2">
                    <button
                      onClick={() => navigate("/my-profile")}
                      className="text-left px-4 py-2 rounded hover:bg-black hover:text-white"
                    >
                      My Profile
                    </button>
                    <button
                      onClick={() => navigate("/my-sessions")}
                      className="text-left px-4 py-2 rounded hover:bg-black hover:text-white"
                    >
                      My Sessions
                    </button>
                    <button
                      onClick={logout}
                      className="text-left px-4 py-2 rounded hover:bg-black hover:text-white"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              // Create account button: visible on ALL breakpoints with responsive sizing
              <button
                onClick={() => navigate("/login")}
                className="bg-black text-white px-4 py-2 sm:px-6 sm:py-2.5 rounded-full font-light text-sm sm:text-base whitespace-nowrap"
              >
                Create account
              </button>
            )}

            {/* Hamburger (mobile only) */}
            <button
              onClick={() => setShowMenu(true)}
              className="md:hidden shrink-0 p-1"
              aria-label="Open menu"
            >
              <img className="w-6 h-6" src={assets.menu_icon} alt="menu" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div
        className={`md:hidden fixed inset-y-0 right-0 z-40 bg-white transition-[width] duration-300 overflow-hidden ${
          showMenu ? "w-full" : "w-0"
        }`}
        aria-hidden={!showMenu}
      >
        <div className="flex items-center justify-between px-5 py-5 border-b border-gray-200">
          <img src={assets.logo} className="w-32" alt="Mentos" />
          <button onClick={() => setShowMenu(false)} aria-label="Close menu">
            <img src={assets.cross_icon} className="w-7 h-7" alt="close" />
          </button>
        </div>

        <nav className="flex flex-col items-center gap-3 mt-5 px-5 text-lg font-medium">
          <NavLink onClick={() => setShowMenu(false)} to="/">
            <p className="py-2">HOME</p>
          </NavLink>
          <NavLink onClick={() => setShowMenu(false)} to="/blogs">
            <p className="py-2">BLOGS</p>
          </NavLink>
          <NavLink onClick={() => setShowMenu(false)} to="/mentors">
            <p className="py-2">MENTORS</p>
          </NavLink>
          <NavLink onClick={() => setShowMenu(false)} to="/about">
            <p className="py-2">ABOUT</p>
          </NavLink>
          <NavLink onClick={() => setShowMenu(false)} to="/contact">
            <p className="py-2">CONTACT</p>
          </NavLink>
          <NavLink
            onClick={() => setShowMenu(false)}
            to="https://mentos-admin.onrender.com"
          >
            <p className="py-2">ADMIN PANEL</p>
          </NavLink>

          {/* Create account inside drawer as well for discoverability */}
          {!token && (
            <button
              onClick={() => {
                setShowMenu(false);
                navigate("/login");
              }}
              className="mt-3 bg-black text-white px-5 py-2.5 rounded-full font-light text-base"
            >
              Create account
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
