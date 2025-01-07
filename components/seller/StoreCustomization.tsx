/*"use client"
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaUpload, FaFont } from "react-icons/fa";

const StoreCustomization = () => {
  const [logoPreview, setLogoPreview] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);
  const [primaryColor, setPrimaryColor] = useState("#4CAF50");
  const [secondaryColor, setSecondaryColor] = useState("#FF9800");
  const [font, setFont] = useState("Arial");
  const { register, handleSubmit } = useForm();

  // Handle logo upload
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  // Handle banner upload
  const handleBannerUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBannerPreview(URL.createObjectURL(file));
    }
  };

  // Handle form submission (you can integrate API calls here)
  const onSubmit = (data) => {
    console.log(data); // Handle customization saving (e.g., API call)
  };

  return (
    <div className="p-6 space-y-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800">Store Customization</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Store Logo Upload *
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Upload Store Logo</h2>
          <div className="flex items-center space-x-4">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
              {logoPreview ? (
                <img src={logoPreview} alt="Store Logo" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  No Logo
                </div>
              )}
            </div>
            <label
              htmlFor="logo"
              className="cursor-pointer flex items-center space-x-2 text-blue-600 hover:text-blue-700"
            >
              <FaUpload size={20} />
              <span className="text-sm">Upload Logo</span>
              <input
                id="logo"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleLogoUpload}
                {...register("logo")}
              />
            </label>
          </div>
        </div>

        {/* Store Banner Upload *
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Upload Store Banner</h2>
          <div className="flex items-center space-x-4">
            <div className="w-full h-40 rounded-lg overflow-hidden bg-gray-200">
              {bannerPreview ? (
                <img
                  src={bannerPreview}
                  alt="Store Banner"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  No Banner
                </div>
              )}
            </div>
            <label
              htmlFor="banner"
              className="cursor-pointer flex items-center space-x-2 text-blue-600 hover:text-blue-700"
            >
              <FaUpload size={20} />
              <span className="text-sm">Upload Banner</span>
              <input
                id="banner"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleBannerUpload}
                {...register("banner")}
              />
            </label>
          </div>
        </div>

        {/* Color Scheme Customization *
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Color Scheme</h2>
          <div className="flex items-center space-x-8">
            <div>
              <label className="text-sm font-semibold text-gray-700">Primary Color</label>
              <input
                type="color"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="w-12 h-12 mt-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700">Secondary Color</label>
              <input
                type="color"
                value={secondaryColor}
                onChange={(e) => setSecondaryColor(e.target.value)}
                className="w-12 h-12 mt-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>

        {/* Font Customization *
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Font Customization</h2>
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <FaFont size={20} />
              <select
                value={font}
                onChange={(e) => setFont(e.target.value)}
                className="p-2 border border-gray-300 rounded-md"
              >
                <option value="Arial">Arial</option>
                <option value="Verdana">Verdana</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Tahoma">Tahoma</option>
              </select>
            </div>
          </div>
        </div>

        {/* Store Description *
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Store Description</h2>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Write a brief description about your store..."
            rows={5}
            {...register("description")}
          />
        </div>

        {/* Preview *
        <d
          className="bg-white p-6 rounded-lg shadow-lg"
          style={{
            backgroundColor: primaryColor,
            color: secondaryColor,
            fontFamily: font,
          }}
        >
          <h2 className="text-xl font-semibold">Store Preview</h2>
          <div className="my-4 text-center">
            {logoPreview ? (
              <img
                src={logoPreview}
                alt="Store Logo"
                className="w-24 h-24 rounded-full object-cover mx-auto"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto flex items-center justify-center text-gray-500">
                No Logo
              </div>
            )}
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Store Name</h3>
              <p className="text-sm">{font} font</p>
            </div>
            <p className="mt-4">{`Store Description: ${
              font === "Arial" ? "This is the default description." : "Custom description"
            }`}</p>
          </div>
        </div>

        {/* Save Button *
        <button
          type="submit"
          className="w-full py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Save Customizations
        </button>
      </form>
    </div>
  );
};

export default StoreCustomization;*/
