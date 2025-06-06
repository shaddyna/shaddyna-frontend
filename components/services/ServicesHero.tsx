// components/ServicesHero.tsx
/*import { motion } from "framer-motion";
import { Search, PlusCircle } from "lucide-react";

interface ServicesHeroProps {
  handleCreateSkillClick: () => void;
  checking: boolean;
  authLoading: boolean;
}

const ServicesHero = ({ handleCreateSkillClick, checking, authLoading }: ServicesHeroProps) => {
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
            onClick={handleCreateSkillClick}
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

export default ServicesHero;*/
import { motion } from "framer-motion";
import { Search, PlusCircle, Loader2 } from "lucide-react";

interface ServicesHeroProps {
  handleCreateSkillClick: () => void;
  checking: boolean;
  authLoading: boolean;
}

const ServicesHero = ({ handleCreateSkillClick, checking, authLoading }: ServicesHeroProps) => {
  return (
    <section className="relative h-64 sm:h-80 md:h-96 flex items-center justify-center bg-gray-900 overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/70 to-gray-900/90 z-10"></div>
      <img
        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
        alt="Luxury Services"
        className="absolute inset-0 w-full h-full object-cover object-center"
        loading="eager"
      />
      
      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-20 text-center px-4 w-full max-w-4xl mx-auto mt-8"
      >
        <div className="space-y-3 sm:space-y-4 md:space-y-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            <span className="bg-clip-text text-transparent bg-[#bf2c7e]">
              Premium Skills
            </span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-200 max-w-xs sm:max-w-md md:max-w-2xl mx-auto">
            Connect with top-tier professionals for your luxury business needs
          </p>
          
          {/* Buttons */}
          <div className="flex flex-col xs:flex-row justify-center gap-3 sm:gap-4">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleCreateSkillClick}
              disabled={checking || authLoading}
              className="px-5 sm:px-6 py-2 sm:py-3 bg-[#bf2c7e] hover:bg-[#bf2c7e] text-white font-medium rounded-lg transition-all duration-200 text-sm sm:text-base"
            >
              {checking || authLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                  Processing...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <PlusCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                  Apply Now
                </span>
              )}
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-5 sm:px-6 py-2 sm:py-3 bg-transparent border border-white/50 text-white font-medium rounded-lg hover:bg-white/10 transition-all duration-200 text-sm sm:text-base"
            >
              Learn More
            </motion.button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ServicesHero;