/*"use client";

import BottomNavigationBar from '@/components/BottomNav';
import Footer from '@/components/Footer';
import HeadNavigation from '@/components/HeadNavigation';
import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

const ProductManagement: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: 'Product 1', price: 100, description: 'Description for Product 1' },
    { id: 2, name: 'Product 2', price: 200, description: 'Description for Product 2' },
  ]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', description: '' });
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [viewProduct, setViewProduct] = useState<Product | null>(null);
  const [editProduct, setEditProduct] = useState<Product | null>(null); // State for editing product

  const handleDelete = (id: number) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const handleEdit = (id: number) => {
    const productToEdit = products.find((product) => product.id === id);
    if (productToEdit) {
      setEditProduct(productToEdit); // Set the product to be edited
    }
  };

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.description) return;

    const newId = products.length ? products[products.length - 1].id + 1 : 1;
    const addedProduct: Product = {
      id: newId,
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      description: newProduct.description,
    };

    setProducts([...products, addedProduct]);
    setNewProduct({ name: '', price: '', description: '' });
    setIsFormVisible(false); // Hide form after adding the product
  };

  const handleView = (product: Product) => {
    setViewProduct(product);
  };

  const handleBack = () => {
    setViewProduct(null);
    setEditProduct(null); // Reset edit state when going back
  };

  const handleSaveEdit = () => {
    if (editProduct) {
      setProducts(
        products.map((product) =>
          product.id === editProduct.id ? { ...editProduct } : product
        )
      );
      setEditProduct(null); // Reset edit state after saving
    }
  };

  return (
    <div>
        <HeadNavigation />
    <div className="min-h-screen bg-white text-[#182155] p-8">
    <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 sm:mb-8 flex justify-between items-center px-4 sm:px-8">
  {/* Back Button *
  <button
  onClick={() => window.history.back()} // Goes back to the previous page
  className="flex items-center space-x-2 bg-[#ff199c] text-white px-5 py-2 rounded-lg text-base font-semibold hover:bg-pink-700 hover:scale-105 transition-all duration-300"
  aria-label="Go back"
>
  <FaArrowLeft className="text-xl" /> {/* Left arrow icon *
  <span className="hidden sm:inline-block">Back</span> {/* Optional text for better accessibility *
</button>


  /* Title *
  <span className="flex-grow text-center text-sm sm:text-lg mx-4">{/* Added mx-4 for spacing *}Product Management</span>

  {/* Add Product Button *
  <button
  onClick={() => setIsFormVisible(!isFormVisible)}
  className="flex items-center space-x-2 bg-[#ff199c] text-white px-5 py-2 rounded-lg text-base font-semibold hover:bg-pink-700 hover:scale-105 transition-all duration-300"
  aria-label={isFormVisible ? 'Hide Product Form' : 'Add New Product'}
>
  <span className="sm:hidden">+</span> {/* Plus icon for small screens *
  <span className="hidden sm:inline-block">{isFormVisible ? 'Hide Product Form' : 'Add New Product'}</span>
</button>

</h1>


{/* Product Form *
{isFormVisible && (
  <div className="max-w-4xl mx-auto bg-[#f8f8f8] text-[#182155] rounded-lg shadow-lg p-6 sm:p-8">
    <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center">Add Product</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      <input
        type="text"
        placeholder="Product Name"
        value={newProduct.name}
        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        className="p-3 sm:p-4 border-2 border-[#ff199c] rounded-md focus:ring-2 focus:ring-[#ff199c] transition duration-300 text-sm sm:text-base"
      />
      <input
        type="number"
        placeholder="Price"
        value={newProduct.price}
        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        className="p-3 sm:p-4 border-2 border-[#ff199c] rounded-md focus:ring-2 focus:ring-[#ff199c] transition duration-300 text-sm sm:text-base"
      />
      <input
        type="text"
        placeholder="Description"
        value={newProduct.description}
        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
        className="p-3 sm:p-4 border-2 border-[#ff199c] rounded-md focus:ring-2 focus:ring-[#ff199c] transition duration-300 text-sm sm:text-base"
      />
      <button
        onClick={handleAddProduct}
        className="col-span-1 sm:col-span-2 lg:col-span-3 bg-[#ff199c] text-white p-3 sm:p-4 rounded-md text-lg font-semibold hover:bg-pink-700 transition duration-300"
        aria-label="Add Product"
      >
        <span className="sm:hidden">+</span> {/* Plus icon for small screens *
        <span className="hidden sm:inline">Add Product</span> {/* Show text only on larger screens *
      </button>
    </div>
  </div>
)}



      {/* Product List *
{!viewProduct && !editProduct && (
  <div className="mt-8 px-4 sm:px-6">
    <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center sm:text-left">
      Product List
    </h2>
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-[#f8f8f8] text-[#182155] rounded-lg p-4 sm:p-6 shadow-md flex flex-col justify-between space-y-4"
        >
          <div>
            <h3 className="text-xl sm:text-2xl font-bold">{product.name}</h3>
            <p className="text-sm sm:text-base text-gray-600">Price: ${product.price}</p>
            <p className="text-xs sm:text-sm text-gray-500">{product.description}</p>
          </div>
          <div className="flex justify-between sm:space-x-4 space-x-2">
            <button
              onClick={() => handleEdit(product.id)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm sm:text-base hover:bg-blue-700 transition duration-300 w-full sm:w-auto"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(product.id)}
              className="bg-red-500 text-white px-4 py-2 rounded-md text-sm sm:text-base hover:bg-red-700 transition duration-300 w-full sm:w-auto"
            >
              Delete
            </button>
            <button
              onClick={() => handleView(product)}
              className="bg-green-500 text-white px-4 py-2 rounded-md text-sm sm:text-base hover:bg-green-700 transition duration-300 w-full sm:w-auto"
            >
              View
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
)}


      {/* Product Detail View *
      {viewProduct && (
        <div className="max-w-4xl mx-auto bg-[#f8f8f8] text-[#182155] rounded-lg shadow-lg p-8 mt-8">
          <button
            onClick={handleBack}
            className="bg-[#ff199c] text-white px-6 py-3 rounded-xl text-lg font-semibold hover:bg-pink-700 transition duration-300 mb-6"
          >
            Back to Products
          </button>
          <h2 className="text-3xl font-bold text-center mb-6">{viewProduct.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Price: ${viewProduct.price}</h3>
              <p className="text-lg">{viewProduct.description}</p>
            </div>
            <div>
              <img
                src="https://via.placeholder.com/400"
                alt="Product Image"
                className="w-full h-full object-cover rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      )}

      {/* Product Edit View *
      {editProduct && (
        <div className="max-w-4xl mx-auto bg-[#f8f8f8] text-[#182155] rounded-lg shadow-lg p-8 mt-8">
            <button
            onClick={handleBack}
            className="bg-[#ff199c] text-white px-6 py-3 rounded-xl text-lg font-semibold hover:bg-pink-700 transition duration-300 mb-6"
          >
            Back to Products
          </button>
          <h2 className="text-2xl font-bold mb-6 text-center">Edit Product</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <input
              type="text"
              placeholder="Product Name"
              value={editProduct.name}
              onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
              className="p-3 border-2 border-[#ff199c] rounded-md focus:ring-2 focus:ring-[#ff199c] transition duration-300"
            />
            <input
            type="number"
            placeholder="Price"
            value={editProduct.price}
            onChange={(e) =>
                setEditProduct({
                ...editProduct,
                price: parseFloat(e.target.value), // Convert the string to a number
                })
            }
            className="p-3 border-2 border-[#ff199c] rounded-md focus:ring-2 focus:ring-[#ff199c] transition duration-300"
            />
            <input
              type="text"
              placeholder="Description"
              value={editProduct.description}
              onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })}
              className="p-3 border-2 border-[#ff199c] rounded-md focus:ring-2 focus:ring-[#ff199c] transition duration-300"
            />
            <button
              onClick={handleSaveEdit}
              className="col-span-1 md:col-span-3 bg-[#ff199c] text-white p-3 rounded-md text-lg font-semibold hover:bg-pink-700 transition duration-300"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
    <Footer />
    <BottomNavigationBar />
    </div>
  );
};

export default ProductManagement;*/



