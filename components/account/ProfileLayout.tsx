// components/profile/ProfileLayout.tsx
"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import NavbarTwo from "@/components/HeaderTwo";
import LuxuryFooter from "@/components/LuxuryFooter";
import StickyBottomNavbar from "../BottomNav";

interface ProfileLayoutProps {
  children: ReactNode;
}

export const ProfileLayout = ({ children }: ProfileLayoutProps) => {
  return (
    <div className="bg-white min-h-screen">
      <NavbarTwo />
      <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl border border-[#bf2c7e] shadow-sm p-6"
        >
          {children}
        </motion.div>
      </main>
      <StickyBottomNavbar />
      <LuxuryFooter />
    </div>
  );
};