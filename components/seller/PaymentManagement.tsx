"use client"

import React, { useState } from "react";

const PaymentManagement = () => {
  const [payoutRequests] = useState([
    { id: 1, amount: "$500", status: "Pending", date: "2024-12-20" },
    { id: 2, amount: "$1200", status: "Completed", date: "2024-12-15" },
  ]);

  const handleRequestPayout = () => {
    alert("Request payout functionality will be implemented here.");
  };

  const handleViewDetails = (id: number) => {
    alert(`Viewing details for payout ID: ${id}`);
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Payment and Payout Management</h2>

      <div className="mb-6">
        <h3 className="text-lg font-semibold">Payout Requests</h3>
        <table className="table-auto w-full border-collapse border border-gray-300 mt-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">ID</th>
              <th className="border border-gray-300 p-2">Amount</th>
              <th className="border border-gray-300 p-2">Status</th>
              <th className="border border-gray-300 p-2">Date</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {payoutRequests.map((request) => (
              <tr key={request.id} className="text-center">
                <td className="border border-gray-300 p-2">{request.id}</td>
                <td className="border border-gray-300 p-2">{request.amount}</td>
                <td
                  className={`border border-gray-300 p-2 font-semibold ${
                    request.status === "Completed"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  {request.status}
                </td>
                <td className="border border-gray-300 p-2">{request.date}</td>
                <td className="border border-gray-300 p-2">
                  <button
                    onClick={() => handleViewDetails(request.id)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-center mt-6">
        <button
          onClick={handleRequestPayout}
          className="px-6 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600"
        >
          Request Payout
        </button>
      </div>
    </div>
  );
};

export default PaymentManagement;
