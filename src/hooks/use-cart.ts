"use client";

import { useEffect, useState } from "react";
import { useCartStore, type CartItem } from "@/stores/cart-store";

/**
 * Safe cart hook that handles SSR hydration
 * Returns empty values during SSR, then hydrates with actual cart data
 */
export function useCart() {
  const [isClient, setIsClient] = useState(false);

  const items = useCartStore((state) => state.items);
  const isHydrated = useCartStore((state) => state.isHydrated);
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);
  const getTotalItems = useCartStore((state) => state.getTotalItems);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const getItemQuantity = useCartStore((state) => state.getItemQuantity);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Return safe values during SSR
  if (!isClient || !isHydrated) {
    return {
      items: [] as CartItem[],
      isReady: false,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      totalItems: 0,
      totalPrice: 0,
      getItemQuantity: () => 0,
    };
  }

  return {
    items,
    isReady: true,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems: getTotalItems(),
    totalPrice: getTotalPrice(),
    getItemQuantity,
  };
}

/**
 * Hook to get just the cart item count (for header badge)
 * Safe for SSR
 */
export function useCartCount() {
  const [isClient, setIsClient] = useState(false);
  const getTotalItems = useCartStore((state) => state.getTotalItems);
  const isHydrated = useCartStore((state) => state.isHydrated);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || !isHydrated) {
    return 0;
  }

  return getTotalItems();
}

