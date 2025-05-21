import { useState } from "react";
import { Filter, Check, X } from "lucide-react";

interface FilterPanelProps {
  categories: string[];
  serviceLevels: { name: string; value: string }[];
  deliveryTimes: { name: string; value: string }[];
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  selectedServiceLevel: string[];
  setSelectedServiceLevel: React.Dispatch<React.SetStateAction<string[]>>;
  selectedDeliveryTime: string[];
  setSelectedDeliveryTime: React.Dispatch<React.SetStateAction<string[]>>;
  showFilters: boolean;
  setShowFilters: React.Dispatch<React.SetStateAction<boolean>>;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  categories,
  serviceLevels,
  deliveryTimes,
  selectedCategory,
  setSelectedCategory,
  selectedServiceLevel,
  setSelectedServiceLevel,
  selectedDeliveryTime,
  setSelectedDeliveryTime,
  showFilters,
  setShowFilters,
}) => {
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
    <div className="mb-8 p-6 bg-white border border-gray-200 rounded-xl shadow-lg">
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
                    ? "bg-[#f4b500] text-black font-bold"
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
                    ? "bg-[#f4b500] text-black font-bold"
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
                    ? "bg-[#f4b500] text-black font-bold"
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
  );
};

export default FilterPanel;