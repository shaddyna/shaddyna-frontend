"use client";

import Back from "@/components/Back";
import BottomNavigationBar from "@/components/BottomNav";
import FloatingButtonEdit from "@/components/FloatingButtonEdit";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { FaSave, FaTrash } from "react-icons/fa";

const shelves = [
    {
      id: 1,
      name: "Sneaker Collection",
      description: "A shelf dedicated to the best sneakers in the game.",
      image: "https://i.pinimg.com/236x/2a/9a/53/2a9a530cc03d8dd849ede2f545d0aede.jpg",
      price: "Starting from Ksh 3000",
      members: [
        { id: 1, name: "John Doe", role: "Owner" },
        { id: 2, name: "Jane Smith", role: "Member" },
        { id: 3, name: "Mike Brown", role: "Member" },
      ],
      products: [
        { _id: 1, name: "Air Max 90", price: 5000, images: ["https://i.pinimg.com/236x/5a/a1/01/5aa101e1263baae3deee47915091284a.jpg"], rating: 4 },
        { _id: 2, name: "Nike Air Force 1", price: 4500, images: ["https://i.pinimg.com/236x/9e/04/ba/9e04baac035a96076b777d33b28cdeaf.jpg"], rating: 5 },
      ],
    },
    {
      id: 2,
      name: "Designer Bags",
      description: "A shelf for premium designer handbags and accessories.",
      image: "https://i.pinimg.com/236x/94/5b/4f/945b4f64e16a8e8daceadc3545952325.jpg",
      price: "Starting from Ksh 5000",
      members: [
        { id: 4, name: "Alice Johnson", role: "Owner" },
        { id: 5, name: "Bob Williams", role: "Member" },
      ],
      products: [
        { _id: 3, name: "Louis Vuitton Handbag", price: 12000, images: ["https://i.pinimg.com/236x/37/f5/9d/37f59de8b7012ac6a91b85d965d221b7.jpg"], rating: 4 },
        { _id: 4, name: "Chanel Classic Flap", price: 15000, images: ["https://i.pinimg.com/236x/e9/e5/b0/e9e5b04062df884faca2e6c2eab43999.jpg"], rating: 5 },
      ],
    },
    {
      id: 3,
      name: "Casual Outfits",
      description: "Trendy and stylish casual wear for all occasions.",
      image: "https://i.pinimg.com/736x/a7/4c/12/a74c12da587c712e97a7e337478f9788.jpg",
      price: "Starting from Ksh 2000",
      members: [
        { id: 6, name: "Emma Watson", role: "Owner" },
        { id: 7, name: "Chris Evans", role: "Member" },
        { id: 8, name: "Scarlett Johansson", role: "Member" },
      ],
      products: [
        { _id: 5, name: "Cotton T-Shirt", price: 2500, images: ["https://i.pinimg.com/236x/d5/8e/94/d58e941d6bf8230909356f08cc88993e.jpg"], rating: 3 },
        { _id: 6, name: "Jeans", price: 3500, images: ["https://i.pinimg.com/236x/30/15/e6/3015e609989212aa2c9b516551918cba.jpg"], rating: 4 },
      ],
    },
  ];

const EditShelfDetails = () => {
  //const pathname = usePathname();
 // const id = parseInt(pathname.split("/").pop() || "0");

  const pathname = usePathname();
const id = parseInt(pathname?.split("/").pop() || "0", 10);


  const [shelf, setShelf] = useState<any>(null);

  useEffect(() => {
    const foundShelf = shelves.find((s) => s.id === id);
    setShelf(foundShelf ? { ...foundShelf } : null);
  }, [id]);

  if (!shelf) return <div>Loading...</div>;

  const handleChange = (e: any, field: string) => {
    setShelf({ ...shelf, [field]: e.target.value });
  };

  const handleProductChange = (index: number, field: string, value: any) => {
    const updatedProducts = [...shelf.products];
    updatedProducts[index] = { ...updatedProducts[index], [field]: value };
    setShelf({ ...shelf, products: updatedProducts });
  };

  return (
    <div>
      <Back title={"Edit Shelf"} />
      <div className="max-w-4xl mx-auto p-3 bg-white rounded-lg shadow-md mt-6 mb-6">
        <div className="flex flex-col lg:flex-row items-center gap-6">
          <input
            type="text"
            value={shelf.image}
            onChange={(e) => handleChange(e, "image")}
            className="w-full lg:w-1/3 h-auto object-cover rounded-md border p-2"
          />
          <div className="flex flex-col w-full">
            <input
              type="text"
              value={shelf.name}
              onChange={(e) => handleChange(e, "name")}
              className="text-3xl font-semibold text-gray-800 mb-4 border p-2"
            />
            <textarea
              value={shelf.description}
              onChange={(e) => handleChange(e, "description")}
              className="text-lg text-gray-600 mb-6 border p-2"
            />
            <input
              type="text"
              value={shelf.price}
              onChange={(e) => handleChange(e, "price")}
              className="text-2xl font-bold text-gray-800 border p-2"
            />
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-xl text-gray-800 font-semibold">Members:</h3>
          <ul className="flex flex-wrap gap-2 mt-2">
            {shelf.members.map((member: any) => (
              <li key={member.id} className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-lg">
                {member.name} - {member.role}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Shelf Products:</h3>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3">
            {shelf.products.map((product: any, index: number) => (
              <div key={product._id} className="border rounded-lg shadow-md p-2">
                <input
                  type="text"
                  value={product.images[0]}
                  onChange={(e) => handleProductChange(index, "images", [e.target.value])}
                  className="w-full h-36 sm:h-48 object-contain border p-2"
                />
                <input
                  type="text"
                  value={product.name}
                  onChange={(e) => handleProductChange(index, "name", e.target.value)}
                  className="text-lg font-semibold text-gray-800 border p-2"
                />
                <input
                  type="number"
                  value={product.price}
                  onChange={(e) => handleProductChange(index, "price", e.target.value)}
                  className="text-gray-600 text-sm border p-2"
                />
                <div className="flex justify-between items-center mt-4">
                  <button className="bg-green-500 text-white py-1 px-3 rounded-full flex items-center gap-1">
                    <FaSave /> Save
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
      <BottomNavigationBar />
    </div>
  );
};

export default EditShelfDetails;

