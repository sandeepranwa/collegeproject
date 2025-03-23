import React from "react";
import { motion } from "framer-motion";
import { FaBriefcase, FaUsers, FaUniversity } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import CareerImage from "../../assets/placements.png";  // Image import ki hai

function LandingHeroPage() {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row items-center bg-white text-gray-900 px-6 lg:px-20 py-16">

      {/* 🔹 Left Content Section */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center">
        <motion.h1 
          className="text-4xl lg:text-6xl font-extrabold"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          Supercharge Your <span className="text-blue-600">Career</span> with Placements
        </motion.h1>
        
        <motion.p 
          className="mt-4 text-lg lg:text-xl text-gray-700"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          Empowering students with top placement opportunities.  
          Your future starts here!
        </motion.p>
        
        {/* 🔹 Call-to-Action Buttons */}
        <motion.div 
          className="mt-6 flex space-x-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          <button 
            className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition"
            onClick={() => navigate("/student/login")}
          >
            Get Started - Student Login
          </button>
          <button className="px-6 py-3 border-2 border-blue-600 font-bold text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition">
            Learn More
          </button>
        </motion.div>

        {/* 🔹 Placement Stats */}
        <motion.div 
          className="mt-10 flex gap-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          <div className="flex flex-col items-center">
            <FaBriefcase className="text-4xl text-blue-600" />
            <h3 className="text-xl font-semibold mt-2">500+ Job Offers</h3>
          </div>
          <div className="flex flex-col items-center">
            <FaUsers className="text-4xl text-blue-600" />
            <h3 className="text-xl font-semibold mt-2">100+ Hiring Companies</h3>
          </div>
          <div className="flex flex-col items-center">
            <FaUniversity className="text-4xl text-blue-600" />
            <h3 className="text-xl font-semibold mt-2">Top Campus Placements</h3>
          </div>
        </motion.div>
      </div>

      {/* 🔹 Right Image Section */}
      <motion.div 
        className="w-full lg:w-1/2 flex bg-transparent justify-center mt-10 lg:mt-0"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <img 
          // src="https://plus.unsplash.com/premium_photo-1679243792923-fe4631b234d1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
          src={CareerImage} 
          alt="Placement Success"
          style={{ background: "none" }}
          className="w-4/5 lg:w-full max-w-lg  bg-transparent"
        />

{/* <img 
  src={CareerImage} 
  alt="Placement Success"
  className="w-4/5 lg:w-full max-w-lg object-contain" // Ensures image fits without background
  style={{ filter: "drop-shadow(0px 0px 0px transparent)" }} // Removes shadow
/> */}

      </motion.div>

    </div>
  );
}

export default LandingHeroPage;
