import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import axios from "axios";

function SignUp(onLogin) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
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
      toast.success("SignUp successful!");
      onLogin();
      navigate("/");
    } catch (error) {
      toast.error("Something went wrong!");
      if (error.response) {
        if (error.response.status === 400) {
          setErrorMessage("Email already exists. Please log in.");
        } else {
          setErrorMessage("An error occurred. Please try again.");
        }
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
      console.error(error);
    }
  };

  return (
    <div>
      <div className="w-full min-h-screen bg-[#232232] text-white">
        <div>
          <Toaster richColors position="top-center" />
        </div>
        <div className="flex justify-start items-center gap-2 md:gap-4 p-6 absolute">
          <button className="bg-red-500 fill-slate-200 rounded-full p-2 hover:scale-110 transition duration-300 ease-in-out">
            <svg
              width={window.innerWidth > 768 ? "24" : "14"}
              height={window.innerWidth > 768 ? "24" : "14"}
              viewBox="0 0 24 24"
            >
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
            </svg>
          </button>
          <h1 className="font-bold text-2xl md:text-3xl tracking-wide md:tracking-wider whitespace-nowrap">
            Todo App
          </h1>
        </div>
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold tracking-wide">
              Create an account
            </h1>
            <p className="text-gray-400 mt-2">
              Already have an account?{" "}
              <Link to="/login" className="underline">
                Login
              </Link>
            </p>
          </div>
          <div className="w-full px-6 md:px-0 md:max-w-sm mt-8">
            <form>
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
              {errorMessage && (
                <p className="text-red-500 mt-4 text-center">{errorMessage}</p>
              )}
              <button
                onClick={handleSubmit}
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
