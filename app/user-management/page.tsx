// pages/admin/users.tsx
"use client"
import { useState, useEffect } from "react";
import axios from "axios";
import HeadNavigation from "@/components/HeadNavigation";
import Footer from "@/components/Footer";
import BottomNavigationBar from "@/components/BottomNav";
import BackButton from "@/components/BackButton";

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
        <HeadNavigation />
    <div className="min-h-screen bg-white p-6">
    <div className="flex items-center justify-between p-3 pt-0">
        <BackButton />
        <h1 className="text-3xl font-bold text-[#182155]" >
        Admin User Management
        </h1>
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
    <BottomNavigationBar />
    </div>
  );
};

export default AdminUsersPage;
