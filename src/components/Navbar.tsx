import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-between py-4">
      <Link to="/" className="font-bold text-xl">
        LoginAuth
      </Link>
    </nav>
  );
};

export default Navbar;
