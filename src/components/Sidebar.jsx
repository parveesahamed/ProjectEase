// src/components/Sidebar.jsx
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Sidebar() {
  const navigate = useNavigate();
  const [hoverLogout, setHoverLogout] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <motion.aside
      initial={{ x: -250, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 70 }}
      className="w-64 bg-gradient-to-b from-[#0F172A] to-[#1E293B] text-white min-h-screen p-4 flex flex-col justify-between shadow-xl hidden md:flex"
    >
      {/* Logo / Brand */}
      <div>
        <motion.div
          className="flex items-center space-x-3 mb-8"
          whileHover={{ scale: 1.02 }}
        >
          <img
            src="/logo192.png"
            alt="Logo"
            className="w-10 h-10 rounded-full shadow-lg border border-blue-500"
          />
          <div>
            <h1 className="text-2xl font-extrabold tracking-wide font-serif text-blue-400">
              ProjectEase
            </h1>
            <motion.p
              className="text-xs text-gray-400 italic"
              whileHover={{ color: "#60A5FA" }}
            >
              Simplify. Manage. Achieve.
            </motion.p>
          </div>
        </motion.div>

        {/* Navigation Links */}
        <nav className="space-y-2">
          {[
            { to: "/dashboard", label: "Dashboard" },
            { to: "/projects", label: "Projects" },
            { to: "/tasks", label: "Tasks" },
          ].map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-lg font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-indigo-500 text-white shadow-lg scale-[1.02]"
                    : "hover:bg-blue-500/20 hover:scale-[1.02] text-gray-300"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Quick Links */}
        <div className="mt-10 border-t border-gray-700 pt-4">
          <h2 className="text-sm font-semibold text-gray-400 mb-2">
            Quick Access
          </h2>
          <ul className="space-y-1 text-gray-400 text-sm">
            <li className="hover:text-blue-400 cursor-pointer transition">
              Reports
            </li>
            <li className="hover:text-blue-400 cursor-pointer transition">
              Settings
            </li>
          </ul>
        </div>
      </div>

      {/* Logout Button */}
      <motion.div
        className="mt-6"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <button
          onClick={handleLogout}
          onMouseEnter={() => setHoverLogout(true)}
          onMouseLeave={() => setHoverLogout(false)}
          className={`flex items-center justify-center w-full px-3 py-2 rounded-lg font-semibold transition-all duration-300 ${
            hoverLogout
              ? "bg-red-600 text-white shadow-lg ring-2 ring-red-300"
              : "bg-red-500/80 text-white hover:bg-red-600"
          }`}
        >
          <FaSignOutAlt className="mr-2" /> Logout
        </button>
      </motion.div>
    </motion.aside>
  );
}
