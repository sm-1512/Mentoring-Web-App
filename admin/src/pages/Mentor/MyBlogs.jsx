import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { MentorContext } from "../../context/MentorContext";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Card,
  Typography,
  Button,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";

const MyBlogs = () => {
  const { backendUrl } = useContext(AppContext);
  const { mToken } = useContext(MentorContext);
  const [blogs, setBlogs] = useState([]);

  const getMyBlogs = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/mentor/my-blogs`, {
        headers: { mToken },
      });
      if (data.success) {
        setBlogs(data.blogs);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Failed to fetch blogs", error);
      toast.error("Something went wrong.");
    }
  };

  useEffect(() => {
    getMyBlogs();
  }, []);

  return (
    <section className="container mx-auto px-6 py-12">
      <Typography variant="h3" color="blue-gray" className="mb-6">
        My Uploaded Blogs
      </Typography>

      {blogs.length === 0 ? (
        <Typography>No blogs uploaded yet.</Typography>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <Card key={blog._id} className="shadow-md rounded-xl">
              <img
                src={blog.coverImage}
                alt={blog.title}
                className="h-56 w-full object-contain rounded-t-xl"
              />
              <CardBody>
                <Typography variant="h5" className="mb-2">
                  {blog.title}
                </Typography>
                <Typography className="text-sm text-gray-700">
                  {blog.body.length > 100
                    ? blog.body.slice(0, 97) + "..."
                    : blog.body}
                </Typography>
              </CardBody>
              <CardFooter className="flex justify-between">
                <Button size="sm" variant="outlined">
                  👍 {blog.likeCount}
                </Button>
                <Button size="sm" variant="outlined">
                  💬 {blog.commentCount}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
};

export default MyBlogs;
