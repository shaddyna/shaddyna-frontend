"use client";

import React from "react";
import { FaTimes, FaShoppingCart, FaBox, FaBalanceScale, FaBlog, FaTruck, FaCogs, FaUserAlt, FaLifeRing, FaSignOutAlt } from "react-icons/fa";

interface NavigationDrawerProps {
  isDrawerOpen: boolean;
  toggleDrawer: () => void;
  handleClick: () => void;
}

const NavigationDrawer: React.FC<NavigationDrawerProps> = ({ isDrawerOpen, toggleDrawer, handleClick }) => {
  return (
    <div
      className={`fixed inset-0 bg-gray-800 bg-opacity-50 transition-all duration-300 ${
        isDrawerOpen ? "block" : "hidden"
      }`}
      onClick={toggleDrawer} // Close drawer when the background is clicked
    >
      <div
        className="bg-white p-4 w-64 h-full flex flex-col space-y-6"
        onClick={(e) => e.stopPropagation()} // Prevent closing the drawer when clicking inside
      >
        <button
          className="text-2xl p-2 hover:bg-gray-100 rounded-full"
          onClick={toggleDrawer}
        >
          <FaTimes />
        </button>

        <button className="flex items-center px-4 py-2 text-sm font-medium hover:bg-gray-100 rounded-full">
          <FaShoppingCart className="mr-2" /> {/* Icon for Start Selling */}
          Start selling
        </button>

        <button className="flex items-center px-4 py-2 text-sm font-medium hover:bg-gray-100 rounded-full">
          <FaBox className="mr-2" /> {/* Icon for My Orders */}
          My orders
        </button>

        <button className="flex items-center px-4 py-2 text-sm font-medium hover:bg-gray-100 rounded-full">
          <FaBalanceScale className="mr-2" /> {/* Icon for Compare */}
          Compare
        </button>

        <button className="flex items-center px-4 py-2 text-sm font-medium hover:bg-gray-100 rounded-full">
          <FaBlog className="mr-2" /> {/* Icon for Blog */}
          Blog
        </button>

        <button
          className="flex items-center px-4 py-2 text-sm font-medium hover:bg-gray-100 rounded-full"
          onClick={handleClick} // Trigger the navigation on click
        >
          <FaTruck className="mr-2" /> {/* Icon for Delivery */}
          Delivery
        </button>

        <button className="flex items-center px-4 py-2 text-sm font-medium hover:bg-gray-100 rounded-full">
          <FaCogs className="mr-2" /> {/* Icon for Admin Panel */}
          Admin Panel
        </button>

        <button className="flex items-center px-4 py-2 text-sm font-medium hover:bg-gray-100 rounded-full">
          <FaUserAlt className="mr-2" /> {/* Icon for My Profile */}
          My Profile
        </button>

        <button className="flex items-center px-4 py-2 text-sm font-medium hover:bg-gray-100 rounded-full">
          <FaLifeRing className="mr-2" /> {/* Icon for Help */}
          Help?
        </button>

        <button className="flex items-center px-4 py-2 text-sm font-medium hover:bg-gray-100 rounded-full">
          <FaSignOutAlt className="mr-2" /> {/* Icon for Logout */}
          Logout
        </button>
      </div>
    </div>
  );
};

export default NavigationDrawer;
