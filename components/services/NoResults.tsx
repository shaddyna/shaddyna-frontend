// components/NoResults.tsx
import { motion } from "framer-motion";
import { Search } from "lucide-react";

interface NoResultsProps {
  resetFilters: () => void;
}

const NoResults = ({ resetFilters }: NoResultsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="col-span-full text-center py-20"
    >
      <div className="mx-auto bg-[#bf2c7e]/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
        <Search className="text-[#bf2c7e]" size={24} />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">No services found</h3>
      <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
      <button
        onClick={resetFilters}
        className="px-6 py-3 bg-[#bf2c7e] hover:bg-[#0f1c47] text-white font-bold rounded-full"
      >
        Reset Filters
      </button>
    </motion.div>
  );
};

export default NoResults;