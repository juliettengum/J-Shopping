"use client";

import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";

import { Button, buttonVariants } from "@/components/ui/button";
import { type VariantProps } from "class-variance-authority";
import { useCartStore } from "@/stores/cart-store";
import { cn } from "@/lib/utils";

export type ProductForCart = {
  productId: number;
  name: string;
  slug: string;
  price: number;
  originalPrice: number;
  image: string;
  maxStock: number;
  inStock: boolean;
};

type ButtonVariants = VariantProps<typeof buttonVariants>;

type AddToCartButtonProps = {
  product: ProductForCart;
  quantity?: number;
  showIcon?: boolean;
  showText?: boolean;
  variant?: ButtonVariants["variant"];
  size?: ButtonVariants["size"];
  className?: string;
  iconClassName?: string;
  onSuccess?: () => void;
};

export function AddToCartButton({
  product,
  quantity = 1,
  showIcon = true,
  showText = false,
  variant = "default",
  size = "icon",
  className,
  iconClassName,
  onSuccess,
}: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);
  const getItemQuantity = useCartStore((state) => state.getItemQuantity);

  const currentQuantityInCart = getItemQuantity(product.productId);
  const canAddMore = currentQuantityInCart + quantity <= product.maxStock;
  const isOutOfStock = !product.inStock || product.maxStock <= 0;

  const handleAddToCart = () => {
    if (isOutOfStock) {
      toast.error("Out of Stock", {
        description: `${product.name} is currently out of stock.`,
      });
      return;
    }

    if (!canAddMore) {
      toast.warning("Maximum quantity reached", {
        description: `You already have ${currentQuantityInCart} in your cart. Maximum available: ${product.maxStock}`,
      });
      return;
    }

    addItem(
      {
        productId: product.productId,
        name: product.name,
        slug: product.slug,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        maxStock: product.maxStock,
      },
      quantity
    );

    toast.success("Added to cart", {
      description: `${product.name} × ${quantity}`,
    });

    onSuccess?.();
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={cn(isOutOfStock && "opacity-50 cursor-not-allowed", className)}
      onClick={handleAddToCart}
      disabled={isOutOfStock}
      aria-label={isOutOfStock ? "Out of stock" : "Add to cart"}
    >
      {showIcon && <ShoppingCart className={cn("size-4", iconClassName)} />}
      {showText && (
        <span className={showIcon ? "ml-2" : ""}>
          {isOutOfStock ? "Out of Stock" : "Add to Cart"}
        </span>
      )}
    </Button>
  );
}
