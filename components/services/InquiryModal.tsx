// components/InquiryModal.tsx
/*import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, User, Mail, MessageSquare, Check, Star, Award, Briefcase, Clock } from "lucide-react";
import { useRef, useEffect } from "react";

interface Provider {
  name: string;
  avatar: string;
  rating: number;
  projects: number;
}

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: {
    id: number;
    title: string;
    provider: Provider;
    price: string;
    deliveryTime: string;
    description: string;
  };
  formData: {
    name: string;
    email: string;
    message: string;
    budget: string;
    timeline: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<{
    name: string;
    email: string;
    message: string;
    budget: string;
    timeline: string;
  }>>;
  onSubmit: (e: React.FormEvent) => void;
}

const InquiryModal = ({ isOpen, onClose, service, formData, setFormData, onSubmit }: InquiryModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
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
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ type: "spring", damping: 25 }}
          className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden"
        >
         
          <div className="relative p-6 border-b border-gray-200">
            <button
              onClick={onClose}
              className="absolute top-6 left-6 text-gray-500 hover:text-gray-700"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="text-center px-8">
              <h3 className="text-2xl font-bold mb-1">Inquire About {service.title}</h3>
              {/*<p className="text-gray-600">Send a message to {service.provider.name}</p>*
            </div>
          </div>
          
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-8">
         
              <div className="md:w-1/3 bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center gap-4 mb-4">
                 {/*} <img
                    src={service.provider.avatar}
                    alt={service.provider.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#bf2c7e]"
                  />*
                  <div>
                  
                    <div className="flex items-center gap-1">
                      <Star className="text-[#bf2c7e] fill-[#bf2c7e]" size={14} />
                      {/*<span className="text-sm">{service.provider.rating} ({service.provider.projects} projects)</span>*
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Service</p>
                    <p className="font-medium">{service.title}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Price Range</p>
                    <p className="font-medium text-[#bf2c7e]">{service.price}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Delivery Time</p>
                    <p className="font-medium">{service.deliveryTime}</p>
                  </div>
                </div>
              </div>
              
              
              <div className="md:w-2/3">
                <form onSubmit={onSubmit} className="space-y-4">
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
                      <option value={service.price}>Within {service.price} range</option>
                      <option value="<$500">Under ksh 500</option>
                      <option value="$500-$1000">ksh 500 - ksh 1000</option>
                      <option value="$1000-$5000">ksh 1000 - ksh 5000</option>
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
                      <option value={service.deliveryTime}>Within {service.deliveryTime}</option>
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
    </AnimatePresence>
  );
};

export default InquiryModal;*/

import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, User, Mail, MessageSquare, Check, Star, Award, Briefcase, Clock } from "lucide-react";
import { useRef, useEffect } from "react";

interface Provider {
  name: string;
  avatar: string;
  rating: number;
  projects: number;
}

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: {
    id: number;
    title: string;
    provider: Provider;
    price: string;
    deliveryTime: string;
    description: string;
  };
  formData: {
    name: string;
    email: string;
    message: string;
    budget: string;
    timeline: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<{
    name: string;
    email: string;
    message: string;
    budget: string;
    timeline: string;
  }>>;
  onSubmit: (e: React.FormEvent) => void;
}

const InquiryModal = ({ isOpen, onClose, service, formData, setFormData, onSubmit }: InquiryModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
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
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ type: "spring", damping: 25 }}
          className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-auto md:overflow-hidden"
          style={{
            maxHeight: '100vh', // Ensure the modal doesn't exceed the viewport height
          }}
        >
          {/* Modal Header */}
          <div className="relative p-6 border-b border-gray-200">
            <button
              onClick={onClose}
              className="absolute top-6 left-6 text-gray-500 hover:text-gray-700"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="text-center px-8">
              <h3 className="text-2xl font-bold mb-1">Inquire About {service.title}</h3>
              {/*<p className="text-gray-600">Send a message to {service.provider.name}</p>*/}
            </div>
          </div>
          
          {/* Modal Body */}
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Service Summary */}
              <div className="md:w-1/3 bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center gap-4 mb-4">
                 {/*} <img
                    src={service.provider.avatar}
                    alt={service.provider.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#bf2c7e]"
                  />*/}
                                    <div>
                    {/*<h4 className="font-bold">{service.provider.name}</h4>*/}
                    <div className="flex items-center gap-1">
                      <Star className="text-[#bf2c7e] fill-[#bf2c7e]" size={14} />
                      {/*<span className="text-sm">{service.provider.rating} ({service.provider.projects} projects)</span>*/}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Service</p>
                    <p className="font-medium">{service.title}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Price Range</p>
                    <p className="font-medium text-[#bf2c7e]">{service.price}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Delivery Time</p>
                    <p className="font-medium">{service.deliveryTime}</p>
                  </div>
                </div>
              </div>
              
              {/* Inquiry Form */}
              <div className="md:w-2/3">
                <form onSubmit={onSubmit} className="space-y-4">
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
                      <option value={service.price}>Within {service.price} range</option>
                      <option value="<$500">Under ksh 500</option>
                      <option value="$500-$1000">ksh 500 - ksh 1000</option>
                      <option value="$1000-$5000">ksh 1000 - ksh 5000</option>
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
                      <option value={service.deliveryTime}>Within {service.deliveryTime}</option>
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
    </AnimatePresence>
  );
};

export default InquiryModal;