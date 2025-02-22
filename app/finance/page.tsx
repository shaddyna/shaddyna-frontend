"use client";  

import Back from "@/components/Back";
import BottomNavigationBar from "@/components/BottomNav";
import Footer from "@/components/Footer";
import { FaArrowCircleDown, FaArrowCircleUp, FaChartLine, FaRegCalendarAlt, FaRegMoneyBillAlt, FaShoppingCart } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserSellerStore } from "@/store/useUserSellerStore"; // Import the store

const MainPage = () => {
  const router = useRouter();
  const { user, fetchCurrentUser } = useUserSellerStore(); // Get user and fetchCurrentUser from the store
  const [balance, setBalance] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [savingsId, setSavingsId] = useState<string | null>(null);
  const [fullName, setFullName] = useState('');
  const [approved, setApproved] = useState('no');
  const [error, setError] = useState<string | null>(null); // For handling errors

  // Fetch token directly from localStorage
  const getTokenFromLocalStorage = () => {
    return localStorage.getItem("token");
  };

  // Fetch user savings data based on the current user from the store
  const fetchSavings = async () => {
    const token = getTokenFromLocalStorage(); // Get token from localStorage
    if (!token) {
      alert("User not authenticated");
      return;
    }

    try {
      const response = await fetch("https://shaddyna-backend.onrender.com/api/saving/savings", {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${token}`, // Use token from localStorage
        },
      });

      if (response.ok) {
        const data = await response.json();
        
        // Log the response data from the backend
        console.log("Backend Response:", data);

        // Check the balance and set the state accordingly
        if (data.balance === 0) {
          setBalance(0);
          setSavingsId(null);
          setFullName(data.fullName);
          setApproved(data.approved);
          setIsDialogOpen(true); // Open the dialog for making first saving
          setError(null); // Clear any previous errors
        } else if (data.balance >= 1) {
          setBalance(data.balance);
          setSavingsId(data.savingsId);
          setFullName(data.fullName);
          setApproved(data.approved);
          setIsDialogOpen(true); // Open the dialog for updating balance
          setError(null); // Clear any previous errors
        } else {
          setBalance(data.balance);
          setSavingsId(data.savingsId);
          setFullName(data.fullName);
          setApproved(data.approved);
          setIsDialogOpen(false); // Close the dialog if savings are found
          setError(null); // Clear any previous errors
        }
      } else if (response.status === 404) {
        setError("No savings found. Please make your first saving.");
        setIsDialogOpen(true); // Open the dialog for first saving
      } else {
        console.error('Failed to fetch savings');
        setError("An error occurred while fetching savings.");
      }
    } catch (error) {
      console.error('Error fetching savings:', error);
      setError("Error fetching savings.");
    }
  };

  // Fetch current user when the component mounts
  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  // Button actions
  const handleSaveMoneyClick = () => {
    fetchSavings();
  };

  const handleBuyGoodsClick = () => {
    router.push("/shops");
  };
  const handleUpdatePayment = () => {
    router.push("/forum");
  };

  const handleSeminarClick = () => {
    router.push("/seminar");
  };

  
  const handleInvestClick = () => {
    router.push("/shelf-list");
  };

  return (
    <div className="bg-white">
      <Back title={"Forum"} />
      <div className="min-h-screen py-0">
        <div className="container mx-auto p-4 bg-white">
          <h1 className="text-xl font-extrabold text-center text-gray-800 mb-4">Welcome to Our Forum Dashboard</h1>

          {/* Render the buttons dynamically */}
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-0">
            <button
              onClick={handleSaveMoneyClick}
              className="flex items-center justify-start p-3 text-white rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 w-full bg-[#bf2c7e] text-sm sm:px-4 sm:py-2 md:px-6 md:py-3"
            >
              <div className="flex items-center justify-center bg-white text-gray-800 rounded-full w-10 h-10 mr-4 shadow-md">
              <FaArrowCircleUp className="text-xl" />
              </div>
              <span className="font-semibold">Deposit Money</span>
            </button>
            <button
              onClick={handleInvestClick}
              className="flex items-center justify-start p-3 text-white rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 w-full bg-[#182155] text-sm sm:px-4 sm:py-2 md:px-6 md:py-3"
            >
              <div className="flex items-center justify-center bg-white text-gray-800 rounded-full w-10 h-10 mr-4 shadow-md">
                <FaChartLine className="text-xl" />
              </div>
              <span className="font-semibold">Invest</span>
            </button>
            <button
              onClick={handleSeminarClick}
              className="flex items-center justify-start p-3 text-white rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 w-full bg-[#bf2c7e] text-sm sm:px-4 sm:py-2 md:px-6 md:py-3"
            >
              <div className="flex items-center justify-center bg-white text-gray-800 rounded-full w-10 h-10 mr-4 shadow-md">
              <FaRegCalendarAlt  className="text-xl" />
              </div>
              <span className="font-semibold">Pay for Seminar</span>
            </button>
            <button
              onClick={handleBuyGoodsClick}
              className="flex items-center justify-start p-3 text-white rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 w-full bg-[#182155] text-sm sm:px-4 sm:py-2 md:px-6 md:py-3"
            >
              <div className="flex items-center justify-center bg-white text-gray-800 rounded-full w-10 h-10 mr-4 shadow-md">
                <FaShoppingCart className="text-xl" />
              </div>
              <span className="font-semibold">Buy Goods</span>
            </button>
            <button
              onClick={handleSaveMoneyClick}
              className="flex items-center justify-start p-3 text-white rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 w-full bg-[#bf2c7e] text-sm sm:px-4 sm:py-2 md:px-6 md:py-3"
            >
              <div className="flex items-center justify-center bg-white text-gray-800 rounded-full w-10 h-10 mr-4 shadow-md">
              <FaArrowCircleDown className="text-xl" />
              </div>
              <span className="font-semibold">Withdraw</span>
            </button>
            <button
              onClick={handleSaveMoneyClick}
              className="flex items-center justify-start p-3 text-white rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 w-full bg-[#182155] text-sm sm:px-4 sm:py-2 md:px-6 md:py-3"
            >
              <div className="flex items-center justify-center bg-white text-gray-800 rounded-full w-10 h-10 mr-4 shadow-md">
              <FaRegMoneyBillAlt className="text-xl" />
              </div>
              <span className="font-semibold">Savings</span>
            </button>
          </div>
        </div>
      </div>

      {/* Dialog for Savings */}
      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-semibold">Your Savings Balance</h2>
            <p>{error || `Your current balance is: ${balance}`}</p>
            <p>{error ? "Your balance is currently 0. Please make your first saving." : ""}</p>
            {balance !== 0 && (
              <button
                onClick={handleUpdatePayment}
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-full"
              >
                Update Balance
              </button>
            )}
          </div>
        </div>
      )}

      <BottomNavigationBar />
      <Footer />
    </div>
  );
};

export default MainPage;
