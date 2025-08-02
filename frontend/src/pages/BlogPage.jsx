import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Typography, Card } from "@material-tailwind/react";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";

const SingleBlogPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const {backendUrl} = useContext(AppContext);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/user/blogs/${id}`);
        if (data.success) {
          setBlog(data.blog);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to load blog.");
      }
    };

    fetchBlog();
  }, [id]);

  if (!blog) return <div className="text-center py-12">Loading...</div>;

  return (
    <section className="container mx-auto px-6 py-12">
      <Card className="p-6 shadow-lg">
        <img
          src={blog.coverImage}
          alt={blog.title}
          className="w-full max-h-[500px] object-contain rounded-xl mb-6"
        />

        <Typography variant="h3" color="blue-gray" className="mb-4">
          {blog.title}
        </Typography>

        <Typography className="text-md text-gray-700 mb-6 whitespace-pre-wrap leading-relaxed">
          {blog.body}
        </Typography>

        {/*  Mentor Details Section  */}
        <div className="border-t pt-6 mt-8">
          <Typography variant="h5" color="blue-gray" className="mb-4">
            About the Mentor
          </Typography>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <img
              src={blog.createdBy.image}
              alt={blog.createdBy.name}
              className="w-28 h-28 object-cover rounded-full border-2 border-gray-300 bg-white"
            />

            <div>
              <Typography variant="h6" className="text-gray-800">
                {blog.createdBy.name}
              </Typography>
              <Typography className="text-sm text-gray-600">
                📧 {blog.createdBy.email}
              </Typography>
              <Typography className="text-sm text-gray-600">
                🎓 {blog.createdBy.degree} in {blog.createdBy.branch}, Class of{" "}
                {blog.createdBy.graduationYear}
              </Typography>
              <Typography className="text-sm text-gray-600">
                🏢 Currently at {blog.createdBy.currentCompany}
              </Typography>
              <Typography className="text-sm text-gray-600">
                🏫 {blog.createdBy.college}
              </Typography>
              <Typography className="text-sm text-gray-600 mt-2 italic">
                "{blog.createdBy.about}"
              </Typography>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );

};

export default SingleBlogPage;
