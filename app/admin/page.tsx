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
import { FaPeopleGroup, FaShop } from "react-icons/fa6";
import Back from "@/components/Back";

const AdminPage: React.FC = () => {
  const router = useRouter();

  const buttons = [
    //{ name: "Admin Dashboard", icon: <FaChartPie />, color: "bg-blue-500", action: () => {} },
    {
      name: "User Management",
      icon: <FaUser />,
      color: "bg-[#182155]",
      action: () => router.push("/user-management"),
    },
    {
      name: "Seller Management",
      icon: <FaShop />,
      color: "bg-[#ff199c]",
      action: () => router.push("/seller-management"),
    },
    {
      name: "Product Management",
      icon: <FaBox />,
      color: "bg-[#182155]",
      action: () => router.push("/product-management"),
    },
    { name: "Category Management", 
      icon: <FaChartLine />, 
      color: "bg-[#ff199c]", 
      action: () => router.push("/category-management"),
    },
    {
      name: "Order Management",
      icon: <FaShoppingCart />,
      color: "bg-[#182155]",
      action: () => router.push("/order-management"),
    },
    { name: "Payment and Payout Management", icon: <FaMoneyBill />, color: "bg-[#ff199c]", action: () => {} },
    { name: "Members Management", icon: <FaPeopleGroup />, color: "bg-[#182155]", action: () => router.push("/members"), },
    //{ name: "Communication and Notifications", icon: <FaComments />, color: "bg-indigo-500", action: () => {} },
    /*{ name: "Shipping and Delivery Management", icon: <FaTruck />, color: "bg-orange-500", action: () => {} },
    { name: "Marketing and Promotions", icon: <FaBullhorn />, color: "bg-pink-500", action: () => {} },
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
    <Back title={"Admin Management"} />
<div>
<div className="min-h-screen bg-gray-100 py-8">
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4">
          {buttons.map((button, index) => (
            <button
              key={index}
              onClick={button.action}
              className={`flex items-center justify-start p-3 text-white rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 w-full ${button.color} text-sm sm:px-4 sm:py-2 md:px-6 md:py-3`}
            >
              <div className="flex items-center justify-center bg-white text-gray-800 rounded-full w-10 h-10 mr-4 shadow-md">
                <div className="text-xl">{button.icon}</div>
              </div>
              <span className="font-semibold">{button.name}</span>
            </button>
          ))}
        </div>
      </div>
      </div>
      <Footer />
      <BottomNavigationBar />
    </div>
  );
};

export default AdminPage;