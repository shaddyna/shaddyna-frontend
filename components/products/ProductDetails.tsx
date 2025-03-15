/*import React from "react";
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
        className="bg-[#0f1c47] text-white py-2 px-4 rounded-lg font-bold flex items-center gap-2 hover:bg-blue-700 transition"
      >
        <FaShoppingCart /> Add to Cart
      </button>
      <button
        onClick={onAddToWishlist}
        className="bg-[#bf2c7e] text-white py-2 px-4 rounded-lg font-bold flex items-center gap-2 hover:bg-red-600 transition"
      >
        <FaHeart /> Add to Wishlist
      </button>
    </div>
  </div>
);*/




/*import React, { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { ProductDetail } from "@/types/products";

interface ProductDetailsProps {
  product: ProductDetail;
  onAddToCart: (quantity: number) => void;
  onBulkAddToCart: (quantity: number) => void;
  onAddToWishlist: () => void;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({
  product,
  onAddToCart,
  onBulkAddToCart,
  onAddToWishlist,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [bulkQuantity, setBulkQuantity] = useState(5);

  return (
    <div className="space-y-6">
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

      <div className="space-y-6">
        {/* Single Purchase Section *
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Single Purchase</h3>
          <div className="flex gap-4 items-center">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1 border rounded-lg"
              >
                -
              </button>
              <input
                type="number"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-16 text-center border rounded-lg py-1"
              />
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="px-3 py-1 border rounded-lg"
              >
                +
              </button>
            </div>
            <button
              onClick={() => onAddToCart(quantity)}
              className="bg-[#0f1c47] text-white py-2 px-4 rounded-lg font-bold flex items-center gap-2 hover:bg-blue-700 transition"
            >
              <FaShoppingCart /> Add {quantity} to Cart
            </button>
          </div>
        </div>

        {/* Bulk Purchase Section *
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Bulk Purchase</h3>
          <div className="flex flex-col gap-3">
            <div className="flex gap-2 flex-wrap">
              {[5, 10, 20].map((qty) => (
                <button
                  key={qty}
                  onClick={() => onBulkAddToCart(qty)}
                  className="bg-[#2c8fbf] text-white px-4 py-2 rounded-lg font-bold hover:bg-[#1a5f7a] transition"
                  disabled={qty > product.stock}
                >
                  Buy {qty} Pack{qty > 1 ? "s" : ""}
                </button>
              ))}
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                min="5"
                max={product.stock}
                value={bulkQuantity}
                onChange={(e) => setBulkQuantity(Math.max(5, parseInt(e.target.value) || 5))}
                className="w-24 text-center border rounded-lg py-1"
              />
              <button
                onClick={() => onBulkAddToCart(bulkQuantity)}
                className="bg-[#2c8fbf] text-white px-4 py-2 rounded-lg font-bold hover:bg-[#1a5f7a] transition"
                disabled={bulkQuantity > product.stock}
              >
                Custom Bulk Order
              </button>
            </div>
          </div>
        </div>

        {/* Wishlist Button *
        <button
          onClick={onAddToWishlist}
          className="bg-[#bf2c7e] text-white py-2 px-4 rounded-lg font-bold flex items-center gap-2 hover:bg-red-600 transition"
        >
          <FaHeart /> Add to Wishlist
        </button>
      </div>
    </div>
  );
};*/

import React, { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { ProductDetail } from "@/types/products";
import { ShoppingCart01Icon } from "hugeicons-react";
import { Heart } from "lucide-react";

interface ProductDetailsProps {
  product: ProductDetail;
  onAddToCart: (quantity: number) => void;
  onBulkAddToCart: (quantity: number) => void;
  onAddToWishlist: () => void;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({
  product,
  onAddToCart,
  onBulkAddToCart,
  onAddToWishlist,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [bulkQuantity, setBulkQuantity] = useState(5);

  return (
    <div className="space-y-6 p-6 bg-white shadow-lg rounded-xl">
      <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
      <p className="text-gray-600 mt-2">{product.description}</p>
      <p className="text-2xl font-semibold text-[#0f1c47] mt-4">Kes {product.price}</p>

      {/* Rating */}
      <div className="flex items-center gap-1 mt-2">
        {[...Array(5)].map((_, i) =>
          i < product.rating ? (
            <AiFillStar key={i} className="text-yellow-400 text-xl" />
          ) : (
            <AiOutlineStar key={i} className="text-gray-300 text-xl" />
          )
        )}
      </div>

      {/* Attributes */}
      {product.attributes && Object.keys(product.attributes).length > 0 ? (
        <ul className="mt-2 text-gray-700 space-y-1">
          {Object.entries(product.attributes).map(([key, value]) => (
            <li key={key} className="capitalize">
              <b className="text-gray-800">{key}:</b> {value}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No additional details available.</p>
      )}

      <div className="space-y-3">
        {/* Single Purchase Section */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900">Single Purchase</h3>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 border rounded-lg px-3 py-0">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1 text-lg font-bold text-gray-600 hover:text-gray-900 transition"
              >
                -
              </button>
              <input
                type="number"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-16 text-center border-none outline-none font-semibold"
              />
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="px-3 py-1 text-lg font-bold text-gray-600 hover:text-gray-900 transition"
              >
                +
              </button>
            </div>
            <button
              onClick={() => onAddToCart(quantity)}
              className="flex items-center gap-2 bg-[#0f1c47] text-white py-2 px-2 rounded-lg font-semibold hover:bg-[#0f1c47] transition"
            >
              <ShoppingCart01Icon size={20} /> Add {quantity} to Cart
            </button>
          </div>
        </div>

        {/* Bulk Purchase Section */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900">Bulk Purchase</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[5, 10, 20, 50].map((qty) => (
              <button
                key={qty}
                onClick={() => onBulkAddToCart(qty)}
                className="bg-[#0f1c47] text-white font-semibold py-2 rounded-lg text-sm sm:text-base hover:bg-[#0f1c47]transition w-full"
                disabled={qty > product.stock}
              >
                Buy {qty} Pack{qty > 1 ? "s" : ""}
              </button>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-3 items-center">
            <input
              type="number"
              min="5"
              max={product.stock}
              value={bulkQuantity}
              onChange={(e) => setBulkQuantity(Math.max(5, parseInt(e.target.value) || 5))}
              className="w-24 text-center border rounded-lg py-2 text-lg font-semibold"
            />
            <button
              onClick={() => onBulkAddToCart(bulkQuantity)}
              className="bg-[#0f1c47] text-white py-2 px-5 rounded-lg font-semibold hover:bg-[#0f1c47] transition"
              disabled={bulkQuantity > product.stock}
            >
              Custom Bulk Order
            </button>
          </div>
        </div>

        {/* Wishlist Button */}
        <button
          onClick={onAddToWishlist}
          className="flex items-center gap-2 bg-pink-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-pink-700 transition w-full sm:w-auto justify-center"
        >
           <Heart size={19} /> Add to Wishlist
        </button>
      </div>
    </div>
  );
};
