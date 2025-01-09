// pages/profile.tsx
"use client";
import BackButton from "@/components/BackButton";
import BottomNavigationBar from "@/components/BottomNav";
import Footer from "@/components/Footer";
import HeadNavigation from "@/components/HeadNavigation";
import React, { useState } from "react";

const UserProfile: React.FC = () => {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    address: "123 Main Street, Anytown, USA",
  });

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [passwordError, setPasswordError] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });
    setPasswordError(""); // Clear error on change
  };

  const handleSave = () => {
    console.log("User details saved:", user);
  };

  const handlePasswordUpdate = () => {
    const { currentPassword, newPassword, confirmPassword } = passwords;

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError("All fields are required.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }

    console.log("Password updated successfully!");
    setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  return (
    <div>
        <HeadNavigation />
        <div className="flex items-center justify-between p-6">
    <BackButton />
    <h1 className="text-3xl font-bold text-[#182155]">
      User Profile
    </h1>
  </div>    
    <div className="min-h-screen bg-white flex justify-center items-center p-4">
      <div
        className="w-full max-w-md bg-white border rounded-lg shadow-lg p-6"
        style={{ borderColor: "#182155" }}
      >
        <h1 className="text-2xl font-bold mb-4" style={{ color: "#182155" }}>
          User Profile
        </h1>

        <form>
          {/* User Details Section */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-semibold mb-2"
              style={{ color: "#182155" }}
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={user.name}
              onChange={handleInputChange}
              className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
              style={{ borderColor: "#182155" }}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-semibold mb-2"
              style={{ color: "#182155" }}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              onChange={handleInputChange}
              className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
              style={{ borderColor: "#182155" }}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-sm font-semibold mb-2"
              style={{ color: "#182155" }}
            >
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={user.phone}
              onChange={handleInputChange}
              className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
              style={{ borderColor: "#182155" }}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-sm font-semibold mb-2"
              style={{ color: "#182155" }}
            >
              Address
            </label>
            <textarea
              id="address"
              name="address"
              value={user.address}
              onChange={handleInputChange}
              className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
              style={{ borderColor: "#182155" }}
            ></textarea>
          </div>

          <button
            type="button"
            onClick={handleSave}
            className="w-full bg-pink-500 text-white font-semibold py-2 rounded-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-400"
            style={{ backgroundColor: "#ff199c" }}
          >
            Save Changes
          </button>
        </form>

        {/* Password Update Section */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4" style={{ color: "#182155" }}>
            Change Password
          </h2>

          <div className="mb-4">
            <label
              htmlFor="currentPassword"
              className="block text-sm font-semibold mb-2"
              style={{ color: "#182155" }}
            >
              Current Password
            </label>
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
              value={passwords.currentPassword}
              onChange={handlePasswordChange}
              className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
              style={{ borderColor: "#182155" }}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="newPassword"
              className="block text-sm font-semibold mb-2"
              style={{ color: "#182155" }}
            >
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={passwords.newPassword}
              onChange={handlePasswordChange}
              className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
              style={{ borderColor: "#182155" }}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-semibold mb-2"
              style={{ color: "#182155" }}
            >
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={passwords.confirmPassword}
              onChange={handlePasswordChange}
              className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
              style={{ borderColor: "#182155" }}
            />
          </div>

          {passwordError && (
            <p className="text-sm text-red-500 mb-4">{passwordError}</p>
          )}

          <button
            type="button"
            onClick={handlePasswordUpdate}
            className="w-full bg-pink-500 text-white font-semibold py-2 rounded-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-400"
            style={{ backgroundColor: "#ff199c" }}
          >
            Update Password
          </button>
        </div>
      </div>
    </div>
    <Footer />
    <BottomNavigationBar />
    </div>
  );
};

export default UserProfile;
