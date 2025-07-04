import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const PrivateRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth(); // Get the user from context (already stored after login)
  const location = useLocation(); // Get the current location (for redirecting)

  // If no user or user role is not in allowedRoles, redirect to login or home
  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
