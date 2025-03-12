
/*"use client";
import { useState, useEffect } from "react";
import { NextPage } from "next";
import Footer from "@/components/Footer";
import HeadNavigation from "@/components/HeadNavigation";
import { useRouter } from "next/navigation";
import BottomNavigationBar from "@/components/BottomNav";
import { useUserSellerStore } from "@/store/useUserSellerStore"; // Import your Zustand store
import axios from "axios";
import Back from "@/components/Back";

const ForumPage: NextPage = () => {
  const [formData, setFormData] = useState({
    mpesaCode: "",
    name: "",
    amount: "",
    phoneNumber: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user, fetchCurrentUser } = useUserSellerStore();
  
  // Fetch current user on mount
  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      alert("User not found. Please log in again.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("https://shaddyna-backendonrender.com/api/sellers/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const responseBody = await response.json();
      console.log("Response Status:", response.status);
      console.log("Response Body:", responseBody);
      if (!response.ok) {
        throw new Error(`Failed to submit payment. Server returned: ${response.status} - ${responseBody.error || "Unknown error"}`);
      }      

      // Assuming payment was successful, update the user's role to 'seller'
      const updatedUserResponse = await axios.put(`https://shaddyn-backend.onrender.com/api/users/${user._id}`, {
        role: "seller",
      });

      if (updatedUserResponse.status === 200) {
        // Update the user in the Zustand store
        const updatedUser = updatedUserResponse.data;
        useUserSellerStore.getState().setUser(updatedUser);

        console.log("Seller created successfully:", updatedUser);
        router.push("/processing");
      } else {
        throw new Error("Failed to update user role.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Back title={"Savings"} />

      <main className="flex-grow flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-md p-6 sm:p-8 bg-white rounded-lg shadow-md border border-[#182155]">
          <h1 className="text-2xl sm:text-3xl text-center font-semibold text-[#182155] mb-4 sm:mb-6">
            Make your Savings
          </h1>
          <p className="text-sm sm:text-base text-center text-gray-600 mb-4">
          Let your savings work for you, building a brighter future.
          Don't wait for the perfect moment start saving today, no matter how small the step. Every shilling saved is one step closer to your financial goals!
          </p>
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {["mpesaCode", "name", "amount", "phoneNumber", "email"].map(
              (field, index) => (
                <div className="flex flex-col" key={index}>
                  <label
                    htmlFor={field}
                    className="text-[#182155] font-medium text-sm sm:text-base"
                  >
                    {field === "mpesaCode"
                      ? "M-Pesa Code"
                      : field === "phoneNumber"
                      ? "Phone Number"
                      : field === "amount"
                      ? "Amount"
                      : field === "name"
                      ? "Full Name"
                      : "Email Address"}
                  </label>
                  <input
                    type={
                      field === "amount"
                        ? "number"
                        : field === "email"
                        ? "email"
                        : "text"
                    }
                    name={field}
                    id={field}
                    value={(formData as any)[field]}
                    onChange={handleChange}
                    className="mt-1 p-2 sm:p-3 rounded-lg border border-[#ff199c] focus:outline-none focus:ring-2 focus:ring-[#ff199c] text-gray-800"
                    required
                  />
                </div>
              )
            )}

            {/* Submit Button *
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full py-2 sm:py-3 bg-[#182155] text-white font-semibold rounded-lg hover:bg-[#e0157f] transition duration-300"
                disabled={loading}
              >
                {loading ? "Processing..." : "Make Saving"}
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
      <BottomNavigationBar />
    </div>
  );
};

export default ForumPage;*/
"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Back from "@/components/Back";
import Footer from "@/components/Footer";
import BottomNavBar from "@/components/BottomNav";

const ForumForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    userId: "", // This should be dynamically set from the authenticated user
    mpesaCode: "",
    fullName: "",
    amount: "",
    phoneNumber: "",
    email: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  // Fetch the token from localStorage on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    } else {
      setError("Authentication required. Please log in.");
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!token) {
      setError("User authentication failed. Please log in.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("https://shaddyna-backend.onrender.com/api/saving/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Attach token
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Saving created successfully!");
        router.push("/"); // Redirect to home or another relevant page
      } else {
        setError(data.message || "Something went wrong");
      }
    } catch (error) {
      setError("An error occurred while creating saving.");
    }

    setLoading(false);
  };

  return (
    <div>
      <Back title={"Forum"} />
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl text-gray-800 font-semibold text-center mb-4">
          Create Your First Saving
        </h2>
        {error && <p className="text-red-500 text-center mb-3">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            name="mpesaCode"
            placeholder="M-Pesa Code"
            value={formData.mpesaCode}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
          <button
            type="submit"
            className="w-full bg-[#0f1c47] text-white p-2 rounded-lg hover:bg-blue-900"
            disabled={loading}
          >
            {loading ? "Saving..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
    <Footer />
    <BottomNavBar />
    </div>
  );
};

export default ForumForm;
