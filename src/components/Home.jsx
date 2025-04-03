
import React, { useContext } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import studentContext from "../context/StudentContext";
import {
  FaUsers,
  FaBookOpen,
  FaChartLine,
  FaGraduationCap,
  FaUserFriends,
  FaBook,
  FaCalendarAlt,
  FaPlusCircle,
} from "react-icons/fa";

const Home = () => {
  const { students } = useContext(studentContext);

  // Get unique courses
  const uniqueCourses = new Set(students.map((student) => student.course));

  const headerVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeInOut" },
  };

  const cardVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.3, ease: "easeOut" },
    hover: { scale: 1.03, boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" },
  };

  return (
    <>
      <section
        id="home"
        className="bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:bg-gradient-to-br dark:from-indigo-900 dark:via-purple-900 dark:to-pink-900 py-20 md:py-32"
      >
        <div className="container mx-auto px-4 md:px-8 lg:px-12 flex flex-col md:flex-row items-center justify-between">
          {/* Left Half: Text Content */}
          <div className="md:w-1/2 flex flex-col justify-center items-center md:items-start text-center md:text-left mb-10 md:mb-0">
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <span className="text-indigo-600 dark:text-indigo-400">
                EMPOWERING
              </span>{" "}
              FUTURES WITH OUR
            </motion.h1>
            <motion.h2
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            >
              STUDENT{" "}
              <span className="text-purple-600 dark:text-purple-400">
                MANAGEMENT
              </span>{" "}
              SYSTEM
            </motion.h2>
            <motion.p
              className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
            >
              Our innovative Student Management System streamlines
              administrative tasks, enhances communication between students,
              teachers, and parents, and provides powerful tools for academic
              success. Experience a seamless and efficient way to manage your
              educational journey.
            </motion.p>
            <motion.div
              className="flex gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
            >
              <Link to="/about" className="cursor-pointer">
                <motion.button
                  className=" cursor-pointer bg-gradient-to-br from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-md shadow-md hover:shadow-lg py-3 px-6 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 transition duration-300 ease-in-out"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More
                </motion.button>
              </Link>
              <Link to="/students" className="cursor-pointer">
                <motion.button
                  className="cursor-pointer bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 hover:text-white dark:hover:text-white font-semibold rounded-md shadow-md hover:shadow-lg py-3 px-6 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 transition duration-300 ease-in-out border border-indigo-600 dark:border-indigo-400 hover:bg-indigo-600 dark:hover:bg-indigo-600"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started
                </motion.button>
              </Link>
              <Link to="/add-students" className="cursor-pointer">
                <motion.button
                  className=" cursor-pointer bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md shadow-md hover:shadow-lg py-3 px-6 text-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 transition duration-300 ease-in-out flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaPlusCircle className="text-lg" /> Add Student
                </motion.button>
              </Link>
            </motion.div>
          </div>

          {/* Right Half: Image */}
          <motion.div
            className="md:w-1/2 flex justify-center items-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            whileHover={{ scale: 1.05 }}
          >
            <img
              src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
              alt="Student Management System Interface"
              className="rounded-lg shadow-xl max-w-full h-auto object-cover"
              style={{ maxHeight: "530px" }}
            />
          </motion.div>
        </div>

        {/* Analytics Section wrapped in a Big Card */}
        <motion.div
          className="container mx-auto px-4 md:px-8 lg:px-12 mt-20 flex justify-center"
          variants={headerVariants}
          initial="initial"
          animate="animate"
          transition="transition"
        >
          <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-lg shadow-lg p-8 w-full">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Current Statistics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div
                variants={cardVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                transition="transition"
                className="bg-indigo-100 dark:bg-indigo-900 rounded-lg shadow border border-gray-100 dark:border-gray-700 p-4 flex flex-col items-center justify-center"
              >
                <div className="rounded-md bg-indigo-200 dark:bg-indigo-800 p-3 mb-2">
                  <FaUserFriends className="text-indigo-700 dark:text-indigo-300 text-xl" />
                </div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center mb-1">
                  TOTAL STUDENTS
                </p>
                <p className="text-2xl font-bold text-indigo-800 dark:text-indigo-200 text-center">
                  {students.length}
                </p>
              </motion.div>

              <motion.div
                variants={cardVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                transition="transition"
                className="bg-green-100 dark:bg-green-900 rounded-lg shadow border border-gray-100 dark:border-gray-700 p-4 flex flex-col items-center justify-center"
              >
                <div className="rounded-md bg-green-200 dark:bg-green-800 p-3 mb-2">
                  <FaBookOpen className="text-green-700 dark:text-green-300 text-xl" />
                </div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center mb-1">
                  COURSES OFFERED
                </p>
                <p className="text-2xl font-bold text-green-800 dark:text-green-200 text-center">
                  {uniqueCourses.size}
                </p>
              </motion.div>

              <motion.div
                variants={cardVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                transition="transition"
                className="bg-purple-100 dark:bg-purple-900 rounded-lg shadow border border-gray-100 dark:border-gray-700 p-4 flex flex-col items-center justify-center"
              >
                <div className="rounded-md bg-purple-200 dark:bg-purple-800 p-3 mb-2">
                  <FaCalendarAlt className="text-purple-700 dark:text-purple-300 text-xl" />
                </div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center mb-1">
                  AVERAGE AGE
                </p>
                <p className="text-2xl font-bold text-purple-800 dark:text-purple-200 text-center">
                  {students.length
                    ? Math.round(
                        students.reduce(
                          (acc, student) => acc + student.age,
                          0
                        ) / students.length
                      )
                    : 0}
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default Home;