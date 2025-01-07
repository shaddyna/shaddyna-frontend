/*"use client";
import Footer from "@/components/Footer";
import HeadNavigation from "@/components/HeadNavigation";
import { useCartStore } from "@/store/cart-store";
import Image from "next/image";
import { useRouter } from "next/navigation";

const CartPage = () => {
  const router = useRouter();
  const {
    items,
    updateQuantity,
    removeItem,
    getTotalItems,
    getTotalPrice,
  } = useCartStore();

  return (
    <div>
      <HeadNavigation />
      <div className="bg-white min-h-screen text-[#182155] p-4">
        <h1 className="text-3xl font-bold text-center mb-6">Your Cart</h1>

        {items.length === 0 ? (
          <div className="text-center">
            <p className="text-xl text-[#182155]">Your cart is empty!</p>
            <button
              onClick={() => router.push("/")}
              className="mt-4 bg-[#ff199c] px-6 py-2 rounded font-bold text-white hover:bg-[#d61682]"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item._id}
                className="bg-[#f9f9f9] rounded-lg flex items-center space-x-4 p-4 shadow-md"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="rounded-lg border border-[#182155]"
                />
                <div className="flex-1">
                  <h2 className="text-lg font-bold text-[#182155]">
                    {item.name}
                  </h2>
                  <p className="text-sm text-gray-600">Color: {item.color}</p>
                  <p className="text-sm text-gray-600">Price: Ksh {item.price}</p>
                  <p className="text-sm text-gray-600">Stock: {item.stock}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() =>
                      updateQuantity(item._id, Math.max(item.quantity - 1, 1))
                    }
                    className="bg-[#182155] text-white w-8 h-8 flex items-center justify-center rounded hover:bg-[#1a1f66]"
                  >
                    -
                  </button>
                  <span className="text-lg font-bold">{item.quantity}</span>
                  <button
                    onClick={() =>
                      updateQuantity(
                        item._id,
                        Math.min(item.quantity + 1, item.stock)
                      )
                    }
                    className="bg-[#182155] text-white w-8 h-8 flex items-center justify-center rounded hover:bg-[#1a1f66]"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeItem(item._id)}
                    className="ml-4 bg-[#ff199c] text-white px-4 py-2 rounded hover:bg-[#d61682]"
                  >
                    Remove
                  </button>
                </div>
                <p className="text-lg font-bold text-[#182155]">
                  Total: Ksh {item.quantity * item.price}
                </p>
              </div>
            ))}

            <div className="bg-[#182155] text-white rounded-lg p-4 flex justify-between items-center shadow-md">
              <p className="text-xl font-bold">Total Price: Ksh {getTotalPrice()}</p>
              <button
                onClick={() => router.push("/checkout")}
                className="bg-[#ff199c] px-6 py-2 rounded font-bold text-white hover:bg-[#d61682]"
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;*/

import { CartDetails } from "@/components/cart-details"
import Footer from "@/components/Footer"
import HeadNavigation from "@/components/HeadNavigation"

export default function CartPage() {
  return (<div>
    <HeadNavigation />
    <CartDetails />
  <Footer />
  </div>
)
} 

