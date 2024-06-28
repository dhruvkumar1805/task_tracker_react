import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function SignUp() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${backendUrl}/api/users/signup`, {
        fullName,
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (error) {
      console.error(error.response.data);
    }
  };
  return (
    <div>
      <div className="w-full min-h-screen bg-[#232232] text-white">
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-wide">
              Create an account
            </h1>
            <p className="text-gray-400 mt-2">
              Already have an account?{" "}
              <Link to="/login" className="underline">
                Login
              </Link>
            </p>
          </div>
          <div className="w-full max-w-sm mt-8">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col space-y-2">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your full name..."
                  className="rounded-md p-2 bg-slate-200 text-gray-800 outline-none"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                  }}
                />
              </div>
              <div className="flex flex-col space-y-2 mt-4">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Enter your email..."
                  className="rounded-md p-2 bg-slate-200 text-gray-800 outline-none"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className="flex flex-col space-y-2 mt-4">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Enter your password..."
                  className="rounded-md p-2 bg-slate-200 text-gray-800 outline-none"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-red-500 hover:bg-red-400 transition duration-300 ease-in-out rounded-md p-2 mt-6"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
