// app/checkout/page.tsx
/*"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { useCartStore } from "@/stores/cartStore";
import { useCheckoutStore } from "@/stores/checkoutStore";
import { ArrowRight, Check, CreditCard, ShoppingBag, Truck, Zap } from "lucide-react";
import Link from "next/link";
import NavbarTwo from "@/components/HeaderTwo";
import LuxuryFooter from "@/components/LuxuryFooter";

const CheckoutPage = () => {
  const { items, totalPrice, clearCart } = useCartStore();
  const {
    shippingInfo,
    paymentMethod,
    deliveryMethod,
    setShippingInfo,
    setPaymentMethod,
    setDeliveryMethod,
    resetCheckout,
  } = useCheckoutStore();

  const [activeStep, setActiveStep] = useState<"shipping" | "payment" | "review">("shipping");
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeStep === "shipping") {
      setActiveStep("payment");
    } else if (activeStep === "payment") {
      setActiveStep("review");
    }
  };

  const handlePlaceOrder = () => {
    // In a real app, you would process the payment here
    console.log("Order placed:", { shippingInfo, paymentMethod, deliveryMethod });
    clearCart();
    resetCheckout();
    // Redirect to confirmation page
  };

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
            d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"
          />
        </svg>
      ),
    },
  ];

  if (items.length === 0 && activeStep !== "review") {
    return (
      <div className="min-h-screen pt-24 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="py-20"
          >
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <ShoppingBag size={40} className="text-gray-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-8">
              You need to add items to your cart before proceeding to checkout
            </p>
            <Link
              href="/collections"
              className="inline-block px-6 py-3 bg-[#82cee4] hover:bg-[#62aee4] text-black font-bold rounded-full transition-colors"
            >
              Continue Shopping
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <>
    <NavbarTwo />
    <div className="min-h-screen pt-24 pb-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Checkout Steps *
        <div className="mb-12">
          <div className="flex justify-center">
            <div className="w-full max-w-3xl">
              <div className="flex items-center">
                {["shipping", "payment", "review"].map((step, index) => (
                  <div key={step} className="flex items-center">
                    <button
                      onClick={() => setActiveStep(step as any)}
                      className={`flex flex-col items-center ${activeStep === step ? "text-[#82cee4]" : "text-gray-400"}`}
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                          activeStep === step
                            ? "bg-[#82cee4] text-white"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {index + 1}
                      </div>
                      <span className="text-sm font-medium capitalize">{step}</span>
                    </button>
                    {index < 2 && (
                      <div className="w-16 h-px bg-gray-200 mx-2"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Checkout Form *
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit}>
              {activeStep === "shipping" && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Shipping Information</h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        required
                        value={shippingInfo.firstName}
                        onChange={(e) =>
                          setShippingInfo({ firstName: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#82cee4] focus:border-[#82cee4] transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        required
                        value={shippingInfo.lastName}
                        onChange={(e) =>
                          setShippingInfo({ lastName: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#82cee4] focus:border-[#82cee4] transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={shippingInfo.email}
                      onChange={(e) => setShippingInfo({ email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#82cee4] focus:border-[#82cee4] transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      value={shippingInfo.phone}
                      onChange={(e) => setShippingInfo({ phone: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#82cee4] focus:border-[#82cee4] transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                      Street Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      required
                      value={shippingInfo.address}
                      onChange={(e) =>
                        setShippingInfo({ address: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#82cee4] focus:border-[#82cee4] transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        required
                        value={shippingInfo.city}
                        onChange={(e) => setShippingInfo({ city: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#82cee4] focus:border-[#82cee4] transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                        Country
                      </label>
                      <select
                        id="country"
                        required
                        value={shippingInfo.country}
                        onChange={(e) =>
                          setShippingInfo({ country: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#82cee4] focus:border-[#82cee4] transition-all"
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
                      <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        id="postalCode"
                        required
                        value={shippingInfo.postalCode}
                        onChange={(e) =>
                          setShippingInfo({ postalCode: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#82cee4] focus:border-[#82cee4] transition-all"
                      />
                    </div>
                  </div>

                  <div className="pt-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Delivery Method</h3>
                    <div className="space-y-4">
                      {deliveryOptions.map((option) => (
                        <div
                          key={option.id}
                          onClick={() => setDeliveryMethod(option.id as any)}
                          className={`p-4 border rounded-lg cursor-pointer transition-all ${
                            deliveryMethod === option.id
                              ? "border-[#82cee4] bg-[#82cee4]/10"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="p-2 bg-white rounded-full shadow-sm">
                                {option.icon}
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900">{option.name}</h4>
                                <p className="text-sm text-gray-500">{option.time}</p>
                              </div>
                            </div>
                            <span className="font-medium">
                              {option.price === 0 ? "Free" : `$${option.price}`}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6">
                    <button
                      type="submit"
                      disabled={!deliveryMethod}
                      className="w-full bg-[#82cee4] hover:bg-[#62aee4] text-black font-bold py-3 px-6 rounded-full transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      Continue to Payment <ArrowRight size={18} />
                    </button>
                  </div>
                </motion.div>
              )}

              {activeStep === "payment" && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Method</h2>
                  
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
                            ? "border-[#82cee4] bg-[#82cee4]/10"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-white rounded-full shadow-sm">
                            {method.icon}
                          </div>
                          <h4 className="font-medium text-gray-900">{method.name}</h4>
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
                        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                          Card Number
                        </label>
                        <input
                          type="text"
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#82cee4] focus:border-[#82cee4] transition-all"
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-1">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            id="expiry"
                            placeholder="MM/YY"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#82cee4] focus:border-[#82cee4] transition-all"
                          />
                        </div>
                        <div>
                          <label htmlFor="cvc" className="block text-sm font-medium text-gray-700 mb-1">
                            CVC
                          </label>
                          <input
                            type="text"
                            id="cvc"
                            placeholder="123"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#82cee4] focus:border-[#82cee4] transition-all"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                          Name on Card
                        </label>
                        <input
                          type="text"
                          id="cardName"
                          placeholder="John Doe"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#82cee4] focus:border-[#82cee4] transition-all"
                        />
                      </div>
                    </motion.div>
                  )}

                  <div className="pt-6 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setActiveStep("shipping")}
                      className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-full hover:bg-gray-50 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={!paymentMethod}
                      className="px-6 py-3 bg-[#82cee4] hover:bg-[#62aee4] text-black font-bold rounded-full transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      Review Order <ArrowRight size={18} />
                    </button>
                  </div>
                </motion.div>
              )}

              {activeStep === "review" && (
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
                          <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-gray-200 my-6"></div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="font-medium">${totalPrice().toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Shipping</span>
                        <span className="font-medium">
                          {deliveryMethod === "standard"
                            ? "Free"
                            : `$${
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
                          $
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
                      onClick={() => setActiveStep("payment")}
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
              )}
            </form>
          </div>

          {/* Order Summary *
          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
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
                          Size: {item.size} • Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-200 my-6"></div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${totalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {deliveryMethod
                      ? deliveryMethod === "standard"
                        ? "Free"
                        : `$${
                            deliveryOptions.find((o) => o.id === deliveryMethod)?.price.toFixed(2)
                          }`
                      : "Not selected"}
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
                    $
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
          </div>
        </div>
      </div>
    </div>
    <LuxuryFooter />
    </>
  );
};

export default CheckoutPage;*/

