/*"use client";
import React, { useState } from "react";
import { LocationUser03Icon, ShoppingCart01Icon, UserAccountIcon } from "hugeicons-react";
import { useUIStore } from "@/store/ui-store";
import { FaBalanceScale, FaCogs, FaQuestionCircle } from "react-icons/fa";
import { FaBell, FaBook, FaCartFlatbed, FaMessage, FaTruck } from "react-icons/fa6";

interface IconButtonsProps {
  isLoggedIn: boolean;
  totalItems: number;
  router: any;
  onLogout: () => void;
}

const UserAccountDrawer = ({ isOpen, onClose, router, onLogout }: { 
  isOpen: boolean;
  onClose: () => void;
  router: any;
  onLogout: () => void;
}) => (
  <div className={`fixed inset-0 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
    {/* Overlay with fade animation *
    <div className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ${
      isOpen ? 'opacity-100' : 'opacity-0'
    }`} onClick={onClose} />
    
    {/* Drawer Content with spring animation *
    <div className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-lg transform transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
      isOpen ? 'translate-y-0' : 'translate-y-full'
    }`}>
      <div className="p-4">
        <div className="flex justify-center mb-4">
          <div className="w-12 h-1.5 bg-gray-300 rounded-full transform transition-transform duration-300 hover:scale-x-150" />
        </div>
        
        <div className="space-y-4">
          {[
            { icon: <UserAccountIcon className="mr-3" />, text: "My Profile", action: () => router.push("/user") },
            { icon: <FaCogs className="mr-3" />, text: "Admin Panel", action: () => router.push("/admin") },
            { icon: <FaTruck  className="mr-3" />, text: "Delivery", action: () => router.push("/delivery") },
            { icon: <FaBalanceScale className="mr-3" />, text: "Compare", action: () => router.push("") },
            { icon: <FaMessage className="mr-3" />, text: "Chats", action: () => router.push("") },
            { icon: <FaBell className="mr-3" />, text: "Notifications", action: () => router.push("") },
            { icon: <FaCartFlatbed className="mr-3" />, text: "My Shop", action: () => router.push("/seller") },
            { icon: <FaBook className="mr-3" />, text: "Blog", action: () => router.push("/seller") },
            { icon: <FaQuestionCircle className="mr-3" />, text: "Help", action: () => router.push("/help") },
          ].map((item, index) => (
            <button
              key={index}
              onClick={item.action}
              className="w-full flex items-center p-3 hover:bg-gray-100 rounded-lg transition-all duration-300 active:scale-95"
            >
              {item.icon}
              <span className="text-left">{item.text}</span>
            </button>
          ))}
          
          <button
            onClick={() => {
              onLogout();
              onClose();
            }}
            className="w-full flex items-center p-3 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300 active:scale-95"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 mr-3" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
              />
            </svg>
            <span className="text-left">Logout</span>
          </button>
        </div>
      </div>
    </div>
  </div>
);

export const IconButtons = ({ isLoggedIn, totalItems, router, onLogout }: IconButtonsProps) => {
  const [isUserDrawerOpen, setIsUserDrawerOpen] = useState(false);
  const setDrawerOpen = useUIStore((state) => state.setDrawerOpen);


  const handleDrawerClose = () => {
    setIsUserDrawerOpen(false);
    setDrawerOpen(false);
  };

  return (
    isLoggedIn ? (
      <>
        <div className="lg:flex items-center space-x-4">
          {/* ... existing button code ... *
          <button
            className="text-2xl p-2 text-[#182155] rounded-full relative"
            onClick={() => router.push("/cart")}
          >
            <ShoppingCart01Icon />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 bg-[#182155] text-white text-xs rounded-full px-1">
                {totalItems}
              </span>
            )}
          </button>
          
          <button 
            className="text-2xl p-2 text-[#182155] rounded-full"
            onClick={() => setIsUserDrawerOpen(true)}
          >
            <UserAccountIcon />
          </button>
          {/*<button 
            className="text-2xl p-2 text-[#182155] rounded-full"
            onClick={handleDrawerOpen}
          >
            <UserAccountIcon />
          </button>*
        </div>

        <UserAccountDrawer
          isOpen={isUserDrawerOpen}
          onClose={handleDrawerClose}
          router={router}
          onLogout={onLogout}
        />
      </>
    ) : null
  );
};*/

