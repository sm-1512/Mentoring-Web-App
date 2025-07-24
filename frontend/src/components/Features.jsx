import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

const features = [
  {
    title: "Join Our Community",
    description:
      "Become part of a growing network of students and mentors helping each other succeed.",
    linkText: "Get Started",
    linkUrl: "/login",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-12 w-12 text-blue-600"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 6a3.75 3.75 0 11-7.5 0m7.5 0a3.75 3.75 0 11-7.5 0M4.5 21h15M4.5 21a9 9 0 0115 0"
        />
      </svg>
    ),
  },
  {
    title: "Connect With Mentors",
    description:
      "Get career guidance from mentors already placed at top companies and startups.",
    linkText: "Find Mentors",
    linkUrl: "/mentors",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-12 w-12 text-green-600"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M18 13V9a6 6 0 00-12 0v4m12 0a6 6 0 01-12 0m12 0v2.25a2.25 2.25 0 01-4.5 0V13m-7.5 0V9a6 6 0 0112 0v4"
        />
      </svg>
    ),
  },
  {
    title: "Learn More About Us",
    description:
      "Explore how this platform can boost your confidence and prepare you for placement.",
    linkText: "About Us",
    linkUrl: "/about",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-12 w-12 text-purple-600"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6v6m0 6h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
        />
      </svg>
    ),
  },
];

const WhatWeDo = () => {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
        What We Do
      </h2>
      <div className="flex flex-wrap justify-center gap-10">
        {features.map(
          ({ title, description, icon, linkText, linkUrl }, idx) => (
            <Card
              key={idx}
              className="w-full max-w-xs transition-all duration-300 hover:shadow-xl hover:scale-105"
            >
              <CardBody>
                <div className="mb-4">{icon}</div>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  {title}
                </Typography>
                <Typography>{description}</Typography>
              </CardBody>
              <CardFooter className="pt-0">
                <a href={linkUrl} className="inline-block">
                  <Button
                    size="sm"
                    variant="text"
                    className="flex items-center gap-2"
                  >
                    {linkText}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                      />
                    </svg>
                  </Button>
                </a>
              </CardFooter>
            </Card>
          )
        )}
      </div>
    </section>
  );
};

export default WhatWeDo;
