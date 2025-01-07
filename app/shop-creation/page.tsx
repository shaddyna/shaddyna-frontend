/*"use client";
import BackButton from "@/components/BackButton";
import Footer from "@/components/Footer";
import HeadNavigation from "@/components/HeadNavigation";
import React, { useEffect, useState } from "react";
import { useUserSellerStore } from "@/store/useUserSellerStore";

const ShopCreationPage: React.FC = () => {
  const [formData, setFormData] = useState<{
    name: string;
    image: File | null;
    location: string;
    description: string;
    email: string;
    contact: string;
    instagram: string;
    facebook: string;
    twitter: string;
  }>({
    name: "",
    image: null,
    location: "",
    description: "",
    email: "",
    contact: "",
    instagram: "",
    facebook: "",
    twitter: "",
  });

  const [sellerId, setSellerId] = useState<string | null>(null);

  const fetchCurrentUser = useUserSellerStore((state) => state.fetchCurrentUser);

  useEffect(() => {
    const initializeSeller = async () => {
      try {
        await fetchCurrentUser(); // Ensure the current user is fetched

        const currentUserRole = useUserSellerStore.getState().currentUserRole;

        if (currentUserRole === "seller") {
          const { user, sellers } = useUserSellerStore.getState();

          if (!user) {
            console.error("User is null.");
            return;
          }

          const seller = sellers.find((seller) => seller.email === user.email);

          if (seller) {
            setSellerId(seller._id); // Set the seller ID
            console.log(`Seller ID set to: ${seller._id}`); // Log the seller ID
          } else {
            console.error("No matching seller found for the current user.");
          }
        }
      } catch (error) {
        console.error("An error occurred during seller initialization:", error);
      }
    };

    initializeSeller();
  }, [fetchCurrentUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, image: e.target.files[0] });
    }
  };

  /*const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!sellerId) {
      console.error("Seller ID not found");
      return;
    }

    const formDataToSubmit = new FormData();
    formDataToSubmit.append("name", formData.name);
    if (formData.image) formDataToSubmit.append("image", formData.image);
    formDataToSubmit.append("location", formData.location);
    formDataToSubmit.append("description", formData.description);
    formDataToSubmit.append("email", formData.email);
    formDataToSubmit.append("contact", formData.contact);
    formDataToSubmit.append("instagram", formData.instagram);
    formDataToSubmit.append("facebook", formData.facebook);
    formDataToSubmit.append("twitter", formData.twitter);

    // Log the form data for debugging
    console.log("Form Data to Submit:");
    formDataToSubmit.forEach((value, key) => {
      console.log(`${key}:`, value);
    });

    try {
      const response = await fetch(`http://localhost:5000/api/sellers/edit/${sellerId}`, {
        method: "PUT",
        body: formDataToSubmit,
      });
      if (response.ok) {
        console.log("Shop updated successfully");
      } else {
        console.error("Failed to update shop");
      }
    } catch (error) {
      console.error("Error during shop update:", error);
    }
  };*
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const formDataToSubmit = new FormData();
    formDataToSubmit.append("name", formData.name);
    //if (formData.image) formDataToSubmit.append("image", formData.image);
    formDataToSubmit.append("location", formData.location);
    formDataToSubmit.append("description", formData.description);
    formDataToSubmit.append("email", formData.email);
    formDataToSubmit.append("contact", formData.contact);
    formDataToSubmit.append("instagram", formData.instagram);
    formDataToSubmit.append("facebook", formData.facebook);
    formDataToSubmit.append("twitter", formData.twitter);
  
    try {
      const formData = {
        name: "New Name",
        phoneNumber: "1234567890",
        mpesaCode: "newCod",
        amount: 1000,
        status: "active",
      };
    
      const response = await fetch(`http://localhost:5000/api/sellers/edit/${sellerId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json", // Specify the content type as JSON
        },
        body: JSON.stringify(formData), // Convert the object to a JSON string
      });
    
      if (response.ok) {
        console.log("Shop updated successfully");
      } else {
        const errorData = await response.json();
        console.error("Failed to update shop:", errorData);
      }
    } catch (error) {
      console.error("Error during shop update:", error);
    }
    
  };
  

  return (
    <div>
      <HeadNavigation />
      <div className="py-10 px-20">
        <BackButton />
      </div>
      <div className="min-h-screen bg-white flex items-center justify-center py-10 px-4">
        <div className="bg-[#f8f9fa] shadow-lg rounded-lg w-full max-w-5xl p-6 md:p-10">
          <h1 className="text-2xl md:text-4xl font-bold text-center mb-8 text-[#182155]">
            Create Your Shop
          </h1>
          <form
            onSubmit={handleSubmit}
            className="space-y-6 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-4"
          >
           <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Shop Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#ff199c] focus:ring-[#ff199c] text-base p-3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Image</label>
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              accept="image/*"
              className="mt-2 block w-full text-base text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-[#ff199c] file:text-white hover:file:bg-[#e21788]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#ff199c] focus:ring-[#ff199c] text-base p-3"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#ff199c] focus:ring-[#ff199c] text-base p-3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#ff199c] focus:ring-[#ff199c] text-base p-3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Contact Number</label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              required
              className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#ff199c] focus:ring-[#ff199c] text-base p-3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Instagram</label>
            <input
              type="url"
              name="instagram"
              value={formData.instagram}
              onChange={handleChange}
              className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#ff199c] focus:ring-[#ff199c] text-base p-3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Facebook</label>
            <input
              type="url"
              name="facebook"
              value={formData.facebook}
              onChange={handleChange}
              className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#ff199c] focus:ring-[#ff199c] text-base p-3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">X (Twitter)</label>
            <input
              type="url"
              name="twitter"
              value={formData.twitter}
              onChange={handleChange}
              className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#ff199c] focus:ring-[#ff199c] text-base p-3"
            />
          </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full bg-[#182155] hover:bg-[#e21788] text-white font-medium py-3 px-6 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff199c]"
              >
                Update Shop
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShopCreationPage;*/



