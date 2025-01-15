// Add the "use client" directive at the top of your file
/*"use client";

import React from "react";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useRouter } from "next/navigation";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number; // Rating out of 5
}

const products: Product[] = [
        {
          id: 1,
          name: "Stylish Sneakers",
          price: 4999,
          image: "https://i.pinimg.com/236x/fa/c5/71/fac571b9e25da30a89669e8848bb41db.jpg",
          rating: 4.5,
        },
        {
          id: 2,
          name: "Elegant Watch",
          price: 8999,
          image: "https://i.pinimg.com/236x/3d/bd/88/3dbd885b326e461ae2cdc39f0e610edf.jpg",
          rating: 4,
        },
        {
          id: 3,
          name: "Casual Shirt",
          price: 1999,
          image: "https://i.pinimg.com/236x/52/46/d6/5246d62865736d91905f64d32556ba0f.jpg",
          rating: 5,
        },
        {
          id: 4,
          name: "Leather Jacket",
          price: 11999,
          image: "https://i.pinimg.com/236x/57/62/e7/5762e7b853030df4ed346844b99e3f62.jpg",
          rating: 4.8,
        },
        {
          id: 5,
          name: "Classic Sunglasses",
          price: 2999,
          image: "https://i.pinimg.com/236x/4c/93/fb/4c93fb1339089d235e39407f6de2bff7.jpg",
          rating: 4.2,
        },
        {
          id: 6,
          name: "Backpack",
          price: 3999,
          image: "https://i.pinimg.com/236x/60/10/1a/60101a7295810edc817856322407cb21.jpg",
          rating: 3.9,
        },
        {
          id: 7,
          name: "Bluetooth Headphones",
          price: 7499,
          image: "https://i.pinimg.com/236x/43/15/ae/4315ae69df9daa2550203db798b0d77f.jpg",
          rating: 4.7,
        },
        {
          id: 8,
          name: "Sports Shoes",
          price: 5999,
          image: "https://i.pinimg.com/236x/cb/56/ee/cb56eee0d3371d221cd3c5253a75c2f1.jpg",
          rating: 4.3,
        },
        {
          id: 9,
          name: "Wireless Mouse",
          price: 999,
          image: "https://i.pinimg.com/736x/ac/65/a5/ac65a581cb5b83062b9f3af05bf068fd.jpg",
          rating: 3.8,
        },
        {
          id: 10,
          name: "Gaming Keyboard",
          price: 4999,
          image: "https://i.pinimg.com/736x/4b/1e/09/4b1e0960bad176c1e6cd6d297771cff9.jpg",
          rating: 4.6,
        },
        {
          id: 11,
          name: "Smartphone Case",
          price: 799,
          image: "https://i.pinimg.com/236x/9b/a4/be/9ba4be5d0fab6eedd2c83d55de4910b6.jpg",
          rating: 4.1,
        },
        {
          id: 12,
          name: "Portable Speaker",
          price: 2599,
          image: "https://i.pinimg.com/236x/c5/b1/33/c5b133d8f05f359e1d6c792bea023285.jpg",
          rating: 4.4,
        },
        {
          id: 13,
          name: "Digital Camera",
          price: 24999,
          image: "https://i.pinimg.com/236x/e2/d1/00/e2d100210bcffaf0d816f01d4ff81027.jpg",
          rating: 4.9,
        },
        {
          id: 14,
          name: "Elegant Bracelet",
          price: 1999,
          image: "https://i.pinimg.com/236x/62/0c/ba/620cba00e19f5546e4b087b7c9783999.jpg",
          rating: 4,
        },
        {
          id: 15,
          name: "Travel Suitcase",
          price: 8999,
          image: "https://i.pinimg.com/474x/92/bb/f7/92bbf7aa1daf6bec66e887f20c5dc6c1.jpg",
          rating: 3.7,
        },
        {
          id: 16,
          name: "Running Shorts",
          price: 1299,
          image: "https://i.pinimg.com/736x/3a/2b/68/3a2b68815d82d2aa2d5c8b668ec2dbce.jpg",
          rating: 4.3,
        },
        {
          id: 17,
          name: "Woolen Scarf",
          price: 1499,
          image: "https://i.pinimg.com/474x/cf/e3/4a/cfe34acc857a8091aadbcf69f3d249ce.jpg",
          rating: 4.1,
        },
        {
          id: 18,
          name: "Water Bottle",
          price: 599,
          image: "https://i.pinimg.com/236x/7e/a3/e0/7ea3e0fbee59f275a86300be0425bdbe.jpg",
          rating: 4.5,
        },
        /*{
          id: 19,
          name: "Home Coffee Maker",
          price: 7999,
          image: "https://i.pinimg.com/236x/7d/41/70/7d417027c43ea19281a2baba18d14946.jpg",
          rating: 4.8,
        },
        {
          id: 20,
          name: "Fitness Tracker",
          price: 3499,
          image: "https://i.pinimg.com/236x/3c/01/34/3c01347f7367b604e0281386bcc5aedf.jpg",
          rating: 4.2,
        },*//*
      ];

      const Products: React.FC = () => {
        const renderStars = (rating: number) => {
          const fullStars = Math.floor(rating);
          const halfStar = rating % 1 >= 0.5;
      
          return (
            <>
              {Array.from({ length: fullStars }, (_, i) => (
                <AiFillStar key={i} className="text-yellow-400" />
              ))}
              {halfStar && <AiFillStar className="text-yellow-400" />}
              {Array.from({ length: 5 - fullStars - (halfStar ? 1 : 0) }, (_, i) => (
                <AiOutlineStar key={i} className="text-gray-300" />
              ))}
            </>
          );
        };
      
        const router = useRouter();
      
        const handleProductClick = (productId: number) => {
          router.push(`/product/${productId}`);
        };
      
        return (
          <div className="pb-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-6 text-center">
              Explore Our Products
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 lg:gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition transform hover:scale-105 bg-white cursor-pointer"
                  
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-36 sm:h-48 object-cover" // Reduced height for smaller screens
                    onClick={() => handleProductClick(product.id)}
                  />
                  <div className="p-3 sm:p-4">
                    <h3 className="text-sm sm:text-base font-semibold text-gray-800 truncate">
                      {product.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
                      Kes {product.price}
                    </p>
                    <p className="text-xs sm:text-sm tex[#182155] font-bold mt-1">
                      Shop Name
                    </p>
                    <div className="flex items-center mt-2">
                      {renderStars(product.rating)}
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <button className="bg-[#182155] text-white py-1 px-3 sm:py-1.5 sm:px-5 rounded-full font-bold text-xs sm:text-sm shadow-md hover:from-yellow-500 hover:to-yellow-700 transition-all transform hover:scale-105 flex items-center gap-1">
                        <FaShoppingCart className="text-sm sm:text-base" />
                        Add to Cart
                      </button>
                      <button className="text-[#ff199c] hover:text-red-600 transition-transform transform hover:scale-110 sm:hover:scale-125">
                        <FaHeart size={16} className="sm:size-[20px]" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      };

export default Products;*/

