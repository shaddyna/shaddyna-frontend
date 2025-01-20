"use client"

import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/store/cart-store"
import { Card } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { CartSkeleton } from "@/app/cart/cart-skeleton"
import { useRouter } from "next/navigation"
import Back from "./Back"

export function CartDetails() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore()

 
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleProceedToCheckout = () => {
    router.push('/checkout')
  }

  if (isLoading) {
    return <CartSkeleton />
  }

  if (items.length === 0) {
    return (
      <div>
        <Back title={"Your cart"} />
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-2xl text-gray-800 font-bold mb-4">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">Add items to your cart to see them here</p>
        <Link href="/shops">
          <Button className="bg-pink-500 hover:bg-pink-600 text-white">
            Continue Shopping
          </Button>
        </Link>
      </div>
      </div>
    )
  }

  return (
    <div>
    <Back title={"Your Shopping Cart"} />
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <Card key={`${item._id}-${item.color}`} className="p-4">
              <div className="flex gap-4">
                <div className="relative w-24 h-24">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    {/*<Link 
                      href={`/products/${item.slug}`}
                      className="font-medium hover:text-pink-500 transition-colors"
                    >
                      {item.name}
                    </Link>*/}
                    <div className="flex items-center gap-2">
                    <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item._id, Math.max(1, item.quantity - 1))}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item._id,  item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-sm text-gray-500">Color: {item.color}</p>
                    <div className="flex items-center gap-4">
                      <span className="font-medium text-gray-600">
                        KSH {(item.price * item.quantity).toFixed(2)}
                      </span>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={() => removeItem(item._id, )}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="p-6 sticky top-24">
            <h2 className="text-lg text-gray-600 font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4 mb-4 border-b pb-4">
              {items.map((item) => (
                <div key={`${item._id}-${item.color}`} className="flex items-start gap-3">
                  <div className="relative w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate text-gray-600">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      Color: {item.color} | Qty: {item.quantity}
                    </p>
                  </div>
                  <span className="font-medium text-gray-600">
                    KSH {(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between mb-4">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium text-gray-600">KSH {getTotalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold">
                <span className="text-gray-600">Total</span>
                <span className="text-gray-600">KSH {getTotalPrice().toFixed(2)}</span>
              </div>
            </div>
            <Button 
              className="w-full bg-pink-500 hover:bg-pink-600 text-white mt-4"
              onClick={handleProceedToCheckout}
            >
              Proceed to Checkout
            </Button>
          </Card>
        </div>
      </div>
    </div>
    </div>
  )
} 
