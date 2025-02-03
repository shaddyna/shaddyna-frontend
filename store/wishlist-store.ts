import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface WishlistItem {
  _id: string;
  name: string;
  price: number;
  images: string | string[]; 
  //images: string[];
  rating: number;  // or other fields you need
}

interface WishlistStore {
  items: WishlistItem[];
  addItem: (item: WishlistItem) => void;
  removeItem: (itemId: string) => void;
  clearWishlist: () => void;
  getTotalItems: () => number;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        set((state) => {
          const itemExists = state.items.some((i) => i._id === item._id);
          
          if (itemExists) {
            // Optionally, you can update or do nothing if the item already exists
            return state;
          }

          return { items: [...state.items, item] };
        });
      },
      removeItem: (itemId) => {
        set((state) => ({
          items: state.items.filter((i) => i._id !== itemId),
        }));
      },
      clearWishlist: () => set({ items: [] }),
      getTotalItems: () => {
        const { items } = get();
        return items.length;  // return number of items in the wishlist
      },
    }),
    {
      name: 'wishlist-storage',  // This will store the wishlist in localStorage
    }
  )
);
