import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { NavLink } from "react-router-dom";
import { MentorContext } from "../context/MentorContext";
import { assets } from "../assets/assets";


const Sidebar = () => {
  const { aToken } = useContext(AdminContext);
  return (
    <div className="min-h-screen bg-white border-r">
      {aToken && (
        <ul className="text-[#515151] mt-5">
          <NavLink
            to={"/admin-dashboard"}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-secondary" : ""
              }`
            }
          >
            <img className="min-w-5" src={assets.home_icon} alt="" />
            <p className="hidden md:block">Dashboard</p>
          </NavLink>
          <NavLink
            to={"/all-appointments"}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-secondary" : ""
              }`
            }
          >
            <img className="min-w-5" src={assets.appointment_icon} alt="" />
            <p className="hidden md:block">Appointments</p>
          </NavLink>
          <NavLink
            to={"/add-mentor"}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-secondary" : ""
              }`
            }
          >
            <img className="min-w-5" src={assets.add_icon} alt="" />
            <p className="hidden md:block">Add Mentor</p>
          </NavLink>
          <NavLink
            to={"/mentor-list"}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-secondary" : ""
              }`
            }
          >
            <img className="min-w-5" src={assets.people_icon} alt="" />
            <p className="hidden md:block">Mentors List</p>
          </NavLink>
        </ul>
      )}
    </div>
  );}

export default Sidebar;
