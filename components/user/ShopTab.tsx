/*import React from 'react';
import { Shop } from '@/types/types';
import { GradientButton } from './GradientButton';
import { InfoCard } from './InfoCard';

interface ShopTabProps {
  shop: Shop;
}

export const ShopTab: React.FC<ShopTabProps> = ({ shop }) => (
  <div className="space-y-6">
    <div className="flex flex-col items-center text-center sm:flex-row sm:text-left sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
      <div className="relative">
        <img 
          src={shop.logo} 
          alt={shop.name} 
          className="w-24 h-24 rounded-xl object-cover border-4 border-white shadow-lg"
        />
        <div className="absolute -bottom-2 -right-2 bg-yellow-500 text-white rounded-full p-1 shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div>
      </div>
      <div className="flex-1">
        <h2 className="text-2xl font-bold text-gray-900">{shop.name}</h2>
        <div className="flex items-center justify-center sm:justify-start space-x-2 mt-1">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${i < Math.floor(shop.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-sm text-gray-600">({shop.rating.toFixed(1)})</span>
        </div>
        <p className="text-sm text-gray-500 mt-1">{shop.productsCount} products • {shop.joinDate}</p>
      </div>
    </div>
    
    <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-5 rounded-xl">
      <h3 className="font-semibold text-gray-900 mb-2">Shop Description</h3>
      <p className="text-gray-700">{shop.description}</p>
    </div>
    
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <InfoCard 
        value={shop.productsCount.toString()}
        title="Total Products"
        color="purple"
        isCenter
      />
      <InfoCard 
        value={shop.rating.toFixed(1)}
        title="Average Rating"
        color="blue"
        isCenter
      />
      <InfoCard 
        value="98%"
        title="Positive Reviews"
        color="green"
        isCenter
      />
    </div>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <button className="py-3 bg-white border border-purple-600 text-purple-600 rounded-xl font-medium hover:bg-purple-50 transition-all shadow-sm flex items-center justify-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
        </svg>
        <span>Edit Shop</span>
      </button>
      <GradientButton>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
        <span>Add Product</span>
      </GradientButton>
    </div>
  </div>
);*/

import React, { useState, useEffect } from 'react';
import { Shop } from '@/types/types';
import { GradientButton } from './GradientButton';
import { InfoCard } from './InfoCard';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

interface ShopTabProps {
  initialShop?: Shop;
  userId?: string; // For fetching shop by user ID
  shopId?: string; // For fetching shop by shop ID
  isOwner?: boolean; // To show edit buttons
  token: string;
}

export const ShopTab: React.FC<ShopTabProps> = ({ 
  initialShop, 
  userId, 
  shopId, 
  token,
  isOwner = false 
}) => {
  const [shop, setShop] = useState<Shop | null>(initialShop || null);
  const [loading, setLoading] = useState(!initialShop);
  const [error, setError] = useState('');
  const router = useRouter();

useEffect(() => {
  const fetchShop = async () => {
    try {
      setLoading(true);
      let url = "http://localhost:5000/api/shops";

      if (shopId) {
        url += `/${shopId}`;
        console.log("🟢 shopId used:", url);
      } else if (userId) {
        url += `/my-shop`;
        console.log("🟢 userId used:", url);
      } else {
        throw new Error("Neither shopId nor userId provided");
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(url, config);
      setShop(response.data.data);
      console.log("✅ Shop data:", response.data.data);
    } catch (err: any) {
      console.error("❌ Fetch failed:", err);
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  if (!initialShop && (userId || shopId) && token) {
    fetchShop();
  }
}, [userId, shopId, initialShop, token]);


  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleEditShop = () => {
    if (shop) {
      router.push(`/shops/${shop._id}/edit`);
    }
  };

  const handleAddProduct = () => {
    if (shop) {
      router.push(`/shops/${shop._id}/products/new`);
    }
  };

  if (loading) return <div className="text-center py-8">Loading shop...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;
  if (!shop) return <div className="text-center py-8">Shop not found</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center text-center sm:flex-row sm:text-left sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
        <div className="relative">
          <img 
            src={shop.image || '/default-shop.png'} 
            alt={shop.name} 
            className="w-24 h-24 rounded-xl object-cover border-4 border-white shadow-lg"
          />
          <div className="absolute -bottom-2 -right-2 bg-yellow-500 text-white rounded-full p-1 shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-900">{shop.name}</h2>
          <div className="flex items-center justify-center sm:justify-start space-x-2 mt-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${i < (shop.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-gray-600">({(shop.rating || 0).toFixed(1)})</span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            {shop.productsCount || 0} products • {formatDate(shop.createdAt)}
          </p>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-5 rounded-xl">
        <h3 className="font-semibold text-gray-900 mb-2">Shop Description</h3>
        <p className="text-gray-700">{shop.description}</p>
        
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-1">Location</h4>
            <p className="text-gray-600">{shop.location}</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-1">Contact</h4>
            <p className="text-gray-600">{shop.contact.email}</p>
            {shop.contact.phone && <p className="text-gray-600">{shop.contact.phone}</p>}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <InfoCard 
          value={(shop.productsCount || 0).toString()}
          title="Total Products"
          color="purple"
          isCenter
        />
        <InfoCard 
          value={(shop.rating || 0).toFixed(1)}
          title="Average Rating"
          color="blue"
          isCenter
        />
        <InfoCard 
          value={shop.isActive ? 'Active' : 'Inactive'}
          title="Status"
          color={shop.isActive ? 'green' : 'red'}
          isCenter
        />
      </div>
      
      {isOwner && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button 
            onClick={handleEditShop}
            className="py-3 bg-white border border-purple-600 text-purple-600 rounded-xl font-medium hover:bg-purple-50 transition-all shadow-sm flex items-center justify-center space-x-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
            <span>Edit Shop</span>
          </button>
          <GradientButton >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            <span>Add Product</span>
          </GradientButton>
        </div>
      )}
    </div>
  );
};