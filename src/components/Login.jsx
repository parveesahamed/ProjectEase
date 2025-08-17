// src/components/Login.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // ✅ Animation import
import api from "../utils/api";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Page fade-in variant
  const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  // ✅ Form box animation variant
  const boxVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.2 } }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { email, password } = form;
    if (!email.trim() || !password.trim()) {
      setError("❌ Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/login", { email, password });

      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify({ email }));
        navigate("/dashboard", { replace: true });
      } else {
        setError("⚠ Login failed. Please check your credentials.");
      }
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "⚠ Network error. Please check your internet connection."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-[#131C2E] text-white"
      initial="hidden"
      animate="visible"
      variants={pageVariants}
    >
      <motion.div
        className="login-box w-full max-w-md p-6 rounded-lg bg-[#1E2A3A] shadow-lg"
        variants={boxVariants}
      >
        <h2 className="text-3xl font-extrabold text-center mb-6 gradient-text">
          Login
        </h2>

        {error && (
          <motion.div
            className="bg-red-500/20 text-red-400 border border-red-500 px-4 py-2 rounded mb-4 text-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {["email", "password"].map((field, index) => (
            <motion.input
              key={field}
              type={field}
              name={field}
              placeholder={
                field === "email"
                  ? "Email (eve.holt@reqres.in)"
                  : "Password (cityslicka)"
              }
              value={form[field]}
              onChange={handleChange}
              autoComplete={field === "email" ? "username" : "current-password"}
              className="input-glass"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 * (index + 1) }}
            />
          ))}

          <motion.button
            type="submit"
            disabled={loading}
            className={`btn-gradient w-full ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
            whileHover={{ scale: loading ? 1 : 1.05 }}
            whileTap={{ scale: loading ? 1 : 0.95 }}
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>
        </form>

        <p className="text-center text-gray-400 mt-6">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-blue-400 hover:underline cursor-pointer"
          >
            Sign up
          </span>
        </p>
      </motion.div>
    </motion.div>
  );
}
