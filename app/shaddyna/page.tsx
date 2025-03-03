/*import Back from '@/components/Back';
import BottomNavigationBar from '@/components/BottomNav';
import Footer from '@/components/Footer';
import ShaddynaSkills from '@/components/Skills';
import React from 'react';
import ShelfComponent from '@/components/Shelf';
import Search from '@/components/Search';

const ShaddynaHub = () => {
  // Dummy Data

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Back title={'Shaddyna Hub'} />
      <Search />
      <div className="space-y-0">
        <div
          className="relative h-[150px] sm:h-[300px] lg:h-[350px] bg-cover bg-center m-3 rounded-lg"
          style={{ backgroundImage: "url('https://i.pinimg.com/736x/24/f4/8a/24f48a68633249e7a31c9f19e8fdf148.jpg')" }}
        >
          <div className="absolute inset-0 bg-black opacity-20 rounded-lg"></div>
          <div className="absolute inset-0 flex justify-center items-center text-center text-white px-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">Welcome to Shaddyna Hub</h1>
          </div>
        </div>

        {/* Product Shelf Component 
        <Shelf products={products} /> *

      <ShelfComponent />

        {/* Skills Section *
        <ShaddynaSkills />
        
      </div>

      <BottomNavigationBar />
      {/*<FloatingButtonTwo />
      <FloatingButton />*
      <Footer />
    </div>
  );
};

export default ShaddynaHub;*/
"use client";
import Back from "@/components/Back";
import BottomNavigationBar from "@/components/BottomNav";
import Footer from "@/components/Footer";
import ShaddynaSkills from "@/components/Skills";
import React, { useState } from "react";
import ShelfComponent from "@/components/Shelf";
import Search from "@/components/Search";

const ShaddynaHub = () => {
  const [activeTab, setActiveTab] = useState<"shelves" | "skills">("shelves");

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Back title={"Shaddyna Hub"} />
      <Search />

      {/* Toggle Buttons */}
     {/* Toggle Buttons */}
<div className="grid grid-cols-2 gap-2 my-6 mx-4">
  <button
    onClick={() => setActiveTab("shelves")}
    className={`w-full py-4 text-lg font-semibold border-b-4 transition rounded-lg ${
      activeTab === "shelves"
        ? "text-white bg-[#bf2c7e] border-blue-900"
        : "text-blue-900 bg-white border-gray-300 hover:border-blue-900"
    }`}
  >
    Shelves
  </button>
  <button
    onClick={() => setActiveTab("skills")}
    className={`w-full py-4 text-lg font-semibold border-b-4 transition rounded-lg ${
      activeTab === "skills"
        ? "text-white bg-[#bf2c7e] border-blue-900"
        : "text-blue-900 bg-white border-gray-300 hover:border-blue-900"
    }`}
  >
    Skills
  </button>
</div>

      {/* Hero Section */}
      <div
        className="relative h-[150px] sm:h-[300px] lg:h-[350px] bg-cover bg-center m-3 rounded-lg"
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/736x/24/f4/8a/24f48a68633249e7a31c9f19e8fdf148.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-20 rounded-lg"></div>
        <div className="absolute inset-0 flex justify-center items-center text-center text-white px-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Welcome to Shaddyna Hub
          </h1>
        </div>
      </div>

      {/* Display Shelves or Skills based on selection */}
      <div className="space-y-0">
        {activeTab === "shelves" ? <ShelfComponent /> : <ShaddynaSkills />}
      </div>

      <BottomNavigationBar />
      <Footer />
    </div>
  );
};

export default ShaddynaHub;
