"use client";
import Back from "@/components/Back";
import BottomNavBar from "@/components/BottomNav";
import axios from "axios";
import { useRouter } from "next/navigation"; 
import { useState } from "react";

const productCategories = {
  Car: {
    label: "Car",
    attributes: {
      Model: ["Toyota", "Ford", "Tesla"],
      Mileage: ["0-10K", "10K-50K", "50K+"],
      FuelType: ["Petrol", "Diesel", "Electric"],
      Transmission: ["Manual", "Automatic"],
      Year: ["2020", "2021", "2022"],
    },
  },
  Phone: {
    label: "Phone",
    attributes: {
      Brand: ["Apple", "Samsung", "OnePlus"],
      Storage: ["64GB", "128GB", "256GB"],
      CameraPixel: ["12MP", "48MP", "108MP"],
      BatteryLife: ["3000mAh", "4000mAh", "5000mAh"],
    },
  },
  Clothes: {
    label: "Clothes",
    attributes: {
      Brand: ["Nike", "Adidas", "Puma", "Kings"],
      Size: ["S", "M", "L", "XL"],
      Color: ["Red", "Blue", "Black", "White"],
      Material: ["Cotton", "Polyester", "Denim"],
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
    <Back title={"Sell"} />
    <div className="min-h-screen justify-center bg-gray-100 p-3">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Create a Product</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-800 font-semibold">Product Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-800 font-semibold">Product Stock</label>
            <input
              type="number"
              className="w-full p-2 border rounded-md"
              value={productStock}
              onChange={(e) => setProductStock(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-800 font-semibold">Product Price</label>
            <input
              type="number"
              className="w-full p-2 border rounded-md"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-800 font-semibold">Select Category</label>
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

          <div>
            <label className="block text-sm text-gray-800 font-semibold">Upload Images</label>
            <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="w-full text-gray-800 p-2 border rounded-md" />
          </div>


          {images.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {images.map((image, index) => (
                <div key={index} className="relative">
                  <img src={URL.createObjectURL(image)} alt="preview" className="w-20 h-20 object-cover rounded-md" />
                  <button type="button" onClick={() => removeImage(index)} className="absolute top-0 right-0 bg-red-500 text-white text-xs p-1 rounded-full">X</button>
                </div>
              ))}
            </div>
          )}

          {selectedCategory && Object.keys(selectedValues).length === attributeKeys.length && (
            <div className="bg-gray-200 p-4 rounded-md">
              <h3 className="text-lg font-semibold">Summary</h3>
              <p><strong>Product Name:</strong> {productName}</p>
              <p><strong>Product Stock:</strong> {productStock}</p>
              <p><strong>Product Price:</strong> {productPrice}</p>
              <p><strong>Category:</strong> {selectedCategory}</p>
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
              <button type="button" className="bg-blue-600 text-white px-4 py-2 rounded-md" onClick={nextStep} disabled={!selectedValues[attributeKeys[currentStep]]}>Next</button>
            )}
          </div>

          {selectedCategory && Object.keys(selectedValues).length === attributeKeys.length && (
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-md w-full mt-4">Submit Product</button>
          )}
        </form>
      </div>
      <div className="flex flex-col gap-4 pt-3 w-full max-w-md">
      <button 
        type="button" 
        className="bg-[#0f1c47] text-white px-4 py-2 rounded-md w-full" 
        onClick={() => router.push("/sell-shaddyna")} 
      >
        Sell Shaddyna
      </button>
      <button 
        type="button" 
        className="bg-[#0f1c47] text-white px-4 py-2 rounded-md w-full" 
        onClick={() => router.push("/sell-tshirt")} 
        >
        Sell T-shirt
      </button>
    </div>
    </div>
    <BottomNavBar />
    </div>
  );
};

export default AddProduct;