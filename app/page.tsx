
/*"use client"
import { motion } from "framer-motion";
import { Star, Briefcase, Clock, Check, ChevronDown, ChevronUp, User } from "lucide-react";
import { useState, useEffect } from "react";
import { Skill } from "@/types/skill";
import Navbar from '@/components/Header';
import LuxuryFooter from '@/components/LuxuryFooter';
import Link from 'next/link';
import InquiryModal from "@/components/services/InquiryModal";
import StickyBottomNavbar from "@/components/BottomNav";

type Shop = {
  _id: string;
  name: string;
  description: string;
  location: string;
  categories: string[];
  image: string;
  contact: {
    email: string;
    phone?: string;
  };
  createdAt: string;
};

type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  createdAt: string;
};

async function getShops(): Promise<Shop[]> {
  try {
    const res = await fetch('https://shaddynab-new.onrender.com/api/shops');
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    console.log('✅ Shops fetch successful:', data);
    return data.data; // ✅ Return only the array of shops
  } catch (error) {
    console.error('❌ Failed to fetch shops:', error);
    return [];
  }
}

async function getSkills(): Promise<Skill[]> {
  try {
    const res = await fetch('https://shaddynab-new.onrender.com/api/skills');
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    console.log('✅ Skills fetch successful:', data);
    return data.data; // ✅ Return only the array of skills
  } catch (error) {
    console.error('❌ Failed to fetch skills:', error);
    return [];
  }
}

type ServiceCardProps = {
  service: Skill;
  activeService: string | null;
  toggleService: (id: string) => void;
  handleContinueClick: (service: Skill) => void;
};

const ServiceCard = ({ service, activeService, toggleService, handleContinueClick }: ServiceCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Format price for display
  const formattedPrice = service.price ? `Ksh ${service.price}` : 'Contact for price';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-100 overflow-hidden"
    >
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
        
          <div className="flex-shrink-0 flex sm:block">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-purple-100 flex items-center justify-center">
              <User className="text-[#bf2c7e] w-8 h-8 sm:w-10 sm:h-10" />
              {/* {service.user?.proVerified && (
                <div className="absolute -bottom-1 -right-1 bg-purple-600 text-white p-1 rounded-full">
                  <Award className="h-3 w-3 sm:h-4 sm:w-4" />
                </div>
              )} *
            </div>
          </div>
          
     
          <div className="flex-1 space-y-3 sm:space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
              <div className="space-y-1 sm:space-y-2">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800">{service.title}</h3>
                {/* <p className="text-sm text-gray-600">
                  by {service.user?.firstName} {service.user?.lastName}
                </p> *
                
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full">
                    <Star className="text-yellow-400 fill-yellow-400" size={14} />
                    <span className="text-xs sm:text-sm font-medium text-gray-800">
                      {service.averageRating || 'New'}
                    </span>
                  </div>
                  
                  {/* {service.isFeatured && (
                    <div className="flex items-center gap-1 bg-purple-50 px-2 py-1 rounded-full">
                      <Sparkles className="text-purple-500" size={12} />
                      <span className="text-xs text-purple-600 font-medium">Featured</span>
                    </div>
                  )} *
                </div>
              </div>
              
              <div className="flex-shrink-0 bg-gray-50 p-2 sm:p-3 rounded-lg">
                <p className="font-bold text-[#bf2c7e] text-base sm:text-lg">{formattedPrice}</p>
              </div>
            </div>
            
            <p className="text-sm sm:text-base text-gray-600 line-clamp-2">{service.description}</p>
            
      
            <div className="flex flex-wrap gap-2">
              {service.skills.map((skill, index) => (
                <span key={index} className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs sm:text-sm">
                  {skill}
                </span>
              ))}
            </div>
            
    
            <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Briefcase className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>{service.category}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>Delivery: {service.deliveryTime}</span>
              </div>
            </div>
          </div>
        </div>
        

        <button
          onClick={() => toggleService(service._id)}
          className="w-full mt-4 sm:mt-6 flex justify-between items-center text-left"
          aria-expanded={activeService === service._id}
        >
          <span className="text-xs sm:text-sm font-medium text-[#bf2c7e]">
            {activeService === service._id ? 'Hide details' : 'View service details'}
          </span>
          {activeService === service._id ? (
            <ChevronUp className="text-[#bf2c7e] h-4 w-4 sm:h-5 sm:w-5" />
          ) : (
            <ChevronDown className="text-[#bf2c7e] h-4 w-4 sm:h-5 sm:w-5" />
          )}
        </button>

        <div
          className={`overflow-auto transition-all duration-300 ${
            activeService === service._id ? "max-h-[500px] mt-4" : "max-h-0"
          }`}
        >
          <div className="pt-4 border-t border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-2">
                <h4 className="text-sm sm:text-base font-bold text-gray-800">About This Service</h4>
                <p className="text-xs sm:text-sm text-gray-600">
                  {service.about}
                </p>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-sm sm:text-base font-bold text-gray-800">What's Included</h4>
                <ul className="space-y-2 text-xs sm:text-sm text-gray-600">
                  {service.inclusions.map((inclusion, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-[#bf2c7e] flex-shrink-0 mt-0.5" />
                      <span>{inclusion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full mt-4 sm:mt-6 bg-[#bf2c7e] hover:bg-[#bf2c7e] text-white font-medium py-2.5 sm:py-3 rounded-lg transition-colors text-sm sm:text-base"
              onClick={() => handleContinueClick(service)}
            >
              Continue ({formattedPrice})
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
export default function Home() {
  const [shops, setShops] = useState<Shop[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [activeService, setActiveService] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<any | null>(null);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    budget: "",
    timeline: ""
  });


  useEffect(() => {
    const fetchShops = async () => {
      const shopsData = await getShops();
      setShops(shopsData);
    };

    const fetchSkills = async () => {
      const skillsData = await getSkills();
      setSkills(skillsData);
    };

    fetchShops();
    fetchSkills();
  }, []);

  const toggleService = (id: string) => {
    setActiveService((prev) => (prev === id ? null : id));
  };

  /*const handleContinueClick = (service: Skill) => {
    console.log(`Continue clicked for service: ${service.title}`);
    // Handle continue logic here
  };*

   const handleContinueClick = (service: any) => {
    setSelectedService(service);
    setIsInquiryOpen(true);
    setFormData(prev => ({
      ...prev,
      budget: service.price ? `$${service.price}` : 'Custom',
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

  return (
    <>
      <div className="min-h-screen bg-white">
        
      <Navbar />
     
        <section className="relative bg-gradient-to-r from-[#0f1c47] to-[#bf2c7e] text-white py-20 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Discover Amazing Shops & Skills
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Find unique products and professional services tailored just for you
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#shops"
                className="bg-[#bf2c7e] hover:bg-[#a8246b] text-white font-bold py-3 px-6 rounded-full transition duration-300"
              >
                Browse Shops
              </Link>
              <Link
                href="#skills"
                className="bg-white hover:bg-gray-100 text-[#0f1c47] font-bold py-3 px-6 rounded-full transition duration-300"
              >
                Explore Skills
              </Link>
            </div>
          </div>
        </section>

        <section id="shops" className="py-16 px-4 max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-[#0f1c47]">Featured Shops</h2>
            <Link
              href="/shops"
              className="text-[#bf2c7e] hover:text-[#a8246b] font-semibold"
            >
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {shops.slice(0, 6).map((shop) => (
              <div
                key={shop._id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={shop.image || '/placeholder-shop.jpg'}
                    alt={shop.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-[#0f1c47]">{shop.name}</h3>
                    <span className="bg-[#bf2c7e] text-white text-xs px-2 py-1 rounded-full">
                      {shop.categories[0]}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-2">{shop.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      {shop.location}
                    </span>
                    <Link
                      href={`/shops/${shop._id}`}
                      className="text-[#bf2c7e] hover:text-[#a8246b] text-sm font-semibold"
                    >
                      Visit Shop →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="skills" className="py-16 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-3xl font-bold text-[#0f1c47]">Popular Skills</h2>
              <Link
                href="/hub"
                className="text-[#bf2c7e] hover:text-[#a8246b] font-semibold"
              >
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {skills.slice(0, 6).map((skill) => (
                <ServiceCard
                  key={skill._id}
                  service={skill}
                  activeService={activeService}
                  toggleService={toggleService}
                  handleContinueClick={handleContinueClick}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-4 bg-[#0f1c47] text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to find what you need?
            </h2>
            <p className="text-xl mb-8">
              Join thousands of happy customers discovering amazing products and
              services every day.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/auth/register"
                className="bg-[#bf2c7e] hover:bg-[#a8246b] text-white font-bold py-3 px-8 rounded-full transition duration-300"
              >
                Sign Up Now
              </Link>
              <Link
                href=""
                className="bg-transparent hover:bg-white/10 text-white font-bold py-3 px-8 rounded-full border border-white transition duration-300"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>
      </div>
      <InquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
        service={selectedService}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
      />
   <StickyBottomNavbar />
      <LuxuryFooter />
    </>
  );
}*/

