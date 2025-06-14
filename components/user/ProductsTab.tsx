/*import React from 'react';
import { Product } from '@/types/types';
import { GradientButton } from './GradientButton';

interface ProductsTabProps {
  products: Product[];
}

export const ProductsTab: React.FC<ProductsTabProps> = ({ products }) => (
  <div className="space-y-6">
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
      <div>
        <h2 className="text-xl font-bold text-gray-900">My Products</h2>
        <p className="text-sm text-gray-500">Manage your product listings</p>
      </div>
      <GradientButton className="px-4 py-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
        <span>Add New</span>
      </GradientButton>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map(product => (
        <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all">
          <div className="relative pt-[70%] bg-gray-100">
            <img 
              src={product.thumbnail} 
              alt={product.name} 
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
            <div className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
              </svg>
            </div>
          </div>
          <div className="p-4">
            <div className="flex justify-between items-start">
              <h3 className="font-medium text-gray-900">{product.name}</h3>
              <span className="text-purple-600 font-semibold">${product.price.toFixed(2)}</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">{product.category}</p>
            
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center space-x-1">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-xs text-gray-500">{product.rating.toFixed(1)}</span>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${
                product.stock > 10 ? 'bg-green-100 text-green-800' : 
                product.stock > 0 ? 'bg-yellow-100 text-yellow-800' : 
                'bg-red-100 text-red-800'
              }`}>
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-2 mt-4">
              <button className="text-xs py-1.5 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition">
                Edit
              </button>
              <button className="text-xs py-1.5 bg-purple-600 text-white rounded hover:bg-purple-700 transition">
                View
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);*/

import React, { useState, useEffect } from 'react';
import { Product } from '@/types/types';
import { GradientButton } from './GradientButton';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

interface ProductsTabProps {
  initialProducts?: Product[];
  shopId?: string;
  userId?: string;
  isOwner?: boolean;
  token: string;
}

export const ProductsTab: React.FC<ProductsTabProps> = ({ 
  initialProducts = [], 
  shopId, 
  userId,
   token,
  isOwner = false 
}) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [loading, setLoading] = useState(!initialProducts.length);
  const [error, setError] = useState('');
  const router = useRouter();

useEffect(() => {
  const fetchProducts = async () => {
    try {
      setLoading(true);
      let url = 'http://localhost:5000/api/products';

      if (shopId) {
        url += `/shop/${shopId}`;
        console.log("🔵 Fetching products by shopId:", shopId);
      } else if (userId) {
        url += `/user/${userId}`;
        console.log("🔵 Fetching products by userId:", userId);
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(url, config);

      const productsWithThumbnail = response.data.products.map((product: Product) => ({
        ...product,
        thumbnail: product.images[0] || '/default-product.png',
        rating: 4.5,
      }));

      setProducts(productsWithThumbnail);
      toast.success('✅ Products loaded successfully!');
      console.log("✅ Products data:", productsWithThumbnail);
    } catch (err) {
      let message = '❌ Failed to load products';
      if (axios.isAxiosError(err)) {
        message = err.response?.data?.message || message;
      } else if (err instanceof Error) {
        message = err.message;
      }

      setError(message);
      toast.error(message);
      console.error("❌ Error loading products:", err);
    } finally {
      setLoading(false);
    }
  };

  // Only run once when shopId/userId/token is ready
  if ((shopId || userId) && token && products.length === 0) {
    fetchProducts();
  }
}, [shopId, userId, token]);


  const handleAddNew = () => {
    if (shopId) {
      router.push(`/shops/${shopId}/products/new`);
    } else {
      router.push('/products/new');
    }
  };

  const handleEdit = (productId: string) => {
    router.push(`/products/${productId}/edit`);
  };

  const handleView = (productId: string) => {
    router.push(`/products/${productId}`);
  };

  if (loading) return <div className="text-center py-8">Loading products...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;
  if (!products.length) return (
    <div className="text-center py-12">
      <div className="mx-auto w-24 h-24 text-gray-300 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-900">No products found</h3>
      <p className="text-gray-500 mt-1">Get started by adding your first product</p>
      {isOwner && (
        <div className="mt-6">
          <GradientButton  className="px-4 py-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            <span>Add New Product</span>
          </GradientButton>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            {shopId ? 'Shop Products' : userId ? 'My Products' : 'All Products'}
          </h2>
          <p className="text-sm text-gray-500">
            {products.length} {products.length === 1 ? 'product' : 'products'} found
          </p>
        </div>
        {isOwner && (
          <GradientButton  className="px-4 py-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            <span>Add New</span>
          </GradientButton>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map(product => (
          <div key={product._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all">
            <div className="relative pt-[70%] bg-gray-100">
              <img 
                src={product.thumbnail} 
                alt={product.name} 
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
              {isOwner && (
                <div className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                </div>
              )}
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start">
                <h3 className="font-medium text-gray-900">{product.name}</h3>
                <span className="text-purple-600 font-semibold">${product.price.toFixed(2)}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {product.category.brand} • {product.category.main}
              </p>
              
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center space-x-1">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-3 h-3 ${i < (product.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">{(product.rating || 0).toFixed(1)}</span>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  product.stock > 10 ? 'bg-green-100 text-green-800' : 
                  product.stock > 0 ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-red-100 text-red-800'
                }`}>
                  {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-2 mt-4">
                <button 
                  onClick={() => handleEdit(product._id)}
                  className="text-xs py-1.5 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleView(product._id)}
                  className="text-xs py-1.5 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
                >
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};