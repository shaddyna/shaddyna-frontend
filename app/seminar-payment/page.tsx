"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCheckoutStore } from "@/store/checkout-store";
import { useCartStore } from "@/store/cart-store";
import { useUserSellerStore } from "@/store/useUserSellerStore";
import { useRouter } from "next/navigation"; 
import Footer from "@/components/Footer";
import Back from "@/components/Back";

const paymentSchema = z.object({
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  mpesaCode: z.string().min(6, "M-Pesa code must be at least 6 characters"),
  mpesaName: z.string().min(2, "Name must be at least 2 characters"),
});

type PaymentFormData = z.infer<typeof paymentSchema>;

export default function PaymentPage() {
  const form = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      phoneNumber: "",
      mpesaCode: "",
      mpesaName: "",
    },
  });

  const setPaymentDetails = useCheckoutStore((state) => state.setPaymentDetails);
  const shippingInfo = useCheckoutStore((state) => state.shippingInfo);
  const cartItems = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  const user = useUserSellerStore((state) => state.user);
  const fetchCurrentUser = useUserSellerStore((state) => state.fetchCurrentUser);
  
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();
  const [activeMethod, setActiveMethod] = useState("mpesa");
  

  useEffect(() => {
    if (!user) {
      fetchCurrentUser();
    }
  }, [user, fetchCurrentUser]);

  if (!user) {
    return <div>Please login first to place an order...</div>;
  }

  const shipping_fee = 150;
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const amount = totalPrice + shipping_fee;

  async function handlePayWithMpesa(data: PaymentFormData) {
    setPaymentDetails(data);
    console.log("Payment data submitted:", data);
    router.push("/confirmation");
  }

  // Fetch token directly from localStorage
  const getTokenFromLocalStorage = () => {
    return localStorage.getItem("token");
  };


  /*async function handlePayWithSavings() {
    setIsLoading(true);
    setMessage("");

    try {
    const token = getTokenFromLocalStorage(); // Get token from localStorage
    if (!token) {
      alert("User not authenticated");
      return;
    }
    const response = await fetch("https://shaddyna-backend.onrender.com/api/saving/savings", {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${token}`, // Use token from localStorage
      },
    });
      if (!response.ok) {
        throw new Error("Failed to fetch savings. Please try again.");
      }
     
      const result = await response.json();
      const userSavings = result.balance || 0;

      console.log("User Savings:", userSavings);
      console.log("Required Amount:", amount);

      if (userSavings < amount) {
        setMessage("Insufficient savings to complete the payment.");
        setIsLoading(false);
        return;
      }

      await placeOrder();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "An error occurred.");
    } finally {
      setIsLoading(false);
    }
  }
  async function placeOrder() {
      const mpesaCode = "N/A";
      const mpesaName = "N/A";
      const phoneNumber = "0000000000"
    
      const sellerIds = cartItems.map((item) => item.sellerId).filter(Boolean);
      const orderData = {
        mpesaCode,
        sellerId: sellerIds,
        mpesaName,
        mpesaNumber: phoneNumber,
        shippingInfo,
        products: [{ products: cartItems }],
        price: totalPrice,
        shipping_fee,
        amount,  // Ensure amount is being included
        userId: user?._id,
        customerEmail: user?.email,
      };
    
      console.log("Sending order data:", orderData);
    
      try {
        const response = await fetch("https://shaddyna-backend.onrender.com/api/orders/place-order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
          credentials: "include",
        });
    
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to place order.");
        }
    
        const result = await response.json();
        setMessage(`Order placed successfully! Order ID: ${result.orderId}`);
    
        // Ensure amount is defined before calling createPurchase API
        if (!amount || amount <= 0) {
          throw new Error("Invalid amount, cannot create purchase.");
        }
    
        const purchaseData = {
          orderId: result.orderId,
          amount: amount, // Explicitly pass amount
        };
    
        console.log("Sending purchase data:", purchaseData);

        const token = getTokenFromLocalStorage(); // Get token from localStorage
        if (!token) {
          alert("User not authenticated");
          return;
        }

        const purchaseResponse = await fetch("https://shaddyna-backend.onrender.com/api/purchase/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",  // Add this
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify(purchaseData),
          credentials: "include",
        });
        
    
        if (!purchaseResponse.ok) {
          const purchaseErrorData = await purchaseResponse.json();
          throw new Error(purchaseErrorData.message || "Failed to create purchase record.");
        }
    
        const purchaseResult = await purchaseResponse.json();
        console.log("Purchase record created successfully:", purchaseResult);
    
        clearCart();
        router.push("/");
      } catch (error) {
        console.error("Error:", error);
        setMessage(error instanceof Error ? error.message : "An error occurred.");
      }
    }*/
    
    
    return (
      <div>
        <Back title="Payment" />
        <div className="bg-gray-50 min-h-screen flex flex-col">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl text-blue-900 font-bold mb-8">Payment</h1>
            <Card className="p-6">
              <div className="flex space-x-4 mb-4">
                <Button
                  onClick={() => setActiveMethod("mpesa")}
                  className={`w-full ${activeMethod === "mpesa" ? "bg-pink-500 text-white" : "bg-gray-300 text-black"}`}
                >
                  Pay with M-Pesa
                </Button>
                <Button
                  onClick={() => setActiveMethod("savings")}
                  className={`w-full ${activeMethod === "savings" ? "bg-blue-600 text-white" : "bg-gray-300 text-black"}`}
                >
                  Pay with Savings
                </Button>
              </div>
              
              {activeMethod === "mpesa" && (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handlePayWithMpesa)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-blue-900">Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="+254 *** *** ***" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="mpesaCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-blue-900">M-Pesa Code</FormLabel>
                          <FormControl>
                            <Input placeholder="M-Pesa code" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="mpesaName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-blue-900">Name (as on M-Pesa)</FormLabel>
                          <FormControl>
                            <Input placeholder="Full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full bg-pink-500 hover:bg-pink-600 text-white">
                      Confirm Payment
                    </Button>
                  </form>
                </Form>
              )}
              
              {activeMethod === "savings" && (
                <Form {...form}>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault(); // Prevent default form submission
                      //handlePayWithSavings(); // Call handlePayWithSavings directly
                    }}
                    className="space-y-4"
                  >
                    <p className="text-blue-900">Use your savings balance to pay.</p>
                    <Button
                      type="submit"
                      className="w-full bg-[#182155] hover:bg-blue-600 text-white"
                      disabled={isLoading}
                    >
                      {isLoading ? "Processing..." : "Pay with Savings"}
                    </Button>
                  </form>
                </Form>
              )}

            </Card>
            {message && <p className="text-red-500 mt-4">{message}</p>}
          </div>
          <Footer />
        </div>
      </div>
    );
  }
  

