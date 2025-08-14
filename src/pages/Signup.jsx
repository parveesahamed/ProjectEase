// src/pages/Signup.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "Employee",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
      setError("⚠ Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      const cred = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      await updateProfile(cred.user, { displayName: form.name });

      const token = await cred.user.getIdToken();

      localStorage.setItem("token", token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: form.name,
          email: form.email,
          role: form.role,
        })
      );

      navigate("/dashboard", { replace: true });
    } catch (err) {
      let message = err.message || "Signup failed";
      if (err.code === "auth/email-already-in-use") {
        message = "This email is already registered.";
      } else if (err.code === "auth/weak-password") {
        message = "Password should be at least 6 characters.";
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#131C2E] text-white px-4">
      <div className="bg-[#1E293B] p-8 rounded-2xl shadow-lg w-full max-w-md transition-all duration-300 hover:shadow-blue-500/30 hover:scale-[1.01]">
        <h2 className="text-3xl font-extrabold text-center mb-6 text-blue-400">
          Create Account
        </h2>

        {error && (
          <div className="bg-red-500/20 text-red-400 border border-red-500 px-4 py-2 rounded mb-4 text-center animate-pulse">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full p-3 rounded-lg bg-[#0F172A] text-white placeholder-gray-400 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={onChange}
            autoComplete="name"
          />
          <input
            className="w-full p-3 rounded-lg bg-[#0F172A] text-white placeholder-gray-400 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            type="email"
            name="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={onChange}
            autoComplete="email"
          />
          <input
            className="w-full p-3 rounded-lg bg-[#0F172A] text-white placeholder-gray-400 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            type="password"
            name="password"
            placeholder="••••••••"
            value={form.password}
            onChange={onChange}
            autoComplete="new-password"
          />

          {/* Role Selection */}
          <select
            name="role"
            value={form.role}
            onChange={onChange}
            className="w-full p-3 rounded-lg bg-[#0F172A] text-white 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          >
            <option value="Admin">Admin</option>
            <option value="Developer">Developer</option>
            <option value="Student">Student</option>
            <option value="Employee">Employee</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 hover:scale-[1.02]"
            }`}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
