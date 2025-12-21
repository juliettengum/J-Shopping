import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { ProductCategory } from "@/data/categories";
import { cn } from "@/lib/utils";

type ProductCategoriesProps = {
  productCategories: ProductCategory[];
  showHeader?: boolean;
  gridClassName?: string;
  className?: string;
};

export function ProductCategories({
  productCategories,
  className,
  showHeader = true,
  gridClassName = "grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4",
}: ProductCategoriesProps) {
  return (
    <section className={cn("py-8 sm:py-16 lg:py-24", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        {showHeader && (
          <div className="mb-12 flex gap-6 max-sm:flex-col sm:mb-16 lg:mb-24">
            <div className="grow space-y-4">
              <p className="text-primary text-sm font-medium uppercase">
                Category
              </p>
              <h2 className="text-2xl font-semibold md:text-3xl lg:text-4xl">
                Explore Popular Categories
              </h2>
            </div>
            <Button size="lg" className="w-fit rounded-lg text-base" asChild>
              <Link href="/categories">Explore All Categories</Link>
            </Button>
          </div>
        )}

        <div className={gridClassName}>
          {productCategories.map((item, index) => (
            <Link href={item.productLink} key={`${item.title}-${index}`}>
              <div className="bg-muted flex overflow-hidden rounded-md h-full">
                <div className="flex grow flex-col justify-between gap-4 p-6 pe-2">
                  <div className="space-y-1">
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                    <p className="text-muted-foreground">
                      {item.productNumber} Products
                    </p>
                  </div>
                  {item.discountNumber && (
                    <Badge variant="destructive" className="rounded-sm w-fit">
                      {item.discountNumber}% off
                    </Badge>
                  )}
                </div>
                <div className="w-27.5 shrink-0 relative h-full">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="rounded-s-md object-cover"
                    sizes="110px"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
