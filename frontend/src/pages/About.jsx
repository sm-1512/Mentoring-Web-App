import React from "react";
import { assets } from "../assets/assets";
import { Card, CardBody, Typography } from "@material-tailwind/react";

const About = () => {
  return (
    <div className="px-4 md:px-10 lg:px-20 text-gray-600">
      {/* Title */}
      <div className="text-center text-2xl pt-10 font-medium text-gray-500">
        <p>
          ABOUT <span className="text-gray-700 font-semibold">US</span>
        </p>
      </div>

      {/* About Section */}
      <div className="my-12 flex flex-col md:flex-row gap-12">
        <img
          className="w-full md:max-w-[360px] object-cover rounded-md"
          src={assets.about_image}
          alt="about"
        />
        <div className="flex flex-col justify-center gap-5 md:w-2/3 text-[15px] leading-relaxed">
          <p>
            Welcome to{" "}
            <span className="text-gray-800 font-semibold">Mentos</span>, your
            trusted college companion built to bridge the gap between students
            and seniors across campuses.
          </p>
          <p>
            We believe that peer guidance can unlock career paths, provide
            clarity, and reduce anxiety in the college journey. That’s why we
            created a space where seniors who've been there and done that can
            share real stories, mentorship, and advice with juniors aiming to
            get placed, crack interviews, or navigate college life.
          </p>
          <p className="font-semibold text-gray-700">Our Vision</p>
          <p>
            To empower students by making peer-to-peer mentorship accessible,
            genuine, and impactful. We envision a collaborative ecosystem where
            learning, sharing, and growing go hand in hand, driven by students
            for students.
          </p>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="text-xl my-6 text-center text-gray-500 font-medium">
        <p>
          WHY <span className="text-gray-700 font-semibold">CHOOSE US</span>
        </p>
      </div>

      <div className="flex flex-col md:flex-row flex-wrap justify-center gap-6 mb-20">
        {/* Card 1 */}
        <Card className="w-full md:w-80 shadow-md px-4 py-6">
          <CardBody className="p-0">
            <Typography
              variant="h6"
              color="blue-gray"
              className="mb-2 text-[17px] font-semibold text-gray-800"
            >
              Real Experiences
            </Typography>
            <Typography className="text-[15px] text-gray-600 leading-relaxed">
              Get guidance straight from seniors who have cracked top MNCs,
              startups, and core companies.
            </Typography>
          </CardBody>
        </Card>

        {/* Card 2 */}
        <Card className="w-full md:w-80 shadow-md px-4 py-6">
          <CardBody className="p-0">
            <Typography
              variant="h6"
              color="blue-gray"
              className="mb-2 text-[17px] font-semibold text-gray-800"
            >
              Personalized Mentorship
            </Typography>
            <Typography className="text-[15px] text-gray-600 leading-relaxed">
              Find mentors from your college, your branch, or even your dream
              company — tailored to your needs.
            </Typography>
          </CardBody>
        </Card>

        {/* Card 3 */}
        <Card className="w-full md:w-80 shadow-md px-4 py-6">
          <CardBody className="p-0">
            <Typography
              variant="h6"
              color="blue-gray"
              className="mb-2 text-[17px] font-semibold text-gray-800"
            >
              Community First
            </Typography>
            <Typography className="text-[15px] text-gray-600 leading-relaxed">
              A safe, inclusive space where sharing knowledge and supporting
              each other is the norm.
            </Typography>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default About;
