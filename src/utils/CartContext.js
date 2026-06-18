/**
 * Cart store (zustand).
 *
 * Migrated from React Context to zustand so any component can read or mutate
 * cart state without a Provider wrapper. The exposed hook name `useCart` is
 * kept identical so existing consumers (35+ call sites across screens) keep
 * working without changes.
 *
 * Compatibility shim:
 *   - `CartProvider` is re-exported as a pass-through. It exists only so the
 *     <CartProvider>...</CartProvider> wrapper in Navigator.js keeps
 *     compiling during the migration; it no longer holds any state.
 */
import { create } from 'zustand';
import { fetchCart } from './api';

export const useCartStore = create((set, get) => ({
  cartCount: 0,
  cartItems: [],

  setCartCount: (n) => set({ cartCount: Number(n) || 0 }),

  refreshCart: async () => {
    try {
      const res = await fetchCart();
      if (res?.code === 1 && res.data) {
        const items = res.data.items || res.data.cart?.items || res.data || [];
        const itemsList = Array.isArray(items) ? items : [];
        const totalCount = itemsList.reduce(
          (sum, item) => sum + (item.quantity || 1),
          0,
        );
        set({ cartItems: itemsList, cartCount: totalCount });
        return itemsList;
      }
    } catch (e) {
      console.log('Cart refresh error:', e);
    }
    return get().cartItems;
  },

  reset: () => set({ cartCount: 0, cartItems: [] }),
}));

/**
 * Drop-in replacement for the old `useCart()` Context hook.
 * Returns the same { cartCount, cartItems, refreshCart, setCartCount } shape.
 */
export const useCart = () => {
  const cartCount = useCartStore((s) => s.cartCount);
  const cartItems = useCartStore((s) => s.cartItems);
  const refreshCart = useCartStore((s) => s.refreshCart);
  const setCartCount = useCartStore((s) => s.setCartCount);
  return { cartCount, cartItems, refreshCart, setCartCount };
};

/**
 * Pass-through Provider so the existing <CartProvider>...</CartProvider>
 * wrapper in Navigator.js keeps compiling. Safe to remove once that wrapper
 * is taken out — kept here to make the migration incremental.
 */
export const CartProvider = ({ children }) => children;

export default useCartStore;
