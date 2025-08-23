import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { backendUrl, token, setToken } = useContext(AppContext);
  const [state, setState] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [graduationYear, setGraduationYear] = useState("");
  const [currentYear, setCurrentYear] = useState("");
  const [branch, setBranch] = useState("");
  const [degree, setDegree] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (state === "Sign Up") {
        const { data } = await axios.post(backendUrl + "/api/user/register", {
          name,
          password,
          email,
          graduationYear,
          currentYear,
          branch,
          degree,
        });

        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(data.messagge);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    setEmail(""),
      setPassword(""),
      setName(""),
      setGraduationYear(""),
      setCurrentYear(""),
      setBranch(""),
      setDegree("");
  }, [state, setState]);
  return (
    <form
      onSubmit={onSubmitHandler}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 px-4"
    >
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold bg-gradient-to-r from-black via-gray-700 to-black bg-clip-text text-transparent">
            {state === "Sign Up" ? "Create Account" : "Welcome Back"}
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            Please {state === "Sign Up" ? "sign up" : "log in"} to continue.
          </p>
        </div>

        {state === "Sign Up" && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Full Name
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2 mt-1 bg-white">
                <FaUser className="text-gray-400 mr-2" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full outline-none bg-transparent"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">
                Email
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2 mt-1 bg-white">
                <FaEnvelope className="text-gray-400 mr-2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full outline-none bg-transparent"
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">
                Password
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2 mt-1 bg-white">
                <FaLock className="text-gray-400 mr-2" />
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

            <div>
              <label className="block text-sm font-medium text-gray-600">
                Graduation Year
              </label>
              <input
                type="text"
                value={graduationYear}
                onChange={(e) => setGraduationYear(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 bg-white outline-none"
                placeholder="e.g., 2026"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">
                Current Year
              </label>
              <select
                value={currentYear}
                onChange={(e) => setCurrentYear(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 bg-white outline-none"
              >
                <option
                  value=""
                  disabled
                  selected
                  hidden
                  className=" text-gray-600"
                >
                  Select an option 
                </option>
                <option>1st Year</option>
                <option>2nd Year</option>
                <option>3rd Year</option>
                <option>4th Year</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">
                Branch
              </label>
              <input
                type="text"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 bg-white outline-none"
                placeholder="e.g., CSE"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">
                Degree
              </label>
              <input
                type="text"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 bg-white outline-none"
                placeholder="e.g., B.Tech"
              />
            </div>
          </>
        )}

        {state === "Login" && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Email
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2 mt-1 bg-white">
                <FaEnvelope className="text-gray-400 mr-2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full outline-none bg-transparent"
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">
                Password
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2 mt-1 bg-white">
                <FaLock className="text-gray-400 mr-2" />
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
          </>
        )}

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-900 transition duration-300"
        >
          {state === "Sign Up" ? "Create Account" : "Log In"}
        </button>

        <p className="text-sm text-center text-gray-500">
          {state === "Sign Up" ? (
            <>
              Already have an account?{" "}
              <span
                onClick={() => setState("Login")}
                className="text-black underline cursor-pointer font-medium"
              >
                Log In
              </span>
            </>
          ) : (
            <>
              New here?{" "}
              <span
                onClick={() => setState("Sign Up")}
                className="text-black underline cursor-pointer font-medium"
              >
                Create an Account
              </span>
            </>
          )}
        </p>
      </div>
    </form>
  );
};

export default Login;
