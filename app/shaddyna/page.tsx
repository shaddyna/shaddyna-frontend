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

      <ShelfComponent />

        {/* Skills Section */}
        <ShaddynaSkills />
        
      </div>

      <BottomNavigationBar />
      {/*<FloatingButtonTwo />*/}
      <FloatingButton />
      <Footer />
    </div>
  );
};

export default ShaddynaHub;
