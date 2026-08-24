/**
 * Wishlist count store (zustand) — mirrors CartContext.js so the header's
 * wishlist icon can show a badge the same way the cart icon does.
 */
import { create } from 'zustand';
import { getWishlistCount } from './api';

export const useWishlistStore = create((set) => ({
  wishlistCount: 0,

  setWishlistCount: (n) => set({ wishlistCount: Number(n) || 0 }),

  refreshWishlistCount: async () => {
    try {
      const res = await getWishlistCount();
      if (res?.code === 1) {
        set({ wishlistCount: Number(res.data?.count) || 0 });
      }
    } catch (e) {
      console.log('Wishlist count refresh error:', e);
    }
  },

  reset: () => set({ wishlistCount: 0 }),
}));

export const useWishlist = () => {
  const wishlistCount = useWishlistStore((s) => s.wishlistCount);
  const refreshWishlistCount = useWishlistStore((s) => s.refreshWishlistCount);
  const setWishlistCount = useWishlistStore((s) => s.setWishlistCount);
  return { wishlistCount, refreshWishlistCount, setWishlistCount };
};

export default useWishlistStore;
