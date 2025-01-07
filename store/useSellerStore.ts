import { create } from 'zustand';
import axios from 'axios';

interface Seller {
  _id: string;
  name: string;
  status: string;
  email: string;
  phoneNumber: string;
  mpesaCode: string;
  amount: number;
}

interface SellerStore {
  sellers: Seller[];
  setSellers: (sellers: Seller[]) => void;
  fetchSellers: () => Promise<void>;
}

export const useSellerStore = create<SellerStore>((set) => ({
  sellers: [],
  setSellers: (sellers) => set({ sellers }),
  fetchSellers: async () => {
    try {
      const response = await axios.get('https://shaddyna-backend.onrender.com/api/sellers'); 
      set({ sellers: response.data });
    } catch (error) {
      console.error('Error fetching sellers:', error);
    }
  },
}));
