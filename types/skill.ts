export interface Skill {
  _id?: string; // Optional, assigned by MongoDB
  title: string;
  description: string;
  price: number;
  deliveryTime: string;
  category: 'design' | 'development' | 'marketing' | 'writing' | 'video' | 'music' | 'business' | 'other';
  skills: string[];
  inclusions: string[]; // Optional
  images?: string[]; // Optional (Cloudinary URLs)
  about: string;
  user: string; // MongoDB ObjectId as string
  createdAt?: string; // Optional, ISO string
  averageRating?: number; // Optional, range 1 to 5
}
