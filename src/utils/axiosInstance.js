import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
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
      // console.log('token:', token); 
      // console.log("config:", config)
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosSecure.interceptors.response.use( 
    
    function (response){
      return response
    },
    async function (error) {
      
      const navigate = useNavigate();
      const {logoutUser} = useAuth();
      const status = error.response.status;
      if (status === 401 || status === 403) {
        await logoutUser();
        navigate("/login");
      }
      // console.log("status error in interceptors ", status);
      return Promise.reject(error);
    }
  )