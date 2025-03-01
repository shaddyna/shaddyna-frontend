/*export interface Product {
    _id: string;
    name: string;
    price: number;
    images: string[];
  }
  
  export interface Shop {
    _id: string;
    name: string;
    image: string;
  }
  
  export const fetchProducts = async (): Promise<Product[]> => {
    try {
      const response = await fetch("https://shaddyna-backend.onrender.com/api/products/all");
      if (!response.ok) throw new Error("Failed to fetch products");
      
      const data = await response.json();
      return Array.isArray(data) ? data : data.products || [];
    } catch (error) {
      console.error("Product Fetch Error:", error);
      return [];
    }
  };
  
  export const fetchShops = async (): Promise<Shop[]> => {
    try {
      const response = await fetch("https://shaddyna-backend.onrender.com/api/shops/shops");
      if (!response.ok) throw new Error("Failed to fetch shops");
  
      const data = await response.json();
      return Array.isArray(data) ? data : data.shops || [];
    } catch (error) {
      console.error("Shop Fetch Error:", error);
      return [];
    }
  };*/

  export interface Product {
    _id: string;
    name: string;
    price: number;
    images: string[];
  }
  
  export interface Shop {
    _id: string;
    name: string;
    image: string;
  }
  
  export interface User {
    _id: string;
    firstName: string;
    lastName: string;
    avatar: string;
  }
  
  export const fetchProducts = async (): Promise<Product[]> => {
    return fetchData("https://shaddyna-backend.onrender.com/api/products/all", "products");
  };
  
  export const fetchShops = async (): Promise<Shop[]> => {
    return fetchData("https://shaddyna-backend.onrender.com/api/shops/shops", "shops");
  };
  
  export const fetchUsers = async (): Promise<User[]> => {
    return fetchData("https://shaddyna-backend.onrender.com/api/users/all", "users");
  };
  
  const fetchData = async (url: string, key: string) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Failed to fetch ${key}`);
  
      const data = await response.json();
      return Array.isArray(data) ? data : data[key] || [];
    } catch (error) {
      console.error(`${key} Fetch Error:`, error);
      return [];
    }
  };
  
