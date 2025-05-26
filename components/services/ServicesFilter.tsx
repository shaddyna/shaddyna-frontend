// components/ServicesFilter.tsx
/*import { useState } from "react";
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
    setSelectedServiceLevel(prev =>
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    );
  };

  const toggleDeliveryTime = (value: string) => {
    setSelectedDeliveryTime(prev =>
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    );
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
      {/* Search Bar *
      <div className="relative w-full md:w-96">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search services..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-full bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#bf2c7e] focus:border-[#bf2c7e]"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>

      {/* Category Filter *
      <div className="flex items-center gap-3 w-full md:w-auto">
        <div className="hidden md:flex items-center gap-2">
          <span className="text-gray-600">Filter:</span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="appearance-none bg-white border border-gray-300 rounded-full px-4 py-3 pr-10 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#bf2c7e] focus:border-[#bf2c7e]"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>

        {/* Mobile Filter Button *
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-full shadow-sm hover:bg-gray-50"
        >
          <span>Filters</span>
          <Filter className="h-5 w-5" />
        </button>
      </div>

      {/* Filters Panel *
      {showFilters && (
        <div className="mb-8 p-6 bg-white border border-gray-200 rounded-xl shadow-lg w-full">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg">Filters</h3>
            <button onClick={() => setShowFilters(false)}>
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium mb-2">Service Level</h4>
              <div className="space-y-2">
                {serviceLevels.map(level => (
                  <button
                    key={level.value}
                    onClick={() => toggleServiceLevel(level.value)}
                    className={`flex items-center gap-2 w-full px-4 py-2 rounded-full text-left ${
                      selectedServiceLevel.includes(level.value)
                        ? "bg-[#bf2c7e] text-white font-bold"
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
              <h4 className="font-medium mb-2">Delivery Time</h4>
              <div className="space-y-2">
                {deliveryTimes.map(time => (
                  <button
                    key={time.value}
                    onClick={() => toggleDeliveryTime(time.value)}
                    className={`flex items-center gap-2 w-full px-4 py-2 rounded-full text-left ${
                      selectedDeliveryTime.includes(time.value)
                        ? "bg-[#bf2c7e] text-white font-bold"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    }`}
                  >
                    {selectedDeliveryTime.includes(time.value) && <Check className="h-4 w-4" />}
                    {time.name}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Categories</h4>
              <div className="grid grid-cols-2 gap-2">
                {categories.slice(1).map(category => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setShowFilters(false);
                    }}
                    className={`px-4 py-2 rounded-full text-sm ${
                      selectedCategory === category
                        ? "bg-[#bf2c7e] text-white font-bold"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    }`}
                    >
                    {category}
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

export default ServicesFilter;*/

// components/ServicesFilter.tsx
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
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
      {/* Search Bar */}
      <div className="relative w-full md:w-96">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search services..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-full bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#bf2c7e] focus:border-[#bf2c7e]"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>

      {/* Category Filter */}
      <div className="flex items-center gap-3 w-full md:w-auto">
        <div className="hidden md:flex items-center gap-2">
          <span className="text-gray-600">Filter:</span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="appearance-none bg-white border border-gray-300 rounded-full px-4 py-3 pr-10 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#bf2c7e] focus:border-[#bf2c7e]"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>

        {/* Mobile Filter Button */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-full shadow-sm hover:bg-gray-50"
        >
          <span>Filters</span>
          <Filter className="h-5 w-5" />
        </button>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="mb-8 p-6 bg-white border border-gray-200 rounded-xl shadow-lg w-full">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg">Filters</h3>
            <button onClick={() => setShowFilters(false)}>
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium mb-2">Service Level</h4>
              <div className="space-y-2">
                {serviceLevels.map(level => (
                  <button
                    key={level.value}
                    onClick={() => toggleServiceLevel(level.value)}
                    className={`flex items-center gap-2 w-full px-4 py-2 rounded-full text-left ${
                      selectedServiceLevel.includes(level.value)
                        ? "bg-[#bf2c7e] text-white font-bold"
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
              <h4 className="font-medium mb-2">Delivery Time</h4>
              <div className="space-y-2">
                {deliveryTimes.map(time => (
                  <button
                    key={time.value}
                    onClick={() => toggleDeliveryTime(time.value)}
                    className={`flex items-center gap-2 w-full px-4 py-2 rounded-full text-left ${
                      selectedDeliveryTime.includes(time.value)
                        ? "bg-[#bf2c7e] text-white font-bold"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    }`}
                  >
                    {selectedDeliveryTime.includes(time.value) && <Check className="h-4 w-4" />}
                    {time.name}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Categories</h4>
              <div className="grid grid-cols-2 gap-2">
                {categories.slice(1).map(category => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setShowFilters(false);
                    }}
                    className={`px-4 py-2 rounded-full text-sm ${
                      selectedCategory === category
                        ? "bg-[#bf2c7e] text-white font-bold"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    }`}
                    >
                    {category}
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