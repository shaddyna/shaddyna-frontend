

"use client";
import Back from "@/components/Back";
import BottomNavigationBar from "@/components/BottomNav";
import FloatingButtonAdd from "@/components/FloatingAddProduct";
import Footer from "@/components/Footer";
import { Heart, ShoppingCart } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import Snackbar from "@/components/SnackBar";

// Define the Shelf and Product types
interface Product {
  sellerId: string;
  _id: string;
  name: string;
  price: number;
  images: string[];
  rating: number;
  shelfId: string;
}

interface Member {
  id: string;
  name: string;
  role: string;
}

interface Shelf {
  _id: string;
  name: string;
  description: string;
  image: string;
  price: string;
  members: Member[];
}

const ShelfDetails = () => {
  const pathname = usePathname() ?? ""; // Ensure pathname is always a string
const shelfId = pathname.split("/").pop() || ""; // Extract the shelf ID

  //const pathname = usePathname();
  //const shelfId = pathname.split("/").pop(); // Extract the shelf ID from the URL
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [shelf, setShelf] = useState<Shelf | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<Product[]>([]); // Add state for products
  const { items: cartItems, addItem } = useCartStore();
  const { items: wishlistItems, addItem: addToWishlist } = useWishlistStore();

  useEffect(() => {
    if (!shelfId) return; // Ensure the ID is present

    const fetchShelfAndProducts = async () => {
      try {
        // Fetch shelf details
        const shelfResponse = await fetch(`https://shaddyna-backend.onrender.com/api/shelf/${shelfId}`);
        if (!shelfResponse.ok) throw new Error("Failed to fetch shelf data");

        const shelfData: Shelf = await shelfResponse.json();
        setShelf(shelfData);

        // Fetch all products
        const productsResponse = await fetch("https://shaddyna-backend.onrender.com/api/products/all");
        if (!productsResponse.ok) throw new Error("Failed to fetch products data");

        const productsData = await productsResponse.json();
        const productsArray = productsData.products;

        if (Array.isArray(productsArray)) {
          // Ensure product.shelfId exists before calling toString()
          const filteredProducts = productsArray.filter(
            (product: Product) => product.shelfId && product.shelfId.toString() === shelfId
          );
          setProducts(filteredProducts);
        } else {
          console.error("Products data is not in expected format:", productsData);
          setProducts([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchShelfAndProducts();
  }, [shelfId]);

  if (loading) return <div>Loading...</div>;
  if (!shelf) return <div>Error: Shelf not found</div>;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={`text-yellow-500 ${index < rating ? "text-yellow-500" : "text-gray-300"}`}>
        ★
      </span>
    ));
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
    <div className="min-h-screen bg-gradient-to-b from-[#bf2c7e]/10 to-white">
      <Back title={"Shelf Details"} />
      
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Shelf Header Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            <div className="relative w-full lg:w-1/3 h-64 rounded-xl overflow-hidden">
              <img
                src={shelf.image}
                alt={shelf.name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute bottom-3 right-3 bg-[#bf2c7e] text-white px-4 py-1 rounded-full text-sm font-bold">
                {shelf.price}
              </div>
            </div>
            
            <div className="flex-1 space-y-4">
              <h1 className="text-4xl font-bold text-blue-900">{shelf.name} Shelf</h1>
              <p className="text-gray-600 text-lg leading-relaxed">{shelf.description}</p>
              
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-blue-900 mb-3">Members</h3>
                <div className="flex flex-wrap gap-2">
                  {shelf.members.map((member) => (
                    <div
                      key={member.id}
                      className="px-3 py-1.5 bg-[#bf2c7e]/10 text-[#bf2c7e] rounded-full text-sm font-medium"
                    >
                      {member.name} • {member.role}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <h2 className="text-3xl font-bold text-blue-900 mb-6 px-2">Shelf Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 pb-8">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product._id} className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
                <div className="relative h-56 w-full overflow-hidden rounded-t-xl">
                  <img
                    src={product.images[0] || "/placeholder-image.png"}
                    alt={product.name}
                    className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-110"
                  />
                  <button
                    onClick={() => handleWishlistClick(product)}
                    className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-[#bf2c7e]/10 transition-colors"
                  >
                    <Heart size={20} className="text-[#bf2c7e]" fill={wishlistItems.some(item => item._id === product._id) ? "#bf2c7e" : "transparent"} />
                  </button>
                </div>
                
                <div className="p-4 space-y-3">
                  <h3 className="text-lg font-bold text-blue-900 truncate">{product.name}</h3>
                  <div className="flex items-center space-x-1">
                    {renderStars(product.rating)}
                    <span className="text-sm text-gray-500 ml-1">({product.rating})</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-[#bf2c7e]">Ksh {product.price}</span>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="flex items-center gap-2 bg-blue-900 text-white px-4 py-2 rounded-full hover:bg-blue-800 transition-colors"
                    >
                      <ShoppingCart size={18} />
                      <span className="text-sm">Add</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">No products available</p>
            </div>
          )}
        </div>
      </div>

      {/*{snackbarMessage && (
        <Snackbar
          message={snackbarMessage}
          onClose={() => setSnackbarMessage("")}
          className="bg-blue-900 text-white" // Update Snackbar component to accept className prop
        />
      )}
      
      <FloatingButtonAdd shelfId={shelfId} className="bg-[#bf2c7e] text-white" />*/}
      <Footer />
      <BottomNavigationBar />
    </div>
  );
};

export default ShelfDetails;
{/*"use client";

import Back from "@/components/Back";
import BottomNavigationBar from "@/components/BottomNav";
import FloatingButtonAdd from "@/components/FloatingAddProduct";
import Footer from "@/components/Footer";
import { Heart, ShoppingCart } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import Snackbar from "@/components/SnackBar";


// Define the Shelf and Product types
interface Product {
  sellerId: string;
  _id: string;
  name: string;
  price: number;
  images: string[];
  rating: number;
  shelfId: string;
}

interface Member {
  id: string;
  name: string;
  role: string;
}

interface Shelf {
  _id: string;
  name: string;
  description: string;
  image: string;
  price: string;
  members: Member[];
}

const ShelfDetails = () => {
  const pathname = usePathname() ?? ""; // Ensure pathname is always a string
const shelfId = pathname.split("/").pop() || ""; // Extract the shelf ID

  //const pathname = usePathname();
  //const shelfId = pathname.split("/").pop(); // Extract the shelf ID from the URL
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [shelf, setShelf] = useState<Shelf | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<Product[]>([]); // Add state for products
  const { items: cartItems, addItem } = useCartStore();
  const { items: wishlistItems, addItem: addToWishlist } = useWishlistStore();

  useEffect(() => {
    if (!shelfId) return; // Ensure the ID is present

    const fetchShelfAndProducts = async () => {
      try {
        // Fetch shelf details
        const shelfResponse = await fetch(`https://shaddyna-backend.onrender.com/api/shelf/${shelfId}`);
        if (!shelfResponse.ok) throw new Error("Failed to fetch shelf data");

        const shelfData: Shelf = await shelfResponse.json();
        setShelf(shelfData);

        // Fetch all products
        const productsResponse = await fetch("https://shaddyna-backend.onrender.com/api/products/all");
        if (!productsResponse.ok) throw new Error("Failed to fetch products data");

        const productsData = await productsResponse.json();
        const productsArray = productsData.products;

        if (Array.isArray(productsArray)) {
          // Ensure product.shelfId exists before calling toString()
          const filteredProducts = productsArray.filter(
            (product: Product) => product.shelfId && product.shelfId.toString() === shelfId
          );
          setProducts(filteredProducts);
        } else {
          console.error("Products data is not in expected format:", productsData);
          setProducts([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchShelfAndProducts();
  }, [shelfId]);

  if (loading) return <div>Loading...</div>;
  if (!shelf) return <div>Error: Shelf not found</div>;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={`text-yellow-500 ${index < rating ? "text-yellow-500" : "text-gray-300"}`}>
        ★
      </span>
    ));
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
    <div>
      <Back title={"Shelf details"} />
      <div className="min-h-screen max-w-4xl mx-auto p-3 bg-white rounded-lg shadow-md mt-6 mb-6 mx-3">
        <div className="flex flex-col lg:flex-row items-center gap-6">
          <img
            src={shelf.image}
            alt={shelf.name}
            className="w-full lg:w-1/3 h-auto object-cover rounded-md"
          />
          <div className="flex flex-col">
            <h1 className="text-3xl font-semibold text-gray-800 mb-4">{shelf.name} Shelf</h1>
            <p className="text-lg text-gray-600 mb-6">{shelf.description}</p>
            <p className="text-2xl font-bold text-gray-800">{shelf.price}</p>

            <div className="mt-6">
              <h3 className="text-xl text-gray-800 font-semibold">Members:</h3>
              <ul className="flex flex-wrap gap-2 mt-2">
                {shelf.members.map((member) => (
                  <li
                    key={member.id}
                    className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-lg"
                  >
                    {member.name} - {member.role}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Shelf Products:</h3>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3">
            {products.length > 0 ? (
              products.map((product) => (
                <div key={product._id} className="border rounded-lg shadow-md p-2">
                  <img
                    src={product.images[0] || "/placeholder-image.png"} // Fallback image if the product has no image
                    alt={product.name}
                    className="w-full h-36 sm:h-48 object-contain"
                  />
                  <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                  <p className="text-gray-600 text-sm mt-2">Price: Ksh {product.price}</p>
                  <div className="flex items-center mt-2">{renderStars(product.rating)}</div>
                  <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-[#182155] text-white py-1 px-2 sm:py-1.5 sm:px-5 rounded-full font-bold text-xs sm:text-sm shadow-md hover:from-yellow-500 hover:to-yellow-700 transition-all transform hover:scale-105 flex items-center gap-1"
                  >
                    
                    <ShoppingCart size={20} strokeWidth={2} />
                    Add to Cart
                  </button>
                  <button
                    onClick={() => handleWishlistClick(product)}
                    className="text-[#ff199c] hover:text-red-600 transition-transform transform hover:scale-110 sm:hover:scale-125"
                  >
                    <Heart size={18} />
                  </button>
                </div>
                </div>
              ))
            ) : (
              <p>No products found for this shelf.</p>
            )}
          </div>
          {snackbarMessage && (
        <Snackbar
          message={snackbarMessage}
          onClose={() => setSnackbarMessage("")}
        />
      )}
        </div>
      </div>
      <FloatingButtonAdd shelfId={shelfId} />
      <Footer />
      <BottomNavigationBar />
    </div>
  );
};

export default ShelfDetails;*/}

