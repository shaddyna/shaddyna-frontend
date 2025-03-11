/*import React from "react";
import { ProductDetail } from "@/types/products";

interface RelatedProductItemProps {
  product: ProductDetail;
  currentAttributes: Record<string, string>;
  onAddToMiniCart: (product: ProductDetail) => void;
}

export const RelatedProductItem: React.FC<RelatedProductItemProps> = ({
  product,
  currentAttributes,
  onAddToMiniCart,
}) => {
  const matchingAttributes = product.attributes
    ? Object.entries(product.attributes).filter(
        ([key, value]) => currentAttributes?.[key] === value
      )
    : [];

  return (
    <div className="border p-4 rounded-lg shadow">
      <img
        src={product.images[0]}
        alt={product.name}
        className="w-full h-40 object-cover rounded"
      />
      <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
      <p className="text-gray-600">Kes {product.price}</p>
      {matchingAttributes.length > 0 && (
        <p className="text-sm text-gray-500 mt-1">
          Matches:
          {matchingAttributes.map(([key, value]) => (
            <span key={key} className="ml-1 text-gray-600 font-semibold">
              {key}: {value}
            </span>
          ))}
        </p>
      )}
      <button
        onClick={() => onAddToMiniCart(product)}
        className="mt-2 w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
      >
        Add to Mini Cart
      </button>
    </div>
  );
};*/

import React from "react";
import { ProductDetail } from "@/types/products";
import { ShoppingCart } from "lucide-react"; // Import cart icon

interface RelatedProductItemProps {
  product: ProductDetail;
  currentAttributes: Record<string, string>;
  onAddToMiniCart: (product: ProductDetail) => void;
}

export const RelatedProductItem: React.FC<RelatedProductItemProps> = ({
  product,
  currentAttributes,
  onAddToMiniCart,
}) => {
  const matchingAttributes = product.attributes
    ? Object.entries(product.attributes).filter(
        ([key, value]) => currentAttributes?.[key] === value
      )
    : [];

  return (
    <div className="relative bg-white p-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
      {/* Product Image */}
      <div className="w-full h-40 overflow-hidden rounded-lg">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Info */}
      <h3 className="text-lg font-semibold mt-0 text-gray-900">{product.name}</h3>
      <p className="text-gray-600 font-bold text-sm">Kes {product.price}</p>

      {/* Matching Attributes */}
      {matchingAttributes.length > 0 && (
        <p className="text-xs text-gray-500 mt-1">
          Matches:{" "}
          {matchingAttributes.map(([key, value]) => (
            <span key={key} className="ml-1 text-gray-600 font-semibold">
              {key}: {value}
            </span>
          ))}
        </p>
      )}

      {/* Add to MiniCart Icon */}
      <button
        onClick={() => onAddToMiniCart(product)}
        className="absolute top-3 right-3 p-2 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition-all"
      >
        <ShoppingCart size={18} />
      </button>
    </div>
  );
};
