import type { CollectionConfig } from "payload";

export const OrderItems: CollectionConfig = {
  slug: "order-items",
  admin: {
    useAsTitle: "productName",
    defaultColumns: ["productName", "order", "quantity", "unitPrice", "subtotal"],
  },
  access: {
    read: ({ req: { user } }) => !!user,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: "order",
      type: "relationship",
      relationTo: "orders",
      required: true,
      index: true,
      admin: {
        description: "Parent order",
      },
    },
    {
      name: "product",
      type: "relationship",
      relationTo: "products",
      required: true,
      index: true,
    },
    // Snapshot data at time of order (in case product changes later)
    {
      name: "productName",
      type: "text",
      required: true,
      maxLength: 255,
      admin: {
        description: "Product name at time of purchase",
      },
    },
    {
      name: "productImage",
      type: "text",
      required: true,
      admin: {
        description: "Product image URL at time of purchase",
      },
    },
    {
      type: "row",
      fields: [
        {
          name: "quantity",
          type: "number",
          required: true,
          min: 1,
          admin: { width: "33%" },
        },
        {
          name: "unitPrice",
          type: "number",
          required: true,
          min: 0,
          admin: {
            description: "Price per unit in dollars",
            width: "33%",
          },
        },
        {
          name: "subtotal",
          type: "number",
          required: true,
          min: 0,
          admin: {
            description: "quantity × unitPrice",
            width: "33%",
          },
        },
      ],
    },
  ],
  timestamps: true,
};


