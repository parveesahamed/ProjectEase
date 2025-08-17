// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const linkClass =
    "relative group hover:text-orange-400 transition-all duration-200";
  const underlineClass =
    "absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 group-hover:w-full transition-all duration-300";

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-slate-900/60 backdrop-blur-lg border-b border-white/10 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex flex-col leading-tight">
            <span className="text-2xl font-bold tracking-wide bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text text-transparent hover:scale-105 transition-transform">
              ProjectEase
            </span>
            <span className="text-xs bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
              Your project, simplified
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            {navLinks.map((link) => (
              <Link key={link.name} to={link.path} className={linkClass}>
                <span>{link.name}</span>
                <span className={underlineClass}></span>
              </Link>
            ))}
            <Link
              to="/login"
              className="px-4 py-2 rounded-full font-semibold text-white bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 shadow-lg hover:scale-105 transition-transform"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 rounded-full font-semibold text-white bg-gradient-to-r from-green-400 via-teal-500 to-blue-500 shadow-lg hover:scale-105 transition-transform"
            >
              Signup
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} aria-label="Toggle Menu">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-slate-900/80 backdrop-blur-lg px-4 pb-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="block hover:text-orange-400 transition"
              onClick={toggleMenu}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/login"
            className="block px-4 py-2 rounded-full font-semibold text-white bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 shadow-lg hover:scale-105 transition-transform"
            onClick={toggleMenu}
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="block px-4 py-2 rounded-full font-semibold text-white bg-gradient-to-r from-green-400 via-teal-500 to-blue-500 shadow-lg hover:scale-105 transition-transform"
            onClick={toggleMenu}
          >
            Signup
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
