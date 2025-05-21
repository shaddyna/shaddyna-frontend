/*"use client"
import { useState, useRef, useEffect, FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Search, X, ChevronDown, ChevronUp, Filter, Briefcase, Clock, Globe, Award, Check, Sparkles, Mail, User, MessageSquare, ArrowLeft } from "lucide-react";
import NavbarTwo from "@/components/HeaderTwo";
import LuxuryFooter from "@/components/LuxuryFooter";
import { FiAlertCircle, FiClock, FiPlusCircle, FiStar, FiX } from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";

// Dummy services data
const services = [
  {
    id: 1,
    title: "Luxury Brand Identity Design",
    provider: {
      name: "Sophia Chen",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      rating: 4.9,
      projects: 124,
    },
    category: "Graphic Design",
    skills: ["Logo Design", "Brand Guidelines", "Visual Identity"],
    price: "$500-$2000",
    deliveryTime: "7-14 days",
    description: "Crafting premium brand identities for luxury fashion houses and boutique businesses. Includes logo, color palette, typography, and full brand guidelines.",
    isFeatured: true,
    isProVerified: true,
  },
  {
    id: 2,
    title: "E-commerce Website Development",
    provider: {
      name: "James Laurent",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      rating: 4.8,
      projects: 89,
    },
    category: "Web Development",
    skills: ["React", "Next.js", "Shopify", "Headless Commerce"],
    price: "$2000-$10000",
    deliveryTime: "3-6 weeks",
    description: "High-performance e-commerce solutions for luxury brands with custom integrations and premium UX design.",
    isFeatured: false,
    isProVerified: true,
  },
  {
    id: 3,
    title: "Luxury Product Photography",
    provider: {
      name: "Alessandro Rossi",
      avatar: "https://randomuser.me/api/portraits/men/68.jpg",
      rating: 4.7,
      projects: 56,
    },
    category: "Photography",
    skills: ["Product Staging", "Lighting", "Retouching", "Commercial"],
    price: "$300-$1500",
    deliveryTime: "3-7 days",
    description: "Professional product photography that showcases your items in the most luxurious light. Perfect for high-end fashion and jewelry.",
    isFeatured: true,
    isProVerified: false,
  },
  {
    id: 4,
    title: "Social Media Content Strategy",
    provider: {
      name: "Isabella Moretti",
      avatar: "https://randomuser.me/api/portraits/women/51.jpg",
      rating: 4.9,
      projects: 72,
    },
    category: "Digital Marketing",
    skills: ["Content Planning", "Visual Storytelling", "Luxury Branding"],
    price: "$800-$3000",
    deliveryTime: "2-4 weeks",
    description: "Tailored social media strategies for luxury brands to elevate their online presence and engage high-net-worth audiences.",
    isFeatured: false,
    isProVerified: true,
  },
  {
    id: 5,
    title: "Luxury Copywriting",
    provider: {
      name: "Marcus DuPont",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg",
      rating: 4.6,
      projects: 48,
    },
    category: "Writing",
    skills: ["Product Descriptions", "Brand Voice", "Advertising Copy"],
    price: "$100-$500",
    deliveryTime: "3-5 days",
    description: "Persuasive, elegant copy that captures the essence of your luxury brand and converts discerning customers.",
    isFeatured: false,
    isProVerified: false,
  },
  {
    id: 6,
    title: "3D Product Visualization",
    provider: {
      name: "Freja Nielsen",
      avatar: "https://randomuser.me/api/portraits/women/63.jpg",
      rating: 4.8,
      projects: 36,
    },
    category: "3D Design",
    skills: ["Blender", "3D Modeling", "Rendering", "Animation"],
    price: "$400-$2500",
    deliveryTime: "5-10 days",
    description: "Photorealistic 3D renders of your products for e-commerce, advertising, and prototyping needs.",
    isFeatured: true,
    isProVerified: true,
  },
];

const categories = [
  "All Categories",
  "Graphic Design",
  "Web Development",
  "Photography",
  "Digital Marketing",
  "Writing",
  "3D Design",
  "Video Production",
  "Fashion Design"
];

const serviceLevels = [
  { name: "Basic", value: "basic" },
  { name: "Standard", value: "standard" },
  { name: "Premium", value: "premium" },
  { name: "Enterprise", value: "enterprise" }
];

const deliveryTimes = [
  { name: "Under 1 week", value: "1week" },
  { name: "1-2 weeks", value: "2weeks" },
  { name: "2-4 weeks", value: "4weeks" },
  { name: "1+ month", value: "1month" }
];

interface ServicesPageProps {
  onOpenModal: () => void;
}

const ServicesPage: FC<ServicesPageProps> = ({ onOpenModal }) => {
//const ServicesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedServiceLevel, setSelectedServiceLevel] = useState<string[]>([]);
  const [selectedDeliveryTime, setSelectedDeliveryTime] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [activeService, setActiveService] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [checking, setChecking] = useState(false);
  const { user, isLoading: authLoading, refreshUser } = useAuth();
  const [error, setError] = useState('');
  const [showPendingRequestPrompt, setShowPendingRequestPrompt] = useState(false);
  const [showAdminPrompt, setShowAdminPrompt] = useState(false);
  const [showMembershipPrompt, setShowMembershipPrompt] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    budget: "",
    timeline: ""
  });
  const modalRef = useRef<HTMLDivElement>(null);

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

  const handleCreateShopClick = async () => {
    if (authLoading) return;
    
    setChecking(true);
    setError('');
    
    try {
      await refreshUser();

      if (!user) {
        console.log("User not logged in");
        onOpenModal();
        return;
      }

      // Check for existing pending request first
      const hasPendingRequest = await checkExistingRequest();
      if (hasPendingRequest) {
        setShowPendingRequestPrompt(true);
        return;
      }

      if (user.role === 'admin') {
        setShowAdminPrompt(true);
      } else if (user.role === 'customer' && !user.member) {
        setShowMembershipPrompt(true);
      } else {
        onOpenModal();
      }
    } catch (error) {
      console.error('Error checking user status:', error);
      setError('An error occurred while checking your status');
    } finally {
      setChecking(false);
    }
  };

  const toggleService = (id: number) => {
    setActiveService(activeService === id ? null : id);
  };

  const toggleServiceLevel = (value: string) => {
    setSelectedServiceLevel(prev =>
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    );
  };

  const toggleDeliveryTime = (value: string) => {
    setSelectedDeliveryTime(prev =>
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    );
  };

  const handleContinueClick = (service: typeof services[0]) => {
    setSelectedService(service);
    setIsInquiryOpen(true);
    // Pre-fill budget with service price range
    setFormData(prev => (    {
      ...prev,
      budget: service.price,
      timeline: service.deliveryTime
    }));
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setIsInquiryOpen(false);
    }
  };

  useEffect(() => {
    if (isInquiryOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.body.style.overflow = 'hidden';
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.body.style.overflow = 'auto';
    };
  }, [isInquiryOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Inquiry submitted:', formData);
    // Close modal and reset form after submission
    setIsInquiryOpen(false);
    setFormData({
      name: "",
      email: "",
      message: "",
      budget: "",
      timeline: ""
    });
    // Show success message (you could implement a toast notification here)
    alert('Your inquiry has been sent successfully!');
  };

  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        service.provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        service.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All Categories" || 
                          service.category === selectedCategory;
    const matchesServiceLevel = selectedServiceLevel.length === 0 || 
                              (service.price.includes("$500") && selectedServiceLevel.includes("premium")) ||
                              (service.price.includes("$100") && selectedServiceLevel.includes("basic"));
    const matchesDeliveryTime = selectedDeliveryTime.length === 0 || 
                              (service.deliveryTime.includes("7 days") && selectedDeliveryTime.includes("1week")) ||
                              (service.deliveryTime.includes("2 weeks") && selectedDeliveryTime.includes("2weeks"));

    return matchesSearch && matchesCategory && matchesServiceLevel && matchesDeliveryTime;
  });

  return (
    <div className="bg-white min-h-screen">
      <NavbarTwo />

{/* Hero Section *
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
        Premium Skills
      </span>
    </h1>
    <p className="text-xl text-gray-200 max-w-2xl mx-auto mb-8">
      Connect with top-tier professionals for your luxury business needs
    </p>
    <div className="flex flex-col sm:flex-row justify-center gap-4">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleCreateShopClick}
        disabled={checking || authLoading}
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
              placeholder="Search services..."
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
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-full shadow-sm hover:bg-gray-50"
            >
              <span>Filters</span>
              <Filter className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Filters Panel *
        {showFilters && (
          <div className="mb-8 p-6 bg-white border border-gray-200 rounded-xl shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg">Filters</h3>
              <button onClick={() => setShowFilters(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-medium mb-2">Service Level</h4>
                <div className="space-y-2">
                  {serviceLevels.map(level => (
                    <button
                      key={level.value}
                      onClick={() => toggleServiceLevel(level.value)}
                      className={`flex items-center gap-2 w-full px-4 py-2 rounded-full text-left ${
                        selectedServiceLevel.includes(level.value)
                          ? "bg-[#bf2c7e] text-white font-bold"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                      }`}
                    >
                      {selectedServiceLevel.includes(level.value) && <Check className="h-4 w-4" />}
                      {level.name}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Delivery Time</h4>
                <div className="space-y-2">
                  {deliveryTimes.map(time => (
                    <button
                      key={time.value}
                      onClick={() => toggleDeliveryTime(time.value)}
                      className={`flex items-center gap-2 w-full px-4 py-2 rounded-full text-left ${
                        selectedDeliveryTime.includes(time.value)
                          ? "bg-[#bf2c7e] text-white font-bold"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                      }`}
                    >
                      {selectedDeliveryTime.includes(time.value) && <Check className="h-4 w-4" />}
                      {time.name}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Categories</h4>
                <div className="grid grid-cols-2 gap-2">
                  {categories.slice(1).map(category => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                        setShowFilters(false);
                      }}
                      className={`px-4 py-2 rounded-full text-sm ${
                        selectedCategory === category
                          ? "bg-[#bf2c7e] text-white font-bold"
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

        {/* Services Grid *
        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {filteredServices.map((service) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all border border-gray-100 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    {/* Provider Info *
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <img
                          src={service.provider.avatar}
                          alt={service.provider.name}
                          className="w-20 h-20 rounded-full object-cover border-2 border-[#bf2c7e]"
                        />
                        {service.isProVerified && (
                          <div className="absolute -bottom-1 -right-1 bg-[#bf2c7e] text-white p-1 rounded-full">
                            <Award className="h-4 w-4" />
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Service Details *
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div>
                          <h3 className="text-xl font-bold mb-1">{service.title}</h3>
                          <p className="text-gray-600 mb-2">by {service.provider.name}</p>
                          

                          <div className="flex items-center gap-2 mb-4">
                            <div className="flex items-center gap-1 bg-[#bf2c7e]/10 px-2 py-1 rounded-full">
                              <Star className="text-[#bf2c7e] fill-[#bf2c7e]" size={16} />
                              <span className="font-medium text-gray-900">{service.provider.rating}</span>
                              <span className="text-gray-500 text-sm">({service.provider.projects} projects)</span>
                            </div>
                            

                            {service.isFeatured && (
                              <div className="flex items-center gap-1 bg-purple-100 px-2 py-1 rounded-full">
                                <Sparkles className="text-purple-600" size={14} />
                                <span className="text-purple-600 text-sm font-medium">Featured</span>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex-shrink-0 bg-gray-50 p-3 rounded-lg">
                          <p className="font-bold text-[#bf2c7e] text-lg">{service.price}</p>
                        </div>
                      </div>
                      

                      <p className="text-gray-700 mb-4">{service.description}</p>
                      

                      {/* Skills/Tags *
                      <div className="flex flex-wrap gap-2 mb-4">
                        {service.skills.map((skill, index) => (
                          <span key={index} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                            {skill}
                          </span>
                        ))}
                      </div>
                      

                      {/* Meta Info *
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Briefcase className="h-4 w-4" />
                          <span>{service.category}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>Delivery: {service.deliveryTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  

                  {/* Expandable Details *
                  <button
                    onClick={() => toggleService(service.id)}
                    className="w-full mt-6 flex justify-between items-center text-left"
                  >
                    <span className="text-sm font-medium text-[#bf2c7e]">
                      {activeService === service.id ? 'Hide details' : 'View service details'}
                    </span>
                    {activeService === service.id ? (
                      <ChevronUp className="text-[#bf2c7e]" />
                    ) : (
                      <ChevronDown className="text-[#bf2c7e]" />
                    )}
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      activeService === service.id ? "max-h-96 mt-4" : "max-h-0"
                    }`}
                  >
                    <div className="pt-4 border-t border-gray-100">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-bold mb-2">About This Service</h4>
                          <p className="text-gray-700">
                            {service.description} Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                          </p>
                        </div>
                        
                        <div>
                          <h4 className="font-bold mb-2">What's Included</h4>
                          <ul className="space-y-2 text-gray-700">
                            <li className="flex items-start gap-2">
                              <Check className="h-5 w-5 text-[#bf2c7e] flex-shrink-0" />
                              <span>Initial consultation to understand your needs</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <Check className="h-5 w-5 text-[#bf2c7e] flex-shrink-0" />
                              <span>Multiple concept presentations</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <Check className="h-5 w-5 text-[#bf2c7e] flex-shrink-0" />
                              <span>Unlimited revisions within scope</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <Check className="h-5 w-5 text-[#bf2c7e] flex-shrink-0" />
                              <span>Final delivery in multiple formats</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full mt-6 bg-[#bf2c7e] hover:bg-[#0f1c47] text-white font-bold py-3 rounded-lg"
                        onClick={() => handleContinueClick(service)}
                      >
                        Continue ({service.price.split('-')[0].replace('$', '')})
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
            <h3 className="text-xl font-bold text-gray-900 mb-2">No services found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All Categories");
                setSelectedServiceLevel([]);
                setSelectedDeliveryTime([]);
              }}
              className="px-6 py-3 bg-[#bf2c7e] hover:bg-[#0f1c47] text-white font-bold rounded-full"
            >
              Reset Filters
            </button>
          </motion.div>
        )}
      </section>

      {/* CTA Section *
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0f1c47] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Are you a skill provider?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join our exclusive network of premium professionals and connect with high-value clients
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-[#bf2c7e] text-white font-bold rounded-full"
            >
              Apply Now
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-black font-bold rounded-full transition-colors"
            >
              Learn More
            </motion.button>
          </div>
        </div>
      </section>*
      {/* CTA Section *
<section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0f1c47] text-white">
  <div className="max-w-4xl mx-auto text-center">
    <h2 className="text-3xl md:text-4xl font-bold mb-6">
      Are you a skill provider?
    </h2>
    <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
      Join our exclusive network of premium professionals and connect with high-value clients
    </p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleCreateShopClick}
        disabled={checking || authLoading}
        className="relative group bg-gradient-to-r from-[#bf2c7e] to-[#a02468] text-white px-6 py-4 sm:px-10 sm:py-5 rounded-full sm:rounded-xl text-base sm:text-lg font-medium hover:shadow-xl hover:shadow-[#bf2c7e]/30 transition-all duration-300 overflow-hidden disabled:opacity-50"
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          {checking ? (
            <span className="animate-spin">
              <FiPlusCircle className="w-5 h-5 sm:w-6 sm:h-6" />
            </span>
          ) : (
            <FiPlusCircle className="w-5 h-5 sm:w-6 sm:h-6" />
          )}
          Apply Now
        </span>
        <span className="absolute inset-0 bg-gradient-to-r from-[#a02468] to-[#bf2c7e] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        <span className="absolute top-0 left-0 w-10 h-full bg-white/30 -skew-x-12 -translate-x-16 group-hover:translate-x-[400%] transition-transform duration-700"></span>
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        className="px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-black font-bold rounded-full transition-colors"
      >
        Learn More
      </motion.button>
    </div>
  </div>
</section>


      {/* Inquiry Modal *
      <AnimatePresence>
        {isInquiryOpen && selectedService && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden"
            >
              {/* Modal Header *
              <div className="relative p-6 border-b border-gray-200">
                <button
                  onClick={() => setIsInquiryOpen(false)}
                  className="absolute top-6 left-6 text-gray-500 hover:text-gray-700"
                >
                  <ArrowLeft size={20} />
                </button>
                <div className="text-center px-8">
                  <h3 className="text-2xl font-bold mb-1">Inquire About {selectedService.title}</h3>
                  <p className="text-gray-600">Send a message to {selectedService.provider.name}</p>
                </div>
              </div>
              
              {/* Modal Body *
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row gap-8">
                  {/* Service Summary *
                  <div className="md:w-1/3 bg-gray-50 p-6 rounded-lg">
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={selectedService.provider.avatar}
                        alt={selectedService.provider.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-[#bf2c7e]"
                      />
                      <div>
                        <h4 className="font-bold">{selectedService.provider.name}</h4>
                        <div className="flex items-center gap-1">
                          <Star className="text-[#bf2c7e] fill-[#bf2c7e]" size={14} />
                          <span className="text-sm">{selectedService.provider.rating} ({selectedService.provider.projects} projects)</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-500">Service</p>
                        <p className="font-medium">{selectedService.title}</p>
                      </div>
                      

                      <div>
                        <p className="text-sm text-gray-500">Price Range</p>
                        <p className="font-medium text-[#bf2c7e]">{selectedService.price}</p>
                      </div>
                      

                      <div>
                        <p className="text-sm text-gray-500">Delivery Time</p>
                        <p className="font-medium">{selectedService.deliveryTime}</p>
                      </div>
                    </div>
                  </div>
                  

                  {/* Inquiry Form *
                  <div className="md:w-2/3">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Your Name
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            id="name"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bf2c7e] focus:border-[#bf2c7e]"
                            placeholder="John Doe"
                          />
                        </div>
                      </div>
                      

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="email"
                            id="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bf2c7e] focus:border-[#bf2c7e]"
                            placeholder="your@email.com"
                          />
                        </div>
                      </div>
                      

                      <div>
                        <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
                          Your Budget
                        </label>
                        <select
                          id="budget"
                          value={formData.budget}
                          onChange={(e) => setFormData({...formData, budget: e.target.value})}
                          className="block w-full pl-3 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bf2c7e] focus:border-[#bf2c7e]"
                        >
                          <option value={selectedService.price}>Within {selectedService.price} range</option>
                          <option value="<$500">Under $500</option>
                          <option value="$500-$1000">$500 - $1000</option>
                          <option value="$1000-$5000">$1000 - $5000</option>
                          <option value="Custom">Custom Budget</option>
                        </select>
                      </div>
                      

                      <div>
                        <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 mb-1">
                          Project Timeline
                        </label>
                        <select
                          id="timeline"
                          value={formData.timeline}
                          onChange={(e) => setFormData({...formData, timeline: e.target.value})}
                          className="block w-full pl-3 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bf2c7e] focus:border-[#bf2c7e]"
                        >
                          <option value={selectedService.deliveryTime}>Within {selectedService.deliveryTime}</option>
                          <option value="ASAP">ASAP</option>
                          <option value="1-2 weeks">1-2 weeks</option>
                          <option value="2-4 weeks">2-4 weeks</option>
                          <option value="Flexible">Flexible</option>
                        </select>
                      </div>
                      

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                          Your Message
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 pt-3 flex items-start pointer-events-none">
                            <MessageSquare className="h-5 w-5 text-gray-400" />
                          </div>
                          <textarea
                            id="message"
                            required
                            value={formData.message}
                            onChange={(e) => setFormData({...formData, message: e.target.value})}
                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bf2c7e] focus:border-[#bf2c7e] min-h-[120px]"
                            placeholder="Tell the provider about your project needs..."
                          />
                        </div>
                      </div>
                      

                      <div className="pt-2">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          type="submit"
                          className="w-full bg-[#bf2c7e] hover:bg-[#0f1c47] text-white font-bold py-3 rounded-lg"
                        >
                          Send Inquiry
                        </motion.button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}


              {/* Admin Prompt Modal *
      {showAdminPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-lg w-full max-w-md text-center">
            <div className="flex justify-end mb-2">
              <button
                onClick={() => setShowAdminPrompt(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>
            <div className="mb-4 text-[#bf2c7e]">
              <FiAlertCircle className="w-12 h-12 mx-auto" />
            </div>
            <h2 className="text-xl font-bold text-[#0f1c47] mb-4">Admin Restriction</h2>
            <p className="text-gray-700 mb-6">Administrators cannot create shops. Please use a seller or customer account.</p>
            <button
              className="px-6 py-3 bg-[#0f1c47] text-white rounded-md hover:bg-[#1a2d5a]"
              onClick={() => setShowAdminPrompt(false)}
            >
              Understood
            </button>
          </div>
        </div>
      )}

      {/* Membership Prompt Modal *
      {showMembershipPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-all duration-300">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="relative bg-gradient-to-br from-white to-gray-50 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-gray-100"
          >
            <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-[#bf2c7e]/10"></div>
            <div className="absolute -bottom-16 -left-16 w-32 h-32 rounded-full bg-[#0f1c47]/10"></div>

            <button
              onClick={() => setShowMembershipPrompt(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-gray-100 transition-colors duration-200"
            >
              <FiX className="w-5 h-5 text-gray-500" />
            </button>

            <div className="relative z-10 p-8 text-center">
              <div className="mx-auto flex items-center justify-center w-20 h-20 bg-gradient-to-r from-[#bf2c7e] to-[#d64285] rounded-full mb-6">
                <FiStar className="w-8 h-8 text-white" />
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Unlock Premium Features
              </h2>
              <p className="text-gray-500 mb-6">
                Upgrade to a seller membership and start selling today
              </p>

              <div className="space-y-3 mb-8 text-left">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                    <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Create your own shop</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                    <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Premium seller dashboard</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                    <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Priority customer support</span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 mb-8">
                <div className="flex justify-center items-baseline gap-2">
                  <span className="text-4xl font-bold text-gray-900">Ksh 500</span>
                  <span className="text-gray-500">/month</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">Cancel anytime</p>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={() => window.location.href = '/membership'}
                  className="w-full px-6 py-3.5 bg-gradient-to-r from-[#bf2c7e] to-[#d64285] text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  Upgrade Now
                </button>
                <button
                  onClick={() => setShowMembershipPrompt(false)}
                  className="w-full px-6 py-3 text-gray-600 font-medium rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  Maybe Later
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Pending Request Prompt Modal *
      {showPendingRequestPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-all duration-300">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="relative bg-gradient-to-br from-white to-gray-50 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-gray-100"
          >
            <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-[#bf2c7e]/10"></div>
            <div className="absolute -bottom-16 -left-16 w-32 h-32 rounded-full bg-[#0f1c47]/10"></div>
            
            <button
              onClick={() => setShowPendingRequestPrompt(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-gray-100 transition-colors duration-200"
            >
              <FiX className="w-5 h-5 text-gray-500" />
            </button>

            <div className="relative z-10 p-8 text-center">
              <div className="mx-auto flex items-center justify-center w-20 h-20 bg-yellow-100 rounded-full mb-6">
                <FiClock className="w-8 h-8 text-yellow-500" />
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Request Pending Approval
              </h2>
              <p className="text-gray-600 mb-6">
                Your seller membership request is currently being reviewed by our team.
              </p>
              
              <div className="bg-gray-50 rounded-xl p-4 mb-8">
                <p className="text-gray-700">
                  We'll notify you via email once your request has been processed.
                </p>
              </div>

              <button
                onClick={() => setShowPendingRequestPrompt(false)}
                className="w-full px-6 py-3 bg-[#0f1c47] text-white font-medium rounded-lg hover:bg-[#1a2d5a] transition-colors"
              >
                Understood
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Error Toast *
      {error && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-4 right-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg shadow-lg z-50 max-w-xs"
        >
          <div className="flex items-center">
            <FiAlertCircle className="w-5 h-5 mr-2" />
            <p>{error}</p>
          </div>
        </motion.div>
      )}
      </AnimatePresence>

      <LuxuryFooter />
    </div>
  );
};

export default ServicesPage;*/

