"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface Category {
  id: number;
  name: string;
  image: string;
}

const categories: Category[] = [
  { id: 1, name: "Electronics", image: "https://i.pinimg.com/236x/15/20/b2/1520b25e509ef0c742551f7aa06a6356.jpg" },
  { id: 2, name: "Fashion", image: "https://i.pinimg.com/736x/fa/0c/65/fa0c65f4f5b6634e2b831c67660c900b.jpg" },
  { id: 3, name: "Home Appliances", image: "https://i.pinimg.com/236x/9f/5f/e3/9f5fe3e127b7001ba5867c00f286817e.jpg" },
  { id: 4, name: "Books", image: "https://i.pinimg.com/236x/51/5e/2b/515e2b34a3aafbd704384230328e664c.jpg" },
  { id: 5, name: "Beauty & Health", image: "https://i.pinimg.com/236x/2b/fc/29/2bfc29d683b67a7f4c233a2b8d3d4257.jpg" },
  { id: 6, name: "Sports & Outdoors", image: "https://i.pinimg.com/236x/6e/aa/48/6eaa48805969538ded9edd2b3f94153e.jpg" },
];

const CategoriesList: React.FC = () => {
  const [loading] = useState(false);
  const router = useRouter();

  /*const handlePaymentClick = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/sellers/"); // Adjust the endpoint as needed
      if (!response.ok) {
        throw new Error("Failed to fetch sellers");
      }

      const sellers = await response.json();

      // Check seller statuses
      const inactiveSeller = sellers.find((seller: any) => seller.status === "inactive");
      const pendingSeller = sellers.find((seller: any) => seller.status === "pending");

      if (inactiveSeller) {
        router.push("/payment");
      } else if (pendingSeller) {
        router.push("/processing");
      } else {
        alert("All sellers are active. No further action required.");
      }
    } catch (error) {
      console.error("Error fetching sellers:", error);
      alert("An error occurred while checking seller statuses. Please try again later.");
    } finally {
      setLoading(false);
    }
  };*/

  const handlePaymentClick = () => {
    router.push('/payment');
  }


  return (
    <section className="my-4 p-0 lg:p-0">
      {/* Small screens: Display button before categories */}
      <div className="lg:hidden w-full mb-4">
        <button
          className="w-full px-6 py-2 border-2 border-[#182155] font-bold text-[#182155] hover:text-white hover:bg-[#ff199c] rounded transition"
          onClick={handlePaymentClick}
          disabled={loading}
        >
          {loading ? "Checking..." : "Become A Seller"}
        </button>
      </div>
      <h1 className="text-2xl font-semibold text-center lg:hidden">Shop by Category</h1>
      {/* Small screens: Display categories with images */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6 lg:hidden">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-gray-200 rounded-lg p-2 sm:p-3"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-32 sm:h-36 object-cover rounded-t-lg"
            />
            <h3 className="text-center mt-2 text-sm sm:text-base font-medium">{category.name}</h3>
          </div>
        ))}
      </div>

      {/* Larger screens: Display categories horizontally as a list */}
      <div className="hidden lg:flex items-center justify-between mt-6 px-6">
        <div className="flex space-x-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="text-lg font-medium text-[#182155] hover:text-[#ff199c]"
            >
              {category.name}
            </div>
          ))}
        </div>
        <button
          className="px-6 py-2 border-2 border-[#182155] font-bold text-[#182155] hover:text-white hover:bg-[#ff199c] rounded transition"
          onClick={handlePaymentClick}
          disabled={loading}
        >
          {loading ? "Checking..." : "Become A Seller"}
        </button>
      </div>
    </section>
  );
};

export default CategoriesList;


/*"use client"
import React from "react";
import { useRouter } from 'next/navigation'

interface Category {
  id: number;
  name: string;
  image: string;
}

const categories: Category[] = [
  { id: 1, name: "Electronics", image: "https://i.pinimg.com/236x/15/20/b2/1520b25e509ef0c742551f7aa06a6356.jpg" },
  { id: 2, name: "Fashion", image: "https://i.pinimg.com/736x/fa/0c/65/fa0c65f4f5b6634e2b831c67660c900b.jpg" },
  { id: 3, name: "Home Appliances", image: "https://i.pinimg.com/236x/9f/5f/e3/9f5fe3e127b7001ba5867c00f286817e.jpg" },
  { id: 4, name: "Books", image: "https://i.pinimg.com/236x/51/5e/2b/515e2b34a3aafbd704384230328e664c.jpg" },
  { id: 5, name: "Beauty & Health", image: "https://i.pinimg.com/236x/2b/fc/29/2bfc29d683b67a7f4c233a2b8d3d4257.jpg" },
  { id: 6, name: "Sports & Outdoors", image: "https://i.pinimg.com/236x/6e/aa/48/6eaa48805969538ded9edd2b3f94153e.jpg" },
];

const CategoriesList: React.FC = () => {
  const router = useRouter(); // Moved this inside the component

  const handlePaymentClick = () => {
    router.push('/payment');
  }

  return (
    <section className="my-4 p-0 lg:p-0">
      {/* Small screens: Display button before categories *
      <div className="lg:hidden w-full mb-4">
        <button
          className="w-full px-6 py-2 border-2 border-[#182155] font-bold text-[#182155] hover:text-white hover:bg-[#ff199c] rounded transition"
          onClick={handlePaymentClick}
        >
          Become A Seller
        </button>
      </div>
      <h1 className="text-2xl font-semibold text-center lg:hidden">Shop by Category</h1>
      {/* Small screens: Display categories with images *
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6 lg:hidden">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-gray-200 rounded-lg p-2 sm:p-3"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-32 sm:h-36 object-cover rounded-t-lg"
            />
            <h3 className="text-center mt-2 text-sm sm:text-base font-medium">{category.name}</h3>
          </div>
        ))}
      </div>

      {/* Larger screens: Display categories horizontally as a list *
      <div className="hidden lg:flex items-center justify-between mt-6 px-6">
        <div className="flex space-x-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="text-lg font-medium text-[#182155] hover:text-[#ff199c]"
            >
              {category.name}
            </div>
          ))}
        </div>
        <button
          className="px-6 py-2 border-2 border-[#182155] font-bold text-[#182155] hover:text-white hover:bg-[#ff199c] rounded transition"
          onClick={handlePaymentClick}
        >
          Become A Seller
        </button>
      </div>
    </section>
  );
};

export default CategoriesList;*/


