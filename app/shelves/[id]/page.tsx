/*import Back from "@/components/Back";
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
const handlePayment = () => {
  alert(`Redirecting to payment for:`);
  // Integrate payment gateway logic here
};
// ✅ Accept `params` as a prop in the function
const ShelfDetailPage = async ({ params }: { params: { id: string } }) => {
  const id = params.id;

  let shelf: Shelf | null = null;
  let error = null;

  try {
    const response = await fetch(`http://localhost:5000/api/shelf/${id}`);
    if (!response.ok) throw new Error("Failed to fetch shelf");
    shelf = await response.json();
  } catch (err) {
    error = (err as Error).message;
  }

  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!shelf) return <p className="text-center">Shelf not found.</p>;

  


  return (
    <div>
      <Back title={"Shelf Detail"} />
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">{shelf.name}</h1>
      <div className="bg-white shadow-lg rounded-xl p-6">
        <img
          src={shelf.image}
          alt={shelf.name}
          className="w-full h-64 object-cover rounded-md"
        />
        <p className="text-gray-600 mt-4">{shelf.description}</p>
        <p className="text-lg font-bold text-blue-600 mt-2">${shelf.price}</p>
        <h3 className="text-md font-semibold mt-3">Members:</h3>
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
                <p className="font-semibold">{member.name}</p>
                <p className="text-sm text-gray-500">{member.role}</p>
              </div>
            </li>
          ))}
        </ul>
        <button
          onClick={() => handlePayment()}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Pay Now
        </button>               
      </div>
      </div>
    <Footer />
    <BottomNavigationBar />
    </div>
  );
};

export default ShelfDetailPage;*/

/*import Back from "@/components/Back";
import BottomNavigationBar from "@/components/BottomNav";
import Footer from "@/components/Footer";
import PaymentButton from "@/components/PaymentButton"; // ✅ Import new component

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

// ✅ Accept `params` as a prop in the function
const ShelfDetailPage = async ({ params }: { params: { id: string } }) => {
  const id = params.id;

  let shelf: Shelf | null = null;
  let error = null;

  try {
    const response = await fetch(`https://shaddyna-backend.onrender.com/api/shelf/${id}`);
    if (!response.ok) throw new Error("Failed to fetch shelf");
    shelf = await response.json();
  } catch (err) {
    error = (err as Error).message;
  }

  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!shelf) return <p className="text-center">Shelf not found.</p>;
  const handleInvestment = (shelfId: string, amount: string) => {
    alert(`Redirecting to investment page for Shelf ID: ${shelfId} with amount: Kshs${amount}`);
    // Integrate investment/payment logic here
  };

  return (
    <div>
      <Back title={"Shelf Detail"} />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-6">{shelf.name}</h1>
        <div className="bg-white shadow-lg rounded-xl p-6">
          <img
            src={shelf.image}
            alt={shelf.name}
            className="w-full h-64 object-cover rounded-md"
          />
          <p className="text-gray-600 mt-4">{shelf.description}</p>
          <p className="text-lg font-bold text-blue-600 mt-2">${shelf.price}</p>
          <h3 className="text-md font-semibold mt-3">Members:</h3>
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
                  <p className="font-semibold">{member.name}</p>
                  <p className="text-sm text-gray-500">{member.role}</p>
                </div>
              </li>
            ))}
          </ul>
          <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevents navigation trigger on button click
                  handleInvestment(shelf._id, shelf.price);
                }}
                 className="mt-4 w-full border-2 border-[#0f1c47] text-[#0f1c47] px-4 py-2 rounded-md hover:bg-[#0f1c47] hover:text-white transition"
              >
                Invest
              </button>
          {/* <PaymentButton />  ✅ Use Client Component *
        </div>
      </div>
      <Footer />
      <BottomNavigationBar />
    </div>
  );
};

export default ShelfDetailPage;*/

"use client"; // Add this at the top

import Back from "@/components/Back";
import BottomNavigationBar from "@/components/BottomNav";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

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

// ✅ Convert to a client component
const ShelfDetailPage = ({ params }: { params: { id: string } }) => {
  const [shelf, setShelf] = useState<Shelf | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchShelf = async () => {
      try {
        const response = await fetch(`https://shaddyna-backend.onrender.com/api/shelf/${params.id}`);
        if (!response.ok) throw new Error("Failed to fetch shelf");
        const data = await response.json();
        setShelf(data);
      } catch (err) {
        setError((err as Error).message);
      }
    };

    fetchShelf();
  }, [params.id]);

  const handleInvestment = (shelfId: string, amount: string) => {
    alert(`Redirecting to investment page for Shelf ID: ${shelfId} with amount: Kshs${amount}`);
    // Integrate investment/payment logic here
  };

  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!shelf) return <p className="text-center">Shelf not found.</p>;

  return (
    <div>
      <Back title={"Shelf Detail"} />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-6">{shelf.name}</h1>
        <div className="bg-white shadow-lg rounded-xl p-6">
          <img
            src={shelf.image}
            alt={shelf.name}
            className="w-full h-64 object-cover rounded-md"
          />
          <p className="text-gray-600 mt-4">{shelf.description}</p>
          <p className="text-lg font-bold text-blue-600 mt-2">Kshs {shelf.price}</p>
          <h3 className="text-md font-semibold mt-3">Members:</h3>
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
                  <p className="font-semibold">{member.name}</p>
                  <p className="text-sm text-gray-500">{member.role}</p>
                </div>
              </li>
            ))}
          </ul>
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevents navigation trigger on button click
              handleInvestment(shelf._id, shelf.price);
            }}
            className="mt-4 w-full border-2 border-[#0f1c47] text-[#0f1c47] px-4 py-2 rounded-md hover:bg-[#0f1c47] hover:text-white transition"
          >
            Invest
          </button>
        </div>
      </div>
      <Footer />
      <BottomNavigationBar />
    </div>
  );
};

export default ShelfDetailPage;