"use client"
import { motion } from "framer-motion";
import { Star, Briefcase, Clock, Check, ChevronDown, ChevronUp, User } from "lucide-react";
import { useState, useEffect } from "react";
import { Skill } from "@/types/skill";
import Navbar from '@/components/Header';
import LuxuryFooter from '@/components/LuxuryFooter';
import Link from 'next/link';
import InquiryModal from "@/components/services/InquiryModal";
import StickyBottomNavbar from "@/components/BottomNav";

type Shop = {
  _id: string;
  name: string;
  description: string;
  location: string;
  categories: string[];
  image: string;
  contact: {
    email: string;
    phone?: string;
  };
  createdAt: string;
};

type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  createdAt: string;
};

async function getShops(): Promise<Shop[]> {
  try {
    const res = await fetch('https://shaddynab-new.onrender.com/api/shops');
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    console.log('✅ Shops fetch successful:', data);
    return data.data; // ✅ Return only the array of shops
  } catch (error) {
    console.error('❌ Failed to fetch shops:', error);
    return [];
  }
}

async function getSkills(): Promise<Skill[]> {
  try {
    const res = await fetch('https://shaddynab-new.onrender.com/api/skills');
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    console.log('✅ Skills fetch successful:', data);
    return data.data; // ✅ Return only the array of skills
  } catch (error) {
    console.error('❌ Failed to fetch skills:', error);
    return [];
  }
}

