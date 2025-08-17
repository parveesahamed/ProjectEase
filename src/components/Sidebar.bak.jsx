// src/components/Sidebar.jsx
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { FaSignOutAlt, FaTimes, FaBars } from "react-icons/fa";

export default function Sidebar() {
  const navigate = useNavigate();
  const [hoverLogout, setHoverLogout] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [email, setEmail] = useState("");
  const [initials, setInitials] = useState("");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      let em = currentUser?.email || "";

      if (!em) {
        try {
          const stored = JSON.parse(localStorage.getItem("user") || "null");
          em = stored?.email || "";
        } catch {}
      }

      setEmail(em);

      if (em) {
        const two = em.replace(/[^a-zA-Z]/g, "").slice(0, 2).toUpperCase();
        setInitials(two || em.slice(0, 2).toUpperCase());
      } else {
        setInitials("");
      }
    });

    return () => unsub();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-blue-600 text-white p-2 rounded-lg shadow-lg"
        onClick={() => setIsOpen(true)}
      >
        <FaBars />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-full w-64 bg-gradient-to-b from-[#0F172A] to-[#1E293B] text-white p-4 flex flex-col justify-between shadow-xl transform transition-transform duration-300 z-40
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Close Button (Mobile Only) */}
        <div className="md:hidden flex justify-end">
          <button
            className="text-gray-300 hover:text-white p-1"
            onClick={() => setIsOpen(false)}
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Top: Brand + Nav */}
        <div>
          {/* Step 2 Box — unchanged */}
          <div className="mb-8 bg-gradient-to-br from-gray-900 to-black rounded-xl shadow-lg border border-blue-500/20 p-4">
            <div className="flex items-center gap-3">
              <img
                src="/logo192.png"
                alt="Logo"
                className="w-12 h-12 rounded-full shadow-md border border-blue-500"
              />
              <div>
                <h1 className="text-xl font-extrabold tracking-wide font-serif text-blue-300">
                  ProjectEase
                </h1>
                <p className="text-xs text-gray-400 italic">
                  Simplify. Manage. Achieve.
                </p>
              </div>
            </div>
          </div>

          {/* Primary Navigation */}
          <nav className="space-y-2">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `block px-3 py-2 rounded-lg font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg scale-[1.02]"
                    : "bg-white/5 text-gray-200 hover:bg-blue-500/20 hover:scale-[1.02]"
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/projects"
              className={({ isActive }) =>
                `block px-3 py-2 rounded-lg font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg scale-[1.02]"
                    : "bg-white/5 text-gray-200 hover:bg-blue-500/20 hover:scale-[1.02]"
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              Projects
            </NavLink>

            <NavLink
              to="/tasks"
              className={({ isActive }) =>
                `block px-3 py-2 rounded-lg font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg scale-[1.02]"
                    : "bg-white/5 text-gray-200 hover:bg-blue-500/20 hover:scale-[1.02]"
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              Tasks
            </NavLink>
          </nav>

          {/* Quick Access */}
          <div className="mt-10">
            <h2 className="text-sm font-semibold text-gray-400 mb-3">
              Quick Access
            </h2>
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl shadow-lg p-3 space-y-2">
              <NavLink
                to="/reports"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-lg transition ${
                    isActive
                      ? "bg-pink-600 text-white shadow"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                Reports
              </NavLink>
              <NavLink
                to="/settings"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-lg transition ${
                    isActive
                      ? "bg-pink-600 text-white shadow"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                Settings
              </NavLink>
            </div>
          </div>
        </div>

        {/* Bottom: Profile + Logout */}
        <div className="mt-6">
          {email && (
            <div className="mb-3 p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-full bg-pink-600 flex items-center justify-center font-bold">
                  {initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] uppercase tracking-wide text-gray-400">
                    Signed in
                  </p>
                  <p className="text-sm font-medium text-white truncate">
                    {email}
                  </p>
                </div>
              </div>
            </div>
          )}

          <button
            onClick={handleLogout}
            onMouseEnter={() => setHoverLogout(true)}
            onMouseLeave={() => setHoverLogout(false)}
            className={`flex items-center justify-center w-full px-3 py-2 rounded-lg font-semibold transition-all duration-300 ${
              hoverLogout
                ? "bg-red-600 text-white scale-[1.05] shadow-lg"
                : "bg-red-500/80 text-white hover:bg-red-600"
            }`}
          >
            <FaSignOutAlt className="mr-2" /> Logout
          </button>
        </div>
      </aside>
    </>
  );
}
