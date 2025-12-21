import { notFound } from "next/navigation";
import { ProductDetails } from "@/features/products/components/product-details";
import { getProductById } from "@/data/products";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const productId = parseInt(id, 10);

  // Get product from data
  const product = getProductById(productId);

  if (!product) {
    notFound();
  }

  // Calculate discount percentage
  const discountPercentage = product.discountedPrice
    ? Math.round(
        ((product.originalPrice - product.discountedPrice) /
          product.originalPrice) *
          100
      )
    : 0;

  // Map product data to the format expected by ProductDetails component
  const productItems = [
    {
      name: product.name,
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
      rating: product.rating,
      hasDiscount: !!product.discountedPrice,
      price: product.originalPrice,
      discountPercentage,
      images: product.images.map((img, index) => ({
        src: img,
        alt: `${product.name} - Image ${index + 1}`,
      })),
    },
  ];

  return <ProductDetails productItems={productItems} />;
}
