import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        {/* Left Section */}
        <div>
          <img className="mb-5 w-40" src={assets.logo} alt="Mentos Logo" />
          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            Mentos is a peer-to-peer mentorship platform helping students
            connect with seniors from top colleges and companies for career
            guidance, real interview experiences, and personal support.
          </p>
        </div>

        {/* Middle Section */}
        <div>
          <p className="text-xl font-medium mb-5">QUICK LINKS</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about">About Us</a>
            </li>
            <li>
              <a href="/mentors">Find Mentors</a>
            </li>
            <li>
              <a href="/faq">FAQ</a>
            </li>
            <li>
              <a href="/privacy-policy">Privacy Policy</a>
            </li>
          </ul>
        </div>

        {/* Right Section */}
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>📞 +91-9876543210</li>
            <li>✉️ support@mentos.in</li>
            <li>📍 BIT Mesra, Ranchi</li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div>
        <hr />
        <p className="py-5 text-sm text-center text-gray-500">
          © 2025 Mentos.in — All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
