import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const toggleProfileMenu = () => setIsProfileMenuOpen((prev) => !prev);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login"); // Navigate to login after logout
  };

  return (
    <nav className="bg-teal-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold tracking-wide">
            Recipe App
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6">
            <NavLink to="/my-recipe" label="Your Recipes" />
            <NavLink to="/create-recipe" label="Create Recipe" />
            <NavLink to="/" label="Dashboard" />
            <NavLink to="/my-fav-recipe" label="Favourite Recipes" />
          </div>

          {/* Profile Icon & Hamburger Menu */}
          <div className="flex items-center space-x-4">
            {/* Profile Icon */}
            <div className="relative">
              <button
                onClick={toggleProfileMenu}
                className="p-2 rounded-full bg-white text-teal-600 hover:scale-110 transition"
              >
                👤
              </button>
              {/* Profile Dropdown */}
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-800 hover:bg-teal-500 hover:text-white transition"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-gray-800 hover:bg-red-500 hover:text-white transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* Hamburger Menu Button for Mobile */}
            <button
              onClick={toggleMobileMenu}
              className="text-white hover:text-gray-300 md:hidden focus:outline-none"
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

      {/* Mobile Menu */}
      <div
        className={`${
          isMobileMenuOpen ? "block" : "hidden"
        } md:hidden bg-teal-500 px-2 pt-2 pb-3 space-y-2`}
      >
        <NavLink to="/my-recipe" label="Your Recipes" onClick={toggleMobileMenu} />
        <NavLink to="/create-recipe" label="Create Recipe" onClick={toggleMobileMenu} />
        <NavLink to="/" label="Dashboard" onClick={toggleMobileMenu} />
        <NavLink to="/my-fav-recipe" label="Favourite Recipes" onClick={toggleMobileMenu} />
        <button
          onClick={handleLogout}
          className="block w-full text-left px-4 py-2 text-white bg-red-500 rounded-lg mt-2 hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

const NavLink = ({ to, label, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="block text-sm font-medium text-white hover:text-teal-300 transition duration-300"
  >
    {label}
  </Link>
);
