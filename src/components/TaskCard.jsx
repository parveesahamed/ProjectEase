import React from "react";
import { FaExclamationCircle, FaExclamationTriangle, FaCheckCircle } from "react-icons/fa";

export default function TaskCard({ task, priority, assignedTo }) {
  // Priority icon & color
  const getPriorityDetails = () => {
    switch (priority) {
      case "High":
        return { icon: <FaExclamationCircle className="text-red-400" />, color: "text-red-400" };
      case "Medium":
        return { icon: <FaExclamationTriangle className="text-yellow-400" />, color: "text-yellow-400" };
      default:
        return { icon: <FaCheckCircle className="text-green-400" />, color: "text-green-400" };
    }
  };

  const { icon, color } = getPriorityDetails();

  return (
    <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black p-5 rounded-xl shadow-lg transform transition-all hover:scale-105 hover:shadow-xl">
      {/* Task Name */}
      <h3 className="text-lg font-bold text-white mb-2">{task}</h3>

      {/* Assigned To */}
      <p className="text-gray-400 text-sm mb-3">
        <span className="font-semibold">Assigned to:</span> {assignedTo}
      </p>

      {/* Priority */}
      <div className="flex items-center space-x-2">
        {icon}
        <span className={`font-medium ${color}`}>{priority}</span>
      </div>
    </div>
  );
}
