// types.ts
export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'customer' | 'admin' | 'seller';
  isActive: boolean;
  member: boolean;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
  shop?: {
    _id: string;
    name: string;
  };
  // Frontend-only properties
  avatar?: string;
  fullName?: string;
}

// types/memberRequest.ts
export interface MemberRequest {
  _id: string;
  userId: {
    _id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  status: 'pending' | 'approved' | 'rejected';
  paymentMethod: 'mpesa' | 'card' | 'bank';
  mpesaName?: string;
  mpesaCode?: string;
  amount: number;
  createdAt: string;
  processedAt?: string;
  processedBy?: {
    _id: string;
    name: string;
  };
}

export interface Seller {
  _id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  mpesaCode: string;
  amount: number;
  status: 'inactive' | 'pending' | 'active';
  createdAt: string;
  updatedAt: string;
  // Optional frontend properties
  avatar?: string;
  shopName?: string;
}

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

export interface Member {
  _id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  mpesaCode: string;
  amount: number;
  status: 'inactive' | 'pending' | 'active';
  createdAt: string;
  updatedAt: string;
  // Frontend-only properties
  avatar?: string;
  role?: string;
}

export type TabType = 'profile' | 'shop' | 'products' | 'orders' | 'skills' | 'members' | 'membersrequests'| 'sellers' | 'sellerrequests' | 'shops'| 'inquiries' | 'users';