import BackButton from "@/components/BackButton";
import BottomNavigationBar from "@/components/BottomNav";
import Footer from "@/components/Footer";
import HeadNavigation from "@/components/HeadNavigation";
import React from "react";
import {
  FaTruck,
  FaClipboardList,
  FaMapMarkerAlt,
  FaClock,
  FaCheckCircle,
  FaPhone,
  FaDollarSign,
  FaChartLine,
  FaShieldAlt,
  FaCog,
} from "react-icons/fa";

const DeliveryPersonnelPage: React.FC = () => {
  const buttons = [
    { name: "Delivery Dashboard", icon: <FaTruck />, color: "bg-blue-500" },
    { name: "Order List and Details", icon: <FaClipboardList />, color: "bg-purple-500" },
    { name: "Route Management", icon: <FaMapMarkerAlt />, color: "bg-green-500" },
    { name: "Schedule and Timing", icon: <FaClock />, color: "bg-yellow-500" },
    { name: "Delivery Confirmation", icon: <FaCheckCircle />, color: "bg-orange-500" },
    { name: "Customer Communication", icon: <FaPhone />, color: "bg-indigo-500" },
    { name: "Payment Collection", icon: <FaDollarSign />, color: "bg-pink-500" },
    { name: "Performance Tracking", icon: <FaChartLine />, color: "bg-teal-500" },
    { name: "Safety and Security", icon: <FaShieldAlt />, color: "bg-gray-500" },
    { name: "Settings and Preferences", icon: <FaCog />, color: "bg-cyan-500" },
  ];

  return (
    <div>
      <HeadNavigation />
      <div className="min-h-screen bg-gray-100 py-8">
      <div className="flex items-center justify-start mb-8 px-6">
          {/* Back Button */}
          <BackButton />
          
          {/* Title */}
          <h1 className="text-3xl font-bold text-center mx-auto">Delivery Personnel Features</h1>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4">
          {buttons.map((button, index) => (
            <div
              key={index}
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

export default DeliveryPersonnelPage;
