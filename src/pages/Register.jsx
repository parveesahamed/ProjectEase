// src/pages/Register.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // ✅ Client-side validations
    if (!email.trim() || !password.trim()) {
      return setError("❌ Please fill all fields");
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return setError("⚠ Please enter a valid email");
    }
    if (password.length < 6) {
      return setError("⚠ Password must be at least 6 characters");
    }

    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // ✅ Save user locally
      localStorage.setItem("user", JSON.stringify({ email: user.email, uid: user.uid }));

      // ✅ Success feedback
      setSuccess("✅ Account created! Redirecting...");
      setEmail("");
      setPassword("");

      // ✅ Redirect
      setTimeout(() => navigate("/dashboard", { replace: true }), 1000);
    } catch (err) {
      console.error("Registration Error:", err);
      const firebaseErrors = {
        "auth/email-already-in-use": "⚠ Email already in use.",
        "auth/invalid-email": "⚠ Invalid email format.",
        "auth/weak-password": "⚠ Password must be at least 6 characters.",
      };
      setError(firebaseErrors[err.code] || `⚠ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#131C2E] text-white">
      <div className="w-full max-w-md rounded-2xl shadow-lg bg-[#1E293B] p-8">
        <h2 className="text-3xl font-extrabold text-center mb-6 text-blue-400">
          Create your account
        </h2>

        {/* ✅ Feedback Messages */}
        {error && (
          <div className="bg-red-500/20 text-red-400 border border-red-500 px-4 py-2 rounded mb-4 text-center">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-emerald-500/20 text-emerald-300 border border-emerald-500 px-4 py-2 rounded mb-4 text-center">
            {success}
          </div>
        )}

        {/* ✅ Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg bg-[#0F172A] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            minLength={6}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg bg-[#0F172A] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold transition-all ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Creating..." : "Create account"}
          </button>
        </form>

        {/* ✅ Redirect Link */}
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
