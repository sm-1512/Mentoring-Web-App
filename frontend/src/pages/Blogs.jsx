import { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardBody,
  CardFooter,
  Button,
} from "@material-tailwind/react";

// Replace with API fetch later
const fetchAllBlogs = async () => {
  return [
    {
      _id: "1",
      title: "The Rise of Decentralized AI",
      desc: "Exploring how decentralized AI systems are changing modern tech infrastructure.",
      img: "https://source.unsplash.com/800x600/?ai,technology",
      likeCount: 12,
      commentCount: 5,
    },
    {
      _id: "2",
      title: "Sustainable Engineering Practices",
      desc: "A guide to eco-conscious coding, deployment, and architectural decisions.",
      img: "https://source.unsplash.com/800x600/?environment,technology",
      likeCount: 8,
      commentCount: 2,
    },
    {
      _id: "3",
      title: "Optimizing React Performance",
      desc: "Advanced tips for reducing re-renders, memoization, and code splitting.",
      img: "https://source.unsplash.com/800x600/?reactjs,code",
      likeCount: 18,
      commentCount: 9,
    },
  ];
};

const AllBlogsPage = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchAllBlogs().then(setBlogs);
  }, []);

  return (
    <section className="container mx-auto px-6 py-12">
      <Typography variant="h2" color="blue-gray" className="mb-6">
        Read About Their Experiences
      </Typography>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <Card key={blog._id} className="shadow-lg rounded-xl">
            <img
              src={blog.img}
              alt={blog.title}
              className="h-56 w-full object-cover rounded-t-xl"
            />
            <CardBody>
              <Typography variant="h5" color="blue-gray" className="mb-2">
                {blog.title}
              </Typography>
              <Typography className="text-sm text-gray-600">
                {blog.desc.length > 120
                  ? blog.desc.substring(0, 117) + "..."
                  : blog.desc}
              </Typography>
            </CardBody>
            <CardFooter className="flex justify-between px-6 py-3 border-t">
              <Button size="sm" variant="text">
                👍 {blog.likeCount}
              </Button>
              <Button size="sm" variant="text">
                💬 {blog.commentCount}
              </Button>
              <Button
                size="sm"
                color="blue"
                onClick={() => alert(`Go to blog ${blog._id}`)}
              >
                Read More
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default AllBlogsPage;
