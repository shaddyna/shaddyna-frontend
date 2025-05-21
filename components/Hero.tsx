/*"use client";
import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
} from "lucide-react";

const HeroSection = () => {
  const [hovered, setHovered] = useState(false);
  const [current, setCurrent] = useState(0);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const constraintsRef = useRef(null);

  const images = [
    {
      url: "https://i.pinimg.com/474x/99/c2/1a/99c21a7b75dd0d5f8f1e17b3547531ea.jpg",
      shape: "rounded-[30%_70%_70%_30%_/_30%_30%_70%_70%]",
      size: "w-64 h-80 md:w-72 md:h-96",
      rotate: "-rotate-6",
      overlay: "bg-[#f4b500]/20",
    },
    {
      url: "https://i.pinimg.com/236x/e9/fa/bf/e9fabfce6ae935e36868c4ba6ca98d83.jpg",
      shape: "rounded-tl-[100px] rounded-br-[100px]",
      size: "w-72 h-64 md:w-80 md:h-72",
      rotate: "rotate-3",
      overlay: "bg-[#1a1a1a]/50",
    },
    {
      url: "https://i.pinimg.com/236x/36/e5/52/36e55270678f71bdb222eeeb8651ee23.jpg",
      shape: "rounded-full",
      size: "w-56 h-56 md:w-64 md:h-64",
      rotate: "rotate-0",
      overlay: "bg-[#ffffff]/20",
    },
    {
      url: "https://i.pinimg.com/236x/64/35/c2/6435c222aaa4c8286b99cee765bbcbbd.jpg",
      shape: "rounded-[40px]",
      size: "w-60 h-72 md:w-68 md:h-80",
      rotate: "rotate-2",
      overlay: "bg-[#0a0a0a]/60",
    },
    {
      url: "https://i.pinimg.com/236x/56/2b/0e/562b0edbf09f5ddbd502f3790706bc93.jpg",
      shape: "rounded-tr-[150px] rounded-bl-[150px]",
      size: "w-80 h-60 md:w-96 md:h-72",
      rotate: "-rotate-3",
      overlay: "bg-[#f4b500]/10",
    },
  ];

  useEffect(() => {
    const controls = animate(count, 100, {
      duration: 30,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "linear",
    });
    return controls.stop;
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] flex items-center justify-center px-4 py-20 md:py-32"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Background animation *
      <motion.div
        className="absolute top-20 left-10 w-40 h-40 bg-[#f4b500]/10 blur-xl rounded-full"
        animate={{ x: [0, 20, 0], y: [0, 30, 0], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.div
        className="absolute bottom-32 right-16 w-32 h-32 bg-[#ffffff]/5 blur-lg rounded-full"
        animate={{ x: [0, -15, 0], y: [0, -20, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 12, repeat: Infinity, repeatType: "reverse" }}
      />

      {/* Pattern overlay *
      <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/dark-geometric.png')]"></div>

      {/* Content Grid *
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl w-full items-center">
        {/* Floating Image on Left *

<motion.div
  className="w-full flex justify-center items-center relative"
  animate={{ y: [0, -20, 0], rotate: [-1, 1, -1] }}
  transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
>
  {/* Adjustable Background Text *
  <div
    className="absolute z-0 text-[#f4b500]/10 font-extrabold uppercase pointer-events-none select-none"
    style={{
      top: '90px',         // Adjust vertical position (e.g., '10px', '-30px')
      left: '70%',         // Center horizontally (or use '10%', '0', etc.)
      transform: 'translateX(-50%) rotate(-5deg)', // Center and rotate
      fontSize: '5rem',    // Base font size, adjust as needed (e.g., '3rem', '8rem')
      letterSpacing: '0.2em', // Adjust spacing if needed
      whiteSpace: 'nowrap',
    }}
  >
    Extreme Collections
  </div>

  {/* Floating Image *
  <div className="relative z-10 w-[300px] h-[420px] md:w-[400px] md:h-[550px] lg:w-[480px] lg:h-[680px] rounded-[40px] overflow-hidden shadow-2xl">
    <img
      src="/image5.png"
      alt="Large Floating"
      className="w-full h-full object-cover"
      loading="lazy"
    />
  </div>
</motion.div>





        {/* Image Gallery on Right *
        <div className="relative h-[500px] md:h-[600px] w-full" ref={constraintsRef}>
          {images.map((img, index) => (
            <motion.div
              key={index}
              className={`absolute ${img.size} ${img.shape} ${img.rotate} overflow-hidden border-2 ${
                index === current ? "border-[#f4b500]" : "border-transparent"
              } shadow-2xl transition-all duration-500`}
              style={{
                top: `${20 + index * 10}%`,
                left: `${10 + index * 15}%`,
                zIndex: index === current ? 20 : 10 - index,
                opacity: index === current ? 1 : Math.max(0, 0.7 - Math.abs(index - current) * 0.3),
                scale: index === current ? 1 : 0.9 - Math.abs(index - current) * 0.1,
                filter: index === current ? "none" : "brightness(0.8)",
              }}
              whileHover={{ scale: index === current ? 1.05 : 0.95 }}
              drag
              dragConstraints={constraintsRef}
              dragElastic={0.1}
            >
              <img src={img.url} alt={`Fashion ${index + 1}`} className="w-full h-full object-cover" loading="lazy" />
              {index === current && (
                <motion.div
                  className={`absolute inset-0 ${img.overlay} flex items-center justify-center`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <button className="bg-[#f4b500] hover:bg-white text-black font-bold py-2 px-4 rounded-full text-xs flex items-center gap-2 transition-all duration-300 shadow-md">
                    <Eye size={14} /> Quick View
                  </button>
                </motion.div>
              )}
            </motion.div>
          ))}

          {/* Navigation *
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-[#f4b500] text-white hover:text-black rounded-full transition-all duration-300 z-30 shadow-lg"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-[#f4b500] text-white hover:text-black rounded-full transition-all duration-300 z-30 shadow-lg"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>

          {/* Dots *
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3 z-30">
            {images.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                  index === current ? "bg-[#f4b500] w-4 md:w-6" : "bg-gray-500"
                }`}
                onClick={() => setCurrent(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Decorative Corners *
      <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#f4b500]/30"></div>
      <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-[#f4b500]/30"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-[#f4b500]/30"></div>
      <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#f4b500]/30"></div>
    </div>
  );
};

export default HeroSection;*/

