"use client";
import Back from "@/components/Back";
import BottomNavBar from "@/components/BottomNav";
import Footer from "@/components/Footer";
import axios from "axios";
import { useRouter } from "next/navigation"; 
import { useState } from "react";

const productCategories = {
  Kings: {
    label: "Kings",
    attributes: {
      Color: ["Blue", "Pink", "White"],
      Size: ["S", "M", "L", "XL",  "XXL"],
    },
  },
};

const API_URL = "https://shaddyna-backend.onrender.com/api/products"; // Adjust based on backend URL

const AddProduct = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedValues, setSelectedValues] = useState<Record<string, string>>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [productName, setProductName] = useState("");
  const [productStock, setProductStock] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const router = useRouter();
  //const categoryAttributes = selectedCategory ? productCategories[selectedCategory as keyof typeof productCategories].attributes : null;
  const categoryAttributes = selectedCategory 
  ? productCategories[selectedCategory as keyof typeof productCategories].attributes 
  : null;


  const attributeKeys = categoryAttributes ? Object.keys(categoryAttributes) : [];

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
    setSelectedValues({});
    setCurrentStep(0);
  };

  const handleAttributeChange = (attribute: string, value: string) => {
    setSelectedValues((prev) => ({ ...prev, [attribute]: value }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImages([...images, ...Array.from(event.target.files)]);
    }
  };
  
  const nextStep = () => {
    if (currentStep < attributeKeys.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    const formData = new FormData();
    formData.append("name", productName);
    formData.append("stock", productStock);
    formData.append("price", productPrice);
    formData.append("category", selectedCategory!);
    formData.append("attributes", JSON.stringify(selectedValues));
    images.forEach((image) => formData.append("images", image));
  
    try {
      const response = await axios.post(API_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      alert("Product Created Successfully!");
      setProductName("");
      setProductStock("");
      setProductPrice("");
      setSelectedCategory(null);
      setSelectedValues({});
      setImages([]);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };
  

  return (
    <div>
    <Back title={"Sell T-shirt"} />
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-3">
    <main className="flex-grow flex items-center justify-center pb-3 sm:p-3">
        <div className="w-full max-w-md sm:max-w-lg p-6 sm:p-8 bg-white rounded-lg shadow-lg border border-[#182155]">
          <h1 className="text-xl sm:text-3xl text-center font-semibold text-[#182155] mb-4 sm:mb-6">
            Sell Our Tshirts!!!
          </h1>

          <div className="flex flex-col items-center space-y-4 sm:space-y-6">
            <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-t-4 border-[#bf2c7e] rounded-full animate-spin"></div>

            <p className="text-sm sm:text-lg text-center text-[#182155]">
            Turn your creativity into cash and become part of a thriving Shaddyna community of sellers! Selling t-shirts with us is simple, fun, and rewarding.
            </p>
            <div className="text-center">
              <p className="text-sm sm:text-base font-medium text-[#182155]">Make your step:</p>
              <ul className="list-disc list-inside text-xs sm:text-sm text-[#182155]">
                <li> Find customers just like I found you.</li>
                <li>Sell them the tshirts and share the story.</li>
                <li>Earn cash while growing a community!</li>
              </ul>
            </div>

            <div className="flex justify-center mt-4 sm:mt-6">
              <button className="py-2 px-4 sm:py-3 sm:px-6 bg-[#bf2c7e] text-white text-sm sm:text-base font-semibold rounded-lg hover:bg-[#e0157f] transition duration-300"
              >
              Lets Go!!!
              </button>
            </div>
          </div>
        </div>
      </main>
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Sell a Tshirt</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-800 font-semibold">Customer Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-800 font-semibold">Customer Number</label>
            <input
              type="number"
              className="w-full p-2 border rounded-md"
              value={productStock}
              onChange={(e) => setProductStock(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-800 font-semibold">Amount</label>
            <input
              type="number"
              className="w-full p-2 border rounded-md"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-800 font-semibold">Mpesa Code</label>
            <input
              type="number"
              className="w-full p-2 border rounded-md"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-800 font-semibold">Select Type</label>
            <select className="w-full p-2 border rounded-md" onChange={handleCategoryChange} value={selectedCategory || ""}>
              <option value="">-- Select --</option>
              {Object.keys(productCategories).map((key) => (
                <option key={key} value={key}>
                  {productCategories[key as keyof typeof productCategories].label}
                </option>
              ))}
            </select>
          </div>

          {selectedCategory && currentStep < attributeKeys.length && (
            <div>
              <label className="block text-sm font-semibold">{attributeKeys[currentStep]}</label>
              <select
              className="w-full p-2 border rounded-md"
              onChange={(e) => handleAttributeChange(attributeKeys[currentStep], e.target.value)}
              value={selectedValues[attributeKeys[currentStep]] || ""}
            >
              <option value="">-- Select --</option>
              {(categoryAttributes! as Record<string, string[]>)[attributeKeys[currentStep]].map((option: string) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            </div>
          )}

          {selectedCategory && Object.keys(selectedValues).length === attributeKeys.length && (
            <div className="bg-gray-200 p-4 rounded-md">
              <h3 className="text-lg font-semibold">Summary:</h3>
              <p><strong>Product Name:</strong> {productName}</p>
              <p><strong>Product Stock:</strong> {productStock}</p>
              <p><strong>Product Price:</strong> {productPrice}</p>
              <p><strong>Type:</strong> {selectedCategory}</p>
              {Object.entries(selectedValues).map(([key, value]) => (
                <p key={key}><strong>{key}:</strong> {value}</p>
              ))}
            </div>
          )}

          <div className="flex justify-between">
            {currentStep > 0 && (
              <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded-md" onClick={prevStep}>Back</button>
            )}
            {currentStep < attributeKeys.length - 1 && (
              <button type="button" className="bg-[#0f1c47] text-white px-4 py-2 rounded-md" onClick={nextStep} disabled={!selectedValues[attributeKeys[currentStep]]}>Next</button>
            )}
          </div>

          {selectedCategory && Object.keys(selectedValues).length === attributeKeys.length && (
            <button type="submit" className="bg-[#0f1c47]  text-white px-4 py-2 rounded-md w-full mt-4">Submit Sale</button>
          )}
        </form>
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default AddProduct;