// pages/ServicesPage.tsx
"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import NavbarTwo from "@/components/HeaderTwo";
import LuxuryFooter from "@/components/LuxuryFooter";
import ServicesHero from "@/components/services/ServicesHero";
import ServicesFilter from "@/components/services/ServicesFilter";
import ServiceCard from "@/components/services/ServiceCard";
import NoResults from "@/components/services/NoResults";
import BecomeProviderBanner from "@/components/services/BecomeProviderBanner";
import InquiryModal from "@/components/services/InquiryModal";
import { services, categories, serviceLevels, deliveryTimes } from "@/data/servicesData";
import { AdminPrompt, MembershipPrompt, PendingRequestPrompt, ErrorToast } from "@/components/services/Prompts";

interface ServicesPageProps {
  onOpenModal: () => void;
}

const ServicesPage = ({ onOpenModal }: ServicesPageProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedServiceLevel, setSelectedServiceLevel] = useState<string[]>([]);
  const [selectedDeliveryTime, setSelectedDeliveryTime] = useState<string[]>([]);
  const [activeService, setActiveService] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState<any | null>(null);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [checking, setChecking] = useState(false);
  const { user, isLoading: authLoading, refreshUser } = useAuth();
  const [error, setError] = useState('');
  const [showPendingRequestPrompt, setShowPendingRequestPrompt] = useState(false);
  const [showAdminPrompt, setShowAdminPrompt] = useState(false);
  const [showMembershipPrompt, setShowMembershipPrompt] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    budget: "",
    timeline: ""
  });

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

  const handleCreateShopClick = async () => {
    if (authLoading) return;
    
    setChecking(true);
    setError('');
    
    try {
      await refreshUser();

      if (!user) {
        console.log("User not logged in");
        onOpenModal();
        return;
      }

      const hasPendingRequest = await checkExistingRequest();
      if (hasPendingRequest) {
        setShowPendingRequestPrompt(true);
        return;
      }

      if (user.role === 'admin') {
        setShowAdminPrompt(true);
      } else if (user.role === 'customer' && !user.member) {
        setShowMembershipPrompt(true);
      } else {
        onOpenModal();
      }
    } catch (error) {
      console.error('Error checking user status:', error);
      setError('An error occurred while checking your status');
    } finally {
      setChecking(false);
    }
  };

  const toggleService = (id: number) => {
    setActiveService(activeService === id ? null : id);
  };

  const handleContinueClick = (service: any) => {
    setSelectedService(service);
    setIsInquiryOpen(true);
    setFormData(prev => ({
      ...prev,
      budget: service.price,
      timeline: service.deliveryTime
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Inquiry submitted:', formData);
setIsInquiryOpen(false);
setFormData({
name: "",
email: "",
message: "",
budget: "",
timeline: ""
});
alert('Your inquiry has been sent successfully!');
};

const resetFilters = () => {
setSearchQuery("");
setSelectedCategory("All Categories");
setSelectedServiceLevel([]);
setSelectedDeliveryTime([]);
};

const filteredServices = services.filter(service => {
const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
service.provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
service.description.toLowerCase().includes(searchQuery.toLowerCase());
const matchesCategory = selectedCategory === "All Categories" ||
service.category === selectedCategory;
const matchesServiceLevel = selectedServiceLevel.length === 0 ||
(service.price.includes("100") && selectedServiceLevel.includes("basic"));
const matchesDeliveryTime = selectedDeliveryTime.length === 0 ||
(service.deliveryTime.includes("7 days") && selectedDeliveryTime.includes("1week")) ||
(service.deliveryTime.includes("2 weeks") && selectedDeliveryTime.includes("2weeks"));

return matchesSearch && matchesCategory && matchesServiceLevel && matchesDeliveryTime;
});

return (
<div className="bg-white min-h-screen">
<NavbarTwo />

  <ServicesHero 
    handleCreateShopClick={handleCreateShopClick} 
    checking={checking} 
    authLoading={authLoading} 
  />

  <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
    <ServicesFilter
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
      selectedServiceLevel={selectedServiceLevel}
      setSelectedServiceLevel={setSelectedServiceLevel}
      selectedDeliveryTime={selectedDeliveryTime}
      setSelectedDeliveryTime={setSelectedDeliveryTime}
      categories={categories}
      serviceLevels={serviceLevels}
      deliveryTimes={deliveryTimes}
    />

    {/* Services Grid */}
    {filteredServices.length > 0 ? (
      <div className="grid grid-cols-1 gap-6">
        {filteredServices.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            activeService={activeService}
            toggleService={toggleService}
            handleContinueClick={handleContinueClick}
          />
        ))}
      </div>
    ) : (
      <NoResults resetFilters={resetFilters} />
    )}
  </section>

  <BecomeProviderBanner 
    handleCreateShopClick={handleCreateShopClick} 
    checking={checking} 
    authLoading={authLoading} 
  />

  <InquiryModal
    isOpen={isInquiryOpen}
    onClose={() => setIsInquiryOpen(false)}
    service={selectedService}
    formData={formData}
    setFormData={setFormData}
    onSubmit={handleSubmit}
  />

  {/* Prompt Modals */}
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

  <LuxuryFooter />
</div>
);
};

export default ServicesPage;

