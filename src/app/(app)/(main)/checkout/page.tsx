import { requireAuth } from "@/lib/auth-utils";
import { CheckoutClient } from "./checkout-client";

export default async function CheckoutPage() {
  await requireAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Checkout</h1>
        <p className="text-muted-foreground mt-2">
          Review your order and complete payment
        </p>
      </div>

      <CheckoutClient />
    </div>
  );
}
