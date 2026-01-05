import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";
import { getCategoriesWithProductCount } from "@/actions/categories";
import { Input } from "@/components/ui/input";

export default async function CategoriesPage() {
  // Fetch categories from database
  const categories = await getCategoriesWithProductCount();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8 space-y-6">
          <div>
            <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
              All Categories
            </h1>
            <p className="text-muted-foreground mt-4 text-lg">
              Browse all {categories.length} product categories
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search categories..."
              className="pl-10 rounded-lg"
            />
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5">
          {categories.map((category) => (
            <Link href={`/categories/${category.slug}`} key={category.id}>
              <div className="bg-muted flex overflow-hidden rounded-md h-full">
                <div className="flex grow flex-col justify-between gap-4 p-6 pe-2">
                  <div className="space-y-1">
                    <h3 className="text-xl font-semibold">{category.name}</h3>
                    <p className="text-muted-foreground">
                      {category.productCount} Products
                    </p>
                  </div>
                </div>
                <div className="w-27.5 shrink-0 relative h-full min-h-[120px]">
                  <Image
                    src={category.image || ""}
                    alt={category.name}
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
    </div>
  );
}
