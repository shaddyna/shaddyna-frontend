/*"use client"
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ShoppingBag, ArrowLeft, } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import useCartService from '@/lib/hooks/useCartStore';

const CartDetails = () => {
  const { items, itemsPrice, decrease, increase } = useCartService();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
       
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Your Cart</h1>
          <Link href="/" className="flex items-center text-pink-600 hover:text-pink-700 transition-colors">
            <ArrowLeft className="mr-1" size={18} />
            Continue Shopping
          </Link>
        </div>

        {items.length === 0 ? (
          /* Empty Cart State *
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="mx-auto w-40 h-40 bg-pink-50 rounded-full flex items-center justify-center mb-6">
              <ShoppingBag className="text-pink-500" size={60} strokeWidth={1} />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Looks like you have not added anything to your cart yet</p>
            <Link 
              href="/" 
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 transition-all duration-200"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          /* Cart with Items *
          <div className="grid gap-8 lg:grid-cols-3">

            <div className="bg-white rounded-xl shadow-sm overflow-hidden lg:col-span-2">
              <div className="divide-y divide-gray-100">
                {items.map((item) => (
                  <div key={item.slug} className="p-4 sm:p-6">
                    <div className="flex items-start sm:items-center gap-4">
               
                      <Link href={`/product/${item.slug}`} className="flex-shrink-0">
                        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden bg-gray-50">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                      </Link>

                    
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between">
                          <Link 
                            href={`/product/${item.slug}`}
                            className="text-sm sm:text-base font-medium text-gray-900 hover:text-pink-600 truncate"
                          >
                            {item.name}
                          </Link>
                          
                        </div>
                        
                        <p className="text-sm text-gray-500 mt-1">Ksh {item.price.toFixed(2)}</p>
                        
                       
                        <div className="mt-4 flex items-center">
                          <button
                            onClick={() => decrease(item)}
                            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-l-md text-gray-600 hover:bg-gray-50"
                          >
                            -
                          </button>
                          <div className="w-10 h-8 flex items-center justify-center border-t border-b border-gray-300 text-sm font-medium">
                            {item.qty}
                          </div>
                          <button
                            onClick={() => increase(item)}
                            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-r-md text-gray-600 hover:bg-gray-50"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

     
            <div className="bg-white rounded-xl shadow-sm p-6 h-fit sticky top-4">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({items.reduce((acc, item) => acc + item.qty, 0)} items)</span>
                  <span className="font-medium">Ksh {itemsPrice.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">Free</span>
                </div>
                
                <div className="border-t border-gray-200 pt-4 flex justify-between">
                  <span className="text-base font-medium text-gray-900">Total</span>
                  <span className="text-base font-bold text-pink-600">Ksh {itemsPrice.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => router.push('/shipping')}
                className="mt-6 w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 transition-all duration-200"
              >
                Proceed to Checkout
              </button>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
                <svg className="w-4 h-4 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                Secure Checkout
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDetails;*/

"use client"
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ShoppingBag, ArrowLeft, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import useCartService from '@/lib/hooks/useCartStore';

const CartDetails = () => {
  const { items, itemsPrice, decrease, increase, removeItem, clear } = useCartService();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Your Cart</h1>
          <div className="flex items-center gap-4">
            {items.length > 0 && (
              <button
                onClick={() => clear()}
                className="flex items-center text-red-600 hover:text-red-700 transition-colors text-sm"
              >
                <Trash2 className="mr-1" size={16} />
                Clear Cart
              </button>
            )}
            <Link href="/" className="flex items-center text-pink-600 hover:text-pink-700 transition-colors">
              <ArrowLeft className="mr-1" size={18} />
              Continue Shopping
            </Link>
          </div>
        </div>

        {items.length === 0 ? (
          /* Empty Cart State - unchanged */
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="mx-auto w-40 h-40 bg-pink-50 rounded-full flex items-center justify-center mb-6">
              <ShoppingBag className="text-pink-500" size={60} strokeWidth={1} />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Looks like you have not added anything to your cart yet</p>
            <Link 
              href="/" 
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 transition-all duration-200"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          /* Cart with Items */
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden lg:col-span-2">
              <div className="divide-y divide-gray-100">
                {items.map((item) => (
                  <div key={item.slug} className="p-4 sm:p-6">
                    <div className="flex items-start sm:items-center gap-4">
                      {/* Product Image */}
                      <Link href={`/product/${item.slug}`} className="flex-shrink-0">
                        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden bg-gray-50">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                      </Link>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between">
                          <Link 
                            href={`/product/${item.slug}`}
                            className="text-sm sm:text-base font-medium text-gray-900 hover:text-pink-600 truncate"
                          >
                            {item.name}
                          </Link>
                          <button
                            onClick={() => removeItem(item)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                        
                        <p className="text-sm text-gray-500 mt-1">Ksh {item.price.toFixed(2)}</p>
                        
                        {/* Quantity Controls */}
                        <div className="mt-4 flex items-center">
                          <button
                            onClick={() => decrease(item)}
                            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-l-md text-gray-600 hover:bg-gray-50"
                          >
                            -
                          </button>
                          <div className="w-10 h-8 flex items-center justify-center border-t border-b border-gray-300 text-sm font-medium">
                            {item.qty}
                          </div>
                          <button
                            onClick={() => increase(item)}
                            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-r-md text-gray-600 hover:bg-gray-50"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-xl shadow-sm p-6 h-fit sticky top-4">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({items.reduce((acc, item) => acc + item.qty, 0)} items)</span>
                  <span className="font-medium">Ksh {itemsPrice.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">Free</span>
                </div>
                
                <div className="border-t border-gray-200 pt-4 flex justify-between">
                  <span className="text-base font-medium text-gray-900">Total</span>
                  <span className="text-base font-bold text-pink-600">Ksh {itemsPrice.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => router.push('/shipping')}
                className="mt-6 w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 transition-all duration-200"
              >
                Proceed to Checkout
              </button>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
                <svg className="w-4 h-4 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                Secure Checkout
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDetails;