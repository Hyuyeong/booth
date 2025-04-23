// ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { isAuthenticated, getUserRole } from "../services/Auth";

const ProtectedRoute = ({ children, role }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  if (role && getUserRole() !== role) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
