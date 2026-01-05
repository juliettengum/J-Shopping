import Link from "next/link";
import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CheckoutCancelPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col items-center justify-center text-center max-w-md mx-auto">
        <div className="flex size-20 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20 mb-6">
          <XCircle className="size-10 text-red-600" />
        </div>

        <h1 className="text-3xl font-bold mb-4">Payment Cancelled</h1>

        <p className="text-muted-foreground mb-8">
          Your payment was cancelled. No charges were made. Your cart items are
          still available if you&apos;d like to try again.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <Button asChild className="flex-1">
            <Link href="/cart">Return to Cart</Link>
          </Button>
          <Button variant="outline" asChild className="flex-1">
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

