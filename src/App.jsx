// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Components
import Header from "./components/Header.jsx";
import Sidebar from "./components/Sidebar.jsx";
import ProjectCard from "./components/ProjectCard.jsx";
import TaskCard from "./components/TaskCard.jsx";
import RequireAuth from "./components/RequireAuth.jsx";

// Pages
import Login from "./pages/Login.jsx";
import Signup from "./pages/Register.jsx"; // ✅ Fixed: from pages not components

// Sample data
const sampleProjects = [
  { title: "Website Redesign", deadline: "2025-10-10", status: "In Progress" },
  { title: "Mobile App Launch", deadline: "2025-09-01", status: "Completed" },
  { title: "Marketing Campaign", deadline: "2025-11-15", status: "Delayed" },
];

const sampleTasks = [
  { task: "Design new homepage", priority: "High", assignedTo: "Alice" },
  { task: "Fix login bug", priority: "Medium", assignedTo: "Bob" },
  { task: "Prepare presentation", priority: "Low", assignedTo: "Charlie" },
];

// Dashboard Layout (Logout removed from here)
function DashboardLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header with Logout button inside */}
      <Header />

      {/* Main Content */}
      <div className="flex flex-1 flex-col md:flex-row">
        <Sidebar />
        <main className="flex-1 p-6 bg-gray-100 overflow-auto">
          <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

          {/* Projects */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Projects</h2>
            {sampleProjects.map((project, idx) => (
              <ProjectCard key={idx} {...project} />
            ))}
          </section>

          {/* Tasks */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Tasks</h2>
            {sampleTasks.map((task, idx) => (
              <TaskCard key={idx} {...task} />
            ))}
          </section>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        {/* Protected Dashboard */}
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <DashboardLayout />
            </RequireAuth>
          }
        />

        {/* Public Routes */}
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />}
        />
        <Route
          path="/signup"
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <Signup />}
        />
        <Route
          path="/register"
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <Signup />}
        />

        {/* Default Redirect */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}
