/*"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ChevronDown, Sliders } from "lucide-react";
import NavbarTwo from "@/components/HeaderTwo"; // Import your Navbar component
import LuxuryFooter from "@/components/LuxuryFooter";
import useProducts from "@/utils/useProducts";
import { ProductCard } from "@/components/product/ProductCard";
import ProductDetailModal from "@/components/product/ProductDetailModal";
import StickyBottomNavbar from "@/components/BottomNav";

interface Product {
  _id: string;
  name: string;
  designer: string;
  category: {
    main: string;
    sub: string;
    brand: string;
  };
  price: number;
  stock: number;
  images: string[];
  attributes: Record<string, string>;
  createdAt: string;
}

const CollectionsPage = () => {
  const { products, loading, error } = useProducts();

  // Transform the API products to match our frontend format
  const transformedProducts = products.map((product) => ({
    id: product._id,
    name: product.name,
    designer: product.designer,
    price: product.price,
    originalPrice: product.price * 1.3, // Adding 30% as "original" price for display
    images: product.images.length ? product.images : [""], // Array of images
    rating: 4.5 + (Math.random() * 0.5), // Generate random ratings between 4.5-5.0
    isNew: new Date(product.createdAt).getTime() > Date.now() - 30 * 24 * 60 * 60 * 1000, // Mark as new if created in last 30 days
    category: product.category.main,
    color: product.attributes.color || "Unknown",
    size: product.attributes.size ? product.attributes.size.split(",") : ["Unknown"],
    season: product.attributes.season || "Unknown",
    stock: product.stock,
  }));

  // Extract unique categories, colors, sizes, and seasons for filters
  const categories = [...new Set(transformedProducts.map(item => item.category))];
  const colors = [...new Set(transformedProducts.map(item => item.color))];
  const sizes = [...new Set(transformedProducts.flatMap(item => item.size))];
  const seasons = [...new Set(transformedProducts.map(item => item.season))];
  const designers = [...new Set(transformedProducts.map(item => item.designer))];

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedSeasons, setSelectedSeasons] = useState<string[]>([]);
  const [selectedDesigners, setSelectedDesigners] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [sortOption, setSortOption] = useState("featured");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [activeCollection, setActiveCollection] = useState("All Collections");
  const [selectedProduct, setSelectedProduct] = useState<null | ReturnType<typeof mapProduct>>(null);
  const [addedToCart, setAddedToCart] = useState(false);
  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000);
  };

  const mapProduct = (product: Product, index: number) => ({
    id: product._id,
    name: product.name,
    designer: product.designer,
    price: product.price,
    originalPrice: product.price * 1.3, // Adding 30% as "original" price for display
    image: (product.images.length ? product.images : [""])[0], // Use first image as 'image'
    images: product.images.length ? product.images : [""],
    rating: 4.5 + (index % 5 * 0.1), // Generate ratings between 4.5-5.0
    isNew: new Date(product.createdAt).getTime() > Date.now() - 30 * 24 * 60 * 60 * 1000, // Mark as new if created in last 30 days
    attributes: product.attributes,
    stock: product.stock
  });

  // Collection themes
  const collectionThemes = [
    "All Collections",
    "New Arrivals",
    "Best Sellers",
    "Summer Essentials",
    "Winter Collection",
    "Designer Spotlight",
  ];

  // Filter products based on search and filters
  const filteredProducts = transformedProducts.filter((product) => {
    // Search query
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         product.designer.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Category filter
    const matchesCategory = selectedCategories.length === 0 || 
                           selectedCategories.includes(product.category);
    
    // Color filter
    const matchesColor = selectedColors.length === 0 || 
                        selectedColors.includes(product.color);
    
    // Size filter
    const matchesSize = selectedSizes.length === 0 || 
                       product.size.some(size => selectedSizes.includes(size));
    
    // Season filter
    const matchesSeason = selectedSeasons.length === 0 || 
                         selectedSeasons.includes(product.season);
    
    // Designer filter
    const matchesDesigner = selectedDesigners.length === 0 || 
                           selectedDesigners.includes(product.designer);
    
    // Price range filter
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    
    // Collection theme filter
    const matchesCollection = activeCollection === "All Collections" || 
                            (activeCollection === "New Arrivals" && product.isNew) ||
                            (activeCollection === "Best Sellers" && product.rating >= 4.7);

    return matchesSearch && matchesCategory && matchesColor && matchesSize && 
           matchesSeason && matchesDesigner && matchesPrice && matchesCollection;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "newest":
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      default:
        return 0;
    }
  });

  // Toggle filters
  const toggleFilter = (filter: string, filterType: string) => {
    switch (filterType) {
      case "category":
        setSelectedCategories(prev =>
          prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
        );
        break;
      case "color":
        setSelectedColors(prev =>
          prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
        );
        break;
      case "size":
        setSelectedSizes(prev =>
          prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
        );
        break;
      case "season":
        setSelectedSeasons(prev =>
          prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
        );
        break;
      case "designer":
        setSelectedDesigners(prev =>
          prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
        );
        break;
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedColors([]);
    setSelectedSizes([]);
    setSelectedSeasons([]);
    setSelectedDesigners([]);
    setPriceRange([0, 5000]);
    setSearchQuery("");
    setSortOption("featured");
    setActiveCollection("All Collections");
  };

  if (loading) {
    return (
      <div className="bg-white min-h-screen">
        <NavbarTwo />
        <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="animate-pulse h-8 w-32 bg-gray-200 rounded-full mx-auto"></div>
          <div className="animate-pulse h-12 w-64 bg-gray-200 rounded-full mx-auto mt-6"></div>
          <div className="animate-pulse h-4 w-96 bg-gray-200 rounded-full mx-auto mt-4"></div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-gray-100 rounded-xl h-[500px] animate-pulse"></div>
            ))}
          </div>
        </main>
        <LuxuryFooter />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white min-h-screen">
        <NavbarTwo />
        <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-red-500">{error}</div>
        </main>
        <LuxuryFooter />
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <NavbarTwo />
              
      <section className="relative h-80 md:h-96 flex items-center justify-center bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
          alt="Luxury Services"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-20 text-center px-4 max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            <span className="bg-clip-text text-transparent bg-[#bf2c7e]">
              Premium Products
            </span>
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto mb-8">
              Curated selections organized by theme, season, and style to elevate your wardrobe
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-[#bf2c7e] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Apply Now
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300"
            >
              Learn More
            </motion.button>
          </div>
        </motion.div>
      </section>
      
    
      <main className="pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
     
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-12 overflow-x-auto"
        >
          <div className="flex space-x-4 pb-2">
            {collectionThemes.map((theme) => (
              <motion.button
                key={theme}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCollection(theme)}
                className={`px-6 py-3 rounded-full whitespace-nowrap ${activeCollection === theme ? "bg-[#bf2c7e] text-white font-bold" : "bg-gray-100 text-gray-800 hover:bg-gray-200"}`}
              >
                {theme}
              </motion.button>
            ))}
          </div>
        </motion.div>

    
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          
            <div className="relative w-full md:w-96">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search collections..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-full bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#bf2c7e] focus:border-[#bf2c7e]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>

      
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative">
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-full px-4 py-3 pr-10 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#bf2c7e] focus:border-[#bf2c7e]"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                  <option value="newest">New Arrivals</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <ChevronDown className="h-4 w-4" />
                </div>
              </div>

          
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="md:hidden flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-full shadow-sm hover:bg-gray-50"
              >
                <Sliders className="h-5 w-5" />
                <span>Filters</span>
              </button>
            </div>
          </div>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8">
    
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="hidden md:block w-64 flex-shrink-0"
          >
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm sticky top-32">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-900">Filters</h3>
                <button
                  onClick={clearFilters}
                  className="text-sm text-[#bf2c7e] hover:text-[#9f2565]"
                >
                  Clear all
                </button>
              </div>

       
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
                <div className="px-1">
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    step="100"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    className="w-full mb-2"
                  />
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    step="100"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                </div>
                <div className="flex justify-between mt-2 text-sm text-gray-600">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>

           
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Category</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center">
                      <input
                        id={`category-${category}`}
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => toggleFilter(category, "category")}
                        className="h-4 w-4 rounded border-gray-300 text-[#bf2c7e] focus:ring-[#bf2c7e]"
                      />
                      <label htmlFor={`category-${category}`} className="ml-3 text-sm text-gray-600">
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

        
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Color</h4>
                <div className="space-y-2">
                  {colors.map((color) => (
                    <div key={color} className="flex items-center">
                      <input
                        id={`color-${color}`}
                        type="checkbox"
                        checked={selectedColors.includes(color)}
                        onChange={() => toggleFilter(color, "color")}
                        className="h-4 w-4 rounded border-gray-300 text-[#bf2c7e] focus:ring-[#bf2c7e]"
                      />
                      <label htmlFor={`color-${color}`} className="ml-3 text-sm text-gray-600">
                        {color}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Size</h4>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <motion.button
                      key={size}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleFilter(size, "size")}
                      className={`px-3 py-1 text-sm rounded-full border ${selectedSizes.includes(size) ? "bg-[#bf2c7e] text-white border-[#bf2c7e]" : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"}`}
                    >
                      {size}
                    </motion.button>
                  ))}
                </div>
              </div>

        
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Season</h4>
                <div className="space-y-2">
                  {seasons.map((season) => (
                    <div key={season} className="flex items-center">
                      <input
                        id={`season-${season}`}
                        type="checkbox"
                        checked={selectedSeasons.includes(season)}
                        onChange={() => toggleFilter(season, "season")}
                        className="h-4 w-4 rounded border-gray-300 text-[#bf2c7e] focus:ring-[#bf2c7e]"
                      />
                      <label htmlFor={`season-${season}`} className="ml-3 text-sm text-gray-600">
                        {season}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

       
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Designer</h4>
                <div className="space-y-2">
                  {designers.map((designer) => (
                    <div key={designer} className="flex items-center">
                      <input
                        id={`designer-${designer}`}
                        type="checkbox"
                        checked={selectedDesigners.includes(designer)}
                        onChange={() => toggleFilter(designer, "designer")}
                        className="h-4 w-4 rounded border-gray-300 text-[#bf2c7e] focus:ring-[#bf2c7e]"
                      />
                      <label htmlFor={`designer-${designer}`} className="ml-3 text-sm text-gray-600">
                        {designer}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.aside>

 
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex-1"
          >
          
            <div className="mb-6 flex justify-between items-center">
              <p className="text-gray-600">
                Showing <span className="font-bold">{filteredProducts.length}</span> {filteredProducts.length === 1 ? "item" : "items"}
              </p>
              {selectedCategories.length > 0 || selectedColors.length > 0 || 
               selectedSizes.length > 0 || selectedSeasons.length > 0 || 
               selectedDesigners.length > 0 || priceRange[0] > 0 || 
               priceRange[1] < 5000 ? (
                <button
                  onClick={clearFilters}
                  className="text-sm text-[#bf2c7e] hover:text-[#9f2565] flex items-center gap-1"
                >
                  <X size={14} /> Clear filters
                </button>
              ) : null}
            </div>

     
            {sortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {sortedProducts.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    theme={{ primary: "#bf2c7e", hover: "#9f2565", text: "white" }}
                    onQuickView={() => {
                      // Find the original Product object by id
                      const originalProduct = products.find(p => p._id === product.id);
                      if (originalProduct) {
                        setSelectedProduct(mapProduct(originalProduct, index));
                      }
                    }}
                    onAddToCart={() => handleAddToCart()}
                    animationDelay={index * 0.1}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-3 bg-[#bf2c7e] hover:bg-[#9f2565] text-white font-bold rounded-full transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </main>

     
      <AnimatePresence>
        {mobileFiltersOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-white p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Filters</h2>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-8">
          
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
                <div className="px-1">
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    step="100"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    className="w-full mb-2"
                  />
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    step="100"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                </div>
                <div className="flex justify-between mt-2 text-sm text-gray-600">
                  <span>Ksh {priceRange[0]}</span>
                  <span>Ksh {priceRange[1]}</span>
                </div>
              </div>

          
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium text-gray-900">Category</h4>
                  <ChevronDown size={18} />
                </div>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center">
                      <input
                        id={`mobile-category-${category}`}
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => toggleFilter(category, "category")}
                        className="h-4 w-4 rounded border-gray-300 text-[#bf2c7e] focus:ring-[#bf2c7e]"
                      />
                      <label htmlFor={`mobile-category-${category}`} className="ml-3 text-sm text-gray-600">
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium text-gray-900">Color</h4>
                  <ChevronDown size={18} />
                </div>
                <div className="space-y-2">
                  {colors.map((color) => (
                    <div key={color} className="flex items-center">
                      <input
                        id={`mobile-color-${color}`}
                        type="checkbox"
                        checked={selectedColors.includes(color)}
                        onChange={() => toggleFilter(color, "color")}
                        className="h-4 w-4 rounded border-gray-300 text-[#bf2c7e] focus:ring-[#bf2c7e]"
                      />
                      <label htmlFor={`mobile-color-${color}`} className="ml-3 text-sm text-gray-600">
                        {color}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

       
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium text-gray-900">Size</h4>
                  <ChevronDown size={18} />
                </div>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <motion.button
                      key={size}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleFilter(size, "size")}
                      className={`px-3 py-1 text-sm rounded-full border ${selectedSizes.includes(size) ? "bg-[#bf2c7e] text-white border-[#bf2c7e]" : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"}`}
                    >
                      {size}
                    </motion.button>
                  ))}
                </div>
              </div>

        
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium text-gray-900">Season</h4>
                  <ChevronDown size={18} />
                </div>
                <div className="space-y-2">
                  {seasons.map((season) => (
                    <div key={season} className="flex items-center">
                      <input
                        id={`mobile-season-${season}`}
                        type="checkbox"
                        checked={selectedSeasons.includes(season)}
                        onChange={() => toggleFilter(season, "season")}
                        className="h-4 w-4 rounded border-gray-300 text-[#bf2c7e] focus:ring-[#bf2c7e]"
                      />
                      <label htmlFor={`mobile-season-${season}`} className="ml-3 text-sm text-gray-600">
                        {season}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium text-gray-900">Designer</h4>
                  <ChevronDown size={18} />
                </div>
                <div className="space-y-2">
                  {designers.map((designer) => (
                    <div key={designer} className="flex items-center">
                      <input
                        id={`mobile-designer-${designer}`}
                        type="checkbox"
                        checked={selectedDesigners.includes(designer)}
                        onChange={() => toggleFilter(designer, "designer")}
                        className="h-4 w-4 rounded border-gray-300 text-[#bf2c7e] focus:ring-[#bf2c7e]"
                      />
                      <label htmlFor={`mobile-designer-${designer}`} className="ml-3 text-sm text-gray-600">
                        {designer}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

        
            <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg border-t border-gray-200">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setMobileFiltersOpen(false)}
                className="w-full bg-[#bf2c7e] hover:bg-[#9f2565] text-white font-bold py-3 rounded-full"
              >
                Apply Filters
              </motion.button>
            </div>
          </motion.div>
        )}
        {selectedProduct && (
          <ProductDetailModal 
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)} 
          />
        )}
      </AnimatePresence>
      <StickyBottomNavbar />
      <LuxuryFooter />
    </div>
  );
};

export default CollectionsPage;*/

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ChevronDown, Sliders } from "lucide-react";
import NavbarTwo from "@/components/HeaderTwo"; // Import your Navbar component
import LuxuryFooter from "@/components/LuxuryFooter";
import useProducts from "@/utils/useProducts";
import { ProductCard } from "@/components/product/ProductCard";
import ProductDetailModal from "@/components/product/ProductDetailModal";
import StickyBottomNavbar from "@/components/BottomNav";

