import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../UI";
import { useAppStore } from "@/store";

const Navbar = () => {
  const { isLoggedIn, logout } = useAppStore((state) => ({
    isLoggedIn: state.isLoggedIn,
    logout: state.logout,
  }));

  return (
    <nav className="container mx-auto h-16 sticky top-0 glass__bg px-4">
      <div className="flex justify-between items-center h-full">
        <Link to="/" className="font-bold text-xl">
          LoginAuth
        </Link>

        {isLoggedIn && (
          <Button onClick={logout} className="text-sm">
            logout
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
