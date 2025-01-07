"use client"

import React, { useState } from "react";
import { FaLink, FaRegEdit, FaToggleOn, FaToggleOff, FaPlus } from "react-icons/fa";

const MultiChannelSelling = () => {
  const [channels, setChannels] = useState([
    { id: 1, name: "Website", status: "Active" },
    { id: 2, name: "Amazon", status: "Disabled" },
    { id: 3, name: "Facebook", status: "Active" },
    { id: 4, name: "Instagram", status: "Pending" },
  ]);
  const [newChannel, setNewChannel] = useState("");

  // Handle adding a new channel
  const addChannel = () => {
    if (newChannel) {
      setChannels([...channels, { id: Date.now(), name: newChannel, status: "Pending" }]);
      setNewChannel("");
    }
  };

  // Handle toggling the status of a channel
  const toggleChannelStatus = (id: number) => {
    setChannels(
      channels.map((channel) =>
        channel.id === id
          ? { ...channel, status: channel.status === "Active" ? "Disabled" : "Active" }
          : channel
      )
    );
  };

  return (
    <div className="p-6 space-y-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800">Multi-Channel Selling</h1>

      {/* Add New Channel */}
      <div className="flex justify-between items-center">
        <input
          type="text"
          value={newChannel}
          onChange={(e) => setNewChannel(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
          placeholder="Enter new channel name"
        />
        <button
          onClick={addChannel}
          className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center space-x-2"
        >
          <FaPlus size={20} />
          <span>Add Channel</span>
        </button>
      </div>

      {/* Channels List */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-md mt-6">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-gray-700">Channel Name</th>
              <th className="px-6 py-4 text-left text-gray-700">Status</th>
              <th className="px-6 py-4 text-center text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {channels.length > 0 ? (
              channels.map((channel) => (
                <tr key={channel.id} className="border-t">
                  <td className="px-6 py-4 text-gray-800">{channel.name}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        channel.status === "Active"
                          ? "bg-green-100 text-green-600"
                          : channel.status === "Pending"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {channel.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center space-x-4">
                    <button
                      onClick={() => toggleChannelStatus(channel.id)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {channel.status === "Active" ? (
                        <FaToggleOff size={20} />
                      ) : (
                        <FaToggleOn size={20} />
                      )}
                    </button>
                    <button className="text-yellow-600 hover:text-yellow-800">
                      <FaRegEdit size={20} />
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      <FaLink size={20} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MultiChannelSelling;
