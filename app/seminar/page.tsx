/*"use client"
import Image from "next/image";
import { useState } from "react";

interface Seminar {
  id: number;
  name: string;
  image: string;
  description: string;
  date: string;
  amount: number;
}

const seminars: Seminar[] = [
  {
    id: 1,
    name: "Tech Innovation Summit",
    image: "/seminar1.jpg",
    description: "Explore the latest in tech innovation and networking.",
    date: "2025-03-10",
    amount: 100,
  },
  {
    id: 2,
    name: "AI & Machine Learning Expo",
    image: "/seminar2.jpg",
    description: "Deep dive into AI advancements and applications.",
    date: "2025-04-15",
    amount: 150,
  },
  {
    id: 3,
    name: "Entrepreneurship Bootcamp",
    image: "/seminar3.jpg",
    description: "Learn how to start and scale your business.",
    date: "2025-05-20",
    amount: 200,
  },
];

export default function SeminarsPage() {
  const [selectedSeminar, setSelectedSeminar] = useState<Seminar | null>(null);

  const handlePayment = (seminar: Seminar) => {
    setSelectedSeminar(seminar);
    alert(`Redirecting to payment for: ${seminar.name}`);
    // Integrate payment gateway here
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Upcoming Seminars</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {seminars.map((seminar) => (
          <div key={seminar.id} className="bg-white shadow-lg rounded-lg p-4">
            <Image
              src={seminar.image}
              alt={seminar.name}
              width={500}
              height={300}
              className="rounded-md"
            />
            <h2 className="text-xl font-semibold mt-4">{seminar.name}</h2>
            <p className="text-gray-600 mt-2">{seminar.description}</p>
            <p className="text-gray-800 mt-2 font-medium">Date: {seminar.date}</p>
            <p className="text-lg font-bold mt-2">${seminar.amount}</p>
            <button
              onClick={() => handlePayment(seminar)}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Pay Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}*/

"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Back from "@/components/Back";
import Footer from "@/components/Footer";
import BottomNavigationBar from "@/components/BottomNav";

interface Seminar {
  _id: string;
  name: string;
  image: string;
  description: string;
  date: string;
  amount: number;
}

export default function SeminarsPage() {
  const [seminars, setSeminars] = useState<Seminar[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSeminars = async () => {
      try {
        const response = await fetch("https://shaddyna-backend.onrender.com/api/seminars");
        if (!response.ok) throw new Error("Failed to fetch seminars");
        const data = await response.json();
        setSeminars(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchSeminars();
  }, []);
  const handlePayment = () => {
    alert(`Redirecting to payment for:`);
    // Integrate payment gateway logic here
  };

  if (loading) return <p className="text-center mt-10">Loading seminars...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="">
    <Back title={"Upcoming Seminars"} />
    <div className="min-h-screen max-w-4xl mx-auto p-3">
      {seminars.length === 0 ? (
        <p className="text-center text-gray-500">No seminars available.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {seminars.map((seminar) => (
            <div key={seminar._id} className="bg-white shadow-lg rounded-lg p-4">
              <Image
                src={seminar.image}
                alt={seminar.name}
                width={500}
                height={300}
                className="rounded-md"
              />
              <h2 className="text-xl font-semibold mt-4">{seminar.name}</h2>
              <p className="text-gray-600 mt-2">{seminar.description}</p>
              <p className="text-gray-800 mt-2 font-medium">Date: {seminar.date}</p>
              <p className="text-lg font-bold mt-2">ksh {seminar.amount}</p>
              <button
          onClick={() => handlePayment()}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Pay Now
        </button>
            </div>
           
          ))}
          
        </div>
      )}
    </div>
    <Footer />
    <BottomNavigationBar />
    </div>
  );
}
