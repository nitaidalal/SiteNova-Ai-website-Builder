import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/" replace state={{ from: location }} />; //state- pass the current location to redirect back after login
  }
  return <Outlet />; //Outlet- render the child route component (Dashboard) if authenticated
};

export default ProtectedRoute;
