"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { stripe } from "@/lib/stripe";
import { CartItemSchema } from "@/features/stripe/api/schemas";
import { dollarsToCents } from "@/features/stripe/api/utils";
import { z } from "zod";

// =============================================================================
// TYPES
// =============================================================================

const CheckoutInputSchema = z.object({
  items: z.array(CartItemSchema).min(1, "Cart cannot be empty"),
});

type CheckoutInput = z.infer<typeof CheckoutInputSchema>;

type CheckoutResult =
  | { success: true; url: string }
  | { success: false; error: string };

// =============================================================================
// CREATE CHECKOUT SESSION
// =============================================================================

export async function createCheckoutSession(
  input: CheckoutInput
): Promise<CheckoutResult> {
  // ---------------------------------------------------------------------------
  // 1. AUTHENTICATE USER
  // ---------------------------------------------------------------------------
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return { success: false, error: "Please log in to checkout" };
  }

  // ---------------------------------------------------------------------------
  // 2. VALIDATE INPUT
  // ---------------------------------------------------------------------------
  const validation = CheckoutInputSchema.safeParse(input);

  if (!validation.success) {
    return { success: false, error: validation.error.issues[0].message };
  }

  const { items } = validation.data;

  // ---------------------------------------------------------------------------
  // 3. BUILD LINE ITEMS
  // ---------------------------------------------------------------------------
  const lineItems = items.map((item) => {
    // Validate image URL - Stripe requires valid HTTPS URLs
    const isValidImageUrl =
      item.image &&
      typeof item.image === "string" &&
      (item.image.startsWith("https://") || item.image.startsWith("http://"));

    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          // Only include images array if we have a valid URL
          ...(isValidImageUrl ? { images: [item.image] } : {}),
          metadata: {
            productId: item.productId.toString(),
          },
        },
        unit_amount: dollarsToCents(item.price),
      },
      quantity: item.quantity,
    };
  });

  // ---------------------------------------------------------------------------
  // 4. CREATE STRIPE SESSION
  // ---------------------------------------------------------------------------
  try {
    // Compact cart data: only productId and quantity (fits in 500 char limit)
    const cartData = items.map((item) => ({
      id: item.productId,
      qty: item.quantity,
    }));

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: lineItems,
      customer_email: session.user.email,
      metadata: {
        userId: session.user.id,
        cart: JSON.stringify(cartData),
      },
      shipping_address_collection: {
        allowed_countries: ["US", "CA", "GB", "AU", "DE", "FR", "NG"],
      },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/cancel`,
    });

    if (!checkoutSession.url) {
      return { success: false, error: "Failed to create checkout session" };
    }

    return { success: true, url: checkoutSession.url };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Checkout failed";
    console.error("Checkout error:", message);
    return { success: false, error: message };
  }
}
