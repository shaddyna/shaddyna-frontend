import React from "react";

const ShopsShimmerLoader = () => {
  return (
    <div className="container mx-auto px-0 pb-3">
      <h2 className="text-center text-xl font-bold text-gray-300 my-3">
        Explore Shops
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 animate-pulse w-full sm:w-96 md:w-[28rem] lg:w-[32rem]"
          >
            {/* Shop Image */}
            <div className="w-full h-24 bg-gray-300" />

            {/* Shop Info */}
            <div className="p-4 space-y-3">
              <div className="h-5 bg-gray-300 rounded w-3/4"></div>
              <div className="flex items-center text-xs text-gray-600">
                <div className="h-4 w-4 bg-gray-400 rounded-full mr-2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              </div>
              <div className="h-2 bg-gray-300 rounded w-full"></div>
              <div className="h-2 bg-gray-300 rounded w-5/6"></div>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-xs font-medium text-gray-700">
                  <div className="h-4 w-4 bg-gray-400 rounded-full mr-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-8"></div>
                </div>
                <div className="h-4 bg-gray-300 rounded w-12"></div>
              </div>
            </div>

            {/* Visit Button */}
            <div className="p-3 bg-gray-100 border-t">
              <div className="h-7 bg-gray-300 rounded w-full"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopsShimmerLoader;
