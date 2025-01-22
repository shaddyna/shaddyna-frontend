import Back from '@/components/Back';
import BottomNavigationBar from '@/components/BottomNav';
import Footer from '@/components/Footer';
import React from 'react';
import { FaHeart } from 'react-icons/fa6';

const ShaddynaHub = () => {
  // Sample product data
  const products = [
    { id: 1, name: "Sweat Shirt", description: "Description of product 1", price: "50", image: "https://i.pinimg.com/474x/0b/4d/57/0b4d570faafa4bb4a16733819a383cc7.jpg" },
    { id: 2, name: "Sneakers", description: "Description of product 2", price: "60", image: "https://i.pinimg.com/236x/2a/9a/53/2a9a530cc03d8dd849ede2f545d0aede.jpg" },
    { id: 3, name: "Mug", description: "Description of product 3", price: "70", image: "https://i.pinimg.com/236x/53/e2/5a/53e25a06a4ac8dca310cb11444f3d508.jpg" },
    { id: 4, name: "Trouser", description: "Description of product 4", price: "80", image: "https://i.pinimg.com/736x/a7/4c/12/a74c12da587c712e97a7e337478f9788.jpg" },
    { id: 5, name: "Bag", description: "Description of product 5", price: "90", image: "https://i.pinimg.com/236x/94/5b/4f/945b4f64e16a8e8daceadc3545952325.jpg" },
    { id: 6, name: "Earings", description: "Description of product 6", price: "100", image: "https://i.pinimg.com/236x/97/04/79/970479f8ff0a22cca9e0e8f19f2fab5f.jpg" },
  ];

  const skills = [
    { id: 1, name: "Earling", level:"6",rating: "4.5", description: "Design Ui Ux of mobile app or website with figma", price: "50", image: "https://i.pinimg.com/474x/49/fd/16/49fd16a3ed3ab7771570f7c21268b8fe.jpg", pimage: "https://i.pinimg.com/236x/ea/4b/47/ea4b474c5392b809224a060beb2a0b1c.jpg" },
    { id: 2, name: "Sisco",level:"5",rating: "5.5", description: "Learn design like to a pro", price: "60", image: "https://i.pinimg.com/474x/ae/a4/49/aea44995c79c76b647ed277fa7bc676b.jpg",pimage: "https://i.pinimg.com/236x/03/e7/55/03e7556fd4449f4c654b749c3700f563.jpg"},
    { id: 3, name: "Muggie",level:"3",rating: "4.5", description: "Have your photos be edited proffesionally for your memories ", price: "70", image: "https://i.pinimg.com/736x/3e/06/0d/3e060d23c0a6547e504be1323880ebd6.jpg",pimage: "https://i.pinimg.com/474x/09/5b/da/095bdab54e9d738120ba53cb5829c9e8.jpg" },
    { id: 4, name: "Scott", level:"7",rating: "7.5",description: "Your videographer is here to give you top notch services", price: "80", image: "https://i.pinimg.com/736x/03/7f/d2/037fd24802f9d193cdfa502f9de66e50.jpg",pimage: "https://i.pinimg.com/236x/57/b9/f7/57b9f7b43dd81a29dbac0246fdc7a64d.jpg" },
    { id: 5, name: "Frankie",level:"8",rating: "7.5", description: "Shoot eye catching photography products", price: "90", image: "https://i.pinimg.com/736x/2f/9b/84/2f9b841cf8c65fc85d5b7d6946aa90f7.jpg",pimage: "https://i.pinimg.com/236x/68/75/e7/6875e77d033809bcfcba37cbeebbb611.jpg" },
    { id: 6, name: "Mizzo",level:"9",rating: "9.5", description: "Have your software developed in minutes by a pro", price: "100", image: "https://i.pinimg.com/736x/36/32/77/363277e803a2054eee7fdb73969e02f7.jpg",pimage: "https://i.pinimg.com/474x/21/43/fe/2143fe08f40987b510ca5d5f8bac748f.jpg" },
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
        {/* Products Section */}
        <div className="px-3">
            <h2 className="text-2xl font-semibold text-left mb-0">Product Shelf</h2>
            <p className="text-md text-[#182155] text-left group-hover:text-white transition-colors mb-4">
                Buy and sell unique products listed by members.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
            {products.map((product) => (
            <div key={product.id} className="bg-white p-2 rounded-lg flex border border-gray-300">
            {/* Image on the left */}
            <img src={product.image} alt={product.name} className="w-1/3 h-24 object-contain rounded-md" />
            {/* Product details on the right */}
            <div className="ml-2 flex flex-col justify-between">
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <p className="text-gray-600 mt-0">{product.description}</p>
                <p className="text-lg font-bold mt-0">Ksh {product.price}</p>
            </div>
            </div>
            ))}
        </div>
        </div>
 {/* Skills Section */}
<div className="px-3">
  <h2 className="text-2xl font-semibold text-left mb-0">Skilled Services</h2>
  <p className="text-md text-[#182155] text-left group-hover:text-white transition-colors mb-4">
    Browse services offered by skilled members in Shaddyna Hub.
  </p>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
    {skills.map((product) => (
      <div
        key={product.id}
        className="bg-white p-4 rounded-lg border border-gray-300"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover rounded-md"
        />
        <div className="flex items-center justify-between mt-4">
          {/* Profile Picture Placeholder and Name */}
          <div className="flex items-center">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-300 ring-2 ring-[#ff199c]">
            <img 
              src={product.pimage} 
              alt={product.name} 
              className="w-full h-full object-cover" 
            />
          </div>
          <div className="ml-2 text-gray-800 text-sm flex flex-col">
            <p className="font-bold">{product.name}</p>
            <p>Level {product.level}</p>
          </div>
        </div>
          {/* Heart Icon */}
          <div className="w-5 h-5 flex justify-center items-center text-red-500 hover:text-red-600 transition">
          <FaHeart className="w-6 h-6" />
        </div>
        </div>
        <p className="text-gray-600 mt-2">{product.description}</p>

        <div className="flex items-center justify-between mt-2">
        <div className="flex items-center mt-0">
          <p className="text-lg font-bold text-yellow-500">{product.rating}</p>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 text-yellow-500 ml-1" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.217 3.742a1 1 0 00.95.69h3.946c.969 0 1.371 1.24.588 1.81l-3.194 2.318a1 1 0 00-.364 1.118l1.217 3.742c.3.921-.755 1.688-1.538 1.118l-3.194-2.318a1 1 0 00-1.176 0l-3.194 2.318c-.783.57-1.838-.197-1.538-1.118l1.217-3.742a1 1 0 00-.364-1.118L2.293 9.17c-.783-.57-.38-1.81.588-1.81h3.946a1 1 0 00.95-.69l1.217-3.742z" />
          </svg>
        </div>
          <p className="text-lg font-bold mt-0"><span className='text-sm text-gray-400'>from</span> Ksh{product.price}</p>
        </div>
      </div>
    ))}
  </div>
</div>


    </div>
    <BottomNavigationBar />
    <Footer />
    </div>
  );
};

export default ShaddynaHub;
