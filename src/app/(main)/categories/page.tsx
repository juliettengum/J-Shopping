import { ProductCategories } from "@/components/layout/home/product-categories";
import { productCategories } from "@/data/categories";

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            All Categories
          </h1>
          <p className="text-muted-foreground mt-4 text-lg">
            Browse all {productCategories.length} product categories
          </p>
        </div>
      </div>

      {/* Categories Grid - All 10 categories */}
      <ProductCategories
        className="py-4 sm:py-6 lg:py-8"
        productCategories={productCategories}
        showHeader={false}
        gridClassName="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5"
      />
    </div>
  );
}
