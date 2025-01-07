/*"use client";

import { useCheckoutStore } from "@/store/checkout-store";
import { useCartStore } from "@/store/cart-store";
import { useState, useEffect } from "react";
import { getCurrentUser } from "@/store/user-store";
import { useRouter } from "next/navigation"; 

export default function ConfirmationPage() {
  const paymentDetails = useCheckoutStore((state) => state.paymentDetails);
  const shippingInfo = useCheckoutStore((state) => state.shippingInfo);
  const cartItems = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart); 

  const [user, setUser] = useState<{ userId: string; customerName: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const router = useRouter(); 

  
  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    };

    fetchUser();
  }, []);

  if (!user) {
    return <div>Please login first to place an order...</div>;
  }

  const shipping_fee = 150;
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const amount = totalPrice + shipping_fee;

  const handlePlaceOrder = async () => {
    setIsLoading(true);
    setMessage("");

    const { mpesaCode, mpesaName, phoneNumber } = paymentDetails || {};

    console.log("Cart Items:", cartItems);

    
    const sellerIds = cartItems.map((item) => item.sellerId).filter(Boolean);

    console.log("Extracted Seller IDs:", sellerIds);

    if (sellerIds.length === 0) {
      console.log("No sellerId found in cart items.");
    }

    const sellerId = sellerIds;

    console.log("Selected Seller ID:", sellerId);

    const orderData = {
      mpesaCode,
      sellerId,
      mpesaName,
      mpesaNumber: phoneNumber,
      shippingInfo,
      products: [{ products: cartItems }],
      price: totalPrice,
      shipping_fee,
      amount,
      userId: user.userId, 
      customerName: user.customerName,
    };

    try {
      const response = await fetch(
        "https://shaddyna-updated-server.onrender.com/api/home/order/place-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Failed to place order. ${errorData.message || "Please try again."}`
        );
      }

      const result = await response.json();
      setMessage("Order placed successfully! Order ID: " + result.orderId);

  
      clearCart();

      router.push("/");

    } catch (error: unknown) {
      if (error instanceof Error) {
        setMessage(error.message || "An error occurred. Please try again.");
      } else {
        setMessage("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!paymentDetails || !shippingInfo || cartItems.length === 0) {
    return <div className="text-center py-12">No order details found!</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Order Confirmation</h1>
      <div className="space-y-4">
        <div>
          <h2 className="font-semibold">Shipping Address:</h2>
          <p>
            {shippingInfo.address}, {shippingInfo.city}, {shippingInfo.postalCode}
          </p>
        </div>
        <div>
          <h2 className="font-semibold">Payment Details:</h2>
          <p>Phone: {paymentDetails.phoneNumber}</p>
          <p>M-Pesa Code: {paymentDetails.mpesaCode}</p>
          <p>Name: {paymentDetails.mpesaName}</p>
        </div>
        <div>
          <h2 className="font-semibold">Items:</h2>
          <ul>
            {cartItems.map((item) => (
              <li key={item._id}>
                {item.name} - {item.quantity} x KSH {item.price.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-semibold">Total Price:</h2>
          <p className="text-lg font-bold">KSH {totalPrice.toFixed(2)}</p>
        </div>
        <div>
          <h2 className="font-semibold">Shipping Fee:</h2>
          <p className="text-lg font-bold">KSH {shipping_fee.toFixed(2)}</p>
        </div>
        <div>
          <h2 className="font-semibold">Amount (Total Price + Shipping Fee):</h2>
          <p className="text-lg font-bold">KSH {amount.toFixed(2)}</p>
        </div>
        <div className="mt-6">
          <button
            onClick={handlePlaceOrder}
            disabled={isLoading}
            className={`px-6 py-2 rounded ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"}`}
          >
            {isLoading ? "Placing Order..." : "Place Order"}
          </button>
          {message && (
            <p className={`mt-4 text-sm ${message.startsWith("Order placed") ? "text-green-600" : "text-red-600"}`}>
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}*/

"use client";

