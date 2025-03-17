"use client";
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import HeadNavigation from '@/components/HeadNavigation';
import Footer from '@/components/Footer';
import BottomNavigationBar from '@/components/BottomNav';
import BackButton from '@/components/BackButton';
import Back from '@/components/Back';
import { FaArrowLeft, FaEllipsisV, FaPlus, FaSave, FaSpinner } from 'react-icons/fa';

type Category = {
  _id: string;
  name: string;
  description?: string;
  imageUrl?: string;  // Add imageUrl to the Category type
};

const AdminCategories = () => {
  /*const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState<Category>({ name: '', description: '' });
  const [editCategory, setEditCategory] = useState<Category | null>(null);
  const [image, setImage] = useState<File | null>(null);  // New state for the image file

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreate = async () => {
    // Step 1: Check if name is provided
    if (!newCategory.name) {
      alert('Name is required');
      return;
    }
  
    // Step 2: Log the data being sent
    console.log('Category Data to be Sent:', newCategory);
  
    // Step 3: Create FormData object and append the category data
    const formData = new FormData();
    formData.append('name', newCategory.name);
    formData.append('description', newCategory.description || '');
  
    // Step 4: Log the FormData before appending the image to ensure it contains name and description
    console.log('FormData Entries (before image):');
    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }
  
    // Step 5: Append the image if provided
    if (image) {
      console.log('Selected Image:', image);
      formData.append('image', image);
    } else {
      console.log('No image selected');
    }
  
    // Step 6: Log FormData after appending image
    console.log('FormData Entries (after image):');
    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }
  
    // Step 7: Send the POST request to create the category
    try {
      const response = await axios.post('http://localhost:5000/api/categories', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Let the browser set this automatically
        },
      });
      
      console.log('Category created:', response.data);
  
      // Step 8: Reset the form data after successful submission
      setNewCategory({ name: '', description: '' });
      setImage(null);  // Reset the image after submission
  
      // Step 9: Fetch updated categories
      fetchCategories();
    } catch (error) {
      // Step 10: Handle errors during category creation
      console.error('Error creating category:', error);
    }
  };
  
  
  
  
  

  const handleUpdate = async () => {
    if (!editCategory || !editCategory._id) {
      alert('Invalid category to update');
      return;
    }

    const formData = new FormData();
    formData.append('name', editCategory.name);
    formData.append('description', editCategory.description || '');
    
    // If an image is selected, append it to the form data
    if (image) {
      formData.append('image', image);
    }

    try {
      await axios.put(`https://shaddyna-backend.onrender.com/api/categories/${editCategory._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setEditCategory(null);
      setImage(null);  // Reset the image after submission
      fetchCategories();
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`https://shaddyna-backend.onrender.com/api/categories/${id}`);
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };*/




  const [sellers, setSellers] = useState<Category []>([]);
    const [newSeller, setNewSeller] = useState({ name: "", status: "" });
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [viewSeller, setViewSeller] = useState<Category | null>(null);
    const [editSeller, setEditSeller] = useState<Category  | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
  
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
    
  
      const handleMenuToggle = (sellerId: string) => {
        setOpenDropdownId(prevId => prevId === sellerId ? null : sellerId);
      };
  
      const modifiedHandleView = (seller: Category ) => {
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
      const fetchSellers = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await axios.get(
            "https://shaddyna-backend.onrender.com/api/categories"
          );
          setSellers(response.data);
        } catch (err: any) {
          setError(err.message || "Failed to fetch sellers.");
        } finally {
          setLoading(false);
        }
      };
  
      fetchSellers();
    }, []);
  
    const handleDelete = async (_id: string) => {
      try {
        await axios.delete(`/api/sellers/${_id}`);
        setSellers(sellers.filter((seller) => seller._id !== _id));
      } catch (err) {
        console.error("Failed to delete seller:", err);
      }
    };
  
    const handleEdit = (_id: string) => {
      const sellerToEdit = sellers.find((seller) => seller._id === _id);
      if (sellerToEdit) {
        setEditSeller(sellerToEdit);
      }
    };
  
    const handleAddSeller = async () => {
      if (!newSeller.name || !newSeller.status) return;
  
      try {
        const response = await axios.post("/api/sellers", newSeller);
        setSellers([...sellers, response.data]);
        setNewSeller({ name: "", status: "" });
        setIsFormVisible(false);
      } catch (err) {
        console.error("Failed to add seller:", err);
      }
    };
  
    const handleBack = () => {
      setViewSeller(null);
      setEditSeller(null);
    };
  
    const handleSaveEdit = async () => {
      if (editSeller) {
        try {
          const response = await axios.put(
            `https://shaddyna-backend.onrender.com/api/sellers/edit/${editSeller._id}`,
            editSeller
          );
          setSellers(
            sellers.map((seller) =>
              seller._id === editSeller._id ? response.data : seller
            )
          );
          setEditSeller(null);
        } catch (err) {
          console.error("Failed to update seller:", err);
        }
      }
    };
  
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







  return (
    <div className="bg-gray-50 min-h-screen">
    <Back title={"category Management"} />
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
                <FaArrowLeft className="mr-2" /> Back to Categories
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
                <FaArrowLeft className="mr-2" /> Back to Categories
              </button>
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Category</h2>
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
                    <FaPlus className="inline mr-2" /> Add New Category
                  </button>
                )}
              </div>

              {isFormVisible && (
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Category</h2>
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
                  {sellers.map((seller) => (
                    <div key={seller._id} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-semibold text-gray-800">{seller.name}</h3>
                        <div className="relative">
                          <button 
                            ref={ellipsisRef}
                            onClick={() => handleMenuToggle(seller._id)}
                            className="text-gray-400 hover:text-gray-600 p-2 rounded-lg"
                          >
                            <FaEllipsisV />
                          </button>
                          
                          {openDropdownId === seller._id && (
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
                                onClick={() => modifiedHandleEdit(seller._id)}
                                className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 text-left"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => modifiedHandleDelete(seller._id)}
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
  
    {/*<div>
      <HeadNavigation />
      <div className="bg-white text-gray-800 p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
        <div className="flex items-center justify-between p-3 pt-0">
          <BackButton />
          <h1 className="text-3xl font-bold text-[#182155]">Categories</h1>
        </div>

        {/* Create new category *
        <div className="bg-[#ff199c] p-6 rounded-lg mb-6">
          <h2 className="text-2xl font-semibold text-white mb-4">Add New Category</h2>
          <div className="space-y-4">
            <input
              className="w-full p-3 rounded-md border-2 border-[#182155] focus:outline-none focus:ring-2 focus:ring-[#ff199c] text-gray-800"
              placeholder="Category Name"
              value={newCategory.name}
              onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
            />
            <textarea
              className="w-full p-3 rounded-md border-2 border-[#182155] focus:outline-none focus:ring-2 focus:ring-[#ff199c] text-gray-800"
              placeholder="Category Description"
              value={newCategory.description || ''}
              onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
            ></textarea>
            <input
              type="file"
              className="w-full p-3 rounded-md border-2 border-[#182155] focus:outline-none focus:ring-2 focus:ring-[#ff199c] text-gray-800"
              onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
            />
            <button
              className="w-full py-3 bg-[#182155] text-white font-semibold rounded-md hover:bg-[#ff199c] transition duration-300"
              onClick={handleCreate}
            >
              Add Category
            </button>
          </div>
        </div>

        {/* List categories *
        <h2 className="text-2xl font-semibold text-[#182155] mb-4">Categories</h2>
        <ul className="space-y-4">
          {categories.map((category) => (
            <li
              key={category._id}
              className="flex justify-between items-center p-4 bg-[#f1f5f8] rounded-lg shadow-md hover:bg-[#e3e8f1] transition duration-300"
            >
              {editCategory && editCategory._id === category._id ? (
                <div className="space-y-4">
                  <input
                    className="w-full p-3 rounded-md border-2 border-[#182155] focus:outline-none focus:ring-2 focus:ring-[#ff199c] text-gray-800"
                    value={editCategory.name || ''}
                    onChange={(e) =>
                      setEditCategory((prev) =>
                        prev ? { ...prev, name: e.target.value } : prev
                      )
                    }
                  />
                  <textarea
                    className="w-full p-3 rounded-md border-2 border-[#182155] focus:outline-none focus:ring-2 focus:ring-[#ff199c] text-gray-800"
                    value={editCategory.description || ''}
                    onChange={(e) =>
                      setEditCategory((prev) =>
                        prev ? { ...prev, description: e.target.value } : prev
                      )
                    }
                  ></textarea>
                  <input
                    type="file"
                    className="w-full p-3 rounded-md border-2 border-[#182155] focus:outline-none focus:ring-2 focus:ring-[#ff199c] text-gray-800"
                    onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
                  />
                  <button
                    className="bg-[#182155] text-white px-4 py-2 rounded-md hover:bg-[#ff199c] transition duration-300"
                    onClick={handleUpdate}
                  >
                    Save Changes
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between w-full">
                  <span className="text-lg font-semibold text-[#182155]">{category.name}</span>
                  <div className="space-x-4">
                    <button
                      className="bg-[#ff199c] text-white px-4 py-2 rounded-md hover:bg-[#182155] transition duration-300"
                      onClick={() => setEditCategory(category)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-[#182155] text-white px-4 py-2 rounded-md hover:bg-[#ff199c] transition duration-300"
                      onClick={() => handleDelete(category._id!)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
      <Footer />
      <BottomNavigationBar />
    </div>*/}

export default AdminCategories;


