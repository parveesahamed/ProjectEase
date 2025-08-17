// src/components/ProjectCard.jsx
import React from "react";
import { FaCheckCircle, FaHourglassHalf, FaTimesCircle } from "react-icons/fa";

// We now receive "progress" as a prop here
export default function ProjectCard({ title, deadline, status, progress }) {
  // Status icon & color logic (this remains the same)
  const getStatusDetails = () => {
    switch (status) {
      case "Completed":
        return { icon: <FaCheckCircle className="text-green-400" />, color: "text-green-400" };
      case "In Progress":
        return { icon: <FaHourglassHalf className="text-yellow-400" />, color: "text-yellow-400" };
      default: // "Delayed" or any other status
        return { icon: <FaTimesCircle className="text-red-400" />, color: "text-red-400" };
    }
  };

  const { icon, color } = getStatusDetails();

  return (
    <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black p-5 rounded-xl shadow-lg transform transition-all hover:scale-105 hover:shadow-xl flex flex-col h-full">
      <div className="flex-grow">
        {/* Title */}
        <h3 className="text-lg font-bold text-white mb-2">{title}</h3>

        {/* Deadline */}
        <p className="text-gray-400 text-sm mb-4">
          <span className="font-semibold">Deadline:</span> {deadline}
        </p>

        {/* Status */}
        <div className="flex items-center space-x-2">
          {icon}
          <span className={`font-medium ${color}`}>{status}</span>
        </div>
      </div>

      {/* === THE FIX IS HERE: Progress Bar Section Added === */}
      <div className="mt-4 pt-4 border-t border-gray-700">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs font-semibold text-gray-400">Progress</span>
          <span className="text-xs font-bold text-white">{progress}%</span>
        </div>
        {/* The visual progress bar */}
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className="bg-purple-500 h-2 rounded-full transition-all duration-500"
            // The width is set based on the "progress" value
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      {/* === FEATURE ADDED === */}
    </div>
  );
}
