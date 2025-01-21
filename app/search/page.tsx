/*"use client"; 
import { useState, useMemo, useEffect } from "react";
import { NextPage } from "next";
import HeadNavigation from "@/components/HeadNavigation";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import BottomNavigationBar from "@/components/BottomNav";

const SearchPage: NextPage = () => {
  const [isMounted, setIsMounted] = useState(false);  // State to track if component is mounted
  //const router = useRouter();
  
  // Wait for the component to mount before accessing the router
  useEffect(() => {
    setIsMounted(true);
  }, []);

  //const { query } = router.query;
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedShop, setSelectedShop] = useState<string | null>(null);
  const [rating, setRating] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState("newest");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = ["Electronics", "Clothing", "Home", "Beauty", "Toys"];
  const shops = ["Shop 1", "Shop 2", "Shop 3"];
  const colors = ["#ff199c", "#182155", "#f3f3f3", "#000000"];

   // Dummy product data
   const products = [
    {
      id: 1,
      name: "Smartphone",
      price: 200,
      category: "Electronics",
      shop: "Shop 1",
      color: "#ff199c",
      rating: 4,
    },
    {
      id: 2,
      name: "T-Shirt",
      price: 25,
      category: "Clothing",
      shop: "Shop 2",
      color: "#182155",
      rating: 5,
    },
    {
      id: 3,
      name: "Laptop",
      price: 1200,
      category: "Electronics",
      shop: "Shop 3",
      color: "#f3f3f3",
      rating: 3,
    },
    {
      id: 4,
      name: "Sofa",
      price: 800,
      category: "Home",
      shop: "Shop 1",
      color: "#000000",
      rating: 4,
    },
    {
      id: 5,
      name: "Face Cream",
      price: 50,
      category: "Beauty",
      shop: "Shop 2",
      color: "#ff199c",
      rating: 5,
    },
    {
      id: 6,
      name: "Lego Set",
      price: 100,
      category: "Toys",
      shop: "Shop 3",
      color: "#182155",
      rating: 4,
    },
    {
      id: 7,
      name: "Watch",
      price: 150,
      category: "Clothing",
      shop: "Shop 1",
      color: "#f3f3f3",
      rating: 5,
    },
    {
      id: 8,
      name: "Vacuum Cleaner",
      price: 300,
      category: "Home",
      shop: "Shop 2",
      color: "#000000",
      rating: 3,
    },
    {
      id: 9,
      name: "Headphones",
      price: 120,
      category: "Electronics",
      shop: "Shop 3",
      color: "#182155",
      rating: 4,
    },
    {
      id: 10,
      name: "Air Purifier",
      price: 250,
      category: "Home",
      shop: "Shop 1",
      color: "#ff199c",
      rating: 2,
    },
  ];


  // Reset all filters
  const resetFilters = () => {
    setPriceRange([0, 1000]);
    setSelectedColor(null);
    setSelectedCategory(null);
    setSelectedShop(null);
    setRating(null);
    setSortOrder("newest");
    setSearchQuery("");
  };

   // Filter and sort products based on the selected filters
   const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Price range filter
        if (product.price < priceRange[0] || product.price > priceRange[1]) {
          return false;
        }

        // Search query filter (name contains the search query)
        if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
          return false;
        }

        // Category filter
        if (selectedCategory && product.category !== selectedCategory) {
          return false;
        }

        // Shop filter
        if (selectedShop && product.shop !== selectedShop) {
          return false;
        }

        // Color filter
        if (selectedColor && product.color !== selectedColor) {
          return false;
        }

        // Rating filter
        if (rating && product.rating !== rating) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        // Sorting by newest or oldest (using the price for sorting here, can be updated if more properties like date added are used)
        if (sortOrder === "newest") {
          return b.price - a.price; // Latest (higher price first)
        } else {
          return a.price - b.price; // Oldest (lower price first)
        }
      });
  }, [priceRange, selectedColor, selectedCategory, selectedShop, rating, sortOrder, searchQuery, products]);

  /*useEffect(() => {
    if (isMounted && query) {
      // If query is an array, take the first value
      setSearchQuery(Array.isArray(query) ? query[0] : query);
    }
  }, [isMounted, query]); // This ensures query is updated only after mount
*//////////////////
  // Render the page only after the component is mounted
  /*if (!isMounted) {
    return null; // Optionally render a loading indicator here
  }

  return (
    <div>
      <HeadNavigation />
      <div className="max-w-screen-xl mx-auto p-4">
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          {/* Filters Section *
          <div className="w-full lg:w-1/4 space-y-6">
            <h3 className="text-xl font-bold text-[#182155]">Filters</h3>
  
            {/* Reset Button *
            <button
              onClick={resetFilters}
              className="text-white bg-[#ff199c] p-2 rounded-md mb-6 hover:bg-[#182155] transition duration-300"
            >
              Reset Filters
            </button>
  
            {/* Search Bar 
            <div>
              <h4 className="text-lg font-semibold text-[#182155]">Search</h4>
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>*
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
  
            {/* Price Filter *
            <div>
              <h4 className="text-lg font-semibold text-[#182155]">Price</h4>
              <input
                type="range"
                min="0"
                max="1000"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
                className="w-full bg-[#182155] h-2 rounded-lg"
              />
              <input
                type="range"
                min="0"
                max="1000"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
                className="w-full bg-[#182155] h-2 rounded-lg mt-2"
              />
              <p>
                Price: ${priceRange[0]} - ${priceRange[1]}
              </p>
            </div>
  
            {/* Category Filter *
            <div>
              <h4 className="text-lg font-semibold text-[#182155]">Category</h4>
              <select
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Select Category</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
  
            {/* Shop Filter *
            <div>
              <h4 className="text-lg font-semibold text-[#182155]">Shop</h4>
              <select
                onChange={(e) => setSelectedShop(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Select Shop</option>
                {shops.map((shop, index) => (
                  <option key={index} value={shop}>
                    {shop}
                  </option>
                ))}
              </select>
            </div>
  
            {/* Color Filter *
            <div>
              <h4 className="text-lg font-semibold text-[#182155]">Color</h4>
              <div className="flex gap-2 flex-wrap">
                {colors.map((color, index) => (
                  <button
                    key={index}
                    className={`w-8 h-8 rounded-full ${color === selectedColor ? "ring-2 ring-[#ff199c]" : ""}`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color === selectedColor ? null : color)}
                  />
                ))}
              </div>
            </div>
  
            {/* Rating Filter *
            <div>
              <h4 className="text-lg font-semibold text-[#182155]">Rating</h4>
              <div className="flex gap-2">
                {[5, 4, 3, 2, 1].map((star) => (
                  <button
                    key={star}
                    className={`w-6 h-6 text-yellow-500 ${rating === star ? "bg-[#182155]" : "bg-transparent"}`}
                    onClick={() => setRating(star === rating ? null : star)}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
  
            {/* Sorting Order *
            <div>
              <h4 className="text-lg font-semibold text-[#182155]">Sort By</h4>
              <select
                onChange={(e) => setSortOrder(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
              </select>
            </div>
          </div>
  
          {/* Products Section *
          <div className="w-full lg:w-3/4">
            <h2 className="text-2xl font-bold text-[#182155] mb-6">Products</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="border p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                  <img
                    src="/placeholder-image.jpg"
                    alt="Product"
                    className="w-full h-48 object-cover rounded"
                  />
                  <h3 className="text-lg font-semibold text-[#182155] mt-4">{product.name}</h3>
                  <p className="text-sm text-gray-600">${product.price}</p>
                  <div className="flex items-center mt-2">
                    <span className="text-yellow-500">
                      {"★".repeat(product.rating)}{" "}
                      {"☆".repeat(5 - product.rating)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <BottomNavigationBar />
    </div>
  );
  
};

export default SearchPage;*/
"use client"; 
import { useState, useMemo, useEffect } from "react";
import { NextPage } from "next";
import HeadNavigation from "@/components/HeadNavigation";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import BottomNavigationBar from "@/components/BottomNav";
import Back from "@/components/Back";

