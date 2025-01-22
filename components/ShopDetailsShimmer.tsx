import React from "react";
import Back from "./Back";
import Footer from "./Footer";
import BottomNavigationBar from "./BottomNav";

// Shimmer Loader Component
const ShimmerLoader = () => (
    <div>
        <Back title={"Shop details"} />
        <div className="bg-gray-50 min-h-screen flex flex-col">
    <div className="space-y-6 m-3 animate-pulse">
      {/* Shop Header */}
      <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-8 mb-8 px-0 sm:px-12 md:px-16">
        <div className="w-32 h-32 md:w-40 md:h-40 overflow-hidden rounded-full bg-gray-300"></div>
        <div className="flex flex-col w-full space-y-4 p-4 bg-white rounded-lg shadow-md border border-gray-300">
          <div className="h-6 bg-gray-300 rounded w-1/2"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="flex items-center space-x-4 mt-3">
            <div className="h-6 bg-gray-300 rounded w-1/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          </div>
          <div className="space-y-2 mt-4">
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          </div>
        </div>
      </div>
  
      {/* Shop Products */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="border rounded-lg shadow-md p-2 space-y-4">
            <div className="h-36 sm:h-48 bg-gray-300 rounded w-full"></div>
            <div className="h-6 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>
        ))}
      </div>
  
      {/* Shop Contacts */}
      <div className="space-y-2 mb-10">
        <div className="h-6 bg-gray-300 rounded w-1/2"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      </div>
  
      {/* Write a Review Section */}
      <div className="space-y-6">
        <div className="h-6 bg-gray-300 rounded w-1/3"></div>
        <div className="space-y-4">
          <div className="h-10 bg-gray-300 rounded w-full"></div>
          <div className="h-10 bg-gray-300 rounded w-full"></div>
          <div className="h-24 bg-gray-300 rounded w-full"></div>
        </div>
        <div className="h-10 bg-gray-300 rounded w-1/3"></div>
      </div>
    </div>
    <BottomNavigationBar />
    <Footer />
    </div>
    </div>
  );
export default ShimmerLoader;