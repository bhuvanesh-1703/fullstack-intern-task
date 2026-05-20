import axios from "axios";

/**
 * Backend mounts routes under /api (see server/app.js).
 * VITE_API_URL may be set with or without /api for Vercel/Render deploys.
 */
export const getApiBaseUrl = () => {
  const fallback = "http://localhost:5100/api";
  const raw = (import.meta.env.VITE_API_URL || fallback).trim();

  const withoutTrailingSlash = raw.replace(/\/+$/, "");

  if (withoutTrailingSlash.endsWith("/api")) {
    return withoutTrailingSlash;
  }

  return `${withoutTrailingSlash}/api`;
};

const API = axios.create({
  baseURL: getApiBaseUrl(),
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;
