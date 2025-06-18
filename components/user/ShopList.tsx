import React, { useState, useEffect } from 'react';
import { Shop } from '@/types/types';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { Badge } from './Badge';
import { GradientButton } from './GradientButton';

export const ShopList = () => {
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await axios.get('https://shaddynab-new.onrender.com/api/shops');
        const shopsWithRatings = response.data.data.map((shop: Shop) => ({
          ...shop,
          rating: 4.5, // Default rating, you might fetch real ratings from your backend
          productsCount: 12 // Default product count
        }));
        setShops(shopsWithRatings);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || 'Failed to load shops');
        } else {
          setError('Failed to load shops');
        }
        toast.error('Failed to load shops');
      } finally {
        setLoading(false);
      }
    };

    fetchShops();
  }, []);

  const getStatusColor = (isActive: boolean) => {
    return isActive ? 'green' : 'red';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleViewShop = (id: string) => {
    router.push(`/shops/${id}`);
  };

  const handleAddShop = () => {
    router.push('/shops/new');
  };

  if (loading) return <div className="text-center py-12">Loading shops...</div>;
  if (error) return <div className="text-center py-12 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Shops</h1>
          <p className="text-gray-600 mt-1">
            {shops.length} {shops.length === 1 ? 'shop' : 'shops'} available
          </p>
        </div>
        <GradientButton className="mt-4 md:mt-0">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          <span>Add New Shop</span>
        </GradientButton>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {shops.length === 0 ? (
          <div className="col-span-full p-8 text-center text-gray-500 bg-white rounded-lg shadow">
            No shops found. Add your first shop to get started.
          </div>
        ) : (
          shops.map(shop => (
            <div key={shop._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all">
              <div className="relative pt-[60%] bg-gray-100">
                <img 
                  src={shop.image} 
                  alt={shop.name} 
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <Badge color={getStatusColor(shop.isActive)}>
                    {shop.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900">{shop.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">{shop.location}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-sm text-gray-600">{(shop.rating || 0).toFixed(1)}</span>
                  </div>
                </div>
                
                <div className="mt-3 flex flex-wrap gap-1">
                  {shop.categories.slice(0, 3).map((category, i) => (
                    <span key={i} className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
                      {category}
                    </span>
                  ))}
                </div>
                
                <div className="mt-4 flex justify-between items-center">
                  <p className="text-xs text-gray-500">
                    Owned by {shop.owner.firstName} {shop.owner.lastName}
                  </p>
                  <button
                    onClick={() => handleViewShop(shop._id)}
                    className="text-xs px-3 py-1 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition"
                  >
                    View Shop
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};