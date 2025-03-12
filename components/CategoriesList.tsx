/*"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CategoryShimmerLoader from "./CategoryShimmerLoader";

interface Category {
  _id: string;
  name: string;
  image: string;
}

const CategoriesList: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true); // Track fetching status
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

  const handlePaymentClick = () => {
    router.push("/payment");
  };

  const handleCategoryClick = (categoryId: string) => {
    router.push(`/categories/${categoryId}`);
  };
  return (
    <section className="my-4 p-0 lg:p-0">
      {/* Small screens: Display button before categories *
      <div className="lg:hidden w-full mb-4">
        <button
          className="w-full px-3 py-2 border-2 border-[#182155] font-bold text-[#182155] hover:text-white hover:bg-[#ff199c] rounded transition"
          onClick={handlePaymentClick}
          disabled={loading}
        >
          {loading ? "Checking..." : "Become A Seller"}
        </button>
      </div>
      <h1 className="text-xl text-gray-800 font-semibold text-center lg:hidden">
        Shop by Category
      </h1>
  
      {/* Small screens: Display categories with images *
      {isFetching ? (
        <CategoryShimmerLoader />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-3 lg:hidden">
        {categories.map((category) => (
          <div
            key={category._id}
            className="bg-gray-200 rounded-lg p-2 sm:p-3 cursor-pointer hover:bg-gray-300"
            onClick={() => handleCategoryClick(category._id)}
          >
            <div className="relative w-full h-32 sm:h-36 rounded-t-lg overflow-hidden">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover"
              />
              {/* Dark Overlay *
              <div className="absolute inset-0 bg-black bg-opacity-40 hover:bg-opacity-50 transition-opacity duration-300"></div>
            </div>
            <h3 className="text-center text-gray-800 mt-2 text-sm sm:text-base font-medium">
              {category.name}
            </h3>
          </div>
        ))}
      </div>
      
      )}
  
      {/* Larger screens: Display categories horizontally as a list *
      <div className="hidden lg:flex items-center justify-between mt-6 px-6">
        {isFetching ? (
          <div className="flex space-x-6">
            <CategoryShimmerLoader />
          </div>
        ) : (
          <>
            <div className="flex space-x-6">
              {categories.map((category) => (
                <div
                  key={category._id}
                  className="text-lg font-medium text-[#182155] hover:text-[#ff199c]"
                >
                  {category.name}
                </div>
              ))}
            </div>
            <button
              className="px-6 py-2 font-bold border-2 border-[#182155] text-[#182155] hover:text-white hover:bg-[#ff199c] rounded transition"
              onClick={handlePaymentClick}
              disabled={loading}
            >
              {loading ? "Checking..." : "Become A Seller"}
            </button>
          </>
        )}
      </div>
    </section>
  );
  
};

export default CategoriesList;*/


/*"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CategoryShimmerLoader from "./CategoryShimmerLoader";

interface Category {
  _id: string;
  name: string;
  image: string;
}

const CategoriesList: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
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

  const handlePaymentClick = () => {
    router.push("/payment");
  };

  const handleCategoryClick = (categoryId: string) => {
    router.push(`/categories/${categoryId}`);
  };

  return (
    <section className="my-4">
      {/* Button for Small Screens *
      <div className="lg:hidden w-full mb-4">
        <button
          className="w-full px-3 py-2 border-2 border-[#182155] font-bold text-[#182155] hover:text-white hover:bg-[#ff199c] rounded transition"
          onClick={handlePaymentClick}
          disabled={loading}
        >
          {loading ? "Checking..." : "Become A Seller"}
        </button>
      </div>

      {/* Title *
      <h1 className="text-xl text-gray-800 font-semibold text-center lg:hidden">
        Shop by Category
      </h1>

      {/* Category List - Scrollable for Small Screens *
      {isFetching ? (
        <CategoryShimmerLoader />
      ) : (
        <div className="flex gap-4 overflow-x-auto whitespace-nowrap scrollbar-hide p-4">
          {categories.map((category) => (
            <div
              key={category._id}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => handleCategoryClick(category._id)}
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border border-gray-300 shadow-md">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xs sm:text-sm font-medium text-gray-700 mt-2 text-center">
                {category.name}
              </h3>
            </div>
          ))}
        </div>
      )}

      {/* Larger Screens: Horizontal List *
      <div className="hidden lg:flex items-center justify-between mt-6 px-6">
        {isFetching ? (
          <CategoryShimmerLoader />
        ) : (
          <>
            <div className="flex space-x-6">
              {categories.map((category) => (
                <div
                  key={category._id}
                  className="text-lg font-medium text-[#182155] hover:text-[#ff199c] cursor-pointer"
                  onClick={() => handleCategoryClick(category._id)}
                >
                  {category.name}
                </div>
              ))}
            </div>
            <button
              className="px-6 py-2 font-bold border-2 border-[#182155] text-[#182155] hover:text-white hover:bg-[#ff199c] rounded transition"
              onClick={handlePaymentClick}
              disabled={loading}
            >
              {loading ? "Checking..." : "Become A Seller"}
            </button>
          </>
        )}
      </div>
    </section>
  );
};

export default CategoriesList;*/


