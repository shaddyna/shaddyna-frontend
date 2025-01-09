"use client"
import React from "react";
import { useWishlistStore } from "@/store/wihlist-store";
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
      <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-6 text-center">
        Your Wishlist
      </h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 lg:gap-6">
        {wishlistItems.length > 0 ? (
          wishlistItems.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition transform hover:scale-105 bg-white cursor-pointer"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-36 sm:h-48 object-cover"
                onClick={() => handleProductClick(product.id)}
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
                    onClick={() => removeItem(product.id)}
                    className="text-[#ff199c] hover:text-red-600 transition-transform transform hover:scale-110 sm:hover:scale-125"
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

export default WishlistPage;
