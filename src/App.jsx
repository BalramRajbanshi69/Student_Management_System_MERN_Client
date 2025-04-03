import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Courses from "./components/Courses";
import About from "./components/About";
import Contact from "./components/Contact";
import Students from "./components/Students";
import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import { Home } from "@mui/icons-material";
import StudentState from "./context/StudentState";
import StudentTable from "./components/StudentTable";
import AddStudent from "./components/AddStudent";
import Toast from "./pages/Toast";
import SearchResult from "./components/SearchResult";
import Profile from "./components/Profile";

const App = () => {
  return (
    <div>
      <StudentState>
        <Router>
          <Navbar />
          <Toast />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/home" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/students" element={<Students />} />
            <Route path="/add-students" element={<AddStudent />} />
            <Route path="/students-table" element={<StudentTable />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/search/:searchQuery" element={<SearchResult />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Router>
      </StudentState>
    </div>
  );
};

export default App;
