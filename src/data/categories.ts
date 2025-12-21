export type ProductCategory = {
  img: string;
  title: string;
  discountNumber?: number;
  productNumber: number;
  productLink: string;
  slug: string;
};

export const productCategories: ProductCategory[] = [
  {
    img: "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-category/image-25.png",
    title: "Clothes",
    discountNumber: 20,
    productNumber: 237,
    productLink: "/categories/clothes",
    slug: "clothes",
  },
  {
    img: "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-category/image-26.png",
    title: "Handbags",
    discountNumber: 25,
    productNumber: 74,
    productLink: "/categories/handbags",
    slug: "handbags",
  },
  {
    img: "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-category/image-27.png",
    title: "Cosmetics",
    discountNumber: 15,
    productNumber: 1345,
    productLink: "/categories/cosmetics",
    slug: "cosmetics",
  },
  {
    img: "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-category/image-28.png",
    title: "Footwear",
    discountNumber: 50,
    productNumber: 875,
    productLink: "/categories/footwear",
    slug: "footwear",
  },
  {
    img: "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-6.png",
    title: "Electronics",
    discountNumber: 30,
    productNumber: 542,
    productLink: "/categories/electronics",
    slug: "electronics",
  },
  {
    img: "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/order-summary/image-11.png",
    title: "Bags & Accessories",
    discountNumber: 15,
    productNumber: 189,
    productLink: "/categories/bags-accessories",
    slug: "bags-accessories",
  },
  {
    img: "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-2.png",
    title: "Watches",
    discountNumber: 35,
    productNumber: 312,
    productLink: "/categories/watches",
    slug: "watches",
  },
  {
    img: "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/shopping-cart/image-1.png",
    title: "Sportswear",
    discountNumber: 40,
    productNumber: 456,
    productLink: "/categories/sportswear",
    slug: "sportswear",
  },
  {
    img: "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/shopping-cart/image-2.png",
    title: "Jewelry",
    discountNumber: 10,
    productNumber: 98,
    productLink: "/categories/jewelry",
    slug: "jewelry",
  },
  {
    img: "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/order-summary/image-12.png",
    title: "Home & Living",
    discountNumber: 25,
    productNumber: 623,
    productLink: "/categories/home-living",
    slug: "home-living",
  },
];

