import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
}

interface WishlistState {
  items: WishlistItem[];
  addItem: (item: WishlistItem) => void;
  removeItem: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  getItemCount: () => number;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (newItem) => {
        const items = get().items;
        const exists = items.some(item => item.id === newItem.id);
        
        if (!exists) {
          set({
            items: [...items, newItem],
          });
        }
      },
      
      removeItem: (id) => {
        set({
          items: get().items.filter(item => item.id !== id),
        });
      },
      
      isInWishlist: (id) => {
        return get().items.some(item => item.id === id);
      },
      
      getItemCount: () => {
        return get().items.length;
      },
    }),
    {
      name: 've-shop-wishlist',
    }
  )
);