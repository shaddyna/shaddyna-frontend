"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Back from "@/components/Back";
import Footer from "@/components/Footer";
import BottomNavigationBar from "@/components/BottomNav";

const WithdrawalPage = () => {
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch savings balance from the API
    const fetchSavings = async () => {
      const token = localStorage.getItem("token"); // Get token from localStorage

      if (!token) {
        console.error("No token found");
        return;
      }

      try {
        const res = await axios.get("https://shaddyna-backend.onrender.com/api/saving/savings", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBalance(res.data.balance); // Assuming the response contains a 'balance' field
      } catch (err) {
        console.error("Error fetching savings", err);
      }
    };

    fetchSavings();
  }, []);

  const handleWithdraw = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post("https://shaddyna-backend.onrender.com/api/saving/saving", { amount });
      setMessage(res.data.message);
    } catch (err) {
      setMessage("Withdrawal failed");
    }

    setLoading(false);
  };

  return (
    <div>
        <Back title={"Withdraw"} />
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Withdraw Funds</h2>
      <p className="mb-2 text-gray-700">
        Available Balance: <strong>Ksh{balance}</strong>
      </p>
      <form onSubmit={handleWithdraw} className="space-y-4">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="w-full border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
          disabled={loading}
        >
          {loading ? "Processing..." : "Withdraw"}
        </button>
      </form>
      {message && <p className="mt-4 text-center text-red-500">{message}</p>}
    </div>
    <Footer />
    <BottomNavigationBar />
    </div>
  );
};

export default WithdrawalPage;

