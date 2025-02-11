import React from 'react';
import Link from 'next/link';
import { FaInfoCircle, FaCogs, FaPhone } from 'react-icons/fa'; // Import icons

const Header: React.FC = () => {
  return (
    <header className="text-white p-2" style={{ backgroundColor: "#ff199c" }}>
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl sm:text-xl font-semibold"> {/* Adjust logo size for small screens */}
          <Link href="/">
            <span className="text-white">Shaddyna</span>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav>
          <ul className="flex space-x-4">
            {/* Use icons instead of text on small screens */}
            <li className="sm:hidden">
              <Link href="">
                <FaInfoCircle className="text-white" />
              </Link>
            </li>
            <li className="sm:hidden">
              <Link href="">
                <FaCogs className="text-white" />
              </Link>
            </li>
            <li className="sm:hidden">
              <Link href="">
                <FaPhone className="text-white" />
              </Link>
            </li>

            {/* Text links for larger screens */}
            <li className="hidden sm:block">
            <Link href="" className="text-white hover:text-white">About</Link>


            </li>
            <li className="hidden sm:block">
              <Link href="" className="text-white hover:text-white">Services</Link>
            </li>
            <li className="hidden sm:block">
              <Link href="" className="text-white hover:text-white">Contact</Link>
            </li>
                      </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header

