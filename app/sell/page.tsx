


"use client";

import BackButton from "@/components/BackButton";
import BottomNavigationBar from "@/components/BottomNav";
import Footer from "@/components/Footer";
import HeadNavigation from "@/components/HeadNavigation";
import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useUserSellerStore } from "@/store/useUserSellerStore";
import { Types } from 'mongoose';
import Back from "@/components/Back";

interface Product {
  id: string;           // Unique identifier for the product
  name: string;         // Name of the product
  price: number;        // Price of the product
  description: string;  // Description of the product
  categoryId?: string;  // Optional category ID (string format for ObjectId)
}

interface Category {
  _id: string;
  name: string;
}


const ProductManagement: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]); 
  //const [newProduct, setNewProduct] = useState({ name: "", price: "", description: "", categoryId: '', });
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    categoryId: "",
    images: [] as File[], // Store multiple images here
  });
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [viewProduct, setViewProduct] = useState<Product | null>(null);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [sellerId, setSellerId] = useState<string | null>(null);

  const fetchCurrentUser = useUserSellerStore((state) => state.fetchCurrentUser);

useEffect(() => {
  const fetchCategories = async () => {
    try {
      const response = await fetch('https://shaddyna-backend.onrender.com/api/categories');
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  fetchCategories();
}, []);

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
const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`https://shaddyna-backend.onrender.com/api/products/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }
      setProducts(products.filter((product) => product.id !== id));
      alert("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Error deleting product. Please try again.");
    }
  };

  const handleEdit = (id: string) => {
    const productToEdit = products.find((product) => product.id === id);
    if (productToEdit) {
      setEditProduct({ ...productToEdit });
    }
  };
  const handleAddProduct = async () => {
    // Fetch current user and sellers from the store
    await useUserSellerStore.getState().fetchCurrentUser();
    const currentUserRole = useUserSellerStore.getState().currentUserRole;
  
    // Ensure the current user is a seller
    if (currentUserRole !== "seller") {
      alert("Only sellers can add products.");
      return;
    }
  
    const { user, sellers } = useUserSellerStore.getState();
    if (!user) {
      alert("User information is missing. Please log in.");
      return;
    }
  
    const seller = sellers.find((seller) => seller.email === user.email);
    if (!seller) {
      alert("No matching seller found for the current user.");
      return;
    }
  
    const sellerId = seller._id;
    console.log(`Adding product for seller with ID: ${sellerId}`);
  
    // Log the newProduct object before validating
    console.log("newProduct object before validation:", newProduct);
  
    // Validate if all required fields are provided
    if (
      !newProduct.name ||
      !newProduct.price ||
      !newProduct.description ||
      !newProduct.categoryId ||
      newProduct.images.length === 0
    ) {
      alert("All fields (name, price, description, category, and images) are required");
      return;
    }
  
    // Prepare the added product object
    const addedProduct = {
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      description: newProduct.description,
      categoryId: newProduct.categoryId,
      sellerId, // Include sellerId here
    };
  
    console.log("Product data being sent to server:", addedProduct);
  
    try {
      const formData = new FormData();
      formData.append("name", addedProduct.name);
      formData.append("price", addedProduct.price.toString());
      formData.append("description", addedProduct.description);
      formData.append("categoryId", addedProduct.categoryId);
      formData.append("sellerId", addedProduct.sellerId); // Append sellerId to FormData
  
      console.log("Images being sent:", newProduct.images);
      newProduct.images.forEach((file, index) => {
        console.log(`Appending image ${index + 1}: ${file.name}`);
        formData.append("images", file);
      });
  
      const response = await fetch("https://shaddyna-backend.onrender.com/api/products/add", {
        method: "POST",
        body: formData, // Let the browser set the Content-Type
      });
  
      console.log("Response from server:", response);
  
      if (!response.ok) {
        alert("Failed to add product");
        return;
      }
  
      const savedProduct = await response.json();
      setProducts([...products, savedProduct.product]);
      setNewProduct({ name: "", price: "", description: "", categoryId: "", images: [] });
      setIsFormVisible(false);
      alert("Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Error adding product. Please try again.");
    }
  };
  const handleView = (product: Product) => {
    setViewProduct(product);
  };

  const handleBack = () => {
    setViewProduct(null);
    setEditProduct(null);
  };

  const handleSaveEdit = async () => {
    if (editProduct) {
      try {
        const response = await fetch(`https://shaddyna-backend.onrender.com/api/products/update/${editProduct.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify(editProduct),
        });

        if (!response.ok) {
          throw new Error("Failed to update product");
        }

        const updatedProduct = await response.json();
        setProducts(
          products.map((product) =>
            product.id === editProduct.id ? updatedProduct : product
          )
        );
        setEditProduct(null);
        alert("Product updated successfully!");
      } catch (error) {
        console.error("Error updating product:", error);
        alert("Error updating product. Please try again.");
      }
    }
  };

  return (
    <div className="bg-white text-gray-800">
    <Back title={"New Product"} />
    <div className="">
      {viewProduct ? (
        <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-[#182155]">Product Details</h2>
          <p className="text-sm text-gray-600">ID: {viewProduct.id}</p>
          <p className="text-lg font-semibold text-[#182155]">Name: {viewProduct.name}</p>
          <p className="text-lg text-[#ff199c]">Price: ${viewProduct.price}</p>
          <p className="text-gray-600">{viewProduct.description}</p>
          <button 
            onClick={handleBack} 
            className="mt-4 text-[#ff199c] hover:underline">
            <FaArrowLeft /> Back
          </button>
        </div>
      ) : editProduct ? (
        <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-[#182155]">Edit Product</h2>
          <input
            type="text"
            value={editProduct.name}
            onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
            className="w-full p-3 mt-4 border border-gray-300 rounded-md"
          />
          <input
            type="number"
            value={editProduct.price}
            onChange={(e) => setEditProduct({ ...editProduct, price: parseFloat(e.target.value) })}
            className="w-full p-3 mt-4 border border-gray-300 rounded-md"
          />
          <textarea
            value={editProduct.description}
            onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })}
            className="w-full p-3 mt-4 border border-gray-300 rounded-md"
          />
          <button
            onClick={handleSaveEdit}
            className="mt-4 bg-[#ff199c] text-white p-2 rounded-md"
          >
            Save
          </button>
          <button
            onClick={handleBack}
            className="mt-4 ml-4 text-[#ff199c] hover:underline"
          >
            Cancel
          </button>
        </div>
     ) : isFormVisible ? (
      <div className="min-h-screen container mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-[#182155]">Add New Product</h2>
      <input
        type="text"
        placeholder="Product Name"
        value={newProduct.name}
        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        className="w-full p-3 mt-4 border border-gray-300 rounded-md"
      />
      <input
        type="number"
        placeholder="Product Price"
        value={newProduct.price}
        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        className="w-full p-3 mt-4 border border-gray-300 rounded-md"
      />
      <textarea
        placeholder="Product Description"
        value={newProduct.description}
        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
        className="w-full p-3 mt-4 border border-gray-300 rounded-md"
      />
      <select
        value={newProduct.categoryId}
        onChange={(e) => setNewProduct({ ...newProduct, categoryId: e.target.value })}
        className="w-full p-3 mt-4 border border-gray-300 rounded-md"
      >
        <option value="">Select a Category</option>
        {categories.map((category) => (
          <option key={category._id} value={category._id}>
            {category.name}
          </option>
        ))}
      </select>

      <input
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => setNewProduct({ ...newProduct, images: Array.from(e.target.files || []) })}
        className="w-full p-3 mt-4 border border-gray-300 rounded-md"
      />

      <button
        //onClick={handleAddProduct}
        className="mt-4 bg-[#ff199c] text-white p-2 rounded-md"
      >
        Add Product
      </button>
      <button
        onClick={() => setIsFormVisible(false)}
        className="mt-4 ml-4 text-[#ff199c] hover:underline"
      >
        Cancel
      </button>
    </div>

    ) : (
    
        <div className="min-h-screen container mx-auto p-6">
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <li key={product.id} className="bg-white p-6 rounded-lg shadow-md">
                <p className="font-semibold text-[#182155]">ID: {product.id}</p>
                <p className="text-xl text-[#182155]">{product.name}</p>
                <button
                  onClick={() => handleView(product)}
                  className="text-[#ff199c] mt-2 block"
                >
                  View
                </button>
                <button
                  onClick={() => handleEdit(product.id)}
                  className="text-[#ff199c] mt-2 block"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="text-[#ff199c] mt-2 block"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
          <main className="min-h-screen flex-grow flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-md sm:max-w-lg p-6 sm:p-8 bg-white rounded-lg shadow-lg border border-[#182155]">
          <h1 className="text-xl sm:text-3xl text-center font-semibold text-[#182155] mb-4 sm:mb-6">
            Post a new product
          </h1>

          <div className="flex flex-col items-center space-y-4 sm:space-y-6">
            <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-t-4 border-[#ff199c] rounded-full animate-spin"></div>

            <p className="text-sm sm:text-lg text-center text-[#182155]">
            Start Selling Instantly – No Seller Registration Needed!

Great news! On our e-commerce platform, you can create and sell products without the need to register as a seller. Whether you're a business owner or just someone with great items to offer, you can start selling right away!
            </p>

            <p className="text-xs sm:text-md text-center text-[#182155]">
            Start selling today and reach buyers effortlessly! 🚀
            </p>

            <div className="flex justify-center mt-4 sm:mt-6">
              <button className="py-2 px-4 sm:py-3 sm:px-6 bg-[#ff199c] text-white text-sm sm:text-base font-semibold rounded-lg hover:bg-[#e0157f] transition duration-300"
                onClick={() => setIsFormVisible(true)}
              >
                Add Product
              </button>
            </div>
          </div>
        </div>
      </main>
        </div>
      )}
      <BottomNavigationBar />
      <Footer />
    </div>
    </div>
  );
};

export default ProductManagement;
