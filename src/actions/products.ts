"use server";

import { getPayload } from "payload";
import config from "@payload-config";
import type { Media, Product, Category } from "@/payload-types";

// =============================================================================
// HELPER: EXTRACT IMAGE URL FROM MEDIA
// =============================================================================

function getImageUrl(media: Media | number | null | undefined): string | null {
  if (!media) return null;
  if (typeof media === "number") return null; // Not populated
  return media.url || null;
}

function getImagesUrls(images: Product["images"]): string[] {
  if (!images || !Array.isArray(images)) return [];
  
  return images
    .map((item) => {
      const media = item.image;
      if (!media || typeof media === "number") return null;
      return media.url || null;
    })
    .filter((url): url is string => url !== null);
}

// =============================================================================
// HELPER: FORMAT PRODUCT FOR FRONTEND
// =============================================================================

function formatProduct(product: Product) {
  const category = product.category as Category | null;
  
  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    description: product.description,
    bannerImage: getImageUrl(product.bannerImage as Media),
    images: getImagesUrls(product.images),
    categoryId: category?.id || null,
    originalPrice: String(product.originalPrice),
    discountedPrice: product.discountedPrice ? String(product.discountedPrice) : null,
    stockQuantity: product.stockQuantity,
    inStock: product.inStock,
    rating: String(product.rating || 0),
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
    category: category
      ? {
          id: category.id,
          name: category.name,
          slug: category.slug,
        }
      : null,
  };
}

// =============================================================================
// PRODUCT QUERIES
// =============================================================================

/**
 * Get all products
 */
export async function getAllProducts() {
  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: "products",
    sort: "-createdAt",
    limit: 100,
    depth: 2, // Include category and media relations
  });

  return result.docs.map((p) => formatProduct(p as Product));
}

/**
 * Get single product by ID
 */
export async function getProductById(id: number) {
  const payload = await getPayload({ config });

  try {
    const product = await payload.findByID({
      collection: "products",
      id,
      depth: 2,
    });

    return formatProduct(product as Product);
  } catch {
    return null;
  }
}

/**
 * Get single product by slug
 */
export async function getProductBySlug(slug: string) {
  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: "products",
    where: {
      slug: { equals: slug },
    },
    limit: 1,
    depth: 2,
  });

  if (result.docs.length === 0) return null;

  return formatProduct(result.docs[0] as Product);
}

/**
 * Get products by category ID
 */
export async function getProductsByCategoryId(categoryId: number) {
  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: "products",
    where: {
      category: { equals: categoryId },
    },
    sort: "-createdAt",
    limit: 100,
    depth: 2,
  });

  return result.docs.map((p) => formatProduct(p as Product));
}

/**
 * Get products by category slug
 */
export async function getProductsByCategorySlug(categorySlug: string) {
  const payload = await getPayload({ config });

  const categoryResult = await payload.find({
    collection: "categories",
    where: {
      slug: { equals: categorySlug },
    },
    limit: 1,
  });

  if (categoryResult.docs.length === 0) return [];

  const categoryId = categoryResult.docs[0].id;

  const result = await payload.find({
    collection: "products",
    where: {
      category: { equals: categoryId },
    },
    sort: "-createdAt",
    limit: 100,
    depth: 2,
  });

  return result.docs.map((p) => formatProduct(p as Product));
}

/**
 * Get products that are in stock
 */
export async function getInStockProducts() {
  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: "products",
    where: {
      inStock: { equals: true },
    },
    sort: "-createdAt",
    limit: 100,
    depth: 2,
  });

  return result.docs.map((p) => formatProduct(p as Product));
}

/**
 * Get featured/popular products (e.g., highest rated, limited to 10)
 */
export async function getFeaturedProducts(limit: number = 10) {
  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: "products",
    where: {
      inStock: { equals: true },
    },
    sort: "-rating",
    limit,
    depth: 2,
  });

  return result.docs.map((p) => formatProduct(p as Product));
}

/**
 * Get multiple products by IDs (for cart/checkout)
 */
export async function getProductsByIds(ids: number[]) {
  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: "products",
    where: {
      id: { in: ids },
    },
    limit: ids.length,
    depth: 2,
  });

  return result.docs.map((p) => formatProduct(p as Product));
}

/**
 * Update product stock (used by webhook)
 */
export async function updateProductStock(productId: number, quantityToDeduct: number) {
  const payload = await getPayload({ config });

  const product = await payload.findByID({
    collection: "products",
    id: productId,
  });

  const newStock = Math.max(0, (product.stockQuantity || 0) - quantityToDeduct);

  await payload.update({
    collection: "products",
    id: productId,
    data: {
      stockQuantity: newStock,
      inStock: newStock > 0,
    },
  });
}
