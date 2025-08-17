// src/components/Sidebar.jsx
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";

// Icons
import {
  FaSignOutAlt,
  FaHome,
  FaProjectDiagram,
  FaTasks,
  FaChartBar,
  FaCog,
} from "react-icons/fa";


// Reusable NavLink component for consistent styling
const NavItem = ({ to, label, icon, onClick }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-2.5 rounded-lg font-semibold transition-colors duration-200 ${
        isActive
          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
      }`
    }
  >
    <span className="text-xl">{icon}</span>
    <span>{label}</span>
  </NavLink>
);

export default function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("user");
      navigate("/auth", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const navItems = [
    { to: "/dashboard", label: "Dashboard", icon: <FaHome /> },
    { to: "/projects", label: "Projects", icon: <FaProjectDiagram /> },
    { to: "/tasks", label: "Tasks", icon: <FaTasks /> },
    { type: 'heading', label: 'Quick Access' },
    { to: "/reports", label: "Reports", icon: <FaChartBar /> },
    { to: "/settings", label: "Settings", icon: <FaCog /> },
  ];
  
  const getInitials = (user) => {
    if (user?.displayName) {
      const nameParts = user.displayName.split(' ');
      if (nameParts.length > 1) {
        return (nameParts[0].charAt(0) + nameParts[1].charAt(0)).toUpperCase();
      }
      return user.displayName.slice(0, 2).toUpperCase();
    }
    if (user?.email) {
      const emailName = user.email.split('@')[0];
      return emailName.slice(0, 2).toUpperCase();
    }
    return 'U';
  };

  const userInitials = user ? getInitials(user) : '';

  return (
    <aside
      className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 
      p-4 flex flex-col shadow-lg transition-transform duration-300 ease-in-out z-40
      ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      <div className="flex flex-col flex-1 overflow-hidden">
        <nav className="flex-1 space-y-2 overflow-y-auto pr-2">
          {navItems.map((item, index) =>
            item.type === 'heading' ? (
              <h3 key={index} className="px-4 pt-4 pb-2 text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {item.label}
              </h3>
            ) : (
              <NavItem key={item.to} {...item} onClick={onClose} />
            )
          )}
        </nav>

        <div className="mt-4 shrink-0">
          {user && (
            <div className="p-3 mb-3 rounded-lg bg-gray-100 dark:bg-gray-700/50">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-500 to-red-500 flex items-center justify-center font-bold text-white shrink-0">
                  {userInitials}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-800 dark:text-white truncate">
                    {user.displayName || 'User'}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <button
            onClick={handleLogout}
            className="group flex items-center gap-3 w-full px-4 py-2.5 rounded-lg font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700/50 hover:bg-red-500 hover:text-white transition-colors duration-200"
          >
            <FaSignOutAlt className="text-xl" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
