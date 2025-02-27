/*"use client";
import { useSearchParams } from "next/navigation";
import { useFetchProducts } from "@/hooks/useFetchProduct";
import { highlightMatch } from "@/utils/filterProducts";

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams?.get("query") || "";

  const { filteredProducts, loading, error } = useFetchProducts(query);

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  if (filteredProducts.length === 0)
    return <p className="text-center text-gray-500">No results found for "{query}"</p>;

  return (
    <div className="container mx-auto p-4 bg-white">
      <h2 className="text-2xl text-gray-800 font-bold mb-4">Search Results for "{query}"</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.map(product => (
          <div key={product._id} className="border p-4 rounded-lg shadow-md bg-white">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-40 object-cover mb-2 rounded"
            />
            <h3 className="text-lg text-gray-800 font-semibold">{highlightMatch(product.name, query)}</h3>
            <p className="text-gray-600">Ksh{product.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}*/

"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { fetchProducts, fetchShops, Product, Shop } from "@/utils/api";
import { highlightMatch } from "@/utils/filterProducts";

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams?.get("query") || "";

  const [products, setProducts] = useState<Product[]>([]);
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const [fetchedProducts, fetchedShops] = await Promise.all([fetchProducts(), fetchShops()]);

        setProducts(fetchedProducts.filter(p => p.name.toLowerCase().includes(query.toLowerCase())));
        setShops(fetchedShops.filter(s => s.name.toLowerCase().includes(query.toLowerCase())));
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  if (products.length === 0 && shops.length === 0)
    return <p className="text-center text-gray-500">No results found for "{query}"</p>;

  return (
    <div className="container mx-auto p-4 bg-white">
      <h2 className="text-2xl text-gray-800 font-bold mb-4">Search Results for "{query}"</h2>

      {/* Products Section */}
      {products.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Products</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map(product => (
              <div key={product._id} className="border p-4 rounded-lg shadow-md bg-white">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-40 object-cover mb-2 rounded"
                />
                <h3 className="text-lg text-gray-800 font-semibold">{highlightMatch(product.name, query)}</h3>
                <p className="text-gray-600">Ksh{product.price.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Shops Section */}
      {shops.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Shops</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {shops.map(shop => (
              <div key={shop._id} className="border p-4 rounded-lg shadow-md bg-white flex flex-col items-center">
                <img
                  src={shop.image}
                  alt={shop.name}
                  className="w-20 h-20 object-cover mb-2 rounded-full"
                />
                <h3 className="text-lg text-gray-800 font-semibold">{highlightMatch(shop.name, query)}</h3>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