type ServiceCardProps = {
  service: Skill;
  activeService: string | null;
  toggleService: (id: string) => void;
  handleContinueClick: (service: Skill) => void;
};

const ServiceCard = ({ service, activeService, toggleService, handleContinueClick }: ServiceCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Format price for display
  const formattedPrice = service.price ? `Ksh ${service.price}` : 'Contact for price';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-100 overflow-hidden"
    >
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          {/* Provider Info */}
          <div className="flex-shrink-0 flex sm:block">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-purple-100 flex items-center justify-center">
              <User className="text-[#bf2c7e] w-8 h-8 sm:w-10 sm:h-10" />
            </div>
          </div>
          
          {/* Service Details */}
          <div className="flex-1 space-y-3 sm:space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
              <div className="space-y-1 sm:space-y-2">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800">{service.title}</h3>
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full">
                    <Star className="text-yellow-400 fill-yellow-400" size={14} />
                    <span className="text-xs sm:text-sm font-medium text-gray-800">
                      {service.averageRating || 'New'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex-shrink-0 bg-gray-50 p-2 sm:p-3 rounded-lg">
                <p className="font-bold text-[#bf2c7e] text-base sm:text-lg">{formattedPrice}</p>
              </div>
            </div>
            
            <p className="text-sm sm:text-base text-gray-600 line-clamp-2">{service.description}</p>
            
            {/* Skills/Tags */}
            <div className="flex flex-wrap gap-2">
              {service.skills.map((skill, index) => (
                <span key={index} className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs sm:text-sm">
                  {skill}
                </span>
              ))}
            </div>
            
            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Briefcase className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>{service.category}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>Delivery: {service.deliveryTime}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Expandable Details */}
        <button
          onClick={() => toggleService(service._id)}
          className="w-full mt-4 sm:mt-6 flex justify-between items-center text-left"
          aria-expanded={activeService === service._id}
        >
          <span className="text-xs sm:text-sm font-medium text-[#bf2c7e]">
            {activeService === service._id ? 'Hide details' : 'View service details'}
          </span>
          {activeService === service._id ? (
            <ChevronUp className="text-[#bf2c7e] h-4 w-4 sm:h-5 sm:w-5" />
          ) : (
            <ChevronDown className="text-[#bf2c7e] h-4 w-4 sm:h-5 sm:w-5" />
          )}
        </button>

        <div
          className={`overflow-auto transition-all duration-300 ${
            activeService === service._id ? "max-h-[500px] mt-4" : "max-h-0"
          }`}
        >
          <div className="pt-4 border-t border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-2">
                <h4 className="text-sm sm:text-base font-bold text-gray-800">About This Service</h4>
                <p className="text-xs sm:text-sm text-gray-600">
                  {service.about}
                </p>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-sm sm:text-base font-bold text-gray-800">What's Included</h4>
                <ul className="space-y-2 text-xs sm:text-sm text-gray-600">
                  {service.inclusions.map((inclusion, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-[#bf2c7e] flex-shrink-0 mt-0.5" />
                      <span>{inclusion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full mt-4 sm:mt-6 bg-[#bf2c7e] hover:bg-[#bf2c7e] text-white font-medium py-2.5 sm:py-3 rounded-lg transition-colors text-sm sm:text-base"
              onClick={() => handleContinueClick(service)}
            >
              Continue ({formattedPrice})
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function Home() {
  const [shops, setShops] = useState<Shop[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [activeService, setActiveService] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<any | null>(null);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    budget: "",
    timeline: ""
  });
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchShops = async () => {
      const shopsData = await getShops();
      setShops(shopsData);
    };

    const fetchSkills = async () => {
      const skillsData = await getSkills();
      setSkills(skillsData);
    };

    fetchShops();
    fetchSkills();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === 2 ? 0 : prev + 1));
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const toggleService = (id: string) => {
    setActiveService((prev) => (prev === id ? null : id));
  };

  const handleContinueClick = (service: any) => {
    setSelectedService(service);
    setIsInquiryOpen(true);
    setFormData(prev => (    {
      ...prev,
      budget: service.price ? `Ksh ${service.price}` : 'Custom',
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

  return (
    <>
      <div className="min-h-screen bg-white">
        <Navbar />
        
        {/* Hero Carousel Section */}
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
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                >
                  <img
                    src={slide.image}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            
            {/* Carousel Indicators */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
              {[0, 1, 2].map((index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-white w-6' : 'bg-white/50'}`}
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

        {/* Featured Shops */}
        <section id="shops" className="py-16 px-4 max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-[#0f1c47]">Featured Shops</h2>
            <Link
              href="/shops"
              className="text-[#bf2c7e] hover:text-[#a8246b] font-semibold"
            >
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {shops.slice(0, 6).map((shop) => (
              <div
                key={shop._id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={shop.image || '/placeholder-shop.jpg'}
                    alt={shop.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-[#0f1c47]">{shop.name}</h3>
                    <span className="bg-[#bf2c7e] text-white text-xs px-2 py-1 rounded-full">
                      {shop.categories[0]}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-2">{shop.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      {shop.location}
                    </span>
                    <Link
                      href={`/shops/${shop._id}`}
                      className="text-[#bf2c7e] hover:text-[#a8246b] text-sm font-semibold"
                    >
                      Visit Shop →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Popular Skills */}
        <section id="skills" className="py-16 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-3xl font-bold text-[#0f1c47]">Popular Skills</h2>
              <Link
                href="/hub"
                className="text-[#bf2c7e] hover:text-[#a8246b] font-semibold"
              >
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {skills.slice(0, 6).map((skill) => (
                <ServiceCard
                  key={skill._id}
                  service={skill}
                  activeService={activeService}
                  toggleService={toggleService}
                  handleContinueClick={handleContinueClick}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-[#0f1c47] text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to find what you need?
            </h2>
            <p className="text-xl mb-8">
              Join thousands of happy customers discovering amazing products and
              services every day.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/auth/register"
                className="bg-[#bf2c7e] hover:bg-[#a8246b] text-white font-bold py-3 px-8 rounded-full transition duration-300"
              >
                Sign Up Now
              </Link>
              <Link
                href=""
                className="bg-transparent hover:bg-white/10 text-white font-bold py-3 px-8 rounded-full border border-white transition duration-300"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>
      </div>
      <InquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
        service={selectedService}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
      />
      <StickyBottomNavbar />
      <LuxuryFooter />
    </>
  );
}