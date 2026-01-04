import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getCategoryWithProducts } from "@/actions/categories";
import { CategoryProductsClient } from "./category-products-client";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;

  // Fetch category and its products from database
  const data = await getCategoryWithProducts(slug);

  if (!data) {
    notFound();
  }

  const { category, products } = data;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button variant="ghost" className="mb-6" asChild>
          <Link href="/categories">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Categories
          </Link>
        </Button>

        {/* Page Header */}
        <div className="mb-8 space-y-6">
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0 bg-muted relative">
              <Image
                src={category.image || ""}
                alt={category.name}
                fill
                className="object-cover"
                sizes="96px"
              />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
                {category.name}
              </h1>
              <p className="text-muted-foreground mt-2 text-lg">
                {products.length} products available
              </p>
              {category.description && (
                <p className="text-muted-foreground mt-2">
                  {category.description}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">
              No products available in this category yet.
            </p>
          </div>
        ) : (
          <CategoryProductsClient products={products} />
        )}
      </div>
    </div>
  );
}
