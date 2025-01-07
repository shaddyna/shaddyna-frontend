"use client";

import BottomNavigationBar from "@/components/BottomNav";
import Footer from "@/components/Footer";
import HeadNavigation from "@/components/HeadNavigation";
import React, { useState, useEffect } from "react";
import { AiFillStar, AiOutlineHeart, AiOutlineLink, AiOutlineMessage, AiOutlineShareAlt, AiOutlineStar } from "react-icons/ai";

// Example product data, you would typically fetch this from an API
const productData = [
  {
    "id": 1,
    "name": "Stylish Sneakers",
    "price": 4999,
    "image": "https://i.pinimg.com/236x/fa/c5/71/fac571b9e25da30a89669e8848bb41db.jpg",
    "rating": 4.5,
    "description": "A pair of stylish sneakers for every occasion.",
    "colors": ["Black", "White", "Red"],
    "sizes": ["6", "7", "8", "9", "10"],
    "inStock": true,
    "reviews": [
      { "user": "John Doe", "rating": 5, "comment": "Amazing shoes, love the comfort!" },
      { "user": "Jane Smith", "rating": 4, "comment": "Great quality, but runs slightly small." }
    ],
    "additionalImages": [
      "https://i.pinimg.com/236x/fa/c5/71/fac571b9e25da30a89669e8848bb41db.jpg",
      "https://i.pinimg.com/236x/43/15/ae/4315ae69df9daa2550203db798b0d77f.jpg"
    ],
    "seller": "Stylish Footwear Co."
  },
];

interface ProductDetailPageProps {
  params: Promise<Record<string, string | undefined>>; // Make params a Promise to handle async behavior
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ params }) => {
  const [paramId, setParamId] = useState<string | undefined>(undefined);
  const [selectedColor, setSelectedColor] = useState("Black");
  const [selectedSize, setSelectedSize] = useState("One Size");
  const [reviewText, setReviewText] = useState("");

  useEffect(() => {
    // Assuming params is a Promise, unwrap it with React.use() or a simple async function
    const fetchParams = async () => {
      const resolvedParams = await params;
      setParamId(resolvedParams.id);
    };

    fetchParams();
  }, [params]);

  const product = productData.find((item) => item.id === Number(paramId));

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Review submitted!");
    setReviewText("");
  };

  return (
    <div>
      <HeadNavigation />
      <div className="p-6 max-w-7xl mx-auto">
        {/* Product Image and Details */}
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2 mb-6 lg:mb-0">
            <div className="w-full mb-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="flex space-x-4">
              {product.additionalImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Product additional image ${index + 1}`}
                  className="w-20 h-20 object-cover rounded-lg cursor-pointer hover:opacity-80"
                />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="w-full lg:w-1/2 pl-0 lg:pl-6">
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <p className="text-xl text-gray-600 mt-2">Kes {product.price}</p>
            <div className="flex items-center mt-2">
              {Array.from({ length: Math.floor(product.rating) }, (_, i) => (
                <AiFillStar key={i} className="text-yellow-400" />
              ))}
              {product.rating % 1 >= 0.5 && <AiFillStar className="text-yellow-400" />}
              {Array.from({ length: 5 - Math.floor(product.rating) }, (_, i) => (
                <AiOutlineStar key={i} className="text-gray-300" />
              ))}
              <span className="ml-2 text-gray-500">({product.reviews.length} reviews)</span>
            </div>

            {/* Sold By */}
            <div className="mt-6 flex items-center space-x-3">
              <a href={`/seller/${product.seller}`} className="flex items-center space-x-2">
                <img
                  src={"https://i.pinimg.com/736x/59/37/5f/59375f2046d3b594d59039e8ffbf485a.jpg"}
                  alt={`${product.seller} Profile`}
                  className="w-10 h-10 rounded-full object-cover border-2 border-gray-300"
                />
                <div>
                  <p className="text-lg font-semibold text-gray-800 hover:text-gray-600">{product.seller}</p>
                  <p className="text-sm text-gray-500">Visit Shop</p>
                </div>
              </a>
            </div>

            {/* Product Actions */}
            <div className="flex space-x-6 mt-6">
              <button className="text-gray-600 hover:text-yellow-500">
                <AiOutlineHeart size={24} />
              </button>
              <button className="text-gray-600 hover:text-yellow-500">
                <AiOutlineMessage size={24} />
              </button>
              <button className="text-gray-600 hover:text-yellow-500">
                <AiOutlineShareAlt size={24} />
              </button>
              <button className="text-gray-600 hover:text-yellow-500">
                <AiOutlineLink size={24} />
              </button>
            </div>

            {/* Color & Size Selector */}
            <div className="mt-4">
              <label className="block text-sm font-semibold text-gray-700">Color</label>
              <div className="flex space-x-4 mt-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full border-2 ${selectedColor === color ? "border-yellow-500" : "border-gray-300"}`}
                    style={{ backgroundColor: color.toLowerCase() }}
                  ></button>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-semibold text-gray-700">Size</label>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="mt-2 p-2 border rounded-md w-20"
              >
                {product.sizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-4 flex items-center">
              <button className="bg-[#182155] text-white py-2 px-4 rounded-md w-full">
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold text-gray-800">Customer Reviews</h2>
          {product.reviews.map((review, index) => (
            <div key={index} className="mt-4">
              <div className="flex items-center space-x-2">
                {Array.from({ length: review.rating }, (_, i) => (
                  <AiFillStar key={i} className="text-yellow-400" />
                ))}
                {Array.from({ length: 5 - review.rating }, (_, i) => (
                  <AiOutlineStar key={i} className="text-gray-300" />
                ))}
              </div>
              <p className="text-gray-800 mt-2">{review.comment}</p>
              <p className="text-gray-500 text-sm mt-1">{review.user}</p>
            </div>
          ))}
        </div>

        {/* Review Form */}
        <form onSubmit={handleReviewSubmit} className="mt-12">
          <h2 className="text-xl font-semibold text-gray-800">Write a Review</h2>
          <div className="mt-4">
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className="w-full h-32 p-4 border rounded-md"
              placeholder="Write your review here"
            />
          </div>
          <div className="mt-4">
            <button type="submit" className="bg-[#182155] text-white py-2 px-4 rounded-md">
              Submit Review
            </button>
          </div>
        </form>
      </div>
      <Footer />
      <BottomNavigationBar />
    </div>
  );
};

export default ProductDetailPage;
