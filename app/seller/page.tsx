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
import { useUserSellerStore } from "@/store/useUserSellerStore";
import Back from "@/components/Back";
import { FaCartShopping } from "react-icons/fa6";

const SellerPage: React.FC = () => {
  const router = useRouter();
  const { user, sellers, fetchCurrentUser } = useUserSellerStore();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  const buttons = [
    { 
      name: "Shop Account Management", 
      icon: <FaUser />, 
      color: "border-[#182155]",
      action: async () => {
        if (!user) {
          console.error("User is not logged in.");
          return;
        }

        await useUserSellerStore.getState().fetchSellers();
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
      color: "border-[#ff199c]", 
      action: async () => {
        if (!user) {
          console.error("User is not logged in.");
          return;
        }

        await useUserSellerStore.getState().fetchSellers();
        const currentUserSeller = sellers.find((seller) => seller.email === user.email);

        if (!currentUserSeller) {
          console.error("Seller not found for the email:", user.email);
          setDialogMessage("Seller account not found. Please contact support.");
          setDialogOpen(true);
        } else {
          const sellerId = currentUserSeller._id;
          if (!sellerId) {
            console.error("Seller does not have a valid ID:", currentUserSeller);
            setDialogMessage("Seller ID not found. Please contact support.");
            setDialogOpen(true);
          } else {
            try {
              const response = await fetch("https://shaddyna-backend.onrender.com/api/shops/shops");
              const data = await response.json();
              const shops = data.shops;

              if (Array.isArray(shops)) {
                const hasShop = shops.some(
                  (shop) =>
                    shop.sellerId &&
                    typeof shop.sellerId === "object" &&
                    String(shop.sellerId._id) === String(sellerId)
                );

                if (hasShop) {
                  router.push("/product-add");
                } else {
                  setDialogMessage("Please create a shop first.");
                  setDialogOpen(true);
                }
              } else {
                console.error("Expected shops to be an array but got:", shops);
              }
            } catch (error) {
              setDialogMessage("An error occurred while fetching shops. Please try again later.");
              setDialogOpen(true);
            }
          }
        }
      }
    },
    { name: "Order Management", icon:  <FaCartShopping />, color: "border-[#182155]", action: () => router.push("/seller-order") },
    { name: "Payment and Payout Management", icon: <FaMoneyBill />, color: "border-[#ff199c]", action: () => router.push("/payout")},
  ];

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  return (
    <div>
      <Back title={"Seller Management"} />
      <div className="min-h-screen bg-gray-100 py-4">
       

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4">
          {buttons.map((button, index) => (
                        <button
                        key={index}
                        onClick={button.action}
                        className={`flex items-center justify-start p-3 text-gray-800 border-2 ${button.color} rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 w-full text-sm sm:px-4 sm:py-2 md:px-6 md:py-3 bg-transparent`}
                      >
                        <div className="flex items-center justify-center bg-white text-gray-800 rounded-full w-10 h-10 mr-4 shadow-md">
                          <div className="text-xl">{button.icon}</div>
                        </div>
                        <span className="font-semibold">{button.name}</span>
                      </button>
          ))}
        </div>
      </div>

      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full">
            <h2 className="text-xl font-bold">{dialogMessage}</h2>
            <button
              onClick={() => setDialogOpen(false)}
              className="mt-4 p-2 bg-[#182155] text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default SellerPage;
