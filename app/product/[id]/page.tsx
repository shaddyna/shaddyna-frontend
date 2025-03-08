/*"use client";

import React, { useEffect, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import Snackbar from "@/components/SnackBar";
import HeadNavigation from "@/components/HeadNavigation";
import Footer from "@/components/Footer";
import BottomNavigationBar from "@/components/BottomNav";
import Back from "@/components/Back";

interface ProductDetail {
  shelfId: any;
  sellerId: string;
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
          sellerId: data.product.sellerId || "not provided",
          shelfId: data.product.shelfId || "not provided"
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
      sellerId: product.sellerId, // Placeholder for sellerId
      shelfId: product.shelfId,
    };

    addToCart(cartItem);
    setSnackbarMessage("Product added to cart!");
  };

  const handleAddToWishlist = () => {
    if (!product) return;
  
    const wishlistItem = {
      _id: product.id,
      name: product.name,
      price: product.price,
      images: [product.image], // Convert the single image to an array
      rating: product.rating,
    };
  
    addToWishlist(wishlistItem);
    setSnackbarMessage("Product added to wishlist!");
  };

  if (!product) {

    return <div className="bg-gray-50 min-h-screen flex flex-col">
      <p className="text-center text-gray-600 mt-10">Loading product details...</p>;
      </div>
  }

  return (
    <div>
      <Back title={"Product details"} />
      <div className="bg-gray-50 min-h-screen flex flex-col">
      <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-36 sm:h-48 object-contain" 
            //className="w-full md:w-1/2 h-64 object-cover rounded-lg shadow-md"
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

export default ProductDetailPage;*/
"use client";
import { useState } from "react";

const ProductDetail = () => {
  const [cart, setCart] = useState([]);

  const product = {
    productName: "Tesla Model S",
    category: "Car",
    attributes: {
      Model: "Tesla",
      Mileage: "0-10K",
      FuelType: "Electric",
      Transmission: "Automatic",
      Year: "2022",
    },
    images: ["https://i.pinimg.com/736x/18/b4/d3/18b4d3d46ee6fe570fd8cd9d93e1c1aa.jpg"],
  };

  const handleAddToCart = () => {
    setCart((prevCart) => [...prevCart, product]);
    alert("Product added to cart!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-4">{product.productName}</h2>

        {product.images && product.images.length > 0 && (
          <div className="flex justify-center mb-4">
            <img
              src={product.images[0]}
              alt={product.productName}
              className="w-64 h-64 object-cover rounded-md"
            />
          </div>
        )}

        <div className="bg-gray-200 p-4 rounded-md">
          <h3 className="font-semibold mb-2">Product Details</h3>
          <ul className="text-sm">
            <li>
              <strong>Category:</strong> {product.category}
            </li>
            {Object.entries(product.attributes || {}).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {value}
              </li>
            ))}
          </ul>
        </div>

        <button
          className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-md"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;