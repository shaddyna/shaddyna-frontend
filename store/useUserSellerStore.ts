import { create } from 'zustand';
import axios from 'axios';

interface User {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'customer' | 'seller'; // Directly from backend role
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
  currentUserRole: 'customer' | 'seller' | null;
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
      const response = await axios.get('http://localhost:5000/api/users'); // Adjust the API endpoint
      set({ users: response.data });
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  },

  // Fetch all sellers
  fetchSellers: async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/sellers'); // Adjust the API endpoint
      set({ sellers: response.data });
    } catch (error) {
      console.error('Error fetching sellers:', error);
    }
  },

  // Fetch current user based on local storage token and identify if they are a seller or customer
  fetchCurrentUser: async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        set({ user: null, currentUserRole: null });
        return;
      }

      const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decoding the JWT token
      const { id, email } = decodedToken;

      // Fetch the user
      const userResponse = await axios.get(`http://localhost:5000/api/users/${id}`);
      const userData = userResponse.data;

      if (!userData) {
        console.error('User not found');
        set({ user: null, currentUserRole: null });
        return;
      }

      // Set user data
      set({ user: userData });

      // Fetch sellers list only if user is not yet available
      if (!useUserSellerStore.getState().sellers.length) {
        await useUserSellerStore.getState().fetchSellers();
      }

      // Set user role
      const userRole = userData.role; // assuming role is directly available from the API
      set({ currentUserRole: userRole });

    } catch (error) {
      console.error('Error fetching current user:', error);
      set({ user: null, currentUserRole: null });
    }
  },
}));