"use client";
import { useState } from "react";
import { useCartStore } from "@/stores/cartStore";
import { useCheckoutStore } from "@/stores/checkoutStore";
import NavbarTwo from "@/components/HeaderTwo";
import LuxuryFooter from "@/components/LuxuryFooter";
import { EmptyCart } from "@/components/checkout/EmptyCart";
import { CheckoutSteps } from "@/components/checkout/CheckoutSteps";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { ShippingForm } from "@/components/checkout/ShippingForm";
import { PaymentForm } from "@/components/checkout/PaymentForm";
import { ReviewOrder } from "@/components/checkout/ReviewOrder";

const CheckoutPage = () => {
  const { items, clearCart } = useCartStore();
  const { resetCheckout } = useCheckoutStore();

  const [activeStep, setActiveStep] = useState<"shipping" | "payment" | "review">("shipping");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeStep === "shipping") {
      setActiveStep("payment");
    } else if (activeStep === "payment") {
      setActiveStep("review");
    }
  };

  const handlePlaceOrder = () => {
    // In a real app, you would process the payment here
    console.log("Order placed");
    clearCart();
    resetCheckout();
    // Redirect to confirmation page
  };

  if (items.length === 0 && activeStep !== "review") {
    return <EmptyCart />;
  }

  return (
    <>
      <NavbarTwo />
      <div className="min-h-screen pt-24 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CheckoutSteps activeStep={activeStep} setActiveStep={setActiveStep} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit}>
                {activeStep === "shipping" && (
                  <ShippingForm onSubmit={() => setActiveStep("payment")} />
                )}

                {activeStep === "payment" && (
                  <PaymentForm
                    onSubmit={() => setActiveStep("review")}
                    onBack={() => setActiveStep("shipping")}
                  />
                )}

                {activeStep === "review" && (
                  <ReviewOrder
                    onBack={() => setActiveStep("payment")}
                    onPlaceOrder={handlePlaceOrder}
                  />
                )}
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <OrderSummary />
            </div>
          </div>
        </div>
      </div>
      <LuxuryFooter />
    </>
  );
};

export default CheckoutPage;