import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import studentContext from "../context/StudentContext";

const EditStudentModal = ({ open, onClose, student, onSave }) => {
  const {courses} = useContext(studentContext)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    course: "",
  });

  

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name || "",
        email: student.email || "",
        age: student.age ? student.age.toString() : "",
        course: student.course || "",
      });
    } else {
      setFormData({ name: "", email: "", age: "", course: "" });
    }
  }, [student, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.age.trim() ||
      !formData.course.trim()
    ) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (isNaN(formData.age)) {
      toast.error("Age must be a number.");
      return;
    }
    onSave(formData);
    onClose(); // Close the modal after saving
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  };

  return (
    <motion.div
      className={`fixed inset-0 z-50 overflow-auto bg-gray-900 bg-opacity-50 flex justify-center items-center ${
        open ? "block" : "hidden"
      }`}
      variants={modalVariants}
      initial="hidden"
      animate={open ? "visible" : "hidden"}
      exit="exit"
    >
      <motion.div
        className="bg-white rounded-lg shadow-xl w-full max-w-md p-6"
        variants={{
          hidden: { opacity: 0, y: -20 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-lg font-bold mb-4">Edit Student</h2>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="age"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Age
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        {/* <div className="mb-4">
          <label
            htmlFor="course"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Course
          </label>
          <input
            type="text"
            id="course"
            name="course"
            value={formData.course}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div> */}

        <div className="mb-4">
          <label
            htmlFor="course"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Course
          </label>
          <select
            id="course"
            name="course"
            value={formData.course}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select a course</option>
            {courses &&
              courses.map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
          </select>
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Save
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EditStudentModal;








