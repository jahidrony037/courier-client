/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthService } from "../services/useAuthService";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const { logOutUser } = useAuthService();
  const [user, setUser] = useState(
    () => JSON.parse(localStorage.getItem("user")) || null
  );
  const [token, setToken] = useState(
    () => localStorage.getItem("token") || null
  );

  const isAuthenticated = !!token;

  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", authToken);
  };
  const logout = async () => {
    try {
      const res = await logOutUser();
      if (res?.message) {
        toast.success(res.message);
      } else {
        toast.error("Logout failed. Please try again.");
      }
      setUser(null);
      setToken(null);
      localStorage.removeItem("user");
      localStorage.removeItem("token");

      // Optionally, navigate to login page (if needed)

      Navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, token, isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