/*"use client";

import React, { useState } from "react";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cart-store"; 
import Snackbar from "@/components/SnackBar"; // Snackbar component to show messages

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number; // Rating out of 5
}

const products: Product[] = [
  {
    id: 1,
    name: "Stylish Sneakers",
    price: 4999,
    image:
      "https://i.pinimg.com/236x/fa/c5/71/fac571b9e25da30a89669e8848bb41db.jpg",
    rating: 4.5,
  },
  {
    id: 2,
    name: "Elegant Watch",
    price: 8999,
    image:
      "https://i.pinimg.com/236x/3d/bd/88/3dbd885b326e461ae2cdc39f0e610edf.jpg",
    rating: 4,
  },
];

const Products: React.FC = () => {
  const router = useRouter();
  const { items, addItem } = useCartStore();
  const [snackbarMessage, setSnackbarMessage] = useState("");

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
    const productExists = items.some((item) => item._id === product.id.toString());

    if (productExists) {
      setSnackbarMessage("Product already added to cart!");
      return;
    }

    const cartItem = {
      _id: product.id.toString(),
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
      color: "default", // Placeholder for color
      stock: 10, // Placeholder for stock
      sellerId: "67790317fafd38a4e5558f70", // Placeholder for sellerId
    };

    addItem(cartItem);
    setSnackbarMessage("Product added to cart!");
  };

  const handleProductClick = (productId: number) => {
    router.push(`/product/${productId}`);
  };

  return (
    <div className="pb-4">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-6 text-center">
        Explore Our Products
      </h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 lg:gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition transform hover:scale-105 bg-white cursor-pointer"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-36 sm:h-48 object-cover"
              onClick={() => handleProductClick(product.id)}
            />
            <div className="p-3 sm:p-4">
              <h3 className="text-sm sm:text-base font-semibold text-gray-800 truncate">
                {product.name}
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
                Kes {product.price}
              </p>
              <p className="text-xs sm:text-sm text-gray-800 tex[#182155] font-bold mt-1">
                Shop Name
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
                <button className="text-[#ff199c] hover:text-red-600 transition-transform transform hover:scale-110 sm:hover:scale-125">
                  <FaHeart size={16} className="sm:size-[20px]" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {snackbarMessage && (
        <Snackbar
          message={snackbarMessage}
          onClose={() => setSnackbarMessage("")}
        />
      )}
    </div>
  );
};

export default Products;*/

