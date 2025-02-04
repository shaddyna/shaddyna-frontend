/*"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { FaShoppingCart, FaHeart } from "react-icons/fa";

// Example shelves data
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
      { _id: 1, name: "Air Max 90", price: 5000, images: ["https://example.com/airmax90.jpg"], rating: 4 },
      { _id: 2, name: "Nike Air Force 1", price: 4500, images: ["https://example.com/airforce1.jpg"], rating: 5 },
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
      { _id: 3, name: "Louis Vuitton Handbag", price: 12000, images: ["https://example.com/louisvuitton.jpg"], rating: 4 },
      { _id: 4, name: "Chanel Classic Flap", price: 15000, images: ["https://example.com/chanel.jpg"], rating: 5 },
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
      { _id: 5, name: "Cotton T-Shirt", price: 2500, images: ["https://example.com/tshirt.jpg"], rating: 3 },
      { _id: 6, name: "Jeans", price: 3500, images: ["https://example.com/jeans.jpg"], rating: 4 },
    ],
  },
];

const ShelfDetails = () => {
  const pathname = usePathname();
  const id = parseInt(pathname.split("/").pop() || "0"); // Extract and parse ID from the URL

  const [shelf, setShelf] = useState<any>(null);

  useEffect(() => {
    // Find the shelf by ID from the shelves array
    const foundShelf = shelves.find((shelf) => shelf.id === id);
    setShelf(foundShelf || null); // If no shelf is found, set it to null
  }, [id]);

  if (!shelf) return <div>Loading...</div>;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={`text-yellow-500 ${index < rating ? "text-yellow-500" : "text-gray-300"}`}>
        ★
      </span>
    ));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6 mb-6 mx-3">
      <div className="flex flex-col lg:flex-row items-center gap-6">
        <img
          src={shelf.image}
          alt={shelf.name}
          className="w-full lg:w-1/3 h-auto object-cover rounded-md"
        />
        <div className="flex flex-col">
          <h1 className="text-3xl font-semibold text-gray-800 mb-4">{shelf.name} Shelf</h1>
          <p className="text-lg text-gray-600 mb-6">{shelf.description}</p>
          <p className="text-2xl font-bold text-gray-800">{shelf.price}</p>

          <div className="mt-6">
            <h3 className="text-xl text-gray-800 font-semibold">Members:</h3>
            <ul className="flex flex-wrap gap-2 mt-2">
              {shelf.members.map((member: any) => (
                <li
                  key={member.id}
                  className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-lg"
                >
                  {member.name} - {member.role}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Products:</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {shelf.products.map((product: any) => (
            <div key={product._id} className="border rounded-lg shadow-md p-2">
              <img
                src={product.images[0] || "/placeholder-image.png"} // Fallback image if the product has no image
                alt={product.name}
                className="w-full h-36 sm:h-48 object-contain" // object-contain keeps the aspect ratio
              />
              <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
              <p className="text-gray-600 text-sm mt-2">Price: Ksh {product.price}</p>
              <div className="flex items-center mt-2">{renderStars(product.rating)}</div>
              <div className="flex justify-between items-center mt-4">
                <button className="bg-[#182155] text-white py-1 px-3 sm:py-1.5 sm:px-5 rounded-full font-bold text-xs sm:text-sm shadow-md hover:from-yellow-500 hover:to-yellow-700 transition-all transform hover:scale-105 flex items-center gap-1">
                  <FaShoppingCart className="text-sm sm:text-base" />
                  Add to Cart
                </button>
                <button className="text-[#ff199c] hover:text-red-600 transition-transform transform hover:scale-110 sm:hover:scale-125">
                  <FaHeart size={16} className="sm:size-[20px]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShelfDetails;*/

"use client";

import Back from "@/components/Back";
import BottomNavigationBar from "@/components/BottomNav";
import FloatingButtonEdit from "@/components/FloatingButtonEdit";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { FaShoppingCart, FaHeart } from "react-icons/fa";

// Example shelves data
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

const ShelfDetails = () => {
  const pathname = usePathname();
  const id = parseInt(pathname.split("/").pop() || "0"); // Extract and parse ID from the URL

  const [shelf, setShelf] = useState<any>(null);

  useEffect(() => {
    // Find the shelf by ID from the shelves array
    const foundShelf = shelves.find((shelf) => shelf.id === id);
    setShelf(foundShelf || null); // If no shelf is found, set it to null
  }, [id]);

  if (!shelf) return <div>Loading...</div>;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={`text-yellow-500 ${index < rating ? "text-yellow-500" : "text-gray-300"}`}>
        ★
      </span>
    ));
  };

  return (
    <div>
      <Back title={"Shelf details"} />
    <div className="max-w-4xl mx-auto p-3 bg-white rounded-lg shadow-md mt-6 mb-6 mx-3">
      <div className="flex flex-col lg:flex-row items-center gap-6">
        <img
          src={shelf.image}
          alt={shelf.name}
          className="w-full lg:w-1/3 h-auto object-cover rounded-md"
        />
        <div className="flex flex-col">
          <h1 className="text-3xl font-semibold text-gray-800 mb-4">{shelf.name} Shelf</h1>
          <p className="text-lg text-gray-600 mb-6">{shelf.description}</p>
          <p className="text-2xl font-bold text-gray-800">{shelf.price}</p>

          <div className="mt-6">
            <h3 className="text-xl text-gray-800 font-semibold">Members:</h3>
            <ul className="flex flex-wrap gap-2 mt-2">
              {shelf.members.map((member: any) => (
                <li
                  key={member.id}
                  className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-lg"
                >
                  {member.name} - {member.role}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Shelf Products:</h3>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3">
          {shelf.products.map((product: any) => (
            <div key={product._id} className="border rounded-lg shadow-md p-2">
              <img
                src={product.images[0] || "/placeholder-image.png"} // Fallback image if the product has no image
                alt={product.name}
                className="w-full h-36 sm:h-48 object-contain" // object-contain keeps the aspect ratio
              />
              <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
              <p className="text-gray-600 text-sm mt-2">Price: Ksh {product.price}</p>
              <div className="flex items-center mt-2">{renderStars(product.rating)}</div>
              <div className="flex justify-between items-center mt-4">
                <button className="bg-[#182155] text-white py-1 px-3 sm:py-1.5 sm:px-5 rounded-full font-bold text-xs sm:text-sm shadow-md hover:from-yellow-500 hover:to-yellow-700 transition-all transform hover:scale-105 flex items-center gap-1">
                  <FaShoppingCart className="text-sm sm:text-base" />
                  Add to Cart
                </button>
                <button className="text-[#ff199c] hover:text-red-600 transition-transform transform hover:scale-110 sm:hover:scale-125">
                  <FaHeart size={16} className="sm:size-[20px]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    <FloatingButtonEdit />
    <Footer />
    <BottomNavigationBar />
    </div>
  );
};

export default ShelfDetails;