"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CategoryShimmerLoader from "./CategoryShimmerLoader";

interface Category {
  _id: string;
  name: string;
  image: string;
}

const CategoriesList: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
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

  const handlePaymentClick = () => {
    router.push("/payment");
  };

  const handleCategoryClick = (categoryId: string) => {
    router.push(`/categories/${categoryId}`);
  };

  const handleMoreCategoriesClick = () => {
    router.push("/categories");
  };

  return (
    <section className="my-4">
      {/* Button for Small Screens */}
      <div className="lg:hidden w-full mb-4">
        <button
          className="w-full px-3 py-2 border-2 border-[#182155] font-bold text-[#182155] hover:text-white hover:bg-[#bf2c7e] rounded transition"
          onClick={handlePaymentClick}
          disabled={loading}
        >
          {loading ? "Checking..." : "Become A Seller"}
        </button>
      </div>

      {/* Title */}
      <h1 className="text-xl text-gray-800 font-semibold text-center lg:hidden">
        Shop by Category
      </h1>

      {/* Category List - Scrollable for Small Screens */}
      {isFetching ? (
        <CategoryShimmerLoader />
      ) : (
        <div className="flex gap-4 overflow-x-auto whitespace-nowrap scrollbar-hide p-4 items-center">
          {categories.map((category) => (
            <div
              key={category._id}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => handleCategoryClick(category._id)}
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border border-gray-300 shadow-md">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xs sm:text-sm font-medium text-gray-700 mt-2 text-center">
                {category.name}
              </h3>
            </div>
          ))}
          {/* More Categories Button */}
          <button
            className="text-xs sm:text-sm font-medium text-[#182155] hover:text-[#bf2c7e] border border-gray-300 px-2 py-1 rounded-md transition"
            onClick={handleMoreCategoriesClick}
          >
            More..
          </button>
        </div>
      )}

      {/* Larger Screens: Horizontal List */}
      <div className="hidden lg:flex items-center justify-between mt-6 px-6">
        {isFetching ? (
          <CategoryShimmerLoader />
        ) : (
          <>
            <div className="flex space-x-6 items-center">
              {categories.map((category) => (
                <div
                  key={category._id}
                  className="text-lg font-medium text-[#182155] hover:text-[#bf2c7e] cursor-pointer"
                  onClick={() => handleCategoryClick(category._id)}
                >
                  {category.name}
                </div>
              ))}
              {/* More Categories Button for Large Screens */}
              <button
                className="text-sm font-medium text-[#182155] hover:text-[#bf2c7e] border border-gray-300 px-2 py-1 rounded-md transition"
                onClick={handleMoreCategoriesClick}
              >
                More
              </button>
            </div>
            <button
              className="px-6 py-2 font-bold border-2 border-[#182155] text-[#182155] hover:text-white hover:bg-[#bf2c7e] rounded transition"
              onClick={handlePaymentClick}
              disabled={loading}
            >
              {loading ? "Checking..." : "Become A Seller"}
            </button>
          </>
        )}
      </div>
    </section>
  );
};

export default CategoriesList;



