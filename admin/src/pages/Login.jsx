import axios from "axios";
import React, { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import { toast } from "react-toastify";
import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi";
import { MentorContext } from "../context/MentorContext";
import {useNavigate} from 'react-router-dom'


const Login = () => {
  const { setAToken, backendUrl } = useContext(AdminContext);
  const {setMToken} = useContext(MentorContext);
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (state === "Admin") {
        const { data } = await axios.post(backendUrl + "/api/admin/login", {
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem("aToken", data.token);
          setAToken(data.token);
          toast.success("You logged in successfully!");
          navigate("/admin-dashboard");
        } else {
          toast.error(data.message || "Login failed");
        }
      } else {
          const { data } = await axios.post(backendUrl + "/api/mentor/login", {
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem("mToken", data.token);
          setMToken(data.token);
          toast.success("You logged in successfully!");
          navigate("/mentor-dashboard");
        } else {
          toast.error(data.message || "Login failed");
        }
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Invalid credentials or server error"
      );
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 px-4"
    >
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold bg-gradient-to-r from-black via-gray-700 to-black bg-clip-text text-transparent">
            {state === "Admin" ? "Admin Login" : "Mentor Login"}
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            Please log in to continue.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">
            Email
          </label>
          <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2 mt-1 bg-white">
            <HiOutlineMail className="text-gray-400 mr-2" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full outline-none bg-transparent"
              placeholder="Enter your email"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">
            Password
          </label>
          <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2 mt-1 bg-white">
            <HiOutlineLockClosed className="text-gray-400 mr-2" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full outline-none bg-transparent"
              placeholder="••••••••"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-900 transition duration-300"
        >
          Login
        </button>

        <p className="text-sm text-center text-gray-500">
          {state === "Admin" ? (
            <>
              Are you a Mentor?{" "}
              <span
                onClick={() => setState("Mentor")}
                className="text-black underline cursor-pointer font-medium"
              >
                Login here
              </span>
            </>
          ) : (
            <>
              Are you an Admin?{" "}
              <span
                onClick={() => setState("Admin")}
                className="text-black underline cursor-pointer font-medium"
              >
                Login here
              </span>
            </>
          )}
        </p>
      </div>
    </form>
  );
};

export default Login;
