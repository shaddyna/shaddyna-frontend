import React from "react";

const AccountManagement: React.FC = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-4">Account and Profile Management</h3>

      <div className="space-y-6">
        {/* Register/Sign Up Section */}
        <div>
          <h4 className="text-lg font-medium mb-2">Register/Sign Up</h4>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
            Create Account
          </button>
        </div>

        {/* Profile Update Section */}
        <div>
          <h4 className="text-lg font-medium mb-2">Profile Update</h4>
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
            Update Profile
          </button>
        </div>

        {/* Password Management Section */}
        <div>
          <h4 className="text-lg font-medium mb-2">Password Management</h4>
          <div className="flex space-x-4">
            <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition">
              Change Password
            </button>
            <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
              Reset Password
            </button>
          </div>
        </div>

        {/* Business Verification Section */}
        <div>
          <h4 className="text-lg font-medium mb-2">Business Verification</h4>
          <p className="text-gray-600 mb-2">Verify your business to list products.</p>
          <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition">
            Verify Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountManagement;
