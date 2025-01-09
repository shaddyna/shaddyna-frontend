/*"use client";

import { useSearchParams } from "next/navigation"; // Import useSearchParams
import React, { useEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

const CategoryPage: React.FC = () => {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId"); // Get the categoryId query parameter

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (categoryId) {
      fetchProducts();
    }
  }, [categoryId]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/products?categoryId=${categoryId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      alert("An error occurred while fetching products. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="my-4">
      <h1 className="text-2xl font-semibold text-gray-800 text-center">Category Products</h1>
      {loading ? (
        <p className="text-center mt-4">Loading products...</p>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
          {products.map((product) => (
            <div key={product.id} className="bg-gray-200 rounded-lg p-3">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-32 sm:h-36 object-cover rounded-t-lg"
              />
              <h3 className="text-center text-gray-800 mt-2 text-sm sm:text-base font-medium">{product.name}</h3>
              <p className="text-center text-gray-600 mt-1">${product.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center mt-4">No products found for this category.</p>
      )}
    </section>
  );
};

export default CategoryPage;*/
// pages/categories/[categoryId].tsx
"use client"
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";  // Import from next/navigation

const CategoryDetails: React.FC = () => {
  const [category, setCategory] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Hardcoded categoryId for debugging
  const categoryId = "677e8f58f9742b17455787b3"; // Example hardcoded category ID

  useEffect(() => {
    if (categoryId) {
      const fetchCategoryDetails = async () => {
        setLoading(true);
        try {
          const categoryResponse = await fetch(
            `https://shaddyna-backend.onrender.com/api/categories/${categoryId}`
          );
          const categoryData = await categoryResponse.json();
          setCategory(categoryData);

          const productsResponse = await fetch(
            `https://shaddyna-backend.onrender.com/api/products?categoryId=${categoryId}`
          );
          const productsData = await productsResponse.json();
          setProducts(productsData);
        } catch (error) {
          console.error("Error fetching category details:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchCategoryDetails();
    }
  }, [categoryId]);

  if (loading) {
    return <p>Loading category details...</p>;
  }

  if (!category) {
    return <p>Category not found.</p>;
  }

  return (
    <div>
      <h1>{category.name}</h1>
      <p>{category.description}</p>

      <h2>Products in this category:</h2>
      <ul>
        {products.map((product: any) => (
          <li key={product._id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryDetails;
