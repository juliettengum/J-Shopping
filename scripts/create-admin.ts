import { getPayload } from "payload";
import config from "@payload-config";

async function createAdmin() {
  // Get admin credentials from environment or use defaults for initial setup
  const email = process.env.ADMIN_EMAIL || "admin@jshopping.com";
  const password = process.env.ADMIN_PASSWORD || "AdminAtJshopping.123";
  const name = process.env.ADMIN_NAME || "Admin User";

  console.log("🔐 Creating admin user...\n");

  try {
    const payload = await getPayload({ config });

    // Check if admin already exists
    const existingUser = await payload.find({
      collection: "users",
      where: {
        email: { equals: email },
      },
      limit: 1,
    });

    if (existingUser.docs.length > 0) {
      console.log(`⚠️  Admin user already exists: ${email}`);
      console.log("   Use the existing credentials to log in.\n");
      process.exit(0);
    }

    // Create admin user
    await payload.create({
      collection: "users",
      data: {
        email,
        password,
        name,
        role: "admin",
      } as any, // Type assertion needed until payload-types.ts is regenerated
    });

    console.log("✅ Admin user created successfully!\n");
    console.log("=".repeat(50));
    console.log("📧 Email:", email);
    console.log("🔑 Password:", password);
    console.log("=".repeat(50));
    console.log("\n⚠️  IMPORTANT: Change the password after first login!");
    console.log("   Go to: /admin → Profile → Change Password\n");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error creating admin:", error);
    process.exit(1);
  }
}

createAdmin();
