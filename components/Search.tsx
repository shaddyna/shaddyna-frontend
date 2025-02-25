import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function SearchBar() {
  return (
    <div className="flex justify-center items-center w-full px-3 mt-4">
      <div className="relative w-full max-w-lg">
        <FontAwesomeIcon
      
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" // Adjusted size
                  icon={"function"}        />
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 shadow-md transition-all"
        />
      </div>
    </div>
  );
}
