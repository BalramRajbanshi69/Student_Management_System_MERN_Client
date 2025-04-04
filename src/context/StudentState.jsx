import React, { useState } from "react";
import studentContext from "./StudentContext";

const StudentState = ({ children }) => {
  const [students, setStudents] = useState([]); // Initialize as empty array
  const apiUrl = import.meta.env.VITE_REACT_API_URL;
  const [courses] = useState([
    "Computer Science",
    "Data Science",
    "Software Engineering",
    "Artificial Intelligence",
    "Cybersecurity",
    "Web Development",
    "Mobile App Development",
    "Network Engineering",
  ]);

  // Get all students with pagination
  const getAllStudents = async (searchQuery = "", page = 1, limit = 10) => {
    try {
      const response = await fetch(
        `${apiUrl}/api/students/?searchQuery=${searchQuery}&page=${page}&limit=${limit}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setStudents(data.students);
        return {
          students: data.students,
          totalPages: data.totalPages,
          currentPage: data.currentPage,
          limit: data.limit,
        };
      } else {
        console.error("Failed to fetch students:", data);
        return null;
      }
    } catch (error) {
      console.error("Error fetching students:", error);
      return null;
    }
  };

  // Add student
  const addStudent = async (newStudent) => {
    try {
      const response = await fetch(
        `${apiUrl}/api/students`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify(newStudent),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setStudents((prevStudents) => [...prevStudents, data.student]);
        console.log("Student added successfully:", data);
      } else {
        console.error("Failed to add student:", data);
      }
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  // Update students
  const updateStudent = async (id, updatedData) => {
    try {
      const response = await fetch(
        `${apiUrl}/api/students/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify(updatedData),
        }
      );
      if (response.ok) {
        const data = await response.json();
        setStudents((prevStudents) =>
          prevStudents.map((student) =>
            student._id === id ? data.student : student
          )
        );
        console.log("Student updated successfully:", data);
      } else {
        const data = await response.json();
        console.error("Failed to update student:", data);
      }
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  // Delete students
  const deleteStudent = async (id) => {
    try {
      const response = await fetch(
        `${apiUrl}/api/students/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      if (response.ok) {
        setStudents((prevStudents) =>
          prevStudents.filter((student) => student._id !== id)
        );
        console.log("Student deleted successfully");
      } else {
        const data = await response.json();
        console.error("Failed to delete student:", data);
      }
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  return (
    <div>
      <studentContext.Provider
        value={{
          students,
          setStudents,
          courses,
          getAllStudents,
          addStudent,
          updateStudent,
          deleteStudent,
        }}
      >
        {children}
      </studentContext.Provider>
    </div>
  );
};

export default StudentState;
