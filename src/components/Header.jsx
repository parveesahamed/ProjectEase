import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { motion } from "framer-motion";
import { FaMoon, FaSun } from "react-icons/fa"; // Theme icons

// Load Montserrat font
import "@fontsource/montserrat"; // npm install @fontsource/montserrat

export default function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Dark mode state (load from localStorage)
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // Handle auth change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Apply theme
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // Logout function
  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout error:", error);
      alert("Failed to log out. Please try again.");
    }
  };

  return (
    <header className="bg-gradient-to-r from-indigo-900 via-purple-900 to-black p-4 shadow-lg">
      <div className="max-w-6xl mx-auto flex items-center justify-between">

        {/* Branding & Tagline */}
        <div className="flex items-center gap-6">
          <motion.h1
            className="text-2xl font-extrabold tracking-wide text-white"
            style={{ fontFamily: "Montserrat, sans-serif" }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            ProjectEase
          </motion.h1>

          <motion.h1
            className="text-2xl font-extrabold tracking-wide text-white hidden sm:block"
            style={{ fontFamily: "Montserrat, sans-serif" }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            Where Project Management meets success.
          </motion.h1>
        </div>

        {/* Navigation + Theme Toggle */}
        <nav className="flex items-center space-x-4">
          {/* Theme toggle button */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-white text-lg p-2 rounded-full hover:bg-white/20 transition"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>

          {!user && (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `px-3 py-1 rounded text-white ${
                    isActive
                      ? "bg-pink-600 shadow-lg"
                      : "hover:bg-pink-500 transition-colors"
                  }`
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  `px-3 py-1 rounded text-white ${
                    isActive
                      ? "bg-pink-600 shadow-lg"
                      : "hover:bg-pink-500 transition-colors"
                  }`
                }
              >
                Signup
              </NavLink>
            </>
          )}

          {user && (
            <button
              onClick={handleLogout}
              className="px-3 py-1 rounded text-white hover:bg-red-500 transition-colors"
            >
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
