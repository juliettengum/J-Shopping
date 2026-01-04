import { db } from "./index";
import { categories, products } from "./schema";
import { productCategories } from "@/data/categories";
import { allProducts } from "@/data/products";
import { eq } from "drizzle-orm";

async function seed() {
  console.log("🌱 Starting database seed...");

  try {
    // Clear existing data (in correct order due to foreign keys)
    console.log("🗑️  Clearing existing data...");
    await db.delete(products);
    await db.delete(categories);
    console.log("✅ Existing data cleared");

    // Seed Categories
    console.log("\n📁 Seeding categories...");
    const categoryMap = new Map<string, number>();

    for (const category of productCategories) {
      const [insertedCategory] = await db
        .insert(categories)
        .values({
          name: category.title,
          slug: category.slug,
          description: `Shop ${category.title.toLowerCase()} with up to ${
            category.discountNumber
          }% off. Browse through ${category.productNumber}+ products.`,
          image: category.img,
        })
        .returning();

      categoryMap.set(category.slug, insertedCategory.id);
      console.log(`  ✓ ${category.title} (ID: ${insertedCategory.id})`);
    }

    console.log(`\n✅ Seeded ${categoryMap.size} categories`);

    // Seed Products
    console.log("\n📦 Seeding products...");
    let seededCount = 0;

    for (const product of allProducts) {
      // Get category ID from map
      const categoryId = categoryMap.get(product.category);

      if (!categoryId) {
        console.warn(
          `  ⚠️  Skipping "${product.name}" - category "${product.category}" not found`
        );
        continue;
      }

      await db.insert(products).values({
        name: product.name,
        slug: product.slug,
        description: product.description,
        bannerImage: product.bannerImage,
        images: product.images,
        categoryId: categoryId,
        originalPrice: product.originalPrice.toString(),
        discountedPrice: product.discountedPrice?.toString() || null,
        stockQuantity: product.stockQuantity,
        inStock: product.inStock,
        rating: product.rating.toString(),
      });

      seededCount++;
      console.log(`  ✓ ${product.name} (${product.category})`);
    }

    console.log(`\n✅ Seeded ${seededCount} products`);

    // Summary
    console.log("\n" + "=".repeat(50));
    console.log("🎉 Database seeding completed successfully!");
    console.log("=".repeat(50));
    console.log(`📁 Categories: ${categoryMap.size}`);
    console.log(`📦 Products: ${seededCount}`);
    console.log("=".repeat(50) + "\n");

    process.exit(0);
  } catch (error) {
    console.error("\n❌ Error seeding database:", error);
    process.exit(1);
  }
}

// Run the seed function
seed();

