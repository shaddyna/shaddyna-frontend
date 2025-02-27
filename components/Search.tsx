
"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faMicrophone } from "@fortawesome/free-solid-svg-icons";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/search-page?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="flex justify-center items-center w-full px-3 mt-4">
      <div className="relative w-full max-w-lg">
        {/* Left icon */}
        <FontAwesomeIcon
          icon={faMicrophone}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
          style={{ fontSize: "20px", height: "20px", width: "20px" }}
        />
        
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-12 pr-12 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 shadow-md transition-all h-12"
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        
        {/* Right icon */}
        <FontAwesomeIcon
          icon={faSearch}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
          style={{ fontSize: "20px", height: "20px", width: "20px" }}
          onClick={handleSearch}
        />
      </div>
    </div>
  );
}
{/*import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faMicrophone } from "@fortawesome/free-solid-svg-icons";

export default function SearchBar() {
  return (
    <div className="flex justify-center items-center w-full px-3 mt-4">
      <div className="relative w-full max-w-lg">
        {/* Left icon *
         <FontAwesomeIcon
          icon={faSearch}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
          style={{ fontSize: "20px", height: "20px", width: "20px" }}
        />
        
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-12 pr-12 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-500 text-gray-700 shadow-md transition-all h-12"
        />
        
        {/* Right icon *
        <FontAwesomeIcon
          icon={faMicrophone}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          style={{ fontSize: "20px", height: "20px", width: "20px" }}
        />
      </div>
    </div>
  );
}*/}