"use client";
import React, { useState, useEffect } from "react";
import { LocationUser03Icon, ShoppingCart01Icon, UserAccountIcon } from "hugeicons-react";
import { useUIStore } from "@/store/ui-store";
import { useUserSellerStore } from "@/store/useUserSellerStore";
import { FaBalanceScale, FaCogs, FaQuestionCircle } from "react-icons/fa";
import { FaBell, FaBook, FaCartFlatbed, FaMessage, FaTruck } from "react-icons/fa6";

interface IconButtonsProps {
  isLoggedIn: boolean;
  totalItems: number;
  router: any;
  onLogout: () => void;
}

const UserAccountDrawer = ({ isOpen, onClose, router, onLogout, currentUserRole }: { 
  isOpen: boolean;
  onClose: () => void;
  router: any;
  onLogout: () => void;
  currentUserRole: string;
}) => (
  <div className={`fixed inset-0 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
    {/* Overlay with fade animation */}
    <div className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`} onClick={onClose} />
    
    {/* Drawer Content with spring animation */}
    <div className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-lg transform transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}>
      <div className="p-4">
        <div className="flex justify-center mb-4">
          <div className="w-12 h-1.5 bg-gray-300 rounded-full transform transition-transform duration-300 hover:scale-x-150" />
        </div>
        
        <div className="space-y-4">
          <button onClick={() => router.push("/user")} className="w-full flex items-center p-3 hover:bg-gray-100 rounded-lg transition-all duration-300 active:scale-95">
            <UserAccountIcon className="mr-3" />
            <span className="text-gray-700">My Profile</span>
          </button>

          {currentUserRole === 'admin' && (
            <button onClick={() => router.push("/admin")} className="w-full flex items-center p-3 hover:bg-gray-100 rounded-lg transition-all duration-300 active:scale-95">
              <FaCogs className="mr-3" />
              <span className="text-gray-700">Admin Panel</span>
            </button>
          )}

          {currentUserRole === 'seller' && (
            <button onClick={() => router.push("/seller")} className="w-full flex items-center p-3 hover:bg-gray-100 rounded-lg transition-all duration-300 active:scale-95">
              <FaCartFlatbed className="mr-3" />
              <span className="text-gray-700">My Shop</span>
            </button>
          )}
 {currentUserRole === 'admin' && (
          <button onClick={() => router.push("/delivery")} className="w-full flex items-center p-3 hover:bg-gray-100 rounded-lg transition-all duration-300 active:scale-95">
            <FaTruck className="mr-3" />
            <span className="text-gray-700">Delivery</span>
          </button>
    )}
     {currentUserRole === 'admin' && (
          <button onClick={() => router.push("/blog")} className="w-full flex items-center p-3 hover:bg-gray-100 rounded-lg transition-all duration-300 active:scale-95">
            <FaBook className="mr-3" />
            <span className="text-gray-700">Blog</span>
          </button>
        )}
          <button onClick={() => router.push("/help")} className="w-full flex items-center p-3 hover:bg-gray-100 rounded-lg transition-all duration-300 active:scale-95">
            <FaQuestionCircle className="mr-3" />
            <span className="t">Help</span>
          </button>

          <button onClick={() => { onLogout(); onClose(); }} className="w-full flex items-center p-3 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300 active:scale-95">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  </div>
);

export const IconButtons = ({ isLoggedIn, totalItems, router, onLogout }: IconButtonsProps) => {
  const [isUserDrawerOpen, setIsUserDrawerOpen] = useState(false);
  const setDrawerOpen = useUIStore((state) => state.setDrawerOpen);
  const { fetchCurrentUser, currentUserRole } = useUserSellerStore();

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  const handleDrawerClose = () => {
    setIsUserDrawerOpen(false);
    setDrawerOpen(false);
  };

  return (
    isLoggedIn ? (
      <>
        <div className="lg:flex items-center space-x-4">
          <button className="text-2xl p-2 text-[#182155] rounded-full relative" onClick={() => router.push("/cart")}>
            <ShoppingCart01Icon />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 bg-[#182155] text-white text-xs rounded-full px-1">{totalItems}</span>
            )}
          </button>
          
          <button className="text-2xl p-2 text-[#182155] rounded-full" onClick={() => setIsUserDrawerOpen(true)}>
            <UserAccountIcon />
          </button>
        </div>

        <UserAccountDrawer
  isOpen={isUserDrawerOpen}
  onClose={handleDrawerClose}
  router={router}
  onLogout={onLogout}
  currentUserRole={currentUserRole || ""}  // Ensure it's always a string
/>

      </>
    ) : null
  );
};
