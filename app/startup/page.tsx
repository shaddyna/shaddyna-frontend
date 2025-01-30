"use client";
import { useState, useEffect } from "react";
import { NextPage } from "next";
import Footer from "@/components/Footer";
import HeadNavigation from "@/components/HeadNavigation";
import { useRouter } from "next/navigation";
import BottomNavigationBar from "@/components/BottomNav";
import { useUserSellerStore } from "@/store/useUserSellerStore"; // Import your Zustand store
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
  const { user, fetchCurrentUser } = useUserSellerStore();
  
  // Fetch current user on mount
  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      const response = await fetch("https://shaddyna-backend.onrender.com/api/startups/submit", {
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
        throw new Error(`Failed to submit startup. Server returned: ${response.status} - ${responseBody.error || "Unknown error"}`); 
      }

      // Assuming startup submission was successful
      router.push("/startup-submitted");
    } catch (error) {
      console.error(error);
    } finally {
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
