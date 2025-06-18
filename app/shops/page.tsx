/*"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import NavbarTwo from "@/components/HeaderTwo";
import LuxuryFooter from "@/components/LuxuryFooter";
import { Star, MapPin, ShoppingBag, ChevronDown, ChevronUp, Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import BecomeProviderBanner from "@/components/services/BecomeProviderBanner";
import { useAuth } from "@/context/AuthContext";
import CreateShopModal from "@/components/services/CreateShopModal";
import ShopsHero from "@/components/services/ShopsHero";
import { AdminPrompt, ErrorToast, MembershipPrompt, PendingRequestPrompt, SellerPrompt } from "@/components/services/Prompts";
import BecomeSellerBanner from "@/components/services/BecomeSellerProvider";


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

const categories = [
  "All Boutiques",
  "fashion",
  "home",
  "art",
  "jewelry",
  "beauty",
  "electronics",
  "food",
  "other"
];

const BoutiquesPage = () => {
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Boutiques");
  const [activeShop, setActiveShop] = useState<string | null>(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [checking, setChecking] = useState(false);
  const { user, isLoading: authLoading, refreshUser } = useAuth();
  const [error, setError] = useState('');
  const [showPendingRequestPrompt, setShowPendingRequestPrompt] = useState(false);
  const [showAdminPrompt, setShowAdminPrompt] = useState(false);
  const [showSellerPrompt, setShowSellerPrompt] = useState(false);
  const [isCreateShopModalOpen, setIsCreateShopModalOpen] = useState(false); 

  const router = useRouter();
useEffect(() => {
  const fetchShops = async () => {
    try {
      const response = await fetch('https://shaddynab-new.onrender.com/api/shops');
      if (!response.ok) {
        throw new Error('Failed to fetch shops');
      }
      const data = await response.json();

      console.log('Received shop data:', data);

      if (Array.isArray(data.data)) {
        setShops(data.data); // ✅ Use the actual array of shops
      } else {
        console.error('Expected an array but got:', typeof data.data, data.data);
        setError('Invalid data format received from server.');
        setShops([]);
      }

    } catch (err) {
      setError('Failed to load shops. Please try again later.');
      console.error('Error fetching shops:', err);
    } finally {
      setLoading(false);
    }
  };

  fetchShops();
}, []);



  const filteredShops = shops.filter(shop => {
    const matchesSearch = shop.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        (shop.owner.name && shop.owner.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
                        shop.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All Boutiques" || 
                          shop.categories.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const toggleShop = (id: string) => {
    setActiveShop(activeShop === id ? null : id);
  };

  const handleVisit = (shopId: string) => {
    router.push(`/shops/${shopId}`);
  };

  const handleCreateShopClick = async () => {
    if (authLoading) {
      console.log('Auth is still loading, aborting.');
      return;
    }

    setChecking(true);
    setError('');
    console.log('Started hub creation process');

    try {
      console.log('Refreshing user...');
      await refreshUser();
      console.log('User after refresh:', user);

      if (!user) {
        console.warn('User not logged in.');
        // Implement login modal here if needed
        return;
      }

      console.log('Checking for existing membership request...');
      const hasPendingRequest = await checkExistingRequest();
      console.log('Has pending request:', hasPendingRequest);

      if (hasPendingRequest) {
        console.log('User has a pending membership request, showing prompt.');
        setShowPendingRequestPrompt(true);
        return;
      }

      console.log(`User role: ${user.role}, Is member: ${user.member}`);
      if (user.role === 'admin') {
        console.log('User is admin, showing admin prompt.');
        setShowAdminPrompt(true);
      } else if (user.role === 'customer') {
        console.log('User is customer but not a member, showing membership prompt.');
        setShowSellerPrompt(true);
      } else {
        console.log('User is eligible, opening create shop modal.');
        handleOpenCreateShopModal();
      }

    } catch (error) {
      console.error('❌ Error checking user status:', error);
      setError('An error occurred while checking your status');
    } finally {
      setChecking(false);
      console.log('Finished hub creation check.');
    }
  };

  const checkExistingRequest = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return false;

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/membership/check`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to check requests');
      }

      const data = await response.json();
      return data.hasPendingRequest;
    } catch (err) {
      console.error('Error checking requests:', err);
      setError('Failed to check your membership status');
      return false;
    }
  };

  const handleOpenCreateShopModal = () => {
    setIsCreateShopModalOpen(true);
  };

  const handleCloseCreateShopModal = () => {
    setIsCreateShopModalOpen(false);
  };

  if (loading) {
    return (
      <div className="bg-white min-h-screen">
        <NavbarTwo />
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#bf2c7e]"></div>
          </div>
        </div>
      </div>
    );
  }

return (
  <div className="bg-white min-h-screen">
   <NavbarTwo />
    <ShopsHero 
      handleCreateSellerClick={handleCreateShopClick} 
      checking={checking} 
      authLoading={authLoading} 
    />

   
    <section className="py-6 px-4 sm:py-8 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 sm:gap-4 mb-6">
     
        <div className="relative w-full md:w-80 lg:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search shops..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-9 sm:pl-10 pr-3 py-2 sm:py-2.5 border border-gray-300 rounded-full bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#bf2c7e] focus:border-[#bf2c7e] text-sm sm:text-base text-black"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 sm:gap-3 w-full md:w-auto">
          <div className="hidden md:flex items-center gap-2">
            <span className="text-gray-600 text-sm sm:text-base">Filter:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="appearance-none text-black bg-white border border-gray-300 rounded-full px-3 sm:px-4 py-2 sm:py-2.5 pr-8 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#bf2c7e] focus:border-[#bf2c7e] text-sm sm:text-base"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <ChevronDown className="h-4 w-4 text-black" />
            </div>
          </div>

      
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="md:hidden flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-full shadow-sm hover:bg-gray-50 text-sm"
          >
            <span className="text-black">Filters</span>
            <ChevronDown className="h-4 w-4 text-black" />
          </button>
        </div>
      </div>

      {mobileFiltersOpen && (
        <div className="md:hidden mb-6 p-4 sm:p-6 bg-white border border-gray-200 rounded-lg sm:rounded-xl shadow-md">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-base sm:text-lg text-black">Filters</h3>
            <button onClick={() => setMobileFiltersOpen(false)}>
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="space-y-3 text-black">
            <div>
              <h4 className="font-medium text-sm sm:text-base mb-2 text-black">Categories</h4>
              <div className="grid grid-cols-2 gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setMobileFiltersOpen(false);
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs sm:text-sm ${
                      selectedCategory === category
                        ? "bg-[#bf2c7e] text-black font-bold"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {filteredShops.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredShops.map((shop) => (
            <motion.div
              key={shop._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg sm:rounded-xl shadow-sm hover:shadow-md sm:shadow-md sm:hover:shadow-lg transition-all border border-gray-100 overflow-hidden"
            >
    
              <div className="relative h-40 sm:h-48 md:h-52 lg:h-60 overflow-hidden">
                <img
                  src={shop.image}
                  alt={shop.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4">
                  <h3 className="text-lg sm:text-xl font-bold text-white">{shop.name}</h3>
                  <div className="flex items-center gap-1 mt-1">
                    <MapPin className="text-[#bf2c7e]" size={14} />
                    <span className="text-white text-xs sm:text-sm">{shop.location}</span>
                  </div>
                </div>
              </div>

              <div className="p-3 sm:p-4">
                <div className="flex justify-between items-start mb-2 sm:mb-3">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">Owner</p>
                    <p className="font-medium text-sm sm:text-base">{shop.owner.name}</p>
                  </div>
                  <div className="flex items-center gap-1 bg-[#bf2c7e]/10 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full">
                    <Star className="text-[#bf2c7e] fill-[#bf2c7e]" size={14} />
                    <span className="font-bold text-gray-900 text-xs sm:text-sm">New</span>
                  </div>
                </div>

                <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">{shop.description}</p>

          
                <div className="flex flex-wrap gap-1 sm:gap-2 mb-4 sm:mb-5">
                  {shop.categories.map((category, index) => (
                    <span key={index} className="text-xs text-black bg-gray-100 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full">
                      {category}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => toggleShop(shop._id)}
                  className="w-full flex justify-between items-center text-left"
                >
                  <span className="text-xs sm:text-sm font-medium text-[#bf2c7e]">
                    {activeShop === shop._id ? 'Hide details' : 'View shop details'}
                  </span>
                  {activeShop === shop._id ? (
                    <ChevronUp className="text-[#bf2c7e]" size={16} />
                  ) : (
                    <ChevronDown className="text-[#bf2c7e]" size={16} />
                  )}
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    activeShop === shop._id ? "max-h-96 mt-3" : "max-h-0"
                  }`}
                >
                  <div className="pt-3 border-t border-gray-100">
                    <div className="flex flex-col gap-3 mb-3">
                    <div>
                      <p className="text-xs sm:text-sm text-gray-500">Categories</p>
                      <p className="font-medium text-xs text-black sm:text-sm">
                        {shop.categories.join(', ')}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-500">Contact</p>
                      <p className="font-medium text-xs text-black sm:text-sm">
                        {shop.contact.email}
                      </p>
                    </div>
                  </div>
                    <motion.button
                      onClick={() => handleVisit(shop._id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full mt-3 bg-[#bf2c7e] hover:bg-[#0f1c47] text-black font-bold py-2 sm:py-2.5 rounded-lg flex items-center justify-center gap-1 text-xs sm:text-sm"
                    >
                      <ShoppingBag size={14} />
                      Visit Shop
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="col-span-full text-center py-12 sm:py-16"
        >
          <div className="mx-auto bg-[#bf2c7e]/10 p-3 sm:p-4 rounded-full w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center mb-4 sm:mb-6">
            <Search className="text-[#bf2c7e]" size={20} />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2">No shops found</h3>
          <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">Try adjusting your search or filter criteria</p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All Boutiques");
            }}
            className="px-4 py-2 sm:px-6 sm:py-3 bg-[#bf2c7e] hover:bg-[#0f1c47] text-black font-bold rounded-full text-sm sm:text-base"
          >
            Reset Filters
          </button>
        </motion.div>
      )}
    </section>
    <BecomeSellerBanner
      handleCreateSellerClick={handleCreateShopClick} 
      checking={checking} 
      authLoading={authLoading} 
    />

    {showAdminPrompt && (
      <AdminPrompt onClose={() => setShowAdminPrompt(false)} />
    )}

    {showSellerPrompt && (
      <SellerPrompt onClose={() => setShowSellerPrompt(false)} />
    )}

    {showPendingRequestPrompt && (
      <PendingRequestPrompt onClose={() => setShowPendingRequestPrompt(false)} />
    )}

    {error && (
      <ErrorToast error={error} onClose={() => setError('')} />
    )}

    <CreateShopModal 
      isOpen={isCreateShopModalOpen}
      onClose={handleCloseCreateShopModal}
    />

    <LuxuryFooter />
  </div>
);
};

export default BoutiquesPage;*/
"use client"

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import NavbarTwo from "@/components/HeaderTwo";
import LuxuryFooter from "@/components/LuxuryFooter";
import { Star, MapPin, ShoppingBag, ChevronDown, ChevronUp, Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import CreateShopModal from "@/components/services/CreateShopModal";
import ShopsHero from "@/components/services/ShopsHero";
import { AdminPrompt, ErrorToast, MembershipPrompt, PendingRequestPrompt, SellerPrompt } from "@/components/services/Prompts";
import BecomeSellerBanner from "@/components/services/BecomeSellerProvider";

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

const categories = [
  "All Boutiques",
  "fashion",
  "home",
  "art",
  "jewelry",
  "beauty",
  "electronics",
  "food",
  "other"
];

const BoutiquesPage = () => {
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Boutiques");
  const [activeShop, setActiveShop] = useState<string | null>(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [checking, setChecking] = useState(false);
  const { user, isLoading: authLoading, refreshUser } = useAuth();
  const [error, setError] = useState('');
  const [showPendingRequestPrompt, setShowPendingRequestPrompt] = useState(false);
  const [showAdminPrompt, setShowAdminPrompt] = useState(false);
  const [showSellerPrompt, setShowSellerPrompt] = useState(false);
  const [isCreateShopModalOpen, setIsCreateShopModalOpen] = useState(false); 
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // New state for login modal

  const router = useRouter();

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await fetch('https://shaddynab-new.onrender.com/api/shops');
        if (!response.ok) {
          throw new Error('Failed to fetch shops');
        }
        const data = await response.json();

        console.log('Received shop data:', data);

        if (Array.isArray(data.data)) {
          setShops(data.data); // ✅ Use the actual array of shops
        } else {
          console.error('Expected an array but got:', typeof data.data, data.data);
          setError('Invalid data format received from server.');
          setShops([]);
        }

      } catch (err) {
        setError('Failed to load shops. Please try again later.');
        console.error('Error fetching shops:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchShops();
  }, []);

  const filteredShops = shops.filter(shop => {
    const matchesSearch = shop.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        (shop.owner.name && shop.owner.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
                        shop.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All Boutiques" || 
                          shop.categories.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const toggleShop = (id: string) => {
    setActiveShop(activeShop === id ? null : id);
  };

  const handleVisit = (shopId: string) => {
    router.push(`/shops/${shopId}`);
  };

  const handleCreateShopClick = async () => {
    if (authLoading) {
      console.log('Auth is still loading, aborting.');
      return;
    }

    setChecking(true);
    setError('');
    console.log('Started hub creation process');

    try {
      console.log('Refreshing user...');
      await refreshUser();
      console.log('User after refresh:', user);

      if (!user) {
        console.warn('User not logged in.');
        setIsLoginModalOpen(true); // Open login modal if user is not logged in
        return;
      }

      console.log('Checking for existing membership request...');
      const hasPendingRequest = await checkExistingRequest();
      console.log('Has pending request:', hasPendingRequest);

      if (hasPendingRequest) {
        console.log('User has a pending membership request, showing prompt.');
        setShowPendingRequestPrompt(true);
        return;
      }

      console.log(`User role: ${user.role}, Is member: ${user.member}`);
      if (user.role === 'admin') {
        console.log('User is admin, showing admin prompt.');
        setShowAdminPrompt(true);
      } else if (user.role === 'customer') {
        console.log('User is customer but not a member, showing membership prompt.');
        setShowSellerPrompt(true);
      } else {
        console.log('User is eligible, opening create shop modal.');
        handleOpenCreateShopModal();
      }

    } catch (error) {
      console.error('❌ Error checking user status:', error);
      setError('An error occurred while checking your status');
    } finally {
      setChecking(false);
      console.log('Finished hub creation check.');
    }
  };

  const checkExistingRequest = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return false;

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/membership/check`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to check requests');
      }

      const data = await response.json();
      return data.hasPendingRequest;
    } catch (err) {
      console.error('Error checking requests:', err);
      setError('Failed to check your membership status');
      return false;
    }
  };

  const handleOpenCreateShopModal = () => {
    setIsCreateShopModalOpen(true);
  };

  const handleCloseCreateShopModal = () => {
    setIsCreateShopModalOpen(false);
  };

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  if (loading) {
    return (
      <div className="bg-white min-h-screen">
        <NavbarTwo />
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#bf2c7e]"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <NavbarTwo />
      <ShopsHero 
        handleCreateSellerClick={handleCreateShopClick} 
        checking={checking} 
        authLoading={authLoading} 
      />

      {/* Search and Filter Bar */}
      <section className="py-6 px-4 sm:py-8 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 sm:gap-4 mb-6">
          {/* Search Bar */}
          <div className="relative w-full md:w-80 lg:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search shops..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-9 sm:pl-10 pr-3 py-2 sm:py-2.5 border border-gray-300 rounded-full bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#bf2c7e] focus:border-[#bf2c7e] text-sm sm:text-base text-black"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <X className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2 sm:gap-3 w-full md:w-auto">
            <div className="hidden md:flex items-center gap-2">
              <span className="text-gray-600 text-sm sm:text-base">Filter:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none text-black bg-white border border-gray-300 rounded-full px-3 sm:px-4 py-2 sm:py-2.5 pr-8 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#bf2c7e] focus:border-[#bf2c7e] text-sm sm:text-base"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <ChevronDown className="h-4 w-4 text-black" />
              </div>
            </div>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="md:hidden flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-full shadow-sm hover:bg-gray-50 text-sm"
            >
              <span className="text-black">Filters</span>
              <ChevronDown className="h-4 w-4 text-black" />
            </button>
          </div>
        </div>

        {/* Mobile Filters Panel */}
        {mobileFiltersOpen && (
          <div className="md:hidden mb-6 p-4 sm:p-6 bg-white border border-gray-200 rounded-lg sm:rounded-xl shadow-md">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-base sm:text-lg text-black">Filters</h3>
              <button onClick={() => setMobileFiltersOpen(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-3 text-black">
              <div>
                <h4 className="font-medium text-sm sm:text-base mb-2 text-black">Categories</h4>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                        setMobileFiltersOpen(false);
                      }}
                      className={`px-3 py-1.5 rounded-full text-xs sm:text-sm ${
                        selectedCategory === category
                          ? "bg-[#bf2c7e] text-black font-bold"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Shops Grid */}
        {filteredShops.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredShops.map((shop) => (
              <motion.div
                key={shop._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg sm:rounded-xl shadow-sm hover:shadow-md sm:shadow-md sm:hover:shadow-lg transition-all border border-gray-100 overflow-hidden"
              >
                {/* Shop Cover Image */}
                <div className="relative h-40 sm:h-48 md:h-52 lg:h-60 overflow-hidden">
                  <img
                    src={shop.image}
                    alt={shop.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4">
                    <h3 className="text-lg sm:text-xl font-bold text-white">{shop.name}</h3>
                    <div className="flex items-center gap-1 mt-1">
                      <MapPin className="text-[#bf2c7e]" size={14} />
                      <span className="text-white text-xs sm:text-sm">{shop.location}</span>
                    </div>
                  </div>
                </div>

                {/* Shop Info */}
                <div className="p-3 sm:p-4">
                  <div className="flex justify-between items-start mb-2 sm:mb-3">
                    <div>
                      <p className="text-xs sm:text-sm text-gray-500">Owner</p>
                      <p className="font-medium text-sm sm:text-base">{shop.owner.name}</p>
                    </div>
                    <div className="flex items-center gap-1 bg-[#bf2c7e]/10 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full">
                      <Star className="text-[#bf2c7e] fill-[#bf2c7e]" size={14} />
                      <span className="font-bold text-gray-900 text-xs sm:text-sm">New</span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">{shop.description}</p>

                  {/* Categories */}
                  <div className="flex flex-wrap gap-1 sm:gap-2 mb-4 sm:mb-5">
                    {shop.categories.map((category, index) => (
                      <span key={index} className="text-xs text-black bg-gray-100 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full">
                        {category}
                      </span>
                    ))}
                  </div>

                  {/* Expandable Details */}
                  <button
                    onClick={() => toggleShop(shop._id)}
                    className="w-full flex justify-between items-center text-left"
                  >
                    <span className="text-xs sm:text-sm font-medium text-[#bf2c7e]">
                      {activeShop === shop._id ? 'Hide details' : 'View shop details'}
                    </span>
                    {activeShop === shop._id ? (
                      <ChevronUp className="text-[#bf2c7e]" size={16} />
                    ) : (
                      <ChevronDown className="text-[#bf2c7e]" size={16} />
                    )}
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      activeShop === shop._id ? "max-h-96 mt-3" : "max-h-0"
                    }`}
                  >
                    <div className="pt-3 border-t border-gray-100">
                      <div className="flex flex-col gap-3 mb-3">
                        <div>
                          <p className="text-xs sm:text-sm text-gray-500">Categories</p>
                          <p className="font-medium text-xs text-black sm:text-sm">
                            {shop.categories.join(', ')}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs sm:text-sm text-gray-500">Contact</p>
                          <p className="font-medium text-xs text-black sm:text-sm">
                            {shop.contact.email}
                          </p>
                        </div>
                      </div>
                      <motion.button
                        onClick={() => handleVisit(shop._id)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full mt-3 bg-[#bf2c7e] hover:bg-[#0f1c47] text-black font-bold py-2 sm:py-2.5 rounded-lg flex items-center justify-center gap-1 text-xs sm:text-sm"
                      >
                        <ShoppingBag size={14} />
                        Visit Shop
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-full text-center py-12 sm:py-16"
          >
            <div className="mx-auto bg-[#bf2c7e]/10 p-3 sm:p-4 rounded-full w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center mb-4 sm:mb-6">
              <Search className="text-[#bf2c7e]" size={20} />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2">No shops found</h3>
            <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All Boutiques");
              }}
              className="px-4 py-2 sm:px-6 sm:py-3 bg-[#bf2c7e] hover:bg-[#0f1c47] text-black font-bold rounded-full text-sm sm:text-base"
            >
              Reset Filters
            </button>
          </motion.div>
        )}
      </section>
      <BecomeSellerBanner
        handleCreateSellerClick={handleCreateShopClick} 
        checking={checking} 
        authLoading={authLoading} 
      />

      {/* Prompt Modals */}
      {showAdminPrompt && (
        <AdminPrompt onClose={() => setShowAdminPrompt(false)} />
      )}

      {showSellerPrompt && (
        <SellerPrompt onClose={() => setShowSellerPrompt(false)} />
      )}

      {showPendingRequestPrompt && (
        <PendingRequestPrompt onClose={() => setShowPendingRequestPrompt(false)} />
      )}

      {error && (
        <ErrorToast error={error} onClose={() => setError('')} />
      )}

      <CreateShopModal 
        isOpen={isCreateShopModalOpen}
        onClose={handleCloseCreateShopModal}
      />

      {/* Login Modal */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Please log in</h2>
            <p className="text-gray-600 mb-6">You need to log in to create a shop.</p>
            <a
              href="/auth/login"
              className="bg-[#bf2c7e] hover:bg-[#0f1c47] text-white font-bold py-2 px-4 rounded-full"
            >
              Go to Login
            </a>
          </div>
        </div>
      )}

      <LuxuryFooter />
    </div>
  );
};

export default BoutiquesPage;