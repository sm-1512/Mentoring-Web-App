import React, { useState } from "react";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";

const Login = () => {
  const [state, setState] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    // Handle login/signup here
  };

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
        )}

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
