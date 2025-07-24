import InfiniteScroll from "../utils/InfiniteScroll";
import { assets } from "../assets/assets";

const items = [
  {
    content: (
      <img
        src={assets.Atlassian}
        alt="Atlassian"
        className="h-16 object-contain"
      />
    ),
  },
  {
    content: (
      <img src={assets.Cisco} alt="Cisco" className="h-16 object-contain" />
    ),
  },
  {
    content: (
      <img
        src={assets.Microsoft}
        alt="Microsoft"
        className="h-16 object-contain"
      />
    ),
  },
  {
    content: (
      <img src={assets.Nvidia} alt="Nvidia" className="h-16 object-contain" />
    ),
  },
  {
    content: (
      <img src={assets.Airtel} alt="Airtel" className="h-16 object-contain" />
    ),
  },
  {
    content: (
      <img src={assets.Apple} alt="Apple" className="h-16 object-contain" />
    ),
  },
  {
    content: <img src={assets.Amd} alt="AMD" className="h-16 object-contain" />,
  },
  {
    content: (
      <img src={assets.OpenAI} alt="OpenAI" className="h-16 object-contain" />
    ),
  },
  {
    content: <img src={assets.IBM} alt="IBM" className="h-16 object-contain" />,
  },
  {
    content: (
      <img src={assets.Samsung} alt="Samsung" className="h-16 object-contain" />
    ),
  },
];

const Middle = () => {
  return (
    <div className="w-full py-10">
      <p className="text-center text-2xl md:text-3xl font-bold mb-6 text-gray-800">
        Our Mentors are Placed at Top Companies and StartUps
      </p>

      <InfiniteScroll
        items={items}
        isTilted={false}
        tiltDirection="up"
        autoplay={true}
        autoplaySpeed={1.5}
        autoplayDirection="left"
        pauseOnHover={false}
        negativeMargin="-50px"
      />
    </div>
  );
};

export default Middle;
