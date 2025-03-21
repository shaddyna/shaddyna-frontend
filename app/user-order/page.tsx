
"use client";
import React, { useEffect, useState } from 'react';
import { Order, Product } from '@/types/order';
import HeadNavigation from '@/components/HeadNavigation';
import BottomNavigationBar from '@/components/BottomNav';
import Footer from '@/components/Footer';
import BackButton from '@/components/BackButton';
import Back from '@/components/Back';

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
    <Back title={'Customer Orders'} />
    <div className="container mx-auto p-4">
    
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
    <Footer />
    <BottomNavigationBar />
    </div>
  );
};

export default OrderManagement;

