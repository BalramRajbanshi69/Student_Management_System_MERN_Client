
import React from "react";
import { motion } from "framer-motion";
import {
  Typography,
  Card,
  CardContent,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  School,
  Group,
  CalendarToday,
  Assessment,
  Settings,
  Security,
} from "@mui/icons-material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const featureVariants = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0 },
  hover: {
    scale: 1.05,
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
    transition: { duration: 0.2 },
  },
  transition: { duration: 0.5, ease: "easeOut" },
};

const benefitItemVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  hover: {
    scale: 1.03,
    backgroundColor: "#e0f2f7", // Light blue on hover
    transition: { duration: 0.1 },
  },
  transition: { duration: 0.3, ease: "easeOut" },
};

const About = () => {
  const features = [
    {
      icon: <School />,
      title: "Centralized Student Data",
      description:
        "Securely manage all student information in one place, including personal details, academic records, and attendance.",
    },
    {
      icon: <Group />,
      title: "Efficient Communication",
      description:
        "Facilitate seamless communication between students, teachers, parents, and administrators through integrated messaging and notifications.",
    },
    {
      icon: <CalendarToday />,
      title: "Timetable Management",
      description:
        "Create and manage class schedules, events, and exams with an intuitive calendar interface.",
    },
    {
      icon: <Assessment />,
      title: "Gradebook & Reporting",
      description:
        "Easily record grades, generate reports, and track student performance with comprehensive analytics.",
    },
    {
      icon: <Settings />,
      title: "User Role Management",
      description:
        "Define different user roles and permissions to control access and ensure data security.",
    },
    {
      icon: <Security />,
      title: "Secure & Reliable",
      description:
        "Our system is built with robust security measures to protect sensitive data and ensure reliable performance.",
    },
  ];

  return (
    <>
      <section id="about" className="py-20 bg-[#780000]">
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <Typography
              variant="h4"
              className="font-bold text-white dark:text-white tracking-tight mb-4"
            >
              About Our Student Management System
            </Typography>
            <Typography variant="subtitle1" className="text-gray-300 ">
              Empowering education through efficient and innovative solutions.
            </Typography>
          </motion.div>

          <Grid container direction="column" spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} key={index}>
                <motion.div
                  variants={featureVariants}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                  transition={{
                    ...featureVariants.transition,
                    delay: index * 0.1,
                  }}
                >
                  <Card className="w-full flex flex-row items-center p-4">
                    <div className="p-3 bg-indigo-100 text-indigo-700 rounded-md mr-4 dark:bg-indigo-900 dark:text-indigo-300">
                      {React.cloneElement(feature.icon, {
                        className: "w-6 h-6",
                      })}
                    </div>
                    <CardContent className="flex-grow">
                      <Typography
                        variant="h5"
                        className="text-gray-800 dark:text-white mb-2"
                      >
                        {feature.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        className="text-gray-600 dark:text-gray-400"
                      >
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
          
          
          <div className="mt-16 p-8 bg-indigo-50 dark:bg-indigo-900 rounded-lg shadow-md">
            <Typography
              variant="h6"
              className="font-semibold text-indigo-700 dark:text-indigo-300 mb-4"
            >
              Key Benefits
            </Typography>
            <Divider className="mb-4 dark:bg-gray-700" />
            <List>
              {[
                "Improved Efficiency in Administrative Tasks",
                "Enhanced Communication and Collaboration",
                "Better Tracking of Student Progress and Performance",
                "Increased Data Security and Reliability",
                "Streamlined Reporting and Analytics",
              ].map((benefit, index) => (
                <ListItem
                  key={index}
                  className="mb-2 rounded-md"
                  sx={{ 
                    paddingLeft: 0,
                    '&:hover': {
                      backgroundColor: 'transparent'
                    }
                  }}
                >
                  <ListItemIcon className="min-w-fit mr-2">
                    <CheckCircleIcon className="text-green-500" />
                  </ListItemIcon>
                  <ListItemText
                    primary={benefit}
                    className="text-gray-700 dark:text-gray-300"
                    sx={{ margin: 0 }}
                  />
                </ListItem>
              ))}
            </List>
          </div>
          
        </div>
      </section>
    </>
  );
};

export default About;











