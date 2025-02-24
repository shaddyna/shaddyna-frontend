/*"use client";

import { useState, useEffect } from "react";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";
import axios from "axios";
import Back from "@/components/Back";
import Footer from "@/components/Footer";
import BottomNavigationBar from "@/components/BottomNav";

const PaymentPage = () => {
 // const searchParams = useSearchParams();
  const searchParams = useSearchParams() as ReadonlyURLSearchParams;
const initialAmount = searchParams.get("amount") || "";


  const [activeMethod, setActiveMethod] = useState("mpesa");
  const [formData, setFormData] = useState({
    phoneNumber: "",
    mpesaCode: "",
    mpesaName: "",
    amount: initialAmount, // Set amount from query param
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setFormData((prev) => ({ ...prev, amount: initialAmount }));
  }, [initialAmount]);

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayWithMpesa = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsLoading(true);
  
    const paymentData = {
      phoneNumber: formData.phoneNumber,
      mpesaCode: formData.mpesaCode,
      mpesaName: formData.mpesaName,
      amount: formData.amount,
    };
  
    console.log("Sending M-Pesa payment data:", paymentData); // Log the data
  
    try {
      const response = await axios.post("http://localhost:5000/api/spayment/pay/mpesa", paymentData);
      console.log("M-Pesa Payment Response:", response.data); // Log the response
      setMessage(response.data.message);
    } catch (error) {
      console.error("M-Pesa Payment Error:", error);
      setMessage("Payment failed");
    }
    setIsLoading(false);
  };

  const handlePayWithSavings = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/spayment/pay/savings", {
        userId: "12345", // Replace with actual user ID
        amount: formData.amount,
      });

      setMessage(response.data.message);
    } catch (error) {
      setMessage("Payment failed");
    }
    setIsLoading(false);
  };

  return (
    <div>
      <Back title={"Seminar Payment"} />
      <div className="bg-gray-50 min-h-screen flex flex-col">
        <div className="container mx-auto px-4 py-8">
          <div className="p-6 bg-white shadow rounded">
            <div className="flex space-x-4 mb-4">
              <button
                onClick={() => setActiveMethod("mpesa")}
                className={`w-full ${activeMethod === "mpesa" ? "bg-pink-500 text-white" : "bg-gray-300 text-black"}`}
              >
                Pay with M-Pesa
              </button>
              <button
                onClick={() => setActiveMethod("savings")}
                className={`w-full ${activeMethod === "savings" ? "bg-blue-600 text-white" : "bg-gray-300 text-black"}`}
              >
                Pay with Savings
              </button>
            </div>

            {activeMethod === "mpesa" && (
              <form onSubmit={handlePayWithMpesa} className="space-y-4">
                <input type="text" name="phoneNumber" placeholder="+254 *** *** ***" value={formData.phoneNumber} onChange={handleChange} className="w-full border p-2 rounded" required />
                <input type="text" name="mpesaCode" placeholder="M-Pesa Code" value={formData.mpesaCode} onChange={handleChange} className="w-full border p-2 rounded" required />
                <input type="text" name="mpesaName" placeholder="Name (as on M-Pesa)" value={formData.mpesaName} onChange={handleChange} className="w-full border p-2 rounded" required />
                <button type="submit" className="w-full bg-pink-500 hover:bg-pink-600 text-white p-2 rounded" disabled={isLoading}>
                  {isLoading ? "Processing..." : "Confirm Payment"}
                </button>
              </form>
            )}

            {activeMethod === "savings" && (
              <form onSubmit={handlePayWithSavings} className="space-y-4">
                <input type="number" name="amount" placeholder="Amount" value={formData.amount} onChange={handleChange} className="w-full border p-2 rounded" required />
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded" disabled={isLoading}>
                  {isLoading ? "Processing..." : "Pay with Savings"}
                </button>
              </form>
            )}

            {message && <p className="text-red-500 mt-4">{message}</p>}
          </div>
        </div>
      </div>
      <Footer />
      <BottomNavigationBar />
    </div>
  );
};

export default PaymentPage;*/

"use client";

import { useState, useEffect } from "react";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Install with `npm install jwt-decode`
import Back from "@/components/Back";
import Footer from "@/components/Footer";
import BottomNavigationBar from "@/components/BottomNav";

const getTokenFromLocalStorage = () => {
  return typeof window !== "undefined" ? localStorage.getItem("token") : null;
};

