/*"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import ShopsShimmerLoader from "./ShopShimmerLoader";
import { fetchShopDetails } from "@/utils/fetchShopDetails";

interface Shop {
  _id: string;
  name: string;
  location: string;
  image: string;
  description: string;
  rating: number;
  productsCount: number;
}

const Shop: React.FC = () => {
  const [shops, setShops] = useState<Shop[]>([]); // Initialize as an empty array
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [shopProductsCount, setShopProductsCount] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await axios.get(
          "https://shaddyna-backend.onrender.com/api/shops/shops"
        );
        console.log("API Response:", response.data);
        setShops(response.data.shops);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch shops.");
      } finally {
        setLoading(false);
      }
    };

    fetchShops();
  }, []);

  useEffect(() => {
    const fetchShopDetailsData = async (shopId: string) => {
      try {
        const { shop, products } = await fetchShopDetails(shopId);
        setShopProductsCount((prevState) => ({
          ...prevState,
          [shopId]: products.length,
        }));
      } catch (error) {
        setError("Failed to fetch shop details");
      }
    };

    shops.forEach((shop) => {
      fetchShopDetailsData(shop._id);
    });
  }, [shops]);

  if (loading) {
    return <ShopsShimmerLoader />;
  }

  if (error) {
    return <div className="text-center text-red-600 py-6">{error}</div>;
  }

  return (
    <div className="container mx-auto pb-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {shops.map((shop) => (
          <div
            key={shop._id}
            className="bg-white rounded-lg border border-gray-200 shadow-lg overflow-hidden hover:shadow-xl transition duration-300 ease-in-out"
          >
            <img
              src={shop.image || "https://via.placeholder.com/400x300"}
              alt={shop.name}
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-800 mb-2">{shop.name}</h3>
              <p className="text-sm text-gray-600"><span className="text-lg font-semibold text-gray-800">Location: </span>{shop.location}</p>
              <p className="text-sm text-gray-700 mt-2">{shop.description}</p>
              <div className="flex items-center mt-3">
                <span className="text-yellow-500">⭐ {shop.rating}</span>
                <span className="ml-2 text-gray-600">{shopProductsCount[shop._id]} Products</span>
              </div>
            </div>
            <div className="p-4 border-t border-gray-200">
              <a
                href={`/shop/${shop._id}`}
                className="block text-center bg-[#182155] text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-300 ease-in-out"
              >
                Visit Shop
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;*/




/*"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ShopsShimmerLoader from "./ShopShimmerLoader";
import { fetchShopDetails } from "@/utils/fetchShopDetails";
import { FaMapMarkerAlt, FaStar } from "react-icons/fa";
import Link from "next/link";

interface Shop {
  _id: string;
  name: string;
  location: string;
  image: string;
  description: string;
  rating: number;
  productsCount: number;
}

const Shop: React.FC = () => {
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [shopProductsCount, setShopProductsCount] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await axios.get(
          "https://shaddyna-backend.onrender.com/api/shops/shops"
        );
        setShops(response.data.shops);
      } catch (err) {
        setError("Failed to fetch shops.");
      } finally {
        setLoading(false);
      }
    };

    fetchShops();
  }, []);

  useEffect(() => {
    const fetchShopDetailsData = async (shopId: string) => {
      try {
        const { shop, products } = await fetchShopDetails(shopId);
        setShopProductsCount((prevState) => ({
          ...prevState,
          [shopId]: products.length,
        }));
      } catch {
        setError("Failed to fetch shop details");
      }
    };

    shops.forEach((shop) => {
      fetchShopDetailsData(shop._id);
    });
  }, [shops]);

  if (loading) return <ShopsShimmerLoader />;
  if (error) return <div className="text-center text-red-600 py-3 text-lg">{error}</div>;

  return (
    <div className="container mx-auto px-0 pb-3">
      <h2 className="text-center text-xl font-bold text-gray-800 my-3">Explore Our Shops</h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {shops.map((shop) => (
          <div
            key={shop._id}
            className="bg-white rounded-md shadow-md hover:shadow-lg overflow-hidden transition-transform transform hover:scale-105 border border-gray-200"
          >
            {/* Shop Image *
            <img
              src={shop.image || "https://via.placeholder.com/300x200"}
              alt={shop.name}
              className="w-full h-36 object-cover"
            />

            {/* Shop Info *
            <div className="p-3">
              <h3 className="text-sm font-semibold text-gray-900">{shop.name}</h3>
              
              <div className="flex items-center text-xs text-gray-600 mt-1">
                <FaMapMarkerAlt className="text-red-500 mr-1" />
                {shop.location}
              </div>

              <p className="text-gray-700 text-xs mt-1 line-clamp-2">{shop.description}</p>

              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center text-xs font-medium text-gray-700">
                  <FaStar className="text-yellow-500 mr-1" />
                  {shop.rating}
                </div>
                <span className="text-xs text-gray-600">{shopProductsCount[shop._id] || 0} Products</span>
              </div>
            </div>

            {/* Visit Button *
            <div className="p-3 bg-gray-100 border-t">
              <Link
                href={`/shop/${shop._id}`}
                className="block text-center text-xs bg-[#182155] text-white font-medium py-1 px-3 rounded hover:bg-[#0f1c47] transition duration-300"
              >
                Visit Shop
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;*/

