import { motion } from "framer-motion";
import { useCheckoutStore } from "@/stores/checkoutStore";
import { ArrowRight, CreditCard } from "lucide-react";
import { useState } from "react";

const paymentMethods = [
  {
    id: "credit-card",
    name: "Credit Card",
    icon: <CreditCard size={20} />,
  },
  {
    id: "paypal",
    name: "PayPal",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5">
        <path
          fill="#253B80"
          d="M7.391 18.016h1.184c1.755 0 2.813-.799 3.07-2.132l.023-.12.457-2.42.029-.15c.33-1.672 1.562-2.383 3.148-2.383h.734c1.196 0 2.172.15 2.813.57.645.42.938 1.05.938 1.875 0 .735-.24 1.35-.72 1.845-.48.495-1.155.75-2.025.75h-.39c-.27 0-.48.09-.63.27-.15.18-.21.42-.18.705l.06.39c.09.57.39.855.9.855h.39c1.275 0 2.295-.36 3.06-1.08.765-.72 1.147-1.68 1.147-2.88 0-1.275-.48-2.295-1.44-3.06-.96-.765-2.265-1.147-3.915-1.147h-.734c-2.52 0-4.245 1.245-4.245 3.75l-.03.165-.45 2.385-.023.12c-.18.96-.96 1.44-2.34 1.44H7.391v-1.184z"
        />
      </svg>
    ),
  },
  {
    id: "apple-pay",
    name: "Apple Pay",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5">
        <path
          fill="#000"
          d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"
        />
      </svg>
    ),
  },
];

interface PaymentFormProps {
  onSubmit: () => void;
  onBack: () => void;
}

export const PaymentForm = ({ onSubmit, onBack }: PaymentFormProps) => {
  const { paymentMethod, setPaymentMethod } = useCheckoutStore();
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-[#0f1c47] mb-6">Payment Method</h2>
      
      <div className="space-y-4">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            onClick={() => {
              setPaymentMethod(method.id as any);
              if (method.id === "credit-card") {
                setShowPaymentForm(true);
              } else {
                setShowPaymentForm(false);
              }
            }}
            className={`p-4 border rounded-lg cursor-pointer transition-all ${
              paymentMethod === method.id
                ? "border-[#bf2c7e] bg-[#bf2c7e]/10"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-white rounded-full shadow-sm">
                {method.icon}
              </div>
              <h4 className="font-medium text-[#0f1c47]">{method.name}</h4>
            </div>
          </div>
        ))}
      </div>

      {showPaymentForm && paymentMethod === "credit-card" && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3 }}
          className="pt-6 space-y-4"
        >
          <div>
            <label htmlFor="cardNumber" className="block text-sm font-medium text-[#0f1c47] mb-1">
              Card Number
            </label>
            <input
              type="text"
              id="cardNumber"
              placeholder="1234 5678 9012 3456"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bf2c7e] focus:border-[#bf2c7e] transition-all"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="expiry" className="block text-sm font-medium text-[#0f1c47] mb-1">
                Expiry Date
              </label>
              <input
                type="text"
                id="expiry"
                placeholder="MM/YY"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bf2c7e] focus:border-[#bf2c7e] transition-all"
              />
            </div>
            <div>
              <label htmlFor="cvc" className="block text-sm font-medium text-[#0f1c47] mb-1">
                CVC
              </label>
              <input
                type="text"
                id="cvc"
                placeholder="123"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bf2c7e] focus:border-[#bf2c7e] transition-all"
              />
            </div>
          </div>
          <div>
            <label htmlFor="cardName" className="block text-sm font-medium text-[#0f1c47] mb-1">
              Name on Card
            </label>
            <input
              type="text"
              id="cardName"
              placeholder="John Doe"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bf2c7e] focus:border-[#bf2c7e] transition-all"
            />
          </div>
        </motion.div>
      )}

      <div className="pt-6 flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3 border border-gray-300 text-[#0f1c47] font-medium rounded-full hover:bg-gray-50 transition-colors"
        >
          Back
        </button>
        <button
          type="button"
          onClick={onSubmit}
          disabled={!paymentMethod}
          className="px-6 py-3 bg-[#bf2c7e] text-white font-bold rounded-full transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          Review Order <ArrowRight size={18} />
        </button>
      </div>
    </motion.div>
  );
};