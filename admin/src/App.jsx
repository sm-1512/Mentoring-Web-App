import React, { useContext } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // <-- Make sure this is imported!
import { AdminContext } from "./context/AdminContext";
import { MentorContext } from "./context/MentorContext";
import { Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Admin/Dashboard";
import AllAppointments from "./pages/Admin/AllAppointments";
import AddMentor from "./pages/Admin/AddMentor";
import MentorsList from "./pages/Admin/MentorsList";
import Login from "./pages/Login";
import MentorAppointments from "./pages/Mentor/MentorAppointments";
import MentorDashboard from "./pages/Mentor/MentorDashboard";
import MentorProfile from "./pages/Mentor/MentorProfile";
import AddBlogs from "./pages/Mentor/AddBlogs";

const App = () => {
  const { aToken } = useContext(AdminContext);
  const { mToken } = useContext(MentorContext);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      {aToken || mToken ? (
        <div className="bg-[#F8F9FD]">
          <Navbar />
          <div className="flex items-start">
            <Sidebar />
            <Routes>
              {/* Admin Routes */}
              <Route path="/admin-dashboard" element={<Dashboard />} />
              <Route path="/all-appointments" element={<AllAppointments />} />
              <Route path="/add-mentor" element={<AddMentor />} />
              <Route path="/mentor-list" element={<MentorsList />} />

              {/* Mentor Routes */}
              <Route path="/mentor-dashboard" element={<MentorDashboard />} />
              <Route path="/mentor-appointments" element={<MentorAppointments />}/>
              <Route path="/mentor-profile" element={<MentorProfile />} />
              <Route path="/add-blogs" element={<AddBlogs />} />
            </Routes>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
};

export default App;
