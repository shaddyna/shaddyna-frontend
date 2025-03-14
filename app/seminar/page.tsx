"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Back from "@/components/Back";
import Footer from "@/components/Footer";
import BottomNavigationBar from "@/components/BottomNav";
import { useRouter } from "next/navigation"; 

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
  const router = useRouter(); 

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

  const handlePayment = (amount: number) => {
    router.push(`/seminar-payment?amount=${amount}`);
  };

  const handleOtherPayment = (amount: number) => {
    router.push(`/seminar-other-payment?amount=${amount}`);
  };

  if (loading) return <p className="text-center mt-10">Loading seminars...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="">
    <Back title={"Upcoming Seminars"} />
    <div className="min-h-screen bg-white max-w-4xl mx-auto p-3">
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
              <h2 className="text-xl text-blue-900 font-semibold mt-4">{seminar.name}</h2>
              <p className="text-gray-600 mt-2">{seminar.description}</p>
              <p className="text-gray-800 mt-2 font-medium">Date: {seminar.date}</p>
              <p className="text-lg text-blue-900 font-bold mt-2">ksh {seminar.amount}</p>
              <div>
              <button
                onClick={() => handlePayment(seminar.amount)}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 mr-4"
              >
                Pay Now
              </button>
              <button
                onClick={() => handleOtherPayment(seminar.amount)}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Pay For Another
              </button>
            </div>

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
