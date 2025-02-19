/*"use client";

import Back from "@/components/Back";
import BottomNavigationBar from "@/components/BottomNav";
import FloatingButtonAdd from "@/components/FloatingAddProduct";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { FaShoppingCart, FaHeart } from "react-icons/fa";

// Define the Shelf and Product types
interface Product {
  _id: string;
  name: string;
  price: number;
  images: string[];
  rating: number;
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
  products: Product[];
}

const ShelfDetails = () => {
  const pathname = usePathname();
  const shelfId = pathname.split("/").pop(); // Extract the shelf ID from the URL

  const [shelf, setShelf] = useState<Shelf | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!shelfId) return; // Ensure the ID is present

    const fetchShelf = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/shelf/${shelfId}`);
        if (!response.ok) throw new Error("Failed to fetch shelf data");

        const data: Shelf = await response.json();
        setShelf(data);
      } catch (error) {
        console.error("Error fetching shelf details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShelf();
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
            {shelf?.products?.map((product) => (
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
                  <button className="bg-[#182155] text-white py-1 px-3 sm:py-1.5 sm:px-5 rounded-full font-bold text-xs sm:text-sm shadow-md hover:from-yellow-500 hover:to-yellow-700 transition-all transform hover:scale-105 flex items-center gap-1">
                    <FaShoppingCart className="text-sm sm:text-base" />
                    Add to Cart
                  </button>
                  <button className="text-[#ff199c] hover:text-red-600 transition-transform transform hover:scale-110 sm:hover:scale-125">
                    <FaHeart size={16} className="sm:size-[20px]" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <FloatingButtonAdd shelfId={shelfId} />
      <Footer />
      <BottomNavigationBar />
    </div>
  );
};

export default ShelfDetails;*/



/*"use client";

import Back from "@/components/Back";
import BottomNavigationBar from "@/components/BottomNav";
import FloatingButtonAdd from "@/components/FloatingAddProduct";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { FaShoppingCart, FaHeart } from "react-icons/fa";

// Define the Shelf and Product types
interface Product {
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
  const pathname = usePathname();
  const shelfId = pathname.split("/").pop(); // Extract the shelf ID from the URL

  const [shelf, setShelf] = useState<Shelf | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<Product[]>([]); // Add state for products

  useEffect(() => {
    if (!shelfId) return; // Ensure the ID is present

    const fetchShelfAndProducts = async () => {
      try {
        // Fetch shelf details
        const shelfResponse = await fetch(`http://localhost:5000/api/shelf/${shelfId}`);
        if (!shelfResponse.ok) throw new Error("Failed to fetch shelf data");

        const shelfData: Shelf = await shelfResponse.json();
        setShelf(shelfData);

        // Fetch all products
        const productsResponse = await fetch("http://localhost:5000/api/products/all");
        if (!productsResponse.ok) throw new Error("Failed to fetch products data");

        const productsData: Product[] = await productsResponse.json();

        // Ensure productsData is an array and filter products by shelfId
        if (Array.isArray(productsData)) {
          const filteredProducts = productsData.filter(
            (product: Product) => product.shelfId.toString() === shelfId
          );
          setProducts(filteredProducts);
        } else {
          console.error("Products data is not an array:", productsData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
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
            {products?.map((product) => (
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
                  <button className="bg-[#182155] text-white py-1 px-3 sm:py-1.5 sm:px-5 rounded-full font-bold text-xs sm:text-sm shadow-md hover:from-yellow-500 hover:to-yellow-700 transition-all transform hover:scale-105 flex items-center gap-1">
                    <FaShoppingCart className="text-sm sm:text-base" />
                    Add to Cart
                  </button>
                  <button className="text-[#ff199c] hover:text-red-600 transition-transform transform hover:scale-110 sm:hover:scale-125">
                    <FaHeart size={16} className="sm:size-[20px]" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <FloatingButtonAdd shelfId={shelfId} />
      <Footer />
      <BottomNavigationBar />
    </div>
  );
};

export default ShelfDetails;*/
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

export default ShelfDetails;
