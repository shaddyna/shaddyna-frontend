"use client"

import React, { useEffect } from "react";

import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const AnalyticsReporting = () => {
 
  useEffect(() => {
    // Fetch your analytics data (e.g., from an API)
   
  }, []);


  // Sample table data
  const tableData = [
    { product: "Product 1", sales: 120, revenue: "$2000" },
    { product: "Product 2", sales: 85, revenue: "$1500" },
    { product: "Product 3", sales: 45, revenue: "$800" },
    { product: "Product 4", sales: 200, revenue: "$3500" },
  ];

  return (
    <div className="p-6 space-y-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Analytics Reporting</h1>
        <button className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300">
          Export Report
        </button>
      </div>

      {/* Sales and Revenue Chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Sales Over Time</h2>
       
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Revenue Over Time</h2>
          
        </div>
      </div>

      {/* Product Sales Chart */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Product Sales</h2>
        
      </div>

      {/* Table of Analytics */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Sales Data</h2>
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left">Product</th>
              <th className="px-4 py-2 text-left">Sales</th>
              <th className="px-4 py-2 text-left">Revenue</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index} className="border-b">
                <td className="px-4 py-2">{row.product}</td>
                <td className="px-4 py-2">{row.sales}</td>
                <td className="px-4 py-2">{row.revenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Insights Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Total Sales</h3>
            <p className="text-2xl font-bold text-gray-600">$12,500</p>
          </div>
          <div className="text-green-500">
            <FaArrowUp size={24} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">New Orders</h3>
            <p className="text-2xl font-bold text-gray-600">85</p>
          </div>
          <div className="text-red-500">
            <FaArrowDown size={24} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Total Revenue</h3>
            <p className="text-2xl font-bold text-gray-600">$35,000</p>
          </div>
          <div className="text-green-500">
            <FaArrowUp size={24} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsReporting;
