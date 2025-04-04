
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";
import { MdSchool } from "react-icons/md";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const linkVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.05, transition: { duration: 0.2 } },
  };

  const contactItemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
      svg: { rotate: 30, transition: { duration: 0.3 } },
    },
  };

  const iconVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    hover: { scale: 1.2, rotate: 30, transition: { duration: 0.3 } },
  };

  return (
    <motion.footer
      className="bg-gray-900 text-gray-300 py-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 md:flex md:justify-between md:items-start">
        {/* Left Section: Logo and Description */}
        <motion.div className="mb-8 md:mb-0 md:w-1/3" variants={linkVariants}>
          <Link
            to="/"
            className="text-2xl font-semibold text-indigo-500 flex items-center"
          >
            <MdSchool className="h-8 w-8 mr-2" />
            SMS
          </Link>
          <p className="text-gray-400 mt-4 text-sm">
            Empowering education through seamless student management. Our
            platform streamlines administrative tasks, enhances communication,
            and fosters a connected learning environment.
          </p>
          <div className="flex mt-6 space-x-4">
            <motion.a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-400"
              variants={iconVariants}
              whileHover="hover"
            >
              <FaFacebook className="h-6 w-6" />
              <span className="sr-only">Facebook</span>
            </motion.a>
            <motion.a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-400"
              variants={iconVariants}
              whileHover="hover"
            >
              <FaTwitter className="h-6 w-6" />
              <span className="sr-only">Twitter</span>
            </motion.a>
            <motion.a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-400"
              variants={iconVariants}
              whileHover="hover"
            >
              <FaLinkedin className="h-6 w-6" />
              <span className="sr-only">LinkedIn</span>
            </motion.a>
            <motion.a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-400"
              variants={iconVariants}
              whileHover="hover"
            >
              <FaInstagram className="h-6 w-6" />
              <span className="sr-only">Instagram</span>
            </motion.a>
          </div>
        </motion.div>

        {/* Middle Section: Quick Links */}
        <motion.div className="mb-8 md:mb-0 md:w-1/4" variants={linkVariants}>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-indigo-300">
                Home
              </Link>
            </li>
            <li>
              <Link to="/students" className="hover:text-indigo-300">
                Students
              </Link>
            </li>
            <li>
              <Link to="/courses" className="hover:text-indigo-300">
                Courses
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-indigo-300">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-indigo-300">
                Contact
              </Link>
            </li>
          </ul>
        </motion.div>

        {/* Right Section: Contact Information */}
        <motion.div className="md:w-1/4" variants={linkVariants}>
          <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
          <ul className="space-y-3">
            <motion.li
              className="flex items-center"
              variants={contactItemVariants}
              whileHover="hover"
            >
              <FaMapMarkerAlt className="h-5 w-5 mr-3 text-indigo-500" />
              <span className="text-sm">
                Kathmandu, Bagmati Province, Nepal
              </span>
            </motion.li>
            <motion.li
              className="flex items-center"
              variants={contactItemVariants}
              whileHover="hover"
            >
              <motion.a
                href="mailto:info@studentsms.com"
                className="text-sm hover:text-indigo-300 flex items-center"
                style={{ pointerEvents: "auto" }} // Ensure the link is clickable
              >
                <FaEnvelope className="h-5 w-5 mr-3 text-indigo-500" />
                <span>info@studentsms.com</span>
              </motion.a>
            </motion.li>
            <motion.li
              className="flex items-center"
              variants={contactItemVariants}
              whileHover="hover"
            >
              <motion.a
                href="tel:+977-XXX-XXXXXXX"
                className="text-sm hover:text-indigo-300 flex items-center"
                style={{ pointerEvents: "auto" }} // Ensure the link is clickable
              >
                <FaPhoneAlt className="h-5 w-5 mr-3 text-indigo-500" />
                <span>+977-XXX-XXXXXXX</span>
              </motion.a>
            </motion.li>
          </ul>
        </motion.div>
      </div>

      {/* Bottom Section: Copyright */}
      <motion.div
        className="mt-12 py-4 border-t border-gray-800 text-center text-sm text-gray-400"
        variants={linkVariants}
      >
        <p>&copy; {currentYear} SMS. All rights reserved.</p>
        <div className="mt-2 sm:flex sm:justify-center sm:items-center">
          <Link to="/privacy" className="hover:text-indigo-300 ml-0 sm:ml-4">
            Privacy Policy
          </Link>
          <Link to="/terms" className="hover:text-indigo-300 ml-0 sm:ml-4">
            Terms of Service
          </Link>
        </div>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;







