// components/BecomeSellerBanner.tsx
/*import { motion } from "framer-motion";
import { PlusCircle } from "lucide-react";

interface BecomeSellerBannerProps {
  handleCreateSellerClick: () => void;
  checking: boolean;
  authLoading: boolean;
}

const BecomeSellerBanner = ({ handleCreateSellerClick, checking, authLoading }: BecomeSellerBannerProps) => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0f1c47] text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Are you a Seller?
        </h2>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Join our exclusive network of premium professionals and connect with high-value clients
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCreateSellerClick}
            disabled={checking || authLoading}
            className="relative group bg-gradient-to-r from-[#bf2c7e] to-[#a02468] text-white px-6 py-4 sm:px-10 sm:py-5 rounded-full sm:rounded-xl text-base sm:text-lg font-medium hover:shadow-xl hover:shadow-[#bf2c7e]/30 transition-all duration-300 overflow-hidden disabled:opacity-50"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {checking ? (
                <span className="animate-spin">
                  <PlusCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                </span>
              ) : (
                <PlusCircle className="w-5 h-5 sm:w-6 sm:h-6" />
              )}
              Apply Now
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-[#a02468] to-[#bf2c7e] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="absolute top-0 left-0 w-10 h-full bg-white/30 -skew-x-12 -translate-x-16 group-hover:translate-x-[400%] transition-transform duration-700"></span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-black font-bold rounded-full transition-colors"
          >
            Learn More
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default BecomeSellerBanner;*/

// components/BecomeSellerBanner.tsx
import { motion } from "framer-motion";
import { PlusCircle } from "lucide-react";

interface BecomeSellerBannerProps {
  handleCreateSellerClick: () => void;
  checking: boolean;
  authLoading: boolean;
}

const BecomeSellerBanner = ({ handleCreateSellerClick, checking, authLoading }: BecomeSellerBannerProps) => {
  return (
    <section className="py-8 px-4 sm:py-20 sm:px-6 lg:px-8 bg-[#0f1c47] text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
          Are you a Seller?
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Join our exclusive network of premium professionals and connect with high-value clients
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCreateSellerClick}
            disabled={checking || authLoading}
            className="relative group bg-gradient-to-r from-[#bf2c7e] to-[#a02468] text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full sm:rounded-xl text-sm sm:text-base font-medium hover:shadow-xl hover:shadow-[#bf2c7e]/30 transition-all duration-300 overflow-hidden disabled:opacity-50"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {checking ? (
                <span className="animate-spin">
                  <PlusCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                </span>
              ) : (
                <PlusCircle className="w-5 h-5 sm:w-6 sm:h-6" />
              )}
              Apply Now
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-[#a02468] to-[#bf2c7e] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="absolute top-0 left-0 w-10 h-full bg-white/30 -skew-x-12 -translate-x-16 group-hover:translate-x-[400%] transition-transform duration-700"></span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 sm:px-8 sm:py-4 border-2 border-white text-white hover:bg-white hover:text-black font-bold rounded-full transition-colors"
          >
            Learn More
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default BecomeSellerBanner;