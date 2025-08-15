// src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header.jsx";
import Sidebar from "./components/Sidebar.jsx";
import RequireAuth from "./components/RequireAuth.jsx";

import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Dashboard from "./pages/Dashboard.jsx";

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ✅ Keep login status updated
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-[#f3f4f6]">
        <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={closeSidebar}
            aria-hidden="true"
          />
        )}

        <div className="flex flex-1">
          <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

          <main
            className="flex-1 pt-16 transition-all duration-300 md:pl-64"
            style={{ minHeight: "calc(100vh - 4rem)" }}
          >
            <Routes>
              {/* Protected Dashboard */}
              <Route
                path="/dashboard"
                element={
                  <RequireAuth>
                    <Dashboard />
                  </RequireAuth>
                }
              />

              {/* Login */}
              <Route
                path="/login"
                element={
                  isLoggedIn
                    ? <Navigate to="/dashboard" replace />
                    : <Login />
                }
              />

              {/* Signup - ✅ Removed redirect for testing */}
              <Route path="/signup" element={<Signup />} />

              {/* Default */}
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}