/*"use client";

import React, { useState, useEffect } from "react";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cart-store"; 
import Snackbar from "@/components/SnackBar"; // Snackbar component to show messages

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number; // Rating out of 5
}

const Products: React.FC = () => {
  const router = useRouter();
  const { items, addItem } = useCartStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    // Fetch products from the API
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products/all");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        const formattedProducts = data.products.map((product: any) => ({
          id: product._id.toString(), // Convert ObjectId to string and map to 'id'
          name: product.name,
          price: product.price,
          image: product.image,
          rating: product.rating,
        }));
        setProducts(formattedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        alert("Error fetching products. Please try again.");
      }
    };

    fetchProducts();
  }, []);

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
    const productExists = items.some((item) => item._id === product.id);

    if (productExists) {
      setSnackbarMessage("Product already added to cart!");
      return;
    }

    const cartItem = {
      _id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
      color: "default", // Placeholder for color
      stock: 10, // Placeholder for stock
      sellerId: "67790317fafd38a4e5558f70", // Placeholder for sellerId
    };

    addItem(cartItem);
    setSnackbarMessage("Product added to cart!");
  };

  const handleProductClick = (productId: string) => {
    router.push(`/product/${productId}`);
  };

  return (
    <div className="pb-4">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-6 text-center">
        Explore Our Products
      </h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 lg:gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition transform hover:scale-105 bg-white cursor-pointer"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-36 sm:h-48 object-cover"
              onClick={() => handleProductClick(product.id)}
            />
            <div className="p-3 sm:p-4">
              <h3 className="text-sm sm:text-base font-semibold text-gray-800 truncate">
                {product.name}
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
                Kes {product.price}
              </p>
              <p className="text-xs sm:text-sm text-gray-800 tex[#182155] font-bold mt-1">
                Shop Name
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
                <button className="text-[#ff199c] hover:text-red-600 transition-transform transform hover:scale-110 sm:hover:scale-125">
                  <FaHeart size={16} className="sm:size-[20px]" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {snackbarMessage && (
        <Snackbar
          message={snackbarMessage}
          onClose={() => setSnackbarMessage("")}
        />
      )}
    </div>
  );
};

export default Products;*/







