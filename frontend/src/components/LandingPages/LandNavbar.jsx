import React, { useEffect, useState } from "react";
import Logo from "../../assets/CPMS.png"; // Update the logo path
import { motion } from "framer-motion";

function LandingNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 w-full flex justify-between items-center px-8 py-3 z-50 
        backdrop-blur-xl shadow-md transition-all duration-300 ${
          isScrolled ? "bg-white/80" : "bg-white/50"
        }`}
    >
      {/* Left Section - Logo */}
      <div className="flex items-center gap-3">
        <img
          src={Logo}
          alt="Logo"
          className="w-10 h-10 md:w-12 md:h-12 transition-all duration-300"
        />
        <h1 className="text-xl font-bold text-blue-700">
          Placement Cell Management
        </h1>{" "}
        {/* Bold Text */}
      </div>

      {/* Right Section - Navigation Links */}
      <div className="flex gap-6 text-lg font-bold text-gray-900">
        {/* Bold Text with Anchor Tags (No Underline) */}
        <a
          href="/"
          className="cursor-pointer hover:text-blue-500 transition no-underline"
        >
          Home
        </a>
        <a
          href="#about"
          className="cursor-pointer hover:text-blue-500 transition no-underline"
        >
          About us
        </a>
        <a
          href="#contact"
          className="cursor-pointer hover:text-blue-500 transition no-underline"
        >
          Contact us
        </a>
        <a
          href="#"
          className="cursor-pointer hover:text-blue-500 transition no-underline"
        >
          More
        </a>
      </div>
    </motion.nav>
  );
}

export default LandingNavbar;
