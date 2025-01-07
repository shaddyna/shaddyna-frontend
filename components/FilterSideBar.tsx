import { FC } from 'react';

interface Filters {
  priceRange: [number, number];
  ratings: number;
  sortBy: string;
}

interface FilterSidebarProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
}

const FilterSidebar: FC<FilterSidebarProps> = ({ filters, onFilterChange }) => {
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, index: 0 | 1) => {
    // Explicitly typing newPriceRange as a tuple of two numbers
    const newPriceRange: [number, number] = [...filters.priceRange];
    newPriceRange[index] = parseInt(e.target.value, 10); // Update the appropriate price index
    onFilterChange({ ...filters, priceRange: newPriceRange });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ ...filters, sortBy: e.target.value });
  };

  const handleRatingsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ ...filters, ratings: parseInt(e.target.value, 10) });
  };

  return (
    <div className="w-64 p-6 bg-gray-100 rounded-xl shadow-lg">
      <h3 className="text-xl font-bold mb-4">Filters</h3>

      {/* Price Range Slider */}
      <div className="mb-6">
        <label className="block mb-2">Price Range</label>
        <div className="flex justify-between">
          <input
            type="range"
            min={0}
            max={1000}
            value={filters.priceRange[0]}
            onChange={(e) => handlePriceChange(e, 0)} // Update min price
            className="w-full"
          />
          <input
            type="range"
            min={0}
            max={1000}
            value={filters.priceRange[1]}
            onChange={(e) => handlePriceChange(e, 1)} // Update max price
            className="w-full"
          />
        </div>
        <div className="flex justify-between text-sm text-[#182155]">
          <span>${filters.priceRange[0]}</span>
          <span>${filters.priceRange[1]}</span>
        </div>
      </div>

      {/* Ratings Filter */}
      <div className="mb-6">
        <label className="block mb-2">Ratings</label>
        <select
          value={filters.ratings}
          onChange={handleRatingsChange}
          className="w-full p-2 border-2 border-[#182155] rounded-xl"
        >
          <option value={0}>All</option>
          <option value={1}>1 star</option>
          <option value={2}>2 stars</option>
          <option value={3}>3 stars</option>
          <option value={4}>4 stars</option>
          <option value={5}>5 stars</option>
        </select>
      </div>

      {/* Sort By Filter */}
      <div className="mb-6">
        <label className="block mb-2">Sort By</label>
        <select
          value={filters.sortBy}
          onChange={handleSortChange}
          className="w-full p-2 border-2 border-[#182155] rounded-xl"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>
    </div>
  );
};

export default FilterSidebar;

