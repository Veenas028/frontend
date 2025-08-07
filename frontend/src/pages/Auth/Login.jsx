import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import clsx from "clsx"; // Optional: for cleaner class toggling (install with `npm i clsx`)
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPaths";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [shake, setShake] = useState(false);
  const navigate = useNavigate();
  const { updateUser } = React.useContext(UserContext);

  const validateEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  const handleLogin = async (e) => {
  e.preventDefault();

  if (!validateEmail(email)) {
    toast.error("Invalid email format");
    triggerShake();
    return;
  }

  if (!password) {
    toast.error("Password cannot be empty");
    triggerShake();
    return;
  }

  try {
    const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
      email,
      password,
    });
    const { token, user } = response.data;

    if (token) {
      localStorage.setItem("token", token);
      updateUser(user); // Update user context
      toast.success("Login successful!");
      // Redirect to dashboard or home page
      navigate("/dashboard");
    }
  } catch (error) {
    console.error("Login error:", error);
    toast.error("Login failed. Please try again.");
    triggerShake();
    return; // Don't call success toast if there's an error
  }

 
  console.log({ email, password });
};


  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500); // Shake duration
  };
  
 

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <Toaster position="top-center" reverseOrder={false} />

       <h1 className="text-4xl font-bold mb-6 text-blue-700">Expense Tracker</h1>


      {/* Card */}
      <div
        className={clsx(
          "w-full max-w-md mt-16 p-8 border border-gray-200 rounded-2xl shadow-lg transition-transform duration-300",
          { "animate-shake": shake }
        )}
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-2">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Please enter your details to login
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold transition hover:bg-blue-700 hover:cursor-pointer"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
