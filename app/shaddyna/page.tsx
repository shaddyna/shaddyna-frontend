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


/*"use client";
import Back from "@/components/Back";
import BottomNavigationBar from "@/components/BottomNav";
import Footer from "@/components/Footer";
import ShaddynaSkills from "@/components/Skills";
import React, { useState } from "react";
import ShelfComponent from "@/components/Shelf";
import Search from "@/components/SearchShaddyna";

const ShaddynaHub = () => {
  const [activeTab, setActiveTab] = useState<"shelves" | "skills">("shelves");
  const [isSearching, setIsSearching] = useState(false); // Toggle to show only search bar

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {!isSearching && <Back title={"Shaddyna Hub"} />}
      <Search setIsSearching={setIsSearching} />

      {/* Show only search bar when searching *
      {!isSearching && (
        <>
          {/* Hero Section *
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

          {/* Toggle Buttons *
          <div className="grid grid-cols-2 gap-2 my-0 mx-3">
            <button
              onClick={() => setActiveTab("shelves")}
              className={`w-full py-3 text-base font-semibold border-b-4 transition rounded-lg ${
                activeTab === "shelves"
                  ? "text-white bg-[#bf2c7e] border-blue-900"
                  : "text-blue-900 bg-white border-gray-300 hover:border-blue-900"
              }`}
            >
              Shelves
            </button>
            <button
              onClick={() => setActiveTab("skills")}
              className={`w-full py-3 text-base font-semibold border-b-4 transition rounded-lg ${
                activeTab === "skills"
                  ? "text-white bg-[#bf2c7e] border-blue-900"
                  : "text-blue-900 bg-white border-gray-300 hover:border-blue-900"
              }`}
            >
              Skills
            </button>
          </div>

          {/* Display Shelves or Skills based on selection *
          <div className="space-y-0">
            {activeTab === "shelves" ? <ShelfComponent /> : <ShaddynaSkills />}
          </div>

          <BottomNavigationBar />
          <Footer />
        </>
      )}
    </div>
  );
};

export default ShaddynaHub;
*/

"use client";
import Back from "@/components/Back";
import BottomNavigationBar from "@/components/BottomNav";
import Footer from "@/components/Footer";
import ShaddynaSkills from "@/components/Skills";
import React, { useState } from "react";
import ShelfComponent from "@/components/Shelf";
import Search from "@/components/SearchShaddyna";

const ShaddynaHub = () => {
  const [activeTab, setActiveTab] = useState<"shelves" | "skills">("shelves");
  const [isSearching, setIsSearching] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#bf2c7e]/10 to-white flex flex-col">
      {!isSearching && <Back title={"Shaddyna Hub"} />}
      <Search setIsSearching={setIsSearching} />

      {!isSearching && (
        <>
          {/* Hero Section with Animated Gradient */}
          <div className="relative group h-48 sm:h-64 lg:h-72 mx-4 mt-4 rounded-2xl overflow-hidden transition-all duration-300">
            <div 
              className="absolute inset-0 bg-[#bf2c7e] opacity-90 animate-gradient-x"
              style={{
                backgroundSize: "400% 400%",
              }}
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center space-y-2 p-4 text-center">
              <h1 className="text-4xl sm:text-5xl font-bold text-white drop-shadow-md">
                Shaddyna Hub
              </h1>
              <p className="text-white/90 text-sm sm:text-base font-medium max-w-md">
                Explore digital shelves and developer skills
              </p>
            </div>
          </div>

          {/* Segmented Control */}
          <div className="mx-4 mt-6 bg-white p-1 rounded-xl shadow-sm border border-gray-100">
            <div className="grid grid-cols-2 gap-1">
              <button
                onClick={() => setActiveTab("shelves")}
                className={`px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === "shelves"
                    ? "bg-[#bf2c7e] text-white shadow-md"
                    : "text-blue-900 hover:bg-gray-50"
                }`}
              >
                📚 Digital Shelves
              </button>
              <button
                onClick={() => setActiveTab("skills")}
                className={`px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === "skills"
                    ? "bg-[#bf2c7e] text-white shadow-md"
                    : "text-blue-900 hover:bg-gray-50"
                }`}
              >
                💻 Developer Skills
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="mx-4 mt-4 mb-8 flex-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
              {activeTab === "shelves" ? (
                <ShelfComponent />
              ) : (
                <ShaddynaSkills />
              )}
            </div>
          </div>

          <BottomNavigationBar />
          <Footer />
        </>
      )}
    </div>
  );
};

export default ShaddynaHub;