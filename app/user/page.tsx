"use client"
import BackButton from "@/components/BackButton";
import BottomNavigationBar from "@/components/BottomNav";
import Footer from "@/components/Footer";
import HeadNavigation from "@/components/HeadNavigation";
import React from "react";
import {
  FaUser,
  
  FaShoppingCart,
  FaMoneyBill,
  FaTruck,
  FaStar,
  FaHeart,
  
} from "react-icons/fa";
import { useRouter } from "next/navigation"

const UserPage: React.FC = () => {
  const router = useRouter();
  const buttons = [
    { name: "Account Management", icon: <FaUser />, color: "bg-blue-500", action: () => router.push("/user-profile")  },
    //{ name: "Product Search and Discovery", icon: <FaSearch />, color: "bg-purple-500" },
    { name: "Order Management", icon: <FaShoppingCart />, color: "bg-green-500",action: () => router.push("/seller-order") },
    /*{ name: "Payment and Transaction Management", icon: <FaMoneyBill />, color: "bg-yellow-500" },
    /*{ name: "Delivery and Shipping", icon: <FaTruck />, color: "bg-orange-500" },
    { name: "Reviews and Feedback", icon: <FaStar />, color: "bg-indigo-500" },
    { name: "Wishlist and Favorites", icon: <FaHeart />, color: "bg-pink-500" },
    { name: "Communication", icon: <FaComments />, color: "bg-teal-500" },
    { name: "Personalization", icon: <FaSlidersH />, color: "bg-lime-500" },
    { name: "Promotions and Discounts", icon: <FaTags />, color: "bg-red-500" },
    { name: "Security and Privacy", icon: <FaShieldAlt />, color: "bg-gray-500" },
    { name: "Platform Engagement", icon: <FaHandshake />, color: "bg-amber-500" },
    { name: "Subscriptions", icon: <FaEllipsisH />, color: "bg-cyan-500" },*/
  ];

  return (
    <div>
      <HeadNavigation />
      <div className="min-h-screen bg-gray-100 py-8">
      <div className="flex items-center justify-start mb-8 px-6">
          {/* Back Button */}
          <BackButton />
          
          {/* Title */}
          <h1 className="text-3xl font-bold text-center mx-auto">User Features</h1>
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
      <Footer />
      <BottomNavigationBar />
    </div>
  );
};

export default UserPage;
