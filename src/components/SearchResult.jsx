import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import studentContext from "../context/StudentContext";
import StudentTable from "../components/StudentTable";
import { motion } from "framer-motion";
import StudentBg from "../assets/student.jpg";
import {
  FaEnvelope,
  FaSchool,
  FaBirthdayCake,
  FaTrashAlt,
  FaEdit,
} from "react-icons/fa";

const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  hover: { scale: 1.03, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" },
  transition: { duration: 0.3 },
};

const SearchResult = () => {
  const { students, getAllStudents, updateStudent, deleteStudent } =
    useContext(studentContext);
  const { searchQuery } = useParams();
  const [menuVisible, setMenuVisible] = useState({});
  const [isCardView, setIsCardView] = useState(true);
  const [editingStudent, setEditingStudent] = useState(null);

  useEffect(() => {
    getAllStudents(searchQuery);
  }, [searchQuery]);

  const handleMenu = (id) => {
    setMenuVisible((prevMenu) => ({
      ...prevMenu,
      [id]: !prevMenu[id],
    }));
  };

  return (
    <div className="pb-8 bg-gray-100 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1400px] mx-auto relative">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 mt-5">
          <div className="flex-grow text-center mb-4 sm:mb-0">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Search Results for "{searchQuery}"
            </h2>
          </div>
        </div>

        {!students || students.length === 0 ? (
          <div className="flex justify-center items-center h-64 text-gray-600">
            <p>No students found matching your search.</p>
          </div>
        ) : isCardView ? (
          <div className="grid grid-cols-1 gap-6 mb-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {students?.map((student) => (
              <motion.div
                key={student._id}
                variants={cardVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                transition="transition"
                className="overflow-hidden bg-white rounded-2xl shadow-md"
              >
                <div className="relative h-32 flex justify-center items-center bg-gradient-to-r from-indigo-500 to-purple-600">
                  <img
                    src={StudentBg}
                    alt="Card Background"
                    className="absolute inset-0 w-full h-full object-cover "
                  />
                  <div className="absolute -bottom-12 w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md">
                    <img
                      className="object-cover w-full h-full"
                      src={
                        student.avatar ||
                        `https://ui-avatars.com/api/?name=${student.name}&size=192&rounded=true`
                      }
                      alt={student.name || "Student Avatar"}
                    />
                  </div>
                </div>

                <div className="p-6 text-gray-800 bg-white mt-14">
                  <div className="flex items-start justify-between">
                    <h5 className="text-xl font-semibold">{student.name}</h5>
                    <div className="relative">
                      <button
                        onClick={() => handleMenu(student._id)}
                        className="text-gray-500 hover:text-gray-700 focus:outline-none"
                      >
                        <span className="text-xl">...</span>
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-gray-600">
                      <FaSchool className="text-blue-500" />
                      <span>{student.course}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <FaBirthdayCake className="text-green-500" />
                      <span>{student.age} years old</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 break-words">
                      <FaEnvelope className="text-indigo-500" />
                      <span>{student.email}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <StudentTable students={students} />
        )}
      </div>
    </div>
  );
};

export default SearchResult;
