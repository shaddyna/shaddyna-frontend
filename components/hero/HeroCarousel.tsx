'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const images = ['/hero1.png', '/hero2.png', '/hero3.png'];

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000); // 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[200px] md:h-[400px] overflow-hidden rounded-lg">
      {images.map((src, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={src}
            alt={`Hero ${index + 1}`}
            fill
            priority={index === 0}
            className="object-contain w-full h-full rounded-lg"
            sizes="(max-width: 768px) 100vw, (min-width: 769px) 100vw"
            loading={index === 0 ? 'eager' : 'lazy'}
          />
        </div>
      ))}
    </div>
  );
};

export default HeroCarousel;
