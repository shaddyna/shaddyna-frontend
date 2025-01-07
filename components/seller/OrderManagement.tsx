"use client"

import React, { useState } from "react";

const OrderManagement = () => {
  const [orders, setOrders] = useState([
    {
      id: "ORD12345",
      customer: "John Doe",
      items: ["Product A", "Product B"],
      status: "Pending",
      total: "$150",
    },
    {
      id: "ORD12346",
      customer: "Jane Smith",
      items: ["Product C"],
      status: "Dispatched",
      total: "$50",
    },
  ]);

  const updateOrderStatus = (id: string, newStatus: string) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h3 className="text-xl font-bold mb-4">Order Management</h3>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b">
            <th className="p-2">Order ID</th>
            <th className="p-2">Customer</th>
            <th className="p-2">Items</th>
            <th className="p-2">Status</th>
            <th className="p-2">Total</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-b hover:bg-gray-50">
              <td className="p-2">{order.id}</td>
              <td className="p-2">{order.customer}</td>
              <td className="p-2">{order.items.join(", ")}</td>
              <td className="p-2">
                <span
                  className={`px-2 py-1 rounded-full text-sm font-medium ${
    order.status === "Pending"
      ? "bg-yellow-100 text-yellow-800"
      : order.status === "Dispatched"
      ? "bg-blue-100 text-blue-800"
      : "bg-green-100 text-green-800"
  }`}
                >
                  {order.status}
                </span>
              </td>
              <td className="p-2">{order.total}</td>
              <td className="p-2">
                <select
                  className="border rounded p-1"
                  value={order.status}
                  onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Dispatched">Dispatched</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderManagement;
