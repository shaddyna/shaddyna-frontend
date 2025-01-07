"use client";

import React, { useEffect, useState } from "react";
import {
  FaBars,
  FaSearch,
  FaCompass,
  FaHeart,
  FaEnvelope,
  FaBell,
  FaTimes,
  FaBalanceScale,
  FaLifeRing,
  FaSignOutAlt,
  FaUserAlt,
  FaCogs,
  FaTruck,
  FaShoppingBag,
  FaShoppingCart,
  FaBlog, // Import the "X" icon for closing the drawer
} from "react-icons/fa";
import { useRouter } from 'next/navigation'
import { FaCartShopping } from "react-icons/fa6";
import Link from 'next/link';
import Header from "./Header";
import { useCartStore } from "@/store/cart-store";

const PaymentDialog: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-lg font-bold mb-4">Start Selling</h2>
        <p className="mb-4">Complete your payment setup to start selling.</p>
        <button
          onClick={onClose}
          className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const HeadNavigation: React.FC = () => {
  //const [ isScrolling, setIsScrolling] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // State for drawer open/close
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { getTotalItems } = useCartStore();
  const totalItems = getTotalItems();

  useEffect(() => {
    // Check localStorage for a token to set the login state
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // If token exists, user is logged in
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      //setIsScrolling(window.scrollY > 10); // Detect if the user has scrolled down
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen); // Toggle the drawer visibility
  };



  const closePaymentDialog = () => {
    setIsPaymentDialogOpen(false);
  };

  const router = useRouter();
  
  const handleClick = () => {
    // Navigate to the Delivery Page
    router.push('/delivery');
  };

  const handleSellClick = () =>  {
    
    router.push('/seller');}

  const handleAdminClick = () => {
    
    router.push('/admin');}

  const handleUserClick = () => {
    // Navigate to the Delivery Page
    router.push('/user');}

    const handleLoginClick = () => {
      // Navigate to Login/Register page
      router.push('/login');
    };
  
    const logout = () => {
      setIsLoggedIn(false);
      localStorage.removeItem("token");
      router.push('/login'); // Redirect to login page
    };
    
     // Function to handle the search
  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Navigate to the search page with the search query as a URL parameter
      router.push(`/search?query=${searchQuery}`);
    }
  };

  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearch(); // Trigger search logic on form submit
  };

  return (
    <><Header />
    <header className="bg-[#ff199c] shadow-md sticky top-0 z-50 px-4 py-2">
      {/* Responsive Container */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Top Row (Small Screens: Nav and Logo on left, Msg and Notification on right) */}
        <div className="flex items-center justify-between lg:w-auto">
          {/* Nav and Logo */}
          <div className="flex items-center space-x-4">
            <button
              className="text-2xl p-2 text-white hover:bg-[#182155]  rounded-full lg:block" // Keep on large screens
              onClick={toggleDrawer} // Open the drawer when the hamburger menu is clicked
            >
              {isDrawerOpen ? (
                <FaTimes /> // Show "X" when the drawer is open
              ) : (
                <FaBars /> // Show hamburger menu when the drawer is closed
              )}
            </button>
            <div className="text-xl font-bold">


              <Link href="/">
                <img
                  src="/logo.jpeg"
                  alt="YourLogo"
                  className="h-10 w-auto rounded-full" />
              </Link>
            </div>
          </div>
          {/* Message and Notification Icons */}
          {isLoggedIn ? (
          <div className="flex items-center space-x-4 lg:hidden">
            <button
          className="text-2xl p-2 text-white hover:bg-[#182155] rounded-full relative"
          onClick={() => router.push("/cart")}
          >
            <FaCartShopping />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 bg-[#182155] text-white text-xs rounded-full px-1">
                {totalItems}
              </span>
            )}
          </button>
         <button className="text-2xl p-2 text-white hover:bg-[#182155] rounded-full">
           <FaEnvelope />
         </button>
         <button className="text-2xl p-2 text-white hover:bg-[#182155] rounded-full">
           <FaBell />
         </button>
          </div>
          ) : (
            <button
  className="block px-4 py-2 text-sm sm:px-5 sm:py-2 sm:text-lg text-white border-2 sm:border-2 border-white rounded-lg hover:bg-white hover:text-[#182155] transition-all lg:hidden"
  onClick={handleLoginClick}
>
  Login/Register
</button>



          
    
    )}
        </div>
{/* Discover, Shops, and Favourites */}
<div
  className={`flex flex-row items-center justify-center space-x-4 transition-all duration-300 hidden md:flex`}
>
  <button className="flex items-center px-4 py-2 text-sm font-medium text-white hover:bg-[#182155] rounded-full">
    <FaCompass className="mr-2" />
    Discover
  </button>
  <button className="flex items-center px-4 py-2 text-sm font-medium text-white hover:bg-[#182155] rounded-full">
    <FaShoppingBag className="mr-2" />
    Shops
  </button>
  <button className="flex items-center px-4 py-2 text-sm font-medium text-white hover:bg-[#182155] rounded-full">
    <FaHeart className="mr-2" />
    Wishlist
  </button>
