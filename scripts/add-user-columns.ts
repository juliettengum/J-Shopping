import { neon } from "@neondatabase/serverless";

async function addUserColumns() {
  const databaseUrl = process.env.DATABASE_URL;
  
  if (!databaseUrl) {
    console.error("❌ DATABASE_URL not found in environment");
    process.exit(1);
  }

  const sql = neon(databaseUrl);

  console.log("🔧 Adding columns to Payload users table...\n");

  try {
    // Add name column if not exists
    await sql`
      ALTER TABLE "users" 
      ADD COLUMN IF NOT EXISTS "name" text
    `;
    console.log("  ✓ name column");

    // Add role column if not exists
    await sql`
      ALTER TABLE "users" 
      ADD COLUMN IF NOT EXISTS "role" text DEFAULT 'admin'
    `;
    console.log("  ✓ role column");

    console.log("\n✅ Columns added successfully!");
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }

  process.exit(0);
}

addUserColumns();

