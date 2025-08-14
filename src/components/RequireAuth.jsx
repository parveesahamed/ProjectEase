// src/components/RequireAuth.jsx
import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";

export default function RequireAuth({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAuthed, setIsAuthed] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Firebase listener
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const tokenExists = !!localStorage.getItem("token");
      setIsAuthed(!!user || tokenExists);
      setLoading(false);
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-lg font-semibold">
        Checking authentication...
      </div>
    );
  }

  if (!isAuthed) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
