import { useAppStore } from "@/store";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { isLoggedIn, checkSession } = useAppStore((state) => ({
    isLoggedIn: state.isLoggedIn,
    checkSession: state.checkSession,
  }));
  const [isLoading, setIsLoading] = useState(isLoggedIn ? false : true);

  useEffect(() => {
    // If user is not logged in and  not loading
    // Check the session to see if the user is logged in

    if (!isLoggedIn && isLoading) {
      setIsLoading(true);
      checkSession().then(() => {
        setIsLoading(false);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, isLoading]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center mt-10">
        <p className="text-xl font-semibold">Loading...</p>
      </div>
    );
  }

  // If user is logged in, Allow the user to access private routes
  // If user is not logged in, Redirect the user to login page
  return isLoggedIn ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
