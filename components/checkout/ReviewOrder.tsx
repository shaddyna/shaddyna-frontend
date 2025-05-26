/*import { motion } from "framer-motion";
import { useCartStore } from "@/stores/cartStore";
import { useCheckoutStore } from "@/stores/checkoutStore";
import { Check } from "lucide-react";
import { Truck, Zap } from "lucide-react";
import { CreditCard } from "lucide-react";

interface ReviewOrderProps {
  onBack: () => void;
  onPlaceOrder: () => void;
}

export const ReviewOrder = ({ onBack, onPlaceOrder }: ReviewOrderProps) => {
  const { items, totalPrice } = useCartStore();
  const { shippingInfo, paymentMethod, deliveryMethod } = useCheckoutStore();

  const deliveryOptions = [
    {
      id: "standard",
      name: "Standard Delivery",
      price: 0,
      time: "3-5 business days",
      icon: <Truck size={20} className="text-gray-500" />,
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
      icon: <Zap size={20} className="text-[#82cee4]" />,
    },
  ];

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
            d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 2.53-.02.125.02.24.18.27.16.03.36-.09.45-.27.09-.18.18-.42.18-.705l-.06-.39c-.09-.57-.39-.855-.9-.855h-.39c-1.275 0-2.295.36-3.06 1.08-.765.72-1.147 1.68-1.147 2.88 0 1.275.48 2.295 1.44 3.06.96.765 2.265 1.147 3.915 1.147h.734c2.52 0 4.245-1.245 4.245-3.75l.03-.165.45-2.385.023-.12c.18-.96.96-1.44 2.34-1.44h.391v1.184z"
          />
        </svg>
      ),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Review Your Order</h2>
      
      <div className="border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Shipping Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="font-medium">
              {shippingInfo.firstName} {shippingInfo.lastName}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium">{shippingInfo.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Phone</p>
            <p className="font-medium">{shippingInfo.phone}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Address</p>
            <p className="font-medium">{shippingInfo.address}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">City</p>
            <p className="font-medium">{shippingInfo.city}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Country</p>
            <p className="font-medium">{shippingInfo.country}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Postal Code</p>
            <p className="font-medium">{shippingInfo.postalCode}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Delivery Method</p>
            <p className="font-medium">
              {deliveryOptions.find((o) => o.id === deliveryMethod)?.name}
            </p>
          </div>
        </div>
      </div>

      <div className="border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Method</h3>
        <div className="flex items-center space-x-4">
          <div className="p-2 bg-white rounded-full shadow-sm">
            {paymentMethods.find((m) => m.id === paymentMethod)?.icon}
          </div>
          <p className="font-medium">
            {paymentMethods.find((m) => m.id === paymentMethod)?.name}
          </p>
        </div>
      </div>

      <div className="border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h3>
        <div className="space-y-4">
          {items.map((item) => (
            <div key={`${item.id}-${item.size}`} className="flex justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium">{item.name}</h4>
                  <p className="text-sm text-gray-500">
                    {item.designer} • Size: {item.size} • Qty: {item.quantity}
                  </p>
                </div>
              </div>
              <p className="font-medium">Ksh {(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-200 my-6"></div>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">Ksh {totalPrice().toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Shipping</span>
            <span className="font-medium">
              {deliveryMethod === "standard"
                ? "Free"
                : `Ksh ${
                    deliveryOptions.find((o) => o.id === deliveryMethod)?.price.toFixed(2)
                  }`}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Tax</span>
            <span className="font-medium">Calculated at checkout</span>
          </div>
          <div className="border-t border-gray-200 my-3"></div>
          <div className="flex justify-between">
            <span className="text-lg font-bold">Total</span>
            <span className="text-lg font-bold text-[#82cee4]">
              Ksh
              {(
                totalPrice() +
                (deliveryMethod === "standard"
                  ? 0
                  : deliveryOptions.find((o) => o.id === deliveryMethod)?.price || 0)
              ).toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <div className="pt-6 flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-full hover:bg-gray-50 transition-colors"
        >
          Back
        </button>
        <button
          type="button"
          onClick={onPlaceOrder}
          className="px-6 py-3 bg-[#82cee4] hover:bg-[#62aee4] text-black font-bold rounded-full transition-colors flex items-center justify-center gap-2"
        >
          Place Order <Check size={18} />
        </button>
      </div>
    </motion.div>
  );
};*/

