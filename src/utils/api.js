// utils/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "https://moviesite-production-c144.up.railway.app/api",
});

// ✅ Add token automatically to headers
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
