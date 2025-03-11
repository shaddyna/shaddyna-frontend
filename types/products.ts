// types/products.ts
export interface ProductDetail {
    id: string;
    name: string;
    description: string;
    price: number;
    images: string[];
    rating: number;
    stock: number;
    category: string;
    attributes: Record<string, string>;
  }
  
  export interface MiniCartItem {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
  }