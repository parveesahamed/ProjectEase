// src/components/Signup.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { name, email, password, role } = form;
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("❌ Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      // ✅ Sending all data: name, email, password, role
      const res = await api.post("/register", { name, email, password, role });

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
      <div className="login-box w-full animate-fadeIn">
        <h2 className="text-3xl font-extrabold text-center mb-6 gradient-text">
          Signup
        </h2>

        {error && (
          <div className="bg-red-500/20 text-red-400 border border-red-500 px-4 py-2 rounded mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map(({ name, type, placeholder, autoComplete }) => (
            <input
              key={name}
              type={type}
              name={name}
              placeholder={placeholder}
              value={form[name]}
              onChange={handleChange}
              autoComplete={autoComplete}
              className="input-glass"
            />
          ))}

          {/* Role Selection */}
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="input-glass"
          >
            <option value="Admin">Admin</option>
            <option value="Student">Student</option>
            <option value="Developer">Developer</option>
            <option value="Employee">Employee</option>
          </select>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`btn-gradient w-full ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-400 hover:underline cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
