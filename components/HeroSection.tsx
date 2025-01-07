// components/HeroSection.tsx

import React from 'react';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  imageUrl: string;
  buttonText: string;
  buttonLink: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  imageUrl,
  buttonText,
  buttonLink,
}) => {
    return (
        <section className="relative w-full h-[400px] sm:h-[600px] lg:h-[700px] mt-4 lg:mt-0 grid grid-cols-1 lg:grid-cols-5 gap-4 lg:px-8 xl:px-16">
          {/* Large image for larger screens */}
          <div
            className="col-span-3 lg:col-span-3 relative bg-cover bg-center bg-no-repeat bg-contain rounded-2xl overflow-hidden"
            style={{ backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover' }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">{title}</h1>
              <p className="text-lg sm:text-xl mb-6">{subtitle}</p>
              <a
                href={buttonLink}
                className="px-6 py-3 bg-[#182155] text-white text-lg font-semibold rounded-lg hover:from-yellow-600 hover:to-yellow-800 transition"
              >
                {buttonText}
              </a>
            </div>
          </div>
      
          {/* Two stacked smaller images */}
          <div className="hidden lg:flex flex-col col-span-2 gap-4">
            <div
              className="relative h-1/2 bg-cover bg-center bg-no-repeat bg-contain rounded-2xl overflow-hidden"
              style={{ backgroundImage: `url('https://i.pinimg.com/736x/59/84/a1/5984a1a015e97972e92e03116083a731.jpg')`, backgroundSize: 'cover' }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            </div>
            <div
              className="relative h-1/2 bg-cover bg-center bg-no-repeat bg-contain rounded-2xl overflow-hidden"
              style={{ backgroundImage: `url('https://i.pinimg.com/736x/59/7e/3d/597e3de43781a839ae2084ecb432c70c.jpg')`, backgroundSize: 'cover' }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            </div>
          </div>
        </section>
      );
      
       
      
};

export default HeroSection;
