"use client"
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
    { name: "Order Management", icon: <FaShoppingCart />, color: "bg-yellow-500" },
    { name: "Shipping and Delivery Management", icon: <FaTruck />, color: "bg-orange-500" },
    //{ name: "Customer Communication", icon: <FaComments />, color: "bg-indigo-500" },
    { name: "Payment and Payout Management", icon: <FaMoneyBill />, color: "bg-red-500" },
    /*{ name: "Marketing and Promotions", icon: <FaBullhorn />, color: "bg-pink-500" },
    { name: "Analytics and Reporting", icon: <FaChartLine />, color: "bg-teal-500" },
    { name: "Tax and Legal Compliance", icon: <FaBalanceScale />, color: "bg-gray-500" },
    { name: "Store Customization", icon: <FaStore />, color: "bg-cyan-500" },
    { name: "Multi-Channel Selling", icon: <FaGlobe />, color: "bg-lime-500" },*/
  ];

  return (
    <div>
      <HeadNavigation />
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="flex items-center justify-start mb-8 px-6">
          {/* Back Button */}
          <BackButton />
          
          {/* Title */}
          <h1 className="text-3xl font-bold text-center mx-auto">Shop Management</h1>
        </div>

        {/* Grid of buttons */}
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

export default SellerPage;
