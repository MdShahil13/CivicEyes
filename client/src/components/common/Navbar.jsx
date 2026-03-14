import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          CivicEye
        </Link>

        <div className="hidden md:flex gap-6 text-sm font-medium text-slate-700">
          <Link to="/home" className="hover:text-blue-600">
            Home
          </Link>
          <Link to="/report" className="hover:text-blue-600">
            Report
          </Link>
          <Link to="/helpers" className="hover:text-blue-600">
            Helpers
          </Link>
          <Link to="/rating" className="hover:text-blue-600">
            Rating
          </Link>
          <Link to="/login" className="hover:text-blue-600">
            Logout
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;