"use client";
import Back from "@/components/Back";
import BottomNavigationBar from "@/components/BottomNav";
import Footer from "@/components/Footer";
import { useState } from "react";

export default function AddSeminarPage() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: "",
    amount: "",
  });
  const [image, setImage] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("date", formData.date);
    formDataToSend.append("amount", formData.amount);
    if (image) {
      formDataToSend.append("image", image);
    }

    const response = await fetch("https://shaddyna-backend.onrender.com/api/seminars", {
      method: "POST",
      body: formDataToSend,
    });

    if (response.ok) {
      alert("Seminar added successfully!");
      setFormData({ name: "", description: "", date: "", amount: "" });
      setImage(null);
    } else {
      alert("Failed to add seminar");
    }
  };

  return (
    <div>
        <Back title={"Add Seminar"} />
    <div className="max-w-lg mx-auto p-3">
      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <input type="text" name="name" placeholder="Seminar Name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded" required />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="number" name="amount" placeholder="Amount" value={formData.amount} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="file" name="image" onChange={handleImageChange} className="w-full p-2 border rounded" accept="image/*" required />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Add Seminar</button>
      </form>
    </div>
    <Footer />
    <BottomNavigationBar />
    </div>
  );
}