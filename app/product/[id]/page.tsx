"use client";

import React, { useEffect, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import Snackbar from "@/components/SnackBar";
import HeadNavigation from "@/components/HeadNavigation";
import Footer from "@/components/Footer";
import BottomNavigationBar from "@/components/BottomNav";

interface ProductDetail {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  stock: number;
}

const ProductDetailPage: React.FC<{ params: { id: string } }> = ({ params }) => {
  const { id: productId } = params;
  const { addItem: addToCart } = useCartStore();
  const { addItem: addToWishlist } = useWishlistStore();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await fetch(
          `https://shaddyna-backend.onrender.com/api/products/${productId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }
  
        const data = await response.json();
        console.log("Raw response data from backend:", data);
  
        // Transform the raw product data
        const formattedProduct: ProductDetail = {
          id: data.product._id || "N/A",
          name: data.product.name || "No Name Provided",
          description: data.product.description || "No Description Available",
          price: data.product.price || 0,
          image: data.product.images?.[0] || "/default-image.jpg", // Use the first image or a placeholder
          rating: data.product.rating || 0,
          stock: data.product.stock || 0, // If the stock property exists in the backend, handle it here
        };
  
        setProduct(formattedProduct);
      } catch (error) {
        console.error("Error fetching product details:", error);
        alert("Error fetching product details. Please try again.");
      }
    };
  
    if (productId) fetchProductDetail();
  }, [productId]);
  

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;

    return (
      <>
        {Array.from({ length: fullStars }, (_, i) => (
          <AiFillStar key={i} className="text-yellow-400" />
        ))}
        {halfStar && <AiFillStar className="text-yellow-400" />}
        {Array.from(
          { length: 5 - fullStars - (halfStar ? 1 : 0) },
          (_, i) => (
            <AiOutlineStar key={i} className="text-gray-300" />
          )
        )}
      </>
    );
  };

  const handleAddToCart = () => {
    if (!product) return;

    const cartItem = {
      _id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
      color: "default", // Placeholder for color
      stock: product.stock,
      sellerId: "67790317fafd38a4e5558f70", // Placeholder for sellerId
    };

    addToCart(cartItem);
    setSnackbarMessage("Product added to cart!");
  };

  const handleAddToWishlist = () => {
    if (!product) return;

    addToWishlist(product);
    setSnackbarMessage("Product added to wishlist!");
  };

  if (!product) {

    return <div className="bg-gray-50 min-h-screen flex flex-col">
      <p className="text-center text-gray-600 mt-10">Loading product details...</p>;
      </div>
  }

  return (
    <div>
      <HeadNavigation />
      <div className="bg-gray-50 min-h-screen flex flex-col">
      <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <img
            src={product.image}
            alt={product.name}
            className="w-full md:w-1/2 h-64 object-cover rounded-lg shadow-md"
          />
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>
            <p className="text-gray-500 mt-2">{product.description}</p>
            <p className="text-xl font-bold text-gray-800 mt-4">
              Kes {product.price}
            </p>
            <div className="flex items-center mt-4">
              {renderStars(product.rating)}
            </div>
            <div className="flex items-center gap-4 mt-6">
              <button
                onClick={handleAddToCart}
                className="bg-[#182155] text-white py-2 px-4 rounded-md font-bold flex items-center gap-2 hover:bg-yellow-500 transition"
              >
                <FaShoppingCart />
                Add to Cart
              </button>
              <button
                onClick={handleAddToWishlist}
                className="bg-pink-500 text-white py-2 px-4 rounded-md font-bold flex items-center gap-2 hover:bg-red-600 transition"
              >
                <FaHeart />
                Add to Wishlist
              </button>
            </div>
          </div>
        </div>
        {snackbarMessage && (
          <Snackbar
            message={snackbarMessage}
            onClose={() => setSnackbarMessage("")}
          />
        )}
      </div>
      </div>
      <Footer />
      <BottomNavigationBar />
    </div>
  );
};

export default ProductDetailPage;