const getUserIdFromToken = () => {
  const token = getTokenFromLocalStorage();
  if (!token) {
    console.log("No token found in localStorage");
    return null;
  }

  console.log("Token found:", token);

  try {
    const decoded = jwtDecode<{ id?: string }>(token); // Expect 'id' instead of 'userId'
    console.log("Decoded Token:", decoded);

    if (!decoded.id) {
      console.error("id not found in token payload");
      return null;
    }

    return decoded.id; // Use 'id' instead of 'userId'
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};


const fetchUserSavings = async () => {
  const token = getTokenFromLocalStorage();
  if (!token) {
    console.error("User not authenticated - no token");
    alert("User not authenticated");
    return null;
  }

  console.log("Fetching savings with token:", token); // Check if token is sent

  try {
    const response = await fetch("https://shaddyna-backend.onrender.com/api/saving/savings", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error("Failed to fetch savings, Response:", response);
      throw new Error("Failed to fetch savings");
    }

    const result = await response.json();
    console.log("Fetched Savings:", result);

    return result.balance || 0;
  } catch (error) {
    console.error("Error fetching savings:", error);
    return null;
  }
};


const PaymentPage = () => {
  const searchParams = useSearchParams() as ReadonlyURLSearchParams;
  const initialAmount = searchParams.get("amount") || "";

  const [activeMethod, setActiveMethod] = useState("mpesa");
  const [formData, setFormData] = useState({
    phoneNumber: "",
    mpesaCode: "",
    mpesaName: "",
    amount: initialAmount,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setFormData((prev) => ({ ...prev, amount: initialAmount }));
  }, [initialAmount]);

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayWithMpesa = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsLoading(true);
  
    const paymentData = {
      phoneNumber: formData.phoneNumber,
      mpesaCode: formData.mpesaCode,
      mpesaName: formData.mpesaName,
      amount: formData.amount,
    };
  
    console.log("Sending M-Pesa payment data:", paymentData); // Log the data
  
    try {
      const response = await axios.post("https://shaddyna-backend.onrender.com/api/spayment/pay/mpesa", paymentData);
      console.log("M-Pesa Payment Response:", response.data); // Log the response
      setMessage(response.data.message);
    } catch (error) {
      console.error("M-Pesa Payment Error:", error);
      setMessage("Payment failed");
    }
    setIsLoading(false);
  };


  const handlePayWithSavings = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsLoading(true);

    const userId = getUserIdFromToken();
    if (!userId) {
      setMessage("User not authenticated");
      setIsLoading(false);
      return;
    }

    const userSavings = await fetchUserSavings();
    if (userSavings === null) {
      setMessage("Error fetching savings. Try again.");
      setIsLoading(false);
      return;
    }

    if (userSavings < Number(formData.amount)) {
      setMessage("Insufficient savings to complete the payment.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post("https://shaddyna-backend.onrender.com/api/spayment/pay/savings", {
        userId,
        amount: formData.amount,
      });

      setMessage(response.data.message);
    } catch (error) {
      setMessage("Payment failed");
    }

    setIsLoading(false);
  };

  return (
    <div>
      <Back title={"Seminar Payment"} />
      <div className="bg-gray-50 min-h-screen flex flex-col">
        <div className="container mx-auto px-4 py-8">
          <div className="p-6 bg-white shadow rounded">
            <div className="flex space-x-4 mb-4">
              <button
                onClick={() => setActiveMethod("mpesa")}
                className={`w-full ${activeMethod === "mpesa" ? "bg-pink-500 text-white" : "bg-gray-300 text-black"}`}
              >
                Pay with M-Pesa
              </button>
              <button
                onClick={() => setActiveMethod("savings")}
                className={`w-full ${activeMethod === "savings" ? "bg-blue-600 text-white" : "bg-gray-300 text-black"}`}
              >
                Pay with Savings
              </button>
            </div>

            {/*{activeMethod === "mpesa" && (
              <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                <input type="text" name="phoneNumber" placeholder="+254 *** *** ***" value={formData.phoneNumber} onChange={handleChange} className="w-full border p-2 rounded" required />
                <input type="text" name="mpesaCode" placeholder="M-Pesa Code" value={formData.mpesaCode} onChange={handleChange} className="w-full border p-2 rounded" required />
                <input type="text" name="mpesaName" placeholder="Name (as on M-Pesa)" value={formData.mpesaName} onChange={handleChange} className="w-full border p-2 rounded" required />
                <button type="submit" className="w-full bg-pink-500 hover:bg-pink-600 text-white p-2 rounded" disabled={isLoading}>
                  {isLoading ? "Processing..." : "Confirm Payment"}
                </button>
              </form>
            )}*/}
            {activeMethod === "mpesa" && (
  <form onSubmit={handlePayWithMpesa} className="space-y-4">
    <input type="text" name="phoneNumber" placeholder="+254 *** *** ***" value={formData.phoneNumber} onChange={handleChange} className="w-full border p-2 rounded" required />
    <input type="text" name="mpesaCode" placeholder="M-Pesa Code" value={formData.mpesaCode} onChange={handleChange} className="w-full border p-2 rounded" required />
    <input type="text" name="mpesaName" placeholder="Name (as on M-Pesa)" value={formData.mpesaName} onChange={handleChange} className="w-full border p-2 rounded" required />
    <button type="submit" className="w-full bg-pink-500 hover:bg-pink-600 text-white p-2 rounded" disabled={isLoading}>
      {isLoading ? "Processing..." : "Confirm Payment"}
    </button>
  </form>
)}


            {activeMethod === "savings" && (
              <form onSubmit={handlePayWithSavings} className="space-y-4">
                <input type="number" name="amount" placeholder="Amount" value={formData.amount} onChange={handleChange} className="w-full border p-2 rounded" required />
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded" disabled={isLoading}>
                  {isLoading ? "Processing..." : "Pay with Savings"}
                </button>
              </form>
            )}

            {message && <p className="text-red-500 mt-4">{message}</p>}
          </div>
        </div>
      </div>
      <Footer />
      <BottomNavigationBar />
    </div>
  );
};

export default PaymentPage;