/*"use client"
import React, { useState, useEffect } from "react";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";  // Import the wishlist store
import Snackbar from "@/components/SnackBar"; // Snackbar component to show messages

interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  rating: number; // Rating out of 5
}

const Products: React.FC = () => {
  const router = useRouter();
  const { items: cartItems, addItem } = useCartStore();
  const { items: wishlistItems, addItem: addToWishlist } = useWishlistStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://shaddyna-backend.onrender.com/api/products/all");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        const formattedProducts = data.products.map((product: any) => ({
          id: product._id.toString(),
          name: product.name,
          price: product.price,
          images: product.images, 
          rating: product.rating,
        }));
        setProducts(formattedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        alert("Error fetching products. Please try again.");
      }
    };

    fetchProducts();
  }, []);

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
    const productExists = cartItems.some((item) => item._id === product.id);

    if (productExists) {
      setSnackbarMessage("Product already added to cart!");
      return;
    }

    const cartItem = {
      _id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.images[0],
      color: "default", // Placeholder for color
      stock: 10, // Placeholder for stock
      sellerId: "67790317fafd38a4e5558f70", // Placeholder for sellerId
    };

    addItem(cartItem);
    setSnackbarMessage("Product added to cart!");
  };

  const handleWishlistClick = (product: Product) => {
    addToWishlist(product);  // Add to the wishlist store
    setSnackbarMessage("Product added to wishlist!");
  };

  const handleProductClick = (productId: string) => {
    router.push(`/product/${productId}`);
  };

  return (
    <div className="pb-4">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-6 text-center">
        Explore Our Products
      </h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 lg:gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition transform hover:scale-105 bg-white cursor-pointer"
          >
           <img
              src={product.images}
              alt={product.name}
              className="w-full h-36 sm:h-48 object-cover"
              onClick={() => router.push(`/product/${product.id}`)} // Ensure correct ID is passed
            />
            <div className="p-3 sm:p-4">
              <h3 className="text-sm sm:text-base font-semibold text-gray-800 truncate">
                {product.name}
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
                Kes {product.price}
              </p>
              <p className="text-xs sm:text-sm text-gray-800 tex[#182155] font-bold mt-1">
                Shop Name
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
      </div>
      {snackbarMessage && (
        <Snackbar
          message={snackbarMessage}
          onClose={() => setSnackbarMessage("")}
        />
      )}
    </div>
  );
};

export default Products;*/



"use client";
import React, { useState, useEffect } from "react";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store"; // Import the wishlist store
import Snackbar from "@/components/SnackBar"; // Snackbar component to show messages

interface Product {
  id: string;
  name: string;
  price: number;
  images: string[]; // Changed to an array of strings for image URLs
  rating: number; // Rating out of 5
}

const Products: React.FC = () => {
  const router = useRouter();
  const { items: cartItems, addItem } = useCartStore();
  const { items: wishlistItems, addItem: addToWishlist } = useWishlistStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://shaddyna-backend.onrender.com/api/products/all");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        const formattedProducts = data.products.map((product: any) => ({
          id: product._id.toString(),
          name: product.name,
          price: product.price,
          images: product.images, // Store images array
          rating: product.rating,
        }));
        setProducts(formattedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        alert("Error fetching products. Please try again.");
      }
    };

    fetchProducts();
  }, []);

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
    const productExists = cartItems.some((item) => item._id === product.id);

    if (productExists) {
      setSnackbarMessage("Product already added to cart!");
      return;
    }

    const cartItem = {
      _id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.images[0], // Use the first image from the array
      color: "default", // Placeholder for color
      stock: 10, // Placeholder for stock
      sellerId: "67790317fafd38a4e5558f70", // Placeholder for sellerId
    };

    addItem(cartItem);
    setSnackbarMessage("Product added to cart!");
  };

  const handleWishlistClick = (product: Product) => {
    addToWishlist(product); // Add to the wishlist store
    setSnackbarMessage("Product added to wishlist!");
  };

  return (
    <div className="pb-4">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-6 text-center">
        Explore Our Products
      </h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 lg:gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition transform hover:scale-105 bg-white cursor-pointer"
          >
            <img
  src={product.images[0] || "/placeholder-image.png"} // Fallback image if the product has no image
  alt={product.name}
  className="w-full h-36 sm:h-48 object-contain" // object-contain keeps the aspect ratio
  onClick={() => router.push(`/product/${product.id}`)} // Ensure correct ID is passed
/>

            <div className="p-3 sm:p-4">
              <h3 className="text-sm sm:text-base font-semibold text-gray-800 truncate">
                {product.name}
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
                Kes {product.price}
              </p>
              <p className="text-xs sm:text-sm text-gray-800 tex[#182155] font-bold mt-1">
                Shop Name
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
      </div>
      {snackbarMessage && (
        <Snackbar
          message={snackbarMessage}
          onClose={() => setSnackbarMessage("")}
        />
      )}
    </div>
  );
};

export default Products;

