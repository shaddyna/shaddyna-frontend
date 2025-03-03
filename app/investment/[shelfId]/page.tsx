"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Back from "@/components/Back";

const InvestmentPage = ({ params }: { params: { shelfId: string } }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const amount = searchParams?.get("amount") ?? "0";

  const [form, setForm] = useState({
    name: "",
    phone: "",
    transactionCode: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const response = await fetch("https://shaddyna-backend.onrender.com/api/investments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        shelfId: params.shelfId,
        amount,
        ...form,
      }),
    });

    if (response.ok) {
      alert("Investment submitted successfully. Admin will verify.");
      router.push("/shelves");
    } else {
      alert("Error submitting investment. Please try again.");
    }
  };

  return (
    <div className="container mx-auto">
      <Back title="Investment Details" />
      <h1 className="text-2xl font-bold text-center">Invest in Shelf</h1>
      <p className="text-center text-lg mt-2">Amount: Ksh {amount}</p>

      <form onSubmit={handleSubmit} className="mt-6 bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label className="block font-semibold">Full Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold">Phone Number</label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold">M-Pesa Transaction Code</label>
          <input
            type="text"
            name="transactionCode"
            value={form.transactionCode}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#0f1c47] text-white py-2 rounded hover:bg-blue-900 transition"
        >
          Submit Investment
        </button>
      </form>
    </div>
  );
};

export default InvestmentPage;
