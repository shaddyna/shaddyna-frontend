"use client";

import { motion } from "framer-motion";
import { Heart, Eye, Star } from "lucide-react";
import { useWishlistStore } from "@/stores/wishlistStore";

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
  onQuickView?: () => void;
  onAddToCart?: () => void;
  animationDelay?: number;
}

export const ProductCard = ({
  product,
  theme = { primary: "#bf2c7e", hover: "#9f2565", text: "white" },
  onQuickView = () => {},
  onAddToCart = () => {},
  animationDelay = 0,
}: ProductCardProps) => {
  const { items, addItem, removeItem } = useWishlistStore();
  const isWishlisted = items.some((item) => item.id === product.id);

  const toggleWishlist = () => {
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: animationDelay }}
      viewport={{ once: true }}
      className="group relative overflow-hidden rounded-lg sm:rounded-xl bg-white border border-gray-200 hover:border-[#bf2c7e]/50 transition-all duration-300 shadow-sm hover:shadow-md sm:shadow-md sm:hover:shadow-lg"
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
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex gap-1 sm:gap-2">
          {product.isNew && (
            <span className={`bg-[${theme.primary}] text-black text-xs font-bold px-2 py-0.5 sm:px-3 sm:py-1 rounded-full`}>
              NEW
            </span>
          )}
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="bg-white text-black text-xs font-bold px-2 py-0.5 sm:px-3 sm:py-1 rounded-full border border-gray-200">
              -{Math.round((1 - product.price / product.originalPrice!) * 100)}%
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={toggleWishlist}
          className="absolute top-2 right-2 sm:top-3 sm:right-3 p-1.5 sm:p-2 bg-white/80 rounded-full hover:bg-[#bf2c7e] hover:text-white transition-colors shadow-sm"
        >
          <Heart
            size={14}
            className="text-gray-800 group-hover:text-white"
            fill={isWishlisted ? "currentColor" : "none"}
          />
        </button>
      </div>

      {/* Product Info */}
      <div className="p-3 sm:p-4">
        <div className="flex justify-between items-start gap-2">
          <div className="flex-1">
            <h3 className="text-sm sm:text-base font-bold text-gray-900 line-clamp-1">{product.name}</h3>
            <p className="text-gray-500 text-xs sm:text-sm line-clamp-1">{product.designer}</p>
          </div>
          <div className="text-right">
            <p className={`text-[${theme.primary}] font-bold text-sm sm:text-base`}>
              Ksh {product.price.toLocaleString()}
            </p>
            {product.originalPrice && product.originalPrice > product.price && (
              <p className="text-gray-400 text-xs line-through">
                Ksh {product.originalPrice.toLocaleString()}
              </p>
            )}
          </div>
        </div>

        {/* Rating */}
        <div className="mt-2 flex items-center gap-1">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={12}
                className={i < Math.floor(product.rating)
                  ? `text-[${theme.primary}] fill-[${theme.primary}]`
                  : "text-gray-300"
                }
              />
            ))}
          </div>
          <span className="text-gray-500 text-xs ml-1">({product.rating.toFixed(1)})</span>
        </div>

        {/* Quick View Button */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          onClick={onQuickView}
          className="mt-3 w-full border border-gray-200 hover:border-[#bf2c7e] text-gray-700 hover:text-[#bf2c7e] py-1.5 sm:py-2 rounded-full flex items-center justify-center gap-1 text-xs sm:text-sm transition-colors"
        >
          <Eye size={12} /> Quick View
        </motion.button>
      </div>
    </motion.div>
  );
};