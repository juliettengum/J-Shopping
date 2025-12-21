export type Product = {
  id: number;
  name: string;
  slug: string;
  description: string;
  bannerImage: string; // Main image for listings
  images: string[]; // All product images including banner
  rating: number;
  originalPrice: number;
  discountedPrice?: number;
  category: string;
  inStock: boolean;
  stockQuantity: number;
};

export const allProducts: Product[] = [
  {
    id: 1,
    name: "Summer Dress",
    slug: "summer-dress",
    description: "Beautiful floral summer dress perfect for warm weather. Made with breathable fabric.",
    bannerImage: "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-35.png",
    images: [
      "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-35.png",
      "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-34.png",
      "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-33.png",
      "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-32.png",
    ],
    rating: 4.1,
    discountedPrice: 80,
    originalPrice: 129,
    category: "clothes",
    inStock: true,
    stockQuantity: 25,
  },
  {
    id: 2,
    name: "Samsung Galaxy Watch 6 Classic",
    slug: "samsung-galaxy-watch-6-classic",
    description: "Premium smartwatch with advanced health tracking and fitness features.",
    bannerImage: "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-6.png",
    images: [
      "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-6.png",
      "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-5.png",
      "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-4.png",
      "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-3.png",
    ],
    rating: 4.7,
    originalPrice: 129,
    category: "electronics",
    inStock: true,
    stockQuantity: 15,
  },
  {
    id: 3,
    name: "Formal Shirt",
    slug: "formal-shirt",
    description: "Classic formal shirt perfect for office wear and special occasions.",
    bannerImage: "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-34.png",
    images: [
      "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-34.png",
      "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-35.png",
      "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-33.png",
      "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-32.png",
    ],
    rating: 4.8,
    discountedPrice: 52,
    originalPrice: 80,
    category: "clothes",
    inStock: true,
    stockQuantity: 30,
  },
  {
    id: 4,
    name: "Samsung Galaxy Watch 7",
    slug: "samsung-galaxy-watch-7",
    description: "Latest generation smartwatch with enhanced battery life and new features.",
    bannerImage: "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-5.png",
    images: [
      "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-5.png",
      "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-6.png",
      "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-4.png",
      "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-3.png",
    ],
    rating: 4.9,
    discountedPrice: 139,
    originalPrice: 229,
    category: "electronics",
    inStock: true,
    stockQuantity: 10,
  },
  {
    id: 5,
    name: "Denim T-shirt",
    slug: "denim-t-shirt",
    description: "Casual denim t-shirt for everyday wear. Comfortable and stylish.",
    bannerImage: "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-33.png",
    images: [
      "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-33.png",
      "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-34.png",
      "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-35.png",
      "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-32.png",
    ],
    rating: 5.0,
    originalPrice: 85,
    category: "clothes",
    inStock: true,
    stockQuantity: 40,
  },
  {
    id: 6,
    name: "Samsung Galaxy Watch Ultra",
    slug: "samsung-galaxy-watch-ultra",
    description: "Ultimate smartwatch for fitness enthusiasts with rugged design.",
    bannerImage: "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-4.png",
    images: [
      "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-4.png",
      "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-5.png",
      "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-6.png",
      "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-3.png",
    ],
    rating: 4.6,
    originalPrice: 119,
    category: "electronics",
    inStock: true,
    stockQuantity: 8,
  },
  {
    id: 7,
    name: "Plain Shirt",
    slug: "plain-shirt",
    description: "Simple and elegant plain shirt for any occasion.",
    bannerImage: "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-32.png",
    images: [
      "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-32.png",
      "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-33.png",
      "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-34.png",
      "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-35.png",
    ],
    rating: 4.3,
    originalPrice: 32,
    category: "clothes",
    inStock: true,
    stockQuantity: 50,
  },
  {
    id: 8,
    name: "Spigen Rugged Armor Pro",
    slug: "spigen-rugged-armor-pro",
    description: "Premium protective case with military-grade protection.",
    bannerImage: "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-2.png",
    images: [
      "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-2.png",
      "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-1.png",
      "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-3.png",
      "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-4.png",
    ],
    rating: 4.5,
    discountedPrice: 199,
    originalPrice: 239,
    category: "accessories",
    inStock: true,
    stockQuantity: 20,
  },
  {
    id: 9,
    name: "Floral Summer Dress",
    slug: "floral-summer-dress",
    description: "Vibrant floral pattern dress perfect for summer outings.",
    bannerImage: "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-35.png",
    images: [
      "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-35.png",
      "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-34.png",
      "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-33.png",
      "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-32.png",
    ],
    rating: 4.2,
    discountedPrice: 75,
    originalPrice: 120,
    category: "clothes",
    inStock: true,
    stockQuantity: 18,
  },
  {
    id: 10,
    name: "Premium Smart Watch",
    slug: "premium-smart-watch",
    description: "High-end smartwatch with advanced features and elegant design.",
    bannerImage: "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-6.png",
    images: [
      "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-6.png",
      "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-5.png",
      "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-4.png",
      "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-3.png",
    ],
    rating: 4.8,
    originalPrice: 199,
    category: "electronics",
    inStock: true,
    stockQuantity: 12,
  },
  {
    id: 11,
    name: "Casual Striped Shirt",
    slug: "casual-striped-shirt",
    description: "Trendy striped shirt for casual outings and weekend wear.",
    bannerImage: "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-34.png",
    images: [
      "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-34.png",
      "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-33.png",
      "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-32.png",
      "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-35.png",
    ],
    rating: 4.5,
    discountedPrice: 45,
    originalPrice: 70,
    category: "clothes",
    inStock: true,
    stockQuantity: 35,
  },
  {
    id: 12,
    name: "Fitness Tracker Watch",
    slug: "fitness-tracker-watch",
    description: "Dedicated fitness tracker with heart rate monitoring and GPS.",
    bannerImage: "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-5.png",
    images: [
      "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-5.png",
      "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-6.png",
      "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-4.png",
      "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-3.png",
    ],
    rating: 4.6,
    discountedPrice: 120,
    originalPrice: 180,
    category: "electronics",
    inStock: true,
    stockQuantity: 22,
  },
  {
    id: 13,
    name: "Classic Polo Shirt",
    slug: "classic-polo-shirt",
    description: "Timeless polo shirt design suitable for all occasions.",
    bannerImage: "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-33.png",
    images: [
      "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-33.png",
      "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-34.png",
      "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-35.png",
      "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-32.png",
    ],
    rating: 4.7,
    originalPrice: 65,
    category: "clothes",
    inStock: true,
    stockQuantity: 28,
  },
  {
    id: 14,
    name: "Sport Performance Watch",
    slug: "sport-performance-watch",
    description: "Professional sports watch with advanced performance metrics.",
    bannerImage: "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-4.png",
    images: [
      "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-4.png",
      "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-5.png",
      "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-6.png",
      "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-3.png",
    ],
    rating: 4.9,
    originalPrice: 249,
    category: "electronics",
    inStock: true,
    stockQuantity: 6,
  },
  {
    id: 15,
    name: "Button Down Shirt",
    slug: "button-down-shirt",
    description: "Classic button-down shirt with modern fit and premium fabric.",
    bannerImage: "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-32.png",
    images: [
      "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-32.png",
      "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-33.png",
      "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-34.png",
      "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-35.png",
    ],
    rating: 4.4,
    originalPrice: 55,
    category: "clothes",
    inStock: true,
    stockQuantity: 45,
  },
];

// Helper function to get product by ID
export function getProductById(id: number): Product | undefined {
  return allProducts.find((product) => product.id === id);
}

// Helper function to get product by slug
export function getProductBySlug(slug: string): Product | undefined {
  return allProducts.find((product) => product.slug === slug);
}

// Helper function to get products by category
export function getProductsByCategory(category: string): Product[] {
  return allProducts.filter((product) => product.category === category);
}

