import React from 'react';

const brands = [
  { name: 'Nike', bgImage: 'https://i.pinimg.com/736x/ed/db/ee/eddbee5379fa847e956f489af60b676e.jpg', profileImage: 'https://i.pinimg.com/236x/10/25/9d/10259ddb0af8da94af41b0912fb5f921.jpg' },
  { name: 'Apple', bgImage: 'https://i.pinimg.com/736x/cd/0a/f8/cd0af83897b0c4487436ce85633612a1.jpg', profileImage: 'https://i.pinimg.com/236x/db/fe/75/dbfe75990174020a7ebf8799999212d8.jpg' },
  { name: 'Safaricom', bgImage: 'https://i.pinimg.com/736x/8b/3d/4c/8b3d4ca8fa66e22452f816991f9596b1.jpg', profileImage: 'https://i.pinimg.com/736x/dd/96/af/dd96af09bc13930a7e555b89c6981cb2.jpg' },
  { name: 'Samsung', bgImage: 'https://i.pinimg.com/236x/36/f9/8d/36f98dc97c2a0caafd93efb3e7b20d62.jpg', profileImage: 'https://i.pinimg.com/736x/dc/36/c1/dc36c1d02dfe2ec192b7ec6d2289cb2d.jpg' },
  { name: 'Adidas', bgImage: 'https://i.pinimg.com/236x/00/46/37/004637715e5355ed20f54af1b662d0d6.jpg', profileImage: 'https://i.pinimg.com/236x/91/41/ae/9141ae5ccfa0ea4ff7b9e9f6afd4305e.jpg' },
];

const BrandSection: React.FC = () => {
  return (
    <div className="relative overflow-hidden pb-4 rounded-lg">
      <div className="scrolling-brands-wrapper flex gap-8 animate-scroll">
        <div className="scrolling-brands flex gap-8">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="brand-item relative w-64 h-40 flex-shrink-0"
              style={{
                backgroundImage: `url(${brand.bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '20px',
              }}
            >
              <div className="absolute inset-0 bg-black opacity-10 rounded-2xl" />
              <div className="absolute bottom-0 left-0 p-4">
                <h2 className="text-white text-xl font-bold">{brand.name}</h2>
              </div>
              <img
                src={brand.profileImage}
                alt={brand.name}
                className="absolute bottom-4 right-4 w-16 h-16 rounded-full border-4 border-white"
              />
            </div>
          ))}
        </div>
        <div className="scrolling-brands flex gap-8">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="brand-item relative w-64 h-40 flex-shrink-0"
              style={{
                backgroundImage: `url(${brand.bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '20px',
              }}
            >
              <div className="absolute inset-0 bg-black opacity-10 rounded-2xl" />
              <div className="absolute bottom-0 left-0 p-4">
                <h2 className="text-white text-xl font-bold">{brand.name}</h2>
              </div>
              <img
                src={brand.profileImage}
                alt={brand.name}
                className="absolute bottom-4 right-4 w-16 h-16 rounded-full border-4 border-white"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandSection;


