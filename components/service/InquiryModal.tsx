import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ArrowLeft, User, Mail, MessageSquare, Star } from "lucide-react";

// Define the Service type if not already imported
interface Service {
  title: string;
  price: string;
  deliveryTime: string;
  provider: {
    name: string;
    avatar: string;
    rating: number;
    projects: number;
  };
}

interface InquiryModalProps {
  isOpen: boolean;
  service: Service | null;
  onClose: () => void;
}

const InquiryModal: React.FC<InquiryModalProps> = ({ isOpen, service, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    budget: "",
    timeline: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Inquiry submitted:', formData);
    onClose();
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
    <AnimatePresence>
      {isOpen && service && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div
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
                <p className="text-gray-600">Send a message to {service.provider.name}</p>
              </div>
            </div>
            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3 bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={service.provider.avatar}
                      alt={service.provider.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-[#f4b500]"
                    />
                    <div>
                      <h4 className="font-bold">{service.provider.name}</h4>
                      <div className="flex items-center gap-1">
                        <Star className="text-[#f4b500] fill-[#f4b500]" size={14} />
                        <span className="text-sm">{service.provider.rating} ({service.provider.projects} projects)</span>
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
                      <p className="font-medium text-[#f4b500]">{service.price}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Delivery Time</p>
                      <p className="font-medium">{service.deliveryTime}</p>
                    </div>
                  </div>
                </div>
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
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f4b500] focus:border-[#f4b500]"
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
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f4b500] focus:border-[#f4b500]"
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
                        className="block w-full pl-3 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f4b500] focus:border-[#f4b500]"
                      >
                        <option value={service.price}>Within {service.price} range</option>
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
                        className="block w-full pl-3 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f4b500] focus:border-[#f4b500]"
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
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f4b500] focus:border-[#f4b500] min-h-[120px]"
                          placeholder="Tell the provider about your project needs..."
                        />
                      </div>
                    </div>
                    <div className="pt-2">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="w-full bg-[#f4b500] hover:bg-[#d4a017] text-black font-bold py-3 rounded-lg"
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
    </AnimatePresence>
  );
};

export default InquiryModal;