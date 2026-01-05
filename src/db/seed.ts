import { getPayload } from "payload";
import config from "@payload-config";
import { productCategories } from "@/data/categories";
import { allProducts } from "@/data/products";
import path from "path";
import fs from "fs";
import os from "os";

// =============================================================================
// IMAGE DOWNLOAD UTILITY
// =============================================================================

async function downloadImage(url: string): Promise<{ buffer: Buffer; filename: string; mimeType: string }> {
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Failed to download: ${url}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  const urlPath = new URL(url).pathname;
  const filename = path.basename(urlPath);
  
  // Determine mime type from extension
  const ext = path.extname(filename).toLowerCase();
  const mimeTypes: Record<string, string> = {
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".webp": "image/webp",
    ".gif": "image/gif",
  };
  
  const mimeType = mimeTypes[ext] || "image/png";
  
  return { buffer, filename, mimeType };
}

// =============================================================================
// MEDIA UPLOAD WITH CACHE
// =============================================================================

const mediaCache = new Map<string, number>();

async function uploadOrGetMedia(
  payload: Awaited<ReturnType<typeof getPayload>>,
  imageUrl: string,
  altText: string
): Promise<number> {
  // Check cache first
  if (mediaCache.has(imageUrl)) {
    return mediaCache.get(imageUrl)!;
  }

  // Download and upload
  const { buffer, filename, mimeType } = await downloadImage(imageUrl);
  
  // Create temp file
  const tempDir = os.tmpdir();
  const tempPath = path.join(tempDir, `payload-${Date.now()}-${filename}`);
  fs.writeFileSync(tempPath, buffer);

  try {
    const media = await payload.create({
      collection: "media",
      data: {
        alt: altText,
      },
      filePath: tempPath,
    });

    // Cache the result
    mediaCache.set(imageUrl, media.id as number);
    
    return media.id as number;
  } finally {
    // Cleanup temp file
    if (fs.existsSync(tempPath)) {
      fs.unlinkSync(tempPath);
    }
  }
}

// =============================================================================
// SEED FUNCTION
// =============================================================================

async function seed() {
  console.log("🌱 Starting database seed with Payload...\n");

  try {
    const payload = await getPayload({ config });

    // -------------------------------------------------------------------------
    // STEP 1: CLEAR EXISTING DATA
    // -------------------------------------------------------------------------
    console.log("🗑️  Clearing existing data...");

    // Delete order items first (due to relations)
    const existingOrderItems = await payload.find({
      collection: "order-items",
      limit: 1000,
    });
    for (const item of existingOrderItems.docs) {
      await payload.delete({ collection: "order-items", id: item.id });
    }
    console.log(`   ✓ Deleted ${existingOrderItems.docs.length} order items`);

    // Delete orders
    const existingOrders = await payload.find({
      collection: "orders",
      limit: 1000,
    });
    for (const order of existingOrders.docs) {
      await payload.delete({ collection: "orders", id: order.id });
    }
    console.log(`   ✓ Deleted ${existingOrders.docs.length} orders`);

    // Delete products
    const existingProducts = await payload.find({
      collection: "products",
      limit: 1000,
    });
    for (const product of existingProducts.docs) {
      await payload.delete({ collection: "products", id: product.id });
    }
    console.log(`   ✓ Deleted ${existingProducts.docs.length} products`);

    // Delete categories
    const existingCategories = await payload.find({
      collection: "categories",
      limit: 100,
    });
    for (const category of existingCategories.docs) {
      await payload.delete({ collection: "categories", id: category.id });
    }
    console.log(`   ✓ Deleted ${existingCategories.docs.length} categories`);

    // Delete all media
    const existingMedia = await payload.find({
      collection: "media",
      limit: 1000,
    });
    for (const media of existingMedia.docs) {
      await payload.delete({ collection: "media", id: media.id });
    }
    console.log(`   ✓ Deleted ${existingMedia.docs.length} media files`);

    console.log("✅ Existing data cleared\n");

    // -------------------------------------------------------------------------
    // STEP 2: SEED CATEGORIES
    // -------------------------------------------------------------------------
    console.log("📁 Seeding categories...");
    const categoryMap = new Map<string, number>();

    for (const category of productCategories) {
      console.log(`   Uploading image for: ${category.title}...`);
      
      // Upload category image
      const imageId = await uploadOrGetMedia(
        payload,
        category.img,
        `${category.title} category image`
      );

      const createdCategory = await payload.create({
        collection: "categories",
        data: {
          name: category.title,
          slug: category.slug,
          description: `Shop ${category.title.toLowerCase()} with up to ${category.discountNumber}% off. Browse through ${category.productNumber}+ products.`,
          image: imageId,
        },
      });

      categoryMap.set(category.slug, createdCategory.id as number);
      console.log(`   ✓ ${category.title} (ID: ${createdCategory.id})`);
    }

    console.log(`\n✅ Seeded ${categoryMap.size} categories\n`);

    // -------------------------------------------------------------------------
    // STEP 3: SEED PRODUCTS
    // -------------------------------------------------------------------------
    console.log("📦 Seeding products...");
    let seededCount = 0;

    for (const product of allProducts) {
      const categoryId = categoryMap.get(product.category);

      if (!categoryId) {
        console.warn(`   ⚠️  Skipping "${product.name}" - category "${product.category}" not found`);
        continue;
      }

      console.log(`   Uploading images for: ${product.name}...`);

      // Upload banner image
      const bannerImageId = await uploadOrGetMedia(
        payload,
        product.bannerImage,
        `${product.name} main image`
      );

      // Upload additional images (skip if same as banner)
      const additionalImages: { image: number }[] = [];
      for (let i = 0; i < product.images.length; i++) {
        const imgUrl = product.images[i];
        // Skip if it's the same as banner image
        if (imgUrl === product.bannerImage) continue;
        
        const imageId = await uploadOrGetMedia(
          payload,
          imgUrl,
          `${product.name} gallery image ${i + 1}`
        );
        additionalImages.push({ image: imageId });
      }

      await payload.create({
        collection: "products",
        data: {
          name: product.name,
          slug: product.slug,
          description: product.description,
          bannerImage: bannerImageId,
          images: additionalImages.length > 0 ? additionalImages : undefined,
          category: categoryId,
          originalPrice: product.originalPrice,
          discountedPrice: product.discountedPrice || undefined,
          stockQuantity: product.stockQuantity,
          inStock: product.inStock,
          rating: product.rating,
        },
      });

      seededCount++;
      console.log(`   ✓ ${product.name}`);
    }

    console.log(`\n✅ Seeded ${seededCount} products`);

    // -------------------------------------------------------------------------
    // SUMMARY
    // -------------------------------------------------------------------------
    console.log("\n" + "=".repeat(50));
    console.log("🎉 Database seeding completed successfully!");
    console.log("=".repeat(50));
    console.log(`📷 Media files: ${mediaCache.size}`);
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