"use client";
import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Eye,
  Instagram,
  ShoppingBag,
  Twitter,
} from "lucide-react";

const HeroSection = () => {
  const [hovered, setHovered] = useState(false);
  const [current, setCurrent] = useState(0);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const constraintsRef = useRef(null);

  const images = [
    {
      url: "https://i.pinimg.com/474x/99/c2/1a/99c21a7b75dd0d5f8f1e17b3547531ea.jpg",
      shape: "rounded-[30%_70%_70%_30%_/_30%_30%_70%_70%]",
      size: "w-64 h-80 md:w-72 md:h-96",
      rotate: "-rotate-6",
      overlay: "bg-[#f4b500]/20",
    },
    {
      url: "https://i.pinimg.com/236x/e9/fa/bf/e9fabfce6ae935e36868c4ba6ca98d83.jpg",
      shape: "rounded-tl-[100px] rounded-br-[100px]",
      size: "w-72 h-64 md:w-80 md:h-72",
      rotate: "rotate-3",
      overlay: "bg-[#1a1a1a]/50",
    },
    {
      url: "https://i.pinimg.com/236x/36/e5/52/36e55270678f71bdb222eeeb8651ee23.jpg",
      shape: "rounded-full",
      size: "w-56 h-56 md:w-64 md:h-64",
      rotate: "rotate-0",
      overlay: "bg-[#ffffff]/20",
    },
    {
      url: "https://i.pinimg.com/236x/64/35/c2/6435c222aaa4c8286b99cee765bbcbbd.jpg",
      shape: "rounded-[40px]",
      size: "w-60 h-72 md:w-68 md:h-80",
      rotate: "rotate-2",
      overlay: "bg-[#0a0a0a]/60",
    },
    {
      url: "https://i.pinimg.com/236x/56/2b/0e/562b0edbf09f5ddbd502f3790706bc93.jpg",
      shape: "rounded-tr-[150px] rounded-bl-[150px]",
      size: "w-80 h-60 md:w-96 md:h-72",
      rotate: "-rotate-3",
      overlay: "bg-[#f4b500]/10",
    },
  ];

  useEffect(() => {
    const controls = animate(count, 100, {
      duration: 30,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "linear",
    });
    return controls.stop;
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] flex items-center justify-center px-4 py-20 md:py-32"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Background animation */}
      <motion.div
        className="absolute top-20 left-10 w-40 h-40 bg-[#f4b500]/10 blur-xl rounded-full"
        animate={{ x: [0, 20, 0], y: [0, 30, 0], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.div
        className="absolute bottom-32 right-16 w-32 h-32 bg-[#ffffff]/5 blur-lg rounded-full"
        animate={{ x: [0, -15, 0], y: [0, -20, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 12, repeat: Infinity, repeatType: "reverse" }}
      />

      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/dark-geometric.png')]"></div>

      {/* Content Grid */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl w-full items-center">
        {/* Floating Image on Left */}

<motion.div
  className="w-full flex justify-center items-center relative"
  animate={{ y: [0, -20, 0], rotate: [-1, 1, -1] }}
  transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
>
  {/* Adjustable Background Text */}
  <div
    className="absolute z-0 text-[#f4b500]/10 font-extrabold uppercase pointer-events-none select-none"
    style={{
      top: '90px',         // Adjust vertical position (e.g., '10px', '-30px')
      left: '70%',         // Center horizontally (or use '10%', '0', etc.)
      transform: 'translateX(-50%) rotate(-5deg)', // Center and rotate
      fontSize: '5rem',    // Base font size, adjust as needed (e.g., '3rem', '8rem')
      letterSpacing: '0.2em', // Adjust spacing if needed
      whiteSpace: 'nowrap',
    }}
  >
    Extreme Collections
  </div>

  {/* Floating Image */}
  <div className="relative z-10 w-[300px] h-[420px] md:w-[400px] md:h-[550px] lg:w-[480px] lg:h-[680px] rounded-[40px] overflow-hidden shadow-2xl">
    <img
      src="/image5.png"
      alt="Large Floating"
      className="w-full h-full object-cover"
      loading="lazy"
    />
  </div>
</motion.div>





        {/* Image Gallery on Right */}
        <div className="relative h-[500px] md:h-[600px] w-full" ref={constraintsRef}>
          {images.map((img, index) => (
            <motion.div
              key={index}
              className={`absolute ${img.size} ${img.shape} ${img.rotate} overflow-hidden border-2 ${
                index === current ? "border-[#f4b500]" : "border-transparent"
              } shadow-2xl transition-all duration-500`}
              style={{
                top: `${20 + index * 10}%`,
                left: `${10 + index * 15}%`,
                zIndex: index === current ? 20 : 10 - index,
                opacity: index === current ? 1 : Math.max(0, 0.7 - Math.abs(index - current) * 0.3),
                scale: index === current ? 1 : 0.9 - Math.abs(index - current) * 0.1,
                filter: index === current ? "none" : "brightness(0.8)",
              }}
              whileHover={{ scale: index === current ? 1.05 : 0.95 }}
              drag
              dragConstraints={constraintsRef}
              dragElastic={0.1}
            >
              <img src={img.url} alt={`Fashion ${index + 1}`} className="w-full h-full object-cover" loading="lazy" />
              {index === current && (
                <motion.div
                  className={`absolute inset-0 ${img.overlay} flex items-center justify-center`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <button className="bg-[#f4b500] hover:bg-white text-black font-bold py-2 px-4 rounded-full text-xs flex items-center gap-2 transition-all duration-300 shadow-md">
                    <Eye size={14} /> Quick View
                  </button>
                </motion.div>
              )}
            </motion.div>
          ))}

          {/* Navigation */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-[#f4b500] text-white hover:text-black rounded-full transition-all duration-300 z-30 shadow-lg"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-[#f4b500] text-white hover:text-black rounded-full transition-all duration-300 z-30 shadow-lg"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3 z-30">
            {images.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                  index === current ? "bg-[#f4b500] w-4 md:w-6" : "bg-gray-500"
                }`}
                onClick={() => setCurrent(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Decorative Corners */}
      <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#f4b500]/30"></div>
      <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-[#f4b500]/30"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-[#f4b500]/30"></div>
      <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#f4b500]/30"></div>
    </div>
  );
};

export default HeroSection;
