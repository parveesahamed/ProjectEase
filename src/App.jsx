// src/App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header.jsx";
import Sidebar from "./components/Sidebar.jsx";
import RequireAuth from "./components/RequireAuth.jsx";

// pages (adjust import paths if your files are in a different folder)
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Dashboard from "./pages/Dashboard.jsx";

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen((s) => !s);
  const closeSidebar = () => setIsSidebarOpen(false);

  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <Router>
      {/* Header (fixed) */}
      <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

      {/* Dark overlay when mobile sidebar open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      <div className="flex">
        {/* Sidebar: controlled by isSidebarOpen */}
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

        {/* Main content — add top padding so header doesn't overlap */}
        <main className="flex-1 min-h-screen pt-16 transition-all duration-300 md:pl-64 bg-[#f3f4f6]">
          <Routes>
            <Route
              path="/dashboard"
              element={
                <RequireAuth>
                  <Dashboard />
                </RequireAuth>
              }
            />

            <Route path="/login" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />} />
            <Route path="/signup" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Signup />} />

            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

