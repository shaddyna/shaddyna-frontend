'use client';
import React from 'react';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa'; // Import the back arrow icon

interface BackProps {
  title: string; // Prop to pass the dynamic title
}

const Back: React.FC<BackProps> = ({ title }) => {
  return (
    <header className="text-white p-3 sticky top-0 z-50" style={{ backgroundColor: '#ff199c' }}>
      <div className="container mx-auto flex justify-between items-center">
        {/* Back Arrow */}
        <div className="text-xl sm:text-2xl font-semibold">
          <Link href="#" onClick={() => window.history.back()} passHref>
            <div className="flex items-center justify-center bg-white text-[#182155] rounded-full w-10 h-10 shadow-md cursor-pointer">
              <FaArrowLeft className="text-xl" />
            </div>
          </Link>
        </div>

        {/* Page Title */}
        <div className="flex-grow text-center text-lg sm:text-xl font-semibold">
          {title}
        </div>
      </div>
    </header>
  );
};

export default Back;


