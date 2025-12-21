"use client";

import Link from "next/link";
import { HeartIcon, StarIcon, ShoppingCart, Search } from "lucide-react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Product type for this page
type ProductItem = {
  id: number;
  productSrc: string;
  productAlt: string;
  productLink: string;
  name: string;
  rating: number;
  discountedPrice?: number;
  originalPrice: number;
};

// Mock product data (will be replaced with real data later)
const allProducts: ProductItem[] = [
  {
    id: 1,
    productSrc:
      "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-35.png",
    productAlt: "summer dress",
    productLink: "/products/1",
    name: "Summer Dress",
    rating: 4.1,
    discountedPrice: 80,
    originalPrice: 129,
  },
  {
    id: 2,
    productSrc:
      "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-6.png",
    productAlt: "Samsung Galaxy Watch 6",
    productLink: "/products/2",
    name: "Samsung Galaxy Watch 6 Classic",
    rating: 4.7,
    originalPrice: 129,
  },
  {
    id: 3,
    productSrc:
      "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-34.png",
    productAlt: "formal shirt",
    productLink: "/products/3",
    name: "Formal Shirt",
    rating: 4.8,
    discountedPrice: 52,
    originalPrice: 80,
  },
  {
    id: 4,
    productSrc:
      "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-5.png",
    productAlt: "Samsung Galaxy Watch 7",
    productLink: "/products/4",
    name: "Samsung Galaxy Watch 7",
    rating: 4.9,
    discountedPrice: 139,
    originalPrice: 229,
  },
  {
    id: 5,
    productSrc:
      "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-33.png",
    productAlt: "denim t-shirt",
    productLink: "/products/5",
    name: "Denim T-shirt",
    rating: 5.0,
    originalPrice: 85,
  },
  {
    id: 6,
    productSrc:
      "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-4.png",
    productAlt: "Samsung Galaxy Watch Ultra",
    productLink: "/products/6",
    name: "Samsung Galaxy Watch Ultra",
    rating: 4.6,
    originalPrice: 119,
  },
  {
    id: 7,
    productSrc:
      "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-32.png",
    productAlt: "plain shirt",
    productLink: "/products/7",
    name: "Plain Shirt",
    rating: 4.3,
    originalPrice: 32,
  },
  {
    id: 8,
    productSrc:
      "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-2.png",
    productAlt: "Spigen Rugged Armor Pro",
    productLink: "/products/8",
    name: "Spigen Rugged Armor Pro",
    rating: 4.5,
    discountedPrice: 199,
    originalPrice: 239,
  },
  {
    id: 9,
    productSrc:
      "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-35.png",
    productAlt: "summer dress",
    productLink: "/products/9",
    name: "Floral Summer Dress",
    rating: 4.2,
    discountedPrice: 75,
    originalPrice: 120,
  },
  {
    id: 10,
    productSrc:
      "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-6.png",
    productAlt: "smart watch",
    productLink: "/products/10",
    name: "Premium Smart Watch",
    rating: 4.8,
    originalPrice: 199,
  },
  {
    id: 11,
    productSrc:
      "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-34.png",
    productAlt: "casual shirt",
    productLink: "/products/11",
    name: "Casual Striped Shirt",
    rating: 4.5,
    discountedPrice: 45,
    originalPrice: 70,
  },
  {
    id: 12,
    productSrc:
      "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-5.png",
    productAlt: "fitness watch",
    productLink: "/products/12",
    name: "Fitness Tracker Watch",
    rating: 4.6,
    discountedPrice: 120,
    originalPrice: 180,
  },
  {
    id: 13,
    productSrc:
      "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-33.png",
    productAlt: "polo shirt",
    productLink: "/products/13",
    name: "Classic Polo Shirt",
    rating: 4.7,
    originalPrice: 65,
  },
  {
    id: 14,
    productSrc:
      "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-4.png",
    productAlt: "sport watch",
    productLink: "/products/14",
    name: "Sport Performance Watch",
    rating: 4.9,
    originalPrice: 249,
  },
  {
    id: 15,
    productSrc:
      "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-32.png",
    productAlt: "button shirt",
    productLink: "/products/15",
    name: "Button Down Shirt",
    rating: 4.4,
    originalPrice: 55,
  },
];

