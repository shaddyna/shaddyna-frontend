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

  const handleMoreCategoriesClick = () => {
    router.push("/categories");
  };

  return (
    <section className="my-4">
      {/* Button for Small Screens *
      <div className="lg:hidden w-full mb-4">
        <button
          className="w-full px-3 py-2 border-2 border-[#182155] font-bold text-[#182155] hover:text-white hover:bg-[#bf2c7e] rounded transition"
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
          {/* More Categories Button 
          <button
            className="text-xs sm:text-sm font-medium text-[#182155] hover:text-[#bf2c7e] border border-gray-300 px-2 py-1 rounded-md transition"
            onClick={handleMoreCategoriesClick}
          >
            More..
          </button>
        </div>
      )}

      {/* Larger Screens: Horizontal List *
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
              {/* More Categories Button for Large Screens *
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
*/


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

  const handleMoreCategoriesClick = () => {
    router.push("/categories");
  };

  return (
    <section className="my-4">
      {/* Button for Small Screens 
      <div className="lg:hidden w-full mb-4">
        <button
          className="w-full px-3 py-2 border-2 border-[#182155] font-bold text-[#182155] hover:text-white hover:bg-[#bf2c7e] rounded transition"
          onClick={handlePaymentClick}
          disabled={loading}
        >
          {loading ? "Checking..." : "Become A Seller"}
        </button>
      </div>

      {/* Title and More Button Aligned *
      <div className="flex justify-between items-center px-4 lg:hidden">
        <h1 className="text-xl text-gray-800 font-semibold">Shop by Category</h1>
        <button
          className="text-xs sm:text-sm font-medium text-[#182155] hover:text-[#bf2c7e] border border-gray-300 px-2 py-1 rounded-md transition"
          onClick={handleMoreCategoriesClick}
        >
          More
        </button>
      </div>

      {/* Category List - Scrollable for Small Screens *
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
        </div>
      )}

      {/* Larger Screens: Horizontal List *
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
              {/* More Categories Button for Large Screens *
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
*/

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
        // Check if data is cached
        const cachedCategories = localStorage.getItem("categories");
        if (cachedCategories) {
          setCategories(JSON.parse(cachedCategories));
          setIsFetching(false);
          return;
        }

        // Fetch categories from API
        const response = await fetch("https://shaddyna-backend.onrender.com/api/categories");
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data);

        // Cache the data in localStorage
        localStorage.setItem("categories", JSON.stringify(data));
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

      {/* Title and More Button Aligned */}
      <div className="flex justify-between items-center px-4 lg:hidden">
        <h1 className="text-xl text-gray-800 font-semibold">Shop by Category</h1>
        <button
          className="text-xs sm:text-sm font-medium text-[#182155] hover:text-[#bf2c7e] border border-gray-300 px-2 py-1 rounded-md transition"
          onClick={handleMoreCategoriesClick}
        >
          More
        </button>
      </div>

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



