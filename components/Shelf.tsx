/*import Link from "next/link";
import React from "react";

interface Member {
  id: number;
  name: string;
  role: string;
  // Add more member attributes as needed
}

interface Shelf {
  id: number;
  name: string;
  description: string;
  image: string;
  price: string;
  members: Member[];
}

interface ShelfProps {
  shelves: Shelf[];
}

const ShelfComponent: React.FC<ShelfProps> = ({ shelves }) => {
  return (
    <div className="px-3">
      <h2 className="text-2xl text-gray-800 font-semibold text-left mb-0">Shelves</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
        {shelves.map((shelf) => (
          <Link key={shelf.id} href={`/shelf/${shelf.id}`} className="bg-white p-2 rounded-lg flex border border-gray-300 hover:bg-gray-100">
          <div>
            <img
              src={shelf.image}
              alt={shelf.name}
              className="w-1/3 h-24 object-contain rounded-md"
            />
            <div className="ml-2 flex flex-col justify-between">
              <h3 className="text-xl text-gray-800 font-semibold">{shelf.name} shelf</h3>
              <p className="text-gray-600 mt-0">{shelf.description}</p>
              <p className="text-lg text-gray-800 font-bold mt-0">Ksh {shelf.price}</p>
              <div className="flex items-center mt-auto">
                <p className="text-sm text-gray-500">Members:</p>
                <ul className="flex ml-2">
                  {shelf.members.map((member) => (
                    <li key={member.id} className="ml-1 text-gray-600 text-xs">
                      {member.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Link>
        
        ))}
      </div>
    </div>
  );
};

export default ShelfComponent;*/


"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface Member {
  _id: string;
  name: string;
  role: string;
  image: string;
}

interface Shelf {
  _id: string;
  name: string;
  description: string;
  image: string;
  price: string;
  members: Member[];
}

const ShelfComponent: React.FC = () => {
  const [shelves, setShelves] = useState<Shelf[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchShelves = async () => {
      try {
        const response = await fetch("https://shaddyna-backend.onrender.com/api/shelf/shelves");
        if (!response.ok) {
          throw new Error("Failed to fetch shelves");
        }
        const data = await response.json();
        
        if (Array.isArray(data)) {
          setShelves(data);
        } else if (Array.isArray(data.shelves)) {
          setShelves(data.shelves);
        } else {
          throw new Error("Invalid API response format");
        }

        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchShelves();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="px-3">
      <h2 className="text-2xl text-gray-800 font-semibold text-left mb-0">Shelves</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
        {shelves.length > 0 ? (
          shelves.map((shelf) => (
            <Link key={shelf?._id} href={`/shelf/${shelf?._id}`} passHref>
              <div className="bg-white p-2 rounded-lg flex border border-gray-300 hover:bg-gray-100 cursor-pointer">
                <img
                  src={shelf?.image}
                  alt={shelf?.name}
                  className="w-1/3 h-24 object-contain rounded-md"
                />
                <div className="ml-2 flex flex-col justify-between">
                  <h3 className="text-xl text-gray-800 font-semibold">
                    {shelf?.name} shelf
                  </h3>
                  <p className="text-gray-600 mt-0">{shelf?.description}</p>
                  <p className="text-lg text-gray-800 font-bold mt-0">
                    Ksh {shelf?.price}
                  </p>
                  <div className="flex items-center mt-auto">
                    <p className="text-sm text-gray-500">Owners:</p>
                    <ul className="flex ml-2">
                      {shelf?.members?.map((member) => (
                        <li key={member?._id} className="ml-1 text-gray-600 text-xs">
                          {member?.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p>No shelves found.</p>
        )}
      </div>
    </div>
  );
};

export default ShelfComponent;