/*"use client";

import BackButton from "@/components/BackButton";
import BottomNavigationBar from "@/components/BottomNav";
import Footer from "@/components/Footer";
import HeadNavigation from "@/components/HeadNavigation";
import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
}

const ProductManagement: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]); 
  const [newProduct, setNewProduct] = useState({ name: "", price: "", description: "" });
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [viewProduct, setViewProduct] = useState<Product | null>(null);
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://shaddyna-backend.onrender.com/api/products/all");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        const formattedProducts = data.products.map((product: any) => ({
          id: product._id.toString(),
          name: product.name,
          price: product.price,
          description: product.description,
        }));
        setProducts(formattedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        alert("Error fetching products. Please try again.");
      }
    };
    fetchProducts();
  }, []);

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
    if (!newProduct.name || !newProduct.price || !newProduct.description) {
      alert("All fields are required");
      return;
    }

    const addedProduct = {
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      description: newProduct.description,
    };

    try {
      const response = await fetch("https://shaddyna-backend.onrender.com/api/products/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(addedProduct),
      });

      if (!response.ok) {
        alert("Failed to add product");
        return;
      }

      const savedProduct = await response.json();
      setProducts([...products, savedProduct]);
      setNewProduct({ name: "", price: "", description: "" });
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
      <HeadNavigation />
      <div className="container mx-auto p-6">
  <div className="flex items-center justify-between">
    <BackButton />
    <h1 className="text-3xl font-bold text-[#182155]">
      Product Management
    </h1>
  </div>
</div>

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
        <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
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
          <button
            onClick={handleAddProduct}
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
        <div className="container mx-auto p-6">
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
          <button
            onClick={() => setIsFormVisible(true)}
            className="mt-6 bg-[#ff199c] text-white p-2 rounded-md"
          >
            Add Product
          </button>
        </div>
      )}
      <BottomNavigationBar />
      <Footer />
    </div>
  );
};

export default ProductManagement;*/




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

