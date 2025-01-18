/*"use client"
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
import Back from "@/components/Back";

const UserPage: React.FC = () => {
  const router = useRouter();
  const buttons = [
    { name: "Account Management", icon: <FaUser />, color:  "bg-[#182155]", action: () => router.push("/user-profile")  },
    //{ name: "Product Search and Discovery", icon: <FaSearch />, color: "bg-purple-500" },
    { name: "Order Management", icon: <FaShoppingCart />, color:  "bg-[#ff199c]",action: () => router.push("/user-order") },
    /*{ name: "Payment and Transaction Management", icon: <FaMoneyBill />, color: "bg-yellow-500" },
    /*{ name: "Delivery and Shipping", icon: <FaTruck />, color: "bg-orange-500" },
    { name: "Reviews and Feedback", icon: <FaStar />, color: "bg-indigo-500" },
    { name: "Wishlist and Favorites", icon: <FaHeart />, color: "bg-pink-500" },
    { name: "Communication", icon: <FaComments />, color: "bg-teal-500" },
    { name: "Personalization", icon: <FaSlidersH />, color: "bg-lime-500" },
    { name: "Promotions and Discounts", icon: <FaTags />, color: "bg-red-500" },
    { name: "Security and Privacy", icon: <FaShieldAlt />, color: "bg-gray-500" },
    { name: "Platform Engagement", icon: <FaHandshake />, color: "bg-amber-500" },
    { name: "Subscriptions", icon: <FaEllipsisH />, color: "bg-cyan-500" },
  ];

  return (
    <div>
      <Back title={"User Features"} />
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
      <Footer />
      <BottomNavigationBar />
    </div>
  );
};

export default UserPage;*/

"use client";
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
import { useRouter } from "next/navigation";
import { useUserSellerStore } from "@/store/useUserSellerStore"; // Import your Zustand store
import Back from "@/components/Back";

const UserPage: React.FC = () => {
  const router = useRouter();
  const { user } = useUserSellerStore(); // Fetch the current user from Zustand store

  const buttons = [
    {
      name: "Account Management",
      icon: <FaUser />,
      color: "bg-[#182155]",
      action: () => router.push("/user-profile"),
    },
    {
      name: "Order Management",
      icon: <FaShoppingCart />,
      color: "bg-[#ff199c]",
      action: () => {
        if (user && user._id) {
          router.push(`/orders/${user._id}`); // Navigate to the dynamic route
        } else {
          console.error("User ID not found. Ensure the user is logged in.");
        }
      },
    },
  ];

  return (
    <div>
      <Back title={"User Features"} />
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
      <Footer />
      <BottomNavigationBar />
    </div>
  );
};

export default UserPage;

