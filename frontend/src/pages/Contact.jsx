import React from "react";
import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div className="min-h-screen px-4 md:px-10 lg:px-20 bg-gray-50">
      {/* Heading */}
      <div className="text-center text-3xl pt-12 text-gray-600 font-medium">
        <p>
          CONTACT <span className="text-gray-800 font-semibold">US</span>
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Have a question, need help, or want to join as a mentor? We are here
          for you!
        </p>
      </div>

      {/* Content */}
      <div className="my-16 flex flex-col-reverse md:flex-row items-center gap-12">
        {/* Left: Text Content */}
        <div className="flex flex-col justify-center items-start gap-6 text-sm w-full md:w-1/2">
          <p className="font-semibold text-lg text-gray-700">
            OUR PLATFORM SUPPORT
          </p>
          <p className="text-gray-600">
            BIT Mesra, Jharkhand <br />
            India - 835215
          </p>
          <p className="text-gray-600">
            Email:{" "}
            <a
              href="mailto:mentorconnect@bitmesra.ac.in"
              className="text-blue-600"
            >
              mentorconnect@bitmesra.ac.in
            </a>
          </p>
          <p className="text-gray-600">
            Phone:{" "}
            <a href="tel:+918123456789" className="text-blue-600">
              +91 81234 56789
            </a>
          </p>

          <p className="font-semibold text-lg text-gray-700">
            WANT TO BE A MENTOR?
          </p>
          <p className="text-gray-600">
            Help guide students and share your experience. Join our mentor
            network.
          </p>

          <button className="border border-black px-8 py-3 text-sm rounded-full hover:bg-black hover:text-white transition-all duration-300">
            Join as a Mentor
          </button>
        </div>

        {/* Right: Image */}
        <div className="w-full md:w-1/2">
          <img
            className="w-full max-w-md mx-auto object-cover rounded-xl"
            src={assets.contact_image}
            alt="contact support"
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
