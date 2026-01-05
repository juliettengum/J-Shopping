"use client";

import { useEffect } from "react";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cart-store";

export default function CheckoutSuccessPage() {
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col items-center justify-center text-center max-w-md mx-auto">
        <div className="flex size-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20 mb-6">
          <CheckCircle className="size-10 text-green-600" />
        </div>

        <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>

        <p className="text-muted-foreground mb-8">
          Thank you for your purchase. Your order has been confirmed and you
          will receive an email confirmation shortly.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <Button asChild className="flex-1">
            <Link href="/orders">View Orders</Link>
          </Button>
          <Button variant="outline" asChild className="flex-1">
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
