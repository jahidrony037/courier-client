import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
export const axiosPublic = axios.create({
    baseURL: BASE_URL,
  });

export const axiosSecure = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
  });

axiosSecure.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );