/*"use client"

import React, { useState } from "react";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    variants: "",
    discount: "",
  });

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const addProduct = () => {
    setProducts((prev) => [...prev, newProduct]);
    setNewProduct({
      name: "",
      description: "",
      price: "",
      category: "",
      stock: "",
      variants: "",
      discount: "",
    });
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Manage Your Products</h3>

      <div className="mb-6">
        <h4 className="text-md font-semibold mb-2">Add New Product</h4>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={newProduct.name}
            onChange={handleInputChange}
            placeholder="Product Name"
            className="border rounded p-2"
          />
          <input
            type="text"
            name="description"
            value={newProduct.description}
            onChange={handleInputChange}
            placeholder="Description"
            className="border rounded p-2"
          />
          <input
            type="number"
            name="price"
            value={newProduct.price}
            onChange={handleInputChange}
            placeholder="Price"
            className="border rounded p-2"
          />
          <input
            type="text"
            name="category"
            value={newProduct.category}
            onChange={handleInputChange}
            placeholder="Category"
            className="border rounded p-2"
          />
          <input
            type="number"
            name="stock"
            value={newProduct.stock}
            onChange={handleInputChange}
            placeholder="Stock"
            className="border rounded p-2"
          />
          <input
            type="text"
            name="variants"
            value={newProduct.variants}
            onChange={handleInputChange}
            placeholder="Variants (e.g., size, color)"
            className="border rounded p-2"
          />
          <input
            type="number"
            name="discount"
            value={newProduct.discount}
            onChange={handleInputChange}
            placeholder="Discount (%)"
            className="border rounded p-2"
          />
        </div>
        <button
          onClick={addProduct}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Product
        </button>
      </div>

      <div>
        <h4 className="text-md font-semibold mb-2">Existing Products</h4>
        {products.length > 0 ? (
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr>
                <th className="border border-gray-200 p-2">Name</th>
                <th className="border border-gray-200 p-2">Description</th>
                <th className="border border-gray-200 p-2">Price</th>
                <th className="border border-gray-200 p-2">Category</th>
                <th className="border border-gray-200 p-2">Stock</th>
                <th className="border border-gray-200 p-2">Variants</th>
                <th className="border border-gray-200 p-2">Discount</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td className="border border-gray-200 p-2">{product.name}</td>
                  <td className="border border-gray-200 p-2">{product.description}</td>
                  <td className="border border-gray-200 p-2">{product.price}</td>
                  <td className="border border-gray-200 p-2">{product.category}</td>
                  <td className="border border-gray-200 p-2">{product.stock}</td>
                  <td className="border border-gray-200 p-2">{product.variants}</td>
                  <td className="border border-gray-200 p-2">{product.discount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-600">No products added yet.</p>
        )}
      </div>
    </div>
  );
};

export default ProductManagement;*/