/*import { motion } from "framer-motion";
import { useCartStore } from "@/stores/cartStore";
import { useCheckoutStore } from "@/stores/checkoutStore";
import { Check } from "lucide-react";
import { Truck, Zap } from "lucide-react";
import { CreditCard } from "lucide-react";

interface ReviewOrderProps {
  onBack: () => void;
  onPlaceOrder: () => void;
}

export const ReviewOrder = ({ onBack, onPlaceOrder }: ReviewOrderProps) => {
  const { items, totalPrice, clearCart } = useCartStore();
  const { shippingInfo, paymentMethod, deliveryMethod } = useCheckoutStore();

  const deliveryOptions = [
    {
      id: "standard",
      name: "Standard Delivery",
      price: 0,
      time: "3-5 business days",
      icon: <Truck size={20} className="text-gray-500" />,
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
      icon: <Zap size={20} className="text-[#82cee4]" />,
    },
  ];

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
            d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 2.53-.02.125.02.24.18.27.16.03.36-.09.45-.27.09-.18.18-.42.18-.705l-.06-.39c-.09-.57-.39-.855-.9-.855h-.39c-1.275 0-2.295.36-3.06 1.08-.765.72-1.147 1.68-1.147 2.88 0 1.275.48 2.295 1.44 3.06.96.765 2.265 1.147 3.915 1.147h.734c2.52 0 4.245-1.245 4.245-3.75l.03-.165.45-2.385.023-.12c.18-.96.96-1.44 2.34-1.44h.391v1.184z"
          />
        </svg>
      ),
    },
  ];

  const handlePlaceOrder = () => {
    // Calculate the shipping cost
    const shippingCost = deliveryMethod === "standard" 
      ? 0 
      : deliveryOptions.find(o => o.id === deliveryMethod)?.price || 0;

    // Prepare the order data to be logged
    const orderData = {
      customer: {
        name: `${shippingInfo.firstName} ${shippingInfo.lastName}`,
        email: shippingInfo.email,
        phone: shippingInfo.phone,
        address: {
          street: shippingInfo.address,
          city: shippingInfo.city,
          country: shippingInfo.country,
          postalCode: shippingInfo.postalCode
        }
      },
      delivery: {
        method: deliveryMethod,
        option: deliveryOptions.find(o => o.id === deliveryMethod),
        cost: shippingCost
      },
      payment: {
        method: paymentMethod,
        option: paymentMethods.find(m => m.id === paymentMethod)
      },
      items: items.map(item => ({
        id: item.id,
        name: item.name,
        designer: item.designer,
        size: item.size,
        quantity: item.quantity,
        price: item.price,
        total: (item.price * item.quantity).toFixed(2),
        image: item.image
      })),
      totals: {
        subtotal: totalPrice().toFixed(2),
        shipping: shippingCost.toFixed(2),
        tax: "Calculated at checkout",
        total: (totalPrice() + shippingCost).toFixed(2)
      },
      timestamp: new Date().toISOString()
    };

    // Log the complete order data
    console.log("Placing order with data:", orderData);

    // Call the original onPlaceOrder handler
    onPlaceOrder();
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Review Your Order</h2>
      
      <div className="border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Shipping Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="font-medium">
              {shippingInfo.firstName} {shippingInfo.lastName}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium">{shippingInfo.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Phone</p>
            <p className="font-medium">{shippingInfo.phone}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Address</p>
            <p className="font-medium">{shippingInfo.address}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">City</p>
            <p className="font-medium">{shippingInfo.city}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Country</p>
            <p className="font-medium">{shippingInfo.country}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Postal Code</p>
            <p className="font-medium">{shippingInfo.postalCode}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Delivery Method</p>
            <p className="font-medium">
              {deliveryOptions.find((o) => o.id === deliveryMethod)?.name}
            </p>
          </div>
        </div>
      </div>

      <div className="border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Method</h3>
        <div className="flex items-center space-x-4">
          <div className="p-2 bg-white rounded-full shadow-sm">
            {paymentMethods.find((m) => m.id === paymentMethod)?.icon}
          </div>
          <p className="font-medium">
            {paymentMethods.find((m) => m.id === paymentMethod)?.name}
          </p>
        </div>
      </div>

      <div className="border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h3>
        <div className="space-y-4">
          {items.map((item) => (
            <div key={`${item.id}-${item.size}`} className="flex justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium">{item.name}</h4>
                  <p className="text-sm text-gray-500">
                    {item.designer} • Size: {item.size} • Qty: {item.quantity}
                  </p>
                </div>
              </div>
              <p className="font-medium">Ksh {(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-200 my-6"></div>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">Ksh {totalPrice().toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Shipping</span>
            <span className="font-medium">
              {deliveryMethod === "standard"
                ? "Free"
                : `Ksh ${
                    deliveryOptions.find((o) => o.id === deliveryMethod)?.price.toFixed(2)
                  }`}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Tax</span>
            <span className="font-medium">Calculated at checkout</span>
          </div>
          <div className="border-t border-gray-200 my-3"></div>
          <div className="flex justify-between">
            <span className="text-lg font-bold">Total</span>
            <span className="text-lg font-bold text-[#82cee4]">
              Ksh
              {(
                totalPrice() +
                (deliveryMethod === "standard"
                  ? 0
                  : deliveryOptions.find((o) => o.id === deliveryMethod)?.price || 0)
              ).toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <div className="pt-6 flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-full hover:bg-gray-50 transition-colors"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handlePlaceOrder}
          className="px-6 py-3 bg-[#82cee4] hover:bg-[#62aee4] text-black font-bold rounded-full transition-colors flex items-center justify-center gap-2"
        >
          Place Order <Check size={18} />
        </button>
      </div>
    </motion.div>
  );
};*/

