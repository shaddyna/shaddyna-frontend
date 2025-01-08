"use client"; 
import { useState, useMemo, useEffect } from "react";
import { NextPage } from "next";
import HeadNavigation from "@/components/HeadNavigation";
import Footer from "@/components/Footer";
import BottomNavigationBar from "@/components/BottomNav";
import ShopSearchBar from "@/components/ShopSearch";
import Shop from "@/components/shop";

const ShopsPage: NextPage = () => {
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
  //const colors = ["#ff199c", "#182155", "#f3f3f3", "#000000"];

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
*/
  // Render the page only after the component is mounted
  if (!isMounted) {
    return null; // Optionally render a loading indicator here
  }

  return (
    <div>
      <HeadNavigation />
      <div className="max-w-screen-xl mx-auto p-4">
      <Shop />
      </div>
      <Footer />
      <BottomNavigationBar />
    </div>
  );
  
};

export default ShopsPage;

