"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Trash2Icon,
  XIcon,
  MinusIcon,
  PlusIcon,
  ShoppingBag,
  Lock,
  Loader2,
} from "lucide-react";
import {
  Button as AriaButton,
  Group,
  Input as AriaInput,
  NumberField,
} from "react-aria-components";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/stores/cart-store";
import { createCheckoutSession } from "@/actions/checkout";

export function CheckoutClient() {
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  const [openPopovers, setOpenPopovers] = useState<Record<number, boolean>>({});
  const [isLoading, setIsLoading] = useState(false);

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setIsLoading(true);

    const result = await createCheckoutSession({
      items: items.map((item) => ({
        productId: item.productId,
        name: item.name,
        image: item.image,
        price: item.price,
        quantity: item.quantity,
      })),
    });

    if (result.success) {
      window.location.href = result.url;
    } else {
      toast.error(result.error);
      setIsLoading(false);
    }
  };

  // Empty cart
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="flex size-20 items-center justify-center rounded-full bg-muted mb-4">
          <ShoppingBag className="size-10 text-muted-foreground" />
        </div>
        <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
        <p className="text-muted-foreground mb-6">
          Add some products before checking out.
        </p>
        <Button asChild>
          <Link href="/products">Browse Products</Link>
        </Button>
      </div>
    );
  }

  return (
    <section className="py-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column - Cart Items */}
        <div className="lg:col-span-2">
          <h2 className="mb-6 text-2xl font-semibold">Shopping Cart</h2>
          <Card className="shadow-none">
            <CardHeader className="flex w-full items-center justify-between border-b !pb-2">
              <p className="font-medium max-sm:hidden">Product</p>
              <div className="flex items-center justify-between gap-20 max-sm:hidden">
                <p className="font-medium">Quantity</p>
                <p className="font-medium">Price</p>
              </div>
              <p className="font-medium sm:hidden">Product Details</p>
            </CardHeader>

            <CardContent className="pt-4">
              {items.map((item, index) => (
                <div key={item.productId} className="flex flex-col gap-3">
                  <div className="flex gap-6 max-sm:flex-col sm:items-center">
                    <div className="flex grow gap-4">
                      {/* Delete Button */}
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
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-muted-foreground my-auto"
                          >
                            <XIcon className="size-5" />
                            <span className="sr-only">Remove</span>
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-72">
                          <div className="flex flex-col items-center gap-4">
                            <div className="flex size-12 items-center justify-center rounded-full bg-destructive/10">
                              <Trash2Icon className="text-destructive size-5" />
                            </div>
                            <p className="text-center font-medium">
                              Remove this item?
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

                      {/* Product Image */}
                      <Link
                        href={`/products/${item.productId}`}
                        className="relative size-18 shrink-0 overflow-hidden rounded-md bg-muted"
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="72px"
                        />
                      </Link>

                      {/* Product Info */}
                      <div className="space-y-1">
                        <Link
                          href={`/products/${item.productId}`}
                          className="font-medium hover:underline line-clamp-2"
                        >
                          {item.name}
                        </Link>
                        <p className="text-sm text-muted-foreground">
                          ${item.price.toFixed(2)} each
                        </p>
                      </div>
                    </div>

                    {/* Quantity & Price */}
                    <div className="flex items-center gap-8 sm:gap-12">
                      <NumberField
                        value={item.quantity}
                        onChange={(value) =>
                          updateQuantity(item.productId, value)
                        }
                        minValue={1}
                        maxValue={item.maxStock}
                        className="w-full max-w-28"
                      >
                        <Group className="border-input bg-background data-focus-within:border-ring data-focus-within:ring-ring/50 relative inline-flex h-9 w-full items-center overflow-hidden rounded-md border text-sm shadow-xs data-focus-within:ring-[3px]">
                          <AriaButton
                            slot="decrement"
                            className="bg-muted text-muted-foreground hover:bg-accent hover:text-foreground ms-1.5 flex size-6 items-center justify-center rounded-sm transition-colors disabled:opacity-50"
                          >
                            <MinusIcon className="size-3" />
                          </AriaButton>
                          <AriaInput className="w-full grow px-2 py-2 text-center tabular-nums outline-none" />
                          <AriaButton
                            slot="increment"
                            className="bg-muted text-muted-foreground hover:bg-accent hover:text-foreground me-1.5 flex size-6 items-center justify-center rounded-sm transition-colors disabled:opacity-50"
                          >
                            <PlusIcon className="size-3" />
                          </AriaButton>
                        </Group>
                      </NumberField>

                      <p className="text-lg font-semibold min-w-[80px] text-right">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {index < items.length - 1 && <Separator className="my-3" />}
                </div>
              ))}

              {/* Subtotal */}
              <div className="mt-6 pt-6 border-t">
                <div className="flex items-center justify-between text-lg">
                  <span className="font-medium">Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Checkout */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Checkout</h2>
          <Card className="shadow-none">
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
              </div>

              <Separator />

              <div className="rounded-lg border p-4 bg-muted/50">
                <div className="flex items-center gap-3 text-sm">
                  <Lock className="size-4 text-green-600" />
                  <span>Secure payment powered by Stripe</span>
                </div>
              </div>

              <Button
                size="lg"
                className="w-full"
                onClick={handleCheckout}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Redirecting...
                  </>
                ) : (
                  "Pay with Stripe"
                )}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                You&apos;ll be redirected to Stripe to complete your purchase
                securely.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
