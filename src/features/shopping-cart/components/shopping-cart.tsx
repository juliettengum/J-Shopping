"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { Trash2Icon, ShoppingBag, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCartStore } from "@/stores/cart-store";

export function ShoppingCart() {
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  const [openPopovers, setOpenPopovers] = useState<Record<number, boolean>>({});

  // Calculate subtotal
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Generate quantity options based on maxStock
  const getQuantityOptions = (maxStock: number) => {
    const max = Math.min(maxStock, 10); // Cap at 10 for UI
    return Array.from({ length: max }, (_, i) => i + 1);
  };

  return (
    <section className="bg-muted py-8 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left Column - Cart Items */}
          <div className="space-y-3 lg:col-span-2">
            <div className="flex w-full items-center justify-between">
              <h1 className="text-2xl font-semibold">Your Cart</h1>
              <p className="text-muted-foreground">
                {items.length} {items.length === 1 ? "Item" : "Items"} in cart
              </p>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="flex size-20 items-center justify-center rounded-full bg-muted-foreground/10 mb-4">
                  <ShoppingBag className="size-10 text-muted-foreground" />
                </div>
                <h2 className="text-xl font-semibold mb-2">
                  Your cart is empty
                </h2>
                <p className="text-muted-foreground mb-6 max-w-sm">
                  Looks like you haven&apos;t added anything to your cart yet.
                  Start shopping to fill it up!
                </p>
                <Button asChild>
                  <Link href="/products">
                    Continue Shopping
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.productId}
                    className="flex gap-4 sm:gap-6 border-t pt-6 pb-4 max-sm:flex-col"
                  >
                    {/* Product Image & Info */}
                    <div className="flex grow items-start gap-4">
                      <Link
                        href={`/products/${item.productId}`}
                        className="relative size-24 sm:size-28 shrink-0 overflow-hidden rounded-lg bg-background"
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="112px"
                        />
                      </Link>

                      <div className="space-y-2 flex-1 min-w-0">
                        <Link
                          href={`/products/${item.productId}`}
                          className="block"
                        >
                          <h3 className="font-medium line-clamp-2 hover:underline">
                            {item.name}
                          </h3>
                        </Link>
                        <div className="flex items-center gap-2 text-sm">
                          {item.price < item.originalPrice && (
                            <span className="text-muted-foreground line-through">
                              ${item.originalPrice.toFixed(2)}
                            </span>
                          )}
                          <span className="font-semibold">
                            ${item.price.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Quantity, Price, Delete */}
                    <div className="flex items-center gap-4 sm:gap-8 max-sm:justify-between">
                      <Select
                        value={item.quantity.toString()}
                        onValueChange={(value) =>
                          updateQuantity(item.productId, parseInt(value))
                        }
                      >
                        <SelectTrigger className="w-20 shadow-none">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {getQuantityOptions(item.maxStock).map((qty) => (
                            <SelectItem key={qty} value={qty.toString()}>
                              {qty}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <p className="text-lg font-semibold min-w-[80px] text-right">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>

                      <Popover
                        open={openPopovers[item.productId] || false}
                        onOpenChange={(open) =>
                          setOpenPopovers((prev) => ({
                            ...prev,
                            [item.productId]: open,
                          }))
                        }
                      >
                        <PopoverTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Trash2Icon className="size-5" />
                            <span className="sr-only">Remove item</span>
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-72">
                          <div className="flex flex-col items-center gap-4">
                            <div className="flex size-12 items-center justify-center rounded-full bg-destructive/10">
                              <Trash2Icon className="text-destructive size-5" />
                            </div>
                            <p className="text-center font-medium">
                              Remove this item from cart?
                            </p>
                            <div className="grid w-full grid-cols-2 gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  setOpenPopovers((prev) => ({
                                    ...prev,
                                    [item.productId]: false,
                                  }))
                                }
                              >
                                Cancel
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => {
                                  removeItem(item.productId);
                                  setOpenPopovers((prev) => ({
                                    ...prev,
                                    [item.productId]: false,
                                  }));
                                }}
                              >
                                Remove
                              </Button>
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Order Summary */}
          <div className="space-y-6">
            <Card className="w-full border-0 shadow-none">
              <CardHeader>
                <CardTitle className="text-xl">Apply Coupon</CardTitle>
                <CardDescription>Have a promo code?</CardDescription>
              </CardHeader>
              <CardContent>
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="flex gap-3"
                >
                  <Input
                    type="text"
                    placeholder="Enter code"
                    className="flex-1"
                  />
                  <Button type="submit" variant="outline">
                    Apply
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card className="w-full border-0 shadow-none">
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Order Summary</h2>
                  <div className="space-y-4">
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium">
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold">Total</span>
                      <span className="text-lg font-semibold">
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex-col gap-4">
                <Button
                  className="w-full"
                  size="lg"
                  disabled={items.length === 0}
                  asChild={items.length > 0}
                >
                  {items.length > 0 ? (
                    <Link href="/checkout">Proceed to Checkout</Link>
                  ) : (
                    "Proceed to Checkout"
                  )}
                </Button>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>We accept:</span>
                  <div className="flex items-center gap-3">
                    <Image
                      src="https://cdn.shadcnstudio.com/ss-assets/brand-logo/visa.png"
                      alt="Visa"
                      width={32}
                      height={16}
                      className="h-4 w-auto"
                    />
                    <Image
                      src="https://cdn.shadcnstudio.com/ss-assets/brand-logo/paypal-icon.png"
                      alt="PayPal"
                      width={32}
                      height={16}
                      className="h-4 w-auto"
                    />
                    <Image
                      src="https://cdn.shadcnstudio.com/ss-assets/brand-logo/master.png"
                      alt="Mastercard"
                      width={32}
                      height={16}
                      className="h-4 w-auto"
                    />
                  </div>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