import { useCheckoutStore } from "@/store/checkout-store";
import { useCartStore } from "@/store/cart-store";
import { useUserSellerStore } from "@/store/useUserSellerStore"; // Import the user store
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import HeadNavigation from "@/components/HeadNavigation";
import Footer from "@/components/Footer";

export default function ConfirmationPage() {
  const paymentDetails = useCheckoutStore((state) => state.paymentDetails);
  const shippingInfo = useCheckoutStore((state) => state.shippingInfo);
  const cartItems = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  const user = useUserSellerStore((state) => state.user); // Access user from store
  const fetchCurrentUser = useUserSellerStore((state) => state.fetchCurrentUser); // Fetch current user action

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const router = useRouter();

  useEffect(() => {
    if (!user) {
      fetchCurrentUser(); // Ensure current user is fetched
    }
  }, [user, fetchCurrentUser]);

  if (!user) {
    return <div>Please login first to place an order...</div>;
  }

  const shipping_fee = 150;
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const amount = totalPrice + shipping_fee;

  const handlePlaceOrder = async () => {
    setIsLoading(true);
    setMessage("");

    const { mpesaCode, mpesaName, phoneNumber } = paymentDetails || {};

    console.log("Cart Items:", cartItems);

    const sellerIds = cartItems.map((item) => item.sellerId).filter(Boolean);

    console.log("Extracted Seller IDs:", sellerIds);

    const sellerId = sellerIds;

    const orderData = {
      mpesaCode,
      sellerId,
      mpesaName,
      mpesaNumber: phoneNumber,
      shippingInfo,
      products: [{ products: cartItems }],
      price: totalPrice,
      shipping_fee,
      amount,
      userId: user._id, 
      customerEmail: user.email, 
    };

    try {
      const response = await fetch(
        "https://shaddyna-backend.onrender.com/api/orders/place-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Failed to place order. ${errorData.message || "Please try again."}`
        );
      }

      const result = await response.json();
      setMessage("Order placed successfully! Order ID: " + result.orderId);

      clearCart();

      router.push("/");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setMessage(error.message || "An error occurred. Please try again.");
      } else {
        setMessage("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!paymentDetails || !shippingInfo || cartItems.length === 0) {
    return <div className="text-center py-12">No order details found!</div>;
  }

  return (
    <div>
    <HeadNavigation />
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Order Confirmation</h1>
      <div className="space-y-4">
        <div>
          <h2 className="font-semibold">Shipping Address:</h2>
          <p>
            {shippingInfo.address}, {shippingInfo.city}, {shippingInfo.postalCode}
          </p>
        </div>
        <div>
          <h2 className="font-semibold">Payment Details:</h2>
          <p>Phone: {paymentDetails.phoneNumber}</p>
          <p>M-Pesa Code: {paymentDetails.mpesaCode}</p>
          <p>Name: {paymentDetails.mpesaName}</p>
        </div>
        <div>
          <h2 className="font-semibold">Items:</h2>
          <ul>
            {cartItems.map((item) => (
              <li key={item._id}>
                {item.name} - {item.quantity} x KSH {item.price.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-semibold">Total Price:</h2>
          <p className="text-lg font-bold">KSH {totalPrice.toFixed(2)}</p>
        </div>
        <div>
          <h2 className="font-semibold">Shipping Fee:</h2>
          <p className="text-lg font-bold">KSH {shipping_fee.toFixed(2)}</p>
        </div>
        <div>
          <h2 className="font-semibold">Amount (Total Price + Shipping Fee):</h2>
          <p className="text-lg font-bold">KSH {amount.toFixed(2)}</p>
        </div>
        <div className="mt-6">
          <button
            onClick={handlePlaceOrder}
            disabled={isLoading}
            className={`px-6 py-2 rounded ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            {isLoading ? "Placing Order..." : "Place Order"}
          </button>
          {message && (
            <p
              className={`mt-4 text-sm ${
                message.startsWith("Order placed")
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
    <Footer />
    </div>
  );
}

