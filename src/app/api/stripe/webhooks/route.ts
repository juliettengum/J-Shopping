import type { Stripe } from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { orders, orderItems, products, user } from "@/db/schema";
import { eq, sql, inArray } from "drizzle-orm";
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
  // 3.3 VERIFY USER
  // ---------------------------------------------------------------------------
  const existingUser = await db.query.user.findFirst({
    where: eq(user.id, userId),
  });

  if (!existingUser) {
    throw new Error(`User not found: ${userId}`);
  }

  // ---------------------------------------------------------------------------
  // 3.4 IDEMPOTENCY CHECK
  // ---------------------------------------------------------------------------
  const existingOrder = await db.query.orders.findFirst({
    where: eq(orders.paymentIntentId, session.id),
  });

  if (existingOrder) {
    console.log(`Order exists: ${existingOrder.orderNumber}`);
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
  // 3.6 FETCH PRODUCTS FROM DATABASE
  // ---------------------------------------------------------------------------
  const productIds = cartItems.map((item) => item.id);
  const productRecords = await db.query.products.findMany({
    where: inArray(products.id, productIds),
  });

  const productMap = new Map(productRecords.map((p) => [p.id, p]));

  // ---------------------------------------------------------------------------
  // 3.7 EXTRACT SHIPPING
  // ---------------------------------------------------------------------------
  const shippingAddress = extractShippingAddress(session.customer_details);
  const totalAmount = centsToDollars(session.amount_total);

  // ---------------------------------------------------------------------------
  // 3.8 CREATE ORDER
  // ---------------------------------------------------------------------------
  const [newOrder] = await db
    .insert(orders)
    .values({
      userId,
      orderNumber: generateOrderNumber(),
      totalAmount: totalAmount.toFixed(2),
      status: "processing",
      paymentStatus: "paid",
      paymentIntentId: session.id,
      shippingAddress,
    })
    .returning();

  console.log(`Order created: ${newOrder.orderNumber}`);

  // ---------------------------------------------------------------------------
  // 3.9 CREATE ORDER ITEMS + UPDATE STOCK
  // ---------------------------------------------------------------------------
  for (const item of cartItems) {
    const product = productMap.get(item.id);

    if (!product) {
      console.error(`Product not found: ${item.id}`);
      continue;
    }

    const unitPrice = product.discountedPrice
      ? parseFloat(product.discountedPrice)
      : parseFloat(product.originalPrice);

    if (product.stockQuantity < item.qty) {
      console.error(
        `Low stock: ${product.name} (${product.stockQuantity} left)`
      );
    }

    await db.insert(orderItems).values({
      orderId: newOrder.id,
      productId: product.id,
      productName: product.name,
      productImage: product.bannerImage,
      quantity: item.qty,
      unitPrice: unitPrice.toFixed(2),
      subtotal: (unitPrice * item.qty).toFixed(2),
    });

    await db
      .update(products)
      .set({
        stockQuantity: sql`GREATEST(${products.stockQuantity} - ${item.qty}, 0)`,
      })
      .where(eq(products.id, product.id));
  }

  console.log(`Order completed: ${newOrder.orderNumber}`);
}
