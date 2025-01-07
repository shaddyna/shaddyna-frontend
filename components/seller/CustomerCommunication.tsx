import React from "react";

const CustomerCommunication: React.FC = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-xl font-bold mb-4">Customer Communication</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Customer Inquiries */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-lg font-semibold">Customer Inquiries</h4>
          <p className="text-sm text-gray-600 mb-2">
            Respond to customer messages and inquiries promptly to build trust.
          </p>
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
            View Inquiries
          </button>
        </div>

        {/* Feedback and Reviews */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-lg font-semibold">Feedback and Reviews</h4>
          <p className="text-sm text-gray-600 mb-2">
            Manage customer feedback and reviews to enhance your product quality.
          </p>
          <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">
            Manage Reviews
          </button>
        </div>

        {/* Order Updates */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-lg font-semibold">Order Updates</h4>
          <p className="text-sm text-gray-600 mb-2">
            Notify customers about the status of their orders.
          </p>
          <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded">
            Send Updates
          </button>
        </div>

        {/* Support Tickets */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-lg font-semibold">Support Tickets</h4>
          <p className="text-sm text-gray-600 mb-2">
            Address support tickets to resolve customer issues efficiently.
          </p>
          <button className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded">
            View Support Tickets
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerCommunication;
