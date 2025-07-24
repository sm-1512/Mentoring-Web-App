import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
} from "@material-tailwind/react";

const testimonials = [
  {
    name: "Aarav Mehta",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    role: "Third Year Student, BIT Mesra",
    feedback: "This platform helped me prepare with confidence and structure.",
  },
  {
    name: "Riya Sharma",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    role: "Final Year Student, BIT Mesra",
    feedback: "Insights from seniors directly helped me crack my dream job.",
  },
  {
    name: "Ankit Raj",
    avatar: "https://randomuser.me/api/portraits/men/41.jpg",
    role: "Pre-final Year Student, BIT Mesra",
    feedback: "Connecting with mentors gave me clarity and motivation.",
  },
  {
    name: "Sneha Patel",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    role: "Third Year Student, BIT Mesra",
    feedback: "The mentorship and blogs were extremely valuable!",
  },
  {
    name: "Vikram Singh",
    avatar: "https://randomuser.me/api/portraits/men/33.jpg",
    role: "Final Year Student, BIT Mesra",
    feedback: "Real-life experiences shared by mentors are a goldmine!",
  },
  {
    name: "Neha Verma",
    avatar: "https://randomuser.me/api/portraits/women/58.jpg",
    role: "Second Year Student, BIT Mesra",
    feedback: "Even as a second-year, I feel much more prepared.",
  },
];

const InfiniteTestimonialScroll = () => {
  const containerRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const scrollWidth = container.scrollWidth / 2;

    animationRef.current = gsap.to(container, {
      x: `-=${scrollWidth}`,
      duration: 20, // slightly faster
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % scrollWidth),
      },
    });

    const pause = () => animationRef.current.pause();
    const play = () => animationRef.current.play();

    container.addEventListener("mouseenter", pause);
    container.addEventListener("mouseleave", play);

    return () => {
      container.removeEventListener("mouseenter", pause);
      container.removeEventListener("mouseleave", play);
      animationRef.current.kill();
    };
  }, []);

  const duplicatedTestimonials = [...testimonials, ...testimonials]; // For seamless loop

  return (
    <section className="bg-gray-50 py-16 overflow-hidden">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
        What Our Students Say
      </h2>

      <div className="relative overflow-hidden">
        <div
          ref={containerRef}
          className="flex w-max gap-6 px-4 cursor-grab active:cursor-grabbing select-none"
          style={{ willChange: "transform" }}
        >
          {duplicatedTestimonials.map((testimonial, index) => (
            <Card
              key={index}
              shadow={false}
              className="min-w-[280px] max-w-[280px] bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow"
            >
              <CardHeader
                floated={false}
                shadow={false}
                className="flex items-center gap-4 pt-0 pb-4"
              >
                <Avatar
                  size="lg"
                  variant="circular"
                  src={testimonial.avatar}
                  alt={testimonial.name}
                />
                <div className="flex flex-col">
                  <Typography variant="h6">{testimonial.name}</Typography>
                  <Typography variant="small" className="text-gray-600">
                    {testimonial.role}
                  </Typography>
                </div>
              </CardHeader>
              <CardBody className="p-0 text-sm text-gray-700">
                “{testimonial.feedback}”
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InfiniteTestimonialScroll;
