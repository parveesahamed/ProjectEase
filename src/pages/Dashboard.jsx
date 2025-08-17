// src/pages/Dashboard.jsx
import React from "react";
import ProjectCard from "../components/ProjectCard";
import TaskCard from "../components/TaskCard";

// Rocket Icon for Projects Title
const RocketIcon = () => (
  <svg className="w-6 h-6 mr-3 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

// Tasks Icon
const TasksIcon = () => (
  <svg className="w-6 h-6 mr-3 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
  </svg>
);


export default function Dashboard() {
  // === THE FIX IS HERE ===
  // "progress" (from 0 to 100) has been added to each project
  const sampleProjects = [
    { title: "Website Redesign", deadline: "2025-10-10", status: "In Progress", progress: 75 },
    { title: "Mobile App Launch", deadline: "2025-09-01", status: "Completed", progress: 100 },
    { title: "Marketing Campaign", deadline: "2025-11-15", status: "Delayed", progress: 20 },
  ];
  // === DATA UPDATED ===

  const sampleTasks = [
    { task: "Design new homepage", priority: "High", assignedTo: "Alice" },
    { task: "Fix login bug", priority: "Medium", assignedTo: "Bob" },
    { task: "Prepare presentation", priority: "Low", assignedTo: "Charlie" },
  ];

  return (
    <main className="flex-1 p-6 sm:p-8 text-gray-900 dark:text-white animate-slideIn">
      
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-pulse">
          Welcome to Your Workspace
        </h1>
        <p className="mt-2 text-lg text-gray-500 dark:text-gray-400">
          Manage, track, and accomplish your goals effortlessly.
        </p>
      </div>

      <section className="mb-12">
        <div className="flex items-center mb-5">
          <RocketIcon />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            Projects
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleProjects.map((project, idx) => (
            <div key={idx} className="transition-transform duration-300 hover:-translate-y-1">
              {/* We are now passing the new "progress" data to the card */}
              <ProjectCard {...project} />
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center mb-5">
          <TasksIcon />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            Tasks
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleTasks.map((task, idx) => (
            <div key={idx} className="transition-transform duration-300 hover:-translate-y-1">
              <TaskCard {...task} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
