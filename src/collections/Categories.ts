import type { CollectionConfig } from "payload";
import { slugify } from "@/lib/slugify";

export const Categories: CollectionConfig = {
  slug: "categories",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["image", "name", "slug", "createdAt"],
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
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      admin: {
        description: "Category image",
      },
    },
  ],
  timestamps: true,
};
