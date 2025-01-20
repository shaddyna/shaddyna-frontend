// components/Carousel.tsx
/*"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';

const slides = [
  {
    image: 'https://i.pinimg.com/736x/31/12/38/311238959586e0432cd597d19367a418.jpg',
    caption: 'Experience the beauty of nature.',
  },
  {
    image: 'https://i.pinimg.com/736x/49/ff/bf/49ffbf0c3e10d41c9ed75204934b4730.jpg',
    caption: 'Capture unforgettable moments.',
  },
  {
    image: 'https://i.pinimg.com/736x/01/03/63/0103631793d8792ece35481b46802605.jpg',
    caption: 'Discover the wonders of the world.',
  },
];

const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  return (
    <div className="relative w-full h-[500px] max-w-5xl mx-auto overflow-hidden pt-4 sm:hidden">
      <div
        className="relative flex h-full transition-transform duration-500"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="w-full flex-shrink-0 relative">
            <Image src={slide.image} alt={slide.caption} layout="fill" objectFit="cover" />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center text-white text-xl sm:text-3xl font-semibold p-4">
              {slide.caption}
            </div>
          </div>
        ))}
      </div>

      {/* Dots *
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full bg-white ${currentIndex === index ? 'bg-opacity-100' : 'bg-opacity-50'} cursor-pointer`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;*/

"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';

const slides = [
  {
    image: 'https://i.pinimg.com/736x/31/12/38/311238959586e0432cd597d19367a418.jpg',
    caption: 'Experience the beauty of nature.',
    shopUrl: '/shop/6789023b82fe6b19000c7c84', // Replace with the actual URL
  },
  {
    image: 'https://i.pinimg.com/736x/49/ff/bf/49ffbf0c3e10d41c9ed75204934b4730.jpg',
    caption: 'Capture unforgettable moments.',
    shopUrl: '/shop/6789023b82fe6b19000c7c84', // Replace with the actual URL
  },
  {
    image: 'https://i.pinimg.com/736x/01/03/63/0103631793d8792ece35481b46802605.jpg',
    caption: 'Discover the wonders of the world.',
    shopUrl: '/shop/6789023b82fe6b19000c7c84', // Replace with the actual URL
  },
];

const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  return (
    <div className="relative w-full h-[500px] max-w-5xl mx-auto overflow-hidden pt-4 sm:hidden">
      <div
        className="relative flex h-full transition-transform duration-500"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="w-full flex-shrink-0 relative">
            <Image src={slide.image} alt={slide.caption} layout="fill" objectFit="cover" />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-white text-xl sm:text-3xl font-semibold p-4">
              <a
                //href={slide.shopUrl}
                href={`/shop/6789023b82fe6b19000c7c84`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 border-4 border-white text-white text-lg font-semibold rounded-lg hover:bg-white hover:text-[#182155] transition duration-300"
              >
                Visit Shop
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full bg-white ${currentIndex === index ? 'bg-opacity-100' : 'bg-opacity-50'} cursor-pointer`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;






