// SearchBar.tsx
/*import React from 'react';

// Define the type for the props
interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <div>
      <h4 className="text-lg font-semibold text-[#182155]">Search</h4>
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded"
      />
    </div>
  );
};

export default SearchBar;*/
"use client";
import React from "react";
import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  handleSearch: () => void;
}

export const SearchBar = ({
  searchQuery,
  setSearchQuery,
  handleSearch,
}: SearchBarProps) => (
  <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
    <div className="relative">
      <input
        type="text"
        className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <FaSearch
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
        onClick={handleSearch}
      />
    </div>
  </form>
);
