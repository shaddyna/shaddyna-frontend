/*"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BackButton from '@/components/BackButton';
import BottomNavigationBar from '@/components/BottomNav';
import Footer from '@/components/Footer';
import HeadNavigation from '@/components/HeadNavigation';
import { FaFacebookF, FaHeart, FaInstagram, FaShoppingCart, FaTwitter } from 'react-icons/fa';
import Back from '@/components/Back';
import { useRouter } from "next/navigation";
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { CartItem, useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import ShimmerLoader from '@/components/ShopDetailsShimmer';
import Snackbar from '@/components/SnackBar';

interface Review {
  user: string;
  rating: number;
  comment: string;
}

interface Shop {
  createdAt: string | number | Date;
  _id: string;
  name: string;
  location: string;
  image: string;
  description: string;
  rating: number;
  productsCount: number;
  joinDate: string;
  contact: string;
  email: string;
  successfulSalesCount: number;
  products: Array<{ name: string; price: string; image: string }>;
  socialLinks: {
    facebook: string;
    instagram: string;
    twitter: string;
  };
}

interface Product {
  images: string[];   // Array of image URLs (strings)
  _id: string;
  name: string;
  price: number;
  image: string;      // The main image (if you still need it)
  sellerId: string;
  rating: number; 
}


const ShopDetails: React.FC = () => {
  const [shop, setShop] = useState<Shop | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({ user: '', rating: 0, comment: '' });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const { items: cartItems, addItem } = useCartStore();
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const { items: wishlistItems, addItem: addToWishlist } = useWishlistStore();
  const [shopId, setShopId] = useState<string | null>(null);

useEffect(() => {
  if (typeof window !== "undefined") {
    const id = window.location.pathname.split('/').pop() || null; // Fallback to null
    setShopId(id);
  }
}, []);


  
//const shopId = window.location.pathname.split('/').pop(); // Assuming the shop ID is part of the URL path

  useEffect(() => {
    const fetchShopDetails = async () => {
      if (!shopId) return;
  
      try {
        console.log("Fetching shop details for shopId:", shopId);
  
        // Fetch shop details
        const { data: shopResponse } = await axios.get(
          `https://shaddyna-backend.onrender.com/api/shops/${shopId}`
        );
        console.log("Shop Response:", shopResponse);
  
        const { shop: shopData, reviews } = shopResponse;
        const sellerId = shopData?.sellerId?._id || shopData?.sellerId;
  
        setShop(shopData);
        setReviews(reviews);
  
        // Fetch all products
        const { data: productsResponse } = await axios.get(
          `https://shaddyna-backend.onrender.com/api/products/all`
        );
        console.log("Products Response:", productsResponse);

        // Destructure products array safely
        const { products: productsArray } = productsResponse; // Extract products array

        console.log("Destructured Products Array:", productsArray);

        // Check if productsArray is an array
        if (!Array.isArray(productsArray)) {
          throw new Error("Products response is not an array");
        }
  
        // Filter products by sellerId
        const shopProducts = productsArray.filter(
          (product: { sellerId: { toString: () => any } }) =>
            product.sellerId?.toString() === sellerId?.toString()
        );
        console.log("Filtered Shop Products:", shopProducts);
  
        setProducts(shopProducts);
      } catch (error) {
        console.error("Error fetching shop details:", error);
        setError("Failed to fetch shop details");
      } finally {
        setLoading(false);
      }
    };
  
    fetchShopDetails();
  }, [shopId]);
  
  const handleReviewChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewReview({ ...newReview, [name]: value });
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReview.user && newReview.rating && newReview.comment) {
      setReviews([...reviews, { ...newReview, rating: Number(newReview.rating) }]);
      setNewReview({ user: '', rating: 0, comment: '' });
    } else {
      alert('Please fill in all fields');
    }
  };

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

    const handleAddToCart = (product: Product) => {
      const productExists = cartItems.some((item) => item._id === product._id);
  
      if (productExists) {
        setSnackbarMessage("Product already added to cart!");
        return;
      }
  
      const cartItem = {
        _id: product._id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.images[0], // Use the first image from the array
        color: "default", // Placeholder for color
        stock: 10, // Placeholder for stock
        sellerId: product.sellerId, // Placeholder for sellerId
      };
  
      addItem(cartItem);
      setSnackbarMessage("Product added to cart!");
    };
   
    const handleWishlistClick = (product: Product) => {
      addToWishlist(product); // Add to the wishlist store
      setSnackbarMessage("Product added to wishlist!");
    };

    if (loading) {
      return <ShimmerLoader />;
    }

  if (error || !shop) {
    return <div>Error: {error}</div>;
  }

  // Inline component for displaying shop products
  const ShopProducts: React.FC<{ products: Product[] }> = ({ products }) => {
    const router = useRouter();
    return (
      <div className="mt-8 pb-4">
        <h2 className="text-2xl sm:text-3xl font-semibold text-[#182155] m-3">{shop.name} products</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 lg:gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="border pt-2 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition transform hover:scale-105 bg-white cursor-pointer"
            >
              
              <img
                src={product.images[0] || "/placeholder-image.png"} // Fallback image if the product has no image
                alt={product.name}
                className="w-full h-36 sm:h-48 object-contain" // Added `rounded-md` for medium border radius
                onClick={() => router.push(`/product/${product._id}`)} // Ensure correct ID is passed
              />
          
              <div className="p-3 pt-1 sm:p-2">
                <h3 className="text-sm sm:text-base font-semibold text-gray-800 truncate">
                  {product.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
                  Kes {product.price}
                </p>
                <p className="text-xs sm:text-sm text-gray-800 tex[#182155] font-bold mt-1">
                  Shop Name
                  {/*{product.sellerId.toString()}*
                </p>
                <div className="flex items-center mt-2">{renderStars(product.rating)}</div>
                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-[#182155] text-white py-1 px-3 sm:py-1.5 sm:px-5 rounded-full font-bold text-xs sm:text-sm shadow-md hover:from-yellow-500 hover:to-yellow-700 transition-all transform hover:scale-105 flex items-center gap-1"
                  >
                    <FaShoppingCart className="text-sm sm:text-base" />
                    Add to Cart
                  </button>
                  <button
                    onClick={() => handleWishlistClick(product)}
                    className="text-[#ff199c] hover:text-red-600 transition-transform transform hover:scale-110 sm:hover:scale-125"
                  >
                    <FaHeart size={16} className="sm:size-[20px]" />
                  </button>
                </div>
              </div>
            </div>
          ))}
           {snackbarMessage && (
        <Snackbar
          message={snackbarMessage}
          onClose={() => setSnackbarMessage("")}
        />
      )}
        </div>



      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Back Button *
      <Back title={'Shop details'} />

      <div className="container mx-auto p-3">
        {/* Shop Header *
        <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-8 mb-8 px-0 sm:px-12 md:px-16">
          <div className="w-32 h-32 md:w-40 md:h-40 overflow-hidden rounded-full shadow-lg border-4 border-[#ff199c]">
            <img
              src={shop.image || 'https://via.placeholder.com/150'}
              alt={shop.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center w-full space-y-4 md:space-y-0 md:space-x-6 p-4 bg-white rounded-lg shadow-md border border-gray-300">
          {/* Shop Info *
          <div className="flex flex-col w-full space-y-2">
            <h1 className="text-3xl font-semibold text-[#182155] leading-tight">{shop.name}</h1>
            <p className="text-md text-gray-500"> <span className="font-medium text-[#182155]">Location: </span>{shop.location}</p>
            <p className="text-sm text-gray-500"> <span className="font-medium text-[#182155]">Description: </span>{shop.description}</p>

            <div className="flex items-center space-x-4 mt-3">
              <span className="text-[#ff199c] text-xl font-medium flex items-center space-x-1">
                <span>⭐</span> 
                <span>{shop.rating}</span>
              </span>
              <span className="text-sm text-gray-500">
                ({products.length} Products)
              </span>
            </div>

            <div className="space-y-1 text-sm text-gray-500 mt-4">
              <p>
                <span className="font-medium text-[#182155]">Joined on:</span> {new Date(shop.createdAt).toLocaleDateString()}
              </p>
              <p>
                <span className="font-medium text-[#182155]">Successful Sales:</span> {shop.successfulSalesCount}
              </p>
            </div>
          </div>

          {/* Follow Button *
          <div className="flex justify-center w-full md:w-auto mt-4 md:mt-0">
            <button className="py-2 px-6 bg-gradient-to-r from-[#ff199c] to-pink-500 text-white rounded-lg hover:shadow-md hover:scale-105 transition-transform duration-200 text-sm font-medium">
              Follow Shop
            </button>
          </div>
        </div>

        </div>

        {/* Shop Products *
        <ShopProducts products={products} />

        {/* Shop Contacts *
        <div className="mb-10">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#333333] mb-0">Contact</h2>
          <p className="text-sm sm:text-base text-gray-600">Email: {shop.email}</p>
          <p className="text-sm sm:text-base text-gray-600">Phone: {shop.contact}</p>
        </div>

        {/* Shop Reviews *
        <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#182155] mb-6 mt-8">Customer Reviews</h2>
          <div className="space-y-8">
           {/*} {reviews.map((review, index) => (
              <div key={index} className="border-b pb-6 mb-6">
                <p className="text-lg font-semibold text-gray-800">{review.user}</p>
                <p className="text-sm text-gray-600">Rating: {review.rating}/5</p>
                <p className="mt-2 text-gray-500">{review.comment}</p>
              </div>
            ))}*
          </div>

          {/* Write a Review Section *
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Write a Review</h3>
          <form className="space-y-4 mt-4">
            <div className="space-y-2">
              <input
                type="text"
                name="user"
                value={newReview.user}
                onChange={handleReviewChange}
                placeholder="Your name"
                className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-[#ff199c] transition"
              />
              <input
                type="number"
                name="rating"
                value={newReview.rating}
                onChange={handleReviewChange}
                min={1}
                max={5}
                placeholder="Your rating (1-5)"
                className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-[#ff199c] transition"
              />
              <textarea
                name="comment"
                value={newReview.comment}
                onChange={handleReviewChange}
                placeholder="Your review"
                className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-[#ff199c] transition"
                rows={5}
              ></textarea>
            </div>
            <button
              type="submit"
              className="mt-4 w-full py-2 bg-[#ff199c] text-white rounded-lg hover:bg-pink-700 transition"
            >
              Submit Review
            </button>
          </form>
        </div>
      </div>

      {/* Footer and Bottom Navigation Bar *
      <Footer />
      <BottomNavigationBar />
    </div>
  );
};

export default ShopDetails;*/



