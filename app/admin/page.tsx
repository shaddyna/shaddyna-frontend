"use client"
import BottomNavigationBar from "@/components/BottomNav";
import Footer from "@/components/Footer";
import HeadNavigation from "@/components/HeadNavigation";
import React from "react";
import { useRouter } from "next/navigation";
import {
  
  FaUser,
  FaBox,
  FaShoppingCart,
  FaMoneyBill,
 
  FaTruck,
  
  FaChartLine,
  
  FaArrowLeft,
} from "react-icons/fa";
import { FaShop } from "react-icons/fa6";

const AdminPage: React.FC = () => {
  const router = useRouter();

  const buttons = [
    //{ name: "Admin Dashboard", icon: <FaChartPie />, color: "bg-blue-500", action: () => {} },
    {
      name: "User Management",
      icon: <FaUser />,
      color: "bg-purple-500",
    },
    {
      name: "Seller Management",
      icon: <FaShop />,
      color: "bg-yellow-500",
      action: () => router.push("/seller-management"),
    },
    {
      name: "Product Management",
      icon: <FaBox />,
      color: "bg-green-500",
      action: () => router.push("/product-management"),
    },
    { name: "Category Management", icon: <FaChartLine />, color: "bg-teal-500", action: () => {} },
    {
      name: "Order and Transaction Management",
      icon: <FaShoppingCart />,
      color: "bg-yellow-500",
      action: () => {},
    },
    { name: "Payment and Payout Management", icon: <FaMoneyBill />, color: "bg-red-500", action: () => {} },
    //{ name: "Communication and Notifications", icon: <FaComments />, color: "bg-indigo-500", action: () => {} },
    { name: "Shipping and Delivery Management", icon: <FaTruck />, color: "bg-orange-500", action: () => {} },
    /*{ name: "Marketing and Promotions", icon: <FaBullhorn />, color: "bg-pink-500", action: () => {} },
    { name: "Analytics and Reporting", icon: <FaChartLine />, color: "bg-teal-500", action: () => {} },
    { name: "Tax and Legal Compliance", icon: <FaBalanceScale />, color: "bg-gray-500", action: () => {} },
    { name: "Vendor Management", icon: <FaUsers />, color: "bg-amber-500", action: () => {} },
    { name: "Security and System Management", icon: <FaShieldAlt />, color: "bg-cyan-500", action: () => {} },
    {
      name: "Platform Maintenance and Updates",
      icon: <FaCogs />,
      color: "bg-lime-500",
      action: () => {},
    },
    {
      name: "User Feedback and Improvement",
      icon: <FaClipboardList />,
      color: "bg-rose-500",
      action: () => {},
    },*/
  ];

  return (
    <div>
      <HeadNavigation />
      <div className="min-h-screen bg-gray-100 py-8">
      <div className="flex items-center justify-start mb-8 px-6">
  {/* Back Button */}
  <button
    onClick={() => window.history.back()}
    className="flex items-center space-x-2 bg-[#ff199c] text-white px-5 py-2 rounded-lg text-base font-semibold hover:bg-pink-700 hover:scale-105 transition-all duration-300"
    aria-label="Go back"
  >
    <FaArrowLeft className="text-2xl" /> {/* Left arrow icon */}
    <span className="hidden sm:inline-block">Back</span> {/* Optional text for better accessibility */}
  </button>

  {/* Title */}
  <h1 className="text-3xl font-bold text-center mx-auto">Admin Management</h1>
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

export default AdminPage;