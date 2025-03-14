/*"use client";
import React, { useState, useEffect } from "react";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store"; // Import the wishlist store
import Snackbar from "@/components/SnackBar"; // Snackbar component to show messages
import ProductsShimmerLoader from "./ProductShimmerLoader";
import { Heart, ShoppingCart } from "lucide-react";

interface Product {
  shelfId: string;
  sellerId: string;
  _id: string;
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
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://shaddyna-backend.onrender.com/api/products/all");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        const formattedProducts = data.products.map((product: any) => ({
          _id: product._id.toString(),
          name: product.name,
          price: product.price,
          images: product.images, // Store images array
          rating: product.rating,
          sellerId: product.sellerId ? product.sellerId.toString() : null, // Apply toString only if sellerId is not null
          shelfId: product.shelfId ? product.shelfId.toString() : null,
        }));
        setProducts(formattedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        alert("Error fetching products. Please try again.");
      } finally {
        setIsLoading(false);
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
      sellerId: product.sellerId, 
      shelfId: product.shelfId,
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
      {isLoading ? (
        <ProductsShimmerLoader />
      ) : (
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
                    className="bg-[#0f1c47] text-white py-1 px-2 sm:py-1.5 sm:px-5 rounded-full font-bold text-xs sm:text-sm shadow-md hover:from-yellow-500 hover:to-yellow-700 transition-all transform hover:scale-105 flex items-center gap-1"
                  >
                    
                    <ShoppingCart size={20} strokeWidth={2} />
                    Add to Cart
                  </button>
                  <button
                    onClick={() => handleWishlistClick(product)}
                    className="text-[#bf2c7e] hover:text-red-600 transition-transform transform hover:scale-110 sm:hover:scale-125"
                  >
                    <Heart size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
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
*/

"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import Snackbar from "@/components/SnackBar";
import ProductsShimmerLoader from "./ProductShimmerLoader";
import { Heart, ShoppingCart } from "lucide-react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

interface Product {
  shelfId: string;
  sellerId: string;
  _id: string;
  name: string;
  price: number;
  images: string[];
  rating: number;
}

const Products: React.FC = () => {
  const router = useRouter();
  const { items: cartItems, addItem } = useCartStore();
  const { items: wishlistItems, addItem: addToWishlist } = useWishlistStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const cachedProducts = localStorage.getItem("products");
      if (cachedProducts) {
        setProducts(JSON.parse(cachedProducts));
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch("https://shaddyna-backend.onrender.com/api/products/all");
        if (!response.ok) throw new Error("Failed to fetch products");
        
        const data = await response.json();
        const formattedProducts = data.products.map((product: any) => ({
          _id: product._id.toString(),
          name: product.name,
          price: product.price,
          images: product.images,
          rating: product.rating,
          sellerId: product.sellerId ? product.sellerId.toString() : null,
          shelfId: product.shelfId ? product.shelfId.toString() : null,
        }));
        
        localStorage.setItem("products", JSON.stringify(formattedProducts));
        setProducts(formattedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    if (cartItems.some((item) => item._id === product._id)) {
      setSnackbarMessage("Product already added to cart!");
      return;
    }

    addItem({
      _id: product._id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.images[0],
      sellerId: product.sellerId,
      shelfId: product.shelfId,
      color: "",
      stock: 0
    });
    setSnackbarMessage("Product added to cart!");
  };

  const handleWishlistClick = (product: Product) => {
    addToWishlist(product);
    setSnackbarMessage("Product added to wishlist!");
  };

  return (
    <div className="pb-4">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-6 text-center">
        Explore Our Products
      </h2>
      {isLoading ? (
        <ProductsShimmerLoader />
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 lg:gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="border pt-2 rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-105 bg-white cursor-pointer"
            >
              <img
                src={product.images[0] || "/placeholder-image.png"}
                alt={product.name}
                className="w-full h-36 sm:h-48 object-contain"
                onClick={() => router.push(`/product/${product._id}`)}
              />
              <div className="p-3 pt-1 sm:p-2">
                <h3 className="text-sm sm:text-base font-semibold text-gray-800 truncate">{product.name}</h3>
                <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">Kes {product.price}</p>
                <div className="flex items-center mt-2">
                  {[...Array(5)].map((_, i) => (
                    i < Math.floor(product.rating) ? (
                      <AiFillStar key={i} className="text-yellow-400" />
                    ) : (
                      <AiOutlineStar key={i} className="text-gray-300" />
                    )
                  ))}
                </div>
                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-[#0f1c47] text-white py-1 px-2 sm:py-1.5 sm:px-5 rounded-full font-bold text-xs sm:text-sm shadow-md hover:scale-105 flex items-center gap-1"
                  >
                    <ShoppingCart size={20} strokeWidth={2} />
                    Add to Cart
                  </button>
                  <button
                    onClick={() => handleWishlistClick(product)}
                    className="text-[#bf2c7e] hover:text-red-600 transition-transform hover:scale-110"
                  >
                    <Heart size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {snackbarMessage && <Snackbar message={snackbarMessage} onClose={() => setSnackbarMessage("")} />}
    </div>
  );
};

export default Products;

