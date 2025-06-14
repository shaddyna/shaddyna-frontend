import React from 'react';
import { Order } from '@/types/types';

interface OrdersTabProps {
  orders: Order[];
}

export const OrdersTab: React.FC<OrdersTabProps> = ({ orders }) => (
  <div className="space-y-6">
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
        <p className="text-sm text-gray-500">Track your purchases and sales</p>
      </div>
      <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all shadow-sm flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
        <span>Export</span>
      </button>
    </div>
    
    <div className="space-y-3">
      {orders.map(order => (
        <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-all">
          <div className="flex items-start space-x-4">
            <div className="relative flex-shrink-0">
              <img 
                src={order.thumbnail} 
                alt={`Order ${order.id}`} 
                className="w-16 h-16 rounded-lg object-cover"
              />
              <span className="absolute -top-2 -right-2 bg-white rounded-full p-0.5 shadow-sm">
                <span className="block w-5 h-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center">
                  {order.items}
                </span>
              </span>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-900">Order #{order.id.split('-')[1]}</h3>
                  <p className="text-xs text-gray-500">{new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  order.status === 'completed' ? 'bg-green-100 text-green-800' :
                  order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
              <div className="flex justify-between items-center mt-3">
                <span className="text-sm font-semibold text-gray-900">${order.total.toFixed(2)}</span>
                <button className="text-xs px-3 py-1 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition">
                  Track
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);