/*"use client";
import React, { useEffect, useState } from 'react';
import { Order, Product } from '@/types/order';

// Define the possible values for order status, payment status, and delivery status
type OrderStatus = 'pending' | 'processing' | 'completed' | 'cancelled';
type PaymentStatus = 'paid' | 'unpaid';
type DeliveryStatus = 'pending' | 'shipped' | 'delivered';

const OrderManagement: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch orders data from the backend
    const fetchOrders = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/orders/orders');
        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId: string, status: OrderStatus) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        // Update status in the local state after successful update
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId ? { ...order, status } : order
          )
        );
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const updatePaymentStatus = async (orderId: string, paymentStatus: PaymentStatus) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentStatus }),
      });
      if (res.ok) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId ? { ...order, paymentStatus } : order
          )
        );
      }
    } catch (error) {
      console.error('Error updating payment status:', error);
    }
  };

  const updateDeliveryStatus = async (orderId: string, deliveryStatus: DeliveryStatus) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deliveryStatus }),
      });
      if (res.ok) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId ? { ...order, deliveryStatus } : order
          )
        );
      }
    } catch (error) {
      console.error('Error updating delivery status:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Admin Order Management</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2">Order ID</th>
              <th className="px-4 py-2">Seller ID</th>
              <th className="px-4 py-2">Product Name</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Total Amount</th>
              <th className="px-4 py-2">Payment Status</th>
              <th className="px-4 py-2">Delivery Status</th>
              <th className="px-4 py-2">MPesa Code</th>
              <th className="px-4 py-2">MPesa Name</th>
              <th className="px-4 py-2">MPesa Number</th>
              <th className="px-4 py-2">Shipping Info</th>
              <th className="px-4 py-2">Order Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={`${order.id}-${index}`}>
                <td className="px-4 py-2">{String(order.orderId)}</td>
                <td className="px-4 py-2">{String(order.sellerId)}</td>
                <td className="px-4 py-2">
                  {order.products.map((product) => product.name).join(', ')}
                </td>
                <td className="px-4 py-2">
                  {order.products[0]?.price ?? 0} {/* Assuming all products have the same price *
                </td>
                <td className="px-4 py-2">
                  {order.products.reduce((acc, product) => acc + product.quantity, 0)}
                </td>
                <td className="px-4 py-2">
                  {order.amount ?? 0}  {/* Directly fetch the amount from the order *
                </td>
                <td className="px-4 py-2">
                  <select
                    value={order.payment_status}
                    onChange={(e) =>
                      updatePaymentStatus(order.id, e.target.value as PaymentStatus)
                    }
                    className="border px-2 py-1"
                  >
                    <option value="paid">Paid</option>
                    <option value="unpaid">Unpaid</option>
                  </select>
                </td>
                <td className="px-4 py-2">
                  <select
                    value={order.delivery_status}
                    onChange={(e) =>
                      updateDeliveryStatus(order.id, e.target.value as DeliveryStatus)
                    }
                    className="border px-2 py-1"
                  >
                    <option value="pending">Pending</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </td>
                <td className="px-4 py-2">
                  {String(order.mpesaCode ?? 'N/A')}
                </td>
                <td className="px-4 py-2">
                  {String(order.mpesaName ?? 'N/A')}
                </td>
                <td className="px-4 py-2">
                  {String(order.mpesaNumber ?? 'N/A')}
                </td>
                <td className="px-4 py-2">
                  {String(order.shippingInfo ?? 'N/A')}
                </td>
                <td className="px-4 py-2">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateOrderStatus(order.id, e.target.value as OrderStatus)
                    }
                    className="border px-2 py-1"
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="px-4 py-2">
                  {/* You can add buttons here to handle delete or more actions *
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderManagement;*/

"use client";
import React, { useEffect, useState } from 'react';
import { Order, Product } from '@/types/order';
import HeadNavigation from '@/components/HeadNavigation';
import BottomNavigationBar from '@/components/BottomNav';
import Footer from '@/components/Footer';
import BackButton from '@/components/BackButton';

type OrderStatus = 'pending' | 'processing' | 'completed' | 'cancelled';
type PaymentStatus = 'paid' | 'unpaid';
type DeliveryStatus = 'pending' | 'shipped' | 'delivered';

const OrderManagement: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch('https://shaddyna-backend.onrender.com/api/orders/orders');
        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId: string, status: OrderStatus) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId ? { ...order, status } : order
          )
        );
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const updatePaymentStatus = async (orderId: string, paymentStatus: PaymentStatus) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentStatus }),
      });
      if (res.ok) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId ? { ...order, paymentStatus } : order
          )
        );
      }
    } catch (error) {
      console.error('Error updating payment status:', error);
    }
  };

  const updateDeliveryStatus = async (orderId: string, deliveryStatus: DeliveryStatus) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deliveryStatus }),
      });
      if (res.ok) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId ? { ...order, deliveryStatus } : order
          )
        );
      }
    } catch (error) {
      console.error('Error updating delivery status:', error);
    }
  };

  return (
    <div>
      <HeadNavigation />
      <div className="bg-gray-50 min-h-screen flex flex-col">
    <div className="container mx-auto p-4">
    <div className="flex items-center justify-between pb-4">
    <BackButton />
    <h1 className="text-3xl font-bold text-[#182155]">
      Admin Order
    </h1>
  </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order, index) => (
            <div
              key={`${order.id}-${index}`}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-300"
            >
              <h2 className="text-xl font-bold mb-2">Order ID: {String(order.orderId)}</h2>
              <p className="text-sm text-gray-600 mb-1">Seller ID: {String(order.sellerId)}</p>
              <p className="text-sm text-gray-600 mb-1">
                Products: {order.products.map((product) => product.name).join(', ')}
              </p>
              <p className="text-sm text-gray-600 mb-1">Price: {order.products[0]?.price ?? 0}</p>
              <p className="text-sm text-gray-600 mb-1">
                Quantity: {order.products.reduce((acc, product) => acc + product.quantity, 0)}
              </p>
              <p className="text-sm text-gray-600 mb-1">Total Amount: {order.amount ?? 0}</p>
              <p className="text-sm text-gray-600 mb-1">MPesa Code: {String(order.mpesaCode ?? 'N/A')}</p>
              <p className="text-sm text-gray-600 mb-1">MPesa Name: {String(order.mpesaName ?? 'N/A')}</p>
              <p className="text-sm text-gray-600 mb-1">MPesa Number: {String(order.mpesaNumber ?? 'N/A')}</p>
              <p className="text-sm text-gray-600 mb-1">Shipping Info: {String(order.shippingInfo ?? 'N/A')}</p>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Status:
                </label>
                <select
                  value={order.payment_status}
                  onChange={(e) =>
                    updatePaymentStatus(order.id, e.target.value as PaymentStatus)
                  }
                  className="border px-2 py-1 w-full rounded"
                >
                  <option value="paid">Paid</option>
                  <option value="unpaid">Unpaid</option>
                </select>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Delivery Status:
                </label>
                <select
                  value={order.delivery_status}
                  onChange={(e) =>
                    updateDeliveryStatus(order.id, e.target.value as DeliveryStatus)
                  }
                  className="border px-2 py-1 w-full rounded"
                >
                  <option value="pending">Pending</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                </select>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Order Status:
                </label>
                <select
                  value={order.status}
                  onChange={(e) =>
                    updateOrderStatus(order.id, e.target.value as OrderStatus)
                  }
                  className="border px-2 py-1 w-full rounded"
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
    <Footer />
    <BottomNavigationBar />
    </div>
  );
};

export default OrderManagement;

