import  Home  from '../components/Home'
import React from 'react'
import About from '../components/About'
import Students from '../components/Students'
import Courses from '../components/Courses'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

const Dashboard = () => {
  return (
    <div>
      <Home />
      <Students />
      <About />
      <Courses />
      <Contact />
      <Footer />
    </div>
  )
}

export default Dashboard