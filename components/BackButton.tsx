"use client"
import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";

const BackButton: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensures the button only works on the client
  }, []);

  if (!isClient) {
    return null; // Do not render the button on the server
  }

  return (
    <button
      onClick={() => window.history.back()}
      className="flex items-center space-x-2 bg-[#ff199c] text-white px-5 py-2 rounded-lg text-base font-semibold hover:bg-pink-700 hover:scale-105 transition-all duration-300"
      aria-label="Go back"
    >
      <FaArrowLeft className="text-2xl" /> {/* Left arrow icon */}
      <span className="hidden sm:inline-block">Back</span> {/* Optional text for better accessibility */}
    </button>
  );
};

export default BackButton;
