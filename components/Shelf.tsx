/*import Link from "next/link";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
}

interface ShelfProps {
  products: Product[];
}

const Shelf: React.FC<ShelfProps> = ({ products }) => {
  return (
    <div className="px-3">
      <h2 className="text-2xl text-gray-800 font-semibold text-left mb-0">Product Shelf</h2>
      <p className="text-md text-[#182155] text-left group-hover:text-white transition-colors mb-4">
        Buy and sell unique products listed by members.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/shelf/${product.id}`}
            className="bg-white p-2 rounded-lg flex border border-gray-300"
          >
            <div>
              <img
                src={product.image}
                alt={product.name}
                className="w-1/3 h-24 object-contain rounded-md"
              />
              <div className="ml-2 flex flex-col justify-between">
                <h3 className="text-xl text-gray-800 font-semibold">{product.name}</h3>
                <p className="text-gray-600 mt-0">{product.description}</p>
                <p className="text-lg text-gray-800 font-bold mt-0">Ksh {product.price}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Shelf;*/

import Link from "next/link";
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
          <Link key={shelf.id} href={`/shel/${shelf.id}`} className="bg-white p-2 rounded-lg flex border border-gray-300 hover:bg-gray-100">
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

export default ShelfComponent;
