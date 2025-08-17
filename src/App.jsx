// src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./utils/firebase";
import { Toaster } from 'react-hot-toast'; // Import Toaster

// Component Imports
import Header from "./components/Header.jsx";
import Sidebar from "./components/Sidebar.jsx";

// Page Imports
import Dashboard from "./pages/Dashboard.jsx";
import CombinedAuthPage from "./pages/CombinedAuth.jsx";

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState(null); 
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "system");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "system") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.classList.toggle("dark", prefersDark);
    } else {
      root.classList.toggle("dark", theme === "dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <p className="text-xl">Loading Project...</p>
      </div>
    );
  }

  const isLoggedIn = !!user;

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
        {/* Add the Toaster component here */}
        <Toaster position="top-center" reverseOrder={false} />
        
        {isLoggedIn && (
          <>
            <Header
              toggleSidebar={toggleSidebar}
              isSidebarOpen={isSidebarOpen}
              theme={theme}
              setTheme={setTheme}
            />
            <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
            {isSidebarOpen && (
              <div
                className="fixed inset-0 bg-black/60 z-30 md:hidden"
                onClick={closeSidebar}
              />
            )}
          </>
        )}

        <main className={`transition-all duration-300 pt-16 ${
            isLoggedIn ? (isSidebarOpen ? "md:pl-64" : "md:pl-0") : ""
        }`}>
          <Routes>
            <Route
              path="/"
              element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <Navigate to="/auth" replace />}
            />
            <Route
              path="/auth"
              element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <CombinedAuthPage />}
            />
            <Route
              path="/dashboard"
              element={
                isLoggedIn ? (
                  <Dashboard /> 
                ) : (
                  <Navigate to="/auth" replace />
                )
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
