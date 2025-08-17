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
      [e.target.name]: e.target.value.trimStart(),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.password) {
      return setError("⚠ Please fill in all fields.");
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      return setError("⚠ Please enter a valid email address.");
    }
    if (form.password.length < 6) {
      return setError("⚠ Password must be at least 6 characters.");
    }

    try {
      setLoading(true);

      // Create Firebase user
      const cred = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      // Update profile safely
      await updateProfile(cred.user, { displayName: form.name }).catch(console.error);

      // Get token safely
      const token = await cred.user.getIdToken(true);

      // Save user in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          uid: cred.user.uid,
          name: form.name,
          email: form.email,
          role: form.role,
        })
      );

      // Redirect
      navigate("/dashboard");
    } catch (err) {
      console.error("Signup error:", err);

      let message = "Signup failed. Please try again.";
      if (err.code === "auth/email-already-in-use") {
        message = "⚠ This email is already registered.";
      } else if (err.code === "auth/weak-password") {
        message = "⚠ Password must be at least 6 characters.";
      } else if (err.code === "auth/invalid-email") {
        message = "⚠ Invalid email format.";
      } else {
        message = err.message || message;
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#131C2E] text-white px-4">
      <div className="bg-[#1E293B] p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-center mb-6 text-blue-400">
          Create Account
        </h2>

        {error && (
          <div className="bg-red-500/20 text-red-400 border border-red-500 px-4 py-2 rounded mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" placeholder="Full Name" value={form.name} onChange={onChange} />
          <input type="email" name="email" placeholder="you@example.com" value={form.email} onChange={onChange} />
          <input type="password" name="password" placeholder="••••••••" value={form.password} onChange={onChange} />

          <select name="role" value={form.role} onChange={onChange}>
            <option value="Admin">Admin</option>
            <option value="Developer">Developer</option>
            <option value="Student">Student</option>
            <option value="Employee">Employee</option>
          </select>

          <button type="submit" disabled={loading}>
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
