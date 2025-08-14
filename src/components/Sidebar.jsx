// src/components/Sidebar.jsx
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import {
  FaSignOutAlt,
  FaHome,
  FaProjectDiagram,
  FaTasks,
  FaChartBar,
  FaCog,
  FaBars,
  FaTimes,
} from "react-icons/fa";

export default function Sidebar() {
  const navigate = useNavigate();
  const [hoverLogout, setHoverLogout] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // mobile toggle

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

  // Nav items config (icon + label + route)
  const navItems = [
    { to: "/dashboard", label: "Dashboard", icon: <FaHome /> },
    { to: "/projects", label: "Projects", icon: <FaProjectDiagram /> },
    { to: "/tasks", label: "Tasks", icon: <FaTasks /> },
  ];
  const quickItems = [
    { to: "/reports", label: "Reports", icon: <FaChartBar /> },
    { to: "/settings", label: "Settings", icon: <FaCog /> },
  ];

  return (
    <>
      {/* Mobile hamburger (fixed top-left) */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-gradient-to-r from-pink-600 to-purple-600 text-white p-2 rounded-lg shadow-lg"
        onClick={() => setIsOpen(true)}
        aria-label="Open menu"
      >
        <FaBars />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-full w-72 bg-gradient-to-b from-[#0F172A] to-[#1E293B] text-white p-4 flex flex-col justify-between shadow-xl transform transition-transform duration-300 z-40
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Mobile close */}
        <div className="md:hidden flex justify-end mb-4">
          <button
            className="text-white/80 hover:text-white p-1"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
          >
            <FaTimes />
          </button>
        </div>

        {/* Brand card (dashboard-style) */}
        <div className="mb-6">
          <div className="mb-4 bg-gradient-to-br from-gray-900 to-black rounded-xl shadow-lg border border-blue-500/20 p-4">
            <div className="flex items-center gap-3">
              <img
                src="/logo192.png"
                alt="Logo"
                className="w-12 h-12 rounded-full shadow-md border border-blue-500"
              />
              <div>
                <h1 className="text-lg font-extrabold tracking-wide font-serif text-blue-300">
                  ProjectEase
                </h1>
                <p className="text-xs text-gray-400 italic">Simplify. Manage. Achieve.</p>
              </div>
            </div>

            {/* Small CTA button under brand (filled style) */}
            <div className="mt-3">
              <button
                onClick={() => (window.location.href = "/dashboard")}
                className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-pink-600 to-purple-500 text-white font-semibold shadow hover:scale-[1.02] transition-transform"
              >
                Open Dashboard
              </button>
            </div>
          </div>
        </div>

        {/* Primary nav (with icons + active filled style + left indicator) */}
        <nav className="space-y-2">
          {navItems.map((it) => (
            <NavLink
              key={it.to}
              to={it.to}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `group relative flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-pink-600 to-purple-500 text-white shadow-lg transform hover:scale-[1.01]"
                    : "text-gray-200 hover:bg-white/5"
                }`
              }
            >
              {/* left active indicator */}
              <span
                aria-hidden
                className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full transition-all ${
                  window.location.pathname === it.to ? "bg-white/90" : "bg-transparent"
                }`}
              />
              <span className="text-lg opacity-95">{it.icon}</span>
              <span className="flex-1">{it.label}</span>

              {/* small chevron / symbol on hover */}
              <span className="opacity-0 group-hover:opacity-80 transition-opacity text-sm text-white/80">
                →
              </span>
            </NavLink>
          ))}
        </nav>

        {/* Quick Access card (dashboard-style mini) */}
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-gray-400 mb-2">Quick Access</h3>
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl shadow-lg p-3 space-y-2">
            {quickItems.map((it) => (
              <NavLink
                key={it.to}
                to={it.to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                    isActive ? "bg-pink-600 text-white shadow" : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`
                }
              >
                <span className="text-base opacity-95">{it.icon}</span>
                <span className="flex-1">{it.label}</span>
              </NavLink>
            ))}
          </div>
        </div>

        {/* Spacer then profile/logout */}
        <div className="mt-6">
          {email && (
            <div className="mb-3 p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-full bg-pink-600 flex items-center justify-center font-bold">
                  {initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] uppercase tracking-wide text-gray-400">Signed in</p>
                  <p className="text-sm font-medium text-white truncate">{email}</p>
                </div>
              </div>
            </div>
          )}

          <button
            onClick={handleLogout}
            onMouseEnter={() => setHoverLogout(true)}
            onMouseLeave={() => setHoverLogout(false)}
            className={`flex items-center justify-center w-full px-3 py-2 rounded-lg font-semibold transition-all duration-300 ${
              hoverLogout ? "bg-red-600 text-white scale-[1.05] shadow-lg" : "bg-red-500/80 text-white hover:bg-red-600"
            }`}
          >
            <FaSignOutAlt className="mr-2" /> Logout
          </button>
        </div>
      </aside>
    </>
  );
}

