/*"use client";

import React, { useState, useEffect } from "react";
import { FaCheckCircle, FaExclamationTriangle, FaFileAlt } from "react-icons/fa";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { useForm } from "react-hook-form";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Define a type for tax data
interface TaxData {
  month: string;
  amount: number;
  status: "Paid" | "Pending";
}

const TaxCompliance = () => {
  const [taxData, setTaxData] = useState<TaxData[]>([]); // Using the TaxData type
  const { register, handleSubmit } = useForm();

  // Example Tax Data
  useEffect(() => {
    // Example tax data. You can replace this with an API call.
    setTaxData([
      { month: "January", amount: 1000, status: "Paid" },
      { month: "February", amount: 500, status: "Pending" },
      { month: "March", amount: 1200, status: "Paid" },
    ]);
  }, []);


  const onSubmit = (data: any) => {
    console.log(data); // Handle form submission (e.g., API call)
  };

  return (
    <div className="p-6 space-y-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Tax Compliance</h1>
      </div>

      {/* Tax Compliance Status Summary *
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Tax Status</h3>
            <p className="text-2xl font-bold text-gray-600">Compliant</p>
          </div>
          <div className="text-green-500">
            <FaCheckCircle size={30} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Upcoming Tax Deadline</h3>
            <p className="text-xl font-bold text-gray-600">15th of July</p>
          </div>
          <div className="text-yellow-500">
            <FaExclamationTriangle size={30} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Tax Submissions</h3>
            <p className="text-2xl font-bold text-gray-600">5 Submitted</p>
          </div>
          <div className="text-blue-500">
            <FaFileAlt size={30} />
          </div>
        </div>
      </div>

      {/* Tax History Chart *
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Tax Payments History</h2>
      </div>

      {/* Tax Submission Form *
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Submit Tax Information</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="taxAmount" className="text-sm font-semibold text-gray-700">Tax Amount</label>
            <input
              type="number"
              id="taxAmount"
              {...register("taxAmount", { required: true })}
              className="p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Tax Amount"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="paymentDate" className="text-sm font-semibold text-gray-700">Payment Date</label>
            <input
              type="date"
              id="paymentDate"
              {...register("paymentDate", { required: true })}
              className="p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Submit Tax Information
          </button>
        </form>
      </div>

      {/* Tax Submission History *
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Tax Submission History</h2>
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left">Month</th>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {taxData.map((tax, index) => (
              <tr key={index} className="border-b">
                <td className="px-4 py-2">{tax.month}</td>
                <td className="px-4 py-2">{tax.amount > 0 ? `$${tax.amount}` : "N/A"}</td>
                <td className="px-4 py-2">
                  <span
                    className={`text-sm px-3 py-1 rounded-full ${
                      tax.status === "Paid" ? "bg-green-200 text-green-800" : "bg-yellow-200 text-yellow-800"
                    }`}
                  >
                    {tax.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaxCompliance;*/
