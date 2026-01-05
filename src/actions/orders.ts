"use server";

import { headers } from "next/headers";
import { getPayload } from "payload";
import config from "@payload-config";
import { auth } from "@/lib/auth";

export async function getOrders() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return [];
  }

  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: "orders",
    where: {
      userId: { equals: session.user.id },
    },
    sort: "-createdAt",
    limit: 100,
  });

  return result.docs.map((order) => ({
    id: order.id,
    userId: order.userId,
    orderNumber: order.orderNumber,
    totalAmount: String(order.totalAmount),
    status: order.status,
    paymentStatus: order.paymentStatus,
    paymentIntentId: order.paymentIntentId,
    shippingAddress: order.shippingAddress,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
  }));
}

export async function getOrderByNumber(orderNumber: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return null;
  }

  const payload = await getPayload({ config });

  const orderResult = await payload.find({
    collection: "orders",
    where: {
      orderNumber: { equals: orderNumber },
    },
    limit: 1,
  });

  if (orderResult.docs.length === 0) return null;

  const order = orderResult.docs[0];

  // Verify the order belongs to the current user
  if (order.userId !== session.user.id) {
    return null;
  }

  // Get order items
  const itemsResult = await payload.find({
    collection: "order-items",
    where: {
      order: { equals: order.id },
    },
    depth: 1,
    limit: 100,
  });

  return {
    id: order.id,
    userId: order.userId,
    orderNumber: order.orderNumber,
    totalAmount: String(order.totalAmount),
    status: order.status,
    paymentStatus: order.paymentStatus,
    paymentIntentId: order.paymentIntentId,
    shippingAddress: order.shippingAddress,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
    items: itemsResult.docs.map((item) => ({
      id: item.id,
      orderId: typeof item.order === "number" ? item.order : item.order?.id,
      productId: typeof item.product === "number" ? item.product : item.product?.id,
      productName: item.productName,
      productImage: item.productImage,
      quantity: item.quantity,
      unitPrice: String(item.unitPrice),
      subtotal: String(item.subtotal),
      createdAt: item.createdAt,
    })),
  };
}

export async function getOrdersWithItems() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return [];
  }

  const payload = await getPayload({ config });

  const ordersResult = await payload.find({
    collection: "orders",
    where: {
      userId: { equals: session.user.id },
    },
    sort: "-createdAt",
    limit: 100,
  });

  // Get items for all orders
  const ordersWithItems = await Promise.all(
    ordersResult.docs.map(async (order) => {
      const itemsResult = await payload.find({
        collection: "order-items",
        where: {
          order: { equals: order.id },
        },
        limit: 100,
      });

      return {
        id: order.id,
        userId: order.userId,
        orderNumber: order.orderNumber,
        totalAmount: String(order.totalAmount),
        status: order.status,
        paymentStatus: order.paymentStatus,
        paymentIntentId: order.paymentIntentId,
        shippingAddress: order.shippingAddress,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
        items: itemsResult.docs.map((item) => ({
          id: item.id,
          orderId: typeof item.order === "number" ? item.order : item.order?.id,
          productId: typeof item.product === "number" ? item.product : item.product?.id,
          productName: item.productName,
          productImage: item.productImage,
          quantity: item.quantity,
          unitPrice: String(item.unitPrice),
          subtotal: String(item.subtotal),
          createdAt: item.createdAt,
        })),
      };
    })
  );

  return ordersWithItems;
}
