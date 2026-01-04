"use server";

import { db } from "@/db";
import { products, categories } from "@/db/schema";
import { eq, and, desc } from "drizzle-orm";

/**
 * Get all products
 */
export async function getAllProducts() {
  return await db
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
      category: {
        id: categories.id,
        name: categories.name,
        slug: categories.slug,
      },
    })
    .from(products)
    .leftJoin(categories, eq(products.categoryId, categories.id))
    .orderBy(desc(products.createdAt));
}

/**
 * Get single product by ID
 */
export async function getProductById(id: number) {
  const result = await db
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
      updatedAt: products.updatedAt,
      category: {
        id: categories.id,
        name: categories.name,
        slug: categories.slug,
      },
    })
    .from(products)
    .leftJoin(categories, eq(products.categoryId, categories.id))
    .where(eq(products.id, id))
    .limit(1);

  return result[0] || null;
}

/**
 * Get single product by slug
 */
export async function getProductBySlug(slug: string) {
  const result = await db
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
      updatedAt: products.updatedAt,
      category: {
        id: categories.id,
        name: categories.name,
        slug: categories.slug,
      },
    })
    .from(products)
    .leftJoin(categories, eq(products.categoryId, categories.id))
    .where(eq(products.slug, slug))
    .limit(1);

  return result[0] || null;
}

/**
 * Get products by category ID
 */
export async function getProductsByCategoryId(categoryId: number) {
  return await db
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
    .where(eq(products.categoryId, categoryId))
    .orderBy(desc(products.createdAt));
}

/**
 * Get products by category slug
 */
export async function getProductsByCategorySlug(categorySlug: string) {
  return await db
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
      category: {
        id: categories.id,
        name: categories.name,
        slug: categories.slug,
      },
    })
    .from(products)
    .leftJoin(categories, eq(products.categoryId, categories.id))
    .where(eq(categories.slug, categorySlug))
    .orderBy(desc(products.createdAt));
}

/**
 * Get products that are in stock
 */
export async function getInStockProducts() {
  return await db
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
    .where(eq(products.inStock, true))
    .orderBy(desc(products.createdAt));
}

/**
 * Get featured/popular products (e.g., highest rated, limited to 10)
 */
export async function getFeaturedProducts(limit: number = 10) {
  return await db
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
      category: {
        id: categories.id,
        name: categories.name,
        slug: categories.slug,
      },
    })
    .from(products)
    .leftJoin(categories, eq(products.categoryId, categories.id))
    .where(eq(products.inStock, true))
    .orderBy(desc(products.rating))
    .limit(limit);
}


