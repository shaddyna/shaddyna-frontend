"use client";
import { useEffect, useState } from "react";
import { Product } from "@/models/productModel";

export const useFetchProducts = (query: string) => {
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

        // Filter products
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

  return { products, filteredProducts, loading, error };
};
