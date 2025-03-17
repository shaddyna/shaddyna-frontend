/*"use client";

import BottomNavigationBar from "@/components/BottomNav";
import Footer from "@/components/Footer";
import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import Back from "@/components/Back";

interface Seller {
  _id: string;
  name: string;
  status: string;
}

const SellerManagement: React.FC = () => {
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [newSeller, setNewSeller] = useState({ name: "", status: "" });
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [viewSeller, setViewSeller] = useState<Seller | null>(null);
  const [editSeller, setEditSeller] = useState<Seller | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSellers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          "https://shaddyna-backend.onrender.com/api/sellers/"
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

  const handleView = (seller: Seller) => {
    setViewSeller(seller);
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

  return (
    <div className="bg-white text-gray-900 min-h-screen">
      <Back title={"Seller Management"} />
      <div className="container mx-auto p-4">
        {loading ? (
          <p className="text-center text-xl text-[#182155]">Loading sellers...</p>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <>
            {viewSeller ? (
              <div>
                <button
                  onClick={handleBack}
                  className="mb-4 flex items-center text-[#182155]"
                >
                  <FaArrowLeft /> Back
                </button>
                <div className="bg-[#182155] text-white p-6 rounded shadow">
                  <h2 className="text-2xl font-bold">{viewSeller.name}</h2>
                  <p>Status: {viewSeller.status}</p>
                </div>
              </div>
            ) : editSeller ? (
              <div>
                <button
                  onClick={handleBack}
                  className="mb-4 flex items-center text-[#182155]"
                >
                  <FaArrowLeft /> Back
                </button>
                <div className="bg-[#182155] p-6 text-white rounded shadow">
                  <h2 className="text-2xl font-bold mb-4">Edit Seller</h2>
                  <input
                    type="text"
                    value={editSeller.name}
                    onChange={(e) =>
                      setEditSeller({ ...editSeller, name: e.target.value })
                    }
                    placeholder="Name"
                    className="w-full p-2 mb-4 border rounded"
                  />
                  <select
                    value={editSeller.status}
                    onChange={(e) =>
                      setEditSeller({ ...editSeller, status: e.target.value })
                    }
                    className="w-full p-2 mb-4 border rounded"
                  >
                    <option value="active">Activate</option>
                    <option value="pending">Pending</option>
                    <option value="inactive">Deactivate</option>
                  </select>
                  <button
                    onClick={handleSaveEdit}
                    className="bg-[#ff199c] text-white px-4 py-2 rounded shadow hover:bg-[#e61789]"
                  >
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <>
             <div className="container mx-auto p-3">
              </div>
                <ul>
                  {sellers.map((seller) => (
                    <li
                      key={seller._id}
                      className="bg-gray-100 p-4 rounded shadow mb-4 flex justify-between items-center"
                    >
                      <div>
                        <h3 className="text-lg font-semibold">{seller.name}</h3>
                        <p>Status: {seller.status}</p>
                      </div>
                      <div>
                        <button
                          onClick={() => handleView(seller)}
                          className="bg-[#182155] text-white px-3 py-1 rounded mr-2"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleEdit(seller._id)}
                          className="bg-[#ff199c] text-white px-3 py-1 rounded mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(seller._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded"
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
                {isFormVisible ? (
                  <div className="bg-[#182155] p-6 text-white rounded shadow mt-6">
                    <h2 className="text-xl font-bold mb-4">Add Seller</h2>
                    <input
                      type="text"
                      value={newSeller.name}
                      onChange={(e) =>
                        setNewSeller({ ...newSeller, name: e.target.value })
                      }
                      placeholder="Name"
                      className="w-full p-2 mb-4 border rounded"
                    />
                    <input
                      type="text"
                      value={newSeller.status}
                      onChange={(e) =>
                        setNewSeller({ ...newSeller, status: e.target.value })
                      }
                      placeholder="Status"
                      className="w-full p-2 mb-4 border rounded"
                    />
                    <button
                      onClick={handleAddSeller}
                      className="bg-[#ff199c] text-white px-4 py-2 rounded shadow hover:bg-[#e61789]"
                    >
                      Add
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsFormVisible(true)}
                    className="bg-[#182155] text-white px-4 py-2 rounded shadow hover:bg-[#141b45] mt-6"
                  >
                    Add Seller
                  </button>
                )}
              </>
            )}
          </>
        )}
      </div>
      <Footer />
      <BottomNavigationBar />
    </div>
  );
};

export default SellerManagement;*/

"use client";

import Footer from "@/components/Footer";
import React, { useState, useRef, useEffect } from "react";
import { FaArrowLeft, FaPlus, FaSave, FaSpinner, FaEllipsisV } from "react-icons/fa";
import axios from "axios";
import Back from "@/components/Back";

interface Seller {
  _id: string;
  name: string;
  status: string;
}

const SellerManagement: React.FC = () => {
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [newSeller, setNewSeller] = useState({ name: "", status: "" });
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [viewSeller, setViewSeller] = useState<Seller | null>(null);
  const [editSeller, setEditSeller] = useState<Seller | null>(null);
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

    const modifiedHandleView = (seller: Seller) => {
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
          "https://shaddyna-backend.onrender.com/api/sellers/"
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
      <Back title={"Seller Management"} />
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
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(viewSeller.status)}`}>
                      {viewSeller.status}
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
                        value={editSeller.status}
                        onChange={(e) => setEditSeller({ ...editSeller, status: e.target.value })}
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
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(seller.status)}`}>
                            {seller.status}
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

export default SellerManagement;