"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import ShopsShimmerLoader from "./ShopShimmerLoader";
import { fetchShopDetails } from "@/utils/fetchShopDetails";
import { FaMapMarkerAlt, FaStar } from "react-icons/fa";
import Link from "next/link";

interface Shop {
  _id: string;
  name: string;
  location: string;
  image: string;
  description: string;
  rating: number;
  productsCount: number;
}

const Shop: React.FC = () => {
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [shopProductsCount, setShopProductsCount] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await axios.get(
          "https://shaddyna-backend.onrender.com/api/shops/shops"
        );
        setShops(response.data.shops);
      } catch (err) {
        setError("Failed to fetch shops.");
      } finally {
        setLoading(false);
      }
    };

    fetchShops();
  }, []);

  useEffect(() => {
    const fetchShopDetailsData = async (shopId: string) => {
      try {
        const { shop, products } = await fetchShopDetails(shopId);
        setShopProductsCount((prevState) => ({
          ...prevState,
          [shopId]: products.length,
        }));
      } catch {
        setError("Failed to fetch shop details");
      }
    };

    shops.forEach((shop) => {
      fetchShopDetailsData(shop._id);
    });
  }, [shops]);

  if (loading) return <ShopsShimmerLoader />;
  if (error) return <div className="text-center text-red-600 py-6 text-lg">{error}</div>;

  return (
    <div className="container mx-auto px-0 pb-3">
      <h2 className="text-center text-xl font-bold text-gray-800 my-3">Explore Shops</h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {shops.map((shop) => (
          <div
            key={shop._id}
            className="bg-white rounded-md shadow-md hover:shadow-lg overflow-hidden transition-transform transform hover:scale-105 border border-gray-200"
          >
            {/* Shop Image */}
            <img
              src={shop.image || "https://via.placeholder.com/300x200"}
              alt={shop.name}
              className="w-full h-36 object-cover"
            />

            {/* Shop Info */}
            <div className="p-3">
              <h3 className="text-sm font-semibold text-gray-900">{shop.name}</h3>
              
              <div className="flex items-center text-xs text-gray-600 mt-1">
                <FaMapMarkerAlt className="text-red-500 mr-1" />
                {shop.location}
              </div>

              <p className="text-gray-700 text-xs mt-1 line-clamp-2">{shop.description}</p>

              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center text-xs font-medium text-gray-700">
                  <FaStar className="text-yellow-500 mr-1" />
                  {shop.rating}
                </div>
                <span className="text-xs text-gray-600">{shopProductsCount[shop._id] || 0} Products</span>
              </div>
            </div>

            {/* Visit Button */}
            <div className="p-3 bg-gray-100 border-t">
              <Link
                href={`/shop/${shop._id}`}
                className="block text-center text-xs bg-[#182155] text-white font-medium py-1 px-3 rounded hover:bg-[#0f1c47] transition duration-300"
              >
                Visit Shop
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
