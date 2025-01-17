import React, { useState } from "react";

const CategoryShimmerLoader = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6 lg:hidden">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="bg-gray-200 rounded-lg p-2 sm:p-3 animate-pulse"
        >
          <div className="w-full h-32 sm:h-36 bg-gray-300 rounded-t-lg"></div>
          <div className="h-4 bg-gray-300 mt-2 rounded"></div>
        </div>
      ))}
    </div>
  );
};
export default CategoryShimmerLoader;
