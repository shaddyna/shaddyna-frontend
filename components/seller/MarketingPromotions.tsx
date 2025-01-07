import React from "react";

const MarketingPromotions: React.FC = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-xl font-bold mb-4">Marketing and Promotions</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Campaign Management */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-lg font-semibold">Campaign Management</h4>
          <p className="text-sm text-gray-600 mb-2">
            Create, schedule, and manage marketing campaigns.
          </p>
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
            Create Campaign
          </button>
        </div>

        {/* Discounts and Coupons */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-lg font-semibold">Discounts and Coupons</h4>
          <p className="text-sm text-gray-600 mb-2">
            Offer special discounts or generate coupons for customers.
          </p>
          <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">
            Manage Discounts
          </button>
        </div>

        {/* Analytics for Campaigns */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-lg font-semibold">Campaign Analytics</h4>
          <p className="text-sm text-gray-600 mb-2">
            Track performance and ROI for your marketing efforts.
          </p>
          <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded">
            View Analytics
          </button>
        </div>

        {/* Social Media Integration */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-lg font-semibold">Social Media Integration</h4>
          <p className="text-sm text-gray-600 mb-2">
            Connect and manage promotions on social media platforms.
          </p>
          <button className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded">
            Connect Accounts
          </button>
        </div>

        {/* Email Marketing */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-lg font-semibold">Email Marketing</h4>
          <p className="text-sm text-gray-600 mb-2">
            Send promotional emails to your subscribers.
          </p>
          <button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded">
            Send Emails
          </button>
        </div>

        {/* Loyalty Programs */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-lg font-semibold">Loyalty Programs</h4>
          <p className="text-sm text-gray-600 mb-2">
            Reward loyal customers with points or exclusive deals.
          </p>
          <button className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded">
            Set Up Program
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarketingPromotions;
