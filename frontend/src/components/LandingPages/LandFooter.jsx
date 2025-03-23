import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUserTie, FaUserShield, FaUserGraduate, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const LandFooter = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-white text-black py-10 px-6">
      <motion.footer 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center"
      >

        {/* 🔐 Secure Login Section */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-black">🔐 Secure Login Portal</h2>
          <p className="text-gray-700">Access your account by choosing the appropriate login option.</p>
        </div>

        {/* 🔹 Login Buttons - Now at the Top */}
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 text-lg font-medium">
          <motion.span 
            whileHover={{ scale: 1.1 }} 
            className="flex items-center gap-2 cursor-pointer transition duration-300 px-5 py-3 rounded-lg bg-blue-100 hover:bg-blue-200 shadow-md"
            onClick={() => navigate('/tpo/login')}
          >
            <FaUserTie className="text-blue-600 text-xl" /> Login For TPO
          </motion.span>

          <motion.span 
            whileHover={{ scale: 1.1 }} 
            className="flex items-center gap-2 cursor-pointer transition duration-300 px-5 py-3 rounded-lg bg-red-100 hover:bg-red-200 shadow-md"
            onClick={() => navigate('/admin')}
          >
            <FaUserShield className="text-red-600 text-xl" /> Login For Admin
          </motion.span>

          <motion.span 
            whileHover={{ scale: 1.1 }} 
            className="flex items-center gap-2 cursor-pointer transition duration-300 px-5 py-3 rounded-lg bg-green-100 hover:bg-green-200 shadow-md"
            onClick={() => navigate('/student/login')}
          >
            <FaUserGraduate className="text-green-600 text-xl" /> Login For Student
          </motion.span>
        </div>

        {/* Main Footer Content - Updated Layout */}

        <div className="w-full border-t-2 border-black my-6">
        <div className="flex flex-col md:flex-row justify-between items-start mt-8 w-full">

          {/* 🎉 15 YEARS OF EXCELLENCE - Left Side */}
          <div className="md:w-1/2 text-left">
            <h3 className="text-xl font-semibold text-black mb-4">🎉 15 YEARS OF EXCELLENCE</h3>
            <p className="text-gray-700" style={{ textAlign: "justify" }}>
              Bhartiya Institute of Engineering & Technology (BIET) has been established by 
              BPS Shikshan Sansthan Samiti, Sikar, an educational society devoted to the 
              noble cause of spreading quality education in the region.
            </p>
          </div>

          {/* 📞 Contact & Social Media - Right Side */}
          <div id='contact' className="md:w-1/2 text-center">
            <h3 className="text-xl font-semibold text-black mb-4">📞 Contact Us</h3>
            <p className="flex items-center justify-center gap-2 text-gray-700">
              <FaMapMarkerAlt className="text-red-500 text-lg" /> BIET College, Jhansi, Uttar Pradesh, India
            </p>
            <p className="flex items-center justify-center gap-2 text-gray-700 mt-2">
              <FaEnvelope className="text-yellow-500 text-lg" /> 
              <a href="mailto:info@bietplacement.com" className="text-blue-600 hover:underline">
                info@bietplacement.com
              </a>
              <a href="tel:+919876543210" className="text-blue-600 hover:underline">
                +91 98765 43210
              </a>
            </p>

            {/* Social Media Icons */}
            <div className="flex justify-center space-x-6 mt-4">
              <motion.a whileHover={{ scale: 1.2 }} href="#" className="text-blue-700 text-2xl"><FaFacebook /></motion.a>
              <motion.a whileHover={{ scale: 1.2 }} href="#" className="text-blue-500 text-2xl"><FaTwitter /></motion.a>
              <motion.a whileHover={{ scale: 1.2 }} href="#" className="text-pink-600 text-2xl"><FaInstagram /></motion.a>
              <motion.a whileHover={{ scale: 1.2 }} href="#" className="text-blue-900 text-2xl"><FaLinkedin /></motion.a>
            </div>
          </div>

        </div>

        {/* Copyright Section */}
        <p className="text-gray-500 justify-center mt-6 text-sm ">
          © {new Date().getFullYear()} Placement Cell. All rights reserved.
        </p>
        </div>
      </motion.footer>
     
    </div>
  );
}

export default LandFooter;
