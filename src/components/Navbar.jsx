import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <nav className="bg-gray-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link
              to="/"
              className="text-2xl font-bold tracking-wide hover:text-teal-400 transition duration-300"
            >
              Recipe Sharing App
            </Link>
          </div>

          <div className="hidden md:flex space-x-6">
            <NavLink to="/my-recipe" label="Your Recipes" />
            <NavLink to="/create-recipe" label="Create Recipe" />
            <NavLink to="/" label="Dashboard" />
            <NavLink to="/my-fav-recipe" label="Favourite Recipes" />
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 rounded-md hover:bg-red-600 transition duration-300 shadow-md"
            >
              Logout
            </button>
            <Link to="/profile">
              <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
                <span className="text-lg">👤</span>
              </div>
            </Link>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-gray-300 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-2">
          <NavLink to="/my-recipe" label="Your Recipes" />
          <NavLink to="/create-recipe" label="Create Recipe" />
          <NavLink to="/" label="Dashboard" />
          <NavLink to="/my-fav-recipe" label="Favourite Recipes" />
          <button
            onClick={handleLogout}
            className="block text-sm mt-2 px-4 py-2 bg-red-500 rounded-md hover:bg-red-600 transition duration-300"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

const NavLink = ({ to, label }) => (
  <Link
    to={to}
    className="relative text-sm font-medium text-white after:absolute after:w-full after:h-[2px] after:scale-x-0 after:bg-teal-400 after:bottom-0 after:left-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
  >
    {label}
  </Link>
);
