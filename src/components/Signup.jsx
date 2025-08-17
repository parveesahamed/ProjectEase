// src/components/Signup.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // ✅ Animation import
import api from "../utils/api";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "Admin",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateForm = () => {
    const { name, email, password } = form;
    if (!name.trim() || !email.trim() || !password.trim()) {
      return "❌ Please fill all fields";
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return "⚠ Please enter a valid email";
    }
    if (password.length < 6) {
      return "⚠ Password must be at least 6 characters";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/register", form);

      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user || form));
        navigate("/dashboard", { replace: true });
      } else {
        setError("⚠ Signup failed. Please try again.");
      }
    } catch (err) {
      console.error("Signup Error:", err);
      setError(
        err.response?.data?.error ||
          err.response?.data?.message ||
          "⚠ Network error. Please check your internet connection."
      );
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { name: "name", type: "text", placeholder: "Full Name", autoComplete: "name" },
    { name: "email", type: "email", placeholder: "Email", autoComplete: "email" },
    { name: "password", type: "password", placeholder: "Password", autoComplete: "new-password" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#131C2E] text-white">
      {/* Motion Container */}
      <motion.div
        className="login-box w-full max-w-md p-6 rounded-lg shadow-lg bg-opacity-10 backdrop-blur-md"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.h2
          className="text-3xl font-extrabold text-center mb-6 gradient-text"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Signup
        </motion.h2>

        {error && (
          <motion.div
            className="bg-red-500/20 text-red-400 border border-red-500 px-4 py-2 rounded mb-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map(({ name, type, placeholder, autoComplete }, index) => (
            <motion.input
              key={name}
              type={type}
              name={name}
              placeholder={placeholder}
              value={form[name]}
              onChange={handleChange}
              autoComplete={autoComplete}
              className="input-glass"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            />
          ))}

          {/* Role Selection */}
          <motion.select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="input-glass"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <option value="Admin">Admin</option>
            <option value="Student">Student</option>
            <option value="Developer">Developer</option>
            <option value="Employee">Employee</option>
          </motion.select>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={loading}
            className={`btn-gradient w-full ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </motion.button>
        </form>

        <motion.p
          className="text-center text-gray-400 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-400 hover:underline cursor-pointer"
          >
            Login
          </span>
        </motion.p>
      </motion.div>
    </div>
  );
}
