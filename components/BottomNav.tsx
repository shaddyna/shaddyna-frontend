// components/BottomNavigationBar.tsx
"use client"
import { CircleHelp, Heart, Search, Store } from 'lucide-react';
import React, { useState } from 'react';
import { FaHeart, FaSearch, FaStore, FaQuestionCircle } from 'react-icons/fa';

const BottomNavigationBar: React.FC = () => {
  const [activeLink, setActiveLink] = useState<string>('wishlist'); // Initialize active link as 'wishlist'

  // Function to set the active link when clicked
  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  // Define the active style with the color #ff199c
  const activeStyle = 'text-[#182155]';
  const inactiveStyle = 'text-[#182155]';

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white shadow-md z-10">
      <div className="flex justify-around items-center py-2">
        <a
          href="/search"
          className={`flex flex-col items-center ${activeLink === 'search' ? activeStyle : inactiveStyle}`}
          onClick={() => handleLinkClick('search')}
        >
          <Search />
          <span>Search</span>
        </a>
        <a
          href="/wishlist"
          className={`flex flex-col items-center ${activeLink === 'wishlist' ? activeStyle : inactiveStyle}`}
          onClick={() => handleLinkClick('wishlist')}
        >
          <Heart />
          <span>Wishlist</span>
        </a>
        <a
          href="/shops"
          className={`flex flex-col items-center ${activeLink === 'shop' ? activeStyle : inactiveStyle}`}
          onClick={() => handleLinkClick('shop')}
        >
          <Store />
          <span>Shops</span>
        </a>
        <a
          href="/help"
          className={`flex flex-col items-center ${activeLink === 'help' ? activeStyle : inactiveStyle}`}
          onClick={() => handleLinkClick('help')}
        >
          <CircleHelp />
          <span>Help</span>
        </a>
      </div>
    </div>
  );
};

export default BottomNavigationBar;

