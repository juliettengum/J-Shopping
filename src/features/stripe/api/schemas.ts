import { z } from "zod";

// Cart item schema for checkout
export const CartItemSchema = z.object({
  productId: z.number().int().positive(),
  name: z.string().min(1),
  image: z.string().min(1), // Can be relative path or full URL
  price: z.number().positive(),
  quantity: z.number().int().positive(),
});

export const CartItemsSchema = z.array(CartItemSchema).min(1);

// Shipping address schema
export const ShippingAddressSchema = z.object({
  line1: z.string().min(1),
  line2: z.string().optional(),
  city: z.string().min(1),
  state: z.string().min(1),
  postalCode: z.string().min(1),
  country: z.string().min(1),
});

// Session metadata schema (compact format)
export const SessionMetadataSchema = z.object({
  userId: z.string().min(1),
  cart: z.string().min(1), // JSON: [{id: number, qty: number}]
});

// Compact cart item schema (for metadata)
export const CompactCartItemSchema = z.object({
  id: z.number().int().positive(),
  qty: z.number().int().positive(),
});

export const CompactCartSchema = z.array(CompactCartItemSchema).min(1);

export type CompactCartItem = z.infer<typeof CompactCartItemSchema>;

// Types
export type CartItem = z.infer<typeof CartItemSchema>;
export type ShippingAddress = z.infer<typeof ShippingAddressSchema>;
export type SessionMetadata = z.infer<typeof SessionMetadataSchema>;