</div>





<div className={`w-full lg:max-w-md transition-all duration-300 hidden md:block`}>
      <form onSubmit={handleSubmit}> {/* Add onSubmit handler */}
        <div className="relative">
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query on input change
          />
          <FaSearch
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
            onClick={handleSearch} // Use the handleSearch function on click
          />
        </div>
      </form>
    </div>
        {/* Message and Notification Icons (Visible only on large screens) */}
        {isLoggedIn ? (
         <div className="hidden lg:flex items-center space-x-4">
          <button
          className="text-2xl p-2 text-white hover:bg-[#182155] rounded-full relative"
          onClick={() => router.push("/cart")}
          >
            <FaCartShopping />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 bg-[#182155] text-white text-xs rounded-full px-1">
                {totalItems}
              </span>
            )}
          </button>
          <button className="text-2xl p-2 text-white hover:bg-[#182155] rounded-full">
            <FaEnvelope />
          </button>
          <button className="text-2xl p-2 text-white hover:bg-[#182155] rounded-full">
            <FaBell />
          </button>
       </div>
        ) : (
          <button
        className="hidden lg:block px-4 py-2 rounded-lg border-2 border-white text-sm font-medium hover:bg-white hover:text-[#182155] text-white"
        onClick={handleLoginClick}
        >
        Login/Register
        </button>
        
        )}
      </div>

      {/* Navigation Drawer (Visible only when hamburger menu is clicked) */}
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-50 transition-all duration-300 ${isDrawerOpen ? "block" : "hidden"} z-50`} // Set high z-index here
        onClick={toggleDrawer} // Close drawer when the background is clicked
      >
        <div
          className="bg-white p-4 w-64 h-full flex flex-col space-y-6"
          onClick={(e) => e.stopPropagation()} // Prevent closing the drawer when clicking inside
        >
          <button
            className="text-2xl p-2 hover:bg-gray-100 text-gray-800 rounded-full"
            onClick={toggleDrawer}
          >
            <FaTimes />
          </button>

          {/* Optional buttons can be uncommented when needed */}
          <button
            className="flex items-center px-4 py-2 text-sm text-gray-800 font-medium hover:bg-gray-100 rounded-full"
            onClick={handleSellClick}
            >
            <FaShoppingCart className="mr-2" /> {/* Icon for Start Selling */}
            My Shop
          </button> 

          <button className="flex items-center px-4 py-2 text-sm text-gray-800 font-medium hover:bg-gray-100 rounded-full">
            <FaBalanceScale className="mr-2" /> {/* Icon for Compare */}
            Compare
          </button>

         <button className="flex items-center px-4 py-2 text-sm text-gray-800 font-medium hover:bg-gray-100 rounded-full">
          <FaBlog className="mr-2" /> {/* Icon for Blog */}
          Blog
        </button> 

          <button
            className="flex items-center px-4 py-2 text-sm text-gray-800 font-medium hover:bg-gray-100 rounded-full"
            onClick={handleClick} // Trigger the navigation on click
          >
            <FaTruck className="mr-2" /> {/* Icon for Delivery */}
            Delivery
          </button>

          <button
            className="flex items-center px-4 py-2 text-sm text-gray-800 font-medium hover:bg-gray-100 rounded-full"
            onClick={handleAdminClick} // Trigger the navigation on click
          >
            <FaCogs className="mr-2" /> {/* Icon for Admin Panel */}
            Admin Panel
          </button>

          <button
            className="flex items-center px-4 py-2 text-sm text-gray-800 font-medium hover:bg-gray-100 rounded-full"
            onClick={handleUserClick} // Trigger the navigation on click
          >
            <FaUserAlt className="mr-2" /> {/* Icon for My Profile */}
            My Profile
          </button>

          <button className="flex items-center px-4 py-2 text-sm text-gray-800 font-medium hover:bg-gray-100 rounded-full">
            <FaLifeRing className="mr-2" /> {/* Icon for Help */}
            Help?
          </button>

          {isLoggedIn ? (
          <button onClick={logout} className="flex items-center px-4 py-2 text-sm font-medium hover:bg-gray-100 rounded-full">
            <FaSignOutAlt className="mr-2" />
            Logout
          </button>
          ) : (
            <button
            className="hidden lg:block text-sm font-medium text-blue-600"
            onClick={handleLoginClick}
            >
            Login/Register
            </button>
            )}
        </div>
      </div>

    </header>
    <PaymentDialog
        isOpen={isPaymentDialogOpen}
        onClose={closePaymentDialog}
      /></>
  );
};
export default HeadNavigation;