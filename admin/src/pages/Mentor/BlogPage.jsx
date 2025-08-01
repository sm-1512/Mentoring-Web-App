import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Typography, Card, Button } from "@material-tailwind/react";
import { toast } from "react-toastify";
import { MentorContext } from "../../context/MentorContext";
import { AppContext } from "../../context/AppContext";
import Swal from "sweetalert2";
import { assets } from "../../assets/assets";

const BlogPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const { backendUrl } = useContext(AppContext);
  const { mToken } = useContext(MentorContext);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const [coverImage, setCoverImage] = useState(false);

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

  const updateBlog = async () => {
    try {
        const formData = new FormData();
        formData.append('title', blog.title);
        formData.append('body', blog.body);
        coverImage && formData.append('coverImage', coverImage);
        
        const { data } = await axios.patch(`${backendUrl}/api/mentor/update-blog/${id}`, formData, { headers: { mToken } });
        if (data.success) {
            toast.success(data.message);
            await fetchBlog();
            setIsEditing(false);
            setCoverImage(false);
        } else {
            toast.error(data.message);
        }
        } catch (error) {
        toast.error(error.message);
        console.log(error);
    }
  };

  const deleteBlog = async () => {
    const result = await Swal.fire({
      title: '<span style="font-weight:600;">Delete this blog?</span>',
      html: "This action <strong>cannot be undone</strong>.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
      buttonsStyling: false,
      customClass: {
        confirmButton:
          "bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700",
        cancelButton:
          "bg-gray-300 text-gray-900 px-4 py-2 rounded hover:bg-gray-400",
        popup: "rounded-xl",
      },
    });

    if (result.isConfirmed) {
      try {
        const { data } = await axios.delete(
          `${backendUrl}/api/mentor/delete-blog/${id}`,
          { headers: { mToken } }
        );
        if (data.success) {
          toast.success(data.message);

          navigate("/my-blogs");
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (mToken) {
      fetchBlog();
    }
  }, [mToken]);

  if (!blog) return <div className="text-center py-12">Loading...</div>;

  return (
    <section className="container mx-auto px-6 py-12">
      <Card className="p-6 shadow-lg">
        {isEditing ? (
          <>
            <div className="flex justify-center">
              <label htmlFor="image">
                <div className="inline-block relative cursor-pointer">
                  <img
                    className="w-36 rounded opacity-75"
                    src={coverImage ? URL.createObjectURL(coverImage) : blog.coverImage}
                    alt=""
                  />
                  <img
                    className="w-10 absolute bottom-12 right-12"
                    src={coverImage ? null : assets.upload_icon}
                    alt=""
                  />
                </div>
                <input
                  onChange={(e) => setCoverImage(e.target.files[0])}
                  type="file"
                  id="image"
                  hidden
                />
              </label>
            </div>
            <input
              type="text"
              value={blog.title}
              className="mb-4"
              onChange={(e) => setBlog({ ...blog, title: e.target.value })}
            />

            <textarea
              value={blog.body}
              onChange={(e) => setBlog({ ...blog, body: e.target.value })}
              className="mb-4"
            />

            <div className="flex gap-4 mt-4">
              <Button color="green" onClick={updateBlog}>
                Save
              </Button>
              <Button color="blue-gray" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <>
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
            <div className="flex gap-4 mt-4">
              <Button color="blue" onClick={() => setIsEditing(true)}>
                Edit
              </Button>
              <Button color="red" onClick={deleteBlog}>
                Delete
              </Button>
            </div>
          </>
        )}
      </Card>
    </section>
  );
};

export default BlogPage;
