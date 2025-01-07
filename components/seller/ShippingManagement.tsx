import React from "react";

const ShippingManagement: React.FC = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-xl font-bold mb-4">Shipping and Delivery Management</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Shipping Rates */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-lg font-semibold">Set Shipping Rates</h4>
          <p className="text-sm text-gray-600 mb-2">
            Customize shipping rates based on location and weight.
          </p>
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
            Configure Rates
          </button>
        </div>

        {/* Delivery Options */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-lg font-semibold">Manage Delivery Options</h4>
          <p className="text-sm text-gray-600 mb-2">
            Offer standard, express, and custom delivery options.
          </p>
          <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">
            Edit Options
          </button>
        </div>

        {/* Track Shipments */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-lg font-semibold">Track Shipments</h4>
          <p className="text-sm text-gray-600 mb-2">
            Monitor shipment status in real time.
          </p>
          <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded">
            Track Shipments
          </button>
        </div>

        {/* Shipping Policies */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-lg font-semibold">Shipping Policies</h4>
          <p className="text-sm text-gray-600 mb-2">
            Define return and refund policies for your store.
          </p>
          <button className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded">
            Set Policies
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShippingManagement;
