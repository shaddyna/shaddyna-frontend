/*"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag, User, Search, Heart } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/stores/cartStore";
import { useWishlistStore } from "@/stores/wishlistStore";

const NavbarTwo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const itemCount = useCartStore((state) => state.itemCount());
  const wishlistCount = useWishlistStore((state) => state.items.length);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "" },
    { name: "Products", href: "/collections" },
    { name: "Shops", href: "/shops" },
    { name: "Hub", href: "/hub" },
    { name: "Contact", href: "" },
  ];

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed w-full z-50 bg-white shadow-md transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center">
            <Link href="/" className="text-black font-bold text-2xl">
              <span className="group relative">
                <span className="block group-hover:opacity-0 transition-opacity text-[#0f1c47]">Shaddyna</span>
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-clip-text text-[#0f1c47] bg-gradient-to-r from-[#bf2c7e] to-[#0f1c47]">
                  Shaddyna
                </span>
              </span>
            </Link>
          </motion.div>

          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={handleLinkClick}
                className={`relative text-black/80 hover:text-black transition-colors ${pathname === link.href ? "text-[#bf2c7e]" : ""}`}
                whileHover={{ scale: 1.05 }}
              >
                {link.name}
                {pathname === link.href && (
                  <motion.span
                    layoutId="activeLink"
                    className="absolute left-0 bottom-0 w-full h-px bg-[#bf2c7e]"
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                )}
              </motion.a>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-6">
            <Link href="/search" passHref legacyBehavior>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-black/80 hover:text-black transition-colors"
              >
                <Search size={20} />
              </motion.a>
            </Link>
            <Link href="/wishlist" passHref legacyBehavior>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-black/80 hover:text-black transition-colors relative"
              >
                <Heart size={20} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#bf2c7e] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </motion.a>
            </Link>
            <Link href="/cart" passHref legacyBehavior>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-black/80 hover:text-black transition-colors relative"
              >
                <ShoppingBag size={20} />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#bf2c7e] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </motion.a>
            </Link>
            <Link href="/account" passHref legacyBehavior>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-black/80 hover:text-black transition-colors"
              >
                <User size={20} />
              </motion.a>
            </Link>
          </div>

          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-black"
            whileTap={{ scale: 0.9 }}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", damping: 25 }}
            className="md:hidden bg-white shadow-lg border-t border-gray-200"
          >
            <div className="px-4 py-6 space-y-6">
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={handleLinkClick}
                  className={`block text-black/80 hover:text-black text-lg ${pathname === link.href ? "text-[#bf2c7e] font-medium" : ""}`}
                  whileHover={{ x: 5 }}
                >
                  {link.name}
                </motion.a>
              ))}
              <div className="flex items-center space-x-6 pt-6">
                <Link href="/search" passHref legacyBehavior>
                  <motion.a whileHover={{ scale: 1.1 }} className="text-black/80 hover:text-black">
                    <Search size={20} />
                  </motion.a>
                </Link>
                <Link href="/wishlist" passHref legacyBehavior>
                  <motion.a whileHover={{ scale: 1.1 }} className="text-black/80 hover:text-black relative">
                    <Heart size={20} />
                    {wishlistCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-[#bf2c7e] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        {wishlistCount}
                      </span>
                    )}
                  </motion.a>
                </Link>
                <Link href="/cart" passHref legacyBehavior>
                  <motion.a whileHover={{ scale: 1.1 }} className="text-black/80 hover:text-black relative">
                    <ShoppingBag size={20} />
                    {itemCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-[#bf2c7e] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        {itemCount}
                      </span>
                    )}
                  </motion.a>
                </Link>
                <Link href="/account" passHref legacyBehavior>
                  <motion.a whileHover={{ scale: 1.1 }} className="text-black/80 hover:text-black">
                    <User size={20} />
                  </motion.a>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default NavbarTwo;
*/
"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag, User, Search, Heart } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/stores/cartStore";
import { useWishlistStore } from "@/stores/wishlistStore";
import { useRouter } from "next/navigation";

