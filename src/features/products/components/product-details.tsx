"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import {
  StarIcon,
  HeartIcon,
  TruckIcon,
  RefreshCcwIcon,
  MinusIcon,
  PlusIcon,
} from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  AddToCartButton,
  type ProductForCart,
} from "@/components/cart/add-to-cart-button";

import { cn } from "@/lib/utils";

type ProductDetailsProps = {
  productItems: {
    name: string;
    slug: string;
    description: string;
    totalReview: number;
    rating: number;
    price: number;
    hasDiscount?: boolean;
    discountPercentage?: number;
    images: Array<{
      src: string;
      alt: string;
    }>;
    breadcrumbData: Array<{
      label: string;
      href?: string;
    }>;
    // Cart-related data
    productId: number;
    stockQuantity: number;
    inStock: boolean;
  }[];
};

export const ProductDetails = ({ productItems }: ProductDetailsProps) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [api, setApi] = useState<CarouselApi>();
  const [quantity, setQuantity] = useState(1);

  // Sync carousel with thumbnail selection
  useEffect(() => {
    if (!api) return;

    api.scrollTo(selectedImage);
  }, [api, selectedImage]);

  // Update selectedImage when carousel changes
  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setSelectedImage(api.selectedScrollSnap());
    };

    api.on("select", onSelect);
    onSelect();

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <section className="py-8 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {productItems.map((item) => {
          // Calculate prices per item
          const originalPrice = item.price;
          const discountPercentage = item.discountPercentage || 0;
          const hasDiscount = item.hasDiscount && discountPercentage > 0;

          const finalPrice = hasDiscount
            ? originalPrice - (originalPrice * discountPercentage) / 100
            : originalPrice;

          return (
            <div
              key={item.name}
              className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-8 xl:gap-24"
            >
              {/* Left Side - Image Carousel */}
              <div className="flex flex-col gap-6">
                <div>
                  <Carousel
                    className="w-full"
                    setApi={setApi}
                    opts={{
                      align: "start",
                      loop: true,
                    }}
                  >
                    <CarouselContent>
                      {item.images.map((image, index) => (
                        <CarouselItem key={`${image.alt}-${index}`}>
                          <div className="h-142 overflow-hidden rounded-md bg-gray-100 relative">
                            <Image
                              src={image.src}
                              alt={image.alt}
                              fill
                              className="object-contain"
                              sizes="(max-width: 768px) 100vw, 50vw"
                              priority={index === 0}
                            />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                  </Carousel>
                </div>

                <div className="flex justify-between gap-6">
                  {item.images.map((image, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setSelectedImage(index)}
                      className={cn(
                        "cursor-pointer overflow-hidden rounded-md transition-all duration-200 relative h-31 flex-1 bg-gray-100",
                        selectedImage === index && "ring-2 ring-primary"
                      )}
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-contain"
                        sizes="150px"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Side - Product Details */}
              <div className="space-y-6 py-5">
                {/* Breadcrumb */}
                <Breadcrumb>
                  <BreadcrumbList>
                    {item.breadcrumbData.map((breadcrumb, index) => (
                      <div
                        key={`${breadcrumb.label}-${index}`}
                        className="flex items-center gap-2.5"
                      >
                        <BreadcrumbItem>
                          {index === item.breadcrumbData.length - 1 ? (
                            <BreadcrumbPage>{breadcrumb.label}</BreadcrumbPage>
                          ) : (
                            <BreadcrumbLink href={breadcrumb.href || "#"}>
                              {breadcrumb.label}
                            </BreadcrumbLink>
                          )}
                        </BreadcrumbItem>
                        {index < item.breadcrumbData.length - 1 && (
                          <BreadcrumbSeparator
                            key={`${breadcrumb.label}-sep`}
                          />
                        )}
                      </div>
                    ))}
                  </BreadcrumbList>
                </Breadcrumb>
                {/* Product Name */}
                <h1 className="text-3xl font-semibold">{item.name}</h1>
                {/* Rating */}
                <div className="flex w-fit items-center rounded-sm border px-2.5 py-1.5">
                  <span className="me-2.5 flex items-center gap-1 border-e pe-2.5 text-sm">
                    <span className="text-lg font-medium">{item.rating}</span>
                    <StarIcon className="mb-0.5 size-4 fill-amber-500 stroke-transparent" />
                  </span>
                  <span className="text-muted-foreground">
                    {item.totalReview} Reviews
                  </span>
                </div>
                {/* Price */}
                {!hasDiscount ? (
                  <h4 className="text-3xl font-bold">
                    ${finalPrice.toFixed(2)}
                  </h4>
                ) : (
                  <div className="flex items-center gap-3">
                    <h4 className="text-3xl font-bold">
                      ${finalPrice.toFixed(2)}
                    </h4>
                    <span className="text-muted-foreground font-medium line-through">
                      MRP ${originalPrice.toFixed(2)}
                    </span>
                    <Badge className="border-none bg-green-600/10 text-green-600 focus-visible:ring-green-600/20 focus-visible:outline-none dark:bg-green-400/10 dark:text-green-400 dark:focus-visible:ring-green-400/40 [a&]:hover:bg-green-600/5 dark:[a&]:hover:bg-green-400/5">
                      {discountPercentage}% Off
                    </Badge>
                  </div>
                )}
                {/* Description */}
                <p className="text-muted-foreground">{item.description}</p>
                <Separator />

                {/* Quantity Selector */}
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium">Quantity:</span>
                  <div className="flex items-center border rounded-lg">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-r-none"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      disabled={quantity <= 1}
                    >
                      <MinusIcon className="size-4" />
                    </Button>
                    <span className="w-12 text-center font-medium">
                      {quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-l-none"
                      onClick={() =>
                        setQuantity((q) => Math.min(item.stockQuantity, q + 1))
                      }
                      disabled={quantity >= item.stockQuantity}
                    >
                      <PlusIcon className="size-4" />
                    </Button>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {item.stockQuantity} available
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-6">
                  <AddToCartButton
                    product={
                      {
                        productId: item.productId,
                        name: item.name,
                        slug: item.slug,
                        price: finalPrice,
                        originalPrice: originalPrice,
                        image: item.images[0]?.src || "",
                        maxStock: item.stockQuantity,
                        inStock: item.inStock,
                      } as ProductForCart
                    }
                    quantity={quantity}
                    showIcon
                    showText
                    size="lg"
                    className="grow"
                    onSuccess={() => setQuantity(1)}
                  />
                  <Button size="lg" variant="secondary" className="grow">
                    <HeartIcon />
                    Wish List
                  </Button>
                </div>
                <Separator />
                {/* Additional Info */}
                <div className="rounded-md border *:not-last:border-b">
                  <div className="flex items-center gap-6 px-6 py-4">
                    <TruckIcon className="size-7" />
                    <div className="flex flex-col gap-1">
                      <p className="text-lg font-semibold">Free Delivery</p>
                      <p className="text-muted-foreground">
                        Enter your postal code for delivery Availability
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 px-6 py-4">
                    <RefreshCcwIcon className="size-7" />
                    <div className="flex flex-col gap-1">
                      <p className="text-lg font-semibold">Return Delivery</p>
                      <p>
                        <span className="text-muted-foreground">
                          Free 30 Days Delivery Returns.
                        </span>{" "}
                        <a href="#" className="underline">
                          Details
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
