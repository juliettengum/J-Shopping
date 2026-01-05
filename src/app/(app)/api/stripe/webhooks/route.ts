import type { Stripe } from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { db } from "@/db";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";
import { stripe } from "@/lib/stripe";
import {
  SessionMetadataSchema,
  type CompactCartItem,
} from "@/features/stripe/api/schemas";
import {
  generateOrderNumber,
  parseCompactCart,
  extractShippingAddress,
  centsToDollars,
} from "@/features/stripe/api/utils";
import type { Media } from "@/payload-types";

// =============================================================================
// HELPER: EXTRACT IMAGE URL
// =============================================================================

function getImageUrl(media: Media | number | null | undefined): string {
  if (!media) return "";
  if (typeof media === "number") return "";
  return media.url || "";
}

// =============================================================================
// WEBHOOK ROUTE
// =============================================================================

export async function POST(req: NextRequest) {
  // ---------------------------------------------------------------------------
  // 1. SIGNATURE VERIFICATION
  // ---------------------------------------------------------------------------
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    const body = await req.text();
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error(`Webhook signature failed: ${message}`);
    return NextResponse.json({ error: message }, { status: 400 });
  }

  console.log(`Webhook: ${event.type} [${event.id}]`);

  // ---------------------------------------------------------------------------
  // 2. EVENT ROUTING
  // ---------------------------------------------------------------------------
  try {
    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutCompleted(event.data.object);
        break;

      case "checkout.session.expired":
        console.log(`Session expired: ${event.data.object.id}`);
        break;

      default:
        console.log(`Unhandled event: ${event.type}`);
    }

    return NextResponse.json({ message: "Webhook received" }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error(`Webhook error: ${message}`);
    return NextResponse.json({ error: message }, { status: 200 });
  }
}

// =============================================================================
// CHECKOUT COMPLETED HANDLER
// =============================================================================

async function handleCheckoutCompleted(
  session: Stripe.Checkout.Session
): Promise<void> {
  console.log(`Processing: ${session.id}`);

  const payload = await getPayload({ config });

  // ---------------------------------------------------------------------------
  // 3.1 PARSE METADATA
  // ---------------------------------------------------------------------------
  const metadataResult = SessionMetadataSchema.safeParse(session.metadata);

  if (!metadataResult.success) {
    throw new Error(`Invalid metadata: ${metadataResult.error.message}`);
  }

  const { userId, cart: cartJson } = metadataResult.data;

  // ---------------------------------------------------------------------------
  // 3.2 PARSE CART DATA
  // ---------------------------------------------------------------------------
  let cartItems: CompactCartItem[];

  try {
    cartItems = parseCompactCart(cartJson);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Parse error";
    throw new Error(`Invalid cart: ${message}`);
  }

  // ---------------------------------------------------------------------------
  // 3.3 VERIFY USER (Better Auth user - still using Drizzle)
  // ---------------------------------------------------------------------------
  const existingUser = await db.query.user.findFirst({
    where: eq(user.id, userId),
  });

  if (!existingUser) {
    throw new Error(`User not found: ${userId}`);
  }

  // ---------------------------------------------------------------------------
  // 3.4 IDEMPOTENCY CHECK (Using Payload)
  // ---------------------------------------------------------------------------
  const existingOrderResult = await payload.find({
    collection: "orders",
    where: {
      paymentIntentId: { equals: session.id },
    },
    limit: 1,
  });

  if (existingOrderResult.docs.length > 0) {
    console.log(`Order exists: ${existingOrderResult.docs[0].orderNumber}`);
    return;
  }

  // ---------------------------------------------------------------------------
  // 3.5 VERIFY PAYMENT
  // ---------------------------------------------------------------------------
  if (session.payment_status !== "paid") {
    throw new Error(`Payment not completed: ${session.payment_status}`);
  }

  if (!session.amount_total || session.amount_total <= 0) {
    throw new Error("Invalid order amount");
  }

  // ---------------------------------------------------------------------------
  // 3.6 FETCH PRODUCTS FROM PAYLOAD
  // ---------------------------------------------------------------------------
  const productIds = cartItems.map((item) => item.id);
  
  const productRecords = await payload.find({
    collection: "products",
    where: {
      id: { in: productIds },
    },
    limit: productIds.length,
    depth: 1, // Include media relations
  });

  const productMap = new Map(productRecords.docs.map((p) => [p.id, p]));

  // ---------------------------------------------------------------------------
  // 3.7 EXTRACT SHIPPING
  // ---------------------------------------------------------------------------
  const shippingAddress = extractShippingAddress(session.customer_details);
  const totalAmount = centsToDollars(session.amount_total);

  // ---------------------------------------------------------------------------
  // 3.8 CREATE ORDER (Using Payload)
  // ---------------------------------------------------------------------------
  const newOrder = await payload.create({
    collection: "orders",
    data: {
      userId,
      orderNumber: generateOrderNumber(),
      totalAmount,
      status: "processing",
      paymentStatus: "paid",
      paymentIntentId: session.id,
      shippingAddress: shippingAddress || {
        line1: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
      },
    },
  });

  console.log(`Order created: ${newOrder.orderNumber}`);

  // ---------------------------------------------------------------------------
  // 3.9 CREATE ORDER ITEMS + UPDATE STOCK (Using Payload)
  // ---------------------------------------------------------------------------
  for (const item of cartItems) {
    const product = productMap.get(item.id);

    if (!product) {
      console.error(`Product not found: ${item.id}`);
      continue;
    }

    const unitPrice = product.discountedPrice || product.originalPrice;

    if ((product.stockQuantity || 0) < item.qty) {
      console.error(
        `Low stock: ${product.name} (${product.stockQuantity} left)`
      );
    }

    // Create order item
    await payload.create({
      collection: "order-items",
      data: {
        order: newOrder.id,
        product: product.id,
        productName: product.name,
        productImage: getImageUrl(product.bannerImage as Media),
        quantity: item.qty,
        unitPrice,
        subtotal: unitPrice * item.qty,
      },
    });

    // Update product stock
    const newStock = Math.max(0, (product.stockQuantity || 0) - item.qty);
    await payload.update({
      collection: "products",
      id: product.id,
      data: {
        stockQuantity: newStock,
        inStock: newStock > 0,
      },
    });
  }

  console.log(`Order completed: ${newOrder.orderNumber}`);
}
