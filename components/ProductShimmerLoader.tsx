import React from "react";

// Shimmer Loader Component
const ProductsShimmerLoader = () => {
    return (
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 lg:gap-6">
        {Array.from({ length: 12 }).map((_, index) => (
          <div
            key={index}
            className="border rounded-lg overflow-hidden shadow-md animate-pulse bg-gray-200"
          >
            <div className="w-full h-36 sm:h-48 bg-gray-300"></div>
            <div className="p-3 sm:p-4">
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-300 rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-gray-300 rounded w-1/3 mb-4"></div>
              <div className="h-3 bg-gray-300 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  export default ProductsShimmerLoader;