const NavbarTwo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const itemCount = useCartStore((state) => state.itemCount());
  const wishlistCount = useWishlistStore((state) => state.items.length);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "" },
    { name: "Products", href: "/collections" },
    { name: "Shops", href: "/shops" },
    { name: "Hub", href: "/hub" },
    { name: "Contact", href: "" },
  ];

  const handleLinkClick = () => {
    setIsOpen(false);
  };
   
  const router = useRouter();

    const handleClick = () => {
    router.push("/cart");
  };


  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed w-full z-50 bg-white shadow-md transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center">
            <Link href="/" className="text-black font-bold text-2xl">
              <span className="group relative">
                <span className="block group-hover:opacity-0 transition-opacity">Shaddyna</span>
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-clip-text text-transparent bg-gradient-to-r from-[#bf2c7e] to-[#0f1c47]">
                  Shaddyna
                </span>
              </span>
            </Link>
          </motion.div>

          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={handleLinkClick}
                className={`relative text-black/80 hover:text-black transition-colors ${pathname === link.href ? "text-[#bf2c7e]" : ""}`}
                whileHover={{ scale: 1.05 }}
              >
                {link.name}
                {pathname === link.href && (
                  <motion.span
                    layoutId="activeLink"
                    className="absolute left-0 bottom-0 w-full h-px bg-[#bf2c7e]"
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                )}
              </motion.a>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-6">
            {/*<Link href="/search" passHref legacyBehavior>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-black/80 hover:text-black transition-colors"
              >
                <Search size={20} />
              </motion.a>
            </Link>*/}
            <Link href="/wishlist" passHref legacyBehavior>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-black/80 hover:text-black transition-colors relative"
              >
                <Heart size={20} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#bf2c7e] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </motion.a>
            </Link>
            <Link href="/cart" passHref legacyBehavior>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-black/80 hover:text-black transition-colors relative"
              >
                <ShoppingBag size={20} />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#bf2c7e] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </motion.a>
            </Link>
            <Link href="/account" passHref legacyBehavior>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-black/80 hover:text-black transition-colors"
              >
                <User size={20} />
              </motion.a>
            </Link>
          </div>
          <div className="">
          <motion.button
            onClick={handleClick}
            className="md:hidden text-black relative"
            whileTap={{ scale: 0.9 }}
          >
            <ShoppingBag size={22} />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#bf2c7e] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </motion.button>
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text- ml-4"
            whileTap={{ scale: 0.9 }}
          >
            {isOpen ? <X size={24} /> : <Menu className="text-black" size={24} />}
          </motion.button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", damping: 25 }}
            className="md:hidden bg-white shadow-lg border-t border-gray-200"
          >
            <div className="px-4 py-6 space-y-6">
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={handleLinkClick}
                  className={`block text-black/80 hover:text-black text-lg ${pathname === link.href ? "text-[#bf2c7e] font-medium" : ""}`}
                  whileHover={{ x: 5 }}
                >
                  {link.name}
                </motion.a>
              ))}
              <div className="flex items-center space-x-6 pt-6">
                {/*<Link href="/search" passHref legacyBehavior>
                  <motion.a whileHover={{ scale: 1.1 }} className="text-black/80 hover:text-black">
                    <Search size={20} />
                  </motion.a>
                </Link>*/}
                <Link href="/wishlist" passHref legacyBehavior>
                  <motion.a whileHover={{ scale: 1.1 }} className="text-black/80 hover:text-black relative">
                    <Heart size={20} />
                    {wishlistCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-[#bf2c7e] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        {wishlistCount}
                      </span>
                    )}
                  </motion.a>
                </Link>
                <Link href="/cart" passHref legacyBehavior>
                  <motion.a whileHover={{ scale: 1.1 }} className="text-black/80 hover:text-black relative">
                    <ShoppingBag size={20} />
                    {itemCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-[#bf2c7e] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        {itemCount}
                      </span>
                    )}
                  </motion.a>
                </Link>
                <Link href="/account" passHref legacyBehavior>
                  <motion.a whileHover={{ scale: 1.1 }} className="text-black/80 hover:text-black">
                    <User size={20} />
                  </motion.a>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default NavbarTwo;
