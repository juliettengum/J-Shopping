import type { CollectionConfig, CollectionSlug } from "payload";
import { slugify } from "@/lib/slugify";

export const Products: CollectionConfig = {
  slug: "products",
  admin: {
    useAsTitle: "name",
    defaultColumns: [
      "bannerImage",
      "name",
      "category",
      "originalPrice",
      "stockQuantity",
      "inStock",
    ],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        // Auto-generate slug from name on create
        if (operation === "create" && data?.name && !data.slug) {
          data.slug = slugify(data.name);
        }
        // Also update slug if name changes and slug wasn't manually set
        if (operation === "update" && data?.name && !data.slug) {
          data.slug = slugify(data.name);
        }
        return data;
      },
    ],
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      maxLength: 255,
      index: true,
    },
    {
      name: "slug",
      type: "text",
      unique: true,
      maxLength: 255,
      index: true,
      admin: {
        position: "sidebar",
        readOnly: true,
        description: "Auto-generated from name",
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            // If no slug provided, generate from name
            if (!value && data?.name) {
              return slugify(data.name);
            }
            return value;
          },
        ],
      },
    },
    {
      name: "description",
      type: "textarea",
      required: true,
    },
    {
      name: "bannerImage",
      type: "upload",
      relationTo: "media",
      required: true,
      admin: {
        description: "Main product image",
      },
    },
    {
      name: "images",
      type: "array",
      label: "Additional Images",
      admin: {
        description: "Gallery images for the product detail page",
      },
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "categories" as CollectionSlug,
      required: true,
      index: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      type: "row",
      fields: [
        {
          name: "originalPrice",
          type: "number",
          required: true,
          min: 0,
          admin: {
            description: "Original price in dollars",
            width: "50%",
          },
        },
        {
          name: "discountedPrice",
          type: "number",
          min: 0,
          admin: {
            description: "Sale price (leave empty if no discount)",
            width: "50%",
          },
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "stockQuantity",
          type: "number",
          required: true,
          defaultValue: 0,
          min: 0,
          admin: {
            width: "50%",
          },
        },
        {
          name: "inStock",
          type: "checkbox",
          defaultValue: true,
          admin: {
            width: "50%",
            description: "Is this product available for purchase?",
          },
        },
      ],
    },
    {
      name: "rating",
      type: "number",
      min: 0,
      max: 5,
      defaultValue: 0,
      admin: {
        description: "Product rating (0-5)",
        position: "sidebar",
      },
    },
  ],
  timestamps: true,
};
