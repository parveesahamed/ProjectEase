import React from "react";
import { FaCheckCircle, FaHourglassHalf, FaTimesCircle } from "react-icons/fa";

export default function ProjectCard({ title, deadline, status }) {
  // Status icon & color
  const getStatusDetails = () => {
    switch (status) {
      case "Completed":
        return { icon: <FaCheckCircle className="text-green-400" />, color: "text-green-400" };
      case "In Progress":
        return { icon: <FaHourglassHalf className="text-yellow-400" />, color: "text-yellow-400" };
      default:
        return { icon: <FaTimesCircle className="text-red-400" />, color: "text-red-400" };
    }
  };

  const { icon, color } = getStatusDetails();

  return (
    <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black p-5 rounded-xl shadow-lg transform transition-all hover:scale-105 hover:shadow-xl">
      {/* Title */}
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>

      {/* Deadline */}
      <p className="text-gray-400 text-sm mb-3">
        <span className="font-semibold">Deadline:</span> {deadline}
      </p>

      {/* Status */}
      <div className="flex items-center space-x-2">
        {icon}
        <span className={`font-medium ${color}`}>{status}</span>
      </div>
    </div>
  );
}
