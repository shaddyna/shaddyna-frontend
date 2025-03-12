"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CategoryShimmerLoader from "../../components/CategoryShimmerLoader";
import Back from "@/components/Back";
import Footer from "@/components/Footer";

interface Category {
  _id: string;
  name: string;
  image: string;
}

const AllCategories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      setIsFetching(true);
      try {
        const response = await fetch("https://shaddyna-backend.onrender.com/api/categories");
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        alert("An error occurred while fetching categories. Please try again later.");
      } finally {
        setIsFetching(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId: string) => {
    router.push(`/categories/${categoryId}`);
  };

  return (
    <div>
    <Back title={"Categories"} />
    <div className="min-h-screen bg-white px-3 pb-3">
      <section className="my-3 max-w-7xl mx-auto">
        <h1 className="text-xl font-extrabold text-center text-gray-900 mb-3">Explore Categories</h1>
        {isFetching ? (
          <CategoryShimmerLoader />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {categories.map((category) => (
              <div
                key={category._id}
                className="flex flex-col items-center cursor-pointer transition-transform transform hover:scale-105"
                onClick={() => handleCategoryClick(category._id)}
              >
                <div className="w-32 h-32 sm:w-40 sm:h-40 overflow-hidden rounded-xl border border-gray-200 shadow-lg bg-white">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover rounded-xl hover:opacity-90 transition-opacity duration-300"
                  />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mt-3 text-center capitalize tracking-wide">
                  {category.name}
                </h3>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
    <Footer />
    </div>
  );
};

export default AllCategories;