/*"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BackButton from '@/components/BackButton';
import BottomNavigationBar from '@/components/BottomNav';
import Footer from '@/components/Footer';
import HeadNavigation from '@/components/HeadNavigation';
import { FaFacebookF, FaHeart, FaInstagram, FaShoppingCart, FaTwitter } from 'react-icons/fa';
import Back from '@/components/Back';
import { useRouter } from "next/navigation";
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import ShimmerLoader from '@/components/ShopDetailsShimmer';
import Snackbar from '@/components/SnackBar';

interface Review {
  user: string;
  rating: number;
  comment: string;
}

interface Shop {
  createdAt: string | number | Date;
  _id: string;
  name: string;
  location: string;
  image: string;
  description: string;
  rating: number;
  productsCount: number;
  joinDate: string;
  contact: string;
  email: string;
  successfulSalesCount: number;
  products: Array<{ name: string; price: string; image: string }>;
  socialLinks: {
    facebook: string;
    instagram: string;
    twitter: string;
  };
}

interface Product {
  shelfId: string;
  images: string[];   // Array of image URLs (strings)
  _id: string;
  name: string;
  price: number;
  image: string;      // The main image (if you still need it)
  sellerId: string;
  rating: number; 
}



const ShopDetails: React.FC = () => {
  const [shop, setShop] = useState<Shop | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({ user: '', rating: 0, comment: '' });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const { items: cartItems, addItem } = useCartStore();
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const { items: wishlistItems, addItem: addToWishlist } = useWishlistStore();
  

  const shopId = window.location.pathname.split('/').pop(); // Assuming the shop ID is part of the URL path

  useEffect(() => {
    const fetchShopDetails = async () => {
      if (!shopId) return;
  
      try {
        console.log("Fetching shop details for shopId:", shopId);
  
        // Fetch shop details
        const { data: shopResponse } = await axios.get(
          `https://shaddyna-backend.onrender.com/api/shops/${shopId}`
        );
        console.log("Shop Response:", shopResponse);
  
        const { shop: shopData, reviews } = shopResponse;
        const sellerId = shopData?.sellerId?._id || shopData?.sellerId;
  
        setShop(shopData);
        setReviews(reviews);
  
        // Fetch all products
        const { data: productsResponse } = await axios.get(
          `https://shaddyna-backend.onrender.com/api/products/all`
        );
        console.log("Products Response:", productsResponse);

        // Destructure products array safely
        const { products: productsArray } = productsResponse; // Extract products array

        console.log("Destructured Products Array:", productsArray);

        // Check if productsArray is an array
        if (!Array.isArray(productsArray)) {
          throw new Error("Products response is not an array");
        }
  
        // Filter products by sellerId
        const shopProducts = productsArray.filter(
          (product: { sellerId: { toString: () => any } }) =>
            product.sellerId?.toString() === sellerId?.toString()
        );
        console.log("Filtered Shop Products:", shopProducts);
  
        setProducts(shopProducts);
      } catch (error) {
        console.error("Error fetching shop details:", error);
        setError("Failed to fetch shop details");
      } finally {
        setLoading(false);
      }
    };
  
    fetchShopDetails();
  }, [shopId]);
  
  const handleReviewChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewReview({ ...newReview, [name]: value });
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReview.user && newReview.rating && newReview.comment) {
      setReviews([...reviews, { ...newReview, rating: Number(newReview.rating) }]);
      setNewReview({ user: '', rating: 0, comment: '' });
    } else {
      alert('Please fill in all fields');
    }
  };

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
  
    const handleAddToCart = (product: Product) => {
      const productExists = cartItems.some((item) => item._id === product._id);
  
      if (productExists) {
        setSnackbarMessage("Product already added to cart!");
        return;
      }
  
      const cartItem = {
        _id: product._id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.images[0], // Use the first image from the array
        color: "default", // Placeholder for color
        stock: 10, // Placeholder for stock
        sellerId: product.sellerId, // Placeholder for sellerId
        shelfId: product.shelfId,
      };
  
      addItem(cartItem);
      setSnackbarMessage("Product added to cart!");
    };
  
    const handleWishlistClick = (product: Product) => {
      addToWishlist(product); // Add to the wishlist store
      setSnackbarMessage("Product added to wishlist!");
    };

    if (loading) {
      return <ShimmerLoader />;
    }

  if (error || !shop) {
    return <div>Error: {error}</div>;
  }

  // Inline component for displaying shop products
  const ShopProducts: React.FC<{ products: Product[] }> = ({ products }) => {
    const router = useRouter();
    return (
      <div className="mt-8 pb-4">
        <h2 className="text-2xl sm:text-3xl font-semibold text-[#182155] m-3">{shop.name} products</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {products.map(product => (
            <div key={product._id} className="border rounded-lg shadow-md p-2">
              <img
                src={product.images[0] || "/placeholder-image.png"} // Fallback image if the product has no image
                alt={product.name}
                className="w-full h-36 sm:h-48 object-contain" // object-contain keeps the aspect ratio
                onClick={() => router.push(`/product/${product._id}`)} // Ensure correct ID is passed
              />
              <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
              <p className="text-gray-600 text-sm mt-2">Price: Ksh {product.price}</p>
              <div className="flex items-center mt-2">{renderStars(product.rating)}</div>
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-[#182155] text-white py-1 px-3 sm:py-1.5 sm:px-5 rounded-full font-bold text-xs sm:text-sm shadow-md hover:from-yellow-500 hover:to-yellow-700 transition-all transform hover:scale-105 flex items-center gap-1"
                >
                  <FaShoppingCart className="text-sm sm:text-base" />
                  Add to Cart
                </button>
                <button
                  onClick={() => handleWishlistClick(product)}
                  className="text-[#ff199c] hover:text-red-600 transition-transform transform hover:scale-110 sm:hover:scale-125"
                >
                  <FaHeart size={16} className="sm:size-[20px]" />
                </button>
              </div>
            </div>
          ))}
          {snackbarMessage && (
        <Snackbar
          message={snackbarMessage}
          onClose={() => setSnackbarMessage("")}
        />
      )}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Back Button *
      <Back title={'Shop details'} />

      <div className="container mx-auto p-3">
        {/* Shop Header *
        <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-8 mb-8 px-0 sm:px-12 md:px-16">
          <div className="w-32 h-32 md:w-40 md:h-40 overflow-hidden rounded-full shadow-lg border-4 border-[#ff199c]">
            <img
              src={shop.image || 'https://via.placeholder.com/150'}
              alt={shop.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center w-full space-y-4 md:space-y-0 md:space-x-6 p-4 bg-white rounded-lg shadow-md border border-gray-300">
          {/* Shop Info *
          <div className="flex flex-col w-full space-y-2">
            <h1 className="text-3xl font-semibold text-[#182155] leading-tight">{shop.name}</h1>
            <p className="text-md text-gray-500"> <span className="font-medium text-[#182155]">Location: </span>{shop.location}</p>
            <p className="text-sm text-gray-500"> <span className="font-medium text-[#182155]">Description: </span>{shop.description}</p>

            <div className="flex items-center space-x-4 mt-3">
              <span className="text-[#ff199c] text-xl font-medium flex items-center space-x-1">
                <span>⭐</span> 
                <span>{shop.rating}</span>
              </span>
              <span className="text-sm text-gray-500">
                ({products.length} Products)
              </span>
            </div>

            <div className="space-y-1 text-sm text-gray-500 mt-4">
              <p>
                <span className="font-medium text-[#182155]">Joined on:</span> {new Date(shop.createdAt).toLocaleDateString()}
              </p>
              <p>
                <span className="font-medium text-[#182155]">Successful Sales:</span> {shop.successfulSalesCount}
              </p>
            </div>
          </div>

          {/* Follow Button *
          <div className="flex justify-center w-full md:w-auto mt-4 md:mt-0">
            <button className="py-2 px-6 bg-gradient-to-r from-[#ff199c] to-pink-500 text-white rounded-lg hover:shadow-md hover:scale-105 transition-transform duration-200 text-sm font-medium">
              Follow Shop
            </button>
          </div>
        </div>

        </div>

        {/* Shop Products *
        <ShopProducts products={products} />

        {/* Shop Contacts *
        <div className="mb-10">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#333333] mb-0">Contact</h2>
          <p className="text-sm sm:text-base text-gray-600">Email: {shop.email}</p>
          <p className="text-sm sm:text-base text-gray-600">Phone: {shop.contact}</p>
        </div>

        {/* Shop Reviews *
        <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#182155] mb-6 mt-8">Customer Reviews</h2>
          <div className="space-y-8">
           {/*} {reviews.map((review, index) => (
              <div key={index} className="border-b pb-6 mb-6">
                <p className="text-lg font-semibold text-gray-800">{review.user}</p>
                <p className="text-sm text-gray-600">Rating: {review.rating}/5</p>
                <p className="mt-2 text-gray-500">{review.comment}</p>
              </div>
            ))}*
          </div>

          {/* Write a Review Section *
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Write a Review</h3>
          <form className="space-y-4 mt-4">
            <div className="space-y-2">
              <input
                type="text"
                name="user"
                value={newReview.user}
                onChange={handleReviewChange}
                placeholder="Your name"
                className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-[#ff199c] transition"
              />
              <input
                type="number"
                name="rating"
                value={newReview.rating}
                onChange={handleReviewChange}
                min={1}
                max={5}
                placeholder="Your rating (1-5)"
                className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-[#ff199c] transition"
              />
              <textarea
                name="comment"
                value={newReview.comment}
                onChange={handleReviewChange}
                placeholder="Your review"
                className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-[#ff199c] transition"
                rows={5}
              ></textarea>
            </div>
            <button
              type="submit"
              className="mt-4 w-full py-2 bg-[#ff199c] text-white rounded-lg hover:bg-pink-700 transition"
            >
              Submit Review
            </button>
          </form>
        </div>
      </div>

      {/* Footer and Bottom Navigation Bar *
      <Footer />
    </div>
  );
};

export default ShopDetails;*/







