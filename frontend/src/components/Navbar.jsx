import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray shadow-md px-6 py-4 flex justify-between items-center">
      <div className="flex space-x-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `text-gray-700 hover:text-blue-600 font-medium ${isActive ? "border-b-2 border-blue-600" : ""}`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `text-gray-700 hover:text-blue-600 font-medium ${isActive ? "border-b-2 border-blue-600" : ""}`
          }
        >
          About
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `text-gray-700 hover:text-blue-600 font-medium ${isActive ? "border-b-2 border-blue-600" : ""}`
          }
        >
          Contact
        </NavLink>
        <NavLink
          to="/signup"
          className={({ isActive }) =>
            `text-gray-700 hover:text-blue-600 font-medium ${isActive ? "border-b-2 border-blue-600" : ""}`
          }
        >
          Sign Up
        </NavLink>
        <NavLink
          to="/login"
          className={({ isActive }) =>
            `text-gray-700 hover:text-blue-600 font-medium ${isActive ? "border-b-2 border-blue-600" : ""}`
          }
        >
          Login
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
