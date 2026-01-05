import { getAllProducts } from "@/actions/products";
import { ProductsPageClient } from "./products-client";

export default async function ProductsPage() {
  // Fetch products from database
  const products = await getAllProducts();

  return <ProductsPageClient products={products} />;
}
