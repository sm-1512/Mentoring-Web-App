import React, { use } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Banner = () => {
    const navigate = useNavigate();
  return (
    <section className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-[#141E30] to-[#243B55] rounded-2xl px-6 md:px-10 lg:px-20 py-12 overflow-hidden shadow-md mt-12">
      {/* --------- Left Section --------- */}
      <div className="md:w-1/2 flex flex-col justify-center gap-6 text-white text-center md:text-left">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
          What Are You Waiting For?
        </h2>
        <p className="text-sm md:text-base font-light leading-relaxed">
          Join a thriving community of over{" "}
          <span className="font-semibold text-yellow-300">1,000 students</span>{" "}
          who are leveling up their careers through mentorship, guidance, and
          real-world experiences.
        </p>

        <button
          onClick={() => navigate("/login")}
          className="mx-auto md:mx-0 bg-white text-[#141E30] px-8 py-3 rounded-full text-sm font-medium hover:scale-105 transition-all duration-300 w-fit"
        >
          Join the Community
        </button>
      </div>

      {/* --------- Right Section --------- */}
      <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center items-center">
        <img
          src={assets.JoinNow}
          alt="Community of users"
          className="max-w-full max-h-[400px] object-contain rounded-xl"
        />
      </div>
    </section>
  );
};

export default Banner;
