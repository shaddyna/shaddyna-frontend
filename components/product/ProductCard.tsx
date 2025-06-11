/*"use client";

import { motion } from "framer-motion";
import { Heart, ArrowRight, ShoppingCart, Eye } from "lucide-react";
import { useWishlistStore } from "@/stores/wishlistStore";
import { useCartStore } from "@/stores/cartStore";
import Link from "next/link";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    designer: string;
    price: number;
    originalPrice?: number;
    images: string[];
    rating: number;
    isNew: boolean;
    stock: number;
  };
  theme?: {
    primary: string;
    hover: string;
    text: string;
  };
  animationDelay?: number;
}

export const ProductCard = ({
  product,
  theme = { primary: "#bf2c7e", hover: "#9f2565", text: "white" },
  animationDelay = 0,
}: ProductCardProps) => {
  const { items: wishlistItems, addItem, removeItem } = useWishlistStore();
  const { addItem: addToCart } = useCartStore();
  const isWishlisted = wishlistItems.some((item) => item.id === product.id);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isWishlisted) {
      removeItem(product.id);
    } else {
      addItem({
        id: product.id,
        name: product.name,
        designer: product.designer,
        price: product.price,
        image: product.images[0],
      });
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      designer: product.designer,
      price: product.price,
      image: product.images[0],
      size: "M", // Default size - you might want to make this configurable
      //quantity: 1,
      stock: product.stock,
    });
  };

  return (
    <Link href={``} passHref>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: animationDelay }}
        viewport={{ once: true }}
        className="group relative overflow-hidden rounded-lg sm:rounded-xl bg-white border border-gray-200 hover:border-[#bf2c7e]/50 transition-all duration-300 shadow-sm hover:shadow-md sm:shadow-md sm:hover:shadow-lg cursor-pointer"
      >
  
        <div className="relative h-48 xs:h-56 sm:h-64 overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />

      
          <div className="absolute top-2 left-2 flex gap-2 z-10">
            {product.stock <= 10 && product.stock > 0 && (
              <span className="bg-amber-500 text-white text-xs px-2 py-1 rounded-full">
                Low Stock
              </span>
            )}
          </div>

     
          <div className="absolute top-2 right-2 flex flex-col gap-2 z-10">
            <button
              onClick={toggleWishlist}
              className="p-1.5 sm:p-2 bg-white/80 rounded-full hover:bg-[#bf2c7e] hover:text-white transition-colors shadow-sm"
              aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart
                size={16}
                className={`transition-colors ${isWishlisted ? "text-[#bf2c7e] fill-[#bf2c7e]" : "text-gray-800"}`}
                fill={isWishlisted ? "currentColor" : "none"}
              />
            </button>
          </div>
        </div>

     
        <div className="p-3 sm:p-4">
          <div className="flex justify-between items-start gap-2">
            <div className="flex-1">
              <h3 className="text-sm sm:text-base font-bold text-gray-900 line-clamp-1">
                {product.name}
              </h3>
           
            </div>
            <div className="text-right">
              <p className={`text-[${theme.primary}] font-bold text-sm sm:text-base`}>
                Ksh {product.price.toLocaleString()}
              </p>
 
            </div>
          </div>

  
          <div className="mt-3 flex gap-2">
            <motion.button
              whileHover={{ scale: 1.03 }}
              onClick={handleAddToCart}
              className={`flex-1 bg-[${theme.primary}] hover:bg-[${theme.hover}] text-white py-1.5 sm:py-2 rounded-full flex items-center justify-center gap-1 text-xs sm:text-sm transition-colors`}
            >
              <ShoppingCart size={14} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              className="border border-gray-200 hover:border-[#bf2c7e] text-gray-700 hover:text-[#bf2c7e] py-1.5 sm:py-2 rounded-full flex items-center justify-center gap-1 text-xs sm:text-sm transition-colors px-3"
            >
            <Eye size={14} />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};*/

"use client";

