/*"use client"
import React from "react";
import { useWishlistStore } from "@/store/wishlist-store";
import { FaHeart } from "react-icons/fa";
import Footer from "@/components/Footer";
import BottomNavigationBar from "@/components/BottomNav";
import HeadNavigation from "@/components/HeadNavigation";
import { useRouter } from "next/navigation";

const WishlistPage: React.FC = () => {
  const { items: wishlistItems, removeItem } = useWishlistStore();
  const router = useRouter();
  const handleProductClick = (productId: string) => {
    router.push(`/product/${productId}`);
  };

  return (
    <div>
      <HeadNavigation />
    <div className="bg-gray-50 min-h-screen flex flex-col">
    <div className="px-4 py-0">
    <div className="pb-4 pt-4">
     
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 lg:gap-6">
        {wishlistItems.length > 0 ? (
          wishlistItems.map((product) => (
            <div
            key={product._id}
            className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition transform hover:scale-105 bg-white cursor-pointer"
          >
            <img
              src={
                Array.isArray(product.images)
                  ? product.images[0] || "/placeholder-image.png"
                  : product.images || "/placeholder-image.png"
              }
              alt={product.name}
              className="w-full h-36 sm:h-48 object-contain" 
              onClick={() => handleProductClick(product._id)}
            />
            <div className="p-3 sm:p-4">
              <h3 className="text-sm sm:text-base font-semibold text-gray-800 truncate">
                {product.name}
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
                Kes {product.price}
              </p>
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => removeItem(product._id)}
                  className="text-[#bf2c7e] hover:text-red-600 transition-transform transform hover:scale-110 sm:hover:scale-125"
                >
                  <FaHeart size={16} />
                  Remove from Wishlist
                </button>
              </div>
            </div>
          </div>
          
          ))
        ) : (
          <p>No items in wishlist.</p>
        )}
      </div>
    </div>
    </div>
    </div>
    <Footer />
    <BottomNavigationBar />
    </div>
  );
};

export default WishlistPage;*/

"use client";
import React from "react";
import { useWishlistStore } from "@/store/wishlist-store";
import { FaHeart } from "react-icons/fa";
import Footer from "@/components/Footer";
import BottomNavigationBar from "@/components/BottomNav";
import HeadNavigation from "@/components/HeadNavigation";
import { useRouter } from "next/navigation";
import { ViewIcon } from "hugeicons-react";

const WishlistPage: React.FC = () => {
  const { items: wishlistItems, removeItem } = useWishlistStore();
  const router = useRouter();

  const handleProductClick = (productId: string) => {
    router.push(`/product/${productId}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navigation */}
      <HeadNavigation />

      {/* Wishlist Content */}
      <div className=" min-h-screen px-3 py-3 max-w-6xl mx-auto w-full">
        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {wishlistItems.map((product) => (
              <div
                key={product._id}
                className="border rounded-lg overflow-hidden shadow-md bg-white cursor-pointer hover:shadow-lg transition transform hover:scale-105"
              >
                {/* Product Image */}
                <img
                  src={
                    Array.isArray(product.images)
                      ? product.images[0] || "/placeholder-image.png"
                      : product.images || "/placeholder-image.png"
                  }
                  alt={product.name}
                  className="w-full h-36 sm:h-40 object-cover"
                  onClick={() => handleProductClick(product._id)}
                />

                {/* Product Details */}
                <div className="p-3">
                  <h3 className="text-xs sm:text-sm font-semibold text-gray-800 truncate">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 font-medium mt-1">
                    Kes {product.price}
                  </p>

                  {/* Actions */}
                  <div className="flex justify-between items-center mt-1">
                    <button
                      onClick={() => removeItem(product._id)}
                      className="flex items-center gap-1 sm:gap-2 text-[#bf2c7e] hover:text-red-600 text-xs sm:text-sm transition-transform transform hover:scale-105"
                    >
                      <FaHeart size={14} />
                      <span>Remove</span>
                    </button>
                    <button
                      onClick={() => handleProductClick(product._id)}
                      className="flex items-center gap-1 sm:gap-2 bg-[#0f1c47] text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-md text-sm sm:text-sm hover:bg-blue-900 transition"
                    >
                      <ViewIcon size={16} />
                      <span>View</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-3 text-center">
            <img src="/assets/images/Empty.gif" alt="Empty Wishlist" className="w-64 sm:w-64 mb-4" />
            <p className="text-gray-500 text-sm sm:text-lg">Your wishlist is empty.</p>
            <button
              onClick={() => router.push("/")}
              className="mt-3 bg-[#0f1c47] text-white px-4 sm:px-5 py-2 rounded-md text-sm hover:bg-blue-900 transition"
            >
              Explore Products
            </button>
          </div>
        )}
      </div>

      {/* Footer & Navigation */}
      <Footer />
      <BottomNavigationBar />
    </div>
  );
};

export default WishlistPage;
