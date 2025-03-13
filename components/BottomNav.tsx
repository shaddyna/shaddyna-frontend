// components/BottomNavigationBar.tsx
/*"use client"
import { DollarCircleIcon, FavouriteIcon, PlusSignCircleIcon, ShoppingBasket01Icon } from 'hugeicons-react';
import { CircleHelp, DollarSign, Heart, PlusCircleIcon, Search, Store } from 'lucide-react';
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
          href="/sell"
          className={`flex flex-col items-center ${activeLink === 'search' ? activeStyle : inactiveStyle}`}
          onClick={() => handleLinkClick('search')}
        >
          <PlusSignCircleIcon/>
          <span>Sell</span>
        </a>
        <a
          href="/wishlist"
          className={`flex flex-col items-center ${activeLink === 'wishlist' ? activeStyle : inactiveStyle}`}
          onClick={() => handleLinkClick('wishlist')}
        >
          <FavouriteIcon />
          <span>Wishlist</span>
        </a>
        <a
          href="/shops"
          className={`flex flex-col items-center ${activeLink === 'shop' ? activeStyle : inactiveStyle}`}
          onClick={() => handleLinkClick('shop')}
        >
          <ShoppingBasket01Icon />
          <span>Shops</span>
        </a>
        <a
          href="/forum-page"
          className={`flex flex-col items-center ${activeLink === 'help' ? activeStyle : inactiveStyle}`}
          onClick={() => handleLinkClick('help')}
        >
          <DollarCircleIcon />
          <span>Forum</span>
        </a>
      </div>
    </div>
  );
};

export default BottomNavigationBar;*/

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUIStore } from '@/store/ui-store';
import { DollarCircleIcon, FavouriteIcon, PlusSignCircleIcon, ShoppingBasket01Icon, Home02Icon } from 'hugeicons-react';

const BottomNavBar = () => {
  const isDrawerOpen = useUIStore((state) => state.isDrawerOpen);
  const pathname = usePathname() ?? "";

  return (
    <nav className={`fixed bottom-0 left-0 w-full bg-white border-t shadow-md flex justify-around py-2 z-40 transition-transform duration-300 ${
      isDrawerOpen ? 'translate-y-full' : 'translate-y-0'
    }`}>
      <NavItem href="/" icon={Home02Icon} label="Home" pathname={pathname} />
      <NavItem href="/shops" icon={ShoppingBasket01Icon} label="Shops" pathname={pathname} />
      <NavItem href="/sell" icon={PlusSignCircleIcon} label="Sell" pathname={pathname} />
      <NavItem href="/wishlist" icon={FavouriteIcon} label="Wishlist" pathname={pathname} />
      <NavItem href="/forum" icon={DollarCircleIcon} label="Forum" pathname={pathname} />
      {/* ... rest of the nav items ... */}
    </nav>
  );
};
interface NavItemProps {
  href: string;
  icon: React.ComponentType<{ size: number; className: string }>;
  label: string;
  pathname: string;
}

const NavItem: React.FC<NavItemProps> = ({ href, icon: Icon, label, pathname }) => {
  const isActive = pathname === href;

  return (
    <Link href={href} className="flex flex-col items-center">
      <Icon size={24} className={`transition-colors duration-300 ${isActive ? "text-[#bf2c7e]" : "text-[#0f1c47]"}`} />
      <span className={`text-xs font-medium ${isActive ? "text-[#bf2c7e]" : "text-[#0f1c47]"}`}>{label}</span>
    </Link>
  );
};

export default BottomNavBar;



