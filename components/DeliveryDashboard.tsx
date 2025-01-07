'use client'; // This marks the file as a client component

import React, { useState } from 'react';
import OrderList, { Order } from './OrderList';

const DeliveryDashboard: React.FC = () => {
  // Dummy data for orders
  const [orders] = useState<Order[]>([
    {
      _id: '1',
      customerName: 'John Doe',
      customerAddress: '1234 Elm Street',
      deliveryStatus: 'Order Placed',
      deliveryPerson: 'Tommy',
      orderTime: '2024-12-27 14:30',
    },
    {
      _id: '2',
      customerName: 'Jane Smith',
      customerAddress: '5678 Oak Avenue',
      deliveryStatus: 'Dispatched',
      deliveryPerson: 'Tommy',
      orderTime: '2024-12-27 15:00',
    },
    {
      _id: '3',
      customerName: 'Alice Johnson',
      customerAddress: '9101 Pine Road',
      deliveryStatus: 'In Transit',
      deliveryPerson: 'Tommy',
      orderTime: '2024-12-27 16:00',
    },
  ]);

  return (
    <div className="p-5 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Delivery Personnel Dashboard</h1>
      <OrderList orders={orders} />
    </div>
  );
};

export default DeliveryDashboard;
