"use client";
import { motion } from "framer-motion";
import { ShoppingBag, X, ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/stores/cartStore";
import Image from "next/image";
import NavbarTwo from "@/components/HeaderTwo";
import LuxuryFooter from "@/components/LuxuryFooter";

const CartPage = () => {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    itemCount,
    totalPrice,
  } = useCartStore();

  return (
    <>
      <NavbarTwo />
      <div className="bg-white min-h-screen pt-20 pb-16 sm:pt-24 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 sm:mb-12"
          >
            <div className="flex items-center justify-start gap-2 sm:gap-3">
              <Link href="/products" passHref legacyBehavior>
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-block p-1.5 sm:p-2 bg-[#bf2c7e] hover:bg-[#9f2565] text-white rounded-full transition-colors"
                >
                  <ArrowLeft size={20} className="sm:w-6 sm:h-6 w-5 h-5" />
                </motion.a>
              </Link>
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                <span className="bg-clip-text text-transparent bg-[#bf2c7e]">
                  Your Shopping Bag
                </span>
              </h1>
            </div>

            <p className="text-base sm:text-lg text-gray-600 mt-2 sm:mt-3">
              {itemCount()} {itemCount() === 1 ? "item" : "items"} in your cart
            </p>
          </motion.div>

          {items.length > 0 ? (
            <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
              <div className="lg:col-span-2">
                <div className="space-y-3 sm:space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={`${item.id}-${item.size}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="flex flex-col xs:flex-row gap-4 sm:gap-6 border-b border-gray-200 pb-3 sm:pb-4"
                    >
                      <div className="relative w-full xs:w-32 sm:w-40 h-36 sm:h-48 bg-gray-100 rounded-lg overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start gap-2">
                          <div>
                            <h3 className="text-base sm:text-lg font-bold text-gray-900 line-clamp-2">{item.name}</h3>
                            <p className="text-gray-500 text-xs sm:text-sm">{item.designer}</p>
                            <p className="text-gray-500 text-xs sm:text-sm mt-1 sm:mt-2">Size: {item.size}</p>
                          </div>
                          <button
                            onClick={() => removeItem(item.id, item.size)}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <X size={16} className="sm:w-5 sm:h-5 w-4 h-4" />
                          </button>
                        </div>

                        <div className="mt-3 sm:mt-4 flex items-center justify-between">
                          <div className="flex items-center border border-gray-200 rounded-full text-sm sm:text-base">
                            <button
                              onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              className="px-2 sm:px-3 py-0.5 sm:py-1 text-gray-600 disabled:text-gray-300"
                            >
                              -
                            </button>
                            <span className="px-2 sm:px-3">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                              disabled={item.quantity >= item.stock}
                              className="px-2 sm:px-3 py-0.5 sm:py-1 text-gray-600 disabled:text-gray-300"
                            >
                              +
                            </button>
                          </div>
                          <p className="text-sm sm:text-md font-bold text-[#bf2c7e]">
                            Ksh {(item.price * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-3 sm:mt-4 flex justify-end">
                  <button
                    onClick={clearCart}
                    className="text-xs sm:text-sm text-gray-500 hover:text-gray-700 underline"
                  >
                    Clear all items
                  </button>
                </div>
              </div>

              <div className="lg:col-span-1 mt-6 sm:mt-0">
                <div className="bg-gray-100 p-3 sm:p-4 rounded-xl border border-gray-200">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Order Summary</h2>
                  
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex justify-between text-sm sm:text-base">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">Ksh {totalPrice().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm sm:text-base">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium">Free</span>
                    </div>
                    <div className="flex justify-between text-sm sm:text-base">
                      <span className="text-gray-600">Tax</span>
                      <span className="font-medium">Calculated at checkout</span>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 my-4 sm:my-5"></div>

                  <div className="flex justify-between mb-4 sm:mb-6">
                    <span className="text-base sm:text-lg font-bold">Total</span>
                    <span className="text-base sm:text-lg font-bold text-[#bf2c7e]">
                      Ksh {totalPrice().toLocaleString()}
                    </span>
                  </div>

                  <Link href="/checkout" passHref legacyBehavior>
                    <motion.a
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="block w-full bg-[#bf2c7e] hover:bg-[#9f2565] text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-full text-center transition-colors flex items-center justify-center gap-1 sm:gap-2 text-sm sm:text-base"
                    >
                      Proceed to Checkout <ArrowRight size={16} className="sm:w-5 sm:h-5 w-4 h-4" />
                    </motion.a>
                  </Link>

                  <p className="text-center text-xs sm:text-sm text-gray-500 mt-2 sm:mt-3">
                    or <Link href="/products" className="text-[#bf2c7e] hover:underline">Continue Shopping</Link>
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center py-12 sm:py-16"
            >
              <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4 sm:mb-5">
                <ShoppingBag size={28} className="sm:w-10 sm:h-10 w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2">Your cart is empty</h3>
              <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-5">Start shopping to add items to your cart</p>
              <Link href="/productss" passHref legacyBehavior>
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-block px-4 sm:px-5 py-2 sm:py-2.5 bg-[#bf2c7e] hover:bg-[#9f2565] text-white font-bold rounded-full transition-colors text-sm sm:text-base"
                >
                  Browse Products
                </motion.a>
              </Link>
            </motion.div>
          )}
        </div>
      </div>
   
      <LuxuryFooter />
    </>
  );
};

export default CartPage;