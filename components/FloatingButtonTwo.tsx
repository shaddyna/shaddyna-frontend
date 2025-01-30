'use client';
import React, { useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import { useRouter } from 'next/navigation'; // Import useRouter from next/navigation
import { FaEye } from 'react-icons/fa6';

const FloatingButtonTwo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const router = useRouter(); // Initialize the router

  // Toggle the modal visibility
  const handleClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      {/* Floating Button */}
      <button
        className="fixed bottom-48 right-6 bg-[#ff199c] text-white rounded-full p-4 shadow-lg hover:bg-[#ff1379] transition"
        onClick={handleClick}
      >
        <FaEye className="text-xl" />
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-64 relative">
            <h2 className="text-xl font-semibold text-center mb-4">Select an Action</h2>
            <ul className="space-y-3">
              <li>
                <button
                  className="w-full text-center bg-[#ff199c] text-white py-2 rounded hover:bg-[#ff1379] transition"
                  onClick={() => {
                    router.push('/add-skill'); // Navigate to "Add Skill" page
                    setIsModalOpen(false); // Close the modal
                  }}
                >
                  View your Skill
                </button>
              </li>
              <li>
                <button
                  className="w-full text-center bg-[#ff199c] text-white py-2 rounded hover:bg-[#ff1379] transition"
                  onClick={() => {
                    router.push('/shelf-creation'); // Navigate to "Add Skill" page
                    setIsModalOpen(false); // Close the modal
                  }}
                >
                  View Shelf
                </button>
              </li>
              <li>
                <button
                  className="w-full text-center bg-[#ff199c] text-white py-2 rounded hover:bg-[#ff1379] transition"
                >
                  Check StartUp
                </button>
              </li>
              <li>
                <button
                  className="w-full text-center bg-[#ff199c] text-white py-2 rounded hover:bg-[#ff1379] transition"
                >
                  View Forum
                </button>
              </li>
            </ul>
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 font-bold text-xl"
              onClick={() => setIsModalOpen(false)} // Close the modal
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingButtonTwo;