"use client";
import { motion } from "framer-motion";
import { JSX, useState } from "react";
import { useCartStore } from "@/stores/cartStore";
import { useCheckoutStore } from "@/stores/checkoutStore";
import { Check, Truck, Zap, CreditCard } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import orderService from "@/utils/orderService";

interface ReviewOrderProps {
  onBack: () => void;
onPlaceOrder: () => void;
}
interface OrderItem {
  id: string;
  size: string;
  name: string;
  designer: string;
  quantity: number;
  price: number;
  image: string;
}

interface DeliveryOption {
  id: string;
  name: string;
  price: number;
  time: string;
  icon: JSX.Element;
}

interface PaymentMethod {
  id: string;
  name: string;
  icon: JSX.Element;
}

export const ReviewOrder = ({ onBack }: ReviewOrderProps) => {
  const { items, totalPrice, clearCart } = useCartStore();
  const { shippingInfo, paymentMethod, deliveryMethod, resetCheckout } = useCheckoutStore();
  const { user, token, logout } = useAuth();
  const router = useRouter();
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [error, setError] = useState("");

  const deliveryOptions: DeliveryOption[] = [
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

  const paymentMethods: PaymentMethod[] = [
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

  const handlePlaceOrder = async () => {
    if (!user || !token) {
      router.push("/login");
      return;
    }

    setIsPlacingOrder(true);
    setError("");

    try {
      const shippingCost = deliveryMethod === "standard"
        ? 0
        : deliveryOptions.find((o) => o.id === deliveryMethod)?.price || 0;
      const orderData = {
        customer: {
          name: `${shippingInfo.firstName} ${shippingInfo.lastName}`,
          email: shippingInfo.email,
          phone: shippingInfo.phone,
          address: {
            street: shippingInfo.address,
            city: shippingInfo.city,
            country: shippingInfo.country,
            postalCode: shippingInfo.postalCode,
          },
        },
        delivery: {
          method: deliveryMethod,
          option: {
            id: deliveryMethod,
            name: deliveryOptions.find((o) => o.id === deliveryMethod)?.name,
            price: shippingCost,
          },
          cost: shippingCost,
        },
        payment: {
          method: paymentMethod,
          option: {
            id: paymentMethod,
            name: paymentMethods.find((m) => m.id === paymentMethod)?.name,
          },
        },
        items: items.map((item: OrderItem) => ({
          productId: item.id,
          name: item.name,
          designer: item.designer,
          size: item.size,
          quantity: item.quantity,
          price: item.price,
          image: item.image,
        })),
        totals: {
          subtotal: totalPrice(),
          shipping: shippingCost,
          tax: "Calculated at checkout",
          total: totalPrice() + shippingCost,
        },
      };

      console.log(user._id);
      console.log("Sending order data:", JSON.stringify(orderData, null, 2));

      const response = await orderService.placeOrder(orderData, token);

      clearCart();
      resetCheckout();
      router.push(`/order-confirmation/${response.order._id}`);
    } catch (err: any) {
      console.error("Order error:", err);

      if (err.response?.status === 401) {
        logout();
        router.push("/login");
        return;
      }

      setError(err.response?.data?.message || "Failed to place order. Please try again.");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-[#0f1c47] mb-6">Review Your Order</h2>

      {/* Shipping Information */}
      <div className="border border-[#bf2c7e] rounded-lg p-6">
        <h3 className="text-lg font-medium text-[#0f1c47] mb-4">Shipping Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* ... shipping info fields ... */}
        </div>
      </div>

      {/* Payment Method */}
      <div className="border border-[#bf2c7e] rounded-lg p-6">
        <h3 className="text-lg font-medium text-[#0f1c47] mb-4">Payment Method</h3>
        <div className="flex items-center space-x-4">
          <div className="p-2 bg-white rounded-full shadow-sm">
            {paymentMethods.find((m) => m.id === paymentMethod)?.icon}
          </div>
          <p className="font-medium text-[#0f1c47]">
            {paymentMethods.find((m) => m.id === paymentMethod)?.name}
          </p>
        </div>
      </div>

      {/* Order Summary */}
      <div className="border border-[#bf2c7e] rounded-lg p-6">
        <h3 className="text-lg font-medium text-[#0f1c47] mb-4">Order Summary</h3>
        <div className="space-y-4">
          {items.map((item) => (
            <div key={`${item.id}-${item.size}`} className="flex justify-between">
              {/* ... item details ... */}
              <p className="font-medium text-[#0f1c47]">Ksh {(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>

        {/* Totals Section */}
        <div className="border-t border-[#bf2c7e] my-6"></div>
        <div className="space-y-3">
          {/* ... totals calculation ... */}
          <span className="text-lg font-bold text-[#bf2c7e]">
            Ksh{" "}
            {(
              totalPrice() +
              (deliveryMethod === "standard"
                ? 0
                : deliveryOptions.find((o) => o.id === deliveryMethod)?.price || 0)
            ).toFixed(2)}
          </span>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="text-red-500 text-center mb-4">
          {error}
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="pt-6 flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3 border border-[#bf2c7e] text-[#0f1c47] font-medium rounded-full hover:bg-gray-50 transition-colors"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handlePlaceOrder}
          disabled={isPlacingOrder}
          className="px-6 py-3 bg-[#bf2c7e] text-white font-bold rounded-full transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {isPlacingOrder ? "Processing..." : "Place Order"}
          <Check size={18} />
        </button>
      </div>
    </motion.div>
  );
};