// components/ServicesHero.tsx
/*import { motion } from "framer-motion";
import { Search, PlusCircle } from "lucide-react";

interface ServicesHeroProps {
  handleCreateSellerClick: () => void;
  checking: boolean;
  authLoading: boolean;
}

const ShopsHero = ({ handleCreateSellerClick, checking, authLoading }: ServicesHeroProps) => {
  return (
    <section className="relative h-80 md:h-96 flex items-center justify-center bg-gray-900 overflow-hidden">
      <div className="absolute inset-0 bg-black/60 z-10"></div>
      <img
        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
        alt="Luxury Services"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-20 text-center px-4 max-w-4xl mx-auto"
      >
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
          <span className="bg-clip-text text-transparent bg-[#bf2c7e]">
            Premium Shops
          </span>
        </h1>
        <p className="text-xl text-gray-200 max-w-2xl mx-auto mb-8">
          Connect with top-tier professionals for your luxury business needs
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCreateSellerClick}
            disabled={checking || authLoading}
            className="px-8 py-3 bg-[#bf2c7e] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {checking ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin">
                  <PlusCircle className="w-5 h-5" />
                </span>
                Processing...
              </span>
            ) : (
              "Apply Now"
            )}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300"
          >
            Learn More
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};

export default ShopsHero;*/

import { motion } from "framer-motion";
import { Search, PlusCircle } from "lucide-react";
import { useState } from "react";

interface ServicesHeroProps {
  handleCreateSellerClick: () => void;
  checking: boolean;
  authLoading: boolean;
}

const ShopsHero = ({ handleCreateSellerClick, checking, authLoading }: ServicesHeroProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  return (
        <section className="relative bg-white overflow-hidden">
        <div className="relative h-[400px] sm:h-[500px] md:h-[600px] w-full mt-24">
          {/* Main Carousel */}
          <div className="relative h-full w-full overflow-hidden">
            {[
              {
                image: "https://i.pinimg.com/736x/f6/67/07/f667075b97630b1e3bb56c54c48c4250.jpg",
              },
              {
                image: "https://i.pinimg.com/736x/f6/67/07/f667075b97630b1e3bb56c54c48c4250.jpg",
              },
              {
                image: "https://i.pinimg.com/736x/f6/67/07/f667075b97630b1e3bb56c54c48c4250.jpg",
              }
            ].map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
              >
                <img
                  src={slide.image}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 z-10" />

                {/* Text + Buttons */}
                {index === currentSlide && (
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute z-20 inset-0 flex flex-col items-center justify-center text-center px-4"
                  >
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                   
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleCreateSellerClick}
                      disabled={checking || authLoading}
                      className="px-8 py-3 bg-[#0f1c47] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      {checking ? (
                        <span className="flex items-center justify-center gap-2">
                          <span className="animate-spin">
                            <PlusCircle className="w-5 h-5" />
                          </span>
                          Processing...
                        </span>
                      ) : (
                        "Create Shop"
                      )}
                    </motion.button>
                    </div>
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          {/* Carousel Indicators */}
          <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-30">
            {[0, 1, 2].map((index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-white w-6' : 'bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div> 
        </section>
  );
};

export default ShopsHero;