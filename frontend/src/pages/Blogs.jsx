import { useContext, useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardBody,
  CardFooter,
  Button,
} from "@material-tailwind/react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";



const AllBlogsPage = () => {

  const { blogs, setBlogs, getBlogs } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    getBlogs();
  }, []);
 
  return (
    <section className="container mx-auto px-6 py-12">
      <Typography variant="h2" color="blue-gray" className="mb-6">
        Our Blogs
      </Typography>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <Card key={blog._id} className="shadow-lg rounded-xl">
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="h-56 w-full object-contain rounded-t-xl"
            />
            <CardBody>
              <Typography variant="h5" color="blue-gray" className="mb-2">
                {blog.title}
              </Typography>
              <Typography className="text-sm text-gray-600">
                {blog.body.length > 120
                  ? blog.body.substring(0, 117) + "..."
                  : blog.body}
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
                onClick={() => navigate(`/blogs/${blog._id}`)}
              >
                {" "}
                
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