"use client";
import BackButton from "@/components/BackButton";
import Footer from "@/components/Footer";
import HeadNavigation from "@/components/HeadNavigation";
import React, { useEffect, useState } from "react";
import { useUserSellerStore } from "@/store/useUserSellerStore";

const ShopCreationPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    image: null,
    location: "",
    description: "",
    email: "",
    contact: "",
    instagram: "",
    facebook: "",
    twitter: "",
  });

  const [sellerId, setSellerId] = useState<string | null>(null);

  const fetchCurrentUser = useUserSellerStore((state) => state.fetchCurrentUser);

  useEffect(() => {
    const initializeSeller = async () => {
      try {
        await fetchCurrentUser();
        const currentUserRole = useUserSellerStore.getState().currentUserRole;

        if (currentUserRole === "seller") {
          const { user, sellers } = useUserSellerStore.getState();

          if (!user) {
            console.error("User is null.");
            return;
          }

          const seller = sellers.find((seller) => seller.email === user.email);

          if (seller) {
            setSellerId(seller._id);
            console.log(`Seller ID set to: ${seller._id}`);
          } else {
            console.error("No matching seller found for the current user.");
          }
        }
      } catch (error) {
        console.error("An error occurred during seller initialization:", error);
      }
    };

    initializeSeller();
  }, [fetchCurrentUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  /*const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, image: e.target.files[0] });
    }
  };*/

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const dataToSubmit = {
      shopInfo: {
        name: formData.name,
        phoneNumber: formData.contact,
        location: formData.location,
        description: formData.description,
        email: formData.email,
        instagram: formData.instagram,
        facebook: formData.facebook,
        twitter: formData.twitter,
      },
    };
    try {
      const response = await fetch(`http://localhost:5000/api/sellers/edit/${sellerId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSubmit),
      });

      if (response.ok) {
        console.log("Shop updated successfully");
      } else {
        const errorData = await response.json();
        console.error("Failed to update shop:", errorData);
      }
    } catch (error) {
      console.error("Error during shop update:", error);
    }
  };

  return (
    <div>
      <HeadNavigation />
      <div className="py-10 px-20">
        <BackButton />
      </div>
      <div className="min-h-screen bg-white flex items-center justify-center py-10 px-4">
        <div className="bg-[#f8f9fa] shadow-lg rounded-lg w-full max-w-5xl p-6 md:p-10">
          <h1 className="text-2xl md:text-4xl font-bold text-center mb-8 text-[#182155]">
            Create Your Shop
          </h1>
          <form
            onSubmit={handleSubmit}
            className="space-y-6 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-4"
          >
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Shop Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#ff199c] focus:ring-[#ff199c] text-base p-3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Image</label>
              <input
                type="file"
                name="image"
                //onChange={handleImageChange}
                accept="image/*"
                className="mt-2 block w-full text-base text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-[#ff199c] file:text-white hover:file:bg-[#e21788]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#ff199c] focus:ring-[#ff199c] text-base p-3"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#ff199c] focus:ring-[#ff199c] text-base p-3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#ff199c] focus:ring-[#ff199c] text-base p-3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Contact Number</label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                required
                className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#ff199c] focus:ring-[#ff199c] text-base p-3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Instagram</label>
              <input
                type="url"
                name="instagram"
                value={formData.instagram}
                onChange={handleChange}
                className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#ff199c] focus:ring-[#ff199c] text-base p-3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Facebook</label>
              <input
                type="url"
                name="facebook"
                value={formData.facebook}
                onChange={handleChange}
                className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#ff199c] focus:ring-[#ff199c] text-base p-3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">X (Twitter)</label>
              <input
                type="url"
                name="twitter"
                value={formData.twitter}
                onChange={handleChange}
                className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#ff199c] focus:ring-[#ff199c] text-base p-3"
              />
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full bg-[#182155] hover:bg-[#e21788] text-white font-medium py-3 px-6 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff199c]"
              >
                Update Shop
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShopCreationPage;

