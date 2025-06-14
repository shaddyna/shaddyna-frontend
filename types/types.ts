// types.ts
export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  joinDate: string;
  location: string;
};

// Add this to your types file
export interface Shop {
  _id: string;
  name: string;
  owner: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  description: string;
  location: string;
  categories: string[];
  image: string;
  contact: {
    email: string;
    phone?: string;
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
  workingHours: Map<string, {
    open: string;
    close: string;
    closed: boolean;
  }>;
  policies?: {
    returnPolicy?: string;
    shippingPolicy?: string;
  };
  createdAt: string;
  isActive: boolean;
  // Additional frontend-only properties
  rating?: number;
  productsCount?: number;
}
// Add this to your types file
export interface Product {
  _id: string;
  name: string;
  designer: string;
  category: {
    main: string;
    sub: string;
    brand: string;
  };
  price: number;
  stock: number;
  images: string[];
  attributes: Record<string, any>;
  owner: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  shop: {
    id: string;
    name: string;
  };
  createdAt: string;
  // Frontend-only properties (optional)
  rating?: number;
  thumbnail?: string;
}

export type Order = {
  id: string;
  date: string;
  status: 'pending' | 'completed' | 'cancelled';
  total: number;
  items: number;
  thumbnail: string;
};

export interface Skill {
  _id: string;
  title: string;
  description: string;
  price: number;
  deliveryTime: string;
  category: string;
  skills: string[];
  inclusions: string[];
  images: string[];
  about: string;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  createdAt: string;
  averageRating?: number;
}

export type Request = {
  id: string;
  type: 'seller' | 'member';
  status: 'pending' | 'approved' | 'rejected';
  date: string;
  message?: string;
};

export type Member = {
  id: string;
  name: string;
  role: string;
  joinDate: string;
  avatar: string;
};

export type TabType = 'profile' | 'shop' | 'products' | 'orders' | 'skills' | 'requests' | 'members';