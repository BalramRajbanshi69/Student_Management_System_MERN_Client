import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validateForm = () => {
    let tempErrors = {};
    tempErrors.name = formData.name ? "" : "Name is required";
    tempErrors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
      ? ""
      : "Email is not valid";
    tempErrors.subject = formData.subject ? "" : "Subject is required";
    tempErrors.message =
      formData.message.length > 10
        ? ""
        : "Message must be at least 10 characters";

    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
    // Clear error when user starts typing
    if (errors[id]) {
      setErrors({
        ...errors,
        [id]: "",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    if (validateForm()) {
      try {
        const response = await fetch(
          "https://student-management-system-mern-server.onrender.com/api/contact",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        const data = await response.json();
        console.log("contact data", data);

        if (response.ok) {
          toast.success("Message sent successfully!");
          setSuccessMessage(data.message);
          setFormData({
            name: "",
            email: "",
            subject: "",
            message: "",
          });
          setSuccessMessage(
            "Thank you for your message. We'll get back to you soon!"
          );
        } else {
          toast.error(data.message || "Failed to send message");
          setErrorMessage(
            data.message || "Failed to submit form. Please try again."
          );
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        toast.error("Network error. Please try again later.");
        setErrorMessage("An error occurred. Please try again later.");
      }
    } else {
      toast.error("Please fix the errors in the form");
    }
  };

  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-br from-lime-100 to-green-300 bg-cover bg-fixed"
    >
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-12 h-12 text-green-600 mx-auto mb-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
            />
          </svg>
          <h4 className="text-3xl font-bold text-green-700 tracking-tight mb-6">
            Contact Our Student Management System Team
          </h4>
          <p className="text-gray-700 dark:text-gray-300 text-lg">
            Have questions or need assistance? Reach out to us! Fill out the
            form below.
          </p>
        </motion.div>

        <div className="flex justify-center">
          <div className="w-full md:w-2/3 lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="bg-white rounded-lg shadow-md p-8">
                {successMessage && (
                  <div className="text-green-600 mb-4">{successMessage}</div>
                )}
                {errorMessage && (
                  <div className="text-red-600 mb-4">{errorMessage}</div>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                        errors.name ? "border-red-500" : ""
                      }`}
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs italic">
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                        errors.email ? "border-red-500" : ""
                      }`}
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your Email"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs italic">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                        errors.subject ? "border-red-500" : ""
                      }`}
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Subject"
                    />
                    {errors.subject && (
                      <p className="text-red-500 text-xs italic">
                        {errors.subject}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows="4"
                      className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                        errors.message ? "border-red-500" : ""
                      }`}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Your Message"
                    ></textarea>
                    {errors.message && (
                      <p className="text-red-500 text-xs italic">
                        {errors.message}
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white font-bold rounded-md py-3 px-6 w-full focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
