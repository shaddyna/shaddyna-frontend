"use client"

import React, { useState } from "react";
import { FaSearch, FaUserPlus, FaEdit, FaTrashAlt } from "react-icons/fa";

const VendorManagement = () => {
  const [vendors, setVendors] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", status: "Pending" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", status: "Suspended" },
  ]);
  const [searchTerm, setSearchTerm] = useState("");

  // Handle search
  const filteredVendors = vendors.filter(
    (vendor) =>
      vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle status change
  const changeVendorStatus = (id: number, newStatus: string) => {
    setVendors(vendors.map(vendor => vendor.id === id ? { ...vendor, status: newStatus } : vendor));
  };

  // Handle vendor deletion
  const deleteVendor = (id: number) => {
    setVendors(vendors.filter((vendor) => vendor.id !== id));
  };

  // Handle add vendor (simplified)
  const addVendor = (newVendor: { id: number; name: string; email: string; status: string; }) => {
    setVendors([...vendors, newVendor]);
  };

  return (
    <div className="p-6 space-y-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800">Vendor Management</h1>

      {/* Add Vendor Button */}
      <div className="flex justify-end">
        <button
          onClick={() => addVendor({ id: Date.now(), name: "New Vendor", email: "new@example.com", status: "Pending" })}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center space-x-2"
        >
          <FaUserPlus size={20} />
          <span>Add Vendor</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex items-center space-x-2 mb-6">
        <FaSearch size={20} className="text-gray-500" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 w-full md:w-1/3 border border-gray-300 rounded-md"
          placeholder="Search Vendors"
        />
      </div>

      {/* Vendor Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-gray-700">Vendor Name</th>
              <th className="px-6 py-4 text-left text-gray-700">Email</th>
              <th className="px-6 py-4 text-left text-gray-700">Status</th>
              <th className="px-6 py-4 text-center text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredVendors.length > 0 ? (
              filteredVendors.map((vendor) => (
                <tr key={vendor.id} className="border-t">
                  <td className="px-6 py-4 text-gray-800">{vendor.name}</td>
                  <td className="px-6 py-4 text-gray-800">{vendor.email}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        vendor.status === "Active"
                          ? "bg-green-100 text-green-600"
                          : vendor.status === "Pending"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {vendor.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center space-x-4">
                    <button
                      onClick={() => changeVendorStatus(vendor.id, "Active")}
                      className="text-green-600 hover:text-green-800"
                    >
                      <FaEdit size={20} />
                    </button>
                    <button
                      onClick={() => changeVendorStatus(vendor.id, "Suspended")}
                      className="text-yellow-600 hover:text-yellow-800"
                    >
                      <FaEdit size={20} />
                    </button>
                    <button
                      onClick={() => deleteVendor(vendor.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrashAlt size={20} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-6 py-4 text-center text-gray-500">
                  No vendors found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VendorManagement;
