import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import studentContext from "../context/StudentContext";

const AddStudent = () => {
  const { courses } = useContext(studentContext);
  const apiUrl = import.meta.env.VITE_REACT_API_URL;
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    name: "",
    email: "",
    age: "",
    course: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    age: "",
    course: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "", // Clear error on change
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: "", email: "", age: "", course: "" };

    if (!student.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    } else if (student.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
      isValid = false;
    }

    if (!student.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(student.email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    if (!student.age.trim()) {
      newErrors.age = "Age is required";
      isValid = false;
    } else if (isNaN(student.age) || parseInt(student.age) <= 0) {
      newErrors.age = "Age must be a positive number";
      isValid = false;
    }

    if (!student.course) {
      newErrors.course = "Please select a course";
      isValid = false;
    } else if (!courses.includes(student.course)) {
      newErrors.course = "Please select a valid course from the list";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/students`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({
          name: student.name,
          email: student.email,
          age: parseInt(student.age),
          course: student.course,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data);
        toast.success("Student added successfully!");
        setStudent({ name: "", email: "", age: "", course: "" });
        setErrors({ name: "", email: "", age: "", course: "" });
        navigate("/students");
      } else {
        toast.error(data?.errors?.[0]?.msg || "Failed to add student");
        console.error("Failed to add student:", data);
        if (data?.errors) {
          const newBackendErrors = {};
          data.errors.forEach((err) => {
            newBackendErrors[err.path] = err.msg;
          });
          setErrors((prevErrors) => ({ ...prevErrors, ...newBackendErrors }));
        }
      }
    } catch (error) {
      toast.error(error.message || "Failed to add student");
      console.error("Error adding student:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen py-20 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-indigo-900 dark:via-purple-900 dark:to-pink-900 flex justify-center items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-8 w-full max-w-md"
        variants={{
          hidden: { opacity: 0, y: -20 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 text-center">
          Add New Student
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={student.name}
              onChange={handleChange}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline ${
                errors.name ? "border-red-500" : ""
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-xs italic">{errors.name}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={student.email}
              onChange={handleChange}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline ${
                errors.email ? "border-red-500" : ""
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs italic">{errors.email}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="age"
              className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
            >
              Age
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={student.age}
              onChange={handleChange}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline ${
                errors.age ? "border-red-500" : ""
              }`}
            />
            {errors.age && (
              <p className="text-red-500 text-xs italic">{errors.age}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="course"
              className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
            >
              Course
            </label>
            <select
              id="course"
              name="course"
              value={student.course}
              onChange={handleChange}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline ${
                errors.course ? "border-red-500" : ""
              }`}
            >
              <option value="">Select a course</option>
              {courses.map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>
            {errors.course && (
              <p className="text-red-500 text-xs italic">{errors.course}</p>
            )}
          </div>
          <button
            type="submit"
            className={`w-full py-2 px-4 font-semibold rounded shadow-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 ${
              loading ? "cursor-not-allowed opacity-50" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Student"}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default AddStudent;