import { motion } from "framer-motion";
import { Heart, ArrowRight, ShoppingCart, Eye } from "lucide-react";
import { useWishlistStore } from "@/stores/wishlistStore";
import { useCartStore } from "@/stores/cartStore";
import Link from "next/link";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    designer: string;
    price: number;
    originalPrice?: number;
    images: string[];
    rating: number;
    isNew: boolean;
    stock: number;
  };
  theme?: {
    primary: string;
    hover: string;
    text: string;
  };
  animationDelay?: number;
}

export const ProductCard = ({
  product,
  theme = { primary: "#bf2c7e", hover: "#9f2565", text: "white" },
  animationDelay = 0,
}: ProductCardProps) => {
  const { items: wishlistItems, addItem, removeItem } = useWishlistStore();
  const { addItem: addToCart } = useCartStore();
  const isWishlisted = wishlistItems.some((item) => item.id === product.id);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isWishlisted) {
      removeItem(product.id);
    } else {
      addItem({
        id: product.id,
        name: product.name,
        designer: product.designer,
        price: product.price,
        image: product.images[0],
      });
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      designer: product.designer,
      price: product.price,
      image: product.images[0],
      size: "M", // Default size - you might want to make this configurable
      stock: product.stock,
    });
  };

  const handleViewDetails = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <Link href={`/products/${product.id}`} passHref>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: animationDelay }}
        viewport={{ once: true }}
        className="group relative overflow-hidden rounded-lg sm:rounded-xl bg-white border border-gray-200 hover:border-[#bf2c7e]/50 transition-all duration-300 shadow-sm hover:shadow-md sm:shadow-md sm:hover:shadow-lg cursor-pointer"
      >
        {/* Product Image */}
        <div className="relative h-48 xs:h-56 sm:h-64 overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />

          {/* Badges */}
          <div className="absolute top-2 left-2 flex gap-2 z-10">
            {product.stock <= 10 && product.stock > 0 && (
              <span className="bg-amber-500 text-white text-xs px-2 py-1 rounded-full">
                Low Stock
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="absolute top-2 right-2 flex flex-col gap-2 z-10">
            <button
              onClick={toggleWishlist}
              className="p-1.5 sm:p-2 bg-white/80 rounded-full hover:bg-[#bf2c7e] hover:text-white transition-colors shadow-sm"
              aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart
                size={16}
                className={`transition-colors ${isWishlisted ? "text-[#bf2c7e] fill-[#bf2c7e]" : "text-gray-800"}`}
                fill={isWishlisted ? "currentColor" : "none"}
              />
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-3 sm:p-4">
          <div className="p-0 sm:p-4 text-gray-600 text-xs sm:text-sm">
            <div className="flex justify-between items-start gap-2">
              <div className="flex-1">
                <h3 className="text-sm sm:text-base font-bold text-gray-900 line-clamp-1">
                  {product.name}
                </h3>
              </div>
              <div className="text-right">
               <p
                className="text-gray-600 text-xs sm:text-sm font-bold text-sm sm:text-base"
                style={{ color: theme.primary }}
              >
                Ksh {product.price.toLocaleString()}
              </p>
              </div>
            </div>
          </div>


          {/* Action Buttons */}
          <div className="mt-3 flex gap-2">
            <motion.button
              whileHover={{ scale: 1.03 }}
              onClick={handleAddToCart}
              className={`flex-1 bg-[${theme.primary}] hover:bg-[${theme.hover}] text-white py-1.5 sm:py-2 rounded-full flex items-center justify-center gap-1 text-xs sm:text-sm transition-colors`}
            >
              <ShoppingCart size={14} />
            </motion.button>

            <Link href={`/products/${product.id}`} passHref>
              <motion.button
                whileHover={{ scale: 1.03 }}
                className="border border-gray-200 hover:border-[#bf2c7e] text-gray-700 hover:text-[#bf2c7e] py-1.5 sm:py-2 rounded-full flex items-center justify-center gap-1 text-xs sm:text-sm transition-colors px-3"
              >
                <Eye size={14} />
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};