"use client";
import Back from "@/components/Back";
import BottomNavigationBar from "@/components/BottomNav";
import FloatingButton from "@/components/FloatingButton";
import FloatingSeminarButton from "@/components/FloatingSeminarButton";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";

interface Seminar {
  _id: string;
  name: string;
  image: string;
  description: string;
  date: string;
  amount: number;
}

export default function SeminarManagement() {
  const [seminars, setSeminars] = useState<Seminar[]>([]);
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
  };

  return (
    <div className="bg-gray-50 min-h-screen">
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
    </div>
    
  );
}


