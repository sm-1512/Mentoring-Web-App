import React from "react";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MySessions from "./pages/MySessions";
import MyProfile from "./pages/MyProfile";
import Footer from "./components/Footer";
import Blogs from "./pages/Blogs";
import Session from "./pages/Session";
import Mentors from "./pages/Mentors";
import { ToastContainer, toast } from "react-toastify";

const App = () => {
  return (
    <div className="mx-4 sm:mx-[10%]">
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/my-sessions" element={<MySessions />} />
        <Route path="/session/:mentorId" element={<Session />} />
        <Route path="/mentors" element={<Mentors />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
