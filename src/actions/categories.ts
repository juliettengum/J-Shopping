"use server";

import { db } from "@/db";
import { categories, products } from "@/db/schema";
import { eq, sql, desc } from "drizzle-orm";

/**
 * Get all categories
 */
export async function getAllCategories() {
  return await db
    .select({
      id: categories.id,
      name: categories.name,
      slug: categories.slug,
      description: categories.description,
      image: categories.image,
      createdAt: categories.createdAt,
    })
    .from(categories)
    .orderBy(desc(categories.createdAt));
}

/**
 * Get single category by ID
 */
export async function getCategoryById(id: number) {
  const result = await db
    .select({
      id: categories.id,
      name: categories.name,
      slug: categories.slug,
      description: categories.description,
      image: categories.image,
      createdAt: categories.createdAt,
      updatedAt: categories.updatedAt,
    })
    .from(categories)
    .where(eq(categories.id, id))
    .limit(1);

  return result[0] || null;
}

/**
 * Get single category by slug
 */
export async function getCategoryBySlug(slug: string) {
  const result = await db
    .select({
      id: categories.id,
      name: categories.name,
      slug: categories.slug,
      description: categories.description,
      image: categories.image,
      createdAt: categories.createdAt,
      updatedAt: categories.updatedAt,
    })
    .from(categories)
    .where(eq(categories.slug, slug))
    .limit(1);

  return result[0] || null;
}

/**
 * Get all categories with product count
 */
export async function getCategoriesWithProductCount() {
  return await db
    .select({
      id: categories.id,
      name: categories.name,
      slug: categories.slug,
      description: categories.description,
      image: categories.image,
      createdAt: categories.createdAt,
      productCount: sql<number>`cast(count(${products.id}) as int)`,
    })
    .from(categories)
    .leftJoin(products, eq(categories.id, products.categoryId))
    .groupBy(categories.id)
    .orderBy(desc(categories.createdAt));
}

/**
 * Get category with its products
 */
export async function getCategoryWithProducts(slug: string) {
  // First get the category
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return null;
  }

  // Then get its products
  const categoryProducts = await db
    .select({
      id: products.id,
      name: products.name,
      slug: products.slug,
      description: products.description,
      bannerImage: products.bannerImage,
      images: products.images,
      categoryId: products.categoryId,
      originalPrice: products.originalPrice,
      discountedPrice: products.discountedPrice,
      stockQuantity: products.stockQuantity,
      inStock: products.inStock,
      rating: products.rating,
      createdAt: products.createdAt,
    })
    .from(products)
    .where(eq(products.categoryId, category.id))
    .orderBy(desc(products.createdAt));

  return {
    category,
    products: categoryProducts,
  };
}
