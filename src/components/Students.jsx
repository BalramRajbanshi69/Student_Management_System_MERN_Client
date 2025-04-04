import React, { useContext, useState, useEffect } from "react";
import studentContext from "../context/StudentContext";
import { PiDotsThreeOutlineBold } from "react-icons/pi";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import StudentBg from "../assets/student.jpg";
import {
  FaEnvelope,
  FaSchool,
  FaBirthdayCake,
  FaTrashAlt,
  FaEdit,
  FaTh,
  FaListUl,
  FaPlus,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import StudentTable from "./StudentTable";
import EditStudentModal from "./EditStudentModal";
import { toast } from "react-toastify";
import Toast from "../pages/Toast";
import UseAdvancedDeleteConfirmation from "../hooks/UseAdvancedDeleteConfirmation";

const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  hover: { scale: 1.03, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" },
  transition: { duration: 0.3 },
};

const Students = () => {
  const { students, getAllStudents, updateStudent, deleteStudent } =
    useContext(studentContext);
  const [menuVisible, setMenuVisible] = useState({});
  const [isCardView, setIsCardView] = useState(true);
  const [editingStudent, setEditingStudent] = useState(null);
  const navigate = useNavigate();
  const params = useParams();
  const searchQuery = params.searchQuery;

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10); 

  const handleDeleteWithToast = UseAdvancedDeleteConfirmation(
    deleteStudent,
    "Student deleted successfully!",
    "Failed to delete student."
  );

  useEffect(() => {
    fetchStudents();
  }, [searchQuery, currentPage, limit]); 

  const fetchStudents = async () => {
    try {
      const response = await getAllStudents(searchQuery, currentPage, limit);
      if (response) {
        setTotalPages(response.totalPages);
      }
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleMenu = (id) => {
    setMenuVisible((prevMenu) => ({
      ...prevMenu,
      [id]: !prevMenu[id],
    }));
  };

  const handleDelete = (id) => {
    handleDeleteWithToast(id, "student");
  };

  const goToAddStudent = () => {
    navigate("/add-students");
  };

  const switchToCardView = () => {
    setIsCardView(true);
  };

  const switchToTableView = () => {
    setIsCardView(false);
  };

  const handleEditClick = (student) => {
    setEditingStudent(student);
  };

  const handleEditSave = async (updatedStudentData) => {
    try {
      await updateStudent(editingStudent._id, updatedStudentData);
      toast.success("Student updated successfully!");
      setEditingStudent(null);
      fetchStudents(); // Re-fetch students after update
    } catch (error) {
      toast.error("Failed to update student.");
      console.error("Error updating student:", error);
    }
  };

  const handleEditClose = () => {
    setEditingStudent(null);
  };

  // Pagination handlers
  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="bg-gray-100 min-h-screen py-16">
      <div className="container mx-auto px-4 md:px-8 lg:px-12 pb-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 mt-5">
          <div className="flex-grow text-center mb-4 sm:mb-0">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Our Brilliant Students
            </h2>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={switchToCardView}
              className={`p-2 rounded-md shadow-sm hover:bg-gray-200 ${
                isCardView ? "bg-indigo-100 text-indigo-600" : "text-gray-500"
              }`}
              title="View Student Cards"
            >
              <FaTh className="h-5 w-5" />
            </button>
            <button
              onClick={switchToTableView}
              className={`p-2 rounded-md shadow-sm hover:bg-gray-200 ${
                !isCardView ? "bg-indigo-100 text-indigo-600" : "text-gray-500"
              }`}
              title="View Student Table"
            >
              <FaListUl className="h-5 w-5" />
            </button>
            <button
              onClick={goToAddStudent}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md shadow-md py-2 px-4 text-sm flex items-center space-x-2"
            >
              <FaPlus className="h-4 w-4" />
              <span className="hidden sm:inline">Add Students</span>{" "}
              {/* Hide text on very small screens */}
            </button>
          </div>
        </div>

        {!students || students.length === 0 ? (
          <div className="flex justify-center items-center h-64 text-gray-600">
            <p>No students available at the moment.</p>
          </div>
        ) : isCardView ? (
          <>
            <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
                          <span className="text-xl cursor-pointer">
                            <PiDotsThreeOutlineBold size={16} />
                          </span>
                        </button>
                        {menuVisible[student._id] && (
                          <div className="absolute right-0 mt-2 bg-white border rounded-md shadow-lg w-24 z-10">
                            <button
                              onClick={() => handleEditClick(student)}
                              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm"
                            >
                              <div className="flex items-center gap-2">
                                <FaEdit className="text-blue-500" />
                                <span>Edit</span>
                              </div>
                            </button>
                            <button
                              onClick={() => handleDelete(student._id)}
                              className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 text-sm"
                            >
                              <div className="flex items-center gap-2">
                                <FaTrashAlt className="text-red-500" />
                                <span>Delete</span>
                              </div>
                            </button>
                          </div>
                        )}
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
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-6">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 rounded-l"
                >
                  <FaChevronLeft className="inline-block mr-1" /> Prev
                </button>
                {pageNumbers.map((number) => (
                  <button
                    key={number}
                    onClick={() => goToPage(number)}
                    className={`py-2 px-4 text-gray-800 font-semibold ${
                      currentPage === number
                        ? "bg-indigo-500 text-white"
                        : "bg-white hover:bg-gray-100"
                    }`}
                  >
                    {number}
                  </button>
                ))}
                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 rounded-r"
                >
                  Next <FaChevronRight className="inline-block ml-1" />
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            <StudentTable
              students={students}
              handleDelete={handleDelete}
              handleEdit={handleEditClick}
              currentPage={currentPage} 
              limit={limit} 
            />
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-6">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 rounded-l"
                >
                  <FaChevronLeft className="inline-block mr-1" /> Prev
                </button>
                {pageNumbers.map((number) => (
                  <button
                    key={number}
                    onClick={() => goToPage(number)}
                    className={`py-2 px-4 text-gray-800 font-semibold ${
                      currentPage === number
                        ? "bg-indigo-500 text-white"
                        : "bg-white hover:bg-gray-100"
                    }`}
                  >
                    {number}
                  </button>
                ))}
                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 rounded-r"
                >
                  Next <FaChevronRight className="inline-block ml-1" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
      <EditStudentModal
        open={editingStudent !== null}
        onClose={handleEditClose}
        student={editingStudent}
        onSave={handleEditSave}
      />
      <Toast
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Students;
