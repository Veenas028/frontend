import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPaths";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const { updateUser } = React.useContext(UserContext);

  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const triggerError = (message) => {
    setError(message);
    setShake(true);
    toast.error(message);
    setTimeout(() => setShake(false), 500); // Reset shake after animation
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const { name, email, password, confirmPassword } = formData;

  if (!name || !email || !password || !confirmPassword) {
    triggerError("All fields are required.");
    return;
  }

  if (!isValidEmail(email)) {
    triggerError("Invalid email address.");
    return;
  }

  if (password.length < 6) {
    triggerError("Password must be at least 6 characters.");
    return;
  }

  if (password !== confirmPassword) {
    triggerError("Passwords do not match.");
    return;
  }

  try {
    const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
      name,
      email,
      password,
      confirmPassword,
    });
    const { token, user } = response.data;

    if (token) {
      localStorage.setItem("token", token);
      updateUser(user);
      navigate("/dashboard");
    }

    setError("");
    toast.success("Account created successfully!");
  } catch (err) {
    console.error("Signup error:", err);
    triggerError(
      err?.response?.data?.message || "Registration failed. Try again."
    );
  }
};

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8fafc]">
      <Toaster position="top-center" reverseOrder={false} />

      <h1 className="text-4xl font-bold mb-6 text-blue-700">Expense Tracker</h1>

      <div
        className={`bg-[#f8fafc] p-8 rounded-lg w-full max-w-md shadow-md ${
          shake ? "animate-shake" : ""
        }`}
      >
        <h2 className="text-2xl font-bold mb-2 text-center">Create an Account</h2>
        <p className="text-sm text-gray-600 mb-6 text-center">
          Join us today by entering your details below.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="John"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {error && (
            <div className="text-red-600 font-medium text-sm">{error}</div>
          )}

          <button
            type="submit"
            className="w-full py-2 px-4 mt-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 cursor-pointer"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
