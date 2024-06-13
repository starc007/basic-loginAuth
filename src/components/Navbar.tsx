import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./UI";
import { useAppStore } from "@/store";

const Navbar = () => {
  const { isLoggedIn, logout } = useAppStore((state) => ({
    isLoggedIn: state.isLoggedIn,
    logout: state.logout,
  }));

  return (
    <nav className="flex justify-between py-4">
      <Link to="/" className="font-bold text-xl">
        LoginAuth
      </Link>

      {isLoggedIn && (
        <Button onClick={logout} className="text-sm">
          logout
        </Button>
      )}
    </nav>
  );
};

export default Navbar;
