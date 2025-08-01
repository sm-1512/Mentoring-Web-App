import React, { useContext, useState } from "react";
import { MentorContext } from "../../context/MentorContext";
import { toast } from "react-toastify";
import axios from "axios";
import { assets } from "../../assets/assets.js";


const AddBlogs = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [loading, setLoading] = useState(false); // For loading state

  const { mToken, backendUrl } = useContext(MentorContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!coverImage) {
      return toast.error("Please select a cover image.");
    }
    setLoading(true);

    const formData = new FormData();
    formData.append("coverImage", coverImage);
    formData.append("title", title);
    formData.append("body", body);

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/mentor/add-blogs`,
        formData,
        { headers: { mToken } }
      );

      if (data.success) {
        toast.success(data.message);
        // Reset form
        setCoverImage(null);
        setTitle("");
        setBody("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 w-full min-h-screen bg-gray-100">
      <form onSubmit={onSubmitHandler} className="max-w-4xl mx-auto">
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 border-b pb-4">
            Create a New Blog Post ✍️
          </h1>

          <div className="space-y-8">
            {/* --- Cover Image Upload --- */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cover Image
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  {coverImage ? (
                    <img
                      src={URL.createObjectURL(coverImage)}
                      alt="Cover Preview"
                      className="mx-auto h-48 w-auto rounded-md object-cover"
                    />
                  ) : (
                    <img
                      src={assets.upload_arrow}
                      alt="Upload Icon"
                      className="mx-auto h-12 w-12 text-gray-400"
                    />
                  )}

                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="cover-img"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        onChange={(e) => setCoverImage(e.target.files[0])}
                        id="cover-img"
                        name="cover-img"
                        type="file"
                        accept="image/*"
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>

            {/* --- Blog Title --- */}
            <div>
              <label
                htmlFor="blog-title"
                className="block text-xl font-medium text-gray-700 mb-5"
              >
                Blog Title
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                id="blog-title"
                className="block w-full shadow-sm sm:text-lg border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g., How to Master React in 30 Days"
                required
              />
            </div>

            {/* --- Blog Body --- */}
            <div>
              <label
                htmlFor="blog-body"
                className="block text-xl font-medium text-gray-700 mb-2"
              >
                Blog Content
              </label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                id="blog-body"
                rows={15}
                className="block w-full shadow-sm sm:text-lg border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Write your amazing blog content here..."
                required
              />
            </div>

            {/* --- Submit Button --- */}
            <div className="pt-5">
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto inline-flex justify-center py-3 px-8 border border-transparent shadow-sm text-sm font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? "Publishing..." : "Publish Blog"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddBlogs;
