import axios from "axios";

// Must end with /api because backend uses app.use("/api/auth", ...)
let baseURL = import.meta.env.VITE_API_URL || "http://localhost:5100/api";

if (!baseURL.endsWith("/api")) {
  baseURL = baseURL + "/api";
}

const API = axios.create({
  baseURL: baseURL,
});

// Add JWT token to every request if user is logged in
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;
