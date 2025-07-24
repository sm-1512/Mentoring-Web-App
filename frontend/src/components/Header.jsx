import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="flex flex-col md:flex-row flex-wrap bg-gradient-to-r from-[#243B55] to-[#141E30] rounded-2xl px-6 md:px-10 lg:px-20 py-12 overflow-hidden shadow-md">
      {/* --------- Left Section --------- */}
      <div className="md:w-1/2 flex flex-col justify-center gap-6 text-white">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
          Learn from Those Who Have Been There
        </h1>
        <p className="text-sm md:text-base font-light leading-relaxed">
          Connect with mentors from top colleges and companies. Ask questions,
          get career guidance, and explore real interview experiences.
        </p>

        <div className="flex flex-col md:flex-row items-center gap-3 text-sm font-light">
          <img
            className="w-24"
            src={assets.group_profiles}
            alt="Mentor group"
          />
          <p>
            Join hundreds of students already building their future with Mentos.
          </p>
        </div>

        <button
          onClick={() => navigate("/mentors")}
          className="flex items-center gap-2 bg-white text-[#141E30] px-8 py-3 rounded-full text-sm font-medium hover:scale-105 transition-all duration-300 w-fit"
        >
          Find a Mentor
          <img className="w-3" src={assets.arrow_icon} alt="arrow icon" />
        </button>
      </div>

      {/* --------- Right Section --------- */}
      <div className="md:w-1/2 flex justify-center items-center mt-10 md:mt-0">
        <img
          src={assets.header_img}
          alt="Mentor and student illustration"
          className="max-w-full max-h-[450px] object-contain rounded-xl"
        />
      </div>
    </header>
  );
};

export default Header;
