// components/ServicesHero.tsx
import { motion } from "framer-motion";
import { Search, PlusCircle } from "lucide-react";

interface ServicesHeroProps {
  handleCreateShopClick: () => void;
  checking: boolean;
  authLoading: boolean;
}

const ServicesHero = ({ handleCreateShopClick, checking, authLoading }: ServicesHeroProps) => {
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
            Premium Skills
          </span>
        </h1>
        <p className="text-xl text-gray-200 max-w-2xl mx-auto mb-8">
          Connect with top-tier professionals for your luxury business needs
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCreateShopClick}
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

export default ServicesHero;