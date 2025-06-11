import { useState } from "react";
import { Search, X, ChevronDown, ChevronUp, Filter, Check } from "lucide-react";

interface ServicesFilterProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedServiceLevel: string[];
  setSelectedServiceLevel: (levels: string[]) => void;
  selectedDeliveryTime: string[];
  setSelectedDeliveryTime: (times: string[]) => void;
  categories: string[];
  serviceLevels: { name: string; value: string }[];
  deliveryTimes: { name: string; value: string }[];
}

const ServicesFilter = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedServiceLevel,
  setSelectedServiceLevel,
  selectedDeliveryTime,
  setSelectedDeliveryTime,
  categories,
  serviceLevels,
  deliveryTimes,
}: ServicesFilterProps) => {
  const [showFilters, setShowFilters] = useState(false);

  const toggleServiceLevel = (value: string) => {
    setSelectedServiceLevel(
      selectedServiceLevel.includes(value)
        ? selectedServiceLevel.filter(v => v !== value)
        : [...selectedServiceLevel, value]
    );
  };

  const toggleDeliveryTime = (value: string) => {
    setSelectedDeliveryTime(
      selectedDeliveryTime.includes(value)
        ? selectedDeliveryTime.filter(v => v !== value)
        : [...selectedDeliveryTime, value]
    );
  };

  return (
    <div className="flex flex-col gap-3 sm:gap-4 mb-6">
      {/* Top Row - Search and Filter Button */}
      <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 w-full">
        {/* Search Bar */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-9 sm:pl-10 pr-3 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-full bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#bf2c7e] focus:border-[#bf2c7e] text-black"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>

        {/* Category Filter (Desktop) */}
        <div className="hidden sm:flex items-center gap-2 min-w-[180px]">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="appearance-none bg-white border border-gray-300 rounded-full px-3 py-2 sm:px-4 sm:py-2.5 pr-8 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#bf2c7e] focus:border-[#bf2c7e] text-sm sm:text-base w-full"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>

        {/* Filter Button (Visible on all screens) */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 rounded-full shadow-sm hover:bg-gray-50 text-sm font-medium"
        >
          <Filter className="h-4 w-4" />
          <span className="text-black">Filters</span>
        </button>
      </div>

      {/* Mobile Category Selector */}
      <div className="sm:hidden w-full">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="appearance-none bg-white border border-gray-300 rounded-full px-4 py-2.5 pr-8 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#bf2c7e] focus:border-[#bf2c7e] text-sm w-full text-black"
        >
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-lg w-full">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-base text-black">Filters</h3>
            <button 
              onClick={() => setShowFilters(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2 text-sm text-black">Service Level</h4>
              <div className="space-y-2">
                {serviceLevels.map(level => (
                  <button
                    key={level.value}
                    onClick={() => toggleServiceLevel(level.value)}
                    className={`flex items-center gap-2 w-full px-3 py-2 rounded-full text-left text-sm ${
                      selectedServiceLevel.includes(level.value)
                        ? "bg-[#bf2c7e] text-white font-medium"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    }`}
                  >
                    {selectedServiceLevel.includes(level.value) && <Check className="h-4 w-4" />}
                    {level.name}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-2 text-sm text-black">Delivery Time</h4>
              <div className="space-y-2">
                {deliveryTimes.map(time => (
                  <button
                    key={time.value}
                    onClick={() => toggleDeliveryTime(time.value)}
                    className={`flex items-center gap-2 w-full px-3 py-2 rounded-full text-left text-sm ${
                      selectedDeliveryTime.includes(time.value)
                        ? "bg-[#bf2c7e] text-white font-medium"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    }`}
                  >
                    {selectedDeliveryTime.includes(time.value) && <Check className="h-4 w-4" />}
                    {time.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesFilter;