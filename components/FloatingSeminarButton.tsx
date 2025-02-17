'use client';
import React, { useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import { useRouter } from 'next/navigation'; // Import useRouter from next/navigation

const FloatingButton = () => {
  const [] = useState(false); // State to control modal visibility
  const router = useRouter(); // Initialize the router

  return (
    <div>
      {/* Floating Button */}
      <button
        className="fixed bottom-24 right-6 bg-[#ff199c] text-white rounded-full p-4 shadow-lg hover:bg-[#ff1379] transition"
        onClick={() => {
            router.push('/add-seminar'); // Navigate to "Add Skill" page
          }}
      >
        <FaPlusCircle className="text-xl" />
      </button>

    </div>
  );
};

export default FloatingButton;
