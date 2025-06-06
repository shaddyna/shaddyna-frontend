import { motion } from "framer-motion";
import { Star, Briefcase, Clock, Check, ChevronDown, ChevronUp, Sparkles, Award, User } from "lucide-react";
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
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-100 overflow-hidden"
    >
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          {/* Provider Info */}
          <div className="flex-shrink-0 flex sm:block">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-purple-100 flex items-center justify-center">
              <User className="text-[#bf2c7e] w-8 h-8 sm:w-10 sm:h-10" />
              {/* {service.user?.proVerified && (
                <div className="absolute -bottom-1 -right-1 bg-purple-600 text-white p-1 rounded-full">
                  <Award className="h-3 w-3 sm:h-4 sm:w-4" />
                </div>
              )} */}
            </div>
          </div>
          
          {/* Service Details */}
          <div className="flex-1 space-y-3 sm:space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
              <div className="space-y-1 sm:space-y-2">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800">{service.title}</h3>
                {/* <p className="text-sm text-gray-600">
                  by {service.user?.firstName} {service.user?.lastName}
                </p> */}
                
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
                  )} */}
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

export default ServiceCard;