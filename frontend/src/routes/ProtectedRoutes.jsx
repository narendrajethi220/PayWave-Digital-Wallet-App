import { useAuth } from "../provider/AuthProvider";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/signin" />;
};
export default ProtectedRoutes;
