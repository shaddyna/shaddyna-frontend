import { create } from 'zustand';
import axios from 'axios';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string; // Example role like 'admin', 'seller', 'customer'
}

interface UserStore {
  user: User | null;
  users: User[]; // Add users array to store all users
  setUser: (user: User) => void;
  clearUser: () => void;
  setUsers: (users: User[]) => void; // Method to set users
  fetchUsers: () => Promise<void>; // Method to fetch users from API
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  users: [],
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
  setUsers: (users) => set({ users }), // Sets all users
  fetchUsers: async () => {
    try {
      const response = await axios.get('https://shaddyna-frontend.onrender.com/api/users'); // Adjust the API endpoint
      set({ users: response.data });
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  },
}));
