import { useAppStore } from "@/store";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { isLoggedIn, user } = useAppStore((state) => ({
    isLoggedIn: state.isLoggedIn,
    user: state.user,
  }));

  const isAuthenticated = isLoggedIn || user !== null;

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
