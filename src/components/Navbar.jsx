import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaUsers,
  FaBookOpen,
  FaInfoCircle,
  FaPhone,
  FaSearch,
  FaUserCircle,
  FaSignOutAlt,
  FaSignInAlt,
  FaUserPlus,
  FaCog,
  FaTachometerAlt, 
} from "react-icons/fa";
import { MdSchool } from "react-icons/md";

const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const userIconRef = useRef(null);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search/${searchQuery}`);
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userIconRef.current && !userIconRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userIconRef]);

  const toggleMobileMenu = () => {
    setMobileOpen(!mobileOpen);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navItems = [
    { text: "HOME", path: "/", icon: <FaHome className="h-5 w-5" /> },
    {
      text: "STUDENTS",
      path: "/students",
      icon: <FaUsers className="h-5 w-5" />,
    },
    {
      text: "COURSES",
      path: "/courses",
      icon: <FaBookOpen className="h-5 w-5" />,
    },
    {
      text: "ABOUT",
      path: "/about",
      icon: <FaInfoCircle className="h-5 w-5" />,
    },
    {
      text: "CONTACT",
      path: "/contact",
      icon: <FaPhone className="h-5 w-5" />,
    },
  ];

  const mobileNavItems = [
    { text: "HOME", path: "/", icon: <FaHome className="h-6 w-6 mr-2" /> },
    {
      text: "STUDENTS",
      path: "/students",
      icon: <FaUsers className="h-6 w-6 mr-2" />,
    },
    {
      text: "COURSES",
      path: "/courses",
      icon: <FaBookOpen className="h-6 w-6 mr-2" />,
    },
    {
      text: "ABOUT",
      path: "/about",
      icon: <FaInfoCircle className="h-6 w-6 mr-2" />,
    },
    {
      text: "CONTACT",
      path: "/contact",
      icon: <FaPhone className="h-6 w-6 mr-2" />,
    },
    {
      text: "PROFILE",
      path: "/profile",
      icon: <FaUserCircle className="h-6 w-6 mr-2" />,
    },
    {
      text: "LOGIN",
      path: "/login",
      icon: <FaSignInAlt className="h-6 w-6 mr-2" />,
    },
    {
      text: "REGISTER",
      path: "/register",
      icon: <FaUserPlus className="h-6 w-6 mr-2" />,
    },
    {
      text: "SIGN OUT",
      path: "/login",
      icon: <FaSignOutAlt className="h-6 w-6 mr-2 text-red-500" />,
    },
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out rounded-t-md ${
        isScrolled ? "bg-transparent backdrop-blur-sm" : "bg-black"
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className={`focus:outline-none ${
              isScrolled ? "text-black" : "text-white"
            }`}
          >
            {mobileOpen ? (
              <FaTimes className="h-6 w-6" />
            ) : (
              <FaBars className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Logo */}
        <Link
          to="/"
          className={`flex items-center font-bold text-xl md:text-2xl ${
            isScrolled ? "text-black" : "text-white"
          }`}
        >
          <MdSchool
            className={`h-6 w-6 mr-1 ${
              isScrolled ? "text-black" : "text-white"
            }`}
          />
          SMS
        </Link>

        {/* Centered Navigation (Desktop) */}
        <div className="hidden md:flex items-center space-x-4 lg:space-x-6 flex-grow justify-center">
          {navItems.map((item) => (
            <Link
              key={item.text}
              to={item.path}
              className={`transition duration-200 flex flex-col items-center ${
                isScrolled
                  ? "text-black hover:text-gray-800"
                  : "text-white hover:text-gray-300"
              } ${
                isActive(item.path)
                  ? isScrolled
                    ? "opacity-70 text-gray-800"
                    : "opacity-70"
                  : ""
              }`}
            >
              {React.cloneElement(item.icon, {
                className: `${item.icon.props.className} ${
                  isScrolled ? "text-black" : ""
                }`,
              })}
              <span className={`text-sm ${isScrolled ? "text-black" : ""}`}>
                {item.text}
              </span>
            </Link>
          ))}
        </div>

        {/* Right Side (Desktop) */}
        <div className="hidden md:flex items-center space-x-4">
          <Link
            to="/login"
            className={`transition duration-200 flex items-center ${
              isScrolled
                ? "text-black hover:text-gray-800"
                : "text-white hover:text-gray-300"
            }`}
          >
            <FaSignInAlt
              className={`h-5 w-5 mr-1 ${
                isScrolled ? "text-black" : "text-white"
              }`}
            />
            Login
          </Link>
          <Link
            to="/register"
            className={`transition duration-200 flex items-center ${
              isScrolled
                ? "text-black hover:text-gray-800"
                : "text-white hover:text-gray-300"
            }`}
          >
            <FaUserPlus
              className={`h-5 w-5 mr-1 ${
                isScrolled ? "text-black" : "text-white"
              }`}
            />
            Register
          </Link>
          <form action="" onSubmit={handleSearchSubmit}>
            <div className="relative">
              <input
                type="search"
                placeholder="Search..."
                className={`rounded-md py-2 px-3 focus:outline-none focus:ring focus:ring-gray-500 text-sm ${
                  isScrolled
                    ? "bg-gray-200 text-black"
                    : "bg-gray-700 text-white"
                }`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search"
              />
              <button
                type="submit"
                className={`absolute right-2 top-1/2 transform -translate-y-1/2 focus:outline-none ${
                  isScrolled
                    ? "text-gray-600 hover:text-black"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <FaSearch className="h-5 w-5" />
              </button>
            </div>
          </form>
          <div className="relative" ref={userIconRef}>
            <button
              onClick={toggleUserDropdown}
              className={`focus:outline-none transition duration-200 ${
                isScrolled
                  ? "text-black hover:text-gray-800"
                  : "text-white hover:text-gray-300"
              }`}
            >
              <FaUserCircle
                className={`h-6 w-6 ${
                  isScrolled ? "text-black" : "text-white"
                }`}
              />
            </button>
            {isUserDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  onClick={() => setIsUserDropdownOpen(false)}
                >
                  <FaUserCircle className="h-4 w-4 mr-2 inline-block" />
                  Profile
                </Link>
                <Link
                  to="/"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  onClick={() => setIsUserDropdownOpen(false)}
                >
                  <FaTachometerAlt className="h-4 w-4 mr-2 inline-block" />
                  Dashboard
                </Link>
                <Link
                  to="/settings"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  onClick={() => setIsUserDropdownOpen(false)}
                >
                  <FaCog className="h-4 w-4 mr-2 inline-block" />
                  Settings
                </Link>
                <Link
                  to="/login"
                  className="block px-4 py-2 text-red-500 hover:bg-gray-100"
                  onClick={() => setIsUserDropdownOpen(false)}
                >
                  <FaSignOutAlt className="h-4 w-4 mr-2 inline-block" />
                  Sign Out
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        className={`fixed top-0 left-0 h-full w-3/4 bg-black z-40 transform transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <Link
              to="/"
              className="flex items-center text-white font-bold text-xl"
            >
              <MdSchool className="h-6 w-6 mr-1" />
              SMS
            </Link>
            <button
              onClick={toggleMobileMenu}
              className="text-white focus:outline-none"
            >
              <FaTimes className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex flex-col space-y-2">
            {mobileNavItems.map((item) => (
              <Link
                key={item.text}
                to={item.path}
                className={`text-gray-300 hover:text-white transition duration-200 py-2 px-4 rounded-md flex items-center ${
                  isActive(item.path) ? "bg-gray-800 text-white" : ""
                }`}
                onClick={toggleMobileMenu}
              >
                {item.icon}
                <span>{item.text}</span>
              </Link>
            ))}
          </nav>
        </div>
      </motion.div>

      {mobileOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-30"
          onClick={toggleMobileMenu}
        />
      )}
    </motion.nav>
  );
};

export default Navbar;