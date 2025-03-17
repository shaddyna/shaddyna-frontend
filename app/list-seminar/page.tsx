"use client";
import Back from "@/components/Back";
import BottomNavigationBar from "@/components/BottomNav";
import FloatingButton from "@/components/FloatingButton";
import FloatingSeminarButton from "@/components/FloatingSeminarButton";
import Footer from "@/components/Footer";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaEllipsisV, FaPlus, FaSave, FaSpinner } from "react-icons/fa";

interface Seminar {
  _id: string;
  name: string;
  image: string;
  description: string;
  date: string;
  amount: number;
}

export default function SeminarManagement() {
    const [sellers, setSellers] = useState<Seminar[]>([]);
    const [newSeller, setNewSeller] = useState({ name: "", status: "" });
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [viewSeller, setViewSeller] = useState<Seminar | null>(null);
    const [editSeller, setEditSeller] = useState<Seminar | null>(null);
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
  
      const modifiedHandleView = (seller: Seminar) => {
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
            "https://shaddyna-backend.onrender.com/api/seminars"
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
  /*const [seminars, setSeminars] = useState<Seminar[]>([]);
  const [editingSeminar, setEditingSeminar] = useState<Seminar | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    description: "",
    date: "",
    amount: "",
  });

  // Fetch seminars
  useEffect(() => {
    fetch("https://shaddyna-backend.onrender.com/api/seminars")
      .then((res) => res.json())
      .then((data) => setSeminars(data));
  }, []);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Open edit form
  const handleEdit = (seminar: Seminar) => {
    setEditingSeminar(seminar);
    setFormData({
      name: seminar.name,
      image: seminar.image,
      description: seminar.description,
      date: seminar.date,
      amount: seminar.amount.toString(),
    });
  };

  // Submit edit form
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSeminar) return;

    const response = await fetch(`https://shaddyna-backend.onrender.com/api/seminars/${editingSeminar._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert("Seminar updated successfully!");
      setEditingSeminar(null);
      window.location.reload();
    } else {
      alert("Failed to update seminar");
    }
  };

  // Delete seminar
  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this seminar?")) {
      const response = await fetch(`https://shaddyna-backend.onrender.com/api/seminars/${id}`, { method: "DELETE" });
      if (response.ok) {
        alert("Seminar deleted successfully!");
        setSeminars(seminars.filter((s) => s._id !== id));
      } else {
        alert("Failed to delete seminar");
      }
    }
  };*/

  //return (

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
                  <FaArrowLeft className="mr-2" /> Back to Seminars
                </button>
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Seminar</h2>
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
                      <FaPlus className="inline mr-2" /> Add New Seminar
                    </button>
                  )}
                </div>

                {isFormVisible && (
                  <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Seminar</h2>
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
}

    {/*<div className="bg-gray-50 min-h-screen">
    <Back title={"Seminar Management"} />
    <div className="max-w-4xl mx-auto p-3">
      <div className="grid md:grid-cols-2 gap-6">
        {seminars.map((seminar) => (
          <div key={seminar._id} className="bg-white shadow-lg rounded-lg p-4">
            <img src={seminar.image} alt={seminar.name} className="rounded-md w-full h-40 object-cover" />
            <h2 className="text-xl font-semibold mt-4">{seminar.name}</h2>
            <p className="text-gray-600 mt-2">{seminar.description}</p>
            <p className="text-gray-800 mt-2 font-medium">Date: {seminar.date}</p>
            <p className="text-lg font-bold mt-2">${seminar.amount}</p>
            <div className="flex justify-between mt-4">
              <button onClick={() => handleEdit(seminar)} className="bg-yellow-500 text-white px-4 py-2 rounded-md">Edit</button>
              <button onClick={() => handleDelete(seminar._id)} className="bg-red-600 text-white px-4 py-2 rounded-md">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {editingSeminar && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Edit Seminar</h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded" required />
              <input type="text" name="image" value={formData.image} onChange={handleChange} className="w-full p-2 border rounded" required />
              <textarea name="description" value={formData.description} onChange={handleChange} className="w-full p-2 border rounded" required />
              <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full p-2 border rounded" required />
              <input type="number" name="amount" value={formData.amount} onChange={handleChange} className="w-full p-2 border rounded" required />
              <div className="flex justify-between">
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md">Update</button>
                <button type="button" onClick={() => setEditingSeminar(null)} className="bg-gray-600 text-white px-4 py-2 rounded-md">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
      
    </div>
    <FloatingSeminarButton />
    <Footer />
    <BottomNavigationBar />
    </div>*/}


