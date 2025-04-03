
import React from "react";
import { motion } from "framer-motion";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material"; // Keeping icons for familiarity, but not using Material UI table

const StudentTable = ({ students, handleDelete, handleEdit }) => {
  return (
    <motion.div
      className="overflow-x-auto shadow-md sm:rounded-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xm text-gray-900 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3 font-bold">
              ID
            </th>
            <th scope="col" className="px-6 py-3 font-bold">
              Name
            </th>
            <th scope="col" className="px-6 py-3 font-bold">
              Email
            </th>
            <th scope="col" className="px-6 py-3 font-bold text-right">
              Age
            </th>
            <th scope="col" className="px-6 py-3 font-bold">
              Course
            </th>
            <th scope="col" className="px-6 py-3 font-bold text-right">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <motion.tr
              key={student._id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {index + 1}
              </th>

              <td className="px-6 py-4 text-gray-800 dark:text-gray-300">
                {student.name}
              </td>
              <td className="px-6 py-4 text-gray-800 dark:text-gray-300">
                {student.email}
              </td>
              <td className="px-6 py-4 text-right text-gray-800 dark:text-gray-300">
                {student.age}
              </td>
              <td className="px-6 py-4 text-gray-800 dark:text-gray-300">
                {student.course}
              </td>
              <td className="px-6 py-4 text-right">
                <motion.button
                  onClick={() => handleEdit(student)}
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-2"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <EditIcon className="inline-block align-middle cursor-pointer" />
                  <span className="ml-1"></span>
                </motion.button>
                <motion.button
                  onClick={() => handleDelete(student._id)}
                  className="font-medium text-red-600 dark:text-red-500 hover:underline"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <DeleteIcon className="inline-block align-middle cursor-pointer" />
                  <span className="ml-1"></span>
                </motion.button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default StudentTable;
