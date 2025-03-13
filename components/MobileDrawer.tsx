"use client";
import React from "react";
import {
  FaTimes,
  FaBalanceScale,
  FaLifeRing,
  FaSignOutAlt,
  FaUserAlt,
  FaCogs,
  FaTruck,
  FaShoppingBag,
  FaBlog,
} from "react-icons/fa";
import { ShoppingCart01Icon, Menu01Icon } from "hugeicons-react";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentUserRole?: 'customer' | 'seller' | 'admin' | null; // Add union type with null
  handleSellClick: () => void;
  handleAdminClick: () => void;
  handleUserClick: () => void;
  handleHelpClick: () => void;
  handleClick: () => void;
  isLoggedIn: boolean;
  logout: () => void;
}

export const MobileDrawer = ({
  isOpen,
  onClose,
  currentUserRole,
  handleSellClick,
  handleAdminClick,
  handleUserClick,
  handleHelpClick,
  handleClick,
  isLoggedIn,
  logout,
}: MobileDrawerProps) => (
  <div
    className={`fixed inset-0 bg-gray-800 bg-opacity-50 transition-all duration-300 ${
      isOpen ? "block" : "hidden"
    } z-50`}
    onClick={onClose}
  >
    <div
      className="bg-white p-4 w-64 h-full flex flex-col space-y-6"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        className="text-2xl p-2 hover:bg-gray-100 text-gray-800 rounded-full"
        onClick={onClose}
      >
        <FaTimes />
      </button>

      {(currentUserRole === "seller" || currentUserRole === "admin") && (
        <button
          className="flex items-center px-4 py-2 text-sm text-gray-800 font-medium hover:bg-gray-100 rounded-full"
          onClick={handleSellClick}
        >
          <ShoppingCart01Icon className="mr-2" />
          My Shop
        </button>
      )}

      {currentUserRole === "admin" && (
        <>
          <button
            className="flex items-center px-4 py-2 text-sm text-gray-800 font-medium hover:bg-gray-100 rounded-full"
            onClick={handleAdminClick}
          >
            <FaCogs className="mr-2" />
            Admin Panel
          </button>
          <button
            className="flex items-center px-4 py-2 text-sm text-gray-800 font-medium hover:bg-gray-100 rounded-full"
            onClick={handleClick}
          >
            <FaTruck className="mr-2" />
            Delivery
          </button>
        </>
      )}

      <button className="flex items-center px-4 py-2 text-sm text-gray-800 font-medium hover:bg-gray-100 rounded-full">
        <FaBalanceScale className="mr-2" />
        Compare
      </button>

      <button className="flex items-center px-4 py-2 text-sm text-gray-800 font-medium hover:bg-gray-100 rounded-full">
        <FaBlog className="mr-2" />
        Blog
      </button>

      <button
        className="flex items-center px-4 py-2 text-sm text-gray-800 font-medium hover:bg-gray-100 rounded-full"
        onClick={handleUserClick}
      >
        <FaUserAlt className="mr-2" />
        My Profile
      </button>

      <button
        className="flex items-center px-4 py-2 text-sm text-gray-800 font-medium hover:bg-gray-100 rounded-full"
        onClick={handleHelpClick}
      >
        <FaLifeRing className="mr-2" />
        Help?
      </button>

      {isLoggedIn ? (
        <button
          onClick={logout}
          className="flex items-center px-4 py-2 text-sm text-gray-800 font-medium hover:bg-gray-100 rounded-full"
        >
          <FaSignOutAlt className="mr-2" />
          Logout
        </button>
      ) : null}
    </div>
  </div>
);