import { create } from 'zustand';
import axios from 'axios';

interface User {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'customer' | 'seller'; // Directly from backend role
  token: string;
}

interface Seller {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  status: string;
}

interface UserSellerStore {
  user: User | null;
  sellers: Seller[];
  users: User[];
  currentUserRole: 'customer' | 'seller' | 'admin' | null; // Include 'admin'
  setUser: (user: User) => void;
  setUsers: (users: User[]) => void;
  setSellers: (sellers: Seller[]) => void;
  fetchUsers: () => Promise<void>;
  fetchSellers: () => Promise<void>;
  fetchCurrentUser: () => Promise<void>;
}

export const useUserSellerStore = create<UserSellerStore>((set) => ({
  user: null,
  sellers: [],
  users: [],
  currentUserRole: null,
  setUser: (user) => set({ user }),
  setUsers: (users) => set({ users }),
  setSellers: (sellers) => set({ sellers }),

  // Fetch all users
  fetchUsers: async () => {
    try {
      const response = await axios.get('https://shaddyna-backend.onrender.com/api/users');
      set({ users: response.data });
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  },

  // Fetch all sellers
  fetchSellers: async () => {
    try {
      const response = await axios.get('https://shaddyna-backend.onrender.com/api/sellers');
      set({ sellers: response.data });
    } catch (error) {
      console.error('Error fetching sellers:', error);
    }
  },

  // Fetch current user based on token stored in localStorage
  fetchCurrentUser: async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found in localStorage');
        set({ user: null, currentUserRole: null });
        return;
      }

      // Check if token is valid by decoding it (JWT validation)
      let decodedToken;
      try {
        decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode JWT
      } catch (error) {
        console.error('Invalid token format:', error);
        set({ user: null, currentUserRole: null });
        return;
      }

      const { id, email } = decodedToken;

      // Fetch the user
      const userResponse = await axios.get(`https://shaddyna-backend.onrender.com/api/users/${id}`);
      const userData = userResponse.data;

      if (!userData) {
        console.error('User not found with the decoded token:', id);
        set({ user: null, currentUserRole: null });
        return;
      }

      // Set user data and role
      set({ user: userData });

      // Fetch sellers list if not already fetched
      if (!useUserSellerStore.getState().sellers.length) {
        await useUserSellerStore.getState().fetchSellers();
      }

      const userRole = userData.role;
      set({ currentUserRole: userRole });
    } catch (error) {
      console.error('Error fetching current user:', error);
      set({ user: null, currentUserRole: null });
    }
  },
}));




