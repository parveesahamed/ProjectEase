// src/pages/Dashboard.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";
import TaskCard from "../components/TaskCard";

export default function Dashboard() {
  const navigate = useNavigate();

  // ✅ Agar token nahi hai to Login pe redirect
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  // Sample static data (Later API se aayega)
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

  return (
    <main className="flex-1 p-6 min-h-screen overflow-auto bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white animate-fadeIn">
      
      {/* Dashboard Heading */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 drop-shadow-lg animate-pulse">
          📊 Welcome to Your Workspace
        </h1>
        <p className="text-gray-400 mt-3 text-lg">
          Manage, track, and accomplish your goals effortlessly.
        </p>
      </div>

      {/* ✅ Projects Section */}
      <section className="mb-14">
        <h2 className="text-2xl font-semibold mb-6 border-b border-gray-600 pb-3 relative inline-block">
          🚀 Projects
          <span className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-[slideIn_1s_ease-in-out]"></span>
        </h2>
        {sampleProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sampleProjects.map((project, idx) => (
              <div key={idx} className="transform transition duration-300 hover:scale-[1.02]">
                <ProjectCard {...project} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 italic">No projects found.</p>
        )}
      </section>

      {/* ✅ Tasks Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 border-b border-gray-600 pb-3 relative inline-block">
          📌 Tasks
          <span className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-pink-500 to-red-500 rounded-full animate-[slideIn_1s_ease-in-out]"></span>
        </h2>
        {sampleTasks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sampleTasks.map((task, idx) => (
              <div key={idx} className="transform transition duration-300 hover:scale-[1.02]">
                <TaskCard {...task} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 italic">No tasks found.</p>
        )}
      </section>
    </main>
  );
}
