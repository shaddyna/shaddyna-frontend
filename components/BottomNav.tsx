// StickyBottomNavbar.tsx
"use client";

/*import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, ShoppingBag, ShoppingBagIcon, HomeIcon, HeartIcon, Brain, ShoppingBasket, ShoppingCart, Home } from "lucide-react";

const StickyBottomNavbar = () => {
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/", icon: <Home size={24} /> },
    { name: "Cart", href: "/cart", icon: <ShoppingBag size={24} /> },
    { name: "Shops", href: "/shops", icon: <ShoppingCart size={24} /> },
    { name: "Hub", href: "/hub", icon: <Brain size={24} /> },
    { name: "Account", href: "/account", icon: <User size={24} /> },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg border-t border-gray-200 py-2 px-4 z-50 md:hidden">
      <div className="flex justify-around items-center">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={`flex flex-col items-center justify-center text-gray-600 hover:text-gray-800 transition-colors ${
              pathname === link.href ? "text-[#bf2c7e]" : ""
            }`}
          >
            {link.icon}
            <span className="text-xs">{link.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default StickyBottomNavbar;*/

// StickyBottomNavbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, ShoppingBag, ShoppingCart, Brain, Home } from "lucide-react";

const StickyBottomNavbar = () => {
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/", icon: <Home size={24} /> },
    { name: "Cart", href: "/cart", icon: <ShoppingBag size={24} /> },
    { name: "Shops", href: "/shops", icon: <ShoppingCart size={24} /> },
    { name: "Hub", href: "/hub", icon: <Brain size={24} /> },
    { name: "Account", href: "/account", icon: <User size={24} /> },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg border-t border-gray-200 py-2 px-4 z-50 md:hidden">
      <div className="flex justify-around items-center">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={`flex flex-col items-center justify-center text-gray-600 hover:text-gray-800 transition-colors ${
              pathname === link.href ? "text-[#bf2c7e]" : ""
            }`}
          >
            {link.icon}
            <span className="text-xs">{link.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default StickyBottomNavbar;