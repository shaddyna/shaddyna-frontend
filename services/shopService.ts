//import { User } from "@/context/AuthContext";

export interface Shop {
  _id: string;
  name: string;
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
  workingHours: {
    [day: string]: {
      open: string;
      close: string;
      closed: boolean;
    };
  };
  policies: {
    returnPolicy?: string;
    shippingPolicy?: string;
  };
 // owner: User;
  createdAt: string;
  isActive: boolean;
}

export const createShop = async (shopData: FormData, token: string): Promise<Shop> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/shops`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: shopData
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to create shop');
  }

  return response.json();
};

export const getShops = async (): Promise<Shop[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/shops`);

  if (!response.ok) {
    throw new Error('Failed to fetch shops');
  }

  return response.json();
};

export const getShopById = async (id: string): Promise<Shop> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/shops/${id}`);

  if (!response.ok) {
    throw new Error('Failed to fetch shop');
  }

  return response.json();
};

export const getShopByUser = async (userId: string): Promise<Shop> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/shops/user/${userId}`);

  if (!response.ok) {
    throw new Error('Failed to fetch user shop');
  }

  return response.json();
};