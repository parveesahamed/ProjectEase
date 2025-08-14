// src/utils/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://reqres.in/api", // Change to your actual backend API
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    // API key from Vite env (optional)
    const apiKey = import.meta.env.VITE_API_KEY;
    if (apiKey) {
      config.headers["x-api-key"] = apiKey;
    }

    // Bearer token from localStorage (if available)
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.error("❌ Request Error:", error);
    return Promise.reject(error);
  }
);

// Response Interceptor (optional)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("❌ API Response Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
