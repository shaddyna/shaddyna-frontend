import Back from '@/components/Back';
import BottomNavigationBar from '@/components/BottomNav';
import FloatingButton from '@/components/FloatingButton';
import FloatingButtonTwo from '@/components/FloatingButtonTwo';
import Footer from '@/components/Footer';
import ShaddynaSkills from '@/components/Skills';
import Shelf from '@/components/Shelf';
import React from 'react';
import ShelfComponent from '@/components/Shelf';

const ShaddynaHub = () => {
  // Dummy Data
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
  },
];

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Back title={'Shaddyna Hub'} />
      <div className="space-y-0">
        <div
          className="relative h-[150px] sm:h-[300px] lg:h-[350px] bg-cover bg-center m-3 rounded-lg"
          style={{ backgroundImage: "url('https://i.pinimg.com/736x/24/f4/8a/24f48a68633249e7a31c9f19e8fdf148.jpg')" }}
        >
          <div className="absolute inset-0 bg-black opacity-20 rounded-lg"></div>
          <div className="absolute inset-0 flex justify-center items-center text-center text-white px-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">Welcome to Shaddyna Hub</h1>
          </div>
        </div>

        {/* Product Shelf Component 
        <Shelf products={products} /> */}

      <ShelfComponent shelves={shelves} />

        {/* Skills Section */}
        <ShaddynaSkills />
        <div className="px-3">
          <h2 className="text-2xl text-gray-800 font-semibold text-left mb-0">Skilled Services</h2>
          <p className="text-md text-[#182155] text-left group-hover:text-white transition-colors mb-4">
            Browse services offered by skilled members in Shaddyna Hub.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
            {/* Skills Mapping */}
          </div>
        </div>
      </div>

      <BottomNavigationBar />
      {/*<FloatingButtonTwo />*/}
      <FloatingButton />
      <Footer />
    </div>
  );
};

export default ShaddynaHub;
