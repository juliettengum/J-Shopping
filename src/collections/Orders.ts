import type { CollectionConfig } from "payload";

export const Orders: CollectionConfig = {
  slug: "orders",
  admin: {
    useAsTitle: "orderNumber",
    defaultColumns: ["orderNumber", "userId", "totalAmount", "status", "paymentStatus", "createdAt"],
  },
  access: {
    // Users can only read their own orders
    read: ({ req: { user } }) => {
      if (!user) return false;
      return {
        userId: { equals: user.id },
      };
    },
    // Only system/admin can create orders (via webhook)
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: "userId",
      type: "text",
      required: true,
      index: true,
      admin: {
        description: "Better-auth user ID",
      },
    },
    {
      name: "orderNumber",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: "totalAmount",
      type: "number",
      required: true,
      min: 0,
      admin: {
        description: "Total order amount in dollars",
      },
    },
    {
      type: "row",
      fields: [
        {
          name: "status",
          type: "select",
          required: true,
          defaultValue: "pending",
          options: [
            { label: "Pending", value: "pending" },
            { label: "Processing", value: "processing" },
            { label: "Completed", value: "completed" },
            { label: "Cancelled", value: "cancelled" },
          ],
          index: true,
          admin: {
            width: "50%",
          },
        },
        {
          name: "paymentStatus",
          type: "select",
          required: true,
          defaultValue: "unpaid",
          options: [
            { label: "Unpaid", value: "unpaid" },
            { label: "Paid", value: "paid" },
            { label: "Refunded", value: "refunded" },
            { label: "Failed", value: "failed" },
          ],
          index: true,
          admin: {
            width: "50%",
          },
        },
      ],
    },
    {
      name: "paymentIntentId",
      type: "text",
      admin: {
        description: "Stripe session/payment ID",
        readOnly: true,
      },
    },
    {
      name: "shippingAddress",
      type: "group",
      fields: [
        {
          name: "line1",
          type: "text",
          required: true,
        },
        {
          name: "line2",
          type: "text",
        },
        {
          type: "row",
          fields: [
            {
              name: "city",
              type: "text",
              required: true,
              admin: { width: "50%" },
            },
            {
              name: "state",
              type: "text",
              required: true,
              admin: { width: "50%" },
            },
          ],
        },
        {
          type: "row",
          fields: [
            {
              name: "postalCode",
              type: "text",
              required: true,
              admin: { width: "50%" },
            },
            {
              name: "country",
              type: "text",
              required: true,
              admin: { width: "50%" },
            },
          ],
        },
      ],
    },
  ],
  timestamps: true,
};


