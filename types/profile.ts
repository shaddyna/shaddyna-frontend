// types/User.ts

export interface User {
  _id: string; 
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'customer' | 'admin' | 'seller';
  isActive: boolean;
  lastLogin?: Date; 
  createdAt: Date;
  updatedAt: Date;
  member: boolean;
  phoneNumber?: string;
}

export interface SellerRequest {
  _id: string;
  amount: number;
  paymentMethod: string;
  mpesaName?: string;
  mpesaCode?: string;
  status: 'pending' | 'approved' | 'rejected';
  processedAt?: string;
  userId: {
    firstName: string;
    lastName: string;
    email: string;
  }; }