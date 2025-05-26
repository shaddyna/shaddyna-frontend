// components/ServiceCard.tsx
/*import { motion } from "framer-motion";
import { Star, Briefcase, Clock, Check, ChevronDown, ChevronUp, Sparkles, Award } from "lucide-react";
import { useState } from "react";

interface Provider {
  name: string;
  avatar: string;
  rating: number;
  projects: number;
}

interface ServiceCardProps {
  service: {
    id: number;
    title: string;
    provider: Provider;
    category: string;
    skills: string[];
    price: string;
    deliveryTime: string;
    description: string;
    isFeatured: boolean;
    isProVerified: boolean;
  };
  activeService: number | null;
  toggleService: (id: number) => void;
  handleContinueClick: (service: any) => void;
}

const ServiceCard = ({ service, activeService, toggleService, handleContinueClick }: ServiceCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
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
  );
};

export default ServiceCard;*/

import { motion } from "framer-motion";
import { Star, Briefcase, Clock, Check, ChevronDown, ChevronUp, Sparkles, Award } from "lucide-react";
import { useState } from "react";
import { Skill } from "@/types/skill";

interface ServiceCardProps {
  service: Skill;
  activeService: string | null;
  toggleService: (id: string) => void;
  handleContinueClick: (service: Skill) => void;
}

const ServiceCard = ({ service, activeService, toggleService, handleContinueClick }: ServiceCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

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
                    {/* Projects count would need to be added to the Skill model */}
                  </div>
                  
                  {/* Featured would need to be a property on the Skill model *
                  {service.isFeatured && (
                    <div className="flex items-center gap-1 bg-purple-100 px-2 py-1 rounded-full">
                      <Sparkles className="text-purple-600" size={14} />
                      <span className="text-purple-600 text-sm font-medium">Featured</span>
                    </div>
                  )}*/}
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
        
        {/* Expandable Details *
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
        </button>*/}

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

export default ServiceCard;