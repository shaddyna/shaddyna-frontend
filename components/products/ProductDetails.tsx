import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { ProductDetail } from "@/types/products";

interface ProductDetailsProps {
  product: ProductDetail;
  onAddToCart: () => void;
  onAddToWishlist: () => void;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({
  product,
  onAddToCart,
  onAddToWishlist,
}) => (
  <div>
    <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
    <p className="text-gray-500 mt-2">{product.description}</p>
    <p className="text-xl font-bold text-gray-800 mt-4">Kes {product.price}</p>
    <div className="flex items-center gap-2 mt-2">
      {[...Array(5)].map((_, i) =>
        i < product.rating ? (
          <AiFillStar key={i} className="text-yellow-400" />
        ) : (
          <AiOutlineStar key={i} className="text-gray-300" />
        )
      )}
    </div>

    {product.attributes && Object.entries(product.attributes).length > 0 ? (
      <ul className="mt-2 text-gray-600">
        {Object.entries(product.attributes).map(([key, value]) => (
          <li key={key} className="capitalize">
            <b>{key}:</b> {value}
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-gray-500">No attributes available.</p>
    )}

    <div className="flex gap-4 mt-6">
      <button
        onClick={onAddToCart}
        className="bg-blue-600 text-white py-2 px-4 rounded-lg font-bold flex items-center gap-2 hover:bg-blue-700 transition"
      >
        <FaShoppingCart /> Add to Cart
      </button>
      <button
        onClick={onAddToWishlist}
        className="bg-pink-500 text-white py-2 px-4 rounded-lg font-bold flex items-center gap-2 hover:bg-red-600 transition"
      >
        <FaHeart /> Add to Wishlist
      </button>
    </div>
  </div>
);