// Split products into pages based on screen size
// xl screens (4 cols): 8 products (2 rows)
// 2xl screens (5 cols): 12 products (~2.5 rows)
const PRODUCTS_PER_PAGE_XL = 8;
const PRODUCTS_PER_PAGE_2XL = 12;

const productPagesXL: ProductItem[][] = [];
const productPages2XL: ProductItem[][] = [];

for (let i = 0; i < allProducts.length; i += PRODUCTS_PER_PAGE_XL) {
  productPagesXL.push(allProducts.slice(i, i + PRODUCTS_PER_PAGE_XL));
}

for (let i = 0; i < allProducts.length; i += PRODUCTS_PER_PAGE_2XL) {
  productPages2XL.push(allProducts.slice(i, i + PRODUCTS_PER_PAGE_2XL));
}

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8 space-y-6">
          <div>
            <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
              All Products
            </h1>
            <p className="text-muted-foreground mt-4 text-lg">
              Browse our complete collection of {allProducts.length} products
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-10 rounded-lg"
            />
          </div>
        </div>

        {/* Products Carousel with Grid - For XL screens (4 cols, 8 per page) */}
        <div className="2xl:hidden">
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full"
          >
            <div className="flex justify-between items-center mb-8">
              <p className="text-muted-foreground">
                Page 1 of {productPagesXL.length}
              </p>
              <div className="flex items-center gap-4">
                <CarouselPrevious
                  variant="default"
                  className="disabled:bg-primary/10 disabled:text-primary static size-10 translate-y-0 rounded-md disabled:opacity-100"
                />
                <CarouselNext
                  variant="default"
                  className="disabled:bg-primary/10 disabled:text-primary static size-10 translate-y-0 rounded-md disabled:opacity-100"
                />
              </div>
            </div>

            <CarouselContent>
              {productPagesXL.map((productsPage, pageIndex) => (
                <CarouselItem key={pageIndex}>
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                    {productsPage.map((product) => (
                      <Card
                        key={product.id}
                        className="gap-0 overflow-hidden border-none py-0 shadow-none h-full flex flex-col"
                      >
                        <div className="relative">
                          {product.discountedPrice && (
                            <Badge
                              variant="destructive"
                              className="absolute top-2.5 left-2.5 rounded-sm border-none uppercase z-10"
                            >
                              Sale
                            </Badge>
                          )}
                          <Link href={product.productLink}>
                            <img
                              src={product.productSrc}
                              alt={product.productAlt}
                              className="w-full h-80 object-cover"
                            />
                          </Link>
                          <CheckboxPrimitive.Root
                            data-slot="checkbox"
                            className="group focus-visible:ring-ring/50 bg-background data-[state=checked]:bg-primary absolute right-2.5 bottom-2.5 rounded-full p-2.5 shadow-xs outline-none focus-visible:ring-2 z-10"
                            aria-label="Add to wishlist"
                          >
                            <HeartIcon className="group-data-[state=checked]:stroke-primary-foreground size-4" />
                          </CheckboxPrimitive.Root>
                        </div>
                        <CardContent className="flex flex-col gap-2 py-4 flex-1">
                          <div className="flex items-start justify-between gap-1">
                            <Link
                              href={product.productLink}
                              className="flex-1 min-w-0"
                            >
                              <span className="text-muted-foreground text-lg line-clamp-2">
                                {product.name}
                              </span>
                            </Link>
                            <Badge className="bg-amber-600/10 text-amber-600 focus-visible:ring-amber-600/20 focus-visible:outline-none dark:bg-amber-400/10 dark:text-amber-400 dark:focus-visible:ring-amber-400/40 shrink-0">
                              <StarIcon className="size-3" />
                              {product.rating}
                            </Badge>
                          </div>

                          <div className="flex items-center justify-between gap-2 mt-auto">
                            <Link href={product.productLink} className="flex-1">
                              {!product.discountedPrice && (
                                <span className="text-2xl font-semibold">
                                  ${product.originalPrice.toFixed(2)}
                                </span>
                              )}

                              {product.discountedPrice && (
                                <div className="flex items-center gap-2">
                                  <span className="text-2xl font-semibold">
                                    ${product.discountedPrice.toFixed(2)}
                                  </span>
                                  <span className="text-muted-foreground line-through text-sm">
                                    ${product.originalPrice.toFixed(2)}
                                  </span>
                                </div>
                              )}
                            </Link>
                            <Button
                              size="icon"
                              variant="default"
                              className="rounded-lg shrink-0"
                              aria-label="Add to cart"
                            >
                              <ShoppingCart className="size-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        {/* Products Carousel with Grid - For 2XL screens (5 cols, 12 per page) */}
        <div className="hidden 2xl:block">
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full"
          >
            <div className="flex justify-between items-center mb-8">
              <p className="text-muted-foreground">
                Page 1 of {productPages2XL.length}
              </p>
              <div className="flex items-center gap-4">
                <CarouselPrevious
                  variant="default"
                  className="disabled:bg-primary/10 disabled:text-primary static size-10 translate-y-0 rounded-md disabled:opacity-100"
                />
                <CarouselNext
                  variant="default"
                  className="disabled:bg-primary/10 disabled:text-primary static size-10 translate-y-0 rounded-md disabled:opacity-100"
                />
              </div>
            </div>

            <CarouselContent>
              {productPages2XL.map((productsPage, pageIndex) => (
                <CarouselItem key={pageIndex}>
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5">
                    {productsPage.map((product) => (
                      <Card
                        key={product.id}
                        className="gap-0 overflow-hidden border-none py-0 shadow-none h-full flex flex-col"
                      >
                        <div className="relative">
                          {product.discountedPrice && (
                            <Badge
                              variant="destructive"
                              className="absolute top-2.5 left-2.5 rounded-sm border-none uppercase z-10"
                            >
                              Sale
                            </Badge>
                          )}
                          <Link href={product.productLink}>
                            <img
                              src={product.productSrc}
                              alt={product.productAlt}
                              className="w-full h-80 object-cover"
                            />
                          </Link>
                          <CheckboxPrimitive.Root
                            data-slot="checkbox"
                            className="group focus-visible:ring-ring/50 bg-background data-[state=checked]:bg-primary absolute right-2.5 bottom-2.5 rounded-full p-2.5 shadow-xs outline-none focus-visible:ring-2 z-10"
                            aria-label="Add to wishlist"
                          >
                            <HeartIcon className="group-data-[state=checked]:stroke-primary-foreground size-4" />
                          </CheckboxPrimitive.Root>
                        </div>
                        <CardContent className="flex flex-col gap-2 py-4 flex-1">
                          <div className="flex items-start justify-between gap-1">
                            <Link
                              href={product.productLink}
                              className="flex-1 min-w-0"
                            >
                              <span className="text-muted-foreground text-lg line-clamp-2">
                                {product.name}
                              </span>
                            </Link>
                            <Badge className="bg-amber-600/10 text-amber-600 focus-visible:ring-amber-600/20 focus-visible:outline-none dark:bg-amber-400/10 dark:text-amber-400 dark:focus-visible:ring-amber-400/40 shrink-0">
                              <StarIcon className="size-3" />
                              {product.rating}
                            </Badge>
                          </div>

                          <div className="flex items-center justify-between gap-2 mt-auto">
                            <Link href={product.productLink} className="flex-1">
                              {!product.discountedPrice && (
                                <span className="text-2xl font-semibold">
                                  ${product.originalPrice.toFixed(2)}
                                </span>
                              )}

                              {product.discountedPrice && (
                                <div className="flex items-center gap-2">
                                  <span className="text-2xl font-semibold">
                                    ${product.discountedPrice.toFixed(2)}
                                  </span>
                                  <span className="text-muted-foreground line-through text-sm">
                                    ${product.originalPrice.toFixed(2)}
                                  </span>
                                </div>
                              )}
                            </Link>
                            <Button
                              size="icon"
                              variant="default"
                              className="rounded-lg shrink-0"
                              aria-label="Add to cart"
                            >
                              <ShoppingCart className="size-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  );
}