interface Product {
  _id: string;
  name: string;
  designer: string;
  category: {
    main: string;
    sub: string;
    brand: string;
  };
  price: number;
  stock: number;
  images: string[];
  attributes: Record<string, string>;
  createdAt: string;
}

const CollectionsPage = () => {
  const { products, loading, error } = useProducts();

  // Transform the API products to match our frontend format
  const transformedProducts = products.map((product) => ({
    id: product._id,
    name: product.name,
    designer: product.designer,
    price: product.price,
    originalPrice: product.price * 1.3, // Adding 30% as "original" price for display
    images: product.images.length ? product.images : [""], // Array of images
    rating: 4.5 + (Math.random() * 0.5), // Generate random ratings between 4.5-5.0
    isNew: new Date(product.createdAt).getTime() > Date.now() - 30 * 24 * 60 * 60 * 1000, // Mark as new if created in last 30 days
    category: product.category.main,
    color: product.attributes.color || "Unknown",
    size: product.attributes.size ? product.attributes.size.split(",") : ["Unknown"],
    season: product.attributes.season || "Unknown",
    stock: product.stock,
  }));

  // Extract unique categories, colors, sizes, and seasons for filters
  const categories = [...new Set(transformedProducts.map(item => item.category))];
  const colors = [...new Set(transformedProducts.map(item => item.color))];
  const sizes = [...new Set(transformedProducts.flatMap(item => item.size))];
  const seasons = [...new Set(transformedProducts.map(item => item.season))];
  const designers = [...new Set(transformedProducts.map(item => item.designer))];

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedSeasons, setSelectedSeasons] = useState<string[]>([]);
  const [selectedDesigners, setSelectedDesigners] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [sortOption, setSortOption] = useState("featured");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [activeCollection, setActiveCollection] = useState("All Collections");
  const [selectedProduct, setSelectedProduct] = useState<null | ReturnType<typeof mapProduct>>(null);
  const [addedToCart, setAddedToCart] = useState(false);
   const [currentSlide, setCurrentSlide] = useState(0);

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000);
  };

  const mapProduct = (product: Product, index: number) => ({
    id: product._id,
    name: product.name,
    designer: product.designer,
    price: product.price,
    originalPrice: product.price * 1.3, // Adding 30% as "original" price for display
    image: (product.images.length ? product.images : [""])[0], // Use first image as 'image'
    images: product.images.length ? product.images : [""],
    rating: 4.5 + (index % 5 * 0.1), // Generate ratings between 4.5-5.0
    isNew: new Date(product.createdAt).getTime() > Date.now() - 30 * 24 * 60 * 60 * 1000, // Mark as new if created in last 30 days
    attributes: product.attributes,
    stock: product.stock
  });

  // Collection themes
  const collectionThemes = [
    "All Collections",
    "New Arrivals",
    "Best Sellers",
    "Summer Essentials",
    "Winter Collection",
    "Designer Spotlight",
  ];

  // Filter products based on search and filters
  const filteredProducts = transformedProducts.filter((product) => {
    // Search query
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         product.designer.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Category filter
    const matchesCategory = selectedCategories.length === 0 || 
                           selectedCategories.includes(product.category);
    
    // Color filter
    const matchesColor = selectedColors.length === 0 || 
                        selectedColors.includes(product.color);
    
    // Size filter
    const matchesSize = selectedSizes.length === 0 || 
                       product.size.some(size => selectedSizes.includes(size));
    
    // Season filter
    const matchesSeason = selectedSeasons.length === 0 || 
                         selectedSeasons.includes(product.season);
    
    // Designer filter
    const matchesDesigner = selectedDesigners.length === 0 || 
                           selectedDesigners.includes(product.designer);
    
    // Price range filter
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    
    // Collection theme filter
    const matchesCollection = activeCollection === "All Collections" || 
                            (activeCollection === "New Arrivals" && product.isNew) ||
                            (activeCollection === "Best Sellers" && product.rating >= 4.7);

    return matchesSearch && matchesCategory && matchesColor && matchesSize && 
           matchesSeason && matchesDesigner && matchesPrice && matchesCollection;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "newest":
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      default:
        return 0;
    }
  });

  // Toggle filters
  const toggleFilter = (filter: string, filterType: string) => {
    switch (filterType) {
      case "category":
        setSelectedCategories(prev =>
          prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
        );
        break;
      case "color":
        setSelectedColors(prev =>
          prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
        );
        break;
      case "size":
        setSelectedSizes(prev =>
          prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
        );
        break;
      case "season":
        setSelectedSeasons(prev =>
          prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
        );
        break;
      case "designer":
        setSelectedDesigners(prev =>
          prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
        );
        break;
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedColors([]);
    setSelectedSizes([]);
    setSelectedSeasons([]);
    setSelectedDesigners([]);
    setPriceRange([0, 5000]);
    setSearchQuery("");
    setSortOption("featured");
    setActiveCollection("All Collections");
  };

  if (loading) {
    return (
      <div className="bg-white min-h-screen">
        <NavbarTwo />
        <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="animate-pulse h-8 w-32 bg-gray-200 rounded-full mx-auto"></div>
          <div className="animate-pulse h-12 w-64 bg-gray-200 rounded-full mx-auto mt-6"></div>
          <div className="animate-pulse h-4 w-96 bg-gray-200 rounded-full mx-auto mt-4"></div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-gray-100 rounded-xl h-[500px] animate-pulse"></div>
            ))}
          </div>
        </main>
        <LuxuryFooter />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white min-h-screen">
        <NavbarTwo />
        <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-red-500">{error}</div>
        </main>
        <LuxuryFooter />
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <NavbarTwo />
      <section className="relative bg-white overflow-hidden">
        <div className="relative h-[400px] sm:h-[500px] md:h-[600px] w-full mt-24">
          {/* Main Carousel */}
          <div className="relative h-full w-full overflow-hidden">
            {[
              {
                image: "https://i.pinimg.com/736x/f6/67/07/f667075b97630b1e3bb56c54c48c4250.jpg",
              },
              {
                image: "https://i.pinimg.com/736x/f6/67/07/f667075b97630b1e3bb56c54c48c4250.jpg",
              },
              {
                image: "https://i.pinimg.com/736x/f6/67/07/f667075b97630b1e3bb56c54c48c4250.jpg",
              }
            ].map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
              >
                <img
                  src={slide.image}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 z-10" />

                {/* Text + Buttons */}
                {index === currentSlide && (
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute z-20 inset-0 flex flex-col items-center justify-center text-center px-4"
                  >
                    {/*<h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                      <span className="bg-clip-text text-transparent bg-[#bf2c7e]">
                        Premium Products
                      </span>
                    </h1>
                    <p className="text-lg text-gray-200 max-w-2xl mx-auto mb-8">
                      Curated selections organized by theme, season, and style to elevate your wardrobe
                    </p>*/}
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-3 bg-[#0f1c47] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        Apply Now
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          {/* Carousel Indicators */}
          <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-30">
            {[0, 1, 2].map((index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-white w-6' : 'bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>         
          {/* Advertisement Banners */}
          <div className="container mx-auto px-4 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-200 rounded-lg p-4 flex items-center justify-between hover:shadow-md transition-shadow">
                <div>
                  <h3 className="font-bold text-yellow-800">Holiday Sale!</h3>
                  <p className="text-sm text-yellow-600">Up to 50% off selected items</p>
                </div>
                <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">New</span>
              </div>
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-4 flex items-center justify-between hover:shadow-md transition-shadow">
                <div>
                  <h3 className="font-bold text-blue-800">New Professionals</h3>
                  <p className="text-sm text-blue-600">Discover recently joined experts</p>
                </div>
                <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">Hot</span>
              </div>
              <div className="bg-gradient-to-r from-pink-50 to-pink-100 border border-pink-200 rounded-lg p-4 flex items-center justify-between hover:shadow-md transition-shadow">
                <div>
                  <h3 className="font-bold text-pink-800">Limited Time Offer</h3>
                  <p className="text-sm text-pink-600">Book now and get 20% off</p>
                </div>
                <span className="bg-pink-500 text-white text-xs px-2 py-1 rounded-full">Sale</span>
              </div>
            </div>
          </div>
        </section>
      
      {/* Main Content */}
      <main className="pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Collection Themes */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-12 overflow-x-auto"
        >
          <div className="flex space-x-4 pb-2">
            {collectionThemes.map((theme) => (
              <motion.button
                key={theme}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCollection(theme)}
                className={`px-6 py-3 rounded-full whitespace-nowrap ${activeCollection === theme ? "bg-[#bf2c7e] text-white font-bold" : "bg-gray-100 text-gray-800 hover:bg-gray-200"}`}
              >
                {theme}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            {/* Search Bar */}
            <div className="relative w-full md:w-96">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search collections..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-full bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#bf2c7e] focus:border-[#bf2c7e]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>

            {/* Sort and Filter Buttons */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative">
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-full px-4 py-3 pr-10 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#bf2c7e] focus:border-[#bf2c7e]"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                  <option value="newest">New Arrivals</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <ChevronDown className="h-4 w-4" />
                </div>
              </div>

              {/* Mobile Filter Button */}
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="md:hidden flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-full shadow-sm hover:bg-gray-50"
              >
                <Sliders className="h-5 w-5" />
                <span>Filters</span>
              </button>
            </div>
          </div>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar - Desktop */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="hidden md:block w-64 flex-shrink-0"
          >
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm sticky top-32">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-900">Filters</h3>
                <button
                  onClick={clearFilters}
                  className="text-sm text-[#bf2c7e] hover:text-[#9f2565]"
                >
                  Clear all
                </button>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
                <div className="px-1">
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    step="100"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    className="w-full mb-2"
                  />
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    step="100"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                </div>
                <div className="flex justify-between mt-2 text-sm text-gray-600">
                  <span>Ksh {priceRange[0]}</span>
                  <span>Ksh {priceRange[1]}</span>
                </div>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Category</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center">
                      <input
                        id={`category-${category}`}
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => toggleFilter(category, "category")}
                        className="h-4 w-4 rounded border-gray-300 text-[#bf2c7e] focus:ring-[#bf2c7e]"
                      />
                      <label htmlFor={`category-${category}`} className="ml-3 text-sm text-gray-600">
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Color Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Color</h4>
                <div className="space-y-2">
                  {colors.map((color) => (
                    <div key={color} className="flex items-center">
                      <input
                        id={`color-${color}`}
                        type="checkbox"
                        checked={selectedColors.includes(color)}
                        onChange={() => toggleFilter(color, "color")}
                        className="h-4 w-4 rounded border-gray-300 text-[#bf2c7e] focus:ring-[#bf2c7e]"
                      />
                      <label htmlFor={`color-${color}`} className="ml-3 text-sm text-gray-600">
                        {color}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Size Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Size</h4>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <motion.button
                      key={size}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleFilter(size, "size")}
                      className={`px-3 py-1 text-sm rounded-full border ${selectedSizes.includes(size) ? "bg-[#bf2c7e] text-white border-[#bf2c7e]" : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"}`}
                    >
                      {size}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Season Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Season</h4>
                <div className="space-y-2">
                  {seasons.map((season) => (
                    <div key={season} className="flex items-center">
                      <input
                        id={`season-${season}`}
                        type="checkbox"
                        checked={selectedSeasons.includes(season)}
                        onChange={() => toggleFilter(season, "season")}
                        className="h-4 w-4 rounded border-gray-300 text-[#bf2c7e] focus:ring-[#bf2c7e]"
                      />
                      <label htmlFor={`season-${season}`} className="ml-3 text-sm text-gray-600">
                        {season}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Designer Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Designer</h4>
                <div className="space-y-2">
                  {designers.map((designer) => (
                    <div key={designer} className="flex items-center">
                      <input
                        id={`designer-${designer}`}
                        type="checkbox"
                        checked={selectedDesigners.includes(designer)}
                        onChange={() => toggleFilter(designer, "designer")}
                        className="h-4 w-4 rounded border-gray-300 text-[#bf2c7e] focus:ring-[#bf2c7e]"
                      />
                      <label htmlFor={`designer-${designer}`} className="ml-3 text-sm text-gray-600">
                        {designer}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.aside>

          {/* Product Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex-1"
          >
            {/* Results Count */}
            <div className="mb-6 flex justify-between items-center">
              <p className="text-gray-600">
                Showing <span className="font-bold">{filteredProducts.length}</span> {filteredProducts.length === 1 ? "item" : "items"}
              </p>
              {selectedCategories.length > 0 || selectedColors.length > 0 || 
               selectedSizes.length > 0 || selectedSeasons.length > 0 || 
               selectedDesigners.length > 0 || priceRange[0] > 0 || 
               priceRange[1] < 5000 ? (
                <button
                  onClick={clearFilters}
                  className="text-sm text-[#bf2c7e] hover:text-[#9f2565] flex items-center gap-1"
                >
                  <X size={14} /> Clear filters
                </button>
              ) : null}
            </div>

            {/* Products */}
            {sortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {sortedProducts.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    theme={{ primary: "#bf2c7e", hover: "#9f2565", text: "white" }}
                    onQuickView={() => {
                      // Find the original Product object by id
                      const originalProduct = products.find(p => p._id === product.id);
                      if (originalProduct) {
                        setSelectedProduct(mapProduct(originalProduct, index));
                      }
                    }}
                    onAddToCart={() => handleAddToCart()}
                    animationDelay={index * 0.1}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-3 bg-[#bf2c7e] hover:bg-[#9f2565] text-white font-bold rounded-full transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </main>

      {/* Mobile Filters */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-white p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Filters</h2>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-8">
              {/* Price Range Filter */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
                <div className="px-1">
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    step="100"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    className="w-full mb-2"
                  />
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    step="100"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                </div>
                <div className="flex justify-between mt-2 text-sm text-gray-600">
                  <span>Ksh {priceRange[0]}</span>
                  <span>Ksh {priceRange[1]}</span>
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium text-gray-900">Category</h4>
                  <ChevronDown size={18} />
                </div>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center">
                      <input
                        id={`mobile-category-${category}`}
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => toggleFilter(category, "category")}
                        className="h-4 w-4 rounded border-gray-300 text-[#bf2c7e] focus:ring-[#bf2c7e]"
                      />
                      <label htmlFor={`mobile-category-${category}`} className="ml-3 text-sm text-gray-600">
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Color Filter */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium text-gray-900">Color</h4>
                  <ChevronDown size={18} />
                </div>
                <div className="space-y-2">
                  {colors.map((color) => (
                    <div key={color} className="flex items-center">
                      <input
                        id={`mobile-color-${color}`}
                        type="checkbox"
                        checked={selectedColors.includes(color)}
                        onChange={() => toggleFilter(color, "color")}
                        className="h-4 w-4 rounded border-gray-300 text-[#bf2c7e] focus:ring-[#bf2c7e]"
                      />
                      <label htmlFor={`mobile-color-${color}`} className="ml-3 text-sm text-gray-600">
                        {color}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Size Filter */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium text-gray-900">Size</h4>
                  <ChevronDown size={18} />
                </div>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <motion.button
                      key={size}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleFilter(size, "size")}
                      className={`px-3 py-1 text-sm rounded-full border ${selectedSizes.includes(size) ? "bg-[#bf2c7e] text-white border-[#bf2c7e]" : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"}`}
                    >
                      {size}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Season Filter */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium text-gray-900">Season</h4>
                  <ChevronDown size={18} />
                </div>
                <div className="space-y-2">
                  {seasons.map((season) => (
                    <div key={season} className="flex items-center">
                      <input
                        id={`mobile-season-${season}`}
                        type="checkbox"
                        checked={selectedSeasons.includes(season)}
                        onChange={() => toggleFilter(season, "season")}
                        className="h-4 w-4 rounded border-gray-300 text-[#bf2c7e] focus:ring-[#bf2c7e]"
                      />
                      <label htmlFor={`mobile-season-${season}`} className="ml-3 text-sm text-gray-600">
                        {season}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Designer Filter */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium text-gray-900">Designer</h4>
                  <ChevronDown size={18} />
                </div>
                <div className="space-y-2">
                  {designers.map((designer) => (
                    <div key={designer} className="flex items-center">
                      <input
                        id={`mobile-designer-${designer}`}
                        type="checkbox"
                        checked={selectedDesigners.includes(designer)}
                        onChange={() => toggleFilter(designer, "designer")}
                        className="h-4 w-4 rounded border-gray-300 text-[#bf2c7e] focus:ring-[#bf2c7e]"
                      />
                      <label htmlFor={`mobile-designer-${designer}`} className="ml-3 text-sm text-gray-600">
                        {designer}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Apply Filters Button */}
            <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg border-t border-gray-200">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setMobileFiltersOpen(false)}
                className="w-full bg-[#bf2c7e] hover:bg-[#9f2565] text-white font-bold py-3 rounded-full"
              >
                Apply Filters
              </motion.button>
            </div>
          </motion.div>
        )}
        {selectedProduct && (
          <ProductDetailModal 
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)} 
          />
        )}
      </AnimatePresence>
      <StickyBottomNavbar />
      <LuxuryFooter />
    </div>
  );
};

export default CollectionsPage;