/*import React from "react";
import { FaShoppingCart } from "react-icons/fa";

interface FloatingCartButtonProps {
  itemCount: number;
  onClick: () => void;
}

export const FloatingCartButton: React.FC<FloatingCartButtonProps> = ({
  itemCount,
  onClick,
}) => (
  <button
    onClick={onClick}
    className="fixed right-4 bottom-28 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition z-40"
  >
    <FaShoppingCart size={24} />
    {itemCount > 0 && (
      <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
        {itemCount}
      </span>
    )}
  </button>
);*/


// Floating Cart Button
import { FaShoppingCart } from "react-icons/fa";

interface FloatingCartButtonProps {
  itemCount: number;
  onClick: () => void;
}

export const FloatingCartButton: React.FC<FloatingCartButtonProps> = ({
  itemCount,
  onClick,
}) => (
  <button
    onClick={onClick}
    className="fixed right-6 bottom-28 bg-gradient-to-r from-blue-600 to-blue-500 text-white p-4 rounded-full shadow-2xl hover:scale-105 transition-transform duration-300 z-50 relative"
  >
    <FaShoppingCart size={26} />
    {itemCount > 0 && (
      <span className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center font-bold shadow-md">
        {itemCount}
      </span>
    )}
  </button>
);
