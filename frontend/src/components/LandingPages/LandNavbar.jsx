import React, { useEffect, useState } from "react";
import Logo from "../../assets/CPMS.png"; // Update the logo path
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

function LandingNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
      className={`fixed top-0 left-0 w-full flex justify-between items-center px-6 md:px-12 py-3 z-50 
        backdrop-blur-xl shadow-md transition-all duration-300 ${
          isScrolled ? "bg-white/80" : "bg-white/50"
        }`}
    >
      {/* Left Section - Logo */}
      <div className="flex items-center gap-3">
        <img src={Logo} alt="Logo" className="w-10 h-10 md:w-12 md:h-12 transition-all duration-300" />
        <h1 className="text-lg md:text-xl font-bold text-blue-700">Placement Cell Management</h1>
      </div>

      {/* Desktop Navigation Links */}
      <div className="hidden md:flex gap-6 text-lg font-bold text-gray-900">
        <a href="/" className="cursor-pointer hover:text-blue-500 transition no-underline">Home</a>
        <a href="#about" className="cursor-pointer hover:text-blue-500 transition no-underline">About us</a>
        <a href="#contact" className="cursor-pointer hover:text-blue-500 transition no-underline">Contact us</a>
        <a href="#" className="cursor-pointer hover:text-blue-500 transition no-underline">More</a>
      </div>

      {/* Mobile Menu Button */}
      <button className="md:hidden focus:outline-none" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X className="w-8 h-8 text-gray-900" /> : <Menu className="w-8 h-8 text-gray-900" />}
      </button>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col items-center py-4 space-y-4 md:hidden"
          >
            <a href="/" className="cursor-pointer text-lg font-bold text-gray-900 hover:text-blue-500">Home</a>
            <a href="#about" className="cursor-pointer text-lg font-bold text-gray-900 hover:text-blue-500">About us</a>
            <a href="#contact" className="cursor-pointer text-lg font-bold text-gray-900 hover:text-blue-500">Contact us</a>
            <a href="#" className="cursor-pointer text-lg font-bold text-gray-900 hover:text-blue-500">More</a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default LandingNavbar;
 