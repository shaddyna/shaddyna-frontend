import React from "react";

const ShopsShimmerLoader = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="max-w-sm rounded-lg border border-gray-200 shadow-lg overflow-hidden animate-pulse"
        >
          <div className="w-full h-56 bg-gray-300"></div>
          <div className="p-4">
            <div className="h-5 bg-gray-300 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-full mb-4"></div>
            <div className="flex items-center space-x-2">
              <div className="h-4 bg-gray-300 rounded w-1/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/3"></div>
            </div>
          </div>
          <div className="p-4 border-t border-gray-200">
            <div className="h-4 bg-gray-300 rounded w-1/3"></div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default ShopsShimmerLoader;
