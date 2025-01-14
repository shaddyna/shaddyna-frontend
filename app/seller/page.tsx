/*"use client"
import BottomNavigationBar from "@/components/BottomNav";
import Footer from "@/components/Footer";
import HeadNavigation from "@/components/HeadNavigation";
import React from "react";
import { FaUser, FaBox, FaShoppingCart, FaMoneyBill, FaTruck } from "react-icons/fa";
import BackButton from "@/components/BackButton";  // Import the BackButton component
import { useRouter } from "next/navigation";

const SellerPage: React.FC = () => {
  const router = useRouter();
  const buttons = [
    //{ name: "Seller Dashboard", icon: <FaChartPie />, color: "bg-blue-500" },
    { name: "Shop Account Management", 
      icon: <FaUser />, color: "bg-purple-500",
      action: () => router.push("/shop-creation"),
     },
    { name: "Product Management", 
      icon: <FaBox />, color: "bg-green-500",
      action: () => router.push("/product-add") },
    { name: "Order Management", icon: <FaShoppingCart />, color: "bg-yellow-500", action: () => router.push("/seller-order") },
    //{ name: "Shipping and Delivery Management", icon: <FaTruck />, color: "bg-orange-500" },
    //{ name: "Customer Communication", icon: <FaComments />, color: "bg-indigo-500" },
    { name: "Payment and Payout Management", icon: <FaMoneyBill />, color: "bg-red-500" },
    /*{ name: "Marketing and Promotions", icon: <FaBullhorn />, color: "bg-pink-500" },
    { name: "Analytics and Reporting", icon: <FaChartLine />, color: "bg-teal-500" },
    { name: "Tax and Legal Compliance", icon: <FaBalanceScale />, color: "bg-gray-500" },
    { name: "Store Customization", icon: <FaStore />, color: "bg-cyan-500" },
    { name: "Multi-Channel Selling", icon: <FaGlobe />, color: "bg-lime-500" },*/
  /*];

  return (
    <div>
      <HeadNavigation />
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="flex items-center justify-start mb-8 px-6">
          {/* Back Button *
          <BackButton />
          
          {/* Title *
          <h1 className="text-3xl font-bold text-center mx-auto">Shop Management</h1>
        </div>

        {/* Grid of buttons *
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4">
          {buttons.map((button, index) => (
            <div
              key={index}
              onClick={button.action}
              className={`flex flex-col items-center justify-center p-6 text-white rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 ${button.color}`}
            >
              <div className="text-4xl mb-4">{button.icon}</div>
              <p className="text-center text-lg font-semibold">{button.name}</p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
      <BottomNavigationBar />
    </div>
  );
};

export default SellerPage;*/

"use client";
import BottomNavigationBar from "@/components/BottomNav";
import Footer from "@/components/Footer";
import HeadNavigation from "@/components/HeadNavigation";
import React, { useEffect, useState } from "react";
import { FaUser, FaBox, FaShoppingCart, FaMoneyBill } from "react-icons/fa";
import BackButton from "@/components/BackButton";
import { useRouter } from "next/navigation";
import { useUserSellerStore } from "@/store/useUserSellerStore"; // Importing the store

const SellerPage: React.FC = () => {
  const router = useRouter();
  const { user, sellers, fetchCurrentUser } = useUserSellerStore();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  const buttons = [
    { 
      name: "Shop Account Management", 
      icon: <FaUser />, 
      color: "bg-purple-500",
      action: async () => {
        if (!user) {
          console.error("User is not logged in.");
          return;
        }

        // Fetch sellers from the store if not already loaded
        await useUserSellerStore.getState().fetchSellers();

        // Find the current user seller status by comparing the email
        const currentUserSeller = sellers.find(seller => seller.email === user.email);

        if (currentUserSeller) {
          if (currentUserSeller.status === 'pending') {
            setDialogMessage("Please wait for your status to be approved.");
            setDialogOpen(true);
          } else if (currentUserSeller.status === 'active') {
            router.push("/shop-creation");
          }
        } else {
          console.error("Seller not found.");
        }
      }
    },
    { 
      name: "Product Management", 
      icon: <FaBox />, 
      color: "bg-green-500", 
      action: async () => {
        if (!user) {
          console.error("User is not logged in.");
          return;
        }

        // Fetch sellers from the store if not already loaded
        await useUserSellerStore.getState().fetchSellers();

        const currentUserSeller = sellers.find((seller) => seller.email === user.email);

        if (!currentUserSeller) {
          console.error("Seller not found for the email:", user.email);
          setDialogMessage("Seller account not found. Please contact support.");
          setDialogOpen(true);
        } else {
          console.log("Found seller:", currentUserSeller);
        
          const sellerId = currentUserSeller._id;
          if (!sellerId) {
            console.error("Seller does not have a valid ID:", currentUserSeller);
            setDialogMessage("Seller ID not found. Please contact support.");
            setDialogOpen(true);
          } else {
            try {
              const response = await fetch("https://shaddyna-backend.onrender.com/api/shops/shops");
              const data = await response.json();
              console.log("Fetched Shops Data:", data);
        
              const shops = data.shops;
        
              if (Array.isArray(shops)) {
                // Debug all seller IDs in the shops array
                shops.forEach((shop) => {
                  if (shop.sellerId && typeof shop.sellerId === "object" && shop.sellerId._id) {
                    console.log(`Shop Seller ID: ${shop.sellerId._id}, Current Seller ID: ${sellerId}`);
                  } else {
                    console.warn(`Invalid sellerId format in shop:`, shop);
                  }
                });
        
                // Compare sellerId with each shop's sellerId._id (normalize IDs for comparison)
                const hasShop = shops.some(
                  (shop) =>
                    shop.sellerId &&
                    typeof shop.sellerId === "object" &&
                    String(shop.sellerId._id) === String(sellerId)
                );
                console.log("Does the seller have a shop?", hasShop);
        
                if (hasShop) {
                  console.log("Seller has a shop. Redirecting...");
                  router.push("/product-add");
                } else {
                  console.log("Seller does not have a shop.");
                  setDialogMessage("Please create a shop first.");
                  setDialogOpen(true);
                }
              } else {
                console.error("Expected shops to be an array but got:", shops);
              }
            } catch (error) {
              console.error("Error fetching shops:", error);
              setDialogMessage("An error occurred while fetching shops. Please try again later.");
              setDialogOpen(true);
            }
          }
        }
        
        
        
             
      }
    },
    { name: "Order Management", icon: <FaShoppingCart />, color: "bg-yellow-500", action: () => router.push("/seller-order") },
    { name: "Payment and Payout Management", icon: <FaMoneyBill />, color: "bg-red-500" },
  ];

  useEffect(() => {
    // Fetch the current user when the component mounts
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  return (
    <div>
      <HeadNavigation />
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="flex items-center justify-start mb-8 px-6">
          <BackButton />
          <h1 className="text-3xl font-bold text-center mx-auto">Shop Management</h1>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4">
          {buttons.map((button, index) => (
            <div
              key={index}
              onClick={button.action}
              className={`flex flex-col items-center justify-center p-6 text-white rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 ${button.color}`}
            >
              <div className="text-4xl mb-4">{button.icon}</div>
              <p className="text-center text-lg font-semibold">{button.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Dialog for approval message */}
      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full">
            <h2 className="text-xl font-bold">{dialogMessage}</h2>
            <button
              onClick={() => setDialogOpen(false)}
              className="mt-4 p-2 bg-blue-500 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <Footer />
      <BottomNavigationBar />
    </div>
  );
};

export default SellerPage;
