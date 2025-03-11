import React, { useState } from "react";
import { ProductDetail } from "@/types/products";
import { RelatedProductItem } from "./RelatedProductItem";

interface RelatedProductsProps {
  relatedProducts: ProductDetail[];
  currentProductAttributes: Record<string, string>;
  onAddToMiniCart: (product: ProductDetail) => void;
}

export const RelatedProducts: React.FC<RelatedProductsProps> = ({
  relatedProducts,
  currentProductAttributes,
  onAddToMiniCart,
}) => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const attributeKeys = Object.keys(currentProductAttributes);

  const toggleFilter = (attribute: string) => {
    setSelectedFilters((prev) =>
      prev.includes(attribute)
        ? prev.filter((a) => a !== attribute)
        : [...prev, attribute]
    );
  };

  const filteredProducts = relatedProducts.filter((product) => {
    if (selectedFilters.length === 0) return true;
    return selectedFilters.some(
      (attribute) => product.attributes[attribute] === currentProductAttributes[attribute]
    );
  });

  return (
    <div className="bg-white mt-6 p-4 rounded-lg shadow-lg">
      {/* Heading */}
      <div className="flex flex-col sm:flex-row justify-between items-center px-4">
        <h2 className="text-2xl font-bold text-gray-900">Related Products</h2>

        {/* Filters */}
        <div className="flex gap-2 mt-3 sm:mt-0">
          {attributeKeys.map((key) => (
            <button
              key={key}
              onClick={() => toggleFilter(key)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                selectedFilters.includes(key)
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {key}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6 px-2 sm:px-4">
        {filteredProducts.map((related) => (
          <RelatedProductItem
            key={related.id}
            product={related}
            currentAttributes={currentProductAttributes}
            onAddToMiniCart={onAddToMiniCart}
          />
        ))}
      </div>
    </div>
  );
};


/*import React, { useState } from "react";
import { ProductDetail } from "@/types/products";
import { RelatedProductItem } from "./RelatedProductItem";

interface RelatedProductsProps {
  relatedProducts: ProductDetail[];
  currentProductAttributes: Record<string, string>;
  onAddToMiniCart: (product: ProductDetail) => void;
}

export const RelatedProducts: React.FC<RelatedProductsProps> = ({
  relatedProducts,
  currentProductAttributes,
  onAddToMiniCart,
}) => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const attributeKeys = Object.keys(currentProductAttributes);

  const toggleFilter = (attribute: string) => {
    setSelectedFilters(prev =>
      prev.includes(attribute)
        ? prev.filter(a => a !== attribute)
        : [...prev, attribute]
    );
  };

  const filteredProducts = relatedProducts.filter(product => {
    if (selectedFilters.length === 0) return true;
    return selectedFilters.some(attribute => 
      product.attributes[attribute] === currentProductAttributes[attribute]
    );
  });

  return (
    <div className="bg-white mt-3">
      <div className="flex justify-between items-center px-3">
        <h2 className="text-2xl font-bold">Related Products</h2>
        <div className="flex gap-2">
          {attributeKeys.map(key => (
            <button
              key={key}
              onClick={() => toggleFilter(key)}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedFilters.includes(key)
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {key}
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 mb-4 px-3">
        {filteredProducts.map((related) => (
          <RelatedProductItem
            key={related.id}
            product={related}
            currentAttributes={currentProductAttributes}
            onAddToMiniCart={onAddToMiniCart}
          />
        ))}
      </div>
    </div>
  );
};*/