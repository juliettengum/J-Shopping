"use server";

import { getPayload } from "payload";
import config from "@payload-config";
import type { Media, Category, Product } from "@/payload-types";

// =============================================================================
// HELPER: EXTRACT IMAGE URL FROM MEDIA
// =============================================================================

function getImageUrl(media: Media | number | null | undefined): string | null {
  if (!media) return null;
  if (typeof media === "number") return null; // Not populated
  return media.url || null;
}

function getProductImageUrl(bannerImage: Product["bannerImage"]): string | null {
  if (!bannerImage) return null;
  if (typeof bannerImage === "number") return null;
  return bannerImage.url || null;
}

function getProductImagesUrls(images: Product["images"]): string[] {
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
// HELPER: FORMAT CATEGORY FOR FRONTEND
// =============================================================================

function formatCategory(category: Category) {
  return {
    id: category.id,
    name: category.name,
    slug: category.slug,
    description: category.description,
    image: getImageUrl(category.image as Media),
    createdAt: category.createdAt,
    updatedAt: category.updatedAt,
  };
}

// =============================================================================
// CATEGORY QUERIES
// =============================================================================

/**
 * Get all categories
 */
export async function getAllCategories() {
  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: "categories",
    sort: "-createdAt",
    limit: 100,
    depth: 1, // Include media relation
  });

  return result.docs.map(formatCategory);
}

/**
 * Get single category by ID
 */
export async function getCategoryById(id: number) {
  const payload = await getPayload({ config });

  try {
    const category = await payload.findByID({
      collection: "categories",
      id,
      depth: 1,
    });

    return formatCategory(category);
  } catch {
    return null;
  }
}

/**
 * Get single category by slug
 */
export async function getCategoryBySlug(slug: string) {
  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: "categories",
    where: {
      slug: { equals: slug },
    },
    limit: 1,
    depth: 1,
  });

  if (result.docs.length === 0) return null;

  return formatCategory(result.docs[0]);
}

/**
 * Get all categories with product count
 */
export async function getCategoriesWithProductCount() {
  const payload = await getPayload({ config });

  const categories = await payload.find({
    collection: "categories",
    sort: "-createdAt",
    limit: 100,
    depth: 1,
  });

  const categoriesWithCounts = await Promise.all(
    categories.docs.map(async (cat) => {
      const products = await payload.find({
        collection: "products",
        where: {
          category: { equals: cat.id },
        },
        limit: 0,
      });

      return {
        ...formatCategory(cat),
        productCount: products.totalDocs,
      };
    })
  );

  return categoriesWithCounts;
}

/**
 * Get category with its products
 */
export async function getCategoryWithProducts(slug: string) {
  const payload = await getPayload({ config });

  const categoryResult = await payload.find({
    collection: "categories",
    where: {
      slug: { equals: slug },
    },
    limit: 1,
    depth: 1,
  });

  if (categoryResult.docs.length === 0) return null;

  const category = categoryResult.docs[0];

  const productsResult = await payload.find({
    collection: "products",
    where: {
      category: { equals: category.id },
    },
    sort: "-createdAt",
    limit: 100,
    depth: 2,
  });

  return {
    category: formatCategory(category),
    products: productsResult.docs.map((product) => {
      const cat = product.category as Category | null;
      
      return {
        id: product.id,
        name: product.name,
        slug: product.slug,
        description: product.description,
        bannerImage: getProductImageUrl(product.bannerImage),
        images: getProductImagesUrls(product.images),
        categoryId: cat?.id || null,
        originalPrice: String(product.originalPrice),
        discountedPrice: product.discountedPrice ? String(product.discountedPrice) : null,
        stockQuantity: product.stockQuantity,
        inStock: product.inStock,
        rating: String(product.rating || 0),
        createdAt: product.createdAt,
      };
    }),
  };
}
