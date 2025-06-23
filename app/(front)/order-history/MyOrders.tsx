/*'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import useSWR from 'swr';

import  Order  from '@/lib/models/OrderModel';

type Order = {
  _id: string;
  createdAt: string;
  totalPrice: number;
  isPaid: boolean;
  paidAt?: string;
  isDelivered: boolean;
  deliveredAt?: string;
};


const MyOrders = () => {
  const router = useRouter();
  const { data: orders, error, isLoading } = useSWR('/api/orders/mine');

  if (error) return <>An error has occurred</>;
  if (isLoading) return <>Loading...</>;
  if (!orders) return <>No orders...</>;

  return (
    <div className='overflow-x-auto'>
      <table className='table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>DATE</th>
            <th>TOTAL</th>
            <th>PAID</th>
            <th>DELIVERED</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order: Order) => (
            <tr key={order._id}>
              <td>{order._id.substring(20, 24)}</td>
              <td className='whitespace-nowrap'>
                {order.createdAt.substring(0, 10)}
              </td>
              <td>Ksh {order.totalPrice}</td>
              <td>
                {order.isPaid && order.paidAt
                  ? `${order.paidAt.substring(0, 10)}`
                  : 'not paid'}
              </td>
              <td>
                {order.isDelivered && order.deliveredAt
                  ? `${order.deliveredAt.substring(0, 10)}`
                  : 'not delivered'}
              </td>
              <td>
                <Link href={`/order/${order._id}`} passHref>
                  Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyOrders;*/

'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import useSWR from 'swr';

type Order = {
  _id: string;
  createdAt: string;
  totalPrice: number;
  isPaid: boolean;
  paidAt?: string;
  isDelivered: boolean;
  deliveredAt?: string;
};

const MyOrders = () => {
  const router = useRouter();
  const { data: orders, error, isLoading } = useSWR('/api/orders/mine');

  if (error) return <div className="text-center py-10 text-red-500">An error occurred loading your orders</div>;
  if (isLoading) return <div className="text-center py-10">Loading your orders...</div>;
  if (!orders || orders.length === 0) return (
    <div className="text-center py-10">
      <div className="text-gray-500 mb-4">You haven't placed any orders yet</div>
      <Link 
        href="/" 
        className="inline-block px-6 py-2 bg-[#bf2c7e] text-white rounded-lg hover:bg-[#9e2468] transition-colors"
      >
        Start Shopping
      </Link>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Orders</h1>
      
      {/* Desktop Table (md and up) */}
      <div className="hidden md:block bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="grid grid-cols-12 bg-gray-50 p-4 border-b border-gray-200">
          <div className="col-span-1 text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</div>
          <div className="col-span-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Date</div>
          <div className="col-span-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Total</div>
          <div className="col-span-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</div>
          <div className="col-span-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Delivery</div>
          <div className="col-span-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</div>
        </div>

        <div className="divide-y divide-gray-200">
          {orders.map((order: Order) => (
            <div key={order._id} className="grid grid-cols-12 p-4 hover:bg-gray-50 transition-colors duration-150">
              <div className="col-span-1 flex items-center text-sm font-medium text-gray-900">
                #{order._id.substring(20, 24)}
              </div>
              <div className="col-span-3 flex items-center text-sm text-gray-500">
                {new Date(order.createdAt).toLocaleDateString()}
              </div>
              <div className="col-span-2 flex items-center text-sm font-medium text-gray-900">
                Ksh {order.totalPrice.toFixed(2)}
              </div>
              <div className="col-span-2 flex items-center">
                {order.isPaid ? (
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                    Paid {order.paidAt && new Date(order.paidAt).toLocaleDateString()}
                  </span>
                ) : (
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                    Pending
                  </span>
                )}
              </div>
              <div className="col-span-2 flex items-center">
                {order.isDelivered ? (
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                    Delivered {order.deliveredAt && new Date(order.deliveredAt).toLocaleDateString()}
                  </span>
                ) : (
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                    Processing
                  </span>
                )}
              </div>
              <div className="col-span-2 flex items-center justify-end">
                <Link
                  href={`/order/${order._id}`}
                  className="text-sm font-medium text-[#bf2c7e] hover:text-[#9e2468] transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Cards (sm and below) */}
      <div className="md:hidden space-y-4">
        {orders.map((order: Order) => (
          <div key={order._id} className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
            <div className="flex justify-between items-start mb-3">
              <div>
                <div className="text-xs text-gray-500">Order #</div>
                <div className="font-medium text-gray-900">#{order._id.substring(20, 24)}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-500">Date</div>
                <div className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</div>
              </div>
            </div>
            
            <div className="flex justify-between items-center mb-3">
              <div>
                <div className="text-xs text-gray-500">Total</div>
                <div className="font-medium text-gray-900">Ksh {order.totalPrice.toFixed(2)}</div>
              </div>
              <Link
                href={`/order/${order._id}`}
                className="px-3 py-1 text-sm rounded-md bg-[#bf2c7e] text-white hover:bg-[#9e2468] transition-colors"
              >
                View
              </Link>
            </div>
            
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-100">
              <div>
                <div className="text-xs text-gray-500 mb-1">Payment</div>
                {order.isPaid ? (
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                    Paid {order.paidAt && new Date(order.paidAt).toLocaleDateString()}
                  </span>
                ) : (
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                    Pending
                  </span>
                )}
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Delivery</div>
                {order.isDelivered ? (
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                    Delivered {order.deliveredAt && new Date(order.deliveredAt).toLocaleDateString()}
                  </span>
                ) : (
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                    Processing
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;