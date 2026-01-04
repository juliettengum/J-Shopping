"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/stores/cart-store";
import { cn } from "@/lib/utils";

type CartBadgeProps = {
  className?: string;
};

export function CartBadge({ className }: CartBadgeProps) {
  const [isClient, setIsClient] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const items = useCartStore((state) => state.items);
  const isHydrated = useCartStore((state) => state.isHydrated);

  // Track total items for animation trigger
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  // Handle client-side hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Animate badge when count changes
  useEffect(() => {
    if (totalItems > 0 && isClient && isHydrated) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [totalItems, isClient, isHydrated]);

  // Show 0 during SSR and before hydration
  const displayCount = isClient && isHydrated ? totalItems : 0;

  return (
    <Button
      variant="outline"
      size="icon"
      className={cn("relative rounded-lg", className)}
      asChild
    >
      <Link href="/cart">
        <ShoppingCart className="h-5 w-5" />
        <Badge
          className={cn(
            "absolute -top-2 -right-2 h-5 min-w-5 rounded-full p-0 flex items-center justify-center text-xs transition-transform duration-200",
            isAnimating && "scale-125",
            displayCount === 0 && "bg-muted text-muted-foreground"
          )}
          variant={displayCount > 0 ? "destructive" : "secondary"}
        >
          {displayCount > 99 ? "99+" : displayCount}
        </Badge>
        <span className="sr-only">
          Shopping Cart{displayCount > 0 ? `, ${displayCount} items` : ""}
        </span>
      </Link>
    </Button>
  );
}

