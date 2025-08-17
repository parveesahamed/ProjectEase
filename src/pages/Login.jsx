// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email.trim() || !form.password.trim()) {
      setError("⚠ Please enter both email and password");
      return;
    }

    try {
      setLoading(true);

      const cred = await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      // Store token & user data
      const token = await cred.user.getIdToken();
      localStorage.setItem("token", token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: cred.user.displayName || "User",
          email: cred.user.email,
        })
      );

      navigate("/dashboard", { replace: true });
    } catch (err) {
      console.error("Login Error:", err);
      switch (err.code) {
        case "auth/invalid-credential":
          setError("❌ Invalid email or password.");
          break;
        case "auth/user-not-found":
          setError("❌ No account found with this email.");
          break;
        case "auth/wrong-password":
          setError("❌ Incorrect password.");
          break;
        case "auth/too-many-requests":
          setError("⚠ Too many failed attempts. Try again later.");
          break;
        default:
          setError(`⚠ ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white">
      <div className="bg-[#1E293B]/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-700">
        <h2 className="text-3xl font-extrabold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          Login
        </h2>

        {error && (
          <div className="bg-red-500/20 text-red-400 border border-red-500 px-4 py-2 rounded mb-4 text-center animate-pulse">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full p-3 rounded-lg bg-[#0F172A] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            type="email"
            name="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={onChange}
            autoComplete="username"
          />
          <input
            className="w-full p-3 rounded-lg bg-[#0F172A] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            type="password"
            name="password"
            placeholder="••••••••"
            value={form.password}
            onChange={onChange}
            autoComplete="current-password"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-[1.02]"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-400 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
