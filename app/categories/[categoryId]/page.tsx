/*"use client";

/*import { useSearchParams } from "next/navigation"; // Import useSearchParams
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




/*"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BackButton from '@/components/BackButton';
import BottomNavigationBar from '@/components/BottomNav';
import Footer from '@/components/Footer';
import HeadNavigation from '@/components/HeadNavigation';
import Products from '@/components/Products';

const CategoryDetails: React.FC = () => {
  const [category, setCategory] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]); // Initialize products as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categoryId = window.location.pathname.split('/').pop(); // Get categoryId from the URL path

  useEffect(() => {
    const fetchCategoryDetails = async () => {
      setLoading(true);
      try {
        // Fetch category details from the backend
        const categoryResponse = await axios.get(`https://shaddyna-backend.onrender.com/api/categories/${categoryId}`);
        setCategory(categoryResponse.data);

        // Fetch products based on the categoryId
        const productsResponse = await axios.get(`http://localhost:5000/api/products?categoryId=${categoryId}`);
        setProducts(productsResponse.data);
      } catch (error) {
        setError('Failed to fetch category details');
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) {
      fetchCategoryDetails();
    }
  }, [categoryId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !category) {
    return <div>Error: {error || 'Category not found'}</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <HeadNavigation />
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-start mb-8 px-0">
          <BackButton />
        </div>

        {/* Category Header *
        <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8 mb-8 px-6 sm:px-12 md:px-16">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 leading-tight">{category.name}</h1>
          <p className="text-base sm:text-lg text-gray-600 font-medium">{category.description}</p>
        </div>

        {/* Products in Category *
        <div>
      <h1>{category.name}</h1>
      <p>{category.description}</p>

      <h2>Products in this category:</h2>
      <ul>
        {products && products.length > 0 ? (
          products.map((product: any) => (
            <li key={product._id}>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
            </li>
          ))
        ) : (
          <p>No products available in this category.</p>
        )}
      </ul>
    </div>

        {/* Category Contacts *
        <div className="mb-10">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#333333] mb-6">Contact</h2>
          {/* Add contact details or form here *
        </div>
      </div>

      {/* Bottom Navigation *
      <BottomNavigationBar />
      <Footer />
    </div>
  );
};

export default CategoryDetails;*/
"use client";
import React, { useEffect, useState } from "react";

const CategoryDetails: React.FC = () => {
  const [category, setCategory] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]); // Initialize products as an empty array
  const [loading, setLoading] = useState(true);
  const [categoryId, setCategoryId] = useState<string | null>(null); // State for categoryId

  useEffect(() => {
    // Fetching categoryId using window.location.pathname
    const id = window.location.pathname.split('/').pop();
    if (id) {
      setCategoryId(id); // Update categoryId once it's available
    }
  }, []); // This useEffect runs once when the component mounts

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

          // Ensure the fetched productsData is an array
          if (Array.isArray(productsData)) {
            setProducts(productsData);
          } else {
            setProducts([]); // Fallback to empty array if not an array
          }
        } catch (error) {
          console.error("Error fetching category details:", error);
          setProducts([]); // Fallback to empty array on error
        } finally {
          setLoading(false);
        }
      };

      fetchCategoryDetails();
    }
  }, [categoryId]); // Fetch data when categoryId is set

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
        {products && products.length > 0 ? (
          products.map((product: any) => (
            <li key={product._id}>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
            </li>
          ))
        ) : (
          <p>No products available in this category.</p>
        )}
      </ul>
    </div>
  );
};

export default CategoryDetails;
