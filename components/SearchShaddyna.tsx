
/*"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faMicrophone } from "@fortawesome/free-solid-svg-icons";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {

  };

  return (
    <div className="flex justify-center items-center w-full px-3 mt-4">
      <div className="relative w-full max-w-lg">
        {/* Left icon *
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
          className="w-full pl-12 pr-12 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900 text-gray-700 shadow-md transition-all h-12"
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        
        {/* Right icon *
        <FontAwesomeIcon
          icon={faSearch}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
          style={{ fontSize: "20px", height: "20px", width: "20px" }}
          onClick={handleSearch}
        />
      </div>
    </div>
  );
}*/

/*"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faMicrophone, faSpinner } from "@fortawesome/free-solid-svg-icons";

interface Member {
  name: string;
  role: string;
  image: string;
}

interface Shelf {
  _id: string;
  name: string;
  description: string;
  image: string;
  price: string;
  members: Member[];
}

interface SearchBarProps {
  setIsSearching: (isSearching: boolean) => void;
}

export default function SearchBar({ setIsSearching }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Shelf[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Fetch data when searching
  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    try {
      const response = await fetch(`https://shaddyna-backend.onrender.com/api/shelf/shelves`);
      const data: Shelf[] = await response.json();

      // Filter shelves based on search query
      const filtered = data.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );

      setResults(filtered);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center w-full px-3 mt-4">
      <div className="relative w-full max-w-lg">
        {/* Search Input *
        <div className="relative w-full">
          {/* Left Microphone Icon *
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
            className="w-full pl-12 pr-12 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900 text-gray-700 shadow-md transition-all h-12"
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            onClick={() => setIsSearching(true)}
          />

          {/* Right Search Icon *
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
            style={{ fontSize: "20px", height: "20px", width: "20px" }}
            onClick={handleSearch}
          />
        </div>

        {/* Display Search Results *
        {query && (
          <div className="absolute left-0 w-full bg-white shadow-lg rounded-lg mt-2 p-3 max-h-60 overflow-y-auto z-50 border border-gray-200">
            {loading ? (
              <div className="flex justify-center items-center py-4">
                <FontAwesomeIcon icon={faSpinner} className="animate-spin text-blue-600 text-2xl" />
              </div>
            ) : results.length > 0 ? (
              results.map((item) => (
                <div key={item._id} className="p-2 border-b last:border-none hover:bg-gray-100 cursor-pointer">
                  {item.name}
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center">No results found</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}*/





/*"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faArrowLeft, faMicrophone, faSpinner } from "@fortawesome/free-solid-svg-icons";

interface Member {
  name: string;
  role: string;
  image: string;
}

interface Shelf {
  _id: string;
  name: string;
  description: string;
  image: string;
  price: string;
  members: Member[];
}

interface SearchBarProps {
  setIsSearching: (isSearching: boolean) => void;
}

export default function SearchBar({ setIsSearching }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Shelf[]>([]);
  const [loading, setLoading] = useState(false);
  const [allShelves, setAllShelves] = useState<Shelf[]>([]);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const router = useRouter();

  // Fetch all shelves initially when search bar is clicked
  const fetchShelves = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://shaddyna-backend.onrender.com/api/shelf/shelves");
      const data: Shelf[] = await response.json();
      setAllShelves(data);
      setResults(data);
    } catch (error) {
      console.error("Error fetching shelves:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter shelves based on search query
  const handleSearch = (value: string) => {
    setQuery(value);
    if (!value.trim()) {
      setResults(allShelves);
    } else {
      const filtered = allShelves.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filtered);
    }
  };

  // Handle going back to the initial state
  const handleBack = () => {
    setIsSearchActive(false);
    setQuery("");
    setResults([]);
    setIsSearching(false);
  };

  return (
    <div className="flex justify-center items-center w-full px-3 mt-4">
      <div className="relative w-full max-w-lg">
        {/* Search Input *
        <div className="relative w-full">
          {/* Left Icon - Back Arrow or Microphone *
          <FontAwesomeIcon
            icon={isSearchActive ? faArrowLeft : faMicrophone}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
            style={{ fontSize: "20px", height: "20px", width: "20px" }}
            onClick={isSearchActive ? handleBack : undefined}
          />

          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-12 pr-12 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900 text-gray-700 shadow-md transition-all h-12"
            onClick={() => {
              setIsSearching(true);
              setIsSearchActive(true);
              fetchShelves();
            }}
          />

          {/* Right Search Icon *
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
            style={{ fontSize: "20px", height: "20px", width: "20px" }}
          />
        </div>

        {/* Display Search Results *
        {isSearchActive && (
          <div className="absolute left-0 w-full bg-white shadow-lg rounded-lg mt-2 p-3 max-h-60 overflow-y-auto z-50 border border-gray-200">
            {loading ? (
              <div className="flex justify-center items-center py-4">
                <FontAwesomeIcon icon={faSpinner} className="animate-spin text-blue-600 text-2xl" />
              </div>
            ) : results.length > 0 ? (
              results.map((item) => (
                <div key={item._id} className="p-2 border-b last:border-none hover:bg-gray-100 cursor-pointer">
                  {item.name}
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center">No results found</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}*/

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faArrowLeft, faMicrophone, faSpinner } from "@fortawesome/free-solid-svg-icons";

