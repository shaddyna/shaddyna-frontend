"use client";

import Back from "@/components/Back";
import BackButton from "@/components/BackButton";
import BottomNavigationBar from "@/components/BottomNav";
import Footer from "@/components/Footer";
import HeadNavigation from "@/components/HeadNavigation";
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { FaArrowLeft, FaEllipsisV, FaPlus, FaSave, FaSpinner } from "react-icons/fa";

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [viewSeller, setViewSeller] = useState<Product | null>(null);
  const [editSeller, setEditSeller] = useState<Product | null>(null);
  const [newSeller, setNewSeller] = useState({ name: "", status: "" });
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const ellipsisRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
          ellipsisRef.current && !ellipsisRef.current.contains(event.target as Node)) {
        setOpenDropdownId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
   const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleMenuToggle = (sellerId: string) => {
    setOpenDropdownId(prevId => prevId === sellerId ? null : sellerId);
  };

  const modifiedHandleView = (seller: Product) => {
    setViewSeller(seller);
    setOpenDropdownId(null);
  };

  const modifiedHandleEdit = (sellerId: string) => {
    handleEdit(sellerId);
    setOpenDropdownId(null);
  };

  const modifiedHandleDelete = (sellerId: string) => {
    handleDelete(sellerId);
    setOpenDropdownId(null);
  };


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
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    
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
    } catch (error: any) {
      setError(error.message || "Error fetching products.");
      console.error("Error fetching products:", error);
      alert("Error fetching products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
}, []);



  /*useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          "https://shaddyna-backend.onrender.com/api/products/all"
        );
        setProducts(response.data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch products.");
      } finally {
        setLoading(false);
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
  const handleAddProduct = async () => {
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
  };
  
  const handleAddSeller = async () => {
    if (!newSeller.name || !newSeller.status) return;

    try {
      const response = await axios.post("/api/sellers", newSeller);
      setProducts([...products, response.data]);
      setNewSeller({ name: "", status: "" });
      setIsFormVisible(false);
    } catch (err) {
      console.error("Failed to add seller:", err);
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

    <div className="bg-gray-50 min-h-screen">
          <Back title={"Product Management"} />
          <div className="container mx-auto p-4 lg:p-6">
            {loading ? (
              <div className="flex min-h-screen justify-center items-center h-64">
                <FaSpinner className="animate-spin text-4xl text-[#1a365d]" />
              </div>
            ) : error ? (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            ) : (
              <>
                {viewSeller ? (
                  <div className="max-w-2xl mx-auto">
                    <button
                      onClick={handleBack}
                      className="mb-6 flex items-center text-[#1a365d] hover:text-[#ec4899] transition-colors"
                    >
                      <FaArrowLeft className="mr-2" /> Back to Sellers
                    </button>
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                      <h2 className="text-3xl font-bold text-gray-800 mb-4">{viewSeller.name}</h2>
                      <div className="flex items-center mb-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(viewSeller.name)}`}>
                          {viewSeller.name}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : editSeller ? (
                  <div className="max-w-2xl mx-auto">
                    <button
                      onClick={handleBack}
                      className="mb-6 flex items-center text-[#1a365d] hover:text-[#ec4899] transition-colors"
                    >
                      <FaArrowLeft className="mr-2" /> Back to Sellers
                    </button>
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                      <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Seller</h2>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                          <input
                            type="text"
                            value={editSeller.name}
                            onChange={(e) => setEditSeller({ ...editSeller, name: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a365d] focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                          <select
                            value={editSeller.name}
                            onChange={(e) => setEditSeller({ ...editSeller, name: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a365d] focus:border-transparent"
                          >
                            <option value="active">Active</option>
                            <option value="pending">Pending</option>
                            <option value="inactive">Inactive</option>
                          </select>
                        </div>
                        <button
                          onClick={handleSaveEdit}
                          className="w-full bg-gradient-to-r from-[#1a365d] to-[#ec4899] text-white px-6 py-3 rounded-lg font-medium hover:from-[#172554] hover:to-[#db2777] transition-all"
                        >
                          <FaSave className="inline mr-2" /> Save Changes
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="mb-8">
                      {!isFormVisible && (
                        <button
                          onClick={() => setIsFormVisible(true)}
                          className="bg-gradient-to-r from-[#1a365d] to-[#ec4899] text-white px-6 py-3 rounded-lg font-medium hover:from-[#172554] hover:to-[#db2777] transition-all"
                        >
                          <FaPlus className="inline mr-2" /> Add New Seller
                        </button>
                      )}
                    </div>
    
                    {isFormVisible && (
                      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Seller</h2>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                            <input
                              type="text"
                              value={newSeller.name}
                              onChange={(e) => setNewSeller({ ...newSeller, name: e.target.value })}
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a365d] focus:border-transparent"
                              placeholder="Enter seller name"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <select
                              value={newSeller.status}
                              onChange={(e) => setNewSeller({ ...newSeller, status: e.target.value })}
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a365d] focus:border-transparent"
                            >
                              <option value="">Select Status</option>
                              <option value="active">Active</option>
                              <option value="pending">Pending</option>
                              <option value="inactive">Inactive</option>
                            </select>
                          </div>
                          <div className="flex gap-4">
                            <button
                              onClick={handleAddSeller}
                              className="flex-1 bg-gradient-to-r from-[#1a365d] to-[#ec4899] text-white px-6 py-3 rounded-lg font-medium hover:from-[#172554] hover:to-[#db2777] transition-all"
                            >
                              Add Seller
                            </button>
                            <button
                              onClick={() => setIsFormVisible(false)}
                              className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-all"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map((seller) => (
                          <div key={seller.id} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                            <div className="flex justify-between items-start mb-4">
                              <h3 className="text-xl font-semibold text-gray-800">{seller.name}</h3>
                              <div className="relative">
                                <button 
                                  ref={ellipsisRef}
                                  onClick={() => handleMenuToggle(seller.id)}
                                  className="text-gray-400 hover:text-gray-600 p-2 rounded-lg"
                                >
                                  <FaEllipsisV />
                                </button>
                                
                                {openDropdownId === seller.id && (
                                  <div 
                                    ref={dropdownRef}
                                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-100 z-10"
                                  >
                                    <button
                                      onClick={() => modifiedHandleView(seller)}
                                      className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 text-left"
                                    >
                                      View Details
                                    </button>
                                    <button
                                      onClick={() => modifiedHandleEdit(seller.id)}
                                      className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 text-left"
                                    >
                                      Edit
                                    </button>
                                    <button
                                      onClick={() => modifiedHandleDelete(seller.id)}
                                      className="block w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-50 text-left"
                                    >
                                      Delete
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                            {/* ... rest of the card content */}
                            <div className="flex items-center justify-between">
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(seller.name)}`}>
                                {seller.name}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                  </>
                )}
              </>
            )}
          </div>
          <Footer />
        </div>
          );
        };
        
    {/*<div className="bg-white text-gray-800">
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
     
      <Footer />
    </div>*/}

export default ProductManagement;
