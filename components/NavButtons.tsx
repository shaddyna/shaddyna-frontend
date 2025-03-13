"use client";
import React from "react";
import { FaCompass, FaShoppingBag, FaHeart } from "react-icons/fa";

export const NavButtons = () => (
  <div className="flex flex-row items-center justify-center space-x-4 transition-all duration-300 hidden md:flex">
    <button className="flex items-center px-4 py-2 text-sm font-medium white hover:bg-[#182155] rounded-full">
      <FaCompass className="mr-2" />
      Discover
    </button>
    <button className="flex items-center px-4 py-2 text-sm font-medium white hover:bg-[#182155] rounded-full">
      <FaShoppingBag className="mr-2" />
      Shops
    </button>
    <button className="flex items-center px-4 py-2 text-sm font-medium textwhite hover:bg-[#182155] rounded-full">
      <FaHeart className="mr-2" />
      Wishlist
    </button>
  </div>
);