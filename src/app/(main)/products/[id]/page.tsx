import { notFound } from "next/navigation";
import { ProductDetails } from "@/features/products/components/product-details";
import { getProductById } from "@/actions/products";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const productId = parseInt(id, 10);

  // Get product from database
  const product = await getProductById(productId);

  if (!product) {
    notFound();
  }

  // Convert decimal strings to numbers
  const originalPrice = parseFloat(product.originalPrice);
  const discountedPrice = product.discountedPrice
    ? parseFloat(product.discountedPrice)
    : null;

  // Calculate discount percentage
  const discountPercentage =
    discountedPrice
      ? Math.round(((originalPrice - discountedPrice) / originalPrice) * 100)
      : 0;

  // Map product data to the format expected by ProductDetails component
  const productItems = [
    {
      name: product.name,
      slug: product.slug,
      breadcrumbData: [
        {
          label: "Home",
          href: "/",
        },
        {
          label: "Products",
          href: "/products",
        },
        {
          label: product.name,
          href: `/products/${product.id}`,
        },
      ],
      description: product.description,
      totalReview: Math.floor(Math.random() * 300) + 50, // Mock review count
      rating: parseFloat(product.rating),
      hasDiscount: !!discountedPrice,
      price: originalPrice,
      discountPercentage,
      images: (product.images as string[]).map((img, index) => ({
        src: img,
        alt: `${product.name} - Image ${index + 1}`,
      })),
      // Cart-related data
      productId: product.id,
      stockQuantity: product.stockQuantity,
      inStock: product.inStock,
    },
  ];

  return <ProductDetails productItems={productItems} />;
}
