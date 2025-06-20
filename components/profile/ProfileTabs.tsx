
/*"use client";

import { motion } from "framer-motion";
import { User, ShoppingBag, BrainIcon } from "lucide-react";
import { BsShop } from "react-icons/bs";

interface Tab {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface ProfileTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isAdmin: boolean;
  isSeller: boolean;
}

export const ProfileTabs = ({ activeTab, setActiveTab, isAdmin, isSeller }: ProfileTabsProps) => {
  const tabs: Tab[] = [
    { id: "profile", label: "Profile", icon: <User size={18} /> },
    { id: "shop", label: "Shop", icon: <BsShop size={18} /> },
    { id: "orders", label: "Orders", icon: <ShoppingBag size={18} /> },
    { id: "skills", label: "Skills", icon: <BrainIcon size={18} /> },
  ];

  if (isSeller || isAdmin) {
    tabs.push({ id: "products", label: "Products", icon: <ShoppingBag size={18} /> });
  }

  if (isAdmin) {
    tabs.push(
      { id: "users", label: "Users", icon: <User size={18} /> },
      { id: "seller-requests", label: "Seller Requests", icon: <ShoppingBag size={18} /> }
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="mb-8 border-b border-[#f4b500]"
    >
      <nav className="flex space-x-8 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === tab.id
                ? "border-[#f4b500] text-[#f4b500]"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            <div className="flex items-center gap-2">
              {tab.icon}
              {tab.label}
            </div>
          </button>
        ))}
      </nav>
    </motion.div>
  );
};
*/

"use client";

import { motion } from "framer-motion";
import { User, ShoppingBag, BrainIcon } from "lucide-react";
import { BsShop } from "react-icons/bs";

interface Tab {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface ProfileTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isAdmin: boolean;
  isSeller: boolean;
  isMember: boolean; 
}

export const ProfileTabs = ({ activeTab, setActiveTab, isAdmin, isSeller, isMember }: ProfileTabsProps) => {
  const tabs: Tab[] = [
    { id: "profile", label: "Profile", icon: <User size={18} /> },
    { id: "orders", label: "Orders", icon: <ShoppingBag size={18} /> },
    { id: "skills", label: "Skills", icon: <BrainIcon size={18} /> },
  ];

  if (isSeller) {
    tabs.push({ id: "shop", label: "Shop", icon: <BsShop size={18} /> });
  }

  if (isSeller || isAdmin) {
    tabs.push({ id: "products", label: "Products", icon: <ShoppingBag size={18} /> });
  }

  if (isAdmin) {
    tabs.push(
      { id: "shops", label: "Shops", icon: <BsShop size={18} /> },
      { id: "users", label: "Users", icon: <User size={18} /> },
      { id: "seller-requests", label: "Seller Requests", icon: <ShoppingBag size={18} /> },
      { id: "member-requests", label: "Member Requests", icon: <ShoppingBag size={18} /> }
    );
  }
    if (isMember) {
    tabs.push({ id: "members", label: "Members", icon: <User size={18} /> }); // ✅ Add Members tab
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="mb-8 border-b border-[#bf2c7e]"
    >
      <nav className="flex space-x-8 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === tab.id
                ? "border-[#bf2c7e] text-[#bf2c7e]"
                : "border-transparent text-[#0f1c47] hover:text-[#bf2c7e] hover:border-[#bf2c7e]"
            }`}
          >
            <div className="flex items-center gap-2">
              {tab.icon}
              {tab.label}
            </div>
          </button>
        ))}
      </nav>
    </motion.div>
  );
};