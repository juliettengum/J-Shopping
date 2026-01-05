"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { HeartIcon, StarIcon, Search } from "lucide-react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  AddToCartButton,
  type ProductForCart,
} from "@/components/cart/add-to-cart-button";

type CategoryProductsClientProps = {
  products: any[];
};

// Helper to chunk array for pagination
const chunkArray = <T,>(array: T[], chunkSize: number): T[][] => {
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
};

// Reusable Product Card Component
function ProductCard({ product }: { product: any }) {
  return (
    <Card className="gap-0 overflow-hidden border-none py-0 shadow-none h-full flex flex-col">
      <div className="relative">
        {product.discountedPrice && (
          <Badge
            variant="destructive"
            className="absolute top-2.5 left-2.5 rounded-sm border-none uppercase z-10"
          >
            Sale
          </Badge>
        )}
        <Link
          href={`/products/${product.id}`}
          className="relative h-64 sm:h-72 lg:h-80 w-full block"
        >
          <Image
            src={product.bannerImage}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
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
          <Link href={`/products/${product.id}`} className="flex-1 min-w-0">
            <span className="text-muted-foreground text-base lg:text-lg line-clamp-2">
              {product.name}
            </span>
          </Link>
          <Badge className="bg-amber-600/10 text-amber-600 focus-visible:ring-amber-600/20 focus-visible:outline-none dark:bg-amber-400/10 dark:text-amber-400 dark:focus-visible:ring-amber-400/40 shrink-0">
            <StarIcon className="size-3" />
            {parseFloat(product.rating)}
          </Badge>
        </div>

        <div className="flex items-center justify-between gap-2 mt-auto">
          <Link href={`/products/${product.id}`} className="flex-1">
            {!product.discountedPrice && (
              <span className="text-xl lg:text-2xl font-semibold">
                ${parseFloat(product.originalPrice).toFixed(2)}
              </span>
            )}

            {product.discountedPrice && (
              <div className="flex items-center gap-2">
                <span className="text-xl lg:text-2xl font-semibold">
                  ${parseFloat(product.discountedPrice).toFixed(2)}
                </span>
                <span className="text-muted-foreground line-through text-xs lg:text-sm">
                  ${parseFloat(product.originalPrice).toFixed(2)}
                </span>
              </div>
            )}
          </Link>
          <AddToCartButton
            product={
              {
                productId: product.id,
                name: product.name,
                slug: product.slug,
                price: product.discountedPrice
                  ? parseFloat(product.discountedPrice)
                  : parseFloat(product.originalPrice),
                originalPrice: parseFloat(product.originalPrice),
                image: product.bannerImage,
                maxStock: product.stockQuantity,
                inStock: product.inStock,
              } as ProductForCart
            }
            className="rounded-lg shrink-0"
          />
        </div>
      </CardContent>
    </Card>
  );
}

export function CategoryProductsClient({
  products,
}: CategoryProductsClientProps) {
  // Carousel state for tracking current page
  const [api, setApi] = useState<CarouselApi>();
  const [currentPage, setCurrentPage] = useState(1);

  // 12 products per page (6 cols × 2 rows on 2xl, or 4 cols × 3 rows on xl)
  const PRODUCTS_PER_PAGE = 12;
  const productPages = chunkArray(products, PRODUCTS_PER_PAGE);
  const totalPages = productPages.length;

  // Track carousel slide changes
  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrentPage(api.selectedScrollSnap() + 1);
    };

    api.on("select", onSelect);
    // Set initial page
    onSelect();

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <>
      {/* Search Bar */}
      <div className="relative max-w-xs mb-8">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search in this category..."
          className="pl-10 rounded-lg"
        />
      </div>

      {/* Products Carousel with Responsive Grid */}
      <Carousel
        opts={{
          align: "start",
        }}
        setApi={setApi}
        className="w-full"
      >
        <div className="flex justify-between items-center mb-8">
          <p className="text-muted-foreground">
            Page {currentPage} of {totalPages}
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
          {productPages.map((productsPage, pageIndex) => (
            <CarouselItem key={pageIndex}>
              {/* Responsive grid: 1 col mobile, 2 sm, 3 lg, 4 xl, 5 2xl */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                {productsPage.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </>
  );
}
