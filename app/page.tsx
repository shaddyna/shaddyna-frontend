
/*import Navbar from '@/components/Header';
import LuxuryFooter from '@/components/LuxuryFooter';
import Link from 'next/link';

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

type Skill = {
  _id: string;
  title: string;
  description: string;
  price: number;
  deliveryTime: string;
  category: string;
  skills: string[];
  images: string[];
  averageRating?: number;
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






export default async function Home() {
  const [shops, skills,] = await Promise.all([
    getShops(),
    getSkills(),
  
  ]);

  return (
    <>
     <Navbar />
    <div className="min-h-screen bg-white">
     
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
              <div
                key={skill._id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={skill.images?.[0] || '/placeholder-skill.jpg'}
                    alt={skill.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-[#0f1c47]">
                      {skill.title}
                    </h3>
                    <span className="bg-[#bf2c7e] text-white text-xs px-2 py-1 rounded-full">
                      {skill.category}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {skill.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-lg font-bold text-[#0f1c47]">
                        Ksh {skill.price}
                      </span>
                      <span className="text-sm text-gray-500 ml-2">
                        • {skill.deliveryTime}
                      </span>
                    </div>
                    {skill.averageRating && (
                      <div className="flex items-center">
                        <span className="text-yellow-500">★</span>
                        <span className="ml-1 text-sm text-gray-600">
                          {skill.averageRating.toFixed(1)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
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
     <LuxuryFooter />
    </>
  );
}*/
"use client"
import { motion } from "framer-motion";
import { Star, Briefcase, Clock, Check, ChevronDown, ChevronUp, Sparkles, Award } from "lucide-react";
import { useState, useEffect } from "react";
import { Skill } from "@/types/skill";
import Navbar from '@/components/Header';
import LuxuryFooter from '@/components/LuxuryFooter';
import Link from 'next/link';
import InquiryModal from "@/components/services/InquiryModal";

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
   const [selectedService, setSelectedService] = useState<any | null>(null);

  // Format price for display
  const formattedPrice = service.price ? `Ksh ${service.price}` : 'Contact for price';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all border border-gray-100 overflow-hidden"
    >
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-start gap-6">
          {/* Provider Info */}
          <div className="flex-shrink-0">
            <div className="relative">
              {/*<img
                src={service.user?.avatar || '/default-avatar.png'}
                alt={service.user?.firstName}
                className="w-20 h-20 rounded-full object-cover border-2 border-[#bf2c7e]"
              />*/}

              {/* Assuming proVerified is a user property *
              {service.user?.proVerified && (
                <div className="absolute -bottom-1 -right-1 bg-[#bf2c7e] text-white p-1 rounded-full">
                  <Award className="h-4 w-4" />
                </div>
              )}*/}
            </div>
          </div>
          
          {/* Service Details */}
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold mb-1">{service.title}</h3>
                {/*<p className="text-gray-600 mb-2">
                  by {service.user?.firstName} {service.user?.lastName}
                </p>*/}
                
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1 bg-[#bf2c7e]/10 px-2 py-1 rounded-full">
                    <Star className="text-[#bf2c7e] fill-[#bf2c7e]" size={16} />
                    <span className="font-medium text-gray-900">
                      {service.averageRating || 'New'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex-shrink-0 bg-gray-50 p-3 rounded-lg">
                <p className="font-bold text-[#bf2c7e] text-lg">{formattedPrice}</p>
              </div>
            </div>
            
            <p className="text-gray-700 mb-4">{service.description}</p>
            
            {/* Skills/Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {service.skills.map((skill, index) => (
                <span key={index} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
            
            {/* Meta Info */}
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
        
        {/* Expandable Details */}
        <button
          onClick={() => toggleService(service._id)}
          className="w-full mt-6 flex justify-between items-center text-left"
        >
          <span className="text-sm font-medium text-[#bf2c7e]">
            {activeService === service._id ? 'Hide details' : 'View service details'}
          </span>
          {activeService === service._id ? (
            <ChevronUp className="text-[#bf2c7e]" />
          ) : (
            <ChevronDown className="text-[#bf2c7e]" />
          )}
        </button>

        <div
          className={`overflow-hidden transition-all duration-300 ${
            activeService === service._id ? "max-h-96 mt-4" : "max-h-0"
          }`}
        >
          <div className="pt-4 border-t border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold mb-2">About This Service</h4>
                <p className="text-gray-700">
                  {service.about}
                </p>
              </div>
              
              <div>
                <h4 className="font-bold mb-2">What's Included</h4>
                <ul className="space-y-2 text-gray-700">
                  {service.inclusions.map((inclusion, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-[#bf2c7e] flex-shrink-0" />
                      <span>{inclusion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full mt-6 bg-[#bf2c7e] hover:bg-[#0f1c47] text-white font-bold py-3 rounded-lg"
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
  };*/

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
      <Navbar />
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
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
      
      <LuxuryFooter />
    </>
  );
}