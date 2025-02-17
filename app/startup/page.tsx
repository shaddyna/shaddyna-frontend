"use client";
import { useState, useEffect } from "react";
import { NextPage } from "next";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";
import BottomNavigationBar from "@/components/BottomNav";
import axios from "axios";
import Back from "@/components/Back";

const StartUpPage: NextPage = () => {
  const [formData, setFormData] = useState({
    startupName: "",
    ideaDescription: "",
    estimatedValue: "",
    contactPhone: "",
    contactEmail: "",
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Fetch token directly from localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log("Token is present:", token);
    } else {
      console.log("No token found.");
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Retrieve token directly from localStorage
      const token = localStorage.getItem("token");

      // Ensure token is available
      if (!token) {
        console.log("Token is not available");
        alert('User information is not available or invalid. Please log in.');
        setLoading(false);
        return;
      }

      // Log the token before sending it to the backend
      console.log('User Token:', token);

      // Set up authorization headers for the API request
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Use token from localStorage
        },
      };

      // Submit form data to the backend
      await axios.post(
        'https://shaddyna-backend.onrender.com/api/startups',
        { ...formData }, // Send only form data
        config
      );

      // Handle successful submission
      alert('Startup created successfully!');
      setLoading(false);

      // Redirect to another page after successful submission
      router.push('/startup-success');
    } catch (error: any) {
      console.error('Error creating startup:', error);

      // Provide better feedback for error handling
      const errorMessage =
        error.response?.data?.message || 'Failed to create startup. Please try again later.';

      alert(errorMessage);
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Back title={"Start Your Venture"} />

      <main className="flex-grow flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-md p-6 sm:p-8 bg-white rounded-lg shadow-md border border-[#182155]">
          <h1 className="text-2xl sm:text-3xl text-center font-semibold text-[#182155] mb-4 sm:mb-6">
            Submit Your Startup Idea
          </h1>
          <p className="text-sm sm:text-base text-center text-gray-600 mb-4">
            Share your startup ideas with potential investors or buyers. If you have an innovative business concept or idea, now is the time to present it. Investors and entrepreneurs are always looking for the next big thing – your idea could be it!
          </p>
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {["startupName", "ideaDescription", "estimatedValue", "contactPhone", "contactEmail"].map(
              (field, index) => (
                <div className="flex flex-col" key={index}>
                  <label
                    htmlFor={field}
                    className="text-[#182155] font-medium text-sm sm:text-base"
                  >
                    {field === "startupName"
                      ? "Startup Name"
                      : field === "ideaDescription"
                      ? "Startup Idea Description"
                      : field === "estimatedValue"
                      ? "Estimated Value (in Ksh)"
                      : field === "contactPhone"
                      ? "Phone Number"
                      : "Email Address"}
                  </label>
                  {field === "ideaDescription" ? (
                    <textarea
                      name={field}
                      id={field}
                      value={(formData as any)[field]}
                      onChange={handleChange}
                      className="mt-1 p-2 sm:p-3 rounded-lg border border-[#ff199c] focus:outline-none focus:ring-2 focus:ring-[#ff199c] text-gray-800 h-40 resize-none"
                      placeholder="Describe your startup idea in detail..."
                      required
                    />
                  ) : (
                    <input
                      type={
                        field === "estimatedValue"
                          ? "number"
                          : field === "contactEmail"
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
                  )}
                </div>
              )
            )}

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full py-2 sm:py-3 bg-[#182155] text-white font-semibold rounded-lg hover:bg-[#e0157f] transition duration-300"
                disabled={loading}
              >
                {loading ? "Processing..." : "Submit Your Idea"}
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

export default StartUpPage;
