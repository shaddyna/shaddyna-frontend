"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, MapPin, ShoppingBag, Mail, Phone, Instagram, Facebook, Twitter, Heart, Share2, ArrowLeft, Clock, Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import NavbarTwo from "@/components/HeaderTwo";
import LuxuryFooter from "@/components/LuxuryFooter";
import { useParams } from "next/navigation";
import { ProductCard } from "@/components/product/ProductCard";
import ProductDetailModal from "@/components/product/ProductDetailModal";

interface Shop {
  _id: string;
  name: string;
  owner: {
    _id: string;
    name: string;
  };
  location: string;
  description: string;
  categories: string[];
  image: string;
  contact: {
    email: string;
    phone?: string;
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
  workingHours: Record<string, {
    open: string;
    close: string;
    closed: boolean;
  }>;
  policies: {
    returnPolicy?: string;
    shippingPolicy?: string;
  };
  createdAt: string;
  isActive: boolean;
}

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
  attributes: Record<string, any>;
  shop: {
    id: string;
    name: string;
  };
  owner: string;
  createdAt: string;
}

const ShopPage = () => {
  const [shop, setShop] = useState<Shop | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('products');
  const [isFavorite, setIsFavorite] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const router = useRouter();
  const params = useParams();
  const shopId = params.id;
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

  useEffect(() => {
    if (!shopId) return;

    const fetchShop = async () => {
      try {
        const response = await fetch(`https://shaddynab-new.onrender.com/api/shops/${shopId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch shop');
        }
        const data = await response.json();
        setShop(data.data);
      } catch (err) {
        setError('Failed to load shop. Please try again later.');
        console.error('Error fetching shop:', err);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await fetch(`https://shaddynab-new.onrender.com/api/products?shopId=${shopId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data.products);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        console.error('Error fetching products:', err);
      }
    };

    fetchShop();
    fetchProducts();
  }, [shopId]);

  useEffect(() => {
    if (shop) {
      setLoading(false);
    }
  }, [shop]);

  const handleShare = () => {
    setIsShareOpen(!isShareOpen);
    if (navigator.share) {
      navigator.share({
        title: shop?.name,
        text: `Check out ${shop?.name} on our platform`,
        url: window.location.href,
      }).catch(() => setIsShareOpen(true));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#bf2c7e]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white min-h-screen">
      <NavbarTwo />
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <div className="mx-auto bg-red-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
              <X className="text-red-500" size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Error loading shop</h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-[#bf2c7e] hover:bg-[#0f1c47] text-black font-bold rounded-full"
            >
              Try Again
            </button>
          </div>
        </div>
        <LuxuryFooter />
      </div>
    );
  }

  if (!shop) {
    return (
      <div className="bg-white min-h-screen">
        <NavbarTwo />
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <div className="mx-auto bg-gray-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
              <Search className="text-gray-500" size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Shop not found</h3>
            <p className="text-gray-600 mb-6">The shop you're looking for doesn't exist or may have been removed.</p>
          </div>
        </div>
        <LuxuryFooter />
      </div>
    );
  }

return (
  <div className="bg-white min-h-screen">
    {/* Shop Header */}
    <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden">
      <img
        src={shop.image}
        alt={shop.name}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f1c47]/60 via-[#0f1c47]/30 to-transparent" />
      
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="absolute top-4 left-4 sm:top-6 sm:left-6 bg-[#0f1c47]/70 hover:bg-[#0f1c47]/90 text-white p-2 sm:p-3 rounded-full transition-all"
      >
        <ArrowLeft size={16} className="sm:w-5" />
      </button>
      
      {/* Shop Title and Actions */}
      <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex justify-between items-end">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">{shop.name}</h1>
          <div className="flex items-center gap-1 sm:gap-2 mt-1 sm:mt-2">
            <MapPin className="text-[#bf2c7e] w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-white text-sm sm:text-base">{shop.location}</span>
          </div>
        </div>
        
        <div className="flex gap-2 sm:gap-3">
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className={`p-2 sm:p-3 rounded-full ${isFavorite ? 'bg-[#bf2c7e] text-black' : 'bg-[#0f1c47]/50 text-white hover:bg-[#0f1c47]/70'}`}
          >
            <Heart size={16} className="sm:w-5" fill={isFavorite ? 'currentColor' : 'none'} />
          </button>
          
          <div className="relative">
            <button
              onClick={handleShare}
              className="p-2 sm:p-3 rounded-full bg-[#0f1c47]/50 text-white hover:bg-[#0f1c47]/70"
            >
              <Share2 size={16} className="sm:w-5" />
            </button>
            
            <AnimatePresence>
              {isShareOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 bottom-full mb-2 bg-white rounded-lg shadow-xl p-2 w-40 sm:w-48 z-10"
                >
                  <p className="text-xs sm:text-sm font-medium mb-1 sm:mb-2">Share via</p>
                  <div className="flex justify-between">
                    <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                      <Facebook size={16} className="sm:w-5" />
                    </a>
                    <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=Check out ${encodeURIComponent(shop.name)}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600">
                      <Twitter size={16} className="sm:w-5" />
                    </a>
                    <a href={`mailto:?subject=${encodeURIComponent(shop.name)}&body=Check out this shop: ${encodeURIComponent(window.location.href)}`} className="text-gray-600 hover:text-gray-800">
                      <Mail size={16} className="sm:w-5" />
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>

    {/* Main Content */}
    <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-0 sm:py-8 md:py-12">
      <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-12">
        {/* Left Column - Shop Info */}
        <div className="lg:w-1/3 space-y-4 sm:space-y-6 md:space-y-8">
          {/* About Section */}
          <div className="bg-white p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl">
            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-black">About {shop.name}</h2>
            <p className="text-gray-700 text-sm sm:text-base mb-4 sm:mb-6">{shop.description}</p>
            
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="bg-[#bf2c7e]/10 p-1.5 sm:p-2 rounded-md sm:rounded-lg">
                  <ShoppingBag className="text-[#bf2c7e] w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h3 className="font-medium text-sm sm:text-base text-black">Categories</h3>
                  <div className="flex flex-wrap gap-1 sm:gap-2 mt-1">
                    {shop.categories.map((category, index) => (
                      <span key={index} className="bg-gray-100 px-2 py-0.5 text-black sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm">
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="bg-[#bf2c7e]/10 p-1.5 sm:p-2 rounded-md sm:rounded-lg">
                  <Clock className="text-[#bf2c7e] w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h3 className="font-medium text-sm sm:text-base text-black">Established</h3>
                  <p className="text-gray-600 text-sm sm:text-base">{new Date(shop.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="bg-[#bf2c7e]/10 p-1.5 sm:p-2 rounded-md sm:rounded-lg">
                  <MapPin className="text-[#bf2c7e] w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h3 className="font-medium text-sm sm:text-base text-black">Location</h3>
                  <p className="text-gray-600 text-sm sm:text-base">{shop.location}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Section */}
          <div className="bg-white pt-0 pl-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl">
            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-black">Contact</h2>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <Mail className="text-gray-500 w-4 h-4 sm:w-5 sm:h-5" />
                <a href={`mailto:${shop.contact.email}`} className="text-gray-700 hover:text-[#bf2c7e] text-sm sm:text-base">
                  {shop.contact.email}
                </a>
              </div>
              
              {shop.contact.phone && (
                <div className="flex items-center gap-2 sm:gap-3">
                  <Phone className="text-gray-500 w-4 h-4 sm:w-5 sm:h-5" />
                  <a href={`tel:${shop.contact.phone}`} className="text-gray-700 hover:text-[#bf2c7e] text-sm sm:text-base">
                    {shop.contact.phone}
                  </a>
                </div>
              )}
              
              {(shop.contact.instagram || shop.contact.facebook || shop.contact.twitter) && (
                <div className="pt-2">
                  <h3 className="font-medium mb-2 text-sm sm:text-base text-black">Social Media</h3>
                  <div className="flex gap-3 sm:gap-4">
                    {shop.contact.instagram && (
                      <a 
                        href={shop.contact.instagram} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-700 hover:text-[#bf2c7e]"
                      >
                        <Instagram size={16} className="sm:w-5" />
                      </a>
                    )}
                    {shop.contact.facebook && (
                      <a 
                        href={shop.contact.facebook} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-700 hover:text-[#bf2c7e]"
                      >
                        <Facebook size={16} className="sm:w-5" />
                      </a>
                    )}
                    {shop.contact.twitter && (
                      <a 
                        href={shop.contact.twitter} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-700 hover:text-[#bf2c7e]"
                      >
                        <Twitter size={16} className="sm:w-5" />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Hours & Policies */}
          <div className="bg-white p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl shadow-sm sm:shadow-md">
            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-black">Hours & Policies</h2>
            
            {/* Working Hours */}
            <div className="mb-4 sm:mb-6">
              <h3 className="font-medium mb-1 sm:mb-2 text-sm sm:text-base text-black">Working Hours</h3>
              <div className="space-y-1 sm:space-y-2 text-gray-700 text-xs sm:text-sm">
                {Object.entries(shop.workingHours).map(([day, hours]) => (
                  <div key={day} className="flex justify-between">
                    <span className="capitalize">{day}:</span>
                    {hours.closed ? (
                      <span className="text-gray-500">Closed</span>
                    ) : (
                      <span>{hours.open} - {hours.close}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Policies */}
            {(shop.policies.returnPolicy || shop.policies.shippingPolicy) && (
              <div>
                <h3 className="font-medium mb-1 sm:mb-2 text-sm sm:text-base text-black">Policies</h3>
                <div className="space-y-1 sm:space-y-2 text-gray-700 text-xs sm:text-sm">
                  {shop.policies.returnPolicy && (
                    <p className="flex items-center gap-1 sm:gap-2">
                      <span className="font-semibold">Returns:</span> {shop.policies.returnPolicy}
                    </p>
                  )}
                  {shop.policies.shippingPolicy && (
                    <p className="flex items-center gap-1 sm:gap-2">
                      <span className="font-semibold">Shipping:</span> {shop.policies.shippingPolicy}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Right Column - Main Content */}
        <div className="lg:w-2/3">
          {/* Navigation Tabs */}
          <div className="border-b border-[#bf2c7e]/20 mb-4 sm:mb-6 md:mb-8">
            <nav className="-mb-px flex space-x-4 sm:space-x-8">
              <button
                onClick={() => setActiveTab('products')}
                className={`whitespace-nowrap py-3 sm:py-4 px-1 border-b-2 font-medium text-xs sm:text-sm ${
                  activeTab === 'products'
                    ? 'border-[#bf2c7e] text-[#bf2c7e]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Products
              </button>
              <button
                onClick={() => setActiveTab('about')}
                className={`whitespace-nowrap py-3 sm:py-4 px-1 border-b-2 font-medium text-xs sm:text-sm ${
                  activeTab === 'about'
                    ? 'border-[#bf2c7e] text-[#bf2c7e]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                About the Shop
              </button>
            </nav>
          </div>
          
          {/* Tab Content */}
          <div>
            {/* Products Tab */}
            {activeTab === 'products' && (
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {products.map((product, index) => (
                    <ProductCard
                      key={product._id}
                      product={{
                        id: product._id,
                        name: product.name,
                        designer: product.designer,
                        price: product.price,
                        originalPrice: undefined,
                        images: product.images,
                        rating: 4.5,
                        isNew: false,
                        stock: product.stock,
                      }}
                      theme={{
                        primary: "#bf2c7e",
                        hover: "#9f2565",
                        text: "white",
                      }}
                      animationDelay={0}
                    />
                  ))}
                </div>
                
                {products.length === 0 && (
                  <div className="text-center py-8 sm:py-12">
                    <p className="text-gray-600 text-sm sm:text-base">No products available in this shop yet.</p>
                  </div>
                )}
              </div>
            )}

            {/* About Tab */}
            {activeTab === 'about' && (
              <div className="space-y-4 sm:space-y-6 md:space-y-8">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4">The Story</h3>
                  <div className="prose max-w-none text-gray-700 text-sm sm:text-base">
                    <p>{shop.description}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4">Shop Owner</h3>
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-[#bf2c7e]">
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-xl sm:text-2xl font-bold text-gray-500">
                          {/* {shop.owner.name.charAt(0)} */}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-base sm:text-lg">{shop.owner.name}</h4>
                      <p className="text-gray-600 mb-2 sm:mb-4 text-sm sm:text-base">Shop Owner</p>
                      <p className="text-gray-700 text-sm sm:text-base">
                        The visionary behind {shop.name}, bringing their unique perspective to the fashion world.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    
    {selectedProduct && (
      <ProductDetailModal 
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)} 
      />
    )}
    
    <LuxuryFooter />
  </div>
);
};

export default ShopPage;