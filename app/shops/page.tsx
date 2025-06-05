/*"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import NavbarTwo from "@/components/HeaderTwo";
import LuxuryFooter from "@/components/LuxuryFooter";
import { Star, MapPin, ShoppingBag, ChevronDown, ChevronUp, Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import BecomeProviderBanner from "@/components/services/BecomeProviderBanner";
import { useAuth } from "@/context/AuthContext";
import CreateShopModal from "@/components/services/CreateShopModal";
import ServicesHero from "@/components/services/ServicesHero";
import BecomeSellerBanner from "@/components/services/BecomeSellerProvider";
import ShopsHero from "@/components/services/ShopsHero";
import { AdminPrompt, ErrorToast, MembershipPrompt, PendingRequestPrompt } from "@/components/services/Prompts";

// Dummy boutique data
const boutiques = [
  {
    id: 1,
    name: "Velvet Underground",
    owner: "Sophia Chen",
    location: "Milan, Italy",
    rating: 4.9,
    products: 42,
    category: "Luxury Streetwear",
    image: "https://i.pinimg.com/736x/77/ea/a2/77eaa2802affc0b41489388e2d2bdc2e.jpg",
    featured: [
      "https://i.pinimg.com/736x/8e/3e/6a/8e3e6a6c8a1a9b1e8e3e6a6c8a1a9b1e.jpg",
      "https://i.pinimg.com/736x/5a/3e/6a/5a3e6a6c8a1a9b1e8e3e6a6c8a1a9b1e.jpg",
      "https://i.pinimg.com/736x/9a/3e/6a/9a3e6a6c8a1a9b1e8e3e6a6c8a1a9b1e.jpg"
    ],
    description: "Cutting-edge streetwear meets Italian craftsmanship. Limited edition drops monthly."
  },
  {
    id: 2,
    name: "Gilded Age",
    owner: "James Laurent",
    location: "Paris, France",
    rating: 4.8,
    products: 36,
    category: "Vintage Luxury",
    image: "https://i.pinimg.com/736x/da/e1/00/dae1000ddbd86a468c90685ac6603879.jpg",
    featured: [
      "https://i.pinimg.com/736x/57/6e/ef/576eefe23318e35580853471036bbc8d.jpg",
      "https://i.pinimg.com/736x/c8/0b/cb/c80bcbf585310970bc9a68e1ba7e96f1.jpg",
      "https://i.pinimg.com/736x/97/82/56/978256ac60bc5ed25e6dfeda175bd14d.jpg"
    ],
    description: "Curated vintage luxury pieces with modern relevance. Each item tells a story."
  },
  {
    id: 3,
    name: "Neon Noir",
    owner: "Alessandro Rossi",
    location: "Tokyo, Japan",
    rating: 4.7,
    products: 28,
    category: "Futuristic Fashion",
    image: "https://i.pinimg.com/736x/97/82/56/978256ac60bc5ed25e6dfeda175bd14d.jpg",
    featured: [
      "https://i.pinimg.com/736x/70/cf/84/70cf84d4d824e5994022b0f489ef81d9.jpg",
      "https://i.pinimg.com/564x/5a/3b/5a/5a3b5a9e9b8c1f1e8b1e1e8b1e1e8b1e.jpg",
      "https://i.pinimg.com/564x/7a/3b/5a/7a3b5a9e9b8c1f1e8b1e1e8b1e1e8b1e.jpg"
    ],
    description: "Where cyberpunk aesthetics meet high fashion. Limited runs of experimental designs."
  },
  {
    id: 4,
    name: "Silk Road",
    owner: "Isabella Moretti",
    location: "New York, USA",
    rating: 4.9,
    products: 51,
    category: "Sustainable Luxury",
    image: "https://i.pinimg.com/736x/57/6e/ef/576eefe23318e35580853471036bbc8d.jpg",
    featured: [
      "https://i.pinimg.com/736x/da/e1/00/dae1000ddbd86a468c90685ac6603879.jpg",
      "https://i.pinimg.com/736x/77/ea/a2/77eaa2802affc0b41489388e2d2bdc2e.jpg",
      "https://i.pinimg.com/736x/8e/3e/6a/8e3e6a6c8a1a9b1e8e3e6a6c8a1a9b1e.jpg"
    ],
    description: "Ethically sourced luxury with zero compromise on quality or design."
  },
  {
    id: 5,
    name: "Royal Rebel",
    owner: "Marcus DuPont",
    location: "London, UK",
    rating: 4.6,
    products: 33,
    category: "Punk Couture",
    image: "https://i.pinimg.com/736x/c8/0b/cb/c80bcbf585310970bc9a68e1ba7e96f1.jpg",
    featured: [
      "https://i.pinimg.com/736x/9a/3e/6a/9a3e6a6c8a1a9b1e8e3e6a6c8a1a9b1e.jpg",
      "https://i.pinimg.com/736x/97/82/56/978256ac60bc5ed25e6dfeda175bd14d.jpg",
      "https://i.pinimg.com/736x/57/6e/ef/576eefe23318e35580853471036bbc8d.jpg"
    ],
    description: "High-end punk aesthetics with royal tailoring techniques. Wearable rebellion."
  },
  {
    id: 6,
    name: "Midnight Sun",
    owner: "Freja Nielsen",
    location: "Stockholm, Sweden",
    rating: 4.8,
    products: 39,
    category: "Scandinavian Minimalism",
    image: "https://i.pinimg.com/736x/9a/3e/6a/9a3e6a6c8a1a9b1e8e3e6a6c8a1a9b1e.jpg",
    featured: [
      "https://i.pinimg.com/736x/5a/3e/6a/5a3e6a6c8a1a9b1e8e3e6a6c8a1a9b1e.jpg",
      "https://i.pinimg.com/736x/da/e1/00/dae1000ddbd86a468c90685ac6603879.jpg",
      "https://i.pinimg.com/736x/c8/0b/cb/c80bcbf585310970bc9a68e1ba7e96f1.jpg"
    ],
    description: "Nordic simplicity meets avant-garde silhouettes. Functional elegance redefined."
  }
];

const categories = [
  "All Boutiques",
  "Luxury Streetwear",
  "Vintage Luxury",
  "Futuristic Fashion",
  "Sustainable Luxury",
  "Punk Couture",
  "Scandinavian Minimalism"
];


const BoutiquesPage = () => {  // Remove the props parameter
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Boutiques");
  const [activeBoutique, setActiveBoutique] = useState<number | null>(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [checking, setChecking] = useState(false);
  const { user, isLoading: authLoading, refreshUser } = useAuth();
  const [selectedServiceLevel, setSelectedServiceLevel] = useState<string[]>([]);
  const [selectedDeliveryTime, setSelectedDeliveryTime] = useState<string[]>([]);
  const [activeService, setActiveService] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState<any | null>(null);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  const [error, setError] = useState('');
  const [showPendingRequestPrompt, setShowPendingRequestPrompt] = useState(false);
  const [showAdminPrompt, setShowAdminPrompt] = useState(false);
  const [showMembershipPrompt, setShowMembershipPrompt] = useState(false);
  const [isCreateShopModalOpen, setIsCreateShopModalOpen] = useState(false); 


  const filteredBoutiques = boutiques.filter(boutique => {
    const matchesSearch = boutique.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        boutique.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        boutique.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All Boutiques" || 
                          boutique.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleBoutique = (id: number) => {
    setActiveBoutique(activeBoutique === id ? null : id);
  };

  const router = useRouter();

  const handleVisit = (boutiqueId: string) => {
    router.push(`/shops/${boutiqueId}`);
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
    } else if (user.role === 'customer' && !user.member) {
      console.log('User is customer but not a member, showing membership prompt.');
      setShowMembershipPrompt(true);
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

  return (
    <div className="bg-white min-h-screen">
      <NavbarTwo />
      <ShopsHero 
        handleCreateSellerClick={handleCreateShopClick} 
        checking={checking} 
        authLoading={authLoading} 
      />



      {/* Search and Filter Bar *
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          {/* Search Bar *
          <div className="relative w-full md:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search boutiques..."
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

          {/* Category Filter *
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="hidden md:flex items-center gap-2">
              <span className="text-gray-600">Filter:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-full px-4 py-3 pr-10 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#bf2c7e] focus:border-[#bf2c7e]"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>

            {/* Mobile Filter Button *
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="md:hidden flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-full shadow-sm hover:bg-gray-50"
            >
              <span>Filters</span>
              <ChevronDown className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Mobile Filters Panel *
        {mobileFiltersOpen && (
          <div className="md:hidden mb-8 p-6 bg-white border border-gray-200 rounded-xl shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg">Filters</h3>
              <button onClick={() => setMobileFiltersOpen(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Categories</h4>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                        setMobileFiltersOpen(false);
                      }}
                      className={`px-4 py-2 rounded-full text-sm ${
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

        {/* Boutiques Grid *
        {filteredBoutiques.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBoutiques.map((boutique) => (
              <motion.div
                key={boutique.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all border border-gray-100 overflow-hidden"
              >
                {/* Boutique Cover Image *
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={boutique.image}
                    alt={boutique.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-2xl font-bold text-white">{boutique.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <MapPin className="text-[#bf2c7e]" size={16} />
                      <span className="text-white text-sm">{boutique.location}</span>
                    </div>
                  </div>
                </div>

                {/* Boutique Info *
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Curated by</p>
                      <p className="font-medium">{boutique.owner}</p>
                    </div>
                    <div className="flex items-center gap-1 bg-[#bf2c7e]/10 px-3 py-1 rounded-full">
                      <Star className="text-[#bf2c7e] fill-[#bf2c7e]" size={16} />
                      <span className="font-bold text-gray-900">{boutique.rating}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4">{boutique.description}</p>

                  {/* Featured Products Preview *
                  <div className="flex gap-2 mb-6">
                    {boutique.featured.map((product, index) => (
                      <div key={index} className="w-1/3 h-24 overflow-hidden rounded-lg">
                        <img
                          src={product}
                          alt={`Product ${index + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Expandable Details *
                  <button
                    onClick={() => toggleBoutique(boutique.id)}
                    className="w-full flex justify-between items-center text-left"
                  >
                    <span className="text-sm font-medium text-[#bf2c7e]">
                      {activeBoutique === boutique.id ? 'Hide details' : 'View shop details'}
                    </span>
                    {activeBoutique === boutique.id ? (
                      <ChevronUp className="text-[#bf2c7e]" />
                    ) : (
                      <ChevronDown className="text-[#bf2c7e]" />
                    )}
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      activeBoutique === boutique.id ? "max-h-96 mt-4" : "max-h-0"
                    }`}
                  >
                    <div className="pt-4 border-t border-gray-100">
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-500">Category</p>
                          <p className="font-medium">{boutique.category}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Products</p>
                          <p className="font-medium">{boutique.products}+</p>
                        </div>
                      </div>
                      <motion.button
                        onClick={() => handleVisit(boutique.id.toString())}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full mt-4 bg-[#bf2c7e] hover:bg-[#0f1c47] text-black font-bold py-3 rounded-lg flex items-center justify-center gap-2"
                      >
                        <ShoppingBag size={18} />
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
            className="col-span-full text-center py-20"
          >
            <div className="mx-auto bg-[#bf2c7e]/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
              <Search className="text-[#bf2c7e]" size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No boutiques found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All Boutiques");
              }}
              className="px-6 py-3 bg-[#bf2c7e] hover:bg-[#0f1c47] text-black font-bold rounded-full"
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

        {/* Prompt Modals *
        {showAdminPrompt && (
          <AdminPrompt onClose={() => setShowAdminPrompt(false)} />
        )}
  
        {showMembershipPrompt && (
          <MembershipPrompt onClose={() => setShowMembershipPrompt(false)} />
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

"use client";

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

 /* useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/shops');
        if (!response.ok) {
          throw new Error('Failed to fetch shops');
        }
        const data = await response.json();
        setShops(data);
      } catch (err) {
        setError('Failed to load shops. Please try again later.');
        console.error('Error fetching shops:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchShops();
  }, []);*/
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

      {/* Search and Filter Bar */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          {/* Search Bar */}
          <div className="relative w-full md:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search boutiques..."
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

          {/* Category Filter */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="hidden md:flex items-center gap-2">
              <span className="text-gray-600">Filter:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-full px-4 py-3 pr-10 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#bf2c7e] focus:border-[#bf2c7e]"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
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
              <span>Filters</span>
              <ChevronDown className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Mobile Filters Panel */}
        {mobileFiltersOpen && (
          <div className="md:hidden mb-8 p-6 bg-white border border-gray-200 rounded-xl shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg">Filters</h3>
              <button onClick={() => setMobileFiltersOpen(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Categories</h4>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                        setMobileFiltersOpen(false);
                      }}
                      className={`px-4 py-2 rounded-full text-sm ${
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredShops.map((shop) => (
              <motion.div
                key={shop._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all border border-gray-100 overflow-hidden"
              >
                {/* Shop Cover Image */}
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={shop.image}
                    alt={shop.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-2xl font-bold text-white">{shop.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <MapPin className="text-[#bf2c7e]" size={16} />
                      <span className="text-white text-sm">{shop.location}</span>
                    </div>
                  </div>
                </div>

                {/* Shop Info */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Owner</p>
                      <p className="font-medium">{shop.owner.name}</p>
                    </div>
                    <div className="flex items-center gap-1 bg-[#bf2c7e]/10 px-3 py-1 rounded-full">
                      <Star className="text-[#bf2c7e] fill-[#bf2c7e]" size={16} />
                      <span className="font-bold text-gray-900">New</span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4">{shop.description}</p>

                  {/* Categories */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {shop.categories.map((category, index) => (
                      <span key={index} className="text-xs bg-gray-100 px-3 py-1 rounded-full">
                        {category}
                      </span>
                    ))}
                  </div>

                  {/* Expandable Details */}
                  <button
                    onClick={() => toggleShop(shop._id)}
                    className="w-full flex justify-between items-center text-left"
                  >
                    <span className="text-sm font-medium text-[#bf2c7e]">
                      {activeShop === shop._id ? 'Hide details' : 'View shop details'}
                    </span>
                    {activeShop === shop._id ? (
                      <ChevronUp className="text-[#bf2c7e]" />
                    ) : (
                      <ChevronDown className="text-[#bf2c7e]" />
                    )}
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      activeShop === shop._id ? "max-h-96 mt-4" : "max-h-0"
                    }`}
                  >
                    <div className="pt-4 border-t border-gray-100">
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-500">Categories</p>
                          <p className="font-medium">{shop.categories.join(', ')}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Contact</p>
                          <p className="font-medium">{shop.contact.email}</p>
                        </div>
                      </div>
                      <motion.button
                        onClick={() => handleVisit(shop._id)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full mt-4 bg-[#bf2c7e] hover:bg-[#0f1c47] text-black font-bold py-3 rounded-lg flex items-center justify-center gap-2"
                      >
                        <ShoppingBag size={18} />
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
            className="col-span-full text-center py-20"
          >
            <div className="mx-auto bg-[#bf2c7e]/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
              <Search className="text-[#bf2c7e]" size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No shops found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All Boutiques");
              }}
              className="px-6 py-3 bg-[#bf2c7e] hover:bg-[#0f1c47] text-black font-bold rounded-full"
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

      <LuxuryFooter />
    </div>
  );
};

export default BoutiquesPage;