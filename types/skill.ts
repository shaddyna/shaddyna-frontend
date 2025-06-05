export interface Skill {
  _id: string; 
  title: string;
  description: string;
  price: number;
  deliveryTime: string;
  category: 'design' | 'development' | 'marketing' | 'writing' | 'video' | 'music' | 'business' | 'other';
  skills: string[];
  inclusions: string[]; 
  images?: string[]; 
  about: string;
  user: string; 
  createdAt?: string; 
  averageRating?: number; 
}