interface Member {
  _id: string;
  name: string;
  role: string;
  image: string;
}

interface Shelf {
  _id: string;
  name: string;
  description: string;
  image: string;
  price: string;
  members: Member[];
}

interface SearchBarProps {
  setIsSearching: (isSearching: boolean) => void;
}

export default function SearchBar({ setIsSearching }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Shelf[]>([]);
  const [loading, setLoading] = useState(false);
  const [allShelves, setAllShelves] = useState<Shelf[]>([]);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const router = useRouter();

  // Fetch all shelves initially when search bar is clicked
  const fetchShelves = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://shaddyna-backend.onrender.com/api/shelf/shelves");
      const data: Shelf[] = await response.json();
      setAllShelves(data);
      setResults(data);
    } catch (error) {
      console.error("Error fetching shelves:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter shelves based on search query
  const handleSearch = (value: string) => {
    setQuery(value);
    if (!value.trim()) {
      setResults(allShelves);
    } else {
      const filtered = allShelves.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filtered);
    }
  };

  // Handle going back to the initial state
  const handleBack = () => {
    setIsSearchActive(false);
    setQuery("");
    setResults([]);
    setIsSearching(false);
  };

  return (
    <div className="flex justify-center items-center w-full px-3 mt-4">
      <div className="relative w-full max-w-lg">
        {/* Search Input */}
        <div className="relative w-full">
          {/* Left Icon - Back Arrow or Microphone */}
          <FontAwesomeIcon
            icon={isSearchActive ? faArrowLeft : faMicrophone}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
            style={{ fontSize: "20px", height: "20px", width: "20px" }}
            onClick={isSearchActive ? handleBack : undefined}
          />

          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-12 pr-12 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900 text-gray-700 shadow-md transition-all h-12"
            onClick={() => {
              setIsSearching(true);
              setIsSearchActive(true);
              fetchShelves();
            }}
          />

          {/* Right Search Icon */}
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
            style={{ fontSize: "20px", height: "20px", width: "20px" }}
          />
        </div>

        {/* Display Search Results */}
        {isSearchActive && (
          <div className="absolute left-0 w-full bg-white shadow-lg rounded-lg mt-2 p-3 overflow-y-auto z-50 border border-gray-200" style={{ height: "calc(100vh - 100px)" }}>
            {loading ? (
              <div className="flex justify-center items-center py-4">
                <FontAwesomeIcon icon={faSpinner} className="animate-spin text-blue-600 text-2xl" />
              </div>
            ) : results.length > 0 ? (
              results.map((shelf) => (
                <div key={shelf._id} className="bg-white p-2 rounded-lg flex border border-gray-300 hover:bg-gray-100 cursor-pointer">
                  <img
                    src={shelf.image}
                    alt={shelf.name}
                    className="w-1/3 h-24 object-contain rounded-md"
                  />
                  <div className="ml-2 flex flex-col justify-between">
                    <h3 className="text-xl text-gray-800 font-semibold">
                      {shelf.name} shelf
                    </h3>
                    <p className="text-gray-600 mt-0">{shelf.description}</p>
                    <p className="text-lg text-gray-800 font-bold mt-0">
                      Ksh {shelf.price}
                    </p>
                    <div className="flex items-center mt-auto">
                      <p className="text-sm text-gray-500">Owners:</p>
                      <ul className="flex ml-2">
                        {shelf.members?.map((member) => (
                          <li key={member._id} className="ml-1 text-gray-600 text-xs">
                            {member.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center">No results found</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
