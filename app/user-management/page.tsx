// pages/admin/users.tsx
/*"use client"
import { useState, useEffect } from "react";
import axios from "axios";
import Footer from "@/components/Footer";
import Back from "@/components/Back";

interface User {
  _id: string;
  name: string;
  email: string;
  firstName: string;
  role: "admin" | "seller" | "customer";
}

const AdminUsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [formData, setFormData] = useState<Partial<User>>({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const { data } = await axios.get("https://shaddyna-backend.onrender.com/api/users/all");
    setUsers(data);
  };

  const handleDelete = async (id: string) => {
    await axios.delete(`https://shaddyna-backend.onrender.com/api/users/${id}`);
    fetchUsers();
  };

  const handleEdit = (user: User) => {
    setFormData(user);
    setIsEditing(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing && formData._id) {
      await axios.put(`https://shaddyna-backend.onrender.com/api/users/${formData._id}`, formData);
    } else {
      await axios.post("https://shaddyna-backend.onrender.com/api/users", formData);
    }
    fetchUsers();
    setFormData({});
    setIsEditing(false);
  };

  return (
    <div>
       <Back title={"User Management"} />
    <div className="min-h-screen bg-white p-6">
    <div className="flex items-center justify-between p-3 pt-0">
      
    </div>
      <form onSubmit={handleSubmit} className="mb-8 flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Name"
          value={formData.firstName || ""}
          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
          required
          className="border p-2 rounded-md w-full max-w-xs"
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email || ""}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          className="border p-2 rounded-md w-full max-w-xs"
        />
        <select
          value={formData.role || "customer"}
          onChange={(e) => setFormData({ ...formData, role: e.target.value as User["role"] })}
          className="border p-2 rounded-md w-full max-w-xs"
        >
          <option value="admin">Admin</option>
          <option value="seller">Seller</option>
          <option value="customer">Customer</option>
        </select>
        <button
          type="submit"
          className="bg-[#ff199c] text-white px-4 py-2 rounded-md font-semibold w-full max-w-xs"
        >
          {isEditing ? "Update User" : "Add User"}
        </button>
      </form>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <div
            key={user._id}
            className="border border-[#182155] rounded-lg p-4 flex flex-col bg-[#182155] text-white shadow-lg"
          >
            <h2 className="text-xl font-bold mb-2">{user.name}</h2>
            <p className="text-sm mb-2">Email: {user.email}</p>
            <p className="text-sm mb-4">Role: {user.role}</p>
            <div className="flex justify-between">
              <button
                onClick={() => handleEdit(user)}
                className="bg-[#ff199c] px-4 py-1 rounded-md font-medium"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(user._id)}
                className="bg-red-500 px-4 py-1 rounded-md font-medium"
              >
                Delete
              </button>
              <button
                onClick={() => alert(`Viewing user: ${user.firstName}`)}
                className="bg-blue-500 px-4 py-1 rounded-md font-medium"
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default AdminUsersPage;*/

"use client";

import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Footer from "@/components/Footer";
import Back from "@/components/Back";
import { FaArrowLeft, FaEllipsisV, FaPlus, FaSave, FaSpinner } from "react-icons/fa";


interface User {
  _id: string;
  name: string;
  email: string;
  firstName: string;
  role: "admin" | "seller" | "customer";
}

const AdminUsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [sellers, setSellers] = useState<User[]>([]);
  const [newSeller, setNewSeller] = useState({ name: "", status: "" });
  const [formData, setFormData] = useState<Partial<User>>({});
  const [isEditing, setIsEditing] = useState(false);
  const [viewSeller, setViewSeller] = useState<User | null>(null);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editSeller, setEditSeller] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
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

   



  /*useEffect(() => {
    fetchUsers();
  }, []);*/

  /*const fetchUsers = async () => {
    const { data } = await axios.get(
      "https://shaddyna-backend.onrender.com/api/users/all"
    );
    setUsers(data);
  };*/

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          "https://shaddyna-backend.onrender.com/api/users/all"
        );
        setUsers(response.data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch sellers.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  /*const handleDelete = async (id: string) => {
    await axios.delete(`https://shaddyna-backend.onrender.com/api/users/${id}`);
    fetchUsers();
  };*/

  const handleDelete = async (_id: string) => {
    try {
      await axios.delete(`https://shaddyna-backend.onrender.com/api/users/${_id}`);
      setSellers(sellers.filter((seller) => seller._id !== _id));
    } catch (err) {
      console.error("Failed to delete user:", err);
    }
  };

  {/*const handleEdit = (user: User) => {
    setFormData(user);
    setIsEditing(true);
  };*/}

  const handleEdit = (_id: string) => {
    const sellerToEdit = sellers.find((seller) => seller._id === _id);
    if (sellerToEdit) {
      setEditSeller(sellerToEdit);
    }
  };

  /*const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing && formData._id) {
      await axios.put(
        `https://shaddyna-backend.onrender.com/api/users/${formData._id}`,
        formData
      );
    } else {
      await axios.post(
        "https://shaddyna-backend.onrender.com/api/users",
        formData
      );
    }
    fetchUsers();
    setFormData({});
  };*/

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
    
 

  const handleMenuToggle = (userId: string) => {
    setOpenDropdownId(prevId => prevId === userId ? null : userId);
  };

  const modifiedHandleView = (user: User) => {
    setViewSeller(user);
    setOpenDropdownId(null);
  };

  const modifiedHandleEdit = (userId: string) => {
    handleEdit(userId);
    setOpenDropdownId(null);
  };

  const modifiedHandleDelete = (userId: string) => {
    handleDelete(userId);
    setOpenDropdownId(null);
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

  const getStatusColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-green-100 text-green-800';
      case 'seller':
        return 'bg-yellow-100 text-yellow-800';
      case 'customer':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };


  return (
    <div className="min-h-screen bg-white text-white">
      <Back title={"User Management"} />
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
                       <h2 className="text-xl font-bold text-gray-800 mb-4">{viewSeller.firstName}</h2>
                       <div className="flex items-center mb-4">
                         <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(viewSeller.role)}`}>
                           {viewSeller.role}
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
                             value={editSeller.role}
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
                           <FaPlus className="inline mr-2" /> Add New User
                         </button>
                       )}
                     </div>
     
                     {isFormVisible && (
                       <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 mb-8">
                         <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New User</h2>
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
                               Add User
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
                         {users.map((user) => (
                           <div key={user._id} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                             <div className="flex justify-between items-start mb-4">
                               <h3 className="text-xl font-semibold text-gray-800">{user.firstName}</h3>
                               <div className="relative">
                                 <button 
                                   ref={ellipsisRef}
                                   onClick={() => handleMenuToggle(user._id)}
                                   className="text-gray-400 hover:text-gray-600 p-2 rounded-lg"
                                 >
                                   <FaEllipsisV />
                                 </button>
                                 
                                 {openDropdownId === user._id && (
                                   <div 
                                     ref={dropdownRef}
                                     className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-100 z-10"
                                   >
                                     <button
                                       onClick={() => modifiedHandleView(user)}
                                       className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 text-left"
                                     >
                                       View Details
                                     </button>
                                     <button
                                       onClick={() => modifiedHandleEdit(user._id)}
                                       className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 text-left"
                                     >
                                       Edit
                                     </button>
                                     <button
                                       onClick={() => modifiedHandleDelete(user._id)}
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
                               <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(user.role)}`}>
                                 {user.role}
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

export default AdminUsersPage;