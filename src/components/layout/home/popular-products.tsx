import Link from "next/link";
import Image from "next/image";
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
import { allProducts, type Product } from "@/data/products";

export function ProductList() {
  // Show first 8 popular products
  const products = allProducts.slice(0, 8);
  return (
    <section className="py-8 sm:py-16 lg:py-24">
      <Carousel
        className="mx-auto flex max-w-7xl flex-col gap-12 px-4 sm:gap-16 sm:px-6 lg:gap-24 lg:px-8"
        opts={{
          align: "start",
          slidesToScroll: 1,
        }}
      >
        <div className="space-y-6">
          <div className="flex justify-between gap-6">
            <h2 className="grow text-2xl font-semibold sm:text-3xl lg:text-4xl">
              Popular Products
            </h2>

            <div className="flex items-start gap-4">
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

        {/* Product Carousel */}
        <div className="relative">
          <CarouselContent className="sm:-ml-6">
            {products.map((product, index) => (
              <CarouselItem
                key={index}
                className="sm:basis-1/2 sm:pl-6 lg:basis-1/3 xl:basis-1/4"
              >
                <Card className="gap-0 overflow-hidden border-none py-0 shadow-none h-full flex flex-col">
                  <div className="relative">
                    {product.discountedPrice && (
                      <Badge
                        variant="destructive"
                        className="absolute top-2.5 left-2.5 rounded-sm border-none uppercase"
                      >
                        Sale
                      </Badge>
                    )}
                    <Link
                      href={`/products/${product.id}`}
                      className="relative h-80 w-full block"
                    >
                      <Image
                        src={product.bannerImage}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </Link>
                    <CheckboxPrimitive.Root
                      data-slot="checkbox"
                      className="group focus-visible:ring-ring/50 bg-background data-[state=checked]:bg-primary absolute right-2.5 bottom-2.5 rounded-full p-2.5 shadow-xs outline-none focus-visible:ring-2"
                      aria-label="Add to wishlist"
                    >
                      <HeartIcon className="group-data-[state=checked]:stroke-primary-foreground size-4" />
                    </CheckboxPrimitive.Root>
                  </div>
                  <CardContent className="flex flex-col gap-2 py-4 flex-1">
                    <div className="flex items-start justify-between gap-1">
                      <Link
                        href={`/products/${product.id}`}
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
                      <Link href={`/products/${product.id}`} className="flex-1">
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
              </CarouselItem>
            ))}
          </CarouselContent>
        </div>
      </Carousel>
    </section>
  );
}
