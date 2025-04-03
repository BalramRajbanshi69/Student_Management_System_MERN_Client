

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import StudentloginImage from "../assets/student-login.jpg";
import { motion } from "framer-motion";
import { toast } from "react-toastify";


const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });

    if (name === "password") {
      if (!value.trim()) {
        setErrors({ ...errors, password: "Password is required" });
      } else if (value.length < 6) {
        setErrors({
          ...errors,
          password: "Password must be at least 6 characters",
        });
      } else {
        setErrors({ ...errors, password: "" });
      }
    } else if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!credentials.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(credentials.email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    if (!credentials.password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (credentials.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      const { email, password } = credentials;
      try {
        const response = await fetch(
          "http://localhost:3000/api/auth/loginuser",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          }
        );

        const data = await response.json();
        console.log("form submitted", data);
        if (data?.authToken) {
          localStorage.setItem("token", data.authToken);
          toast.success("Login successful!");
          navigate("/");
        } else if (data?.error) {
          toast.error(data.error);
        } else {
          toast.error("Login failed. Please check your credentials.");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        toast.error("An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    }
  };

  const paperVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };

  const imageVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5, delay: 0.2, ease: "easeInOut" },
    },
  };

  const formVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5, delay: 0.2, ease: "easeInOut" },
    },
  };

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="bg-white rounded-xl overflow-hidden shadow-xl max-w-md w-full md:max-w-2xl"
        variants={paperVariants}
      >
        <div className="md:flex" style={{ minHeight: "inherit" }}>
          {/* Image Side */}
          <motion.div
            className="md:w-1/2 relative"
            style={{ minHeight: "inherit" }}
            variants={imageVariants}
          >
            <img
              src={StudentloginImage}
              alt="Student Login"
              className="w-full h-full object-cover"
              style={{ minHeight: "inherit" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <motion.h2
                className="text-xl font-bold mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6, ease: "easeOut" }}
              >
                Welcome Back!
              </motion.h2>
              <motion.p
                className="text-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.8, ease: "easeOut" }}
              >
                Manage your academic life with ease.
              </motion.p>
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div
            className="md:w-1/2 p-8 space-y-8 flex flex-col justify-center"
            style={{ minHeight: "inherit" }}
            variants={formVariants}
          >
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-1">
                Student Login
              </h2>
              <div className="h-1 w-16 bg-blue-600 rounded-full"></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={credentials.email}
                  onChange={handleChange}
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.email ? "border-red-500" : ""
                  }`}
                  placeholder="Your Email Address"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs italic">{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                      errors.password ? "border-red-500" : ""
                    }`}
                    placeholder="Your Password"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                    <button
                      type="button"
                      className="text-gray-500 focus:outline-none"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs italic">
                    {errors.password}
                  </p>
                )}
              </div>

              <div>
                <motion.button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline shadow-md"
                  disabled={loading}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  {loading ? "Logging In..." : "Login"}
                </motion.button>
              </div>
            </form>

            <p className="mt-6 text-center text-gray-600 text-sm">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-blue-600 hover:text-blue-500 font-medium"
              >
                Sign up
              </Link>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Login;