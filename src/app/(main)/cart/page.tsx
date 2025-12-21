import { ShoppingCart } from "@/features/shopping-cart/components/shopping-cart";

const cartItemsData = [
  {
    id: 1,
    name: "Women Solid Sweatshirt",
    size: "M",
    price: 12,
    image:
      "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/shopping-cart/image-3.png",
  },
  {
    id: 2,
    name: "Women Hooded Sweatshirt",
    size: "L",
    price: 32,
    image:
      "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/shopping-cart/image-2.png",
  },
  {
    id: 3,
    name: "Hooded Crop Sweatshirt",
    size: "L",
    price: 15,
    image:
      "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/shopping-cart/image-1.png",
  },
];

const ShoppingCartPage = () => {
  return <ShoppingCart cartItems={cartItemsData} />;
};

export default ShoppingCartPage;
