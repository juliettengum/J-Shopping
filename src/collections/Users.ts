import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
    defaultColumns: ["email", "name", "role", "createdAt"],
  },
  auth: true,
  access: {
    // Only logged-in admins can read users list
    read: ({ req: { user } }) => !!user,
    // Only admins can create new admin users
    create: ({ req: { user } }) => !!user,
    // Only admins can update users
    update: ({ req: { user } }) => !!user,
    // Only admins can delete users
    delete: ({ req: { user } }) => !!user,
    // Disable public signup - this is the key setting
    admin: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "role",
      type: "select",
      defaultValue: "admin",
      options: [
        { label: "Admin", value: "admin" },
        { label: "Editor", value: "editor" },
      ],
      admin: {
        position: "sidebar",
      },
    },
  ],
};
