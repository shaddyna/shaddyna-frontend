import React, { useState } from 'react';
import { Order } from './OrderList';

// TypeScript interface for the props
interface OrderItemProps {
  order: Order;
}

const OrderItem: React.FC<OrderItemProps> = ({ order }) => {
  const [status, setStatus] = useState(order.deliveryStatus);

  // Function to handle status update
  const updateStatus = (newStatus: string) => {
    setStatus(newStatus);
    // You can make an API call here to update the order status in the backend.
    alert(`Order ${order._id} status updated to: ${newStatus}`);
  };

  return (
    <div className="bg-white p-5 mb-4 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold">{order.customerName}</h3>
      <p className="text-gray-600">{order.customerAddress}</p>
      <p className="text-sm text-gray-500">Order Time: {order.orderTime}</p>
      <p className="mt-2 text-lg font-medium">Status: {status}</p>
      <div className="mt-4 flex space-x-4">
        <button
          onClick={() => updateStatus('In Transit')}
          disabled={status === 'In Transit'}
          className={`px-4 py-2 rounded-md text-white transition-colors ${
            status === 'In Transit'
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-500 hover:bg-green-600'
          }`}
        >
          In Transit
        </button>
        <button
          onClick={() => updateStatus('Delivered')}
          disabled={status === 'Delivered'}
          className={`px-4 py-2 rounded-md text-white transition-colors ${
            status === 'Delivered'
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          Delivered
        </button>
      </div>
    </div>
  );
};

export default OrderItem;
