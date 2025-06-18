import React, { useState, useEffect } from 'react';
import { Seller } from '@/types/types';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { Badge } from './Badge';
import { GradientButton } from './GradientButton';

export const SellerList = () => {
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const response = await axios.get('https://shaddynab-new.onrender.com/api/sellers');
        const sellersWithAvatars = response.data.map((seller: Seller) => ({
          ...seller,
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(seller.name)}&background=random`
        }));
        setSellers(sellersWithAvatars);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || 'Failed to load sellers');
        } else {
          setError('Failed to load sellers');
        }
        toast.error('Failed to load sellers');
      } finally {
        setLoading(false);
      }
    };

    fetchSellers();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'green';
      case 'pending': return 'yellow';
      case 'inactive': return 'red';
      default: return 'purple';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleViewSeller = (id: string) => {
    router.push(`/sellers/${id}`);
  };

  const handleAddSeller = () => {
    router.push('/sellers/new');
  };

  if (loading) return <div className="text-center py-12">Loading sellers...</div>;
  if (error) return <div className="text-center py-12 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Seller Management</h1>
          <p className="text-gray-600 mt-1">
            {sellers.length} {sellers.length === 1 ? 'seller' : 'sellers'} registered
          </p>
        </div>
        <GradientButton  className="mt-4 md:mt-0">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          <span>Add New Seller</span>
        </GradientButton>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="grid grid-cols-12 bg-gray-50 p-4 border-b border-gray-200">
          <div className="col-span-4 font-medium text-gray-700">Seller</div>
          <div className="col-span-3 font-medium text-gray-700">Contact</div>
          <div className="col-span-2 font-medium text-gray-700">Payment</div>
          <div className="col-span-2 font-medium text-gray-700">Status</div>
          <div className="col-span-1 font-medium text-gray-700">Actions</div>
        </div>

        {sellers.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No sellers found. Add your first seller to get started.
          </div>
        ) : (
          sellers.map(seller => (
            <div key={seller._id} className="grid grid-cols-12 p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <div className="col-span-4 flex items-center">
                <img src={seller.avatar} alt={seller.name} className="w-10 h-10 rounded-full mr-3" />
                <div>
                  <p className="font-medium text-gray-900">{seller.name}</p>
                  <p className="text-sm text-gray-500">Joined {formatDate(seller.createdAt)}</p>
                </div>
              </div>
              <div className="col-span-3 flex flex-col justify-center">
                <p className="text-gray-900">{seller.email}</p>
                {seller.phoneNumber && (
                  <p className="text-sm text-gray-500">{seller.phoneNumber}</p>
                )}
              </div>
              <div className="col-span-2 flex flex-col justify-center">
                <p className="text-gray-900">KES {seller.amount}</p>
                <p className="text-xs text-gray-500">{seller.mpesaCode}</p>
              </div>
              <div className="col-span-2 flex items-center">
                <Badge color={getStatusColor(seller.status)}>
                  {seller.status.charAt(0).toUpperCase() + seller.status.slice(1)}
                </Badge>
              </div>
              <div className="col-span-1 flex items-center justify-end">
                <button
                  onClick={() => handleViewSeller(seller._id)}
                  className="text-purple-600 hover:text-purple-800 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};