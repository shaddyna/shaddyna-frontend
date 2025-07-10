/*'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const images = ['/hero1.png', '/hero2.png', '/hero6.jpg'];

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
            className="object-cover rounded-lg"
            loading={index === 0 ? 'eager' : 'lazy'}
          />
        </div>
      ))}
    </div>
  );
};

export default HeroCarousel;*/

/*'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const images = ['/hero1.png', '/hero2.png', '/hero6.jpg'];

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[100vw] sm:h-[400px] overflow-hidden rounded-lg">
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
            className="object-contain rounded-lg"
            loading={index === 0 ? 'eager' : 'lazy'}
          />
        </div>
      ))}
    </div>
  );
};

export default HeroCarousel;*/

'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const desktopImages = [
  '/hero/hero_desktop1.png',
  '/hero/hero_desktop2.png',
  '/hero/hero_desktop3.png',
];

const mobileImages = [
  '/hero/hero_mobile1.png',
  '/hero/hero_mobile2.png',
];

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [images, setImages] = useState<string[]>(desktopImages); // Default to desktop

  // Detect screen size
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.matchMedia('(max-width: 640px)').matches;
      setIsMobile(mobile);
      setImages(mobile ? mobileImages : desktopImages);
    };

    checkScreenSize(); // Initial check
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Change image on interval
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className="relative w-full h-[100vw] sm:h-[400px] overflow-hidden rounded-lg">
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
            className="object-cover sm:object-contain rounded-lg"
            loading={index === 0 ? 'eager' : 'lazy'}
          />
        </div>
      ))}
    </div>
  );
};

export default HeroCarousel;