const SearchPage: NextPage = () => {
  const [products, setProducts] = useState<any[]>([]); 
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedShop, setSelectedShop] = useState<string | null>(null);
  const [rating, setRating] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState("newest");
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  const [isMounted, setIsMounted] = useState(false); // Move the `isMounted` state here to avoid the conditional hook call

  useEffect(() => {
    setIsMounted(true); // This effect is only called once, after the component mounts
  }, []); // Empty dependency array ensures this effect runs only once

  // Fetch data from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://shaddyna-backend.onrender.com/api/products/all");
        const data = await response.json();
        setProducts(data.products || []); // Assuming the API returns an object with a 'products' key
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []); // Only run on initial load

  // Reset all filters
  const resetFilters = () => {
    setPriceRange([0, 1000]);
    setSelectedColor(null);
    setSelectedCategory(null);
    setSelectedShop(null);
    setRating(null);
    setSortOrder("newest");
    setSearchQuery("");
  };

  // Filter and sort products based on the selected filters
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        if (product.price < priceRange[0] || product.price > priceRange[1]) return false;
        if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        if (selectedCategory && product.category !== selectedCategory) return false;
        if (selectedShop && product.shop !== selectedShop) return false;
        if (selectedColor && product.color !== selectedColor) return false;
        if (rating && product.rating !== rating) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortOrder === "newest") return b.price - a.price; 
        return a.price - b.price; 
      });
  }, [priceRange, selectedColor, selectedCategory, selectedShop, rating, sortOrder, searchQuery, products]);

  if (!isMounted) {
    return null; // Optionally render a loading indicator here
  }

  return (
    <div>
      <Back title={"Search Page"} />
      <div className="bg-gray-50">
      <div className="max-w-screen-xl mx-auto p-4 bg-gray-50">
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          {/* Filters Section */}
          <div className="w-full lg:w-1/4 space-y-6">
            <h3 className="text-xl font-bold text-[#182155]">Filters</h3>

            {/* Reset Button */}
            <button
              onClick={resetFilters}
              className="text-white bg-[#ff199c] p-2 rounded-md mb-6 hover:bg-[#182155] transition duration-300"
            >
              Reset Filters
            </button>

            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

            {/* Price Filter */}
            <div>
              <h4 className="text-lg text-gray-800 font-semibold text-[#182155]">Price</h4>
              <input
                type="range"
                min="0"
                max="1000000000"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
                className="w-full bg-[#182155] h-2 rounded-lg"
              />
              <input
                type="range"
                min="0"
                max="1000"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
                className="w-full bg-[#182155] h-2 rounded-lg mt-2"
              />
              <p>
                Price: ${priceRange[0]} - ${priceRange[1]}
              </p>
            </div>

            {/* Category Filter */}
            <div>
              <h4 className="text-lg font-semibold text-[#182155]">Category</h4>
              <select
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Select Category</option>
                {["Electronics", "Clothing", "Home", "Beauty", "Toys"].map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Shop Filter */}
            <div>
              <h4 className="text-lg font-semibold text-[#182155]">Shop</h4>
              <select
                onChange={(e) => setSelectedShop(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Select Shop</option>
                {["Shop 1", "Shop 2", "Shop 3"].map((shop, index) => (
                  <option key={index} value={shop}>
                    {shop}
                  </option>
                ))}
              </select>
            </div>

            {/* Color Filter */}
            <div>
              <h4 className="text-lg font-semibold text-[#182155]">Color</h4>
              <div className="flex gap-2 flex-wrap">
                {["#ff199c", "#182155", "#f3f3f3", "#000000"].map((color, index) => (
                  <button
                    key={index}
                    className={`w-8 h-8 rounded-full ${color === selectedColor ? "ring-2 ring-[#ff199c]" : ""}`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color === selectedColor ? null : color)}
                  />
                ))}
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <h4 className="text-lg font-semibold text-[#182155]">Rating</h4>
              <div className="flex gap-2">
                {[5, 4, 3, 2, 1].map((star) => (
                  <button
                    key={star}
                    className={`w-6 h-6 text-yellow-500 ${rating === star ? "bg-[#182155]" : "bg-transparent"}`}
                    onClick={() => setRating(star === rating ? null : star)}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            {/* Sorting Order */}
            <div>
              <h4 className="text-lg font-semibold text-[#182155]">Sort By</h4>
              <select
                onChange={(e) => setSortOrder(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
              </select>
            </div>
          </div>

          {/* Products Section */}
          <div className="w-full lg:w-3/4">
            <h2 className="text-2xl font-bold text-[#182155] mb-6">Products</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="border p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                  <img
                    src={product.image || "/placeholder-image.jpg"} // Use product image if available
                    alt={product.name}
                    className="w-full h-48 object-cover rounded"
                  />
                  <h3 className="text-lg font-semibold text-[#182155] mt-4">{product.name}</h3>
                  <p className="text-sm text-gray-600">${product.price}</p>
                  <div className="flex items-center mt-2">
                    <span className="text-yellow-500">
                      {"★".repeat(product.rating)}{" "}
                      {"☆".repeat(5 - product.rating)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      </div>
      <Footer />
      <BottomNavigationBar />
    </div>
  );
};

export default SearchPage;