"use client";

import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Back from '@/components/Back';
import { useRouter } from "next/navigation";
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import ShimmerLoader from '@/components/ShopDetailsShimmer';
import Snackbar from '@/components/SnackBar';
import { FaArrowLeft, FaBoxOpen, FaCalendarAlt, FaEnvelope, FaFacebookF, FaHeart, FaInstagram, FaMapMarkerAlt, FaPhone, FaShoppingCart, FaTwitter } from 'react-icons/fa';
import router from 'next/router';
import Footer from '@/components/Footer';

// ... keep other imports the same
interface Review {
  user: string;
  rating: number;
  comment: string;
}

interface Shop {
  createdAt: string | number | Date;
  _id: string;
  name: string;
  location: string;
  image: string;
  description: string;
  rating: number;
  productsCount: number;
  joinDate: string;
  contact: string;
  email: string;
  successfulSalesCount: number;
  products: Array<{ name: string; price: string; image: string }>;
  socialLinks: {
    facebook: string;
    instagram: string;
    twitter: string;
  };
}

interface Product {
  shelfId: string;
  images: string[];   // Array of image URLs (strings)
  _id: string;
  name: string;
  price: number;
  image: string;      // The main image (if you still need it)
  sellerId: string;
  rating: number; 
}


const ShopDetails: React.FC = () => {
  // ... keep existing state and logic the same
  const [shop, setShop] = useState<Shop | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({ user: '', rating: 0, comment: '' });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const { items: cartItems, addItem } = useCartStore();
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const { items: wishlistItems, addItem: addToWishlist } = useWishlistStore();
  

  const shopId = window.location.pathname.split('/').pop(); // Assuming the shop ID is part of the URL path

  useEffect(() => {
    const fetchShopDetails = async () => {
      if (!shopId) return;
  
      try {
        console.log("Fetching shop details for shopId:", shopId);
  
        // Fetch shop details
        const { data: shopResponse } = await axios.get(
          `https://shaddyna-backend.onrender.com/api/shops/${shopId}`
        );
        console.log("Shop Response:", shopResponse);
  
        const { shop: shopData, reviews } = shopResponse;
        const sellerId = shopData?.sellerId?._id || shopData?.sellerId;
  
        setShop(shopData);
        setReviews(reviews);
  
        // Fetch all products
        const { data: productsResponse } = await axios.get(
          `https://shaddyna-backend.onrender.com/api/products/all`
        );
        console.log("Products Response:", productsResponse);

        // Destructure products array safely
        const { products: productsArray } = productsResponse; // Extract products array

        console.log("Destructured Products Array:", productsArray);

        // Check if productsArray is an array
        if (!Array.isArray(productsArray)) {
          throw new Error("Products response is not an array");
        }
  
        // Filter products by sellerId
        const shopProducts = productsArray.filter(
          (product: { sellerId: { toString: () => any } }) =>
            product.sellerId?.toString() === sellerId?.toString()
        );
        console.log("Filtered Shop Products:", shopProducts);
  
        setProducts(shopProducts);
      } catch (error) {
        console.error("Error fetching shop details:", error);
        setError("Failed to fetch shop details");
      } finally {
        setLoading(false);
      }
    };
  
    fetchShopDetails();
  }, [shopId]);
  
  const handleReviewChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewReview({ ...newReview, [name]: value });
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReview.user && newReview.rating && newReview.comment) {
      setReviews([...reviews, { ...newReview, rating: Number(newReview.rating) }]);
      setNewReview({ user: '', rating: 0, comment: '' });
    } else {
      alert('Please fill in all fields');
    }
  };

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
  
    const handleAddToCart = (product: Product) => {
      const productExists = cartItems.some((item) => item._id === product._id);
  
      if (productExists) {
        setSnackbarMessage("Product already added to cart!");
        return;
      }
  
      const cartItem = {
        _id: product._id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.images[0], // Use the first image from the array
        color: "default", // Placeholder for color
        stock: 10, // Placeholder for stock
        sellerId: product.sellerId, // Placeholder for sellerId
        shelfId: product.shelfId,
      };
  
      addItem(cartItem);
      setSnackbarMessage("Product added to cart!");
    };
  
    const handleWishlistClick = (product: Product) => {
      addToWishlist(product); // Add to the wishlist store
      setSnackbarMessage("Product added to wishlist!");
    };

    if (loading) {
      return <ShimmerLoader />;
    }

  if (error || !shop) {
    return <div>Error: {error}</div>;
  }

  // Inline component for displaying shop products
  const ShopProducts: React.FC<{ products: Product[] }> = ({ products }) => {
    const router = useRouter();
    return (
      <div className="mt-8 pb-4">
        <h2 className="text-2xl sm:text-3xl font-semibold text-[#182155] m-3">{shop.name} products</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {products.map(product => (
            <div key={product._id} className="border rounded-lg shadow-md p-2">
              <img
                src={product.images[0] || "/placeholder-image.png"} // Fallback image if the product has no image
                alt={product.name}
                className="w-full h-36 sm:h-48 object-contain" // object-contain keeps the aspect ratio
                onClick={() => router.push(`/product/${product._id}`)} // Ensure correct ID is passed
              />
              <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
              <p className="text-gray-600 text-sm mt-2">Price: Ksh {product.price}</p>
              <div className="flex items-center mt-2">{renderStars(product.rating)}</div>
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-[#182155] text-white py-1 px-3 sm:py-1.5 sm:px-5 rounded-full font-bold text-xs sm:text-sm shadow-md hover:from-yellow-500 hover:to-yellow-700 transition-all transform hover:scale-105 flex items-center gap-1"
                >
                  <FaShoppingCart className="text-sm sm:text-base" />
                  Add to Cart
                </button>
                <button
                  onClick={() => handleWishlistClick(product)}
                  className="text-[#ff199c] hover:text-red-600 transition-transform transform hover:scale-110 sm:hover:scale-125"
                >
                  <FaHeart size={16} className="sm:size-[20px]" />
                </button>
              </div>
            </div>
          ))}
          {snackbarMessage && (
        <Snackbar
          message={snackbarMessage}
          onClose={() => setSnackbarMessage("")}
        />
      )}
        </div>
      </div>
    );
  };



/*const ShopHeader = () => {
  return (
    <div className="bg-gradient-to-b from-[#182155] to-[#2a3a8a] text-white py-10">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-6">
        {/* Shop Image *
        <div className="relative w-32 h-32">
          <img
            src={shop.image || "https://via.placeholder.com/150"}
            alt={shop.name}
            className="w-full h-full rounded-full border-4 border-[#ff199c] shadow-lg object-cover"
          />
          <div className="absolute bottom-2 right-2 bg-[#ff199c] rounded-full px-3 py-1 text-xs font-bold shadow-md">
            ⭐ {shop.rating}
          </div>
        </div>

        {/* Shop Info *
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-bold mb-2">{shop.name}</h1>
          <p className="text-sm flex justify-center md:justify-start gap-4 text-gray-300">
            <span>📍 {shop.location}</span>
            <span>🛍️ {products.length} products</span>
          </p>

          {/* Social Links *
          <div className="flex justify-center md:justify-start gap-4 mt-4">
            {[
              { icon: FaFacebookF, link: "#" },
              { icon: FaInstagram, link: "#" },
              { icon: FaTwitter, link: "#" },
            ].map(({ icon: Icon, link }, index) => (
              <a
                key={index}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#ff199c] transition transform hover:scale-110"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};*/


const ShopHeader = () => {
  const router = useRouter();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate image scale & position shift based on scroll
  const imageScale = Math.max(0.5, 1 - scrollY / 300); // Shrinks from 1 to 0.5
  const imageTranslateY = Math.min(0, -scrollY / 2); // Moves up smoothly
  const opacity = Math.max(0, 1 - scrollY / 200); // Fades out smoothly

  return (
    <div className="relative">
      {/* Floating Back Button (Always Visible) */}
      <div className="fixed top-4 left-4 z-50">
        <button
          onClick={() => router.back()}
          className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition"
        >
          <FaArrowLeft className="text-[#182155] text-lg" />
        </button>
      </div>

      {/* Sticky Header (Appears After Scrolling) */}
      {scrollY > 100 && (
        <div className="fixed top-0 left-0 w-full bg-gradient-to-b from-[#182155] to-[#2a3a8a] text-white shadow-md z-50 py-3 transition-all duration-300">
          <div className="container mx-auto px-6 flex items-center gap-4">
            {/* Back Button (Reused in Sticky Bar) */}
            <button
              onClick={() => router.back()}
              className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition"
            >
              <FaArrowLeft className="text-[#182155] text-lg" />
            </button>

            {/* Shrunk Shop Image & Name */}
            <div className="relative w-12 h-12">
              <img
                src={shop.image || "https://via.placeholder.com/150"}
                alt={shop.name}
                className="w-full h-full rounded-full border-2 border-[#ff199c] shadow-lg object-cover"
              />
            </div>
            <h1 className="text-lg font-bold">{shop.name}</h1>
          </div>
        </div>
      )}

      {/* Full Header (Initial View with Shrinking Effect) */}
      <div className="bg-gradient-to-b from-[#182155] to-[#2a3a8a] text-white py-10">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-6">
          {/* Large Shop Image with Shrinking Effect */}
          <div
            className="relative w-32 h-32 transition-transform duration-300"
            style={{
              transform: `scale(${imageScale}) translateY(${imageTranslateY}px)`,
              opacity: opacity,
            }}
          >
            <img
              src={shop.image || "https://via.placeholder.com/150"}
              alt={shop.name}
              className="w-full h-full rounded-full border-4 border-[#ff199c] shadow-lg object-cover"
            />
            <div className="absolute bottom-2 right-2 bg-[#ff199c] rounded-full px-3 py-1 text-xs font-bold shadow-md">
              ⭐ {shop.rating}
            </div>
          </div>

          {/* Shop Info */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold mb-2">{shop.name}</h1>
            <p className="text-sm flex justify-center md:justify-start gap-4 text-gray-300">
              <span>📍 {shop.location}</span>
              <span>🛍️ {products.length} products</span>
            </p>

            {/* Social Links */}
            <div className="flex justify-center md:justify-start gap-4 mt-4">
              {[
                { icon: FaFacebookF, link: "#" },
                { icon: FaInstagram, link: "#" },
                { icon: FaTwitter, link: "#" },
              ].map(({ icon: Icon, link }, index) => (
                <a
                  key={index}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#ff199c] transition transform hover:scale-110"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BusinessInfo = () => {
  return (
    <div className="container mx-auto px-6 py-8">
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-[#182155] mb-4">Business Details</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
          <div className="space-y-4 border rounded-lg p-4 shadow-sm">
            <p className="flex items-center gap-2">
              <FaCalendarAlt className="text-[#182155]" />
              <span className="font-medium">Joined:</span> {new Date(shop.createdAt).toLocaleDateString()}
            </p>
            <p className="flex items-center gap-2">
              <FaPhone className="text-[#182155]" />
              <span className="font-medium">Contact:</span> {shop.contact}
            </p>
            <p className="flex items-center gap-2">
              <FaEnvelope className="text-[#182155]" />
              <span className="font-medium">Email:</span> {shop.email}
            </p>
          </div>
          <div className="space-y-4 border rounded-lg p-4 shadow-sm">
            <p className="flex items-center gap-2">
              <FaBoxOpen className="text-[#182155]" />
              <span className="font-medium">Successful Sales:</span> {shop.successfulSalesCount}
            </p>
            <p className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-[#182155]" />
              <span className="font-medium">Location:</span> {shop.location}
            </p>
          </div>
        </div>
        
        <div className="mt-6 border rounded-lg p-4 shadow-sm">
          <h3 className="text-xl font-semibold text-[#182155] mb-2">About Us</h3>
          <p className="text-gray-600 leading-relaxed text-sm md:text-base">
            {shop.description || "No description available."}
          </p>
        </div>
      </div>
    </div>
  );
};
  const ProductCatalog = () => {
    const router = useRouter();
  
    // Limit featured products to show in the horizontal scroll
    const featuredProducts = products.slice(0, 5);
  
    return (
      <div className="container mx-auto px-6 py-8">
        {/* Header with "See All" button aligned to the right */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-[#182155]">Products</h2>
          <button
            onClick={() => router.push("/products")}
            className="text-[#182155] font-semibold hover:underline"
          >
            See All
          </button>
        </div>
  
        {/* Section 1: Horizontal Scrollable Featured Products */}
        <div className="flex overflow-x-auto gap-4 pb-2 scrollbar-hide">
          {featuredProducts.map((product) => (
            <div
              key={product._id}
              className="flex-shrink-0 w-44 bg-white rounded-lg shadow-md p-3 border"
            >
              <img
                src={product.images[0] || "/placeholder-image.png"}
                alt={product.name}
                className="w-full h-32 object-cover rounded-md cursor-pointer"
                onClick={() => router.push(`/product/${product._id}`)}
              />
              <h3 className="text-sm font-semibold text-gray-800 mt-2 truncate">{product.name}</h3>
              <p className="text-[#ff199c] font-bold text-sm">Ksh {product.price}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  

  return (
    <div className="bg-gray-50 min-h-screen relative">
     

      <ShopHeader />
      <BusinessInfo />
      <ProductCatalog />

      {/* Reviews Section */}
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-[#182155] mb-6">Customer Reviews</h2>
          {/* ... rest of reviews section */}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ShopDetails;