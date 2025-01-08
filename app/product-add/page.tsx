"use client";

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
  {/* Back Button */}
  <button
  onClick={() => window.history.back()} // Goes back to the previous page
  className="flex items-center space-x-2 bg-[#ff199c] text-white px-5 py-2 rounded-lg text-base font-semibold hover:bg-pink-700 hover:scale-105 transition-all duration-300"
  aria-label="Go back"
>
  <FaArrowLeft className="text-xl" /> {/* Left arrow icon */}
  <span className="hidden sm:inline-block">Back</span> {/* Optional text for better accessibility */}
</button>


  {/* Title */}
  <span className="flex-grow text-center text-sm sm:text-lg mx-4">{/* Added mx-4 for spacing */}Product Management</span>

  {/* Add Product Button */}
  <button
  onClick={() => setIsFormVisible(!isFormVisible)}
  className="flex items-center space-x-2 bg-[#ff199c] text-white px-5 py-2 rounded-lg text-base font-semibold hover:bg-pink-700 hover:scale-105 transition-all duration-300"
  aria-label={isFormVisible ? 'Hide Product Form' : 'Add New Product'}
>
  <span className="sm:hidden">+</span> {/* Plus icon for small screens */}
  <span className="hidden sm:inline-block">{isFormVisible ? 'Hide Product Form' : 'Add New Product'}</span>
</button>

</h1>


{/* Product Form */}
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
        <span className="sm:hidden">+</span> {/* Plus icon for small screens */}
        <span className="hidden sm:inline">Add Product</span> {/* Show text only on larger screens */}
      </button>
    </div>
  </div>
)}



      {/* Product List */}
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


      {/* Product Detail View */}
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

      {/* Product Edit View */}
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

export default ProductManagement;




