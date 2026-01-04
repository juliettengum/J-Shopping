import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Cart item type
export interface CartItem {
  productId: number;
  name: string;
  slug: string;
  price: number; // The actual price (discounted or original)
  originalPrice: number;
  image: string;
  quantity: number;
  maxStock: number;
}

// Cart store state and actions
interface CartState {
  items: CartItem[];
  isHydrated: boolean;
}

interface CartActions {
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getItemQuantity: (productId: number) => number;
  setHydrated: () => void;
}

type CartStore = CartState & CartActions;

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      // Initial state
      items: [],
      isHydrated: false,

      // Set hydrated (called after client-side hydration)
      setHydrated: () => set({ isHydrated: true }),

      // Add item to cart
      addItem: (item, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find(
            (i) => i.productId === item.productId
          );

          if (existingItem) {
            // Update quantity if item exists (respecting max stock)
            const newQuantity = Math.min(
              existingItem.quantity + quantity,
              item.maxStock
            );
            return {
              items: state.items.map((i) =>
                i.productId === item.productId
                  ? { ...i, quantity: newQuantity }
                  : i
              ),
            };
          }

          // Add new item
          return {
            items: [
              ...state.items,
              { ...item, quantity: Math.min(quantity, item.maxStock) },
            ],
          };
        });
      },

      // Remove item from cart
      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((i) => i.productId !== productId),
        }));
      },

      // Update item quantity
      updateQuantity: (productId, quantity) => {
        set((state) => {
          if (quantity <= 0) {
            // Remove item if quantity is 0 or less
            return {
              items: state.items.filter((i) => i.productId !== productId),
            };
          }

          return {
            items: state.items.map((i) =>
              i.productId === productId
                ? { ...i, quantity: Math.min(quantity, i.maxStock) }
                : i
            ),
          };
        });
      },

      // Clear entire cart
      clearCart: () => set({ items: [] }),

      // Get total number of items in cart
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      // Get total price of cart
      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },

      // Get quantity of a specific item
      getItemQuantity: (productId) => {
        const item = get().items.find((i) => i.productId === productId);
        return item?.quantity ?? 0;
      },
    }),
    {
      name: "jshopping-cart", // localStorage key
      storage: createJSONStorage(() => localStorage),
      // Only persist items, not hydration state
      partialize: (state) => ({ items: state.items }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    }
  )
);
