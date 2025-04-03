import React from "react";
import { motion } from "framer-motion";

const Courses = () => {
  const coursesData = [
    {
      title: "Computer Science",
      info: "Explore the theoretical foundations of computation and information.",
      duration: "12 Weeks",
      level: "Intermediate",
      instructor: "Dr. Alan Turing",
      topics: ["Algorithms", "Data Structures", "Theory of Computation"],
    },
    {
      title: "Data Science",
      info: "Learn to extract knowledge and insights from data using statistical and computational methods.",
      duration: "14 Weeks",
      level: "Intermediate",
      instructor: "Ms. Florence Nightingale",
      topics: ["Statistics", "Machine Learning", "Data Visualization"],
    },
    {
      title: "Software Engineering",
      info: "Master the principles and practices of designing, developing, and maintaining software systems.",
      duration: "16 Weeks",
      level: "Advanced",
      instructor: "Mr. Grady Booch",
      topics: ["Software Design Patterns", "Agile Methodologies", "Testing"],
    },
    {
      title: "Artificial Intelligence",
      info: "Dive into the creation of intelligent agents that can reason, learn, and act autonomously.",
      duration: "15 Weeks",
      level: "Advanced",
      instructor: "Prof. Marvin Minsky",
      topics: [
        "Machine Learning",
        "Deep Learning",
        "Natural Language Processing",
      ],
    },
    {
      title: "Cybersecurity",
      info: "Understand how to protect computer systems and networks from theft, damage, or unauthorized access.",
      duration: "10 Weeks",
      level: "Intermediate",
      instructor: "Mr. Kevin Mitnick",
      topics: ["Network Security", "Cryptography", "Ethical Hacking"],
    },
    {
      title: "Web Development",
      info: "Build dynamic and interactive websites using front-end and back-end technologies.",
      duration: "12 Weeks",
      level: "Beginner",
      instructor: "Mr. Tim Berners-Lee",
      topics: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    },
    {
      title: "Mobile App Development",
      info: "Develop applications for iOS and Android platforms using modern frameworks.",
      duration: "14 Weeks",
      level: "Intermediate",
      instructor: "Mr. Steve Jobs",
      topics: ["React Native", "Swift", "Kotlin", "UI/UX Design"],
    },
    {
      title: "Network Engineering",
      info: "Learn the principles of designing, implementing, and managing computer networks.",
      duration: "11 Weeks",
      level: "Intermediate",
      instructor: "Ms. Radia Perlman",
      topics: ["TCP/IP", "Routing", "Switching", "Network Security"],
    },
  ];

  return (
    <section
      id="courses"
      className="py-20 bg-gradient-to-br from-teal-100 to-cyan-200 bg-cover bg-fixed"
    >
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h4 className="text-3xl font-bold text-blue-600 tracking-tight mb-6">
            Explore Our Popular Courses
          </h4>
          <p className="text-gray-700 dark:text-gray-300 text-lg">
            Invest in your future with our comprehensive and engaging courses.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-center">
          {coursesData.map((course, index) => (
            <motion.div
              key={index}
              className="flex"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: index * 0.15,
                ease: "easeInOut",
              }}
            >
              <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-transform ease-in-out duration-300 transform hover:scale-105 flex flex-col h-full min-h-[400px]">
                <div className="p-6 flex-grow">
                  <h5 className="text-xl font-semibold text-blue-600 mb-3">
                    {course.title}
                  </h5>
                  <p className="text-gray-800 dark:text-gray-200 mb-4">
                    {course.info}
                  </p>
                  <p className="text-gray-600 text-sm mb-2">
                    Duration: {course.duration}
                  </p>
                  <p className="text-gray-600 text-sm mb-2">
                    Level: {course.level}
                  </p>
                  <p className="text-gray-600 text-sm mb-3">
                    Instructor: {course.instructor}
                  </p>
                  {course.topics && course.topics.length > 0 && (
                    <div>
                      <p className="text-gray-600 text-sm mb-2 font-semibold">
                        Topics Covered:
                      </p>
                      <ul className="list-disc pl-5">
                        {course.topics.map((topic, idx) => (
                          <li
                            key={idx}
                            className="text-gray-700 dark:text-gray-300 text-sm"
                          >
                            {topic}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md py-2 px-4 w-full transition duration-300 ease-in-out">
                    Enroll in {course.title}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;
