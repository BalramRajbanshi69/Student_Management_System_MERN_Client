import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import studentRegisterImage from "../assets/student-register.jpg";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });

    // Real-time validation for password and confirm password
    if (name === "password") {
      if (!value.trim()) {
        setErrors({ ...errors, password: "Password is required" });
      } else if (value.length < 8) {
        setErrors({
          ...errors,
          password: "Password must be at least 8 characters long",
        });
      } else if (credentials.cpassword && value !== credentials.cpassword) {
        setErrors({ ...errors, cpassword: "Passwords do not match" });
      } else if (
        credentials.cpassword &&
        value === credentials.cpassword &&
        errors.cpassword
      ) {
        setErrors({ ...errors, cpassword: "" });
      } else if (!errors.password) {
        setErrors({ ...errors, password: "" });
      }
    } else if (name === "cpassword") {
      if (!value.trim()) {
        setErrors({ ...errors, cpassword: "Confirm password is required" });
      } else if (credentials.password !== value) {
        setErrors({ ...errors, cpassword: "Passwords do not match" });
      } else {
        setErrors({ ...errors, cpassword: "" });
      }
    } else if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (credentials.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters long";
    }
    if (!credentials.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(credentials.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!credentials.password.trim()) {
      newErrors.password = "Password is required";
    } else if (credentials.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }
    if (!credentials.cpassword.trim()) {
      newErrors.cpassword = "Confirm password is required";
    } else if (credentials.password !== credentials.cpassword) {
      newErrors.cpassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      const { name, email, password } = credentials;
      try {
        const response = await fetch(
          "https://student-management-system-mern-server.onrender.com/api/auth/registeruser",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password }),
          }
        );

        const data = await response.json();
        console.log("form submitted", data);
        if (data?.authToken) {
          localStorage.setItem("token", data.authToken);
          toast.success("Registration successful! Please log in.");
          navigate("/login");
        } else if (data?.error) {
          toast.error(data.error);
        } else {
          toast.error("Registration failed. Please try again.");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        toast.error("An unexpected error occurred during registration.");
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
      className="bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 mt-10" // Added mt-16 for margin from top
      style={{ minHeight: "calc(100vh - 4rem)" }} // Adjusted minHeight
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="bg-white rounded-xl overflow-hidden shadow-xl max-w-md w-full md:max-w-2xl"
        variants={paperVariants}
      >
        <div className="md:flex" style={{ minHeight: "inherit" }}>
          {/* Image Side */}
          <motion.div className="md:w-1/2 relative" variants={imageVariants}>
            <img
              src={studentRegisterImage}
              alt="Student Registration"
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
                Create Your Account
              </motion.h2>
              <motion.p
                className="text-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.8, ease: "easeOut" }}
              >
                Join our student management system today!
              </motion.p>
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div
            className="md:w-1/2 p-8 space-y-6 flex flex-col justify-center"
            style={{ minHeight: "inherit" }}
            variants={formVariants}
          >
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-1">
                Registration
              </h2>
              <div className="h-1 w-16 bg-blue-600 rounded-full"></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={credentials.name}
                  onChange={handleChange}
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.name ? "border-red-500" : ""
                  }`}
                  placeholder="Your Full Name"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs italic">{errors.name}</p>
                )}
              </div>

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
                <label
                  htmlFor="cpassword"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="cpassword"
                    name="cpassword"
                    value={credentials.cpassword}
                    onChange={handleChange}
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                      errors.cpassword ? "border-red-500" : ""
                    }`}
                    placeholder="Confirm Your Password"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                    <button
                      type="button"
                      className="text-gray-500 focus:outline-none"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
                {errors.cpassword && (
                  <p className="text-red-500 text-xs italic">
                    {errors.cpassword}
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
                  {loading ? "Signing Up..." : "Sign Up"}
                </motion.button>
              </div>
            </form>

            <p className="mt-6 text-center text-gray-600 text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 hover:text-blue-500 font-medium"
              >
                Login
              </Link>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Register;
