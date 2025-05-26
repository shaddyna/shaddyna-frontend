import { motion } from "framer-motion";
import { useCheckoutStore } from "@/stores/checkoutStore";
import { ArrowRight } from "lucide-react";
import { Truck, Zap } from "lucide-react";

const deliveryOptions = [
  {
    id: "standard",
    name: "Standard Delivery",
    price: 0,
    time: "3-5 business days",
    icon: <Truck size={20} className="text-[#0f1c47]" />,
  },
  {
    id: "express",
    name: "Express Delivery",
    price: 9.99,
    time: "2-3 business days",
    icon: <Zap size={20} className="text-yellow-500" />,
  },
  {
    id: "priority",
    name: "Priority Delivery",
    price: 19.99,
    time: "1-2 business days",
    icon: <Zap size={20} className="text-[#bf2c7e]" />,
  },
];

interface ShippingFormProps {
  onSubmit: () => void;
}

export const ShippingForm = ({ onSubmit }: ShippingFormProps) => {
  const { shippingInfo, deliveryMethod, setShippingInfo, setDeliveryMethod } = useCheckoutStore();

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-[#0f1c47] mb-6">Shipping Information</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-[#0f1c47] mb-1">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            required
            value={shippingInfo.firstName}
            onChange={(e) => setShippingInfo({ firstName: e.target.value })}
            className="w-full px-4 py-3 border border-[#bf2c7e] rounded-lg focus:ring-2 focus:ring-[#bf2c7e] focus:border-[#bf2c7e] transition-all"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-[#0f1c47] mb-1">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            required
            value={shippingInfo.lastName}
            onChange={(e) => setShippingInfo({ lastName: e.target.value })}
            className="w-full px-4 py-3 border border-[#bf2c7e] rounded-lg focus:ring-2 focus:ring-[#bf2c7e] focus:border-[#bf2c7e] transition-all"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-[#0f1c47] mb-1">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          required
          value={shippingInfo.email}
          onChange={(e) => setShippingInfo({ email: e.target.value })}
          className="w-full px-4 py-3 border border-[#bf2c7e] rounded-lg focus:ring-2 focus:ring-[#bf2c7e] focus:border-[#bf2c7e] transition-all"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-[#0f1c47] mb-1">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          required
          value={shippingInfo.phone}
          onChange={(e) => setShippingInfo({ phone: e.target.value })}
          className="w-full px-4 py-3 border border-[#bf2c7e] rounded-lg focus:ring-2 focus:ring-[#bf2c7e] focus:border-[#bf2c7e] transition-all"
        />
      </div>

      <div>
        <label htmlFor="address" className="block text-sm font-medium text-[#0f1c47] mb-1">
          Street Address
        </label>
        <input
          type="text"
          id="address"
          required
          value={shippingInfo.address}
          onChange={(e) => setShippingInfo({ address: e.target.value })}
          className="w-full px-4 py-3 border border-[#bf2c7e] rounded-lg focus:ring-2 focus:ring-[#bf2c7e] focus:border-[#bf2c7e] transition-all"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-[#0f1c47] mb-1">
            City
          </label>
          <input
            type="text"
            id="city"
            required
            value={shippingInfo.city}
            onChange={(e) => setShippingInfo({ city: e.target.value })}
            className="w-full px-4 py-3 border border-[#bf2c7e] rounded-lg focus:ring-2 focus:ring-[#bf2c7e] focus:border-[#bf2c7e] transition-all"
          />
        </div>
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-[#0f1c47] mb-1">
            Country
          </label>
          <select
            id="country"
            required
            value={shippingInfo.country}
            onChange={(e) => setShippingInfo({ country: e.target.value })}
            className="w-full px-4 py-3 border border-[#bf2c7e] rounded-lg focus:ring-2 focus:ring-[#bf2c7e] focus:border-[#bf2c7e] transition-all"
          >
            <option value="">Select Country</option>
            <option value="US">United States</option>
            <option value="UK">United Kingdom</option>
            <option value="CA">Canada</option>
            <option value="AU">Australia</option>
            <option value="KE">Kenya</option>
          </select>
        </div>
        <div>
          <label htmlFor="postalCode" className="block text-sm font-medium text-[#0f1c47] mb-1">
            Postal Code
          </label>
          <input
            type="text"
            id="postalCode"
            required
            value={shippingInfo.postalCode}
            onChange={(e) => setShippingInfo({ postalCode: e.target.value })}
            className="w-full px-4 py-3 border border-[#bf2c7e] rounded-lg focus:ring-2 focus:ring-[#bf2c7e] focus:border-[#bf2c7e] transition-all"
          />
        </div>
      </div>

      <div className="pt-6">
        <h3 className="text-lg font-medium text-[#0f1c47] mb-4">Delivery Method</h3>
        <div className="space-y-4">
          {deliveryOptions.map((option) => (
            <div
              key={option.id}
              onClick={() => setDeliveryMethod(option.id as any)}
              className={`p-4 border rounded-lg cursor-pointer transition-all ${
                deliveryMethod === option.id
                  ? "border-[#bf2c7e] bg-[#bf2c7e]/10"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-white rounded-full shadow-sm">
                    {option.icon}
                  </div>
                  <div>
                    <h4 className="font-medium text-[#0f1c47]">{option.name}</h4>
                    <p className="text-sm text-[#0f1c47]">{option.time}</p>
                  </div>
                </div>
                <span className="font-medium text-[#0f1c47]">
                  {option.price === 0 ? "Free" : `Ksh ${option.price}`}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-6">
        <button
          type="button"
          onClick={onSubmit}
          disabled={!deliveryMethod}
          className="w-full bg-[#bf2c7e] text-white font-bold py-3 px-6 rounded-full transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          Continue to Payment <ArrowRight size={18} />
        </button>
      </div>
    </motion.div>
  );
};