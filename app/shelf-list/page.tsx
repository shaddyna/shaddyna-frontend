"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Back from "@/components/Back";
import BottomNavigationBar from "@/components/BottomNav";
import Footer from "@/components/Footer";


interface Member {
  name: string;
  role: string;
  image?: string;
}

interface Shelf {
  _id: string;
  name: string;
  description: string;
  image: string;
  price: string;
  members: Member[];
}

const ShelvesPage = () => {
  const [shelves, setShelves] = useState<Shelf[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handlePayment = () => {
    alert(`Redirecting to payment for:`);
    // Integrate payment gateway logic here
  };



  useEffect(() => {
    const fetchShelves = async () => {
      try {
        const response = await fetch("https://shaddyna-backend.onrender.com/api/shelf/shelves");
        if (!response.ok) throw new Error("Failed to fetch shelves");
        const data = await response.json();
        setShelves(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchShelves();
  }, []);

  return (
    <div>
      <Back title={"Shelves List"} />
    <div className="container bg-white mx-auto p-3">
      <h1 className="text-3xl text-blue-900 font-bold text-center mb-3">Available Shelves</h1>
      {loading && <p className="bg-white text-center text-black">Loading shelves...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {shelves.map((shelf) => (
          <div 
            key={shelf._id} 
            className="bg-white shadow-lg rounded-xl p-4 cursor-pointer hover:shadow-xl transition"
            onClick={() => router.push(`/shelves/${shelf._id}`)}
          >
            <img
              src={shelf.image}
              alt={shelf.name}
              className="w-full h-48 object-cover rounded-md"
            />
            <h2 className="text-xl text-blue-900 font-semibold mt-3">{shelf.name}</h2>
            <p className="text-gray-900">{shelf.description}</p>
            <p className="text-lg font-bold text-blue-900 mt-2">${shelf.price}</p>
            <h3 className="text-md text-blue-900 font-semibold mt-3">Owners:</h3>
            <ul className="mt-2 space-y-2">
              {shelf.members.map((member, index) => (
                <li key={index} className="flex items-center space-x-3">
                  {member.image && (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <p className="font-semibold text-blue-900">{member.name}</p>
                    <p className="text-sm text-gray-500 text-blue-900">{member.role}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
    <Footer />
    <BottomNavigationBar />
    </div>
  );
};

export default ShelvesPage;