////////////////////////////////////////////////////
///////////////////////////////////////////////////
/*useEffect(() => {
  const fetchProducts = async () => {
    if (!sellerId || !Types.ObjectId.isValid(sellerId)) {
      console.error("Invalid sellerId format:", sellerId);
      return; // Skip fetching if sellerId is invalid
    }

    // Log the data being sent to the backend
    const url = `http://localhost:5000/api/products/sellerId?sellerId=${sellerId}`;
    console.log("Sending request to backend with URL:", url); // Log the URL
    console.log("Request data:", { sellerId }); // Log the data being sent

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      const formattedProducts = data.products.map((product: any) => ({
        id: product._id.toString(),
        name: product.name,
        price: product.price,
        description: product.description,
      }));
      setProducts(formattedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
      alert("Error fetching products. Please try again!!!.");
    }
  };

  fetchProducts();
}, [sellerId]);*/ // This effect will run when sellerId changes
///////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////


/*useEffect(() => {
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

useEffect(() => {
  const fetchProducts = async () => {
    if (!sellerId) return; // Ensure sellerId is available

    try {
      const response = await fetch(
        `http://localhost:5000/api/products/seller?sellerId=${sellerId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      const formattedProducts = data.products.map((product: any) => ({
        id: product._id.toString(),
        name: product.name,
        price: product.price,
        description: product.description,
      }));
      setProducts(formattedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
      alert("Error fetching products. Please try again.");
    }
  };

  fetchProducts();
}, [sellerId]); */


  /*useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://shaddyna-backend.onrender.com/api/products/all");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        const formattedProducts = data.products.map((product: any) => ({
          id: product._id.toString(),
          name: product.name,
          price: product.price,
          description: product.description,
        }));
        setProducts(formattedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        alert("Error fetching products. Please try again.");
      }
    };
    fetchProducts();
  }, []);*/

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
  /*const handleAddProduct = async () => {
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
    };
  
    // Log the addedProduct object to ensure the values are correct
    console.log("Product data being sent to server:", addedProduct);
  
    try {
      const formData = new FormData();
      formData.append("name", addedProduct.name);
      formData.append("price", addedProduct.price.toString());
      formData.append("description", addedProduct.description);
      formData.append("categoryId", addedProduct.categoryId);
  
      // Log images before appending to FormData
      console.log("Images being sent:", newProduct.images);
      newProduct.images.forEach((file, index) => {
        console.log(`Appending image ${index + 1}: ${file.name}`); // Log each image
        formData.append("images", file);
      });
  
      const response = await fetch("https://shaddyna-backend.onrender.com/api/products/add", {
        method: "POST",
        body: formData, // Let the browser set the Content-Type
      });
  
      // Log the response from the server
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
  };*/

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
    <Back title={"Product Management"} />
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
        onClick={handleAddProduct}
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
          <button
            onClick={() => setIsFormVisible(true)}
            className="mt-6 bg-[#ff199c] text-white p-2 rounded-md"
          >
            Add Product
          </button>
        </div>
      )}
      <BottomNavigationBar />
      <Footer />
    </div>
    </div>
  );
};

export default ProductManagement;

