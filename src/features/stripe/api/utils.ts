import type { Stripe } from "stripe";
import {
  ShippingAddressSchema,
  CompactCartSchema,
  type ShippingAddress,
  type CompactCartItem,
} from "./schemas";

/**
 * Generate unique order number
 */
export function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `ORD-${timestamp}-${random}`;
}

/**
 * Parse compact cart data from JSON string
 */
export function parseCompactCart(jsonString: string): CompactCartItem[] {
  const parsed = JSON.parse(jsonString);
  return CompactCartSchema.parse(parsed);
}

/**
 * Extract shipping address from Stripe customer details
 */
export function extractShippingAddress(
  customerDetails: Stripe.Checkout.Session.CustomerDetails | null
): ShippingAddress | null {
  if (!customerDetails?.address) {
    return null;
  }

  const { address } = customerDetails;

  if (
    !address.line1 ||
    !address.city ||
    !address.state ||
    !address.postal_code ||
    !address.country
  ) {
    return null;
  }

  return ShippingAddressSchema.parse({
    line1: address.line1,
    line2: address.line2 ?? undefined,
    city: address.city,
    state: address.state,
    postalCode: address.postal_code,
    country: address.country,
  });
}

/**
 * Convert cents to dollars
 */
export function centsToDollars(cents: number): number {
  return cents / 100;
}

/**
 * Convert dollars to cents
 */
export function dollarsToCents(dollars: number): number {
  return Math.round(dollars * 100);
}
