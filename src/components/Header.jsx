// src/components/Header.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast from 'react-hot-toast'; // Import toast

// Icons for the theme dropdown
const SunIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M12 12a5 5 0 100-10 5 5 0 000 10z" /></svg>;
const MoonIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>;
const SystemIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;

// A simple, reliable icon using a popular library
import { CgMenuLeft } from "react-icons/cg";

export default function Header({ toggleSidebar, isSidebarOpen, theme, setTheme }) {
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);

  const handleSidebarToggle = () => {
    toggleSidebar();
    // Show a toast message when sidebar is toggled
    toast.success(isSidebarOpen ? 'Sidebar Closed' : 'Sidebar Opened', {
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 shadow-sm h-16 flex items-center px-4 sm:px-6 justify-between transition-colors duration-300">
      
      <div className="flex items-center space-x-4">
        <button
          onClick={handleSidebarToggle}
          className="p-2 rounded-full text-gray-400 hover:text-white transition-all duration-200 transform hover:scale-110"
          aria-label="Toggle Sidebar"
        >
          {/* Using a reliable icon from a library */}
          <CgMenuLeft size={28} />
        </button>

        <Link to="/dashboard" className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shrink-0">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>
          </div>
          <div className="hidden sm:block">
           <h1 className="text-xl font-bold text-gray-800 dark:text-white">ProjectFlow</h1>
           <p className="text-xs text-gray-500 dark:text-gray-400">Simplify. Manage. Achieve.</p>
          </div>
        </Link>
      </div>

      <div className="relative">
        <button
          onClick={() => setThemeDropdownOpen((prev) => !prev)}
          className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          aria-label="Change theme"
        >
          {theme === 'light' ? <SunIcon/> : <MoonIcon/>}
        </button>

        {themeDropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-50">
            {[{id: 'light', icon: <SunIcon/>, label: 'Light'}, {id: 'dark', icon: <MoonIcon/>, label: 'Dark'}, {id: 'system', icon: <SystemIcon/>, label: 'System'}].map((option) => (
              <button
                key={option.id}
                onClick={() => {
                  setTheme(option.id);
                  setThemeDropdownOpen(false);
                }}
                className={`flex items-center w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-200 ${
                  theme === option.id
                    ? "bg-gray-100 dark:bg-gray-600"
                    : "hover:bg-gray-100 dark:hover:bg-gray-600"
                }`}
              >
                <span className="mr-2">{option.icon}</span>
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
