"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

interface Product {
  _id: string;
  name: string;
  price: number;
  images: string[];
}

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams?.get("query") || ""; // ✅ Fix applied

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query) return;

    const fetchProducts = async () => {
      try {
        const response = await fetch("https://shaddyna-backend.onrender.com/api/products/all");
        if (!response.ok) throw new Error("Failed to fetch products");

        const data = await response.json();
        console.log("Fetched Data:", data);

        const productsArray = Array.isArray(data) ? data : data.products || [];
        if (!Array.isArray(productsArray)) throw new Error("Invalid data format");

        setProducts(productsArray);

        const filtered = productsArray.filter(product =>
          product.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredProducts(filtered);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [query]);

  // ✅ Safe method to highlight search term without `dangerouslySetInnerHTML`
  const highlightMatch = (text: string) => {
    if (!query) return text;

    const parts = text.split(new RegExp(`(${query})`, "gi"));

    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={i} className="bg-yellow-300 text-black px-1 rounded">{part}</span>
      ) : (
        part
      )
    );
  };

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  if (filteredProducts.length === 0)
    return <p className="text-center text-gray-500">No results found for "{query}"</p>;

  return (
    <div className="container mx-auto p-4 bg-white">
      <h2 className="text-2xl font-bold mb-4">Search Results for "{query}"</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.map(product => (
          <div key={product._id} className="border p-4 rounded-lg shadow-md bg-white">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-40 object-cover mb-2 rounded"
            />
            {/* ✅ Updated text rendering without `dangerouslySetInnerHTML` */}
            <h3 className="text-lg font-semibold">{highlightMatch(product.name)}</h3>
            <p className="text-gray-600">${product.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
