/*import React from 'react';

const Shop: React.FC = () => {
  const shops = [
    {
      id: '1',
      name: 'Stylish Sneakers Shop',
      location: 'New York, USA',
      image: 'https://i.pinimg.com/236x/fa/c5/71/fac571b9e25da30a89669e8848bb41db.jpg',
      description: 'A shop specializing in stylish sneakers for every occasion.',
      rating: 4.5,
      productsCount: 120,
    },
    {
      id: '2',
      name: 'Elegant Watches',
      location: 'London, UK',
      image: 'https://i.pinimg.com/236x/3d/bd/88/3dbd885b326e461ae2cdc39f0e610edf.jpg',
      description: 'High-quality, elegant watches for any occasion.',
      rating: 4.7,
      productsCount: 95,
    },
    {
      id: '3',
      name: 'Casual Clothing Store',
      location: 'Sydney, Australia',
      image: 'https://i.pinimg.com/236x/57/62/e7/5762e7b853030df4ed346844b99e3f62.jpg',
      description: 'Comfortable clothing for casual wear.',
      rating: 4.3,
      productsCount: 75,
    },
    {
      id: '4',
      name: 'Premium Tech Gadgets',
      location: 'Berlin, Germany',
      image: 'https://i.pinimg.com/236x/52/46/d6/5246d62865736d91905f64d32556ba0f.jpg',
      description: 'The latest in high-end tech gadgets and accessories.',
      rating: 4.8,
      productsCount: 150,
    },
    {
      id: '5',
      name: 'Fashionista Clothing',
      location: 'Paris, France',
      image: 'https://i.pinimg.com/236x/43/15/ae/4315ae69df9daa2550203db798b0d77f.jpg',
      description: 'Trendy fashion pieces for the modern woman.',
      rating: 4.6,
      productsCount: 110,
    },
    {
      id: '6',
      name: 'Gourmet Delights',
      location: 'Rome, Italy',
      image: 'https://i.pinimg.com/236x/cb/56/ee/cb56eee0d3371d221cd3c5253a75c2f1.jpg',
      description: 'Gourmet food items and delicacies from around the world.',
      rating: 4.9,
      productsCount: 50,
    },
    {
      id: '7',
      name: 'Outdoor Adventures',
      location: 'Denver, USA',
      image: 'https://i.pinimg.com/236x/4c/93/fb/4c93fb1339089d235e39407f6de2bff7.jpg',
      description: 'Outdoor gear for the adventurer in you.',
      rating: 4.4,
      productsCount: 90,
    },
    {
      id: '8',
      name: 'Home Essentials',
      location: 'Tokyo, Japan',
      image: 'https://i.pinimg.com/236x/60/10/1a/60101a7295810edc817856322407cb21.jpg',
      description: 'Everything you need to make your house a home.',
      rating: 4.7,
      productsCount: 200,
    },
    {
      id: '9',
      name: 'Kids Playground',
      location: 'Toronto, Canada',
      image: 'https://i.pinimg.com/236x/fa/c5/71/fac571b9e25da30a89669e8848bb41db.jpg',
      description: 'Toys and games for children of all ages.',
      rating: 4.2,
      productsCount: 65,
    },
    {
      id: '10',
      name: 'Luxury Furniture',
      location: 'Dubai, UAE',
      image: 'https://i.pinimg.com/236x/57/62/e7/5762e7b853030df4ed346844b99e3f62.jpg',
      description: 'High-end furniture pieces for your living space.',
      rating: 5.0,
      productsCount: 30,
    },
  ];

  return (
    <div className="container mx-auto pb-4">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Our Shops</h1>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {shops.map((shop) => (
          <div key={shop.id} className="max-w-sm rounded-lg border border-gray-200 shadow-lg overflow-hidden">
            {/* Shop Image *
            <img
              src={shop.image || 'https://via.placeholder.com/400x300'}
              alt={shop.name}
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              {/* Shop Name *
              <h3 className="text-xl font-semibold text-gray-800">{shop.name}</h3>
              {/* Shop Location *
              <p className="text-sm text-gray-600 mt-2">{shop.location}</p>
              {/* Shop Description *
              <p className="text-sm text-gray-500 mt-2">{shop.description}</p>
              {/* Rating and Product Count *
              <div className="flex items-center mt-4">
                <span className="text-yellow-500">⭐ {shop.rating}</span>
                <span className="ml-2 text-gray-500">({shop.productsCount} Products)</span>
              </div>
            </div>
            <div className="p-4 border-t border-gray-200">
              <a
                href={`/shop/${shop.id}`}
                className="text-[#182155] hover:text-blue-700 font-semibold"
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

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await axios.get("https://shaddyna-backend.onrender.com/api/shops/shops");
        console.log("API Response:", response.data); // Debugging the API response
        setShops(response.data.shops); // Accessing the correct shops array
      } catch (err) {
        console.error(err);
        setError("Failed to fetch shops.");
      } finally {
        setLoading(false);
      }
    };

    fetchShops();
  }, []);

  if (loading) {
    return <ShopsShimmerLoader />;
  }

  if (error) {
    return <div className="text-center text-red-600 py-6">{error}</div>;
  }

  return (
    <div className="container mx-auto pb-4">
      
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {shops.map((shop) => (
          <div
            key={shop._id} // Make sure 'id' is unique, or use '_id' if that's present
            className="max-w-sm rounded-lg border border-gray-200 shadow-lg overflow-hidden"
          >
            <img
              src={shop.image || "https://via.placeholder.com/400x300"}
              alt={shop.name}
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">{shop.name}</h3>
              <p className="text-sm text-gray-600 mt-2">{shop.location}</p>
              <p className="text-sm text-gray-500 mt-2">{shop.description}</p>
              <div className="flex items-center mt-4">
                <span className="text-yellow-500">⭐ {shop.rating}</span>
                <span className="ml-2 text-gray-500">({shop.productsCount} Products)</span>
              </div>
            </div>
            <div className="p-4 border-t border-gray-200">
            <a
                href={`/shop/${shop._id}`}
                className="text-[#182155] hover:text-blue-700 font-semibold"
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

"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import ShopsShimmerLoader from "./ShopShimmerLoader";
import { fetchShopDetails } from "@/utils/fetchShopDetails"; // Import the reusable function

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
  const [shopProductsCount, setShopProductsCount] = useState<{ [key: string]: number }>({}); // Store product count for each shop

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await axios.get(
          "https://shaddyna-backend.onrender.com/api/shops/shops"
        );
        console.log("API Response:", response.data); // Debugging the API response
        setShops(response.data.shops); // Accessing the correct shops array
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
        const { shop, products } = await fetchShopDetails(shopId); // Fetch shop details and products
        setShopProductsCount((prevState) => ({
          ...prevState,
          [shopId]: products.length, // Set product count for each shop
        }));
      } catch (error) {
        setError("Failed to fetch shop details");
      }
    };

    // Fetch details for each shop when the shops are fetched
    shops.forEach((shop) => {
      fetchShopDetailsData(shop._id); // Fetch details for each shop by shopId
    });
  }, [shops]); // Run the effect when `shops` change

  if (loading) {
    return <ShopsShimmerLoader />;
  }

  if (error) {
    return <div className="text-center text-red-600 py-6">{error}</div>;
  }

  return (
    <div className="container mx-auto pb-4">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {shops.map((shop) => (
          <div
            key={shop._id}
            className="max-w-sm rounded-lg border border-gray-200 shadow-lg overflow-hidden"
          >
            <img
              src={shop.image || "https://via.placeholder.com/400x300"}
              alt={shop.name}
              className="w-full h-56 object-cover"
            />
            <div className="p-3">
              <h3 className="text-2xl font-semibold text-gray-800">{shop.name}</h3>
              <p className="text-sm text-gray-600 mt-0"><span className="text-xl font-semibold">Loc. </span>{shop.location}</p>
              <p className="text-sm text-gray-500 mt-2">{shop.description}</p>
              <div className="flex items-center mt-4">
                <span className="text-yellow-500">⭐ {shop.rating}</span>
                <span className="ml-2 text-gray-500">
                  {shopProductsCount[shop._id]} Products {/* Display the correct count */}
                </span>
              </div>
            </div>
            <div className="p-4 border-t border-gray-200">
              <a
                href={`/shop/${shop._id}`}
                className="text-[#182155] hover:text-blue-700 font-semibold"
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

export default Shop;
