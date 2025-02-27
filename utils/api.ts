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
  };
