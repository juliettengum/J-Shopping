import { Hero } from "@/components/layout/home/hero";
import { ProductCategories } from "@/components/layout/home/product-categories";
import { ProductList } from "@/components/layout/home/popular-products";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import { AboutUs } from "@/components/layout/home/about-us";
import { getCategoriesWithProductCount } from "@/actions/categories";
import { getFeaturedProducts } from "@/actions/products";

const avatars = [
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-3.png',
    fallback: 'HL',
    name: 'Howard Lloyd'
  },
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-6.png',
    fallback: 'OS',
    name: 'Olivia Sparks'
  },
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png',
    fallback: 'HR',
    name: 'Hallie Richards'
  },
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-16.png',
    fallback: 'JW',
    name: 'Jenny Wilson'
  },
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-7.png',
    fallback: 'MC',
    name: 'Michael Chen'
  },
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-8.png',
    fallback: 'SD',
    name: 'Sarah Davis'
  }
]

const logos = [
  {
    image: 'https://cdn.shadcnstudio.com/ss-assets/brand-logo/amazon-logo-bw.png',
    alt: 'Amazon'
  },
  {
    image: 'https://cdn.shadcnstudio.com/ss-assets/brand-logo/walmart-logo-bw.png',
    alt: 'Walmart'
  },
  {
    image: 'https://cdn.shadcnstudio.com/ss-assets/brand-logo/hubspot-logo-bw.png',
    alt: 'HubSpot'
  },
  {
    image: 'https://cdn.shadcnstudio.com/ss-assets/brand-logo/microsoft-logo-bw.png',
    alt: 'Microsoft'
  }
]


export default async function Home() {
  // Fetch data from database
  const categories = await getCategoriesWithProductCount();
  const featuredProducts = await getFeaturedProducts(8);

  // Transform categories to match component props (show first 4)
  const categoryData = categories.slice(0, 4).map((cat) => ({
    img: cat.image || "",
    title: cat.name,
    productNumber: cat.productCount,
    productLink: `/categories/${cat.slug}`,
    slug: cat.slug,
  }));

  return (
    <div className="flex min-h-screen flex-col bg-background relative">
      <div className="absolute inset-0 overflow-hidden">
        <BackgroundRippleEffect cellSize={80} rows={50} />
      </div>
      <div className="relative z-10">
        <Hero />
        <ProductCategories productCategories={categoryData} />
        <ProductList products={featuredProducts} />
        <AboutUs avatars={avatars} logos={logos} />
      </div>
    </div>
